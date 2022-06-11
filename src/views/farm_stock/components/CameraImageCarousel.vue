<template>
  <div class="certificate-container">
    <div class="certificate-content">
      <div :id="id" class="siema">
        <div
          :style="imgStyle(data)"
          v-for="(data, index) in dataList"
          :key="index" class="siema-item"></div>
      </div>
    </div>
    <div v-if="dataList.length > 1" @click="prevHandler" class="prev-btn">
      <svg-icon v-if="prevBtnActive" icon-class="wap_prev_icon_active"></svg-icon>
      <svg-icon v-else icon-class="wap_prev_icon"></svg-icon>
    </div>
    <div v-if="dataList.length > 1" @click="nextHandler" class="next-btn">
      <svg-icon v-if="nextBtnActive" icon-class="wap_next_icon_active"></svg-icon>
      <svg-icon v-else icon-class="wap_next_icon"></svg-icon>
    </div>
    <div v-if="dataList.length > 0" class="page">
      {{currentSlide}}/{{dataList.length}}
    </div>
  </div>
</template>
<script>
import Siema from '@/components/Siema';
export default {
  name: 'CameraImageCarousel',
  props: {
    id: {
      type: String,
      default: 'siema'
    },
    dataList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      siema: null
    };
  },
  watch: {
    dataList() {
      this.init();
    }
  },
  async created() {
    try {
      await this.$nextTick();
      this.init();
    } catch (err) {
      console.log(err);
    }
  },
  computed: {
    imgStyle() {
      return (data) => {
        return `background-image: url('${data.img}');`;
      };
    },
    currentSlide() {
      return this.siema && this.siema.currentSlide ? (this.siema.currentSlide + 1) : 1;
    },
    prevBtnActive() {
      return this.siema && this.siema.currentSlide !== 0
    },
    nextBtnActive() {
      return this.siema && this.siema.currentSlide !== (this.dataList.length - 1)
    }
  },
  methods: {
    async init() {
      try {
        await this.$nextTick();
        let siema = document.querySelector(`#${this.id}`);
        this.siema = new Siema({
          selector: siema,
          draggable: false,
          perPage: 1
        });
      } catch (err) {
        console.log(err);
      }
    },
    prevHandler() {
      if (this.siema) {
        if (this.siema.currentSlide === 0) {
          return false;
          // this.siema.goTo(this.dataList.length - 1);
        } else {
          this.siema.prev();
        }
      }
    },
    nextHandler() {
      if (this.siema) {
        if (this.siema.currentSlide === (this.dataList.length - 1)) {
          return false;
          // this.siema.goTo(0);
        } else {
          this.siema.next();
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.certificate-container {
  position: relative;
  width: 100%;
  height: 100%;
  .certificate-content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    .siema {
      width: 100%;
      height: 2.2rem;
      .siema-item {
        width: 100%;
        height: 2.2rem;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: center center;
      }
    }
  }
  .prev-btn {
    position: absolute;
    top: 50%;
    left: 0.04rem;
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
    right: 0.04rem;
    transform: translateY(-50%);
    cursor: pointer;
    .svg-icon {
      width: 0.24rem;
      height: 0.24rem;
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

