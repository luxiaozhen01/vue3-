<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { ref , reactive} from 'vue'
import useUserStore from '@/store/modules/user'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

let userStore = useUserStore()
let $router = useRouter()

let loginForm = reactive({
    username:'',
    password:'',
})
let loading = ref(false)
let login = async() => {
    loading.value = true
    try{
       await userStore.login(loginForm)
        ElMessage ({
            type:'success',
            message:'登录成功！'
        })
        loading.value = false
        $router.replace('/')
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
                <el-form class="login_form">
                    <h1>Hello</h1>
                    <div>欢迎来到硅谷甄选运营平台</div>
                    <el-form-item>
                        <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input type="password" :prefix-icon="Lock" show-password v-model="loginForm.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="login_btn" @click="login" :loading="loading">登录</el-button>
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
            }
        }
    }
</style>