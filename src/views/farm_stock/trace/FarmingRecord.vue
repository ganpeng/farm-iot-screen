<template>
  <div class="farming-record-container">
    <div v-if="cropCycleList.length > 0" class="farming-record-warpper">
      <div class="left-field">
        <div class="crop-cycle-list-container">
          <ul class="crop-cycle-list">
            <li
              @click="changeCropCycleHandler(index)"
              v-for="(cropCycle, index) in cropCycleList" :key="index"
              :class="['crop-cycle-item', cropCycleActiveIndex === index && 'active']">
              {{cropCycle.name}}
            </li>
          </ul>
        </div>
        <div class="record-list-container">
          <ul v-if="recordList.length > 0" class="record-list">
            <li
              @click="changeRecordHandler(index)"
              v-for="(record, index) in recordList" :key="index"
              :class="['record-item', recordActiveIndex === index && 'active']">
              <span class="date">{{record.startAt | formatDate(`yyyy-MM-DD`)}}</span>
              <span class="type">{{record.agriculTypeName}}</span>
            </li>
          </ul>
          <no-data v-else></no-data>
        </div>
        <div class="agricul-type-list-container">
          <ul class="agricul-type-list">
            <li class="agricul-type-item"></li>
          </ul>
        </div>
      </div>
      <div class="middle-field">
        <div class="carousel-wrapper border-icon61">
          <carousel v-if="dataList.length > 0" :dataList="dataList" ref="myCarousel"></carousel>
          <no-data v-else></no-data>
        </div>
      </div>
      <div class="right-field">
        <div class="right-top-field">
          <div class="right-top-left-field">
            <div class="title">农事记录详情信息</div>
            <div class="info-container">
              <div class="info-item">
                <div class="label">地块名称</div>
                <div class="value">{{activeRecord.landName}}</div>
              </div>
              <div class="info-item">
                <div class="label">种植作物</div>
                <div class="value">{{activeRecord.plantName}}{{activeRecord.seedName}}</div>
              </div>
              <div class="info-item">
                <div class="label">开始时间</div>
                <div class="value">{{activeRecord.startAt | formatDate(`yyyy-MM-DD`)}}</div>
              </div>
              <div class="info-item">
                <div class="label">结束时间</div>
                <div class="value">{{activeRecord.endAt | formatDate(`yyyy-MM-DD`)}}</div>
              </div>
            </div>
          </div>
          <div class="right-top-right-field border-icon62">
            <video-carousel v-if="recordVideoList.length > 0" :dataList="recordVideoList"></video-carousel>
            <no-data v-else></no-data>
            <div class="prompt-title">精彩回看</div>
          </div>
        </div>
        <div class="right-bottom-field">
          <div class="info-item">
            <div class="label">农事描述</div>
            <div class="value">{{activeRecord.farmDes}}</div>
          </div>
        </div>
      </div>
    </div>
    <no-data v-else></no-data>
  </div>
</template>
<script>
import Carousel from '@/components/Carousel';
import VideoCarousel from '@/components/VideoCarousel';
export default {
  name: 'FarmingRecord',
  components: {Carousel, VideoCarousel},
  props: {
    goods: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      reqParams: {}, // 请求参数对象
      cropCycleActiveIndex: 0,
      cropCycleList: [],
      recordActiveIndex: 0,
      recordList: [],
      dataList: [], // 轮播列表
      // 摄像头播放地址
      recordVideoList: [], // 农事记录摄像头列表
      playUrl: ''
    };
  },
  watch: {
    goods() {
      this.getTraceParamsByGoodsId();
    }
  },
  async created() {
    try {
      await this.getTraceParamsByGoodsId();
    } catch (err) {
      console.log(err);
    }
  },
  computed: {
    activeRecord() {
      let record = this.$_.get(this.recordList, `${this.recordActiveIndex}`) || {};
      return record;
    }
  },
  methods: {
    getTraceParamsByGoodsId() {
      let {goodsId} = this.goods;
      this.$service.getTraceParamsByGoodsId(goodsId)
        .then((res) => {
          if (res && res.code === 0) {
            this.reqParams = res.data || {};
            let {farmId, plantName} = this.reqParams;
            if (farmId && plantName) {
              this.getCropCycleList();
            } else {
              this.cropCycleActiveIndex = 0;
              this.cropCycleList = [];
            }
          }
        }).catch((err) => {
          console.log(err);
        });
    },
    getCropCycleList() {
      let {farmId, plantName} = this.reqParams;
      let params = {
        farmId,
        plantName,
        pageNum: 0,
        pageSize: 10000
      };
      this.$service.getCropCycleList(params)
        .then((res) => {
          if (res && res.code === 0) {
            this.cropCycleList = this.$_.get(res.data, `list`) || [];
            this.getAgriculRecordList();
          }
        }).catch((err) => {
          console.log(err);
        });
    },
    getAgriculRecordList() {
      let {farmId, landId, plantName} = this.reqParams;
      let {id} = this.$_.get(this.cropCycleList, this.cropCycleActiveIndex);
      if (farmId && landId && plantName) {
        let params = {
          farmId,
          landId,
          cropCycleId: id,
          plantName,
          pageNum: 0,
          pageSize: 100000
        };
        this.$service.getAgriculRecordList(params)
          .then((res) => {
            if (res && res.code === 0) {
              this.recordList = this.$_.get(res.data, `list`) || [];
              this.changeRecordHandler(0);
            }
          }).catch((err) => {
            console.log(err);
          });
      }
    },
    async getCameraDetailById(deviceId) {
      try {
        let res = await this.$service.getCameraDetailById(deviceId);
        if (res && res.code === 0) {
          let streamId = this.$_.get(res.data, `streamId`);
          let {endAt, startAt} = this.activeRecord;
          let params = Object.assign({}, {streamId, pageNum: 0, pageSize: 10000, startTime: startAt, endTime: endAt});
          let recordRes = await this.$service.getCameraRecordList(params);
          if (recordRes && recordRes.code === 0) {
            let recordVideoList = this.$_.get(recordRes.data, `list`) || [];
            this.recordVideoList = recordVideoList.map((item) => item.url);
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
    isVideo(url) {
      let index = url.indexOf('.mp4?');
      return index >= 0;
    },
    getDataList(index) {
      let urlList = this.$_.get(this.recordList, `${index}.urlList`) || [];
      return urlList.map((item) => {
        if (this.isVideo(item.fileUrl)) {
          return {
            img: item.fileUrl,
            isVideo: true
          };
        } else {
          return {
            img: item.fileUrl
          };
        }
      });
    },
    changeCropCycleHandler(index) {
      this.cropCycleActiveIndex = index;
      this.getAgriculRecordList();
    },
    changeRecordHandler(index) {
      this.dataList = [];
      this.recordActiveIndex = index;
      setTimeout(() => {
        this.dataList = this.getDataList(index);
      }, 0)
      // this.getCameraDetailById(`222324807839203394-cn-beijing`);
      let cameraId = this.$_.get(this.activeRecord, `cameraId`);
      if (cameraId) {
        this.getCameraDetailById(cameraId);
      } else {
        this.playUrl = '';
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.farming-record-container {
  position: relative;
  width: 100%;
  height: 100%;
  .farming-record-warpper {
    display: flex;
    width: 100%;
    height: 100%;
    padding: 0.6rem 0 0.4rem 0;
  }
  .left-field {
    display: flex;
    height: 100%;
    .crop-cycle-list-container {
      position: relative;
      width: 1.44rem;
      height: 100%;
      background-color: #233350;
      overflow: hidden;
      overflow-y: scroll;
      .crop-cycle-list {
        width: 1.44rem;
        background-color: #233350;
        .crop-cycle-item {
          width: 100%;
          height: 0.5rem;
          line-height: 0.5rem;
          color: #00DCFF;
          font-size: 0.18rem;
          text-align: center;
          cursor: pointer;
          &.active {
            color: #fff;
            background: url('../../../assets/image/border-icon60.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
            background-position: left center;
          }
        }
      }
    }
    .record-list-container {
      position: relative;
      width: 3.2rem;
      height: 100%;
      padding: 0.2rem;
      background-color: #22314B;
      overflow: hidden;
      overflow-y: scroll;
      .record-list {
        width: 100%;
        height: 100%;
        .record-item {
          display: flex;
          align-items: center;
          color: #9FA8B8;
          width: 100%;
          height: 0.4rem;
          cursor: pointer;
          &:last-child {
            margin-bottom: 0;
          }
          &.active {
            color: #fff;
          }
          span {
            font-size: 0.18rem;
          }
          .date {
            width: 1.2rem;
            margin-right: 0.08rem;
            white-space: nowrap;
            overflow: hidden;
          }
          .type {
            flex: 1;
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
      }
    }
  }
  .middle-field {
    display: flex;
    align-items: center;
    width: 5.6rem;
    height: 100%;
    margin: 0 0.4rem;
    .carousel-wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      // height: 3.2rem;
      padding: 0.04rem;
    }
  }
  .right-field {
    flex: 1;
    .right-top-field {
      display: flex;
      .right-top-left-field {
        flex: 1;
        text-align: left;
        .title {
          width: 2rem;
          height: 0.4rem;
          line-height: 0.4rem;
          background-color: #10254B;
          border: 1px solid #417FC8;
          border-radius: 0.05rem;
          text-align: center;
          font-size: 0.14rem;
          color: #9FA8B8;
        }
        .info-container {
          .info-item {
            display: flex;
            align-items: center;
            margin-top: 0.12rem;
            .label {
              color: #6F7480;
              font-size: 0.14rem;
              margin-right: 0.2rem;
            }
            .value {
              color: #9FA8B8;
              font-size: 0.14rem;
            }
          }
        }
      }
      .right-top-right-field {
        position: relative;
        width: 3rem;
        height: 1.7rem;
        padding: 0.04rem;
        .prompt-title {
          position: absolute;
          left: 50%;
          bottom: -0.3rem;
          transform: translateX(-50%);
          color: #9FA8B8;
          font-size: 0.14rem;
        }
      }
    }
    .right-bottom-field {
      .info-item {
        margin-top: 0.12rem;
        .label {
          color: #6F7480;
          font-size: 0.14rem;
          margin-right: 0.2rem;
        }
        .value {
          color: #9FA8B8;
          font-size: 0.14rem;
          margin-top: 0.12rem;
        }
      }
    }
  }
}
</style>