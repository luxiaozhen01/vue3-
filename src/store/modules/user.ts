import { defineStore } from 'pinia'
import { reqLogin,reqUserInfo,reqLogout } from '@/api/user'
import type { loginFormData,loginResponseData,userInfoResponseData } from '@/api/user/type'
import type { userState } from './types/index'
import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
const useUserStore = defineStore('User',{
    state:():userState=>{
        return {
            token:GET_TOKEN('TOKEN'),
            username:'',
            avatar:'',
        }
    },
    actions:{
       async login(data:loginFormData){
            let result:loginResponseData = await reqLogin(data)
            if(result.code == '200'){
                this.token = (result.data as string)
                SET_TOKEN(result.data as string)
                return result.message
            }else{
                return Promise.reject(new Error(result.data))
            }
        },
        async getUserInfo(){
            let result = await reqUserInfo()
            if(result.code == '200'){
                this.username = result.data.name
                this.avatar = result.data.avatar
                return 'ok'
            }else{
                return Promise.reject('获取失败！')
            }
        },
        async logout(){
            let result = await reqLogout()
            if(result.code == 200){
                this.token = ''
                this.username = ''
                this.avatar = ''
                REMOVE_TOKEN()
            }else{
                Promise.reject(new Error(result.message))
            }
        }
    },
    getters:{

    }
})

export default useUserStore