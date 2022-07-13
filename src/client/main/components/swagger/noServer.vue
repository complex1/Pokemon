<template>
  <div class="no-server bg-ele-2 round my-10 p-5 flex">
    <img :src="noExpression" width="100px" alt="">
    <div class="pl-10 fh">
      <h3 class="tx-x-lg mb-1 bold tx-warning">No Server is selected</h3>
      <p class="tx-small tx-light">Please select any server to experience best api documention system.</p>
      <p class="tx-small tx-light">If you haven't added any server please add a new server.</p>
    </div>
  </div>
</template>

<script>
const noExpression = require("@image/pikachu-sleep.gif")
export default {
  name: 'NoServer',
  data: () => ({
    noExpression
  })
}
</script>

<style lang="scss" scoped >
@import '@var';
.no-server {
  background: rgba($color: $opt-1, $alpha: 0.4);
}
</style>