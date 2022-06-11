<template>
  <div v-if="visible" class="my-dialog-container">
    <div class="my-dialog border-icon19">
      <trend-chart-two :deviceName="deviceName" :sensorType="sensorType" ref="trendChart"></trend-chart-two>
      <span @click="hide" class="close-btn">
        <svg-icon icon-class="video_dialog_close_btn"></svg-icon>
      </span>
    </div>
  </div>
</template>
<script>
import TrendChartTwo from './TrendChartTwo';
export default {
  name: 'TrendChartDialog',
  components: {TrendChartTwo},
  data() {
    return {
      visible: false,
      deviceName: '',
      sensorType: ''
    };
  },
  methods: {
    async show(deviceName, sensorType) {
      try {
        await this.$nextTick();
        this.deviceName = deviceName;
        this.sensorType = sensorType;
        this.visible = true;
      } catch (err) {
        console.log(err);
      }
    },
    hide() {
      this.visible = false;
    }
  }
}
</script>
<style lang="scss" scoped>
.my-dialog-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 10;
  .my-dialog {
    position: absolute;
    top: 50%;
    left: calc(50% + 0.5rem);
    transform: translate(-50%, -50%);
    width: 90%;
    height: 3.72rem;
    z-index: 9;
    .close-btn {
      position: absolute;
      top: -0.4rem;
      right: 0;
      cursor: pointer;
      .svg-icon {
        width: 0.3rem;
        height: 0.3rem;
      }
    }
  }
}
</style>