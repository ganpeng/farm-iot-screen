import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

Vue.use(Router);

export const constantRouterMap = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login'),
  },
  {
    path: '/aaa',
    name: 'AAA',
    component: () => import('@/views/aaa/AAA'),
  },
  // 首页
  {
    path: '/home',
    component: Layout,
    redirect: '/home/index',
    children: [
      {
        path: 'index',
        name: 'Home',
        component: () => import('@/views/home/Home'),
        meta: {
          activeMenu: '/home/index'
        }
      }
    ]
  },
  // 农业资产
  {
    path: '/farmstock',
    component: Layout,
    redirect: '/farmstock/index',
    children: [
      {
        path: 'index',
        name: 'FarmStock',
        component: () => import('@/views/farm_stock/FarmStock'),
        meta: {
          activeMenu: '/farmstock/index'
        }
      },
      {
        path: ':id(\\d+)/survey',
        component: () => import('@/views/farm_stock/FarmStockSurvey'),
        name: 'FarmStockSurvey',
        meta: {
          title: '概况',
          activeMenu: '/farmstock/index'
        }
      },
      {
        path: ':id(\\d+)/data',
        component: () => import('@/views/farm_stock/FarmStockData'),
        name: 'FarmStockData',
        meta: {
          title: '数据',
          activeMenu: '/farmstock/index'
        }
      },
      {
        path: ':id(\\d+)/monitor',
        component: () => import('@/views/farm_stock/FarmStockMonitor'),
        name: 'FarmStockMonitor',
        meta: {
          title: '监控',
          activeMenu: '/farmstock/index'
        }
      },
      {
        path: ':id(\\d+)/warning',
        component: () => import('@/views/farm_stock/FarmStockWarning'),
        name: 'FarmStockWarning',
        meta: {
          title: '预警',
          activeMenu: '/farmstock/index'
        }
      },
      {
        path: ':id(\\d+)/manage',
        component: () => import('@/views/farm_stock/Manage'),
        name: 'Manage',
        meta: {
          title: '管理',
          activeMenu: '/farmstock/index'
        }
      },
      {
        path: ':id(\\d+)/trace',
        component: () => import('@/views/farm_stock/Trace'),
        name: 'Trace',
        meta: {
          title: '溯源',
          activeMenu: '/farmstock/index'
        }
      },
      {
        path: ':id(\\d+)/farm_sale',
        component: () => import('@/views/farm_stock/FarmSale'),
        name: 'FarmSale',
        meta: {
          title: '销售',
          activeMenu: '/farmstock/index'
        }
      }
    ]
  },
  // 销售数据
  {
    path: '/sale',
    component: Layout,
    redirect: '/sale/index',
    children: [
      {
        path: 'index',
        name: 'Sale',
        component: () => import('@/views/sale/Sale'),
        meta: {
          activeMenu: '/sale/index'
        }
      }
    ]
  },
  // 仓储物流
  {
    path: '/storage',
    component: Layout,
    redirect: '/storage/index',
    children: [
      {
        path: 'index',
        name: 'Storage',
        component: () => import('@/views/storage/Storage'),
        meta: {
          activeMenu: '/storage/index'
        }
      }
    ]
  },
  // 5G网络
  {
    path: '/internet',
    component: Layout,
    redirect: '/internet/index',
    children: [
      {
        path: 'index',
        name: 'Internet',
        component: () => import('@/views/internet/Internet'),
        meta: {
          activeMenu: '/internet/index'
        }
      }
    ]
  },
  // PC端推广
  {
    path: '/pc/spread',
    name: 'PcSpread',
    component: () => import('@/views/spread/PcSpread')
  }
];

// 解决Vue-Router升级导致的Uncaught(in promise) navigation guard问题
const originalPush = Router.prototype.push;
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
};

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
