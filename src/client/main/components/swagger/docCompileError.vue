<template>
  <div class="no-server bg-ele-2 round my-10 p-5 flex">
    <img :src="seriousPika" width="100px" alt="">
    <div class="pl-10 fh tx-alert">
      <h3 class="tx-x-lg mb-1">Doc Compile Error ERROR!!</h3>
      <p class="tx-small tx-light">
        <b>Error:</b>
        <span class="tx-alert pl-2">{{error.message}}</span>
      </p>
    </div>
  </div>
</template>

<script>
const seriousPika = require("@image/pikachu-serious-2.gif")
export default {
  name: 'NoServer',
  props: {
    error: Object
  },
  data: () => ({
    seriousPika
  })
}
</script>

<style lang="scss" scoped >
@import '@var';
.no-server {
  background: rgba($color: $alert, $alpha: 0.3);
}
</style>