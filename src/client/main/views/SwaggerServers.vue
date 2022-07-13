<template>
  <div class="swagger">
    <div class="container">
      <nav class="v-center space-between">
        <breadcrum :path="path"></breadcrum>
        <p-btn color="green" light @click="overlay = true">
          ADD NEW SERVER</p-btn
        >
      </nav>
      <div class="flex wrap">
        <server-card
          v-for="server in servers"
          :key="server.id"
          :server="server"
        />
      </div>
    </div>
    <div class="modal" v-if="overlay">
      <new-server-form @close="overlay = false" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import breadcrum from "../components/common/breadcrum.vue";
import NewServerForm from "../components/swagger/newServerForm.vue";
import ServerCard from "../components/swagger/serverCard.vue";
import PBtn from "../components/swagger/PBtn.vue";

export default {
  components: { breadcrum, PBtn, NewServerForm, ServerCard },
  name: "Swagger",
  data() {
    return {
      overlay: false,
    };
  },
  computed: {
    ...mapState("swagger", ["servers", "openFolder"]),
    path() {
      if (this.openFolder) {
        return [
          {
            id: "pikachu",
            name: "Pikachu",
            url: "/pikachu",
          },
          {
            id: this.openFolder.id,
            name: this.openFolder.folder_name,
            url: `/pikachu/project/${this.openFolder.id}`,
          },
        ];
      }
      return [];
    },
  },
  created() {
    this.$store.dispatch("swagger/getServers", this.$route.params.projectId);
  },
};
</script>

<style lang="scss" scoped>
.swagger {
  background: rgb(255, 255, 255);
  height: calc(100vh - 30px);
}
.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  & > form {
    background: white;
    border-radius: 8px;
  }
}
</style>