<script setup lang="ts">
import { watch,ref,nextTick } from "vue"
import useLayoutSettingStore  from '@/store/modules/layoutSetting'
let LayoutSettingStore = useLayoutSettingStore()
let show = ref(true)
watch(() =>LayoutSettingStore.refreshState,()=>{
    show.value = false
    nextTick(()=>{
        show.value = true
    })
})
</script>

<template>
    <router-view v-slot="{ Component }">
        <transition name="fade">
            <component :is="Component" v-if="show"/>
        </transition>
    </router-view>
</template>

<style scoped>
.fade-enter-from{
    opacity: 0;
}       
.fade-enter-active{
    transition: all 0.3s;
}
.fade-enter-to{

}
</style>