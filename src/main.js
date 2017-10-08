// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Bus from '@/utils/bus.js'
import globalUI from '@/components'
import directives from '@/directives'
import router from './router'
import MintUI from 'mint-ui'
import api from '@/services/api'
import 'mint-ui/lib/style.css'
import '@/assets/fontIcon/iconfont.css'

Bus(Vue)

/* 注册指令插件 */
directives(Vue)

/*  全局组件 */
Vue.use(MintUI)
Vue.use(globalUI)

// 给axios添加拦截器并添加到全局
api(Vue)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
