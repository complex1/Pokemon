<template>
  <navbar />
  <router-view/>
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
</style>
