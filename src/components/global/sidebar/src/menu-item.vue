<template>
    <li >
        <router-link href="#" style='color:white' :to='route' @click.native.stop='handleRoute'>
          <slot name='icon'></slot>
          <span class='menutitle'><slot></slot></span></router-link>
      </li>
</template>
<script>
import dispatch from '../../utils/dispatch'
export default {
  name: 'menu-item',
  mixins: [dispatch],
  props: {
    route: {
      type: String,
      default: ' '
    }
  },
  methods: {
    handleRoute () {
      if (this.route) {
        this.dispatch('my-menu', 'closeByRoute')
      }
    }
  }
}
</script>

