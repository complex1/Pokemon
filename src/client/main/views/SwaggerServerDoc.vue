<template>
  <div class="swagger">
    <div class="container">
      <nav class="v-center space-between">
        <breadcrum :path="path"></breadcrum>
        <div class="p-input my-4 ml-4">
          <select class="block" v-model="openServerId">
            <option
              v-for="server in servers"
              :key="server.id"
              :value="server.id"
            >
              {{ server.name }}
            </option>
          </select>
          <label>Doc Version</label>
        </div>
      </nav>
      <div>
        <no-server v-if="!selectedServer" />
        <loading-server v-else-if="showLoadingServer" />
        <server-error
          :error="error"
          v-else-if="showServerError"
          @retry="fetchApiDocs"
        />
        <doc-compile-error
          :error="{ message: compileErrorMessage }"
          v-else-if="showCompileError"
        />
        <api-docs v-else :apiDocs="apiDoc" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import breadcrum from "../components/common/breadcrum.vue";
import ApiDocs from "../components/swagger/apiDocs.vue";
import DocCompileError from "../components/swagger/docCompileError.vue";
import LoadingServer from "../components/swagger/loadingServer.vue";
import noServer from "../components/swagger/noServer.vue";
import ServerError from "../components/swagger/serverError.vue";
import swaggerDocFormatter from "../helper/swagger-doc";
import openapiDocFormatter from "../helper/openapi-doc.js";
export default {
  components: {
    breadcrum,
    DocCompileError,
    LoadingServer,
    noServer,
    ServerError,
    ApiDocs,
  },
  name: "SwaggerServerDoc",
  data() {
    return {
      openServerId: "",
      status: 2,
      error: {},
      compileError: false,
      apiDoc: null,
      compileErrorMessage: "",
    };
  },
  computed: {
    ...mapState("swagger", ["servers", "openFolder", "openServer"]),
    selectedServer() {
      return this.openServer || null;
    },
    showLoadingServer() {
      return this.selectedServer && this.status === 0;
    },
    showServerError() {
      return this.selectedServer && this.status === -1;
    },
    showCompileError() {
      return this.selectedServer && this.status === 1 && this.compileError;
    },
    showApiDoc() {
      return !this.showCompileError;
    },
    path() {
      if (this.openServer) {
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
          {
            id: this.openServer.id,
            name: this.openServer.name,
            url: `/pikachu/project/${this.openFolder.id}/server/${this.openServer.id}`,
          },
        ];
      }
      return [];
    },
  },
  watch: {
    openServer: {
      deep: true,
      handler(newVal) {
        if (newVal) {
          this.fetchApiDocs();
        }
      },
    },
  },
  methods: {
    fetchCompleted(res) {
      if (res.error) {
        this.status = -1;
        this.error = res.errorMessage;
      } else {
        try {
          this.apiDoc = res.responseBody.openapi
            ? openapiDocFormatter(res.responseBody)
            : swaggerDocFormatter(res.responseBody);
          this.$store.commit("swagger/setApiDoc", this.apiDoc);
          this.compileError = false;
        } catch (e) {
          console.error(e);
          this.compileErrorMessage = e.message;
          this.compileError = true;
        }
        this.status = 1;
      }
    },
    fetchApiDocs() {
      this.status = 0;
      const self = this;
      this.$store.dispatch("swagger/getServerApiDoc", {
        server: {
          name: self.openServer.name,
          proto: self.openServer.proto,
          endpoint: self.openServer.endpoint,
          docPath: self.openServer.docPath,
        },
        cb: this.fetchCompleted,
      });
    },
  },
  created() {
    this.openServerId = +this.$route.params.serverId;
    this.$store.dispatch("swagger/fetchAllServer", {
      projectId: +this.$route.params.projectId,
      serverId: +this.$route.params.serverId,
    });
  },
};
</script>

<style lang="scss" scoped>
.swagger {
  background: rgb(255, 255, 255);
  height: calc(100vh - 40px);
}
.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  height: calc(100vh - 40px);
  overflow: auto;
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