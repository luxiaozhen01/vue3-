<script setup lang="ts">
import setting from '@/setting/index'
</script>

<template>
    <div class="logo_container">
        <img :src="setting.logo" alt="logo">
        <span>{{ setting.title }}</span>
    </div>
    
</template>

<style scoped lang="scss">
.logo_container {
    height: 50px;
    display: flex;
    align-items: center;
    margin-left: 10px;

    img {
        width: 40px;
        height: 40px;
    }

    span {
        font-size: 20px;
        color: white;
        font-weight: bold;
        margin-left: 10px;
        white-space: nowrap;
    }
}


</style>