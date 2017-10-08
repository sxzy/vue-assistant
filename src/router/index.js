import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home/home.vue'
import info from '@/views/info.vue'

import DatePlan from '@/views/DatePlan'
import EatWhat from '@/views/EatWhat'
import icon from '@/views/icon'
import memo from '@/views/memo'
import mirrow from '@/views/mirrow'
import when from '@/views/when'
import editName from '@/views/editName'
import editFood from '@/views/editFood'
import money from '@/views/money'
import moneyRecord from '@/views/moneyRecord'
import setIcon from '@/views/setIcon'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/info',
      name: 'info',
      component: info
    },
    {
      component: EatWhat,
      name: 'EatWhat',
      path: '/EatWhat'
    },
    {
      component: icon,
      name: 'icon',
      path: '/icon'
    },
    {
      component: memo,
      name: 'memo',
      path: '/memo'
    },
    {
      component: mirrow,
      name: 'mirrow',
      path: '/mirrow'
    },
    {
      component: when,
      name: 'when',
      path: '/when'
    },
    {
      component: editName,
      name: 'editName',
      path: '/editName'
    },
    {
      component: DatePlan,
      name: 'DatePlan',
      path: '/DatePlan'
    },
    {
      component: editFood,
      name: 'editFood',
      path: '/editFood'
    },
    {
      component: money,
      name: 'money',
      path: '/money'
    },
    {
      component: moneyRecord,
      name: 'moneyRecord',
      path: '/moneyRecord'
    },
    {
      component: setIcon,
      name: 'setIcon',
      path: '/setIcon'
    }
  ]
})
