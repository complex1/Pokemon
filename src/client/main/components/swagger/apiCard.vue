<template>
  <div class="api-card mt-4 bg-ele-1 round">
    <div :class="`api-card-${api.method} p-4`">
      <div class="api-card-header v-center space-between">
        <div class="v-center">
          <h4 class="method-badge py-2 mr-4 tx round" @click="open = !open">
            {{ api.method }}
          </h4>
          <h4 class="api-path pointer tx-lg tx-light" @click="open = !open" v-html="getPath(api.path)">
          </h4>
        </div>
        <p class="tx-small tx-light">{{ api.description }}</p>
      </div>
      <div class="api-card-impl mt-3" v-if="open">
        <h5 class="mt-3 tx">{{ api.summary }}</h5>
        <div class="api-card-impl__request flex">
          <div class="tx-light pr-3">
            <div>
              <div class="flex space-between mt-3">
                <b>Headers:</b>
                <svg
                  @click="addNewHeader"
                  width="16"
                  height="16"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="10" y="2" width="5" height="21" fill="#00303D" />
                  <rect
                    x="22.9998"
                    y="10"
                    width="5"
                    height="21"
                    transform="rotate(89.7176 22.9998 10)"
                    fill="#00303D"
                  />
                </svg>
              </div>
              <div
                v-for="(header, index) in headers"
                :key="header.id"
                class="mt-2 request-property flex v-center space-between"
              >
                <div v-if="header.isCustom">
                  <input
                    style="width: 200px"
                    type="text"
                    v-model="headers[index].name"
                    :disabled="!edit"
                  />
                </div>
                <div class="mr-3" v-else>
                  <h6 class="tx tx-small">
                    {{ header.name
                    }}<b v-if="header.required" class="ml-1 tx-alert">*</b>
                  </h6>
                  <p class="tx-x-small">{{ header.description }}</p>
                </div>
                <input
                  type="text"
                  v-if="!header.hasOptions"
                  v-model="headers[index].value"
                  :disabled="!edit"
                />
                <select v-else v-model="headers[index].value" :disabled="!edit">
                  <option
                    v-for="option in header.options"
                    :key="option.id"
                    :value="option"
                  >
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
            <div v-if="pathParam.length">
              <div class="flex space-between mt-3">
                <b>Path Parameaters:</b>
              </div>
              <div
                v-for="(property, index) in pathParam"
                :key="property.id"
                class="mt-2 request-property flex v-center space-between"
              >
                <div class="mr-3">
                  <h6 class="tx tx-small">
                    {{ property.name
                    }}<b v-if="property.required" class="ml-1 tx-alert">*</b>
                  </h6>
                  <p class="tx-x-small">{{ property.description }}</p>
                </div>
                <input
                  type="text"
                  v-if="!property.hasOptions"
                  v-model="pathParam[index].value"
                  :disabled="!edit"
                />
                <select
                  v-else
                  v-model="pathParam[index].value"
                  :disabled="!edit"
                >
                  <option
                    v-for="option in property.options"
                    :key="option.id"
                    :value="option"
                  >
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
            <div v-if="query.length">
              <div class="flex space-between mt-3">
                <b>Query Parameaters:</b>
              </div>
              <div
                v-for="(property, index) in query"
                :key="property.id"
                class="mt-2 request-property flex v-center space-between"
              >
                <div class="mr-3">
                  <h6 class="tx tx-small">
                    {{ property.name
                    }}<b v-if="property.required" class="ml-1 tx-alert">*</b>
                  </h6>
                  <p class="tx-x-small">{{ property.description }}</p>
                </div>
                <input
                  type="text"
                  v-if="!property.hasOptions"
                  v-model="query[index].value"
                  :disabled="!edit"
                />
                <select v-else v-model="query[index].value" :disabled="!edit">
                  <option
                    v-for="option in property.options"
                    :key="option.id"
                    :value="option"
                  >
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
            <div v-if="api.body">
              <div class="mt-3">
                <b>Request Body:</b>
              </div>
              <p-json class="mt-2" v-model="body" :edit="edit" />
            </div>
            <div class="tx-small mt-3 flex flex-end">
              <p-btn v-if="!edit" color="lightBlue" @click="edit = true" light>
                Edit
              </p-btn>
              <p-btn
                v-if="edit"
                color="green"
                light
                class="ml-2"
                @click="applyApiCall"
              >
                Apply
              </p-btn>
              <p-btn
                v-if="edit"
                color="lightBlue"
                light
                class="ml-2"
                @click="setProperty"
              >
                Reset
              </p-btn>
              <p-btn
                v-if="edit"
                color="red"
                @click="edit = false"
                light
                class="ml-2"
              >
                Cancel
              </p-btn>
            </div>
          </div>
          <div class="tx-light">
            <p v-if="api.consumes && api.consumes.length" class="tx mt-2">
              <b class="mr-2">Consumes:</b> {{ api.consumes.join(", ") }}
            </p>
            <p v-if="api.produces && api.produces.length" class="tx mt-2">
              <b class="mr-2">Produces:</b> {{ api.produces.join(", ") }}
            </p>
            <div class="mt-2 flex">
              <p class="tx bold">Response:</p>
              <div class="flex-grow response-body px-2">
                <p-json :modelValue="api.response" :edit="false" />
              </div>
            </div>
          </div>
        </div>
        <div class="api-card-impl__response">
          <response-card ref="responseCard" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { cloneDeep } from "lodash";
import { mapState } from "vuex";
import responseCard from "./responseCard.vue";
import PBtn from "./PBtn.vue";
import PJson from "./json.vue";
export default {
  components: { responseCard, PBtn, PJson },
  name: "apiCard",
  props: {
    api: Object,
  },
  data: () => ({
    edit: false,
    open: false,
    body: {},
    headers: [],
    pathParam: [],
    query: [],
  }),
  computed: {
    ...mapState("swagger", ["apiDoc", "proxyPath", "openServer", "searchKeyword"]),
  },
  methods: {
    getPath (path) {
      return path.replace(this.searchKeyword, `<b class="search-find">${this.searchKeyword}</b>`)
    },
    setProperty() {
      this.body = cloneDeep(this.api.body || null);
      this.headers = cloneDeep(this.api.header || []);
      this.pathParam = cloneDeep(this.api.pathParam);
      this.query = cloneDeep(this.api.query);
    },
    addNewHeader() {
      this.headers.push({
        name: "custom-header",
        description: "Custom",
        isCustom: true,
        required: true,
        hasOptions: false,
        type: "string",
        value: "",
      });
    },
    applyApiCall() {
      const requestConfig = {
        proto: this.openServer.proto,
        baseUrl: this.apiDoc.host + this.apiDoc.basePath,
        url: this.api.path,
        method: this.api.method,
        query: this.query.reduce((q, e) => {
          q[e.name] = e.value;
          return q;
        }, {}),
        params: this.pathParam.reduce((q, e) => {
          q[e.name] = e.value;
          return q;
        }, {}),
        headers: this.headers.reduce((q, e) => {
          q[e.name] = e.value;
          return q;
        }, {}),
        body: this.body,
      };
      this.$refs.responseCard.applyApiCall(requestConfig);
    },
  },
  mounted() {
    this.setProperty();
  },
};
</script>

<style scoped lang="scss">
@import "@var";
.api-card {
  &-get {
    background: rgba($opt-2, 0.1);
    .method-badge {
      background: $opt-2;
    }
  }
  &-post {
    background: rgba($success, 0.15);
    .method-badge {
      background: $success;
    }
  }
  &-put {
    background: rgba($warning, 0.15);
    .method-badge {
      background: $warning;
    }
  }
  &-delete {
    background: rgba($alert, 0.15);
    .method-badge {
      background: $alert;
    }
  }
  .method-badge {
    text-align: center;
    text-transform: uppercase;
    color: $white;
    width: 80px;
  }
  .api-path {
    &:hover {
      text-decoration: underline;
      color: $opt-2;
    }
  }
  &-impl {
    border-top: 1px solid $text-lightest;
    &__request {
      & > div {
        width: 50%;
      }
    }
    .request-property {
      input,
      select {
        font-size: 14px;
        color: $text-light;
        border-radius: 4px;
        border: 1px solid $text-light;
        padding: 4px 8px;
        width: 300px;
        &:focus {
          border: 1px solid $opt-2;
          outline: none;
          box-shadow: 0px 0px 5px $opt-2;
        }
      }
    }
  }
}
</style>