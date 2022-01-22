<template>
  <div class="search-user v-center">
    <button class="center" @click="$emit('goBack')">
      <img src="@image/chat-go-back.svg" alt="" />
    </button>
    <input
      v-model="search"
      type="text"
      placeholder="Search User..."
      @keyup="searchUser"
    />
  </div>
  <div v-if="isLoading" class="loading-user" />
  <div v-else-if="!isLoading && users.length === 0" class="no-user-found">
    No search result found for user “<b>{{search}}</b>” 
  </div>
  <div v-else-if="!isLoading && users.length" class="user-card-container">
    <UserCard
      v-for="user in users"
      :key="user.id"
      :data="user"
      @selectUser="$emit('selectUser', user)"
      onlyUser/>
  </div>
</template>

<script>
import UserCard from "@/components/chat/userCard.vue";

export default {
  components: {
    UserCard,
  },
  emits: ["goBack", "selectUser"],
  data() {
    return {
      search: "",
      isLoading: false,
      users: [],
    };
  },
  methods: {
    searchUser() {
      this.isLoading = true;
      this.$store.dispatch("user/searchUser", {
        keyword: this.search,
        cb: (users) => {
          this.isLoading = false;
          this.users = users.data || []
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.search-user {
  position: relative;
  padding: 25px 30px;
  width: 100%;
  &::before {
    content: "";
    position: absolute;
    top: 100%;
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
    margin-left: 20px;
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
.user-card-container {
  height: calc(100% - 100px);
  overflow-y: auto;
}
.loading-user {
  height: 50px;
  width: 50px;
  margin: 50px auto;
  background: var(--chat-gradient);
  box-shadow: 1px 1px 2px var(--chat-color-1), -1px -1px 2px var(--chat-color-2);
  position: relative;
  border-radius: 50%;
  z-index: 1;
  animation: loading 1.5s linear infinite;

  &::before {
    content: "";
    position: absolute;
    height: calc(100% - 8px);
    width: calc(100% - 8px);
    border-radius: 50%;
    margin: 4px;
    background: var(--chat-background-color);    
  }
  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
 .no-user-found {
   width: 50%;
    margin: 50px auto;
    text-align: center;
    font-size: 16px;
    line-height: 1.5;
    background: linear-gradient(231.63deg, #c8fa00 -25.72%, #00d1ff 112%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    & > b {
      font-weight: normal;
      background: var(--red-color);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    }
  }
</style>