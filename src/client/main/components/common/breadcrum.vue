<template>
  <div class="breadcrum flex">
    <div class="breadcrum-link" v-for="link in path" :key="link.id" @click="goto(link)">
      <span class="breadcrum-link-separator">/</span>
      <span>{{ link.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Breadcrum",
  props: {
    path: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    goto(link) {
      this.$router.push(link.url);
    },
  }
}
</script>

<style scoped lang="scss">
@import '~@var';
.breadcrum-link {
  cursor: pointer;
  &:hover {
    color: $opt-2;
  }
}
</style>