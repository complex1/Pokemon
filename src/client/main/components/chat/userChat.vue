<template>
  <div class="chat-user v-center">
    <button class="center" @click="$emit('goBack')">
      <img src="@image/chat-go-back.svg" alt="" />
    </button>
    <div class="user">
      <avatar :size="30" :user="{
        isOnline: openChatIsOnline,
        name: openChatName,

      }" />
      <span> {{openChatName}} </span>
    </div>
  </div>
  <div class="chat-container">
    <div
      v-for="msg in getChatWithEmail.msg"
      :key="msg.id"
      class="chat-row"
      :class="{ 'right': msg.from_user !== openChatEmail }"
    >
      <div class="chat-box">
        <p class="msg">{{ msg.message }}</p>
        <p class="time">
          {{
            new Date(msg.updated_at).toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })
          }}
        </p>
      </div>
    </div>
  </div>
  <div class="chat-text v-center">
    <input v-model="search" type="text" placeholder="Type message..." />
    <button class="center">
      <img src="@image/chat-send.svg" alt="" />
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import avatar from "../common/avatar.vue";
export default {
  components: { avatar },
  emits: ["goBack"],
  computed: {
    ...mapGetters("chat", ["getChatWithEmail", "openChatEmail", "openChatName", "openChatIsOnline" ]),
  },
  created() {
    this.$store.dispatch("chat/getChat");
  },
};
</script>

<style lang="scss" scoped>
.chat-user {
  position: relative;
  padding: 25px 30px;
  width: 100%;
  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 100%;
    background: var(--chat-gradient);
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
  .user {
    flex-grow: 1;
    display: flex;
    align-items: center;
    margin-left: 16px;
    padding: 8px 16px;
    box-shadow: var(--chat-shadow);
    border-radius: 6px;
    & > span {
      font-size: 20px;
      font-weight: 500;
      margin-left: 16px;
      color: var(--chat-text-color);
    }
  }
}
.chat-container {
  height: calc(100% - 180px);
  overflow-y: scroll;
  .chat-row {
    display: flex;
    align-items: flex-end;
    margin: 25px 16px;
    .chat-box {
      position: relative;
      padding: 12px;
      padding-bottom: 30px;
      border-radius: 12px;
      border-top-left-radius: 0px;
      min-width: 100px;
      background: var(--chat-background-color);
      box-shadow: var(--chat-shadow);
      .msg {
        font-size: 14px;
        color: var(--chat-text-color);
      }
      .time {
        position: absolute;
        right: 6px;
        bottom: 6px;
        font-size: 12px;
        color: var(--chat-text-light-color);
        margin-left: 16px;
      }
    }
    &.right {
      flex-direction: row-reverse;
      .chat-box {
        margin-left: 16px;
        margin-right: 16px;
        border-radius: 12px;
        border-bottom-right-radius: 0px;
      }
    }
  }
}
.chat-text {
  position: relative;
  padding: 25px 30px;
  padding-bottom: 0;
  width: 100%;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 2px;
    width: 100%;
    background: var(--chat-gradient);
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
  input {
    flex-grow: 1;
    margin-right: 20px;
    font-size: 16px;
    background: var(--chat-background-color);
    border: none;
    border-radius: 2em;
    box-shadow: var(--chat-inset-shadow);
    color: var(--chat-text-light-color);
    padding: 16px 20px;
    &::placeholder {
      font-style: italic;
      color: var(--chat-text-lightest-color);
    }
  }
}
</style>