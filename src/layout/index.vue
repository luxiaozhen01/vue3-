<script setup lang="ts">
import Logo from "./conponents/logo.vue"
import Nav from "./conponents/nav.vue"
</script>

<template>
    <div class="layout_container">
        <div class="layout_slider">
            <Logo/>
        </div>
        <div class="layout_nav">
            <Nav/>
        </div>
        <div class="layout_content">
            <!-- <p style="height:10000px; background-color: red;"></p> -->
            <router-view></router-view>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .layout_container{
        width: 100%;
        height: 100vh;
        background-color: red;
        .layout_slider{
            width: $layout_slider_width;
            height: 100vh;
            background-color: $layout_slider_backgrondColor;
        }
        .layout_nav{
            width: calc(100% - $layout_slider_width);
            height: $layout_nav_height;
            position: absolute;
            top: 0;
            right: 0;
            background-color: white;
        }
        .layout_content{
            width: calc(100% - $layout_slider_width);
            height: calc(100vh - $layout_nav_height);
            position: absolute;
            top: $layout_nav_height;
            right: 0;
            overflow: auto;
        }
    }
    
</style>