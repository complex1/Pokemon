<template>
  <nav class="v-center space-between">
    <div class="left-section v-center">
      <router-link to="/"><img src="@image/logo.svg" alt="" /></router-link>
    </div>
    <div class="right-section v-center">
      <!-- <img src="@image/notification.svg" alt=""> -->
      <chat />
      <Popper>
        <div class="ml-4">
        <avatar
          size="30"
          :user="{
            name: userDetails.name || '',
            image: userDetails.avatar,
          }"
        />
      </div>
        <template #content>
          <div class="user-option">
            <a href="/user/login"> Logout</a>
          </div>
        </template>
      </Popper>
    </div>
  </nav>
</template>

<script>
import chat from "@/components/chat/chat.vue";
import Avatar from "./avatar.vue";
import Popper from "vue3-popper";
import { mapGetters } from "vuex";
export default {
  components: {
    chat,
    Avatar,
    Popper,
  },
  computed: {
    ...mapGetters("user", ["userDetails"]),
  },
};
</script>

<style lang="scss" scoped>
nav {
  height: 40px;
  padding: 2px 10px;
  background-color: var(--bg-color);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
  img {
    height: 30px;
    margin-right: 10px;
  }
  .user-option {
    background: white;
    width: 160px;
    padding: 10px;
    border-radius: 4px;
    font-size: 12px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  }
}
</style>