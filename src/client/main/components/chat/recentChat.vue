<template>
  <div class="recent-chat flex space-between">
    <div class="v-center">
      <img src="@image/chat-meowth.svg" alt="" />
      <span>Meowth</span>
    </div>
    <button class="center" @click="$emit('openSearch')">
      <img width="22" src="@image/chat-search.svg" alt="" />
    </button>
  </div>
  <div class="user-card-container">
    <UserCard @selectUser="$emit('selectUser')"/>
    <UserCard @selectUser="$emit('selectUser')"/>
    <UserCard @selectUser="$emit('selectUser')"/>
    <UserCard @selectUser="$emit('selectUser')"/>
    <UserCard @selectUser="$emit('selectUser')"/>
  </div>
</template>

<script>
import UserCard from "@/components/chat/userCard.vue";
export default {
  emits: ["openSearch", "selectUser"],
  components: {
    UserCard,
  },
};
</script>

<style lang="scss" scoped>
.recent-chat {
  position: relative;
  padding: 25px 30px;
  &::before {
    content: "";
    position: absolute;
    top: 100%;
    left: 0;
    height: 2px;
    width: 100%;
    background: var(--chat-gradient);
  }
  span {
    margin-left: 16px;
    font-size: 30px;
    font-weight: bold;
    letter-spacing: 1px;
    background: linear-gradient(231.63deg, #c8fa00 -25.72%, #00d1ff 112%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  button {
    height: 40px;
    width: 40px;
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    box-shadow: var(--chat-shadow);
    background: var(--chat-background-color);
    border-radius: 50%;
    &:hover {
      background: var(--chat-hover-background-color);
    }
    &:active {
      background: var(--chat-background-color);
      box-shadow: var(--chat-inset-shadow);
    }
  }
}
.user-card-container {
  height: calc(100% - 100px);
  overflow-y: auto;
}
</style>