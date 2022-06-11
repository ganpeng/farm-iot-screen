<template>
  <div class="sensor-data-container">
    <div v-for="(sensor, index) in sensorRealList" :key="index"
      :class="['sensor-item', sensor.isWarning && 'is-warning', sensor.isDanger && 'is-danger']">
      <div class="sensor-item-inner">
        <div class="text">
          <div class="title">{{sensor.title}}</div>
          <div class="value">
            <span class="my-font">{{sensor.value}}</span>
            <i class="unit">&nbsp;{{sensor.unit}}</i>
            <i class="unit" v-if="sensor.metric === 'fx'">{{windDirection(sensor.value)}}</i>
          </div>
        </div>
        <div class="icon">
          <svg-icon :icon-class="sensor.icon"></svg-icon>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import constants from '@/util/constants';
export default {
  name: 'SensorData',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    sensorRealList() {
      return this.list.length > 0 ? this.list : constants.sensorRealList;
    },
    windDirection() {
      return (value) => {
        return this.$util.getWindDirection(value);
      };
    }
  },
  data() {
    return {};
  }
}
</script>
<style lang="scss" scoped>
.sensor-data-container {
  display: flex;
  // justify-content: space-between;
  align-items: center;
  .sensor-item {
    position: relative;
    flex: 1;
    max-width: 1.3rem;
    height: 0.6rem;
    background: url('../../../assets/image/border_icon.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    &.is-warning {
      background: url('../../../assets/image/sensor_warning.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    &.is-danger {
      background: url('../../../assets/image/sensor_danger.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .border {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .sensor-item-inner {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      height: 100%;
      padding: 0.06rem 0.1rem;
      .text {
        flex: 1;
        font-size: 0.12rem;
        .title {
          color: #417FC8;
          line-height: 0.20rem;
        }
        .value {
          font-size: 0.18rem;
          color: #29E3FD;
          .unit {
            font-size: 0.12rem;
          }
        }
      }
      .icon {
        position: absolute;
        right: 0.1rem;
        top: 0.1rem;
        .svg-icon {
          width: 0.2rem;
          height: 0.2rem;
        }
      }
    }
  }
  .sensor-item + .sensor-item {
    margin-left: 0.1rem;
  }
}
</style>
