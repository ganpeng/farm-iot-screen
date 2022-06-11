<template>
  <div v-if="visible" class="insect-situation-container">
    <div class="insect-situation-dialog border-icon19">
      <div class="date-picker-container">
        <date-picker class="my-date-picker" :clearable="false" v-model="dateRange" @input="dateChangeHandler($event)" range type="date" value-type="timestamp" format="YYYY-M-D"></date-picker>
      </div>
      <div class="title">{{name}}</div>
      <div class="image-list-container">
        <ul v-if="list.data.length > 0" class="image-list">
          <li v-for="(item, index) in list.data" :key="index" @click="showImagePreview(index)" class="image-item">
            <div class="img" :style="imageStyle(item.value)"></div>
          </li>
        </ul>
        <div v-else class="empty-container">
          <svg-icon icon-class="empty_icon"></svg-icon>
          <div class="tips">暂无数据</div>
        </div>
      </div>
      <div @click="prevHandler" v-if="currentPage > 1" class="prev-btn page-list-btn">
        <svg-icon icon-class="page_list_prev_btn"></svg-icon>
      </div>
      <div @click="nextHandler" v-if="currentPage < pages" class="next-btn page-list-btn">
        <svg-icon icon-class="page_list_next_btn"></svg-icon>
      </div>
      <span @click="hide" class="close-btn">
        <svg-icon icon-class="video_dialog_close_btn"></svg-icon>
      </span>
      <div v-if="list.data.length > 0" class="page">
        {{currentPage}}/{{pages}}
      </div>
    </div>
    <image-preview ref="imagePreview"></image-preview>
  </div>
</template>
<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import ImagePreview from "@/components/ImagePreview";
let today = new Date();
let preDateTime = today.getTime() - 24 * 60 * 60 * 1000; //前一天
let nextDateTime = today.getTime() + 24 * 60 * 60 * 1000; //后一天
export default {
  name: 'InsectSituationDialog',
  components: {DatePicker, ImagePreview},
  data() {
    return {
      isLoading: false,
      visible: false,
      name: '', // 虫情测报灯名称
      deviceName: '',
      dateRange: [preDateTime, nextDateTime],
      list: {
        data: [],
        pagination: {
          pageNum: 0,
          pageSize: 5,
          total: 0
        }
      }
    };
  },
  computed: {
    imageStyle() {
      return (url) => {
        return `background-image: url(${url});`;
      };
    },
    currentPage() {
      let {pageNum} = this.list.pagination;
      return pageNum + 1;
    },
    pages() {
      let {pageSize, total} = this.list.pagination;
      let pages = Math.ceil(total / pageSize);
      return pages;
    }
  },
  methods: {
    async getSensorCameraImageList() {
      try {
        if (!this.isLoading) {
          this.isLoading = true;
          let {pageNum, pageSize} = this.list.pagination;
          let params = this.$_.assign({}, {
            deviceName: this.deviceName,
            startedAt: this.$_.get(this.dateRange, `0`),
            endedAt: this.$_.get(this.dateRange, `1`),
            pageSize,
            pageNum
          });

          let res = await this.$service.getSensorCameraImageList(params)
          this.isLoading = false;
          if (res && res.code === 0) {
            let {list, pageSize, total} = res.data;
            this.list.data = list || [];
            this.list.pagination = { pageNum, pageSize, total };
          }
        }
      } catch (err) {
        this.isLoading = false;
        console.log(err);
      }
    },
    show(deviceName, name) {
      this.visible = true;
      this.deviceName = deviceName;
      this.name = name;
      this.getSensorCameraImageList();
    },
    hide() {
      this.visible = false;
      this.isLoading = false;
      this.deviceName = '';
      this.dateRange = [preDateTime, nextDateTime];
      this.list = {
        data: [],
        pagination: {
          pageNum: 0,
          pageSize: 5,
          total: 0
        }
      };
    },
    dateChangeHandler() {
      this.$_.set(this.list, `pagination.pageNum`, 0);
      this.getSensorCameraImageList();
    },
    prevHandler() {
      let {pageNum} = this.list.pagination;
      if (pageNum > 0) {
        this.$_.set(this.list, `pagination.pageNum`, pageNum - 1);
        this.getSensorCameraImageList();
      }
    },
    nextHandler() {
      let {pageNum} = this.list.pagination;
      if (pageNum < this.pages) {
        this.$_.set(this.list, `pagination.pageNum`, pageNum + 1);
        this.getSensorCameraImageList();
      }
    },
    showImagePreview(currentIndex) {
      let imageList = this.list.data.map((item) => item.value);
      this.$refs.imagePreview.init(imageList, currentIndex);
    }
  }
}
</script>
<style lang="scss">
.insect-situation-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 10;
  .insect-situation-dialog {
    position: absolute;
    top: 50%;
    left: calc(50% + 0.5rem);
    transform: translate(-50%, -50%);
    width: calc(80% - 1rem);
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
    .date-picker-container {
      position: absolute;
      top: 0.2rem;
      right: 0.2rem;
    }
    .title {
      position: absolute;
      top: 0.4rem;
      left: 50%;
      transform: translateX(-50%);
      color: #fff;
      font-size: 0.18rem;
    }
    .image-list-container {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 86%;
      height: 1.8rem;
      .image-list {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        .image-item {
          width: calc(20% - 0.1rem);
          height: 100%;
          .img {
            width: 100%;
            height: 100%;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center center;
          }
        }
        .image-item + .image-item {
          margin-left: 0.2rem;
        }
      }
      .empty-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .svg-icon {
          width: 0.64rem;
          height: 0.64rem;
        }
        .tips {
          font-size: 0.14rem;
          color: #9FA8B8;
          margin-top: 0.20rem;
        }
      }
    }
    .page-list-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      &.prev-btn {
        left: 0.3rem;
      }
      &.next-btn {
        right: 0.3rem;
      }
      .svg-icon {
        width: 0.46rem;
        height: 0.46rem;
      }
    }
    .page {
      position: absolute;
      bottom: 0.3rem;
      right: 0.3rem;
      color: #fff;
      font-size: 0.14rem;
    }
  }
}
</style>