<template>
  <img @click="openChat" src="@image/chat.svg" alt="chat" />
  <section class="chat-window">
    <div>
      <RecentChat
        @openSearch="openScreen('SearchUser')"
        @selectUser="selectUser"
        v-if="openChatScreen === 'RecentChat'"
        :chats="chats"
      />
      <SearchUser
        @goBack="openScreen('RecentChat')"
        @selectUser="selectUser"
        v-if="openChatScreen === 'SearchUser'"
      />
      <UserChat
        @goBack="openScreen('RecentChat')"
        v-if="openChatScreen === 'UserChat'"
      />
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import RecentChat from "@/components/chat/recentChat.vue";
import SearchUser from "@/components/chat/searchUser.vue";
import UserChat from '@/components/chat/userChat.vue';
export default {
  name: "Chat",
  components: {
    RecentChat,
    SearchUser,
    UserChat,
  },
  data: function () {
    return {
      openChatWindow: false,
      openChatScreen: "RecentChat",
    };
  },
  created() {
    this.$store.dispatch("chat/initChatSocket");
  },
  computed: {
    ...mapGetters('chat', ['chats'])
  },
  methods: {
    openChat() {
      this.openChatWindow = true;
    },
    closeChat() {
      this.openChatWindow = false;
    },
    openScreen(screen) {
      this.openChatScreen = screen;
    },
    selectUser() {
      this.openChatScreen = "UserChat";
    },
  },
};
</script>
<style lang="scss" scoped>
.chat-window {
  position: fixed;
  right: 20px;
  top: 50px;
  bottom: 50px;
  width: 450px;
  background: var(--chat-background-color);
  z-index: 9999;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    margin: -1px;
    border-radius: 12px;
    background: var(--chat-gradient);
  }
  & > div {
    height: 100%;
    width: 100%;
    background: var(--chat-background-color);
    border-radius: 12px;
  }
}
</style>