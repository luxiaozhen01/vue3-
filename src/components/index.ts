import SvgIcon from './SvgIcon/index.vue'

let allComponent:any = { SvgIcon }

export default {
    install(app:any){
        Object.keys(allComponent).forEach(key=>{
            app.component(key,allComponent[key])
        })
    }
}