<template>
  <video id="video-player" ref="videoPlayer" class="video-js"></video>
</template>
<script>
import videojs from "video.js";
import "video.js/dist/alt/video-js-cdn.min.css";
export default {
  name: "VideoPlayer",
  props: {
    videoType: {
      type: String,
      default: 'application/x-mpegURL'
    },
    playUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      fullScreen: false,
      player: null,
      visible: true
    };
  },
  watch: {
    playUrl() {
      this.player.src({
        src: this.playUrl,
        type: this.videoType
      });
    }
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
  methods: {
    async init() {
      try {
        await this.$nextTick();
        let options = {
          autoplay: true,
          controls: true,
          muted: true,
          loop: true,
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
        this.player = videojs(this.$refs.videoPlayer, options, () => {
          console.log("准备播放", this);
        });
        this.player.on('fullscreenchange', this.fullScreenChangeHandler);
      } catch (err) {
        console.log(err);
      }
    },
    fullScreenChangeHandler() {}
  }
};
</script>
<style lang="scss" scoped>
</style>
