<script setup lang="ts">
import { ref } from 'vue'
import { ArrowRight, Refresh, FullScreen, Setting } from '@element-plus/icons-vue'
import useLayoutSettingStore  from '@/store/modules/layoutSetting'
import { useRoute } from "vue-router"
let LayoutSettingStore = useLayoutSettingStore()
let changeIcon = ()=>{
    LayoutSettingStore.fold = !LayoutSettingStore.fold   
}
let $route = useRoute()
let refresh = ()=>{
    LayoutSettingStore.refreshState = !LayoutSettingStore.refreshState
}
let fullScreen = ()=>{
    let isFullScreen = document.fullscreenElement
    console.log(isFullScreen)
    if(!isFullScreen){
        document.documentElement.requestFullscreen()
    }else{
        document.exitFullscreen()
    }
}
</script>

<template>
    <div class="topBar_container">
        <div class="topBar_left">
            <el-icon class="icon" :size="20" @click="changeIcon">
                <Fold />
            </el-icon>
            <el-breadcrumb :separator-icon="ArrowRight">
                <el-breadcrumb-item  v-for="(item,index) in $route.matched" :key="index" :to="{ path: item.path }" v-show="!(item.path == '/')" >
                    <component class="componentIcon" :is="item.meta.icon"></component>
                    <span class="breadcrumbText">{{ item.meta.title }}</span>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="topBar_right">
            <el-button :icon="Refresh" circle @click="refresh"/>
            <el-button :icon="FullScreen" circle @click="fullScreen"/>
            <el-button :icon="Setting" circle />
            <img class="img" src="../../../public/logo.png" alt="头像">
            <el-dropdown class="dropdown">
                <span class="el-dropdown-link">
                    admin
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<style scoped lang="scss">
.topBar_container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;

    .topBar_left {
        display: flex;
        align-items: center;
        .icon {
            margin: 0 10px 0 20px;
        }
        .breadcrumbText{
            vertical-align: top;
            font-size: 16px;
        }
        .componentIcon{
            width: 17px;
            height: 17px;
        }
    }

    .topBar_right {
        display: flex;
        align-items: center;

        .img {
            width: 30px;
            height: 30px;
            margin: 0 10px;
        }
        .dropdown{
            margin-right: 5px;
        }
    }
}</style>