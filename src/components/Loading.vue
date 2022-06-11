<template>
  <div v-if="visible" class="loading-container">
    <svg-icon icon-class="loading"></svg-icon>
  </div>
</template>
<script>
export default {
  name: 'Loading',
  data() {
    return {
      visible: true
    };
  },
  methods: {
    show() {
      this.visible = true;
    },
    hide() {
      this.visible = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 1);
  z-index: 100000;
  .svg-icon {
    width: 60px;
    height: 60px;
    fill: #999;
  }
}
</style>
