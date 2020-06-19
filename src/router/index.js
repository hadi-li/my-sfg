import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/home',
    name: 'home',
    redirect: '/home/index',
    component: () => import( /* webpackChunkName: "about" */ '../views/leftMenu/home.vue'),
    children: [{
        path: '/home/index',
        name: 'index',
        component: () => import('../views/home/index.vue')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('../views/system/user.vue')
      },
      {
        path: '/test',
        name: 'test1',
        component: () => import('../views/test/test1.vue')
      },
      {
        path: '/test3',
        name: 'test3',
        component: () => import('../views/test/test2.vue')
      },
      {
        path: '/test5',
        name: 'test5',
        component: () => import('../views/test/test3.vue')
      },
      {
        path: '/test9',
        name: 'test9',
        component: () => import('../views/test/test4.vue')
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import('../views/system/menu.vue')
      },
    ],
  },
]


const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('Authorization');
  if (to.path === '/') {
    next();
  } else {
    if (token === null || token === '') {
      next('/');
    } else {
      next();
    }
  }
});
export default router