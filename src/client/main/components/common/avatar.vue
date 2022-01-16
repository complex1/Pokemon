<template>
  <img
    class="avatar-img"
    :width="size + 'px'"
    :height="size + 'px'"
    :class="{ online: user.isOnline }"
    v-if="isValidImage"
    :src="user.image"
    :alt="user.name"
    @error="handleError"
  />
  <div
    class="avatar-text"
    :class="{ online: user.isOnline }"
    :style="{
      background: user.themeColor || '#D9D7F1',
      width: size + 'px',
      height: size + 'px',
      fontSize: size / 2 + 'px'
    }"
  >
    {{
      user.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .substr(0, 2)
        .toUpperCase()
    }}
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 40,
    },
    user: {
      type: Object,
      default: () => ({
        name: "Shubham Maurya",
        image: "https://randomuser.me/api/portraits/",
        isOnline: true,
      }),
    },
  },
  data() {
    return {
      isValidImage: !!this.user.image,
    };
  },
  methods: {
    handleError() {
      this.isValidImage = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.avatar-img {
  border-radius: 50%;
  border: 2px solid #fff;
  position: relative;
}
.avatar-text {
  border-radius: 50%;
  border: 2px solid #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  letter-spacing: 1px;
  position: relative;
}
.online {
  &::before {
    content: "";
    position: absolute;
    height: 0.7em;
    width: 0.7em;
    border-radius: 50%;
    background: green;
    top: -5px;
    right: -5px;
  }
}
</style>