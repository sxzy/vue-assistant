<template>
    <div>
     <li class='treeview'  @click='toggleShowMenu'>
          <a href="#" data-show = false  style='color:white'>
          <slot name='icon'></slot>   
          <span class='menutitle'><slot name="submenu-title"></slot></span>
          <span class='pull-right-container'><i class='fa fa-angle-left pull-right' style='color:white'></i></span>
        </a>
        </li>    
        <ul class='treeview-menu' style='display:none'>
          <slot></slot>
        </ul>
    </div>
</template>
<script>
export default {
  name: 'my-submenu',
  methods: {
    toggleShowMenu (e) {
      let setTarget = e.currentTarget.nextElementSibling
      if (setTarget !== null) {
        let showCon = setTarget.classList.contains('openMenu')
        let childLi = setTarget.children
        var totalHeight = 0
        let h = e.currentTarget
        var targetIcon = h.querySelectorAll('.pull-right')[0]  // todo: h是当前的元素
        let nodeListArr = Array.prototype.slice.call(childLi)
        if (!showCon) {
          setTarget.style.height = 0
          setTarget.classList.add('openMenu')
          targetIcon.classList.add('openIcon')
          setTarget.style.overflow = 'hidden'
          setTarget.style.display = 'block'
          for (let i = 0; i < nodeListArr.length; i++) {
            totalHeight = totalHeight + nodeListArr[i].offsetHeight
          }
          setTimeout(() => {
            setTarget.style.height = totalHeight + 'px'
            setTimeout(() => {
              setTarget.removeAttribute('style')
              setTarget.style.display = 'block'
            }, 300)
          }, 40)
        } else {
          targetIcon.classList.remove('openIcon')
          setTarget.style.height = setTarget.offsetHeight + 'px'
          setTarget.style.overflow = 'hidden'
          setTarget.classList.remove('openMenu')
          setTimeout(() => {
            setTarget.style.height = 0 + 'px'
            setTimeout(() => {
              setTarget.removeAttribute('style')
              setTarget.style.display = 'none'
            }, 300)
          }, 40)
        }
      }
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">

</style>
