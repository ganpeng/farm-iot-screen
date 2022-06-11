<template>
  <div class="aaa-container">
    <farm-map></farm-map>
  </div>
</template>
<script>
import FarmMap from './FarmMap';
export default {
  name: 'AAA',
  components: {FarmMap}
}
</script>
<style lang="scss" scoped>
.aaa-container {
  width: 100%;
  height: 100%;
}
</style>