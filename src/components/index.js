import dropdown from '@/components/global/dropdown'
import item from '@/components/global/dropdown/item.vue'

import mymenu from '@/components/global/sidebar//src/my-menu.vue'
import menuitem from '@/components/global/sidebar/src/menu-item.vue'
import mysubmenu from '@/components/global/sidebar/src/my-submenu.vue'
import BackTop from '@/components/global/backtop/src/main'

const components = [
  dropdown,
  item,
  mymenu,
  menuitem,
  mysubmenu,
  BackTop
]

const install = (Vue, OPts) => {
  if (install.installed) {
    return
  }
  components.map(component => {
    Vue.component(component.name, component)
  })
}

export default {
  version: '0.0.1',
  author: 'kimmy',
  install,
  dropdown,
  item,
  mymenu,
  menuitem,
  mysubmenu,
  BackTop
}
