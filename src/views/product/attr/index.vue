<script setup lang="ts">
import { watch, ref, reactive,nextTick,onBeforeUnmount } from 'vue'
import { getAttr, addOrUpdateAttr,removeAttr } from '@/api/product/attr/index'
import useCategoryStore from '@/store/modules/category'
import type { attrResponseData, attrItem } from '@/api/product/attr/type'
import { ElMessage } from 'element-plus';

let categoryStore = useCategoryStore()
let attrList = ref<attrItem[]>([])
let scene = ref<number>(0)
let attr = reactive<attrItem>({
    attrName: "",
    attrValueList: [],
    categoryId: 0,
    categoryLevel: 3,
})
let inputArr = reactive<any>([])

watch(() => categoryStore.c3Id, () => {
    attrList.value = []
    if (categoryStore.c3Id) {
        getAttrList()
    }
})
let getAttrList = async () => {
    let { c1Id, c2Id, c3Id } = categoryStore
    let result: attrResponseData = await getAttr(c1Id, c2Id, c3Id)
    if (result.code == 200) {
        attrList.value = result.data
    }
}
let addAttr = () => {
    scene.value = 1
    Object.assign(attr, {
        attrName: "",
        attrValueList: [],
        categoryId: categoryStore.c3Id,
        categoryLevel: 3,
        id:undefined
    })
}
let updateAttr = (row:any) => {
    scene.value = 1
    Object.assign(attr,JSON.parse(JSON.stringify(row)))

}
let cancel = () => {
    scene.value = 0
    getAttrList()
}
let addAttrValue = () => {
    attr.attrValueList.push({
        valueName: '',
        flag:true
    })
    nextTick(()=>{
        inputArr[inputArr.length-1].focus()
    })
}
let save = async()=>{
    let result:any = await addOrUpdateAttr(attr)
    if(result.code==200){
        ElMessage({
            type:"success",
            message:attr.id ? '修改成功': '添加成功'
        })
        scene.value = 0
        getAttrList()
    }else{
        ElMessage({
            type:"error",
            message:attr.id ? '修改失败': '添加失败'
        })
    }
}

let toLook = (row:any,$index:number) =>{
    if(!row.valueName.trim()){
        ElMessage({
            type:'error',
            message:'属性值不能为空'
        })
        attr.attrValueList.splice($index,1)
        return
    }

    let val = attr.attrValueList.find((item,index)=>{
        if(item != row){
            return item.valueName == row.valueName
        }
    })
    if(val){
        ElMessage({
            type:'error',
            message:'属性值不能重复'
        })
        attr.attrValueList.splice($index,1)
        return
    }
    row.flag = false
}
let toEdit = (row:any,index:number) =>{
    row.flag = true
    nextTick(()=>{
        inputArr[index].focus()
    })
}
let delItem = (row:any,index:number)=>{
    attr.attrValueList.splice(index,1)
}
let delAttr = async(id:number)=>{
    let res:any = await removeAttr(id)
    if(res.code==200){
        ElMessage({
            type:'success',
            message:'删除成功'
        })
        getAttrList()
    }else{
        ElMessage({
            type:'error',
            message:'删除失败'
        })
    }
}
onBeforeUnmount(()=>{
    categoryStore.$reset()
})
</script>

<template>
    <div>
        <Category :scene="scene" />
        <el-card style="margin: 10px 0;">
            <div v-show="scene == 0">
                <el-button type="primary" icon="Plus" :disabled="!categoryStore.c3Id" @click="addAttr">添加属性</el-button>
                <el-table :data="attrList" border style="margin-top: 10px;">
                    <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
                    <el-table-column label="属性名称" prop="attrName"></el-table-column>
                    <el-table-column label="属性值名称" width="700px">
                        <template #="{ row }">
                            <el-tag v-for="item in row.attrValueList" :key="item.id" style="margin: 5px;">{{ item.valueName
                            }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template #default="{row}">
                            <div>
                                <el-button type="primary" icon="Edit" @click="updateAttr(row)"></el-button>
                                <el-popconfirm width="200px" :title="`确定删除${row.attrName}?`" @confirm="delAttr(row.id)">
                                    <template #reference>
                                        <el-button type="danger" icon="Delete"></el-button>
                                    </template>
                                </el-popconfirm>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div v-show="scene == 1">
                <el-form :inline="true">
                    <el-form-item label="属性名称">
                        <el-input placeholder="请输入属性名称" v-model="attr.attrName"></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary" icon="Plus" @click="addAttrValue"
                    :disabled="attr.attrName ? false : true">添加属性值</el-button>
                <el-button @click="cancel">取消</el-button>
                <el-table border :data="attr.attrValueList" style="margin: 10px 0;">
                    <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
                    <el-table-column label="属性值">
                        <template #="{ row,$index }">
                            <el-input size="small" :ref="(vc:any)=>inputArr[$index] = vc" v-if="row.flag" placeholder="请输入属性值"  @blur="toLook(row,$index)" v-model="row.valueName"></el-input>
                            <div v-else @click="toEdit(row,$index)">{{ row.valueName }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template #="{row,$index}">
                            <el-button @click="delItem(row,$index)" size="small" type="danger" icon="Delete"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button type="primary" @click="save" :disabled="attr.attrValueList.length>0?false:true">确定</el-button>
                <el-button @click="cancel">取消</el-button>
            </div>
        </el-card>
    </div>
</template>

<style scoped></style>