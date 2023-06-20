<script setup lang="ts">
import { onMounted } from 'vue';
import  useCategoryStore  from '@/store/modules/category'
defineProps(['scene'])
let categoryStore = useCategoryStore()
onMounted(()=>{
    getC1()
})
let getC1 = () =>{
    categoryStore.getC1()
}
let hanlder1 = ()=>{
    categoryStore.c2Id = ''
    categoryStore.c3Id = ''
    categoryStore.c3Arr = []
    categoryStore.getC2()
}
let hanlder2 = ()=>{
    categoryStore.c3Id = ''
    categoryStore.getC3()
}
</script>

<template>
    <el-card>
        <el-form :inline="true">
            <el-form-item label="一级分类">
                <el-select v-model="categoryStore.c1Id" @change="hanlder1" :disabled="scene==0?false:true">
                    <el-option v-for="item in categoryStore.c1Arr" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类" >
                <el-select v-model="categoryStore.c2Id" @change="hanlder2" :disabled="scene==0?false:true">
                    <el-option v-for="item in categoryStore.c2Arr" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类" >
                <el-select v-model="categoryStore.c3Id" :disabled="scene==0?false:true">
                    <el-option v-for="item in categoryStore.c3Arr" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<style scoped>

</style>