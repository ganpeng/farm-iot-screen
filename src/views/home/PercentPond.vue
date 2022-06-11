<template>
  <div :style="`background-color: ${bgColor};`" class="percent-pont-container">
    <div :style="`background: linear-gradient(270deg, ${colors[1]} 0%, ${colors[0]} 100%);`" class="percent-pont">
      <div class="split-piece-list">
        <div v-for="index of 10" :key="index" :style="`background-color: ${bgColor};`" class="split-piece-item"></div>
      </div>
      <div :style="`width: ${100 - percent}%;background-color: ${bgColor2};`" class="not-piece"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PercentPont',
  props: {
    bgColor: {
      type: String,
      default: 'rgba(13, 22, 44)'
    },
    bgColor2: {
      type: String,
      default: '#1F2D4D'
    },
    colors: {
      type: Array,
      default: () => ['#FF4C16', '#FFDC3B']
    },
    percent: {
      type: Number,
      default: 60
    }
  }
}
</script>
<style lang="scss" scoped>
.percent-pont-container {
  position: relative;
  width: 100%;
  height: 0.2rem;
  border: 1px solid #417FC8;
  border-radius: 0.02rem;
  padding: 0.02rem 0.01rem;
  .percent-pont {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .split-piece-list {
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;;
    background-color: transparent;
    .split-piece-item {
      width: 0.02rem;
      height: 100%;
    }
    z-index: 100;
  }
  .not-piece {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 38%;
    height: 100%;
  }
}
</style>

