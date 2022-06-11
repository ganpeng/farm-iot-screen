<template>
  <div class="scrollBarWrapper" :style="scrollBarWrapperStyle">
    <div
      class="scrollBarContent"
      :class="direction === 'y' ? 'directionY' : 'directionX'"
      ref="scrollBarContent"
    >
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ScrollBar',
  props: {
    direction: {
      type: String,
      default: "x",
      validator(value) {
        return value === "x" || value === "y";
      }
    },
    activeIndex: {
      type: Number,
      default: 0,
      validator(value) {
        return value >= 0;
      }
    }
  },
  watch: {
    activeIndex() {
      this.handleChange();
    }
  },
  computed: {
    scrollBarWrapperStyle() {
      return this.direction === "y"
        ? {
            height: "100%"
          }
        : {
            width: "100%"
          };
    }
  },
  mounted() {
    this.initItemDisplay();
    this.handleChange();
  },
  methods: {
    initItemDisplay() {
      const content = this.$refs.scrollBarContent;
      const contentItem = content.children;
      [].forEach.call(contentItem, item => {
        if (this.direction === "y") {
          item.style.display = "block";
        } else {
          item.style.display = "inline-block";
        }
      });
    },
    handleChange() {
      this.$nextTick(() => {
        const content = this.$refs.scrollBarContent; // 发生滑动的元素
        const activeItem = content.children[this.activeIndex]; // 当前选中的元素
        if (!activeItem) return false;

        const scrollOption = {
          top: 0,
          left: 0,
          behavior: "smooth"
        };

        if (this.direction === "y") {
          const contentHeight = content.offsetHeight;
          const activeItemHeight = activeItem.offsetHeight;
          const activeItemTop = activeItem.offsetTop;
          const offset = activeItemTop - (contentHeight - activeItemHeight) / 2; // 需要移动的位置
          scrollOption.top = offset;
        } else {
          const contentWidth = content.offsetWidth; // 发生滑动元素的宽
          const activeItemWidth = activeItem.offsetWidth; // 当前元素的宽
          const activeItemLeft = activeItem.offsetLeft; // 当前元素的到他父盒子左侧的距离
          const offset = activeItemLeft - (contentWidth - activeItemWidth) / 2; // 需要移动的位置
          scrollOption.left = offset;
        }

        content.scrollTo(scrollOption);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.scrollBarWrapper {
  position: relative;
  overflow: hidden;
  user-select: none;
  vertical-align: middle;

  .scrollBarContent {
    width: 100%;
    white-space: nowrap;
    word-break: keep-all;
    -webkit-overflow-scrolling: touch;

    &.directionX {
      overflow-x: scroll;
      overflow-y: hidden;
    }

    &.directionY {
      overflow-x: hidden;
      overflow-y: scroll;
      height: 100%;
    }

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>