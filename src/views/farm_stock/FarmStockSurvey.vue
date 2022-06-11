<template>
  <div class="farm-stock-survey-container container">
    <farm-aside-nav></farm-aside-nav>
    <div class="content">
      <div class="farm-container">
        <div class="farm-tab-content">
          <div v-if="activeIndex === 0" class="farm-tab-content-item">
            <div class="sensor-data-wrapper">
              <sensor-data :list="sensorDataList"></sensor-data>
            </div>
            <div @click.self="hideFarmDescDialog" :style="farmContainerBgStyle" class="farm-tab-content-item-container">
              <div class="farm-statistics-data">
                <farm-statistics-list></farm-statistics-list>
              </div>
              <div @click.self="displayDescDialog" class="farm-desc-btn border-icon9">企业简介</div>
              <farm-desc-dialog ref="farmDescDialog" :farm="farm"></farm-desc-dialog>
              <div class="masker"></div>
            </div>
          </div>
          <div v-else class="farm-tab-content-item">
            <div class="title-wrapper">
              <div class="farm-title">{{farm.name}}</div>
            </div>
            <div :style="contentBgStyle" class="farm-tab-content-item-container2">
              <div @click="displayCameraVideoDialog(item, index)"
                :style="item.style" v-for="(item, index) in cameraList"
                :key="index"
                :class="['camera-item',cameraTypeClass(item)]">
                <div class="title border-icon32">
                  {{item.camera.deviceName}}
                </div>
                <svg-icon v-if="item.camera.cameraType === 2" class-name="active-camera" icon-class="ball_camera"></svg-icon>
                <svg-icon v-if="item.camera.cameraType === 1" class-name="active-camera" icon-class="gun_camera"></svg-icon>
              </div>
              <div class="sensor-list-container">
                <div
                  v-for="(sensor, index) in sensorList"
                  :key="`sensor_${index}`"
                  @click="showTrendChartDialog(sensor)" class="camera-item is-sensor">
                  <div class="title border-icon20">{{sensor.name}}</div>
                  <svg-icon class-name="active-camera" :icon-class="sensorIconClass(sensor)"></svg-icon>
                </div>
                <div
                  v-for="(controller, index) in controllerList"
                  :key="`controller_${index}`"
                  @click="showControllerLastDataDialog(controller)" class="camera-item is-sensor">
                  <div class="title border-icon20">{{controller.name}}</div>
                  <svg-icon class-name="active-camera" icon-class="controller_icon"></svg-icon>
                </div>
              </div>
              <div class="masker"></div>
            </div>
          </div>
        </div>
          <div class="farm-tab-bar">
            <scrollBar direction="x" :activeIndex="activeIndex">
              <div
                @click="changeFarmTabBar(0)"
                :key="0"
                :class="['farm-tab-bar-item', 'scrollBarItem', activeIndex === 0 && 'active']">
                <span class="tab-bar-icon">
                  <svg-icon v-if="activeIndex === 0" class="title-icon animate-bounce-up" icon-class="farm_up_arrow_icon_active"></svg-icon>
                  <svg-icon v-else class="title-icon" icon-class="farm_up_arrow_icon"></svg-icon>
                </span>
                <span class="tab-bar-title">
                  概况
                </span>
              </div>
              <div
                @click="changeFarmTabBar(index + 1)"
                v-for="(item, index) in landList" :key="index + 1"
                :class="['farm-tab-bar-item', 'scrollBarItem', activeIndex === (index + 1) && 'active']">
                <span class="tab-bar-icon">
                  <svg-icon v-if="activeIndex === (index + 1)" class="title-icon animate-bounce-up" icon-class="farm_up_arrow_icon_active"></svg-icon>
                  <svg-icon v-else class="title-icon" icon-class="farm_up_arrow_icon"></svg-icon>
                </span>
                <span class="tab-bar-title">
                  {{item.name}}
                </span>
              </div>
            </scrollBar>
          </div>
      </div>
    </div>
    <video-player-dialog ref="videoPlayerDialog"></video-player-dialog>
    <insect-situation-dialog ref="insectSituationDialog"></insect-situation-dialog>
    <trend-chart-dialog ref="trendChartDialog"></trend-chart-dialog>
    <controller-last-data-dialog ref="controllerLastDataDialog"></controller-last-data-dialog>
    <vr-player-dialog ref="vrPlayerDialog"></vr-player-dialog>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex';
import _ from 'lodash';
import FarmAsideNav from './components/FarmAsideNav';
import SensorData from './components/SensorData';
import FarmDescDialog from './components/FarmDescDialog';
import VideoPlayerDialog from '@/components/VideoPlayerDialog';
import constants from '@/util/constants';
import FarmStatisticsList from './components/FarmStatisticsList';
import ScrollBar from '@/components/ScrollBar';
import InsectSituationDialog from './trace/InsectSituationDialog';
import TrendChartDialog from './components/TrendChartDialog';
import ControllerLastDataDialog from './components/ControllerLastDataDialog';
import VrPlayerDialog from '@/components/VrPlayerDialog';
export default {
  name: 'FarmStockSurvey',
  components: {FarmAsideNav, SensorData, FarmDescDialog, VideoPlayerDialog, FarmStatisticsList, ScrollBar, InsectSituationDialog, TrendChartDialog, ControllerLastDataDialog, VrPlayerDialog},
  data() {
    return {
      activeIndex: 0,
      sensorDataList: [],
      landList: [],
      cameraList: [],
      sensorList: [],
      controllerList: [] // 控制设备
    };
  },
  computed: {
    ...mapGetters({
      farm: 'farm/currentFarm'
    }),
    isJucheng() {
      return parseInt(this.farm.id) === 29;
    },
    contentBgStyle() {
      if (this.activeIndex === 0) {
        return '';
      } else {
        let form = _.get(this.landList, `${this.activeIndex - 1}.form`);
        let landImageUrl = _.get(this.landList, `${this.activeIndex - 1}.farmLandUrl`);
        let index = _.chain(this.landList)
                     .filter((item) => item.form === form)
                     .findIndex((item) => item.id === _.get(this.landList, `${this.activeIndex - 1}.id`))
                     .value();
        let {bgImage, bgImages} = _.get(constants.cameraData, `${form}`);
        if (bgImages) {
          // let bgImage = _.get(_.shuffle(bgImages), '0');
          let bgUrl = landImageUrl || _.get(bgImages, `${index % bgImages.length}`);
          return `background-image:url(${bgUrl})`;
        } else {
          let bgUrl = landImageUrl || bgImage;
          return `background-image:url(${bgUrl})`;
        }
      }
    },
    cameraTypeClass() {
      return (item) => {
        let type = _.get(item, 'camera.cameraType');
        switch (type) {
          case 1:
            return 'is-gun';
          case 2:
            return 'is-ball';
          default:
          return '';
        }
      };
    },
    form() {
      return _.get(this.landList, `${this.activeIndex - 1}.form`);
    },
    farmContainerBgStyle() {
      return `background-image:url(${this.farm.farmIndexUrl})`;
    },
    landCode() {
      if (this.activeIndex !== 0) {
        let landCode = _.get(this.landList, `${this.activeIndex - 1}.code`);
        return landCode;
      } else {
        return '';
      }
    },

    sensorIconClass() {
      return (sensor) => {
        let {sensorType} = sensor;
        if (sensorType === '虫情测报灯') {
          return `sensor_chongqing_icon`;
        } else {
          return `sensor_icon`;
        }
      };
    }
  },
  async created() {
    try {
      let {id} = this.$route.params;
      await this.getFarmById(id);
      let res2 = await this.$service.getLandList({farmId: id, pageSize: 10000});
      let res3 = await this.$service.getSensorListByFarmId(id);
      if (res2 && res2.code === 0) {
        this.landList = res2.data.list;
      }
      if (res3 && res3.code === 0) {
        let deviceName = _.get(res3.data, '0.deviceName');
        let sensorType = _.get(res3.data, `0.sensorType`);
        if (deviceName) {
          // 获取传感器的最后一条数据
          let res4 = await this.$service.getSensorLastData(deviceName);
          if (res4 && res4.code === 0) {
            this.sensorDataList = this.filterSensorDataList(sensorType).map((item) => {
              let obj = res4.data.find((_item) => _item.metric === item.metric);
              let value = _.get(obj, 'value');
              if (value) {
                item.value = parseFloat(value).toFixed(2);
              }
              return item;
            });
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    ...mapActions({
      getFarmById: 'farm/getFarmById'
    }),
    filterSensorDataList(sensorType) {
      if (sensorType === `水产养殖传感器`) {
        return _.cloneDeep(constants.waterSensorRealList);
      } else if (sensorType === `气象传感器`) {
        return _.cloneDeep(constants.sensorRealList2);
      } else {
        return _.cloneDeep(constants.sensorRealList);
      }
    },
    async changeFarmTabBar(index) {
      try {
        this.activeIndex = index;
        if (this.activeIndex !== 0) {
          let {id} = this.$route.params;
          let landCode = _.get(this.landList, `${this.activeIndex - 1}.code`);
          let res = await this.$service.getCameraListByFarmId({farmId: id, landCode, pageSize: 1000});
          if (res && res.code === 0) {
            let _cameraList = res.data.list.filter((item) => item.pullable).filter((item) =>  item.deviceStatus === 'ONLINE' || item.deviceStatus === 'OFFLINE');
            let cameraList = this.getCameraList(_cameraList);
            this.cameraList = cameraList;
          }
          this.getSensorListByLandCode(landCode);
          this.getControllerListByLandCode(landCode);
        }
      } catch (err) {
        console.log(err);
      }
    },
    async getSensorListByLandCode(landCode) {
      try {
        let res = await this.$service.getSensorListByLandCode({landCode, pageSize: 10000});
        if (res && res.code === 0) {
          let sensorList = res.data.list || [];
          this.sensorList = sensorList;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async getControllerListByLandCode(landCode) {
      try {
        let res = await this.$service.getControllerListByLandCode({landCode, pageSize: 10000});
        if (res && res.code === 0) {
          let controllerList = res.data.list || [];
          this.controllerList = controllerList;
          // this.controllerList = controllerList.filter((item) => item.deviceStatus === `ONLINE`);
        }
      } catch (err) {
        console.log(err);
      }
    },
    getCameraList(cameras) {
      let form = _.get(this.landList, `${this.activeIndex - 1}.form`);
      let count = cameras.length;
      let {position: {left, top}} = _.get(constants.cameraData, `${form}`);
      let tops = constants.getRandNumForRangen(top.min, top.max, count);
      let lefts = constants.getRandNumForRangen(left.min, left.max, count);
      let cameraList = []
      for (let i = 0; i < count; i++) {
        let style = `top: ${tops[i]}%;left: ${lefts[i]}%;`;
        cameraList.push({
          style,
          camera: cameras[i]
        });
      }
      return cameraList;
    },
    async displayCameraVideoDialog(item) {
      try {
        await this.$nextTick();
        let playUrl = _.get(item, 'camera.playUrl');
        let deviceName = _.get(item, 'camera.deviceName');
        let deviceStatus = _.get(item, 'camera.deviceStatus');
        let cameraType = _.get(item, `camera.cameraType`);
        if (playUrl) {
          if (cameraType === 6) {
            this.$refs.vrPlayerDialog.show(playUrl, deviceName, deviceStatus);
          } else {
            this.$refs.videoPlayerDialog.show(playUrl, deviceName, deviceStatus);
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
    displayDescDialog() {
      this.$refs.farmDescDialog.show();
    },
    hideFarmDescDialog() {
      this.$refs.farmDescDialog.hide();
    },
    async showTrendChartDialog(sensor) {
      try {
        let {deviceName, sensorType, name} = sensor;
        if (sensorType === '虫情测报灯') {
          this.$refs.insectSituationDialog.show(deviceName, name);
        } else {
          this.$refs.trendChartDialog.show(deviceName, sensorType);
        }
      } catch (err) {
        console.log(err);
      }
    },
    showControllerLastDataDialog(controller) {
      let {deviceName, name} = controller;
      this.$refs.controllerLastDataDialog.show(deviceName, name);
    }
  }
}
</script>
<style lang="scss" scoped>
.farm-stock-survey-container {
  &.container {
    .content {
      padding: 10px 0 0 0;
      .farm-container {
        position: relative;
        flex: 1;
        .farm-tab-content {
          height: 100%;
          .farm-tab-content-item {
            position: relative;
            height: 100%;
            .sensor-data-wrapper {
              padding: 0 20px;
            }
            .farm-desc-btn {
              position: absolute;
              top: 0.2rem;
              right: 0.2rem;
              width: 1.3rem;
              height: 0.5rem;
              line-height: 0.5rem;
              font-size: 0.16rem;
              font-weight: 500;
              color: #70CAEE;
              text-align: center;
              cursor: pointer;
              z-index: 6;
            }
            .farm-tab-content-item-container {
              position: relative;
              margin-top: 10px;
              height: calc(100% - 0.7rem);
              background-size: cover;
              background-repeat: no-repeat;
              background-position: center center;
              .masker {
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                height: 3rem;
                background: linear-gradient(180deg,rgba(0,0,0,0.00) 0%,rgba(0,0,0,0.63) 100%);
              }
              .farm-statistics-data {
                position: absolute;
                top: 0.2rem;
                left: 1.6rem;
                right: 1.6rem;
                height: 2.8rem;
              }
            }
            .farm-tab-content-item-container2 {
              position: relative;
              margin-top: 10px;
              height: calc(100% - 50px);
              background-size: 100% 100%;
              background-repeat: no-repeat;
              background-position: center center;
              .masker {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(180deg,rgba(0,0,0,0.03) 0%,rgba(0,0,0,0.33) 100%);
              }
              .camera-item {
                position: absolute;
                cursor: pointer;
                z-index: 2;
                .title {
                  display: none;
                  position: absolute;
                  top: -0.34rem;
                  left: 50%;
                  transform: translateX(-50%);
                  min-width: 0.9rem;
                  height: 0.3rem;
                  line-height: 0.3rem;
                  padding: 0 0.1rem;
                  white-space: nowrap;
                  color: #f0f0f0;
                  font-size: 0.14rem;
                  text-align: center;
                  z-index: 10;
                }
                .svg-icon {
                  width: 0.44rem;
                  height: 0.54rem;
                }
                &:hover {
                  .title {
                    display: block;
                  }
                }
              }
              .camera3-item {
                position: absolute;
                width: 2.78rem;
                height: 3.17rem;
                bottom: 10%;
                right: 10%;
                cursor: pointer;
                background-image: url('../../assets/image/sensor_icon.png');
                background-size: 100% 100%;
                background-repeat: no-repeat;
                background-position: center center;
                z-index: 7;
              }
              .trend-chart-dialog {
                position: absolute;
                top: 40%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: calc(100% - 0.4rem);
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
              .sensor-list-container {
                display: flex;
                flex-direction: column;
                position: absolute;
                bottom: 0.2rem;
                right: 0.2rem;
                width: 3rem;
                height: 4rem;
                .camera-item {
                  width: 0.44rem;
                  height: 0.54rem;
                  &.is-sensor {
                    position: relative;
                    cursor: pointer;
                    z-index: 7;
                    .title {
                      display: none;
                      position: absolute;
                      top: -0.34rem;
                      left: 50%;
                      transform: translateX(-50%);
                      min-width: 0.9rem;
                      height: 0.3rem;
                      line-height: 0.3rem;
                      padding: 0 0.1rem;
                      white-space: nowrap;
                      color: #f0f0f0;
                      font-size: 0.14rem;
                      text-align: center;
                      z-index: 10;
                    }
                    .svg-icon {
                      width: 0.44rem;
                      height: 0.54rem;
                    }
                    &:hover {
                      .title {
                        display: block;
                      }
                    }
                  }
                }
                .camera-item + .camera-item {
                  margin-top: 0.4rem;
                }
              }
            }
          }
        }
        .farm-tab-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          bottom: 7.608%;
          left: 50%;
          transform: translateX(-50%);
          max-width: 41.7582%;
          .farm-tab-bar-item {
            display: inline-block;
            padding: 0.2rem 0.1rem;
            cursor: pointer;
            .tab-bar-icon {
              display: block;
              margin-bottom: 0.1rem;
              text-align: center;
              .svg-icon {
                width: 0.4rem;
                height: 0.3rem;
              }
            }
            .tab-bar-title {
              display: block;
              font-size: 0.14rem;
              font-weight: 500;
              color: #F0F0F0;
              white-space: nowrap;
              text-align: center;
            }
            &.active {
              .tab-bar-title {
                color: #68E0E3;
              }
            }
          }
          .farm-tab-bar-item + .farm-tab-bar-item {
            margin-left: 0.2rem;
          }
        }
      }
    }
  }
}

.active-camera {
  animation: shan666 2s infinite ease-in-out;
  animation-fill-mode: both;
}

@keyframes shan666 {
  0% {
    opacity: 0.8;
    filter: alpha(opacity=20);
    transform: scale(0.9); //缩小
  }
  50% {
    opacity: 1;
    filter: alpha(opacity=50);
    transform: scale(1.1); //放大
  }
  100% {
    opacity: 0.8;
    filter: alpha(opacity=20);
    transform: scale(0.9); //缩小
  }
}

@keyframes bounce-up {
  // 25% {
  //   transform: translateY(-0.1rem);
  // }
  // 50%, 100% {
  //   transform: translateY(0);
  // }
  // 75% {
  //   transform: translateY(0.1rem);
  // }
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-0.1rem);
  }
  100% {
    transform: translateY(0);
  }
}

.animate-bounce-up {
  animation: bounce-up 1.5s infinite;
}
</style>
<style lang="scss">
.video-js .vjs-big-play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
