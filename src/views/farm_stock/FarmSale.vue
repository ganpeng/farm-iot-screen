<template>
  <div class="land-container container">
    <farm-aside-nav></farm-aside-nav>
    <div class="content">
      <div class="title-wrapper">
        <div class="farm-title">聚成现代农业发展专业合作社</div>
      </div>
      <div class="svg-bg border-icon41"></div>
    </div>
  </div>
</template>
<script>
import FarmAsideNav from "./components/FarmAsideNav";
export default {
  name: 'FarmSale',
  components: {FarmAsideNav}
}
</script>
<style lang="scss" scoped>
.content {
  .title-wrapper {
    margin-bottom: 0.2rem;
  }
  .svg-bg {
    width: 100%;
    height: 100%;
  }
}
</style>