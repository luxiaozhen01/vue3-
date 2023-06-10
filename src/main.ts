
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from '@/App.vue'
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'virtual:svg-icons-register'
import AllGlobalComponet from '@/components'
import '@/styles/index.scss'
import router from '@/router/index'
import store from './store'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import '@/permission'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus,{
    locale: zhCn,
})

app.use(router)
app.use(store)
app.use(AllGlobalComponet)
app.mount('#app')