<template>
  <div class="user-card v-center" @click="$emit('selectUser')">
    <Avatar />
    <div>
      <p class="user-name">Lorem Ipsum</p>
      <p v-if="!onlyUser" class="user-msg">Lorem ipsum dolor sit amet,</p>
    </div>
    <div v-if="!onlyUser" class="date">88:88 PM</div>
    <div  v-if="!onlyUser" class="unread-msg center">9+</div>
  </div>
</template>

<script>
import Avatar from "@/components/common/avatar.vue";
export default {
    components: {
        Avatar
    },
    emits: ["selectUser"],
    props: {
        onlyUser: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style lang="scss" scoped>
.user-card {
  position: relative;
  margin: 30px;
  padding: 20px 20px;
  border-radius: 6px;
  background: var(--chat-background-color);
  box-shadow: var(--chat-shadow);
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 50px calc(100% - 100px);
  &:hover {
    background: var(--chat-hover-background-color);
  }
  p {
    color: var(--chat-text-color);
    &.user-name {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 5px;
    }
    &.user-msg {
      font-size: 14px;
      color: var(--chat-text-light-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .date {
    position: absolute;
    right: 10px;
    top: 5px;
    font-size: 13px;
    color: var(--chat-text-light-color);
  }
  .unread-msg {
    position: absolute;
    right: 10px;
    bottom: 10px;
    padding: 4px 8px;
    background: var(--red-color);
    font-size: 12px;
    border-radius: 2em;
    color: var(--white-color);
  }
}
</style>