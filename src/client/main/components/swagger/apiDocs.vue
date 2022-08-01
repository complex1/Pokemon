<template>
  <div class="api-docs">
    <controller-card
      v-for="controller in getControllers"
      :key="controller.id"
      :controller="controller"/>
  </div>
</template>

<script>
import 'vue-json-pretty/lib/styles.css';
import { mapState } from 'vuex';
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
  }),
  computed: {
    ...mapState("swagger", ['searchKeyword']),
    getControllers() {
      const controllers = {};
      const docsControllers = this.apiDocs.controllers || {};
      Object.keys(docsControllers).forEach(key => {
        let controller =  JSON.parse(JSON.stringify(docsControllers[key]));
        if (controller.apis) {
          controller.apis = controller.apis.filter(api => {
            return api.path.toLowerCase().includes(this.searchKeyword.toLowerCase());
          });
        }
        if (controller.apis && controller.apis.length > 0) {
          if (this.searchKeyword !== '') {
            controller.open = true;
          } else {
            controller.open = false;
          }
          controllers[key] = controller;
        }
        if (controller.apis && controller.apis.length === 0) {
          if (key.toLowerCase().includes(this.searchKeyword.toLowerCase())) {
            controller = JSON.parse(JSON.stringify(docsControllers[key]))
            controller.open = false;
            controllers[key] = controller;
          }
        }
      });
      return controllers
    }
  }
}
</script>

<style>

</style>