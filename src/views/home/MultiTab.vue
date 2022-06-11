<template>
  <div class="tab-container">
    <div class="tab-list">
      <div 
        @click="tabChange(index)"
        v-for="(item, index) in tabList" :key="index" 
        :class="['tab-item', activeIndex === index && 'active']">
        {{item.name}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MultiTab',
  props: {
    tabList: {
      type: Array,
      default: () => []
    },
    tabChangeHandler: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      activeIndex: 0
    };
  },
  methods: {
    tabChange(index) {
      this.activeIndex = index;
      this.tabChangeHandler(index);
    }
  }
}
</script>
<style lang="scss" scoped>
.tab-container {
  width: 100%;
  height: 0.26rem;
  .tab-list {
    display: flex;
    width: 100%;
    height: 0.26rem;
    .tab-item {
      flex: 1;
      color: #B6D8FF;
      font-size: 0.12rem;
      line-height: 0.26rem;
      text-align: center;
      border-top: 1px solid #497CB3;
      border-bottom: 1px solid #497CB3;
      border-left: 1px solid #497CB3;
      cursor: pointer;
      &:first-child {
        border-radius: 0.04rem 0 0 0.04rem;
      }
      &:last-child {
        border-right: 1px solid #497CB3;
        border-radius: 0 0.04rem 0.04rem 0;
      }
      &:hover {
        color: #fff;
        background-color: #176C9F;
      }
      &.active {
        color: #fff;
        background-color: #1A8DD2;
      }
    }
  }
}
</style>