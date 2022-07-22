<template>
  <button
    class="p-btn"
    :class="{'p-icon-btn center': icon}"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    :style="getButtonStyle">
    <slot/>
  </button>
</template>

<script>
import { colorMap } from '@/constant';
export default {
  name: 'p-btn',
  props: {
    color: String,
    light: Boolean,
    icon: Boolean
  },
  data: () => ({
    hover: false
  }),
  computed: {
    getButtonStyle () {
      if (this.hover) {
        return {
          color: this.color ? colorMap[this.color] || colorMap.default : colorMap.default,
          background: colorMap.white,
          borderColor: this.color ? colorMap[this.color] || colorMap.default : colorMap.default
        }
      } else {
        return {
          color: this.light ? colorMap.white : colorMap.black,
          background: this.color ? colorMap[this.color] || colorMap.default : colorMap.default,
          borderColor: this.color ? colorMap[this.color] || colorMap.default : colorMap.default
        }
      }
    }
  },
  methods: {
    // click (e) {
    //   this.$emit('click', e)
    // }
  }
}
</script>

<style scoped lang="scss">
.p-btn {
  border: 1px solid;
  font-size: 1em;
  padding: 0.45em 0.65em;
  border-radius: 0.3em;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}
.p-icon-btn {
  padding: 0px;
  border-radius: 50%;
  height: 1.5em;
  width: 1.5em;
}
</style>