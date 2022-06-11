
<template>
  <div class="trace-goods-container container">
    <farm-aside-nav></farm-aside-nav>
    <div class="content">
      <div class="trace-content-wrapper">
        <div class="title-wrapper">
          <v-select
            v-if="goodsList.length > 0"
            class="my-vue-select"
            label="goodsName"
            :searchable="false"
            v-model="selectedGoods"
            @input="goodsSelectHandler"
            :options="goodsList">
            <div slot="no-options">无数据</div>
          </v-select>
          <div class="farm-title">{{farm.name}}</div>
        </div>
        <div v-if="goodsList.length > 0" class="inner-content">
          <div class="goods-info-container border-icon18">
            <div class="title-one white">
              <h5>
                <svg-icon class="title-icon" icon-class="title_icon"></svg-icon>商品信息
              </h5>
            </div>
            <div class="info-content">
              <div class="left-field">
                <div class="img" :style="goodsThumbnailStyle"></div>
                <div class="text-info">
                  <div class="text-info-item">
                    <div class="label">商品名称</div>
                    <div class="value">{{selectedGoods.goodsName}}</div>
                  </div>
                  <div class="text-info-item">
                    <div class="label">商品店铺</div>
                    <div class="value">{{selectedGoods.sellerName}}</div>
                  </div>
                  <div class="text-info-item">
                    <div class="label">商品分类</div>
                    <div class="value">{{selectedGoods.categoryName}}</div>
                  </div>
                  <div class="text-info-item">
                    <div class="label">商品价格</div>
                    <div class="value"><span class="price my-font">{{selectedGoods.price}}</span><span class="unit">元</span></div>
                  </div>
                </div>
              </div>
              <div class="right-field">
                <div class="title">微信扫码<br />马上抢购</div>
                <img src="../../assets/image/wechat_icon.png" alt="微信小程序二维码">
              </div>
            </div>
          </div>
          <div class="trace-record-container border-icon58">
            <div class="tab-list-container">
              <ul class="tab-list">
                <li @click="changeTabHandler(0)" :class="['tab-item', activeTabIndex === 0 && 'active']">可视溯源</li>
                <li @click="changeTabHandler(1)" :class="['tab-item', activeTabIndex === 1 && 'active']">农事记录</li>
                <li @click="changeTabHandler(2)" :class="['tab-item', activeTabIndex === 2 && 'active']">精选集锦</li>
              </ul>
            </div>
            <div class="tab-content-container">
              <div v-if="activeTabIndex === 0" class="tab-content">
                <live-trace :goods="selectedGoods"></live-trace>
              </div>
              <div v-if="activeTabIndex === 1" class="tab-content">
                <farming-record :goods="selectedGoods"></farming-record>
              </div>
              <div v-if="activeTabIndex === 2" class="tab-content">
                <trace-info :goodsId="selectedGoods.goodsId" ref="traceInfo"></trace-info>
              </div>
            </div>
          </div>
        </div>
        <no-data v-else></no-data>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex';
import FarmAsideNav from "./components/FarmAsideNav";
import TraceInfo from './trace/TraceInfo';
import FarmingRecord from './trace/FarmingRecord';
import LiveTrace from './trace/LiveTrace';
export default {
  name: 'Trace',
  components: {FarmAsideNav, TraceInfo, FarmingRecord, LiveTrace},
  data() {
    return {
      selectedGoods: {}, // 选中的商品
      goodsList: [], // 农场下面的商品列表
      activeTabIndex: 0 // 选项卡的选中索引值
    };
  },
  async created() {
    try {
      let { id } = this.$route.params;
      await this.getFarmById(id);
      this.getGoodsListByFarmId();
    } catch (err) {
      console.log(err);
    }
  },
  computed: {
    ...mapGetters({
      farm: "farm/currentFarm"
    }),
    goodsThumbnailStyle() {
      return `background-image: url(${this.selectedGoods.thumbnail});`
    }
  },
  methods: {
    ...mapActions({
      getFarmById: "farm/getFarmById"
    }),
    getGoodsListByFarmId() {
      let {id} = this.farm;
      this.$service.getGoodsListByFarmId({farmId: id, pageSize: 100000, disabled: 1, marketEnable: 1})
        .then((res) => {
          if (res && res.code === 0) {
            let goodsList = this.$_.get(res, 'data.list') || [];
            if (goodsList.length > 0) {
              this.goodsList = goodsList;
              this.selectedGoods = this.$_.get(this.goodsList, `0`);
            }
          }
        }).catch((err) => {
          console.log(err);
        });
    },
    goodsSelectHandler() {},
    changeTabHandler(index) {
      this.activeTabIndex = index;
    }
  }
}
</script>
<style lang="scss">
.trace-goods-container {
  .trace-content-wrapper {
    width: 100%;
    height: 100%;
  }
  .title-wrapper {
    display: flex;
    align-items: center;
    .my-vue-select {
      &.v-select {
        width: auto;
        min-width: 1.2rem;
        height: 0.30rem;
        .vs__dropdown-toggle {
          height: 0.30rem;
          background-size: 100% 100%;
          background-repeat: no-repeat;
          background-position: center center;
          border-radius: 2px;
          .vs__selected {
            color: #F0F0F0;
            font-size: 0.12rem;
            height: 0.30rem;
            line-height: 0.30rem;
            margin: 0;
            padding: 0;
            padding-left: 0.06rem;
            width: auto;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          input {
            display: none;
            margin: 0;
            padding: 0;
            padding-left: 0.06rem;
            color: #F0F0F0;
            font-size: 0.12rem;
            cursor: pointer;
          }
          .vs__actions {
            .vs__clear {
              display: none;
              svg {
                fill: #F0F0F0;
                font-weight: lighter;
              }
            }
            .vs__open-indicator {
              fill: #F0F0F0;
              font-weight: lighter;
            }
            .select-arrow {
              display: block;
              width: 0.1rem;
              height: 0.1rem;
              background-size: cover;
              background-repeat: no-repeat;
              background-position: center center;
            }
          }
        }
        ul {
          width: auto;
          max-height: 1.4rem;
          top: calc(100%  + 0.04rem);
          background-color: #182F68;
          overflow-y: scroll;
          li {
            width: auto;
            min-width: auto;
            color: #f0f0f0;
            font-size: 0.12rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
  .inner-content {
    width: 100%;
    height: calc(100% - 0.4rem);
    .goods-info-container {
      width: 100%;
      height: calc(30.9% - 0.2rem);
      margin-top: 0.2rem;
      padding: 0.2rem;
      .info-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: calc(100% - 0.3rem);
        .left-field {
          display: flex;
          align-items: center;
          .img {
            width: 1.7rem;
            height: 1.7rem;
            margin-right: 0.5rem;
            background-size: contain;
            background-position: center center;
            background-repeat: no-repeat;
          }
          .text-info {
            .text-info-item {
              display: flex;
              align-items: center;
              font-size: 0.16rem;
              .label {
                width: 1.2rem;
                color: #9FA8B8;
                text-align: right;
                margin-right: 0.2rem;
              }
              .value {
                color: #A3D0FD;
                .price {
                  color: #00DCFF;
                  font-size: 0.26rem;
                  margin-right: 0.04rem;
                }
                .unit {
                  font-size: 0.12rem;
                }
              }
            }
            .text-info-item + .text-info-item {
              margin-top: 0.14rem;
            }
          }
        }
        .right-field {
          display: flex;
          .title {
            color: #A3D0FD;
            font-size: 0.16rem;
            line-height: 0.3rem;
            font-weight: 500;
            margin-right: 0.2rem;
          }
          img {
            width: 1.7rem;
            height: 1.7rem;
          }
        }
      }
    }
    .trace-record-container {
      width: 100%;
      height: calc(69.1% - 0.2rem);
      margin-top: 0.2rem;
      padding: 0.2rem;
      .tab-list-container {
        .tab-list {
          display: flex;
          align-items: center;
          .tab-item {
            width: 0.86rem;
            height: 0.4rem;
            line-height: 0.4rem;
            background-color: #182F68;
            border: 1px solid #2E4E9E;
            border-radius: 0.05rem;
            color: #fff;
            font-size: 0.14rem;
            text-align: center;
            cursor: pointer;
            &.active {
              background-color: #1A8DD2;
              border-color: #1A8DD2;
            }
          }
          .tab-item + .tab-item {
            margin-left: 0.2rem;
          }
        }
      }
      .tab-content-container {
        width: 100%;
        height: calc(100% - 0.4rem);
        padding: 0.1rem 0;
        overflow: hidden;
        .tab-content {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
