<template>
  <div class="image-preview">
    <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="pswp__bg"></div>
      <div class="pswp__scroll-wrap">
        <div class="pswp__container">
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
        </div>
        <div class="pswp__ui pswp__ui--hidden">
          <div class="pswp__top-bar">
            <div class="pswp__counter"></div>
            <button
              class="pswp__button pswp__button--close"
              title="Close (Esc)"
            ></button>
            <button
              class="pswp__button pswp__button--fs"
              title="Toggle fullscreen"
            ></button>
            <button
              class="pswp__button pswp__button--zoom"
              title="Zoom in/out"
            ></button>
            <div class="pswp__preloader">
              <div class="pswp__preloader__icn">
                <div class="pswp__preloader__cut">
                  <div class="pswp__preloader__donut"></div>
                </div>
              </div>
            </div>
          </div>
          <button
            class="pswp__button pswp__button--arrow--left"
            title="Previous (arrow left)"
          ></button>
          <button
            class="pswp__button pswp__button--arrow--right"
            title="Next (arrow right)"
          ></button>
          <div class="pswp__caption">
            <div class="pswp__caption__center"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PhotoSwipe from "photoswipe/dist/photoswipe";
import PhotoSwipeUIDefault from "photoswipe/dist/photoswipe-ui-default";
import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";
export default {
  name: "ImagePreview",
  methods: {
    async init(imageList, currentIndex) {
      try {
        if (process.browser) {
          await this.$nextTick();
          const pswpElement = document.querySelectorAll(".pswp")[0];
          let imagePromiseList = imageList.map((src) => this.loadImage(src));
          const items = await Promise.all(imagePromiseList);
          const options = {
            index: currentIndex // start at first slide
          };
          const gallery = new PhotoSwipe(
            pswpElement,
            PhotoSwipeUIDefault,
            items,
            options
          );
          gallery.init();
        }
      } catch (err) {
        console.log(err);
      }
    },
    loadImage(src) {
      return new Promise((resolve, reject) => {
        let img = new Image();
        img.src = src;
        img.onload = function () {
          resolve({
            src,
            w: img.width,
            h: img.height,
          });
        }
        img.onerror = function (err) {
          reject(err);
        };
      });
    },
  },
};
</script>
<style lang="scss" scoped>
// @import "photoswipe/dist/photoswipe.css";
// @import "photoswipe/dist/default-skin/default-skin.css";
</style>