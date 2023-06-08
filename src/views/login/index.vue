<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { ref , reactive} from 'vue'
import useUserStore from '@/store/modules/user'
import { ElMessage,ElNotification } from 'element-plus'
import { useRouter,useRoute } from 'vue-router'
import { getTime } from '@/utils/time'

let userStore = useUserStore()
let $router = useRouter()
let $route = useRoute()
let loginForm = reactive({
    username:'',
    password:'',
})
let loading = ref(false)
let loginForms = ref()
let validatePassUsername = (rule: any, value: any, callback: any)=>{
    if(value.length>3 && value.length < 9){
        callback()
    }else{
        callback(new Error('用户名需要4到8位'))
    }
}
let validatePassPassword = (rule: any, value: any, callback: any)=>{
    if(value.length>5 && value.length < 16){
        callback()
    }else{
        callback(new Error('用户名需要6到15位'))
    }
}
let rules = reactive({
    username: [{ validator: validatePassUsername, trigger: 'change' }],
    password: [{ validator: validatePassPassword, trigger: 'change' }],
})
let login = async() => {
    await loginForms.value.validate()
    loading.value = true
    let message = getTime()
    try{
       await userStore.login(loginForm)
       ElNotification({
            title: `Hi,${message}好`,
            message: '欢迎回来',
            type: 'success',
        })
        
        loading.value = false
        let redirect:any = $route.query.redirect || '/'
        $router.replace({path:redirect})
    }catch(error){
        ElMessage ({
            type:'error',
            message:error
        })
        loading.value = false
    }
} 
</script>

<template>
    <div class="login_container">
        <el-row>
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24">
                <el-form class="login_form" :model="loginForm"  :rules="rules" ref="loginForms">
                    <h1>Hello</h1>
                    <div>欢迎来到硅谷甄选运营平台</div>
                    <el-form-item prop="username">
                        <el-input :prefix-icon="User" v-model="loginForm.username" clearable></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" :prefix-icon="Lock" show-password v-model="loginForm.password" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="login_btn" @click.enter="login" :loading="loading">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<style scoped lang="scss">
    .login_container{
        width: 100%;
        height: 100vh;
        background: url('@/assets/images/background.jpg'), no-repeat;
        background-size: cover;

        .login_form{
            width:80%;
            position: relative;
            top:30vh;
            background: url('@/assets/images/login_form.png');
            padding: 40px 20px;

            h1{
                color: white;
                font-size: 40px;
            }
            div{
                color: white;
                font-size: 20px;
                margin: 10px 0;
            }
            .login_btn{
                width: 100%;
                height: 40px;
                margin-top: 20px;
            }
        }
    }
</style>