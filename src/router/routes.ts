
const constantRoutes = [
    {
        path:'/',
        component:()=>import('@/layout/index.vue'),
        name:'layout',
        redirect:'/home',
        meta:{
            title:'layout',
            icon:'House'
        },
        children:[
            {
                path:'/home',
                component:()=>import('@/views/home/index.vue'),
                name:'home',
                meta:{
                    title:'首页',
                    hidden:false,
                    icon:'House'
                },
            }
        ]
    },
    {
        path:'/404',
        component:()=>import('@/views/404/index.vue'),
        name:'404',
        meta:{
            title:'404',
            hidden:true
        },
    },
    {
        path:'/login',
        component:()=>import('@/views/login/index.vue'),
        name:'login',
        meta:{
            title:'login',
            hidden:true
        },
    },
    {
        path:'/screen',
        component:()=>import('@/views/screen/index.vue'),
        name:'screen',
        meta:{
            title:'数据大屏',
            hidden:false,
            icon:'Monitor'
        },
    },
    {
        path:'/acl',
        component:()=>import('@/layout/index.vue'),
        name:'acl',
        redirect:"/acl/user",
        meta:{
            title:'权限管理',
            hidden:false,
            icon:'Lock'
        },
        children:[
            {
                path:'/acl/user',
                component:()=>import('@/views/acl/user/index.vue'),
                name:'user',
                meta:{
                    title:'用户管理',
                    hidden:false,
                    icon:'User'
                },
            },
            {
                path:'/acl/role',
                component:()=>import('@/views/acl/role/index.vue'),
                name:'role',
                meta:{
                    title:'角色管理',
                    hidden:false,
                    icon:'Warning'
                },
            },
            {
                path:'/acl/permission',
                component:()=>import('@/views/acl/permission/index.vue'),
                name:'permission',
                meta:{
                    title:'菜单管理',
                    hidden:false,
                    icon:'CopyDocument'
                },
            }
        ]
        
    },
    {
        path:'/product',
        component:()=>import('@/layout/index.vue'),
        name:'product',
        redirect:"/product/attr",
        meta:{
            title:'商品管理',
            hidden:false,
            icon:'Box'
        },
        children:[
            {
                path:'/product/attr',
                component:()=>import('@/views/product/attr/index.vue'),
                name:'attr',
                meta:{
                    title:'属性管理',
                    hidden:false,
                    icon:'CreditCard'
                },
            },
            {
                path:'/product/sku',
                component:()=>import('@/views/product/sku/index.vue'),
                name:'sku',
                meta:{
                    title:'sku管理',
                    hidden:false,
                    icon:'Help'
                },
            },
            {
                path:'/product/spu',
                component:()=>import('@/views/product/spu/index.vue'),
                name:'spu',
                meta:{
                    title:'spu管理',
                    hidden:false,
                    icon:'TrendCharts'
                },
            },
            {
                path:'/product/trademark',
                component:()=>import('@/views/product/trademark/index.vue'),
                name:'trademark',
                meta:{
                    title:'品牌管理',
                    hidden:false,
                    icon:'Aim'
                },
            }
        ]
        
    },
    {
        path:'/:pathMatch(.*)*',
        redirect:'/404',
        name:'any',
        meta:{
            title:'任意路由',
            hidden:true
        },
    }
]
 
export default constantRoutes