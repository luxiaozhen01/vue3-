<script setup lang="ts">
import setting from '@/setting/index'
import Menus from "./menus.vue"
import routes from '@/router/routes'
</script>

<template>
    <div class="logo_container">
        <img :src="setting.logo" alt="logo">
        <p>{{ setting.title }}</p>
    </div>
    <el-menu
        background-color="#001529"
        text-color="#fff"
    >
        <Menus :menuList="routes"></Menus>
    </el-menu>
</template>

<style scoped lang="scss">
    .logo_container{
        height:50px;
        display: flex;
        align-items: center;
        margin-left: 20px;
        img{
            width:40px;
            height: 40px;
        }
        p{
            font-size: 20px;
            color: white;
            font-weight: bold;
            margin-left: 10px;
        }
    }
    .el-menu{
        border-right: none;
    }
</style>