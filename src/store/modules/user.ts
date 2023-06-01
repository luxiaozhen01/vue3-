import { defineStore } from 'pinia'
import { reqLogin } from '@/api/user'
import type { loginData } from '@/api/user/type'
const useUserStore = defineStore('User',{
    state:()=>{
        return {
            token:localStorage.getItem('TOKEN')
        }
    },
    actions:{
       async login(data:loginData){
            let result:any = await reqLogin(data)
            if(result.code == 200){
                this.token = result.data.token
                localStorage.setItem('TOKEN',result.data.token)
                return 'ok'
            }else{
                return Promise.reject(new Error(result.data.message))
            }
        }
    },
    getters:{

    }
})

export default useUserStore