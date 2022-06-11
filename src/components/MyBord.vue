<template>
  <div class="my-bord-status">
    <div v-for="(bord, index) in bordList" :key="index" class="status-item border-icon21">
      <div class="status-item-inner">
        <div class="label">
          <div class="line"></div>
          <div class="title">{{bord.title}}</div>
        </div>
        <div class="value my-font">{{bord.count}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MyBord",
  props: {
    bordList: {
      type: Array,
      default: () => []
    }
  }
};
</script>
<style lang="scss" scoped>
.my-bord-status {
  display: flex;
  width: 100%;
  height: 10.2040%;
  font-weight: lighter;
  .status-item + .status-item {
    margin-left: 0.1rem;
  }
  .status-item {
    display: flex;
    flex: 1;
    overflow: hidden;
    color: #bdbec2;
    .status-item-inner {
      display: flex;
      margin: 1px;
      padding: 0.18rem;
      width: 100%;
      height: 98%;
      box-shadow:rgba(28,86,165, 0.5) 0px 0px 15px;
    }
    .label {
      display: flex;
      align-items: flex-start;
      flex: 1;
      .line {
        width: 0.02rem;
        height: 0.2rem;
        background: #17B3EA;
        margin-right: 0.08rem;
      }
      .title {
        font-size: 0.14rem;
        color: #9FA8B8;
      }
    }
    .value {
      display: flex;
      align-items: flex-end;
      font-size: 0.32rem;
      color: #29E3FD;
      line-height: 0.45rem;
    }
  }
}
</style>
