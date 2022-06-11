<template>
  <div class="my-map">
    <div id="farm-map"></div>
  </div>
</template>
<script>
/* eslint-disable */
import Vue from "vue/dist/vue.esm.js";
import _ from "lodash";
export default {
  name: "FarmMap",
  props: {
    getMapCenter: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      map: null,
      DistrictCluster: null,
      PointSimplifier: null,
      districtCluster: null,
      pointSimplifier: null,
      myInfoWindow: null
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
          zoom: 4,
          zooms: [4, 21]
        });

        const {
          DistrictCluster,
          PointSimplifier
        } = await this.loadUiComponents();
        this.DistrictCluster = DistrictCluster;
        this.PointSimplifier = PointSimplifier;
        this.districtCluster = this.initDistrictCluster();
        this.pointSimplifier = this.initPointSimplifier();
        this.myInfoWindow = this.initMyInfoWindow();

        // 绑定事件
        this.map.on("zoomend", this.mapZoomendHandler.bind(this));
        this.map.on("moveend", this.mapMoveendHandler.bind(this));
        this.districtCluster.on(
          "clusterMarkerClick",
          this.clusterMarkerClickHandler
        );

        let res = await this.$service.getFarmList();
        if (res && res.code === 0) {
          let data = res.data.list.map(item => {
            return {
              position: [parseFloat(item.longitude), parseFloat(item.latitude)],
              farm: item
            };
          });
          this.districtCluster.setData(data);
        }
        this.map.setCity("吉林省");
      } catch (e) {
        console.log(e);
      }
    },
    loadUiComponents() {
      return new Promise(resolve => {
        window.AMapUI.load(
          ["ui/geo/DistrictCluster", "ui/misc/PointSimplifier"],
          (DistrictCluster, PointSimplifier) => {
            resolve({
              DistrictCluster,
              PointSimplifier
            });
          }
        );
      });
    },
    initDistrictCluster() {
      return new this.DistrictCluster({
        map: this.map, // 所属的地图实例
        zIndex: 11,
        getPosition: item => {
          if (!item) {
            return null;
          }
          return item.position;
        },
        renderOptions: {
          // 区划面的基本样式。该参数优先级最低。
          featureStyle: {
            // 填充色，比如 red, rgb(255,0,0), rgba(0,0,0,1)等
            fillStyle: "rgba(15, 43, 183, 0.5)",
            // 描边宽度
            lineWidth: 1,
            // 描边颜色
            strokeStyle: "#1C73D3",
            // 鼠标Hover时的样式, 可以为null
            hoverOptions: null
          },
          // 按区划级别（如下4类）定义的区划面样式，优先级高于 featureStyle
          featureStyleByLevel: {
            // 各级别下参数同featureStyle
            country: {},
            province: {},
            city: {},
            district: {}
          },
          // 直接指定某个区划的样式，优先级最高
          // @param  Object feature 区划的Feature信息
          // @param  {Array} dataItems 区划内的点的信息
          // @return {Object，见featureStyle} 返回该区划的样式
          getFeatureStyle: (feature, dataItems) => {
            if (dataItems.length > 0) {
              return {
                fillStyle: "#10559B"
              };
            } else {
              return {
                fillStyle: "#031D42"
              };
            }

            return {
              fillStyle: "#031D42"
            };
          },
          featureEventSupport: true,
          clusterMarkerEventSupport: true,
          clusterMarkerEventNames: ["click"],
          // 显示在所辖数据点的平均位置
          getClusterMarkerPosition: this.DistrictCluster
            .ClusterMarkerPositionStrategy.AVERAGE_POINTS_POSITION,
          getClusterMarker: (feature, dataItems, recycledMarker) => {
            // label内容
            var content = `<div class="device-custom-marker">
                              <div class="mark-text-wrapper">
                                  <div class="mark-text">${
                                    dataItems.length
                                  }</div>
                              </div>
                              <div class="mark-icon"></div>
                          </div>`;
            var label = {
              offset: new window.AMap.Pixel(16, -16), // 修改label相对于marker的位置
              // ----------要改等级---------
              // content: this.map.getZoom() > 13 ? content : null
              content: content
            };
            if (dataItems.length > 0) {
              // 存在可回收利用的marker
              if (recycledMarker) {
                // 直接更新内容返回
                recycledMarker.setLabel(label);
                return recycledMarker;
              }
              // 返回一个新的Marker
              return new window.AMap.Marker({
                // ----------要改等级---------
                // label: map.getZoom() > 13 ? label : null,
                label: label
              });
            }
          }
        }
      });
    },
    initPointSimplifier() {
      return new this.PointSimplifier({
        map: this.map, //所属的地图实例
        zIndex: 110,
        autoSetFitView: false, //禁止自动更新地图视野
        getPosition: item => {
          return item.position;
        },
        getHoverTitle: data => {
          this.addPointMarker(data);
        },
        renderOptions: {
          //点的样式
          pointStyle: {
            width: 15,
            height: 15,
            fillStyle: "rgba(0,221,76,1)"
          },
          pointHoverStyle: {
            width: 20,
            height: 20,
            fillStyle: "rgba(0,221,76,1)"
          },
          //鼠标hover时的title信息
          hoverTitleStyle: {
            position: "top"
          }
        }
      });
    },
    initMyInfoWindow() {
      return new window.AMap.InfoWindow({
        isCustom: true, //使用自定义窗体
        closeWhenClickMap: true, // 点击地图关闭信息窗口
        autoMove: true,
        content: "",
        anchor: "top-right"
      });
    },
    //  一些地图的事件
    async clusterMarkerClickHandler(e, record) {
      try {
        const zoom = this.map.getZoom();
        if (zoom < 8) {
          // 如果层级太小直接返回
          return false;
        }

        const result = await this.getClusterRecordByAdcode(record.adcode);
        // currentAdcode已经更新，有新的点击
        if (result.adcode !== record.adcode) {
          return false;
        }
        // 设置数据
        this.pointSimplifier.setData(result.dataItems);
      } catch (err) {
        console.log(err);
      }
    },
    getClusterRecordByAdcode(adcode) {
      return new Promise((resolve, reject) => {
        //获取该节点的聚合信息
        this.districtCluster.getClusterRecord(adcode, (error, result) => {
          if (error) {
            reject(new Error("获取节点聚合信息失败"));
          } else {
            resolve(result);
          }
        });
      });
    },
    // 地图层级缩放时候的事件
    async mapZoomendHandler() {
      try {
        const zoom = this.map.getZoom();
        if (zoom < 8) {
          // 显示隐藏的时候可以使用如下方法 this.pointSimplifier.hide(); this.pointSimplifier.show();
          this.pointSimplifier.setData([]);
        }
        let mapCenter = await this.getCity();
        this.getMapCenter({ mapCenter, zoom });
      } catch (err) {
        console.log(err);
      }
    },
    async mapMoveendHandler() {
      try {
        const zoom = this.map.getZoom();
        const mapCenter = await this.getCity();
        this.getMapCenter({ mapCenter, zoom });
      } catch (err) {
        console.log(err);
      }
    },
    addPointMarker(data) {
      let { position } = data;
      this.myInfoWindow.setContent(this.getPointSimplifierContent(data));
      this.myInfoWindow.open(this.map, position);
    },
    getPointSimplifierContent(data) {
      let {
        id,
        name,
        area,
        contactName,
        contactTel,
        contactAddr,
        farmIndexUrl
      } = data.dataItem.farm;
      let fixedArea = _.isNumber(area) ? area.toFixed(2) : 0;
      let farmBgStyle = `background-image: url(${farmIndexUrl});`;
      let template = `<div class="mark-info-window-container point-simplifier border-icon5">
                        <div class="farm-info-wrapper">
                          <div class="title">${name}</div>
                          <ul class="mark-info-list">
                              <li class="mark-info-item">
                                <div class="label">面积：</div>
                                <div class="value">${fixedArea}公顷</div>
                              </li>
                              <li class="mark-info-item">
                                <div class="label">联系人：</div>
                                <div class="value">${contactName}</div>
                              </li>
                              <li class="mark-info-item">
                                <div class="label">电话：</div>
                                <div class="value">${contactTel}</div>
                              </li>
                              <li class="mark-info-item">
                                <div class="label">地址：</div>
                                <div class="value">${contactAddr}</div>
                              </li>
                          </ul>
                        </div>
                        <div style="${farmBgStyle}" class="farm-image"></div>
                        <div class="enter-btn" v-on:click="farmDetail()">进入农场</div>
                    </div>`;
      let MyComponent = Vue.extend({
        template,
        methods: {
          farmDetail: () => {
            this.gotoFarmDetail(id);
          }
        }
      });
      let component = new MyComponent().$mount();
      return component.$el;
    },
    gotoFarmDetail(id) {
      this.$router.push({ name: "FarmStockSurvey", params: { id } });
    },
    // 获取地图当前的行政区
    getCity() {
      return new Promise(resolve => {
        this.map.getCity(info => {
          resolve(info);
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
  #farm-map {
    width: 100%;
    height: 100%;
  }
}
</style>
<style lang="scss">
#farm-map {
  .amap-marker {
    .amap-icon {
      display: none;
    }
    .amap-marker-label {
      padding: 0;
      border: none;
      background-color: transparent;
      .device-custom-marker {
        cursor: pointer;
        text-align: center;
        .mark-text-wrapper {
          padding: 2px;
          border: 2px solid transparent;
          box-shadow: 0px 0px 6px transparent;
          border-radius: 20px;
          .mark-text {
            height: 16px;
            line-height: 16px;
            padding: 0 10px;
            color: #0f2bb7;
            background: rgba(24, 251, 252, 1);
            box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.28);
            border-radius: 16px;
          }
        }
        .mark-icon {
          display: inline-block;
          width: 16px;
          height: 42px;
          background-image: url("../assets/image/farm-mark.png");
          background-repeat: no-repeat;
          background-position: top center;
          background-size: contain;
          transform: scale(0.8);
        }
      }
      &:hover {
        .mark-text-wrapper {
          border: 2px solid rgba(255, 255, 255, 0.8);
          box-shadow: 0px 0px 6px rgba(24, 251, 252, 1);
          .mark-text {
            color: #0f2bb7;
            background-color: #fff;
          }
        }
        .mark-icon {
          background-image: url("../assets/image/farm-mark-hover.png");
        }
      }
    }
  }
  .mark-info-window-container {
    position: relative;
    width: 330px;
    height: 300px;
    padding: 4px;
    background-color: rgba(30, 91, 135, 0.8);
    .farm-info-wrapper {
      height: 130px;
      padding: 10px 20px;
      .title {
        color: #f0f0f0;
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 6px;
      }
      .mark-info-list {
        .mark-info-item {
          display: flex;
          align-items: flex-start;
          font-size: 12px;
          line-height: 16px;
          color: #dcdcdc;
          .label {
            width: 0.5rem;
            white-space: nowrap;
            text-align: right;
          }
          .value {
            flex: 1;
          }
        }
      }
    }
    .farm-image {
      width: 100%;
      height: 162px;
      background-color: transparent;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
    }
    .enter-btn {
      position: absolute;
      left: 50%;
      bottom: 20px;
      transform: translateX(-50%);
      background-color: #38a1da;
      width: 160px;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      text-align: center;
      color: #f0f0f0;
      cursor: pointer;
    }
  }
}
</style>
