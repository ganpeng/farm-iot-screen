<template>
  <div class="storage-container">
    <dv-decoration-9 :dur="5" style="width:3rem;height:3rem;">
      <span class="title my-font">敬请期待</span>
    </dv-decoration-9>
  </div>
</template>
<script>
export default {
  name: 'Storage'
}
</script>
<style lang="scss" scoped>
.storage-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  .title {
    font-size: 0.18rem;
    color: #52C0AD;
  }
}
</style>
