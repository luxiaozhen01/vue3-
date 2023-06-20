import SvgIcon from './SvgIcon/index.vue'
import Category from "./Category/index.vue"
let allComponent:any = { SvgIcon,Category }

export default {
    install(app:any){
        Object.keys(allComponent).forEach(key=>{
            app.component(key,allComponent[key])
        })
    }
}