<script setup lang="ts">
import { useRouter } from "vue-router"
defineProps(['menuList'])
let $router = useRouter()
let goView = (path:string)=>{
    $router.push(path)
}
</script>
<script lang="ts">
export default {
    name:'Menus'   
}
</script>

<template>
    <template v-for="item in menuList" :key="item.path">
        <template v-if="!item.meta.hidden">
            <el-menu-item :index="item.path" v-if="!item.children" @click="goView(item.path)">
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <template #title>
                    <span>{{ item.meta.title }}</span>
                </template>
            </el-menu-item>
            <el-menu-item :index="item.children[0].path" v-if="item.children && item.children.length==1" @click="goView(item.path)">
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <template #title>
                    <span>{{ item.children[0].meta.title }}</span>
                </template>
            </el-menu-item>
            <el-sub-menu :index="item.path" v-if="item.children && item.children.length>1">
                <template #title>
                    <el-icon>
                        <component :is="item.meta.icon"></component>
                    </el-icon>
                    <span>{{ item.meta.title }}</span>
                </template>
                <Menus :menuList="item.children"/>
            </el-sub-menu>
        </template>
    </template>
</template>

<style scoped lang="scss"></style>