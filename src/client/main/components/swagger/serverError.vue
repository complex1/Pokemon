<template>
  <div class="no-server bg-ele-2 round my-10 p-5 flex">
    <img :src="seriousPika" width="100px" alt="">
    <div class="pl-10 fh tx-alert flex-grow">
      <div class="v-center space-between tx-x-small mb-3">
        <h3 class="tx-x-lg">ERROR!!</h3>
        <p-btn color="green" light @click="$emit('retry')">Retry </p-btn>
      </div>
      <p class="tx-small tx-light">
        <b>Error:</b>
        <span class="tx-alert pl-2">{{error.message}}</span>
      </p>
      <p class="tx-small tx-light">
        <b>Doc Api Path:</b>
        <a class="tx-alert pl-2" :href="url" target="_blank">{{url}}</a>
      </p>
    </div>
  </div>
</template>

<script>
const seriousPika = require("@image/pikachu-serious.gif")
export default {
  name: 'NoServer',
  props: {
    error: Object
  },
  data: () => ({
    seriousPika
  }),
  computed: {
    url () {
      return this.error.config?.url
    }
  }
}
</script>

<style lang="scss" scoped >
@import '@var';
.no-server {
  background: rgba($color: $alert, $alpha: 0.3);
}
</style>