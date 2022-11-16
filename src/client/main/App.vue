<template>
  <navbar />
  <router-view class="view" />
</template>
<script>
import navbar from './components/common/navbar.vue'

export default {
  components: {
    navbar
  },
  created () {
    this.$store.dispatch('user/getUserDetails')
  }
}
</script>

<style lang="scss">
body {
      overflow: hidden;
}
.view {
      height: calc(100vh - 150px);
      overflow: auto;
}
</style>
