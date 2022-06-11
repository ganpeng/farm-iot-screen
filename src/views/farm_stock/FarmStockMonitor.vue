<template>
  <div class="farm-stock-monitor container">
    <farm-aside-nav></farm-aside-nav>
    <div class="content">
      <div class="title-wrapper">
        <span v-if="landList.length > 3" class="left-arrow">
          <svg-icon v-if="leftDisabled" icon-class="left_arrow_disabled"></svg-icon>
          <svg-icon v-else icon-class="left_arrow"></svg-icon>
        </span>
        <div class="tab-list-wrapper">
          <scrollBar direction="x" :activeIndex="activeIndex">
            <div v-for="(land, index) in landList"
              :key="index"
              @click="changeTab(index)"
              :class="['tab-item', 'scrollBarItem', activeIndex === index && 'active']">
              {{land.name}}
            </div>
          </scrollBar>
        </div>
        <span v-if="landList.length > 3" class="right-arrow">
          <svg-icon v-if="rightDisabled" icon-class="right_arrow_disabled"></svg-icon>
          <svg-icon v-else icon-class="right_arrow"></svg-icon>
        </span>
        <div class="farm-title">{{farm.name}}</div>
      </div>
      <div class="tab-content">
        <div class="tab-content-wrapper">
          <div class="left-content border-icon14">
            <div class="left-top-content">
              <div class="title-one">
                <h5>
                  <i class="point"></i> 截图
                </h5>
                <v-select
                  class="my-vue-select"
                  label="deviceName"
                  v-model="selectedCameraImage"
                  @input="cameraImageSelectHandler"
                  :options="cameraList">
                  <div slot="no-options">无数据</div>
                </v-select>
              </div>
              <div class="left-media-content border-icon11">
                <!-- <camera-image-carousel v-if="cameraImageList.length > 0" :dataList="cameraImageList"></camera-image-carousel> -->
                <carousel v-if="cameraImageList.length > 0" :dataList="cameraImageList"></carousel>
                <no-data v-else text="暂未生成截图"></no-data>
              </div>
            </div>
            <div class="left-middle-content">
              <div class="title-one">
                <h5>
                  <i class="point"></i> 月度延时摄影
                </h5>
                <v-select
                  class="my-vue-select month-select"
                  v-model="month"
                  @input="cameraMonthSelectHandler"
                  :options="monthList">
                  <div slot="no-options">无数据</div>
                </v-select>
                <v-select
                  class="my-vue-select"
                  label="deviceName"
                  v-model="selectedCameraDelay"
                  @input="cameraDelaySelectHandler"
                  :options="cameraList">
                <div slot="no-options">无数据</div>
                </v-select>
              </div>
              <div class="left-media-content border-icon11">
                <div v-if="timeLapseUrl !== noLapseUrl" class="video-player-wrapper">
                  <video-player :playUrl="timeLapseUrl" videoType="video/mp4"></video-player>
                </div>
                <no-data v-else text="暂未生成延时摄影"></no-data>
              </div>
            </div>
            <div class="left-bottom-content">
              <div class="title-one">
                <h5>
                  <i class="point"></i> 监控回看
                </h5>
                <v-select
                  class="my-vue-select record-day-select"
                  v-model="recordMonth"
                  @input="recordCameraMonthSelectHandler"
                  :options="recordMonthList">
                  <div slot="no-options">无数据</div>
                </v-select>
                <v-select
                  class="my-vue-select"
                  label="deviceName"
                  v-model="selectedRecordCamera"
                  @input="recordCameraSelectHandler"
                  :options="cameraList">
                  <div slot="no-options">无数据</div>
                </v-select>
              </div>
              <div class="left-media-content border-icon11">
                <div v-if="recordList.length > 1" class="video-player-wrapper">
                  <video-player :playUrl="recordUrl"></video-player>
                  <div v-if="recordList.length > 1" @click="recordPrevHandler" class="prev-btn">
                    <svg-icon v-if="activeRecordIndex !== 0" icon-class="wap_prev_icon_active"></svg-icon>
                    <svg-icon v-else icon-class="wap_prev_icon"></svg-icon>
                  </div>
                  <div v-if="recordList.length > 1" @click="recordNextHandler" class="next-btn">
                    <svg-icon v-if="activeRecordIndex !== (recordList.length - 1)" icon-class="wap_next_icon_active"></svg-icon>
                    <svg-icon v-else icon-class="wap_next_icon"></svg-icon>
                  </div>
                  <div v-if="recordList.length > 0" class="page">
                    {{activeRecordIndex + 1}}/{{recordList.length}}
                  </div>
                </div>
                <no-data v-else text="暂未生成监控回看"></no-data>
              </div>
            </div>
          </div>
          <div class="right-content border-icon12">
            <div class="title-one">
              <div class="wrapper">
                <h5>
                  <svg-icon class="title-icon" icon-class="title_icon"></svg-icon>
                  实时监控
                </h5>
                <div class="sub-tab-list">
                  <li v-for="(item, index) in chunkedCameraList" :key="index"
                    @click="changeSubTab(index)"
                    :class="['sub-tab-item', 'border-icon15', subActiveIndex === index && 'active']">
                    {{index + 1}}
                  </li>
                </div>
              </div>
              <div class="title-border">
                <div class="left-gap gap"></div>
                <div class="right-gap gap"></div>
              </div>
            </div>
            <div v-if="activeCameraList.length > 0" class="camera-list">
              <div v-for="(camera, index) in activeCameraList" :key="index"
                class="camera-item">
                <div class="title-one small">
                  <h5>
                    <i class="point"></i> {{camera.deviceName}}
                  </h5>
                  <div v-if="camera.cameraType === 6" class="vr-icon">
                    <svg-icon class="vr-video-icon" icon-class="vr_video_icon"></svg-icon>
                  </div>
                  <div class="camera-status">
                    <span v-if="camera.deviceStatus === 'ONLINE'">
                      <i class="on"></i>
                      在线
                    </span>
                    <span v-if="camera.deviceStatus === 'OFFLINE'">
                      <i class="off"></i>
                      离线
                    </span>
                  </div>
                </div>
                <div class="media-content border-icon13">
                  <my-vr-player v-if="camera.cameraType === 6" :playUrl="getPlayUrl(camera)"></my-vr-player>
                  <video-player v-else :muted="index === 0 ? false : true" :playUrl="getPlayUrl(camera)"></video-player>
                </div>
              </div>
              <!-- <div key="flv_index"
                class="camera-item">
                <div class="title-one small">
                  <h5>
                    <i class="point"></i> flv播放器
                  </h5>
                  <div class="camera-status">
                    <span>
                      <i class="on"></i>
                      在线
                    </span>
                  </div>
                </div>
                <div class="media-content border-icon13">
                  <flv-video-player></flv-video-player>
                </div>
              </div> -->
            </div>
            <no-data v-else text="暂无监控视频"></no-data>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex';
import _ from 'lodash';
import FarmAsideNav from "./components/FarmAsideNav";
import VideoPlayer from '@/components/VideoPlayer';
import ScrollBar from '@/components/ScrollBar';
import constants from '@/util/constants';
import Carousel from '@/components/Carousel';
import MyVrPlayer from '@/components/MyVrPlayer';
// import FlvVideoPlayer from '@/components/FlvVideoPlayer';
export default {
  name: "FarmStockMonitor",
  // components: { FarmAsideNav, VideoPlayer, ScrollBar, Carousel, FlvVideoPlayer },
  components: { FarmAsideNav, VideoPlayer, ScrollBar, Carousel, MyVrPlayer },
  data() {
    return {
      landList: [],
      cameraList: [],
      mixCameraList: [],
      chunkedCameraList: [],
      activeIndex: 0,
      subActiveIndex: 0,
      // 截图
      selectedCameraImage: {},
      cameraImageList: [],
      // 延时摄影
      selectedCameraDelay: '',
      timeLapseUrl: 'http://haha',
      noLapseUrl: 'http://null',
      monthList: [],
      month: '',
      cameraTimeLapseList: [],
      activeCameraList: [],
      // 15天回看
      recordMonthList: [],
      recordMonth: '',
      selectedRecordCamera: {},
      activeRecordIndex: 0,
      recordList: []
    };
  },
  beforeRouteLeave(to, from, next) {
    this.activeCameraList = [];
    next();
  },
  async created() {
    try {
      let {id} = this.$route.params;
      await this.getFarmById(id);
      let res = await this.$service.getLandList({farmId: id, pageSize: 10000});
      if (res && res.code === 0) {
        this.landList = res.data.list;
        this.getCameraListByLandCode();
      }
    } catch (err) {
      console.log(err);
    }
  },
  computed: {
    ...mapGetters({
      farm: 'farm/currentFarm'
    }),
    leftDisabled() {
      return this.landList.length > 3 && this.activeIndex === 0;
    },
    rightDisabled() {
      return this.landList.length > 3 && this.activeIndex === (this.landList.length - 1);
    },
    getPlayUrl() {
      return (camera) => {
        return _.get(camera, 'playUrl');
      };
    },
    // 截图
    selectedCameraImageStreamName() {
      return _.get(this.selectedCameraImage, 'streamName');
    },
    // 延时摄影
    selectedCameraDelayStreamName() {
      return _.get(this.selectedCameraDelay, 'streamName');
    },
    // 回看
    selectedRecordCameraStreamId() {
      return _.get(this.selectedRecordCamera, 'streamId');
    },
    recordUrl() {
      return _.get(this.recordList, `${this.activeRecordIndex}.url`);
    }
  },
  methods: {
    ...mapActions({
      getFarmById: 'farm/getFarmById'
    }),
    async getCameraListByLandCode() {
      try {
        this.activeCameraList = [];
        let {id} = this.$route.params;
        let landCode = _.get(this.landList, `${this.activeIndex}.code`);
        let res = await this.$service.getCameraListByFarmId({farmId: id, landCode, pageSize: 100});
        if (res && res.code === 0) {
          let _cameraList = _.get(res.data, "list") || [];
          let playCameraList = _cameraList.filter((item) => item.pullable).filter((item) => item.deviceStatus === 'ONLINE' || item.deviceStatus === 'OFFLINE');
          this.chunkedCameraList = _.chain(playCameraList)
                                    .partition((camera) => camera.cameraType === 6)
                                    .flatten()
                                    .chunk(4)
                                    .value();
          this.cameraList = playCameraList;
          this.mixCameraList = this.getCameraList(this.cameraList);
          this.activeCameraList = this.chunkedCameraList[this.subActiveIndex];
          if (this.cameraList.length > 0) {
            // 截图
            this.selectedCameraImage = _.get(this.cameraList, '0');
            if (this.selectedCameraImageStreamName) {
              this.getCameraImageByStreamName();
            }
            // 延时摄影
            this.selectedCameraDelay = _.get(this.cameraList, '0');

            if (this.selectedCameraDelayStreamName) {
              this.getTimeLapseDateList();
            }
            // 监控回看
            this.selectedRecordCamera = _.get(this.cameraList, '0');
            this.recordMonthList = this.$util.getDaysNearByToday(7, 2);
            this.recordMonth = _.get(this.recordMonthList, '0');
            if (this.selectedRecordCameraStreamId) {
              this.getCameraRecordList();
            }
          } else {
            // 截图
            this.selectedCameraImage = {};
            this.cameraImageList = [];
            // 延时摄影
            this.timeLapseUrl = this.noLapseUrl;
            this.selectedCameraDelay = {};
            this.monthList = [];
            this.month = '';
            // 监控回看
            this.selectedRecordCamera = {};
            this.recordMonthList = this.$util.getDaysNearByToday(7, 2);
            this.recordMonth = _.get(this.recordMonthList, '0');
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
    async getCameraImageByStreamName() {
      try {
        this.cameraImageList = [];
        let res = await this.$service.getCameraImage({streamName: this.selectedCameraImageStreamName});
        if (res && res.code === 0) {
          this.cameraImageList = res.data.list.map((item) => {
            return {
              img: item.value
            };
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    async getCameraTimeLapseByStreamName() {
      try {
        let res = await this.$service.getCameraTimeLapse(this.selectedCameraDelayStreamName);
        if (res && res.code === 0) {
          this.cameraTimeLapseList = res.data || [];
          if (this.cameraTimeLapseList.length > 0) {
            let timeLapse = this.cameraTimeLapseList.find((item) => item.dateStr === this.month.replace('-', ''));
            let url = _.get(timeLapse, 'url') || this.noLapseUrl;
            this.timeLapseUrl = url;
          } else {
            this.timeLapseUrl = this.noLapseUrl;
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 回看请求数据
    async getCameraRecordList() {
      try {
        let params = Object.assign({}, {streamId: this.selectedRecordCameraStreamId, pageNum: 0, pageSize: 10000}, this.getStartEndDateTime(this.recordMonth))
        let res = await this.$service.getCameraRecordList(params);
        if (res && res.code === 0) {
          let resList = _.get(res.data, 'list') || [];
          this.recordList = _.reverse(resList);
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 截图摄像头选择
    cameraImageSelectHandler() {
      if (this.selectedCameraImageStreamName) {
        this.getCameraImageByStreamName(); // '22020100310000000001'
      }
    },
    // 延时摄影摄像头选择
    async cameraDelaySelectHandler() {
      try {
        if (this.selectedCameraDelayStreamName) {
          this.getTimeLapseDateList();
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 延时摄影日期
    getTimeLapseDateList() {
      this.$service.getTimeLapseDateList(this.selectedCameraDelayStreamName)
        .then((res) => {
          if (res && res.code === 0) {
            let monthList = res.data || [];
            this.monthList = monthList.map((item) => {
              let year = item.slice(0, 4);
              let month = item.slice(4);
              return `${year}-${month}`;
            })
            this.month = _.get(this.monthList, '0');
            this.getCameraTimeLapseByStreamName();
          }
        }).catch((err) => {
          console.log(err);
        });
    },
    cameraMonthSelectHandler() {
      let timeLapse = this.cameraTimeLapseList.find((item) => item.dateStr === this.month.replace('-', ''));
      let url = _.get(timeLapse, 'url') || this.noLapseUrl;
      this.timeLapseUrl = url;
    },
    changeTab(index) {
      this.activeIndex = index;
      this.subActiveIndex = 0;
      this.getCameraListByLandCode();
    },
    changeSubTab(index) {
      this.subActiveIndex = index;
      this.activeCameraList = [];
      this.activeCameraList = this.chunkedCameraList[this.subActiveIndex];
    },
    getCameraList(cameras) {
      let form = _.get(this.landList, `${this.activeIndex}.form`);
      let count = cameras.length;
      if (form) {
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
      } else {
        return [];
      }
    },
    recordCameraMonthSelectHandler() {
      if (this.selectedRecordCameraStreamId) {
        this.getCameraRecordList();
      }
    },
    recordCameraSelectHandler() {
      if (this.selectedRecordCameraStreamId) {
        this.getCameraRecordList();
      }
    },
    recordPrevHandler() {
      if (this.activeRecordIndex > 0) {
        this.activeRecordIndex = this.activeRecordIndex - 1;
      }
    },
    recordNextHandler() {
      if (this.activeRecordIndex < this.recordList.length - 1) {
        this.activeRecordIndex = this.activeRecordIndex + 1;
      }
    },
    getStartEndDateTime(day) {
      let dayStart = `${day} 00:00:00`;
      let dayEnd = `${day} 23:59:59`;
      let dateStart = new Date(dayStart);
      let dateEnd = new Date(dayEnd);
      let startTime = dateStart.getTime();
      let endTime = dateEnd.getTime();
      return { startTime, endTime };
    }
  }
};
</script>
<style lang="scss" scoped>
.farm-stock-monitor {
  .content {
    width: calc(100% - 1rem);
  }
  .no-data-text {
    color: #9FA8B8;
  }
  .title-wrapper {
    display: flex;
    // justify-content: space-between;
    justify-content: flex-start;
    align-items: center;
    height: 8.1632%;
    .svg-icon {
      width: 0.25rem;
      height: 0.25rem;
    }
    .tab-list-wrapper {
      max-width: 4.5rem;
      .tab-item {
        display: inline-block;
        min-width: 1.1rem;
        height: 0.4rem;
        padding: 0 0.1rem;
        line-height: 0.4rem;
        text-align: center;
        color: #417fc8;
        font-size: 0.16rem;
        background: url("../../assets/image/tab_bg_icon.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
        &.active {
          color: #fff;
        }
      }
      .tab-item + .tab-item {
        margin-left: 0.1rem;
      }
    }
  }
  .tab-content {
    height: 91.8367%;
    .tab-content-wrapper {
      display: flex;
      justify-content: space-between;
      height: 100%;
      .left-content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 24.83%;
        height: 100%;
        padding: 0 0.2rem 0.2rem 0.2rem;
        overflow: hidden;
        .left-top-content {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 33.33%;
          overflow: hidden;
        }
        .left-middle-content {
          display: flex;
          flex-direction: column;
          height: 33.33%;
        }
        .left-bottom-content {
          display: flex;
          flex-direction: column;
          height: 33.33%;
        }
        .title-one {
          height: 0.44rem;
          .my-vue-select {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            z-index: 320;
            &.month-select {
              right: 1.3rem;
            }
            &.record-day-select {
              right: 1.3rem;
            }
          }
        }
        .left-media-content {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: calc(100% - 0.44rem);
          padding: 0.04rem;
          .video-player-wrapper {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            .prev-btn {
              position: absolute;
              top: 50%;
              left: 0.2rem;
              transform: translateY(-50%);
              cursor: pointer;
              .svg-icon {
                width: 0.24rem;
                height: 0.24rem;
              }
            }
            .next-btn {
              position: absolute;
              top: 50%;
              right: 0.2rem;
              transform: translateY(-50%);
              cursor: pointer;
              .svg-icon {
                width: 0.24rem;
                height: 0.24rem;
              }
            }
            .page {
              position: absolute;
              bottom: 0.45rem;
              right: 0.15rem;
              color: #fff;
              font-size: 0.14rem;
            }
          }
          .mp4-video-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
          }
          .farm-tab-content-item-container2 {
            position: relative;
            width: 100%;
            height: 100%;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-position: center center;
              .camera-item {
                position: absolute;
                width: 0.44rem;
                height: 0.54rem;
                transform: scale(0.4);
                z-index: 4;
                .title {
                  position: absolute;
                  top: -0.34rem;
                  left: 50%;
                  transform: translateX(-50%);
                  width: 0.9rem;
                  height: 0.3rem;
                  line-height: 0.3rem;
                  color: #f0f0f0;
                  font-size: 0.14rem;
                  text-align: center;
                  background-image: url('../../assets/image/border-icon20.png');
                  background-size: 100% 100%;
                  background-repeat: no-repeat;
                  background-position: center center;
                }
                .svg-icon {
                  width: 0.44rem;
                  height: 0.54rem;
                }
                &.is-ball {
                  background-size: 100% 100%;
                  background-repeat: no-repeat;
                  background-position: center center;
                }
                &.is-gun {
                  background-size: 100% 100%;
                  background-repeat: no-repeat;
                  background-position: center center;
                }
              }
          }
        }
      }
      .right-content {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 73.48%;
        height: 100%;
        padding: 0 0.2rem 0.2rem 0.2rem;
        .title-one {
          height: 0.48rem;
          .sub-tab-list {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            .sub-tab-item {
              color: #417FC8;
              width: 0.6rem;
              height: 0.32rem;
              line-height: 0.32rem;
              text-align: center;
              cursor: pointer;
              &.active {
                color: #fff;
              }
            }
            .sub-tab-item + .sub-tab-item {
              margin-left: 0.06rem;
            }
          }
        }
        .camera-list {
          display: flex;
          flex-wrap: wrap;
          height: calc(100% - 0.5rem);
          .camera-item {
            display: flex;
            flex-direction: column;
            width: 49.23%;
            height: 50%;
            padding: 0 0.1rem;
            .title-one {
              display: flex;
              align-items: center;
              height: 0.44rem;
              .vr-icon {
                position: absolute;
                right: 0.8rem;
                top: 50%;
                transform: translateY(-50%);
                width: 0.4rem;
                height: 0.24rem;
                .vr-video-icon {
                  width: 0.4rem;
                  height: 0.24rem;
                }
              }
              .camera-status {
                position: absolute;
                right: 0;
                top: 50%;
                transform: translateY(-50%);
                display: flex;
                align-items: center;
                justify-content: center;
                width: 0.6rem;
                height: 0.22rem;
                background-color: #202E50;
                border-radius: 0.04rem;
                color: #fff;
                font-size: 0.12rem;
                span {
                  display: flex;
                  align-items: center;
                  i {
                    display: inline-block;
                    width: 0.06rem;
                    height: 0.06rem;
                    border-radius: 50%;
                    margin-right: 0.06rem;
                    &.on {
                      background-color: #7ED321;
                    }
                    &.off {
                      background-color: #F35151;
                    }
                  }
                }
              }
            }
            .media-content {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;
              flex: 1;
              padding: 0.04rem;
            }
          }
          .camera-item:nth-of-type(2n) {
            margin-left: 1.529%;
          }
        }
      }
    }
  }
}
</style>