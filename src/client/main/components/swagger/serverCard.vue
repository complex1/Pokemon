<template>
  <div class="server-card flex space-between m-4 bg-ele-1 p-5">
    <div class="pt-4 pointer" @click="openServer">
      <h2 class="tx-x-lg tx-n tx-ellipsis" :title="server.name">{{server.name}}</h2>
      <span class="tx-light tx-small py-3 block tx-line-break"> {{docPath}}</span>
    </div>
    <div class="flex flex-end">
      <button v-tooltip.bottom-start="'Health Check'" class="fa fa-heartbeat tx-o2" @click="healthCheck"></button>
      <button v-tooltip.bottom-end="'Edit'" class="fa fa-edit tx-success" @click="editServer"></button>
      <button v-tooltip.bottom-end="'Delete'" class="fa fa-trash tx-alert" @click="deleteServer"></button>
    </div>
    <p
      v-tooltip.bottom-end="status === 1 ? 'Success' : status === -1 ? errorMessage : 'Testing..'"
      v-if="status !== 2"
      class="status-chip pill tx-x-small px-3 mx-2 py-1 tx-white pointer"
      :class="status === 1 ? 'bg-success' : status === -1 ? 'bg-alert' : 'bg-warning'">
        {{status === 1 ? "Success" : status === -1 ? "Failed" : "Testing.."}}
      </p>
    <div class="overlay" v-if="overlay">
      <new-server-form @close="overlay = false" ref="serverForm"/>
    </div>
  </div>
</template>

<script>
import newServerForm from './newServerForm.vue'
export default {
  components: { newServerForm },
  props: {
    server: Object
  },
  data: () => ({
    overlay: false,
    status: 2,
    errorMessage: '',
  }),
  computed: {
    docPath () {
      return `${this.server.proto}${this.server.endpoint}${this.server.docPath}`
    }
  },
  methods: {
    healthCheck () {
      this.status = 0
      this.$store.dispatch('swagger/getServerApiDoc', {
        server: {
          name: this.server.name,
          proto: this.server.proto,
          endpoint: this.server.endpoint,
          docPath: this.server.docPath
        },
        cb: (res) => {
          if (res.error) {
            this.status = -1
            this.errorMessage = res.errorMessage.message
          } else {
            this.status = 1
          }
        }
      })
    },
    deleteServer () {
      this.$store.dispatch('swagger/deleteServer', this.server.id)
    },
    editServer () {
      this.overlay = true
      setTimeout(() => {
        const form = this.$refs.serverForm
        form.name = this.server.name
        form.proto = this.server.proto
        form.endpoint = this.server.endpoint
        form.docPath = this.server.docPath
        form.docVersion = this.server.docVersion
        form.id = this.server.id
      }, 500)
    },
    openServer () {
      this.$router.push(`/pikachu/project/${this.server.folder_id}/server/${this.server.id}`)
    }
  },
  created () {
    this.healthCheck()
  }
}
</script>

<style scoped lang="scss">
@import '@var';

.server-card {
  position: relative;
  flex-direction: column;
  width: calc(25% - 32px);
  height: 250px;
  min-width: 230px;
  border-radius: 8px;
  background-color: var(--bg-color-2);
  button.fa {
    border: 0px solid;
    font-size: 16px;
    height: 30px;
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    border-radius: 50%;
    margin: 5px;
    box-shadow: 0px 0px 6px rgb(126, 123, 123);
  }
  .status-chip {
    position: absolute;
    top: 5px;
    right: 5px;
  }
}
</style>