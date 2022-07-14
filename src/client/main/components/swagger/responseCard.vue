<template>
  <div class="response-card">
    <div v-if="openCard">
      <div v-if="isLoading" class="p-loader"/>
      <div v-else class="p-4 my-3 bg-black round tx-white">{{reqConfig.method.toUpperCase()}}: {{reqConfig.url}}</div>
      <div v-if="hasError" class="bg-alert p-4 mb-3 round tx-white">
        {{errorMessage}}
        <p-json v-model="errorObject" :edit="false" class="tx-n mt-3"/>
      </div>
      <div v-else>
        <p-json  v-model="resData" :edit="false" />
      </div>
    </div>
  </div>
</template>

<script>
import proxy from '@/api/proxy.js'
import PJson from "./json.vue";

export default {
  name: 'responceCard',
  components: {
    PJson
  },
  data: () => ({
    resData: null,
    reqConfig: null,
    loading: false,
    error: false,
    errorMessage: '',
    errorObject: null,
    openCard: false
  }),
  computed: {
    isLoading () {
      return this.loading
    },
    hasError () {
      return !this.loading && this.error
    }
  },
  methods: {
    proxySuccess (res) {
      this.openCard = true
      this.loading = false
      this.reqConfig = res.requestConfig
      if (res.error) {
        this.error = true
        this.errorMessage = res.errorMessage.message
        this.errorObject = res.errorMessage.errorObj
      } else {
        this.error = false
        this.resData = res.responseBody
      }
    },
    applyApiCall (config) {
      this.loading = true
      proxy.proxyCall(config, this.proxySuccess)
    }
  }
}
</script>

<style>

</style>