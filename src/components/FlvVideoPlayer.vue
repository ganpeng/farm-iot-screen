<template>
  <video id="flv-video-player" ref="videoPlayer" class="video-js" muted="false" preload controls autoplay></video>
</template>
<script>
import flvjs from 'flv.js';
export default {
  name: "FlvVideoPlayer",
  props: {
    playUrl: {
      type: String,
      default: 'http://app.jsjcloud.com/camera/get_dragonflyeyes_url/jsj/jstv220521011331/ps.flv'
    }
  },
  data() {
    return {};
  },
  watch: {
    playUrl() {
      this.player.src({
        src: this.playUrl
      });
    }
  },
  async mounted() {
    try {
      await this.$nextTick();
      this.init();
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    async init() {
      try {
        if (flvjs.isSupported()) {
            let flvPlayerDom = document.getElementById('flv-video-player');
            let flvPlayer = flvjs.createPlayer({
                type: 'flv',
                url: this.playUrl
            });
            flvPlayer.attachMediaElement(flvPlayerDom);
            flvPlayer.load();
            flvPlayer.play();
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.video-js {
  width: 100%;
  height: 100%;
}
</style>
