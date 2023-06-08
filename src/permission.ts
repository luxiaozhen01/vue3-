import router from '@/router/index'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import pinia from '@/store/index'
import useUserStore from './store/modules/user';

let userStore = useUserStore(pinia)
let username = userStore.username
nprogress.configure({ showSpinner: false });
router.beforeEach(async (to, from, next) => {
    let token = userStore.token
    nprogress.start()
    if(token){
        if(to.path=='/login'){
            next({path:'/'})
        }else{
            if(username){
                next()
            }else{
                try {
                    await userStore.getUserInfo()
                    next()
                } catch (error) {
                    userStore.logout()
                    next({path:'/login',query:{redirect:to.path}})
                }
            }
        }
    }else{
        if(to.path == '/login'){
            next()
        }else{
            next({path:'/login',query:{redirect:to.path}})
        }
    }
})

router.afterEach((to,from)=>{
    nprogress.done()
})

