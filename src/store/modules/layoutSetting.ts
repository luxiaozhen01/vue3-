import { defineStore } from "pinia"
let useLayoutSettingStore = defineStore('LayoutSetting',{
    state:()=>{
        return {
            fold:false,
            refreshState:false
        }
    }
})

export default useLayoutSettingStore 