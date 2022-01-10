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
  setup() {
    
  }
}
</script>

<style lang="scss">
</style>
