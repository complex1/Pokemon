<template>
  <nav class="v-center space-between">
      <div class="left-section v-center">
        <router-link to="/"><img src="@image/logo.svg" alt=""></router-link>
      </div>
      <div class="right-section v-center">
        <img src="@image/notification.svg" alt="">
        <chat />
      </div>
  </nav>
</template>

<script>
import chat from '@/components/chat/chat.vue'
export default {
  components: {
    chat
  },
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