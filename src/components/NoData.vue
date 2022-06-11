<template>
  <div class="empty-container">
    <svg-icon icon-class="empty_icon"></svg-icon>
    <div class="tips">{{text}}</div>
  </div>
</template>
<script>
export default {
  name: 'NoData',
  props: {
    text: {
      type: String,
      default: `暂无数据`
    }
  }
};
</script>
<style lang="scss" scoped>
.empty-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .svg-icon {
    width: 0.34rem;
    height: 0.34rem;
  }
  .tips {
    font-size: 0.14rem;
    color: #9FA8B8;
    margin-top: 0.14rem;
  }
}
</style>