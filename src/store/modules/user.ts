import { defineStore } from 'pinia'
import { reqLogin,reqUserInfo } from '@/api/user'
import type { loginData,loginResponse } from '@/api/user/type'
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
       async login(data:loginData){
            let result:loginResponse = await reqLogin(data)
            if(result.code == 200){
                this.token = (result.data.token as string)
                SET_TOKEN(result.data.token as string)
                return 'ok'
            }else{
                return Promise.reject(new Error(result.data.message))
            }
        },
        async getUserInfo(){
            let result = await reqUserInfo()
            if(result.code==200){
                this.username = result.data.checkUser.username
                this.avatar = result.data.checkUser.avatar
                return 'ok'
            }else{
                return Promise.reject('获取失败！')
            }
        },
        logout(){
            this.token = ''
            this.username = ''
            this.avatar = ''
            REMOVE_TOKEN()
        }
    },
    getters:{

    }
})

export default useUserStore