<template>
  <div class="tracing-info-container">
    <div v-if="chunkedTraceInfoList.length > 0" class="chunk-trace-info-list-container">
      <ul v-if="activeChunkedTraceInfoList.length > 0" class="tracing-list">
        <li v-for="(trace, index) in activeChunkedTraceInfoList" :key="index" class="tracing-item border-icon59">
          <div class="text-info">
            <div class="title">
              <!-- <i class="index my-font">{{index + 1 | padZero}}</i> -->
              <i class="name">{{trace.name}}</i>
            </div>
            <div class="desc" :title="trace.moreInfo">
              {{trace.moreInfo}}
            </div>
            <div class="date">{{trace.date | formatDate(`yyyy-MM-DD`)}}</div>
          </div>
          <div class="card-container">
            <carousel :dataList="dataList(trace)"></carousel>
          </div>
        </li>
      </ul>
    </div>
    <no-data v-else></no-data>
    <div @click="prevHandler" v-if="activeIndex > 0" class="prev-btn page-list-btn">
      <svg-icon icon-class="page_list_prev_btn"></svg-icon>
    </div>
    <div @click="nextHandler" v-if="activeIndex < chunkedTraceInfoList.length - 1" class="next-btn page-list-btn">
      <svg-icon icon-class="page_list_next_btn"></svg-icon>
    </div>
  </div>
</template>
<script>
import Carousel from '@/components/Carousel';
export default {
  name: 'TraceInfo',
  components: {Carousel},
  props: {
    goodsId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      activeIndex: 0,
      traceInfo: []
    };
  },
  watch: {
    goodsId() {
      this.getBatchList();
    }
  },
  created() {
    this.getBatchList();
  },
  computed: {
    dataList() {
      return (trace) => {
        let {imageUrl, videoUrl} = trace;
        let dataList = [];
        if (imageUrl) {
          dataList = this.$_.concat(dataList, imageUrl.map((url) => {
            return {
              img: url
            };
          }));
        }
        if (videoUrl) {
          dataList = this.$_.concat(dataList, [{
            img: videoUrl,
            isVideo: true
          }]);
        }
        return dataList;
      };
    },
    chunkedTraceInfoList() {
      return this.$_.chunk(this.traceInfo, 6);
    },
    activeChunkedTraceInfoList() {
      return this.$_.get(this.chunkedTraceInfoList, this.activeIndex);
    }
  },
  methods: {
    async getBatchList() {
      try {
        let res = await this.$service.getBatchList({goodsId: this.goodsId});
        if (res && res.code === 0) {
          let batchList = this.$_.get(res.data, 'list') || [];
          let batch = batchList.filter((batch) => {
            return batch.selectedStatus === 'DEFAULT';
          });
          let traceInfo = this.$_.get(batch, '0.traceInfo') || [];
          this.traceInfo = traceInfo.map((trace) => {
            if (!this.$_.isArray(trace.imageUrl)) {
              if (trace.imageUrl) {
                trace.imageUrl = [trace.imageUrl];
              } else {
                trace.imageUrl = [];
              }
            }
            return trace;
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    showImagePreview(imageList, currentIndex) {
      this.$refs.imagePreview.init(imageList, currentIndex);
    },
    prevHandler() {
      this.activeIndex = this.activeIndex - 1;
    },
    nextHandler() {
      this.activeIndex = this.activeIndex + 1;
    }
  }
}
</script>
<style lang="scss" scoped>
.tracing-info-container {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0 0.66rem;
  .chunk-trace-info-list-container {
    width: 100%;
    height: 100%;
  }
  .tracing-list {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .tracing-item {
      display: flex;
      width: calc(33.33333% - 0.1rem);
      height: calc(50% - 0.1rem);
      padding: 0.2rem;
      margin-left: 0.125rem;
      margin-top: 0.1rem;
      .card-container {
        // width: 100%;
        // height: 1.7rem;
        width: 66%;
        height: 100%;
        padding: 0.04rem;
        // background-color: #22314B;
        background-color: rgba(34, 49, 75, 0.3);
        overflow: hidden;
      }
      .text-info {
        position: relative;
        width: calc(34% - 0.1rem);
        margin-right: 0.1rem;
        .title {
          display: flex;
          align-items: center;
          width: 100%;
          color: #00DCFF;
          font-size: 0.20rem;
          font-weight: 500;
          margin: 0.03rem 0;
          .index {
            font-size: 0.28rem;
            margin-right: 0.1rem;
          }
          .name {
            word-break: break-all;
          }
        }
        .desc {
          color: #A3D0FD;
          font-size: 0.16rem;
          // height: 0.32rem;
          line-height: 0.24rem;
          margin-top: 0.1rem;
          font-weight: 400;
          word-break: break-all;
        }
        .date {
          position: absolute;
          left: 0;
          bottom: 0;
          font-size: 0.12rem;
          color: #9FA8B8;
        }
      }
    }
    .tracing-item:nth-of-type(3n + 1) {
      margin-left: 0;
    }
  }
  .page-list-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    &.prev-btn {
      left: 0;
    }
    &.next-btn {
      right: 0;
    }
    .svg-icon {
      width: 0.46rem;
      height: 0.46rem;
    }
  }
}
</style>
