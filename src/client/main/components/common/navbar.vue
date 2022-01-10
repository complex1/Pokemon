<template>
  <nav class="v-center space-between">
      <div class="left-section v-center">
        <img src="@image/logo.svg" alt="">
      </div>
      <div class="right-section v-center">
        <img src="@image/notification.svg" alt="">
        <img src="@image/chat.svg" alt="">
      </div>
  </nav>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
nav {
    height: 30px;
    padding: 2px 10px;
    background-color: var(--bg-color);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
    img {
        height: 20px;
        margin-right: 10px;
    }
}
</style>