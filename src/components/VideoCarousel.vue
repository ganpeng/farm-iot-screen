<template>
  <div class="my-video-carousel">
    <video-player :playUrl="recordUrl"></video-player>
    <span v-if="displayIndex > 0" @click="prevHandler" class="prev-btn">
      <svg-icon v-if="displayIndex !== 0" icon-class="prev_btn"></svg-icon>
      <svg-icon v-else icon-class="prev_btn_disabled"></svg-icon>
    </span>
    <span v-if="displayIndex < dataList.length - 1" @click="nextHandler" class="next-btn">
      <svg-icon
        v-if="displayIndex !== dataList.length - 1"
        icon-class="next_btn"
      ></svg-icon>
      <svg-icon v-else icon-class="next_btn_disabled"></svg-icon>
    </span>
    <div v-if="dataList.length > 0" class="page">
      {{ displayIndex + 1 }}/{{ dataList.length }}
    </div>
  </div>
</template>
<script>
import VideoPlayer from "@/components/VideoPlayer";
export default {
  name: "VideoCarousel",
  components: { VideoPlayer },
  props: {
    dataList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      displayIndex: 0, // 当前展示的轮播图的索引
    };
  },
  computed: {
    recordUrl() {
      let url = this.$_.get(this.dataList, `${this.displayIndex}`);
      return url;
    }
  },
  methods: {
    changeDisplayIndex(index) {
      this.displayIndex = index;
    },
    prevHandler() {
      if (this.displayIndex === 0) {
        this.displayIndex = this.dataList.length - 1;
      } else {
        this.displayIndex = this.displayIndex - 1;
      }
    },
    nextHandler() {
      if (this.displayIndex === this.dataList.length - 1) {
        this.displayIndex = 0;
      } else {
        this.displayIndex = this.displayIndex + 1;
      }
    }
  },
};
</script>
<style scoped lang="scss">
.my-video-carousel {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .prev-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0.1rem;
    top: 50%;
    transform: translateY(-50%);
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 0.4rem;
    background-color: rgba(0, 0, 0, 0.3);
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.6);
    }
    .svg-icon {
      width: 0.2rem;
      height: 0.2rem;
    }
  }
  .next-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 0.1rem;
    top: 50%;
    transform: translateY(-50%);
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 0.4rem;
    background-color: rgba(0, 0, 0, 0.3);
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.6);
    }
    .svg-icon {
      width: 0.2rem;
      height: 0.2rem;
    }
  }
  .page {
    position: absolute;
    bottom: 0.15rem;
    right: 0.15rem;
    color: #fff;
    font-size: 0.14rem;
  }
}
</style>