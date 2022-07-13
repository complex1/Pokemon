<template>
  <span class="json-tree">
    <span v-if="getType === 'string'" class="json-value-string">"{{data}}"</span>
    <span v-if="getType === 'number'" class="json-value-number">{{data}}</span>
    <span v-if="getType === 'boolean'" class="json-value-boolean">{{data}}</span>
    <span v-if="getType === 'undefined'" class="json-value-undefined">undefined</span>
    <span v-if="getType === 'null'" class="json-value-null">null</span>
    <span v-if="getType === 'object'">
      <span @click="toggle" class="json-value-brac">{</span>
      <div v-show="show" class="object-ele" v-for="(i,key) in data" :key="key">
        <span class="json-value-key mr-2" :style="shiftEle">"{{key}}"&nbsp;:&nbsp;&nbsp;</span>
        <jsonTree :data="i" :shift="shift*1 + 1" :depth="depth - 1"/>
      </div>
      <span v-show="!show" @click="toggle">&nbsp;&nbsp;...&nbsp;&nbsp;</span>
      <span class="json-value-brac" :style="shiftBrac">}</span>
    </span>
    <span v-if="getType === 'array'">
      <span class="json-value-brac" @click="toggle" >[</span>
      <div v-show="show" class="arr-ele" v-for="(i,index) in data" :key="index">
        <jsonTree :style="shiftEle" :data="i" :shift="shift*1 + 1" :depth="depth - 1"/>
      </div>
      <span v-show="!show" @click="toggle">&nbsp;&nbsp;...&nbsp;&nbsp;</span>
      <span class="json-value-brac" :style="shiftBrac">]</span>
    </span>
  </span>
</template>

<script>
import tree from './index.vue'
export default {
  name: 'jsonTree',
  props: {
    data: {
      default: () => {}
    },
    shift: {
      type: Number,
      default: 1
    },
    depth: {
      type: Number,
      default: 1
    }
  },
  components: {
    jsonTree: tree
  },
  data: () => {
    return {
      show: false
    }
  },
  methods: {
    toggle () {
      this.show = !this.show
    }
  },
  computed: {
    shiftBrac () {
      if (this.show) {
        return {
          marginLeft: `${(this.shift - 1) * 15}px`
        }
      } else {
        return {
          marginLeft: '0px'
        }
      }
    },
    shiftEle () {
      return {
        marginLeft: `${this.shift * 15}px`
      }
    },
    getType () {
      if (this.data === null) {
        return 'null'
      }
      if (typeof this.data !== 'object') {
        return typeof this.data
      } else {
        if (Array.isArray(this.data)) {
          return 'array'
        } else {
          return 'object'
        }
      }
    }
  },
  created () {
    if (this.depth !== undefined && this.depth > 0) {
      this.show = true
    }
  }
}
</script>

<style>
.json-tree {
  font-size: 14px;
  font-family: Monaco, Menlo, "Ubuntu Mono", Consolas, source-code-pro, monospace;
}
.json-value-number {
  color:#ff0100;
}
.json-value-string {
  color: #008000;
}
.json-value-boolean {
  color: #ff8e0b;
}
.json-value-undefined {
  color: #aaaaaa;
}
.json-value-null {
  color: rgb(70, 70, 247);
}
.json-value-key {
  color: #1a1a1a;
  font-size: 0.9em;
}
.json-value-brac {
  color: #7f7f7f;
}
.json-value-brac:hover {
      border: 1px solid #818181;
}
.json-value-brac:hover ~ .json-value-brac {
      border: 1px solid #818181;
}
.json-value-brac:hover  .json-value-brac {
      border: 1px solid #818181;
}
</style>
