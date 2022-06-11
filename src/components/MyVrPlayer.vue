<template>
    <div @click="rotate" class="vr-video-container">
      <video ref="vrPlayer" class="video-js"></video>
      <div v-if="first_in" class="tip_image">
        <div class="img_container">
          <div class="tip_row tip_left"></div>
          <div class="tip_mouse"></div>
          <div class="tip_row tip_right"></div>
        </div>
        <span>左右拖动 更多精彩</span>
      </div>
    </div>
</template>
<script>
import videojs from "video.js";
import "video.js/dist/alt/video-js-cdn.min.css";
require('../assets/js/videojs-vr.min');
export default {
  name: "MyVrPlayer",
  props: {
    camera: {
      type: Object,
      default: () => {
        return {
          deviceName: '全景直播',
          deviceStatus: 'ONLINE'
        };
      }
    },
    videoType: {
      type: String,
      default: 'application/x-mpegURL'
    },
    playUrl: {
      type: String,
      default: 'https://n-rtmppull.tianchimedia.net/live/Insta360.m3u8'
    }
  },
  data() {
    return {
      first_in: true,
      player: null
    };
  },
  watch: {
    playUrl: function() {
      this.player.src({
        src: this.playUrl,
        type: this.videoType
      });
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      try {
        await this.$nextTick();
        let options = {
          autoplay: true,
          controls: true,
          loop: true,
          muted: true,
          liveui: this.videoType === 'application/x-mpegURL' ? true : false,
          language: 'zh',
          notSupportedMessage: '加载中，请稍后...',
          fluid: true,
          sources: [
            {
              src: this.playUrl,
              type: this.videoType
            }
          ]
        };
        this.player = videojs(this.$refs.vrPlayer, options, () => {
          this.player.vr({projection: '360'});
        });
      } catch (err) {
        console.log(err);
      }
    },
    rotate() {
      this.first_in = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.vr-video-container {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  .info-container {
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 0.76rem;
    padding: 0 0.24rem;
    box-sizing: border-box;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 100%);
    z-index: 200;
    .name {
      font-size: 0.18rem;
      font-weight: bold;
      color: #FFF;
      text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.16);
      margin-right: 0.2rem;
    }
    .status {
      min-width: 0.5rem;
      height: 0.24rem;
      padding: 0 0.1rem;
      line-height: 0.24rem;
      background-color: #3ECF4B;
      border-radius: 0.04rem;
      text-align: center;
      color: #fff;
      font-size: 0.14rem;
      &.disabled {
        background-color: #F42424;
      }
    }
  }
  .tip_image {
    width: 2rem;
    height: 2rem;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 0.1rem;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #FFF;
    .img_container {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      height: 0.66rem;
      margin-bottom: 0.25rem;
      .tip_mouse {
        width: 0.44rem;
        height: 100%;
        margin: 0 0.1rem;
        background-image: url('../assets/image/tip_mouse@2x.png');
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
      .tip_row {
        width: 0.15rem;
        height: 0.25rem;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        &.tip_left {
          background-image: url('../assets/image/tip_left_11@2x.png');
        }
        &.tip_right {
          background-image: url('../assets/image/tip_right_5@2x.png');
        }
      }
    }
  }
}
</style>
<style lang="scss">
.vjs-modal-dialog-content {
  display: none!important;
}
.vjs-error .vjs-error-display:before {
  display: none!important;
}
.video-js .vjs-big-play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>