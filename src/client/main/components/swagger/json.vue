<template>
  <div class="fh fw json">
    <Vue3JsonEditor
      v-if="edit"
      v-model="bindData"
      @json-change="change"
      :show-btns="false"
      :expandedOnStart="false"
      mode="code"
      lang="en"/>
    <div v-else class="pika-json-view" :class="{'fh': full, 'resize': resize}">
      <div class="json" :class="{'fh': full}">
        <vue-json-pretty
        :data="modelValue"/>
      </div>
    </div>
  </div>
</template>

<script>

import { Vue3JsonEditor } from 'vue3-json-editor'
import VueJsonPretty from '../common/JsonTree/index.vue'

export default {
  name: 'PJson',
  emits: ['update:modelValue'],
  props: {
    edit: Boolean,
    modelValue: [String, Object, Array, Number, Boolean],
    full: Boolean,
    resize: {
      type: Boolean,
      default: true
    }
  },
  components: {
    Vue3JsonEditor,
    VueJsonPretty
  },
  data: () => ({
    bindData: {}
  }),
  watch: {
    modelValue: {
      deep: true,
      handler () {
        this.bindData = this.modelValue
      }
    }
  },
  methods: {
    change (e) {
      this.$emit('update:modelValue', e)
    } 
  },
  created () {
    this.bindData = this.modelValue
  }
}
</script>

<style lang="scss">
.json {
  min-height: 300px;
  & >div {
    height: 300px;
    .jsoneditor-vue {
      height: 300px;
    }
  }
}
.pika-json-view {
  position: relative;
  background: #fff;
  padding: 8px;
  border-radius: 8px;
  // box-shadow: inset 2px 2px 10px;
  .json {
    overflow: auto;
    padding-bottom: 20px;
    height: 250px;
    &.resize {
      resize: vertical;
    }
    &.fh {
      height: 100%;
    }
    &::-webkit-resizer {
      display: block;
      background: #000;
      border-radius: 50%;
    }
  }
  button {
    position: absolute;
    right: 10px;
    top: 10px;
    border: 0px solid;
    height: 25px;
    width: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background: white;
    box-shadow: 0px 0px 4px #000;
    z-index: 100;
  }
}
</style>