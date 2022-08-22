<template>
  <section class="fb-window" :style="getPosition" >
      <div
        class="resize resize-left"
        ref="resizeLeft"
        @mousedown="activeResize($event, 'left')"
      />
      <div
        class="resize resize-right"
        ref="resizeRight"
        @mousedown="activeResize($event, 'right')"
      />
      <div
        class="resize resize-bottom"
        ref="resizeBottom"
        @mousedown="activeResize($event, 'bottom')"
      />
      <div
        class="resize resize-top"
        ref="resizeTop"
        @mousedown="activeResize($event, 'top')"
      />
      <div class="fa fa-expand-arrows-alt" ref="parent"></div>
      <div class="fa fa-times" @click="close"></div>
      <slot />
  </section>
</template>

<script>
export default {
  name: "FbWindow",
  props: {
    title: String,
    w: [Number, String],
    h: [Number, String],
    x: [Number, String],
    y: [Number, String],
    targetEle: [Object, Array],
    theme_color: {
      type: String,
      default: "red",
    },
    theme_text: {
      type: String,
      default: "#fff",
    },
  },
  data: () => ({
    dir: "left",
    position: {
      y: 100,
      x: 100,
      r: 0,
      b: 0,
      h: 200,
      w: 300,
    },
    offset: {
      x: 0,
      y: 0,
    },
  }),
  computed: {
    getPosition() {
      return {
        top: `${this.position.y}px`,
        left: `${this.position.x}px`,
        height: `${this.position.h}px`,
        width: `${this.position.w}px`,
      };
    },
  },
  methods: {
    close () {
      this.$emit("close");
    },
    move(e) {
      e.preventDefault();
      const position = this.position;
      const x = e.x - this.offset.x;
      if (x >= 0 && x <= window.innerWidth - 40) {
        position.x = x;
      }
      const y = e.y - this.offset.y;
      if (y >= 0 && y <= window.innerHeight - 40) {
        position.y = y;
      }
    },
    stopMove() {
      window.removeEventListener("mousemove", this.move);
      this.$emit("change", this.position);
    },
    activate(e) {
      e.preventDefault();
      this.offset.x = e.x - this.position.x;
      this.offset.y = e.y - this.position.y;
      window.addEventListener("mousemove", this.move);
      window.addEventListener("mouseup", this.stopMove);
    },
    resize(e) {
      e.preventDefault();
      const mX = e.pageX;
      const mY = e.pageY;
      if (this.dir === "left") {
        this.position.w = this.position.w - (mX - this.position.x);
        this.position.w = this.position.w < 150 ? 150 : this.position.w;
        this.position.x = mX;
      } else if (this.dir === "right") {
        this.position.w = mX - this.position.x;
        this.position.w = this.position.w < 150 ? 150 : this.position.w;
      } else if (this.dir === "bottom") {
        this.position.h = mY - this.position.y;
        this.position.h = this.position.h < 150 ? 150 : this.position.h;
      }
      if (this.dir === "top") {
        this.position.h = this.position.h - (mY - this.position.y);
        this.position.h = this.position.h < 150 ? 150 : this.position.h;
        this.position.y = mY;
      }
    },
    stopResize() {
      window.removeEventListener("mousemove", this.resize);
      this.$emit("change", this.position);
    },
    activeResize(e, dir) {
      e.preventDefault();
      e.stopPropagation();
      this.position.r = window.innerWidth - this.position.x - this.position.w;
      this.position.b = window.innerHeight - this.position.y - this.position.h;
      this.dir = dir;
      window.addEventListener("mousemove", this.resize);
      window.addEventListener("mouseup", this.stopResize);
    },
  },
  mounted() {
    const grabEle = this.$refs.parent;
    grabEle.addEventListener("mousedown", this.activate);
    this.position.h = this.h || 200;
    this.position.w = this.w || 200;
    this.position.x = this.x || 100;
    this.position.y = this.y || 100;
    if (window.innerWidth < this.position.x + this.position.w) {
      this.position.x = window.innerWidth - this.position.w;
    }
    if (window.innerHeight < this.position.y + this.position.h) {
      this.position.y = window.innerHeight - this.position.h;
    }
  },
};
</script>

<style lang="scss" scoped>
.fb-window {
  position: fixed;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
  background: transparent;
  
  // border: 1px solid rgba(255, 255, 255, 0.18);
  z-index: 999998;

  .fa.fa-expand-arrows-alt {
    display: none;
    position: absolute;
    top: 4px;
    right: 4px;
    font-size: 16px;
    color: rgba(0,0,0, 0.5);
    cursor: grab;
    z-index: 90000000;
  }
  &:hover .fa.fa-expand-arrows-alt {
    display: block;
    // color: rgba(0,0,0,0.5);
  }
  .fa.fa-times {
    position: absolute;
    top: -8px;
    left: -8px;
    height: 20px;
    width: 20px;
    font-size: 16px;
    color: rgb(0, 0, 0, 0.6);
    padding: 2px;
    padding-left: 3px;
    border-radius: 50%;
    background-color: rgb(255, 0, 0);
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999999;
  }
  &__container {
    position: relative;
    height: 100%;
    width: 100%;
  }

  &__navbar {
    cursor: grab;
    position: sticky;
    top: 0px;
  }

  &__content {
    overflow: auto;
    height: calc(100% - 24px);
  }

  .resize {
    position: absolute;
    background: transparent;

    &.resize-left {
      width: 8px;
      top: 0px;
      bottom: 0px;
      left: -5px;
      cursor: col-resize;
      z-index: 999999;
    }
    &.resize-right {
      width: 8px;
      top: 0px;
      bottom: 0px;
      right: -5px;
      cursor: col-resize;
      z-index: 999999;
    }
    &.resize-top {
      height: 8px;
      top: -5px;
      left: 0px;
      right: 0px;
      cursor: s-resize;
      z-index: 999999;
    }
    &.resize-bottom {
      height: 8px;
      bottom: -5px;
      left: 0px;
      right: 0px;
      cursor: s-resize;
      z-index: 999999;
    }
  }
}
</style>
