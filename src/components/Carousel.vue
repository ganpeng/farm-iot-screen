<template>
  <div v-if="dataList.length > 0" class="my-carousel">
    <ul
      id="bannerUl"
      class="data-list"
      :style="{
        width: itemWidth * (dataList.length + 1) + unit,
        ...boxStyle,
      }"
      @touchstart="touchstart($event)"
      @touchmove="touchmove($event)"
      @touchend="touchend($event)"
    >
      <li
        class="data-item"
        v-for="(item, index) in dataList"
        :key="index"
        :style="`width: ${itemWidth}${unit}`"
      >
        <video-player
          v-if="item.isVideo"
          :playUrl="item.img"
          videoType="video/mp4"
        ></video-player>
        <div
          v-else
          class="img"
          @click="showImagePreview(index)"
          :style="imageStyle(item.img)"
        ></div>
      </li>
      <li :key="dataList.length" :style="`width: ${itemWidth}${unit}`">
        <div class="img" :style="imageStyle(dataList[0].img)"></div>
      </li>
    </ul>
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
    <image-preview ref="imagePreview"></image-preview>
  </div>
</template>
<script>
import ImagePreview from "@/components/ImagePreview";
import VideoPlayer from "@/components/VideoPlayer";
export default {
  name: "Carousel",
  components: { ImagePreview, VideoPlayer },
  props: {
    unit: {
      type: String,
      default: "px",
    },
    autoDisplayFlag: {
      type: Boolean,
      default: false,
    },
    dataList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      transitionDuration: "800ms", // 滑动动画时间
      autoTimer: 0, // 自动轮播定时器
      boxStyle: {
        transitionDuration: 0,
        transform: "translate(0,0)",
      },
      itemWidth: 0,
      itemHeight: 0,
      displayIndex: 0, // 当前展示的轮播图的索引
      slidePosition: "left",
      startX: 0,
      startY: 0,
      endTime: 0,
      moveX: 0,
      moveY: 0,
      disX: 0,
      transitionendCallback: function () {
        console.log("ok");
      },
    };
  },
  watch: {
    dataList() {
      this.init();
    },
    displayIndex() {
      this.transition();
    },
  },
  created() {
    this.init();
  },
  computed: {
    imageStyle() {
      return (url) => {
        return `background-image: url(${url});`;
      };
    },
  },
  methods: {
    async init() {
      try {
        await this.$nextTick();
        this.displayIndex = 0;
        if (this.dataList.length > 0) {
          this.getContainerReact();
          if (this.autoDisplayFlag) {
            this.autoDisplay();
          }
          this.boxStyle = {
            transitionDuration: "0",
            transform:
              "translate(" +
              -this.displayIndex * this.itemWidth +
              this.unit +
              ", 0)",
          };
          document.getElementById("bannerUl").addEventListener(
            "transitionend",
            () => {
              this.transitionendCallback();
            },
            false
          );
          window.addEventListener(
            "resize",
            () => {
              setTimeout(() => {
                this.getContainerReact();
              }, 400)
            },
            false
          );
        }
      } catch (err) {
        console.log(err);
      }
    },
    transition() {
      setTimeout(() => {
        if (this.displayIndex >= 0) {
          this.boxStyle = {
            transitionDuration: this.transitionDuration,
            transform:
              "translate(" +
              -this.displayIndex * this.itemWidth +
              this.unit +
              ", 0)",
          };
          this.transitionendCallback = function () {
            this.boxStyle.transitionDuration = "0s";
            if (this.displayIndex >= this.dataList.length) {
              this.boxStyle.transitionDuration = "0s";
              this.boxStyle.transform = "translate(0,0)";
              this.displayIndex = 0;
            }
            if (this.autoDisplayFlag) {
              this.autoDisplay();
            }
          };
        } else {
          this.displayIndex = 0;
        }
      }, 0);
    },
    /**
     * 自动轮播
     */
    getContainerReact() {
      let myCarouselContainer = document.querySelector(".my-carousel");
      let computedStyle = document.defaultView.getComputedStyle(
        myCarouselContainer,
        null
      );
      let { width, height } = computedStyle;
      let itemWidth = width.replace("px", "");
      let itemHeight = height.replace("px", "");
      this.itemWidth = itemWidth;
      this.itemHeight = itemHeight;
    },
    autoDisplay: function () {
      if (this.autoTimer) {
        clearInterval(this.autoTimer);
      }
      this.autoTimer = setInterval(() => {
        this.displayIndex++;
      }, 2000);
    },
    touchstart(e) {
      clearInterval(this.autoTimer);
      e = e || event;
      this.startTime = new Date().getTime();
      if (e.touches.length === 1) {
        this.startX = e.touches[0].clientX; // 记录开始位置
        this.startY = e.touches[0].clientY; // 记录开始位置
      }
    },
    touchmove(e) {
      e = e || event;
      if (e.touches.length === 1) {
        // 滑动时距离浏览器左侧的距离
        this.moveX = e.touches[0].clientX;
        this.disX = this.startX - this.moveX;
        if (this.disX < 0) {
          // 右滑
          this.slidePosition = "right";
          if (this.displayIndex <= 0) {
            // 在最左边不许往右滑动
          } else {
            this.boxStyle = {
              transitionDuration: "0",
              transform:
                "translate(" +
                (-this.displayIndex * this.itemWidth - this.disX) +
                this.unit +
                ", 0)",
            };
          }
        } else {
          // 左滑
          this.slidePosition = "left";
          if (this.displayIndex >= this.dataList.length) {
            // 在最右边不许往左滑动
          } else {
            this.boxStyle = {
              transitionDuration: "0",
              transform:
                "translate(" +
                (-this.displayIndex * this.itemWidth - this.disX) +
                this.unit +
                ", 0)",
            };
          }
        }
      }
    },
    touchend() {
      this.endTime = new Date().getTime();
      if (Math.abs(this.moveX - this.startX) > this.itemWidth / 3) {
        if (this.slidePosition === "left") {
          this.displayIndex++;
        } else {
          this.displayIndex--;
        }
      } else {
        this.boxStyle = {
          transitionDuration: "200",
          transform:
            "translate(" +
            -this.displayIndex * this.itemWidth +
            this.unit +
            ", 0)",
        };
        this.transitionendCallback = function () {
          this.boxStyle.transitionDuration = "0s";
        };
      }
    },
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
    },
    showImagePreview(currentIndex) {
      let imageList = this.dataList.filter((item) => !item.isVideo).map((item) => item.img);
      this.$refs.imagePreview.init(imageList, currentIndex);
    },
  },
};
</script>

<style scoped lang="scss">
.my-carousel {
  position: relative;
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  .data-list {
    position: absolute;
    left: 0;
    height: 100%;
    overflow: hidden;
    &:after {
      content: "";
      clear: both;
    }
    .data-item {
      display: flex;
      align-items: center;
      float: left;
      height: 100%;
      .img {
        display: block;
        width: 100%;
        height: 100%;
        background-position: center center;
        background-size: contain;
        background-repeat: no-repeat;
      }
    }
  }
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