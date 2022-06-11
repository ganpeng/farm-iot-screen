import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon' // svg组件
// 注册全局组件
Vue.component('svg-icon', SvgIcon)
const requireAll = reqireContext => reqireContext.keys().map(reqireContext)
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)