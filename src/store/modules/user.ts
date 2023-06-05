import { defineStore } from 'pinia'
import { reqLogin } from '@/api/user'
import type { loginData,loginResponse } from '@/api/user/type'
import type { userState } from './types/index'
import { GET_TOKEN, SET_TOKEN } from '@/utils/token'
const useUserStore = defineStore('User',{
    state:():userState=>{
        return {
            token:GET_TOKEN('TOKEN')
        }
    },
    actions:{
       async login(data:loginData){
            let result:loginResponse = await reqLogin(data)
            if(result.code == 200){
                this.token = (result.data.token as string)
                SET_TOKEN(result.data.token as string)
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