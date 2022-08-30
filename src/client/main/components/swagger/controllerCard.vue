<template>
  <div class="controller p-4 mb-4 round bg-ele-1">
    <div class="v-center space-between detail">
      <h3 class="tx-x-lg tx-light pointer" @click="open = !open" v-html="getName(controller.name)" ></h3>
      <p class="tx-small">{{controller.description}}</p>
    </div>
    <div v-show="open">
      <api-card v-for="api in controller.apis" :key="api.id" :api="api" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import apiCard from './apiCard.vue'
export default {
  components: { apiCard },
  name: 'controllerCard',
  props: {
    controller: Object
  },
  data: () => ({
    open: false
  }),
  computed: {
    ...mapState("swagger", ['searchKeyword']),
    isOpen () {
      return this.controller.open
    }
  },
  methods: {
    getName (name) {
      return name.replace(this.searchKeyword, `<b class="search-find">${this.searchKeyword}</b>`)
    }
  },
  watch: {
    isOpen (val) {
      this.open = val
    }
  },
  mounted () {
    this.open = this.isOpen
  }
}
</script>

<style lang="scss" scoped>
@import '@var';
.controller {
  background: var(--bg-color-2);
  h3:hover {
    text-decoration: underline;
    color: $opt-2;
  }
}
</style>
<style>
.search-find {
    background: yellow;
  }
</style>