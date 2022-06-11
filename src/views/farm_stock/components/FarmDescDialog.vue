<template>
  <transition name="visible">
    <div v-if="visible" class="farm-desc-dialog">
      <div class="close-btn-container border-icon33">
        <div @click="hide" class="close-btn">
          <svg-icon icon-class="close_btn"></svg-icon>
        </div>
      </div>
      <div class="title">{{farm.name}}</div>
      <div class="info-content">
        <div class="basic-info-wrapper">
          <div class="title-one small">
            <h5>
              <svg-icon class="title-icon" icon-class="basic_info_icon"></svg-icon>基本信息
            </h5>
          </div>
          <ul class="info-list">
            <li class="info-item">
              <div class="label">面积：</div>
              <div class="value">{{farm.area | justToFixed2}}公顷</div>
            </li>
            <li class="info-item">
              <div class="label">联系人：</div>
              <div class="value">{{farm.contactName}}</div>
            </li>
            <li class="info-item">
              <div class="label">电话：</div>
              <div class="value">{{farm.contactTel}}</div>
            </li>
            <li class="info-item">
              <div class="label">地址：</div>
              <div class="value">{{farm.address}}</div>
            </li>
          </ul>
          <ul class="farm-tag-list">
            <li v-for="(mark, index) in farmMarks" :key="index" class="farm-tag-item">{{mark.name}}</li>
          </ul>
          <div class="desc border-icon10">
            <div class="desc-inner">
              {{farm.description}}
            </div>
          </div>
        </div>
        <div class="map-container">
          <div class="title-one small">
            <h5>
              <svg-icon class="title-icon" icon-class="farm_position_icon"></svg-icon>企业位置
            </h5>
          </div>
          <div id="mini-map"></div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import _ from 'lodash';
export default {
  name: "FarmDescDialog",
  props: {
    farm: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      visible: false,
      map: null
    };
  },
  computed: {
    farmMarks() {
      return _.take(_.get(this.farm, 'farmMarks'), 3) || [];
    },
    lnglat() {
      return this.farm.longitude && this.farm.latitude
        ? [this.farm.longitude, this.farm.latitude]
        : [];
    }
  },
  methods: {
    async show() {
      try {
        this.visible = true;
        await this.$nextTick();
        this.mapInit();
      } catch (err) {
        console.log(err);
      }
    },
    hide() {
      this.visible = false;
    },
    async mapInit() {
      try {
        this.map = new window.AMap.Map("mini-map", {
          // 设置地图的显示样式
          // mapStyle: "amap://styles/93f622ecbb8e8a4ed4f6b40967ef3857",
          zoom: 15,
          zooms: [7, 21]
        });
        let marker = new window.AMap.Marker({
          icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
          position: new window.AMap.LngLat(116.39, 39.9)
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
.farm-desc-dialog {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  right: 0;
  width: 20%;
  height: 100%;
  background: rgba(11, 20, 43, 0.95);
  border: 2px solid rgba(31, 64, 113, 1);
  z-index: 7;
  .title {
    width: 100%;
    height: 0.4rem;
    line-height: 0.4rem;
    background: linear-gradient(
      270deg,
      rgba(16, 37, 75, 0.1) 0%,
      rgba(21, 46, 89, 0.36) 16%,
      rgba(32, 68, 122, 1) 53%,
      rgba(36, 75, 129, 0.24) 93%,
      rgba(37, 76, 130, 0.1) 100%
    );
    font-size: 0.16rem;
    color: #f0f0f0;
    font-weight: 500;
    text-align: center;
  }
  .info-content {
    display: flex;
    flex-direction: column;
    padding: 0.1rem 0.2rem;
    height: calc(100% - 0.4rem);
    overflow: hidden;
    .basic-info-wrapper {
      height: 60%;
      overflow: hidden;
      .info-list {
        .info-item {
          display: flex;
          align-items: flex-start;
          font-size: 0.12rem;
          line-height: 0.20rem;
          color: #9fa8b8;
          .label {
            white-space: nowrap;
            text-align: left;
          }
          .value {
            flex: 1;
          }
        }
      }
      .farm-tag-list {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        margin-top: 0.1rem;
        margin-bottom: 0.1rem;
        .farm-tag-item {
          font-size: 0.12rem;
          color: #9fa8b8;
          height: 0.26rem;
          line-height: 0.26rem;
          text-align: center;
          padding: 0 0.1rem;
          background: rgba(16, 37, 75, 0.8);
          border-radius: 0.04rem;
          border: 1px solid rgba(65, 127, 200, 1);
          margin-bottom: 0.06rem;
          margin-right: 0.1rem;
        }
        .farm-tag-item:last-child {
          margin-right: 0;
        }
      }
      .desc {
        width: 100%;
        height: 60%;
        padding: 0.2rem;
        .desc-inner {
          width: 100%;
          height: calc(100% - 1px);
          text-indent: 2em;
          font-size: 0.12rem;
          line-height: 0.18rem;
          color: #9fa8b8;
          overflow-y: scroll;
        }
      }
    }
    .map-container {
      width: 100%;
      height: 40%;
      #mini-map {
        height: calc(100% - 0.56rem);
        margin-top: 0.1rem;
      }
    }
  }
  .title-one {
    &.small {
      height: 0.36rem;
    }
  }
  .close-btn-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0.38rem;
    left: -0.32rem;
    width: 0.32rem;
    height: 0.84rem;
    .close-btn {
      cursor: pointer;
      .svg-icon {
        width: 0.16rem;
        height: 0.16rem;
      }
    }
  }
}
// 动画
.visible-enter-active {
  transition: all 0.3s ease;
}
.visible-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.visible-enter,
.visible-leave-to {
  transform: translateX(280px);
  opacity: 0;
}
</style>