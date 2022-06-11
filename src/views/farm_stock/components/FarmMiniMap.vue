<template>
  <div class="my-map">
    <div id="farm-mini-map"></div>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  name: "FarmMiniMap",
  props: {
      lnglat: {
        type: Array,
        default: () => []
      },
  },
  data() {
    return {
      map: null
    };
  },
  async mounted() {
    try {
      await this.mapInit();
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    async mapInit() {
      try {
        this.map = new window.AMap.Map("farm-map", {
          // 设置地图的显示样式
          mapStyle: "amap://styles/93f622ecbb8e8a4ed4f6b40967ef3857",
          zoom: 7,
          zooms: [7, 21]
        });
        let marker = new window.AMap.Marker({
            icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
            position: new AMap.LngLat(116.39, 39.9)
        });
        this.map.add(marker);
        if (this.lnglat.length === 2) {
          this.map.setCenter(this.lnglat);
          marker.setPosition(this.lnglat);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.my-map {
  width: 100%;
  height: 100%;
  #farm-map {
    width: 100%;
    height: 100%;
  }
}
</style>