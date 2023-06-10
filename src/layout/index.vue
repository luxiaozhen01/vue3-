<script setup lang="ts">
import Logo from "./conponents/logo.vue"
import topBar from "./conponents/topBar.vue"
import Menus from "./conponents/menus.vue"
import Main from "./conponents/main.vue"
import routes from '@/router/routes'
import { useRoute } from 'vue-router'
import useLayoutSettingStore  from '@/store/modules/layoutSetting'
let $route = useRoute()
let LayoutSettingStore = useLayoutSettingStore()

</script>

<template>
    <div class="layout_container">
        <div class="layout_slider" :class="{fold:LayoutSettingStore.fold}" >
            <Logo/>
            <el-scrollbar class="scrollbar" >
                <el-menu background-color="#001529" text-color="#fff" :default-active="$route.path"  :collapse="LayoutSettingStore.fold">
                    <Menus :menuList="routes"></Menus>
                </el-menu>
            </el-scrollbar>
        </div>
        <div class="layout_topBar" :class="{fold:LayoutSettingStore.fold}">
            <topBar/>
        </div>
        <div class="layout_content" :class="{fold:LayoutSettingStore.fold}">
            <Main/>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .layout_container{
        width: 100%;
        height: 100vh;
        .layout_slider{
            width: $layout_slider_width;
            height: 100vh;
            background-color: $layout_slider_backgrondColor;
            transition: all 0.3s;
            &.fold{
                width: $layout_slider_fold_width;
            }
        }
        .layout_topBar{
            width: calc(100% - $layout_slider_width);
            height: $layout_topBar_height;
            position: absolute;
            top: 0;
            right: 0;
            background-color: white;
            transition: all 0.3s;
            &.fold{
                width: calc(100% - $layout_slider_fold_width);
            }
        }
        .layout_content{
            width: calc(100% - $layout_slider_width);
            height: calc(100vh - $layout_topBar_height);
            padding: 20px;
            position: absolute;
            top: $layout_topBar_height;
            right: 0;
            overflow: auto;
            transition: all 0.3s;
            &.fold{
                width: calc(100% - $layout_slider_fold_width);
            }
        }
    }
    .scrollbar{
        height: calc(100vh - 50px);
        .el-menu {
            border-right: none;
        }
    }
</style>