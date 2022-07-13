<template>
  <div class="api-docs">
    <controller-card
      v-for="controller in apiDocs.controllers"
      :key="controller.id"
      :controller="controller"/>
  </div>
</template>

<script>
import 'vue-json-pretty/lib/styles.css';
import ControllerCard from './controllerCard.vue';
export default {
  components: {ControllerCard },
  name: 'ApiDocs',
  props: {
    apiDocs: Object
  },
  data: () => ({
    json: {},
    edit: true
  })
}
</script>

<style>

</style>