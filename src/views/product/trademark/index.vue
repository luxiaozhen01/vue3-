<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { reqTrademark, updateTrademark, removeTrademark } from '@/api/product/trademark'
import type { trademarkResponseData, Records, Record } from '@/api/product/trademark/type'
import type { UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'
let pageNum = ref<number>(1)
let pageSize = ref<number>(3)
let total = ref<number>()
let data = ref<Records>([])
onMounted(() => {
    getTrademark()
})
let getTrademark = async () => {
    let result: trademarkResponseData = await reqTrademark(pageNum.value, pageSize.value)
    if (result.code == 200) {
        data.value = result.data.records
        total.value = result.data.total
    }
}
let handleSizeChange = (val: number) => {
    pageSize.value = val
    getTrademark()
}
let handleCurrentChange = (val: number) => {
    pageNum.value = 1
    pageNum.value = val
    getTrademark()
}



let FormRef = ref()
let dialogVisible = ref(false)
let formData = reactive<Record>({
    tmName: "",
    logoUrl: ""

})
let validateTmName = (rule: any, value: any, callback: any) => {
    if (value.trim().length >= 2) {
        callback()
    } else {
        callback(new Error('品牌名称必须大于等于两位'))
    }
}
let validateLogoUrl = (rule: any, value: any, callback: any) => {
    if (value) {
        formData.logoUrl = value
        callback()
    } else {
        callback(new Error('品牌LOGO必须上传'))
    }
}
let rules = reactive({
    tmName: [{ required: true, trigger: 'blur', validator: validateTmName }],
    logoUrl: [{ required: true, trigger: 'change', validator: validateLogoUrl }]
})
let showDialog = () => {
    formData.id = undefined
    formData.tmName = ''
    formData.logoUrl = ''
    dialogVisible.value = true
    FormRef.value?.clearValidate('tmName')
    FormRef.value?.clearValidate('logoUrl')
}
let cancel = () => {
    dialogVisible.value = false
}
let addTrademark = async()=>{
    let result: any = await updateTrademark(formData)
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: '添加品牌成功'
        })
        getTrademark()
    } else {
        ElMessage({
            type: 'success',
            message: '添加品牌失败'
        })
    }
    dialogVisible.value = false
}
let confirm = () => {
    FormRef.value.validate((valid: any) => {
        if (valid) {
            if(formData.id){
                editTrademark()
            }else{
                addTrademark()
            }
            
        }
    })
}

let handleAvatarSuccess: UploadProps['onSuccess'] = (response: any, uploadFile: any) => {
    if (response.code == 200) {
        formData.logoUrl = response.data
        FormRef.value.clearValidate('logoUrl')
        ElMessage({
            type: 'success',
            message: '上传图片成功'
        })
    } else {
        ElMessage({
            type: 'error',
            message: '上传图片失败'
        })
    }
}
let beforeAvatarUpload = (rawFile: any) => {
    if (rawFile.type == 'image/jpeg' || rawFile.type == 'image/png' || rawFile.type == 'image/gif') {
        if (rawFile.size / 1024 / 1024 > 4) {
            ElMessage({
                type: 'error',
                message: '文件大小请小于4M'
            })
            return false
        }
    } else {
        ElMessage({
            type: 'error',
            message: '只能上传 jpg/png/gif 文件'
        })
        return false
    }
    return true
}
let edit = (row:any)=>{
    FormRef.value?.clearValidate('tmName')
    FormRef.value?.clearValidate('logoUrl')
    dialogVisible.value = true
    formData = Object.assign(formData,row)
    
}
let editTrademark = async ()=>{
    let result:any = await updateTrademark(formData)
    if(result.code == 200){
        ElMessage({
            type:'success',
            message:'修改成功'
        })
        dialogVisible.value = false
        getTrademark()
    }else{
        ElMessage({
            type:'error',
            message:'修改失败'
        })
        dialogVisible.value = false
    }
}
let del = async (id: number) => {
    let result: any = await removeTrademark(id)
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: '删除成功'
        })
        if (pageSize.value < 1) {
            pageNum.value -= 1
        }
        getTrademark()
    } else {
        ElMessage({
            type: 'error',
            message: '删除失败'
        })
    }
}

</script>

<template>
    <div>
        <el-card class="box-card">
            <el-button type="primary" icon="Plus" @click="showDialog">添加品牌</el-button>
            <el-table :data="data" style="width: 100%; margin: 20px 0;" border>
                <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
                <el-table-column prop="tmName" label="品牌名称"></el-table-column>
                <el-table-column prop="logoUrl" label="品牌LOGO">
                    <template #="{ row, column, $index }">
                        <img :src="row.logoUrl" alt="logo" style="width:100px;height:100px">
                    </template>
                </el-table-column>
                <el-table-column prop="" label="操作">
                    <template #="{ row, column, $index }">
                        <el-button type="primary" icon="Edit" @click="edit(row)"></el-button>
                        <el-popconfirm :title="`确定删除${row.tmName}吗？`" width="200px" @confirm="del(row.id)">
                            <template #reference>
                                <el-button type="danger" icon="Delete"></el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[3, 10, 15, 20]"
                :background="true" layout="prev, pager, next, jumper,->,sizes,total" :total="total"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </el-card>
        <el-dialog v-model="dialogVisible" :title="formData.id ? '修改品牌' : '添加品牌'" width="50%" :before-close="cancel">
            <el-form :model="formData" ref="FormRef" style="width:85%" :rules="rules">
                <el-form-item label='品牌名称' label-width='100px' prop="tmName">
                    <el-input v-model="formData.tmName"></el-input>
                </el-form-item>
                <el-form-item label='品牌LOGO' label-width='100px' prop="logoUrl">
                    <el-upload class="avatar-uploader" action="/dev-api/admin/product/fileUpload" :show-file-list="false"
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="formData.logoUrl" :src="formData.logoUrl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="cancel">取消</el-button>
                    <el-button type="primary" @click="confirm">确定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}

.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>