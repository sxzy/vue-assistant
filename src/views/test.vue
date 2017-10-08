<script>
export default {
  render: function (creatElement) {
    return creatElement(
      'h' + this.level,
      this.$slots.default    
    )
  },
  props: {
      level: {
        type: Number,
        required: true    
      }
  }
}
</script>
