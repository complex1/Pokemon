<template>
  <div class="chat-user v-center">
    <button class="center" @click="$emit('goBack')">
      <img src="@image/chat-go-back.svg" alt="" />
    </button>
    <div class="user">
      <avatar
        :size="30"
        :user="{
          isOnline: openChatIsOnline,
          name: openChatName,
        }"
      />
      <span> {{ openChatName }} </span>
    </div>
  </div>
  <div class="chat-container" ref="chatContainer">
    <div class="secrate-key" :class="{open: expandKey}">
      <svg
        @click="toggleSecrateKey"
        width="10"
        height="20"
        viewBox="0 0 10 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.54499 4.08241C8.523 5.82814 7.2346 7.06936 5.85103 7.05194C4.46745 7.03451 3.21072 5.76123 3.23271 4.0155C3.25469 2.26977 4.54309 1.02854 5.92667 1.04597C7.31025 1.0634 8.56698 2.33668 8.54499 4.08241Z"
          stroke="white"
          stroke-width="2"
        />
        <line
          x1="6.02007"
          y1="7.55343"
          x2="4.3874"
          y2="19.6503"
          stroke="white"
          stroke-width="2"
        />
        <line
          x1="3.83095"
          y1="18.5034"
          x2="1.02132"
          y2="18.1779"
          stroke="white"
          stroke-width="2"
        />
        <line
          x1="5.06264"
          y1="16.8243"
          x2="2.25301"
          y2="16.4988"
          stroke="white"
          stroke-width="2"
        />
        <line
          x1="4.04506"
          y1="15.1025"
          x2="1.23543"
          y2="14.7769"
          stroke="white"
          stroke-width="2"
        />
      </svg>
      <input v-if="expandKey" type="password" v-model="secrateKey" @keypress.enter="setSalt">
    </div>
    <div
      v-for="msg in chat"
      :key="msg.id"
      class="chat-row"
      :class="{ right: msg.from_user !== openChatEmail }"
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
    <input
      v-model="message"
      @keypress.enter="sendMessage"
      type="text"
      placeholder="Type message..."
    />
    <button class="center" @click="sendMessage">
      <img src="@image/chat-send.svg" alt="" />
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import avatar from "../common/avatar.vue";
import crypto from "@/utils/crypto";
export default {
  components: { avatar },
  emits: ["goBack"],
  data() {
    return {
      message: "",
      expandKey: false,
      secrateKey: '',
      cipher: null,
      decipher: null,
    };
  },
  computed: {
    ...mapGetters("chat", [
      "getChatWithEmail",
      "openChatEmail",
      "openChatName",
      "openChatIsOnline",
    ]),
    chat () {
      return this.getChatWithEmail.msg.map(msg => {
        msg.message = typeof this.cipher === 'function' ? this.decipher(msg.message) : msg.message
        return msg;
      });
    },
  },
  watch: {
    getChatWithEmail: {
      handler() {
        setTimeout(() => {
          this.$refs.chatContainer.scrollTop =
            this.$refs.chatContainer.scrollHeight;
        }, 100);
      },
      deep: true,
    },
  },
  created() {
    this.$store.dispatch("chat/getChat");
  },
  methods: {
    setSalt () {
      this.cipher = crypto.cipher(this.secrateKey);
      this.decipher = crypto.decipher(this.secrateKey);
      this.expandKey = false;
    },
    toggleSecrateKey () {
      this.expandKey = !this.expandKey
    },
    sendMessage() {
      this.$store.dispatch("chat/sendMessage", 
      typeof this.cipher === 'function' ? this.cipher(this.message) : this.message );
      this.message = "";
    },
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
  position: relative;
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
  .secrate-key {
    position: sticky;
    width: 25px;
    top: 10px;
    padding: 4px 8px;
    z-index: 1;
    background: var(--chat-background-color);
    box-shadow: var(--chat-shadow);
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    transition: width 0.3s ease-in-out;
    display: flex;
    &:hover {
      background: var(--chat-hover-background-color);
    }
    &.open {
      width: 100%;
    }
    & > input {
      border-radius: 2em;
      margin: 0 16px;
      padding: 4px 16px;
      color: white;
      flex-grow: 1;
      background: transparent;
      border: 1px solid var(--chat-text-light-color);
    }
  }
</style>