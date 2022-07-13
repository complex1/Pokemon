<template>
  <div class="no-server bg-ele-2 round my-10 p-6 flex">
    <img :src="runningPika" width="100px" alt="">
    <div class="pl-10 fh flex-grow h-center">
      <h3 class="tx-header mb-1 bold tx-warning">Loading...</h3>
    </div>
  </div>
</template>

<script>
const runningPika = require("@image/pikachu-running.gif")
export default {
  name: 'NoServer',
  data: () => ({
    runningPika
  })
}
</script>

<style lang="scss" scoped >
@import '@var';
.no-server {
  position: relative;
  background: rgba($color: $pink-lace, $alpha: 0.4);
  img {
    position: absolute;
    top: 35px;
    animation: movepika 4s infinite linear;
  }
  h3 {
    font-size: 50px;
  }
  @keyframes movepika {
    from {left: 0%;}
    to {left: calc(100% - 150px);}
  }
}
</style>