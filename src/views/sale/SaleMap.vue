<template>
  <div class="my-map">
    <div id="sale-map"></div>
  </div>
</template>
<script>
/* eslint-disable */
import Vue from "vue/dist/vue.esm.js";
import _ from "lodash";
export default {
  name: "SaleMap",
  props: {
    saleMapList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      map: null,
      markerList: []
    };
  },
  watch: {
    saleMapList: function() {
      this.renderMarkerList();
    }
  },
  async created() {
    try {
      await this.$nextTick();
      await this.mapInit();
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    async mapInit() {
      try {
        let disCountry = new AMap.DistrictLayer.Country({
          zIndex: 10,
          SOC: 'CHN',
          styles:{
            'nation-stroke': '#4693FE',
            'coastline-stroke': '',
            // 填充
            'fill': ''
          }
        });

        this.map = new window.AMap.Map("sale-map", {
          // 设置地图的显示样式
          mapStyle: "amap://styles/93f622ecbb8e8a4ed4f6b40967ef3857",
          zoom: 4,
          layers:[
            new AMap.TileLayer(),
            disCountry
          ],
          zoomEnable:false,
          dragEnable: false,
          scrollWheel: false, // 禁止鼠标滚动缩放
          center: ["104.39", "36.52"]
        });

        this.renderMarkerList(); 
      } catch (e) {
        console.log(e);
      }
    },
    removeMarkers() {
      this.map.remove(this.markerList);
    },
    addMarkers() {
      this.markerList.forEach((marker) => {
        this.map.add(marker);
      });
    },
    renderMarkerList() {
      if (this.markerList.length > 0) {
        this.removeMarkers();
      }
      let markerList = this.createMarkerList();
      this.markerList = markerList;
      this.addMarkers();
    },
    createMarkerList() {
      return this.saleMapList.map((item) => {
        return new AMap.Marker({
          position: item.lnglat,
          content: `<div class="marker-container type-three">
                        <div class="out-cycle">
                        </div>
                        <div class="inner-cycle">
                        </div>
                        <div class="info">${item.sn_num}</div>
                      </div>` //自定义覆盖物
        });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.my-map {
  width: 100%;
  height: 100%;
  #sale-map {
    width: 100%;
    height: 100%;
  }
}
</style>
<style lang="scss">
.marker-container {
  transform: translateX(-20px);
  .info {
    display: none;
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    border: 1px solid green;
    background-color: red;
    z-index: 100000;
  }
  &:hover {
    .info {
      // display: block;
    }
  }
}
</style>