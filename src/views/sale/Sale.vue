<template>
  <div class="sale-container">
    <div class="left-side field-content border-icon25">
      <div class="title-one title-one-header-icon white">
        <h5>
          <svg-icon class="title-icon" icon-class="title_icon"></svg-icon>销售统计
        </h5>
      </div>
      <div class="left-side-content">
        <div class="left-side-top">
          <div class="title-one big">
            <h5>
              <i class="point"></i> 农场销量排行(元)
            </h5>
          </div>
          <div class="charts-wrapper">
            <ul v-if="farmSaleTopList.length > 0" class="farm-sale-top5-list">
              <li v-for="(top, index) in farmSaleTopList" :key="index" class="farm-sale-top5-item">
                <div class="icon">
                  <svg-icon v-if="index === 0" icon-class="new_sale_top5_icon1"></svg-icon>
                  <svg-icon v-if="index === 1" icon-class="new_sale_top5_icon2"></svg-icon>
                  <svg-icon v-if="index === 2" icon-class="new_sale_top5_icon3"></svg-icon>
                  <span v-if="index !== 0 && index !== 1 && index !== 2" class="no-icon">{{index + 1}}</span>
                </div>
                <div class="farm">{{top.seller_name}}</div>
                <div class="sale-value">{{top.total}}</div>
              </li>
            </ul>
            <no-data v-else></no-data>
          </div>
        </div>
        <div class="left-side-middle">
          <div class="title-one big">
            <h5>
              <i class="point"></i> 商品销售额(元)
            </h5>
          </div>
          <div class="left-side-middle-content">
            <div class="left-side-middle-top">
              <no-data v-if="goodsCategoryAmountNoData"></no-data>
              <div v-else id="left-side-middle-top-chart"></div>
            </div>
            <div class="left-side-middle-bottom">
              <no-data v-if="getGoodsCategoryAmountCurveNoData"></no-data>
              <div v-else id="left-side-middle-bottom-chart"></div>
            </div>
          </div>
        </div>
        <div class="left-side-bottom">
          <div class="title-one big">
            <h5>
              <i class="point"></i> 热卖商品(元)
            </h5>
          </div>
          <div class="left-side-bottom-content">
            <div v-if="hotGoodstop5List.length > 0" class="hot-goods-top5-list">
              <li v-for="(goods, index) in hotGoodstop5List" :key="index" class="hot-goods-top5-item">
                <span class="hot-goods-top5-icon">
                  <svg-icon v-if="index === 0" icon-class="hot_goods_icon1"></svg-icon>
                  <svg-icon v-if="index === 1" icon-class="hot_goods_icon2"></svg-icon>
                  <svg-icon v-if="index === 2" icon-class="hot_goods_icon3"></svg-icon>
                  <svg-icon v-if="index === 3" icon-class="hot_goods_icon4"></svg-icon>
                  <svg-icon v-if="index === 4" icon-class="hot_goods_icon5"></svg-icon>
                </span>
                <div class="content-info">
                  <div class="text">
                    <div class="name text-overflow" :title="goods.name">{{goods.name}}</div>
                    <div class="value">{{goods.amount}}</div>
                  </div>
                  <div class="progress">
                    <div :style="progressInnerStyle(goods)" class="inner"></div>
                  </div>
                </div>
              </li>
            </div>
            <no-data v-else></no-data>
            <!-- <div id="left-side-bottom-chart"></div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="middle-content">
      <div class="middle-top">
        <div class="map-header">
          <div class="select-field">
            <div class="date-select">
              <div class="label">时间：</div>
              <v-select
                class="my-vue-select"
                v-model="params.cycle_type"
                :reduce="option => option.value"
                @input="cycleTypeChangeHandler"
                :options="[{label: '全部', value: 'ALL'}, {label: '当月', value: 'MONTH'}, {label: '当年', value: 'YEAR'}]">
                <div slot="no-options">无数据</div>
              </v-select>
            </div>
            <div class="pay-select">
              <div class="label">状态：</div>
              <v-select
                class="my-vue-select"
                v-model="params.order_status"
                :reduce="option => option.value"
                @input="orderStatusChangeHandler"
                :options="[{label: '已完成', value: 'COMPLETE'}, {label: '已支付', value: 'PAID_OFF'}]">
                <div slot="no-options">无数据</div>
              </v-select>
            </div>
          </div>
          <dv-decoration-3 style="width:2.5rem;height:0.3rem;" />
        </div>
        <div class="sale-user">
          <div class="left-sale">
            <div class="sale-user-item">
              <div class="label">今日已售</div>
              <div class="value">
                <div class="my-font">{{amountSoldToday}}</div>
                <div class="unit">元</div>
              </div>
            </div>
            <div class="sale-user-item">
              <div class="label">累计销售</div>
              <div class="value">
                <div class="my-font">{{allAmountSold}}</div>
                <div class="unit">元</div>
              </div>
            </div>
          </div>
          <div class="right-user">
            <div class="sale-user-item">
              <div class="label">今日注册</div>
              <div class="value">
                <div class="my-font">{{memeberTotal}}</div>
                <div class="unit">人</div>
              </div>
            </div>
            <div class="sale-user-item">
              <div class="label">累计注册</div>
              <div class="value">
                <div class="my-font">{{allMemeberTotal}}</div>
                <div class="unit">人</div>
              </div>
            </div>
          </div>
        </div>
        <div class="map-content">
          <div class="map-title">购买力热力图</div>
          <sale-map :saleMapList="saleMapList"></sale-map>
        </div>
      </div>
      <div class="middle-bottom">
        <div class="middle-bottom-left border-icon42">
          <div class="title-one big white">
            <h5>
              <svg-icon class="title-icon" icon-class="title_icon"></svg-icon>购买力top5
            </h5>
          </div>
          <div class="table">
            <div class="table-list">
              <div key="header" class="table-item header">
                <div class="item">地区</div>
                <div class="item">下单金额(元)</div>
              </div>
              <div v-for="(top, index) in topList" :key="index" :class="['table-item', (index % 2) === 0 ? 'eve' : 'odd']">
                <div class="item">{{top.region_name}}</div>
                <div class="item money">{{top.order_price}}</div>
              </div>
            </div>
            <no-data v-if="topList.length === 0" ></no-data>
          </div>
        </div>
        <div class="middle-bottom-right border-icon42">
          <div class="title-one big white">
            <h5>
              <svg-icon class="title-icon" icon-class="title_icon"></svg-icon>平台销量(元)
            </h5>
          </div>
          <div class="label-chart">
            <div class="label-list">
              <ul class="client-data-list">
                <li v-for="(client, index) in clientTypeDataList" :key="index" class="client-data-item">
                  <div class="label">{{client.name}}</div>
                  <div class="value">{{client.value}}</div>
                </li>
              </ul>
            </div>
          </div>
          <div id="client-type-total-chart"></div>
        </div>
      </div>
    </div>
    <div class="right-side field-content border-icon25">
      <div class="title-one title-one-header-icon white">
        <h5>
          <svg-icon class="title-icon" icon-class="title_icon"></svg-icon>订单统计
        </h5>
      </div>
      <div class="right-side-content">
        <div class="right-side-top">
          <div class="title-one big">
            <h5>
              <i class="point"></i> 下单量(次)
            </h5>
          </div>
          <div class="right-side-top-content">
            <no-data v-if="orderNumNoData"></no-data>
            <div v-else id="right-side-top-chart"></div>
          </div>
        </div>
        <div class="right-side-bottom">
          <div class="title-one big">
            <h5>
              <i class="point"></i> 客单价(次)
            </h5>
          </div>
          <div class="right-side-bottom-content">
            <no-data v-if="unitPriceNoData"></no-data>
            <div v-else id="right-side-bottom-chart"></div>
          </div>
        </div>
        <div class="right-side-middle">
          <div class="title-one big">
            <h5>
              <i class="point"></i> 用户统计(人)
            </h5>
          </div>
          <div class="right-side-middle-content">
            <no-data v-if="userStatisticsNoData"></no-data>
            <div v-else id="right-side-middle-chart"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import _ from "lodash";
import constants from "@/util/constants";
import SaleMap from "./SaleMap";
import label from "@/util/label";
export default {
  name: "Sale",
  components: { SaleMap },
  data() {
    return {
      // 接口参数
      params: {
        cycle_type: 'ALL', // ALL YEAR, MONTH
        order_status: 'PAID_OFF', // PAID_OFF COMPLETE
        year: this.$util.currentYear(),
        month: this.$util.currentMonth()
      },
      amountSoldToday: 0,
      memeberTotal: 0,
      allAmountSold: 0,
      allMemeberTotal: 0,
      saleMapList: [],
      date: 'year',
      leftTopChart: null,
      leftSideMiddleTopChart: null,
      leftSideMiddleBottomChart: null,
      leftSideBottomChart: null,
      rightSideTopChart: null,
      rightSideMiddleChart: null,
      rightSideBottomChart: null,
      topList: [],
      farmSaleTopList: [],
      hotGoodstop5List: [],
      goodsCategoryAmountNoData: false,
      getGoodsCategoryAmountCurveNoData: false,
      orderNumNoData: false,
      orderAmountNoData: false,
      unitPriceNoData: false,
      userStatisticsNoData: false,
      clientTypeTotalChart: null,
      clientTypeDataList: []
    };
  },
  created() {
    // 今日会员数
    this.getMemeberTotal();
    // 今日已售金额
    this.getAmountSoldToday();
    // 累计会员数
    this.getMemeberTotalAll();
    // 累计已售金额
    this.getAmountSoldAll();
    // 购买力top5
    this.getCityPurchasPower();
    // 城市购买力地图
    this.getCityPurchasPowerMap();
    // 农场销量排行
    this.getMoneyTopFive();
    // 商品分类销售额
    this.getGoodsCategoryAmount();
    // 商品分类销售额曲线
    this.getGoodsCategoryAmountCurve();
    // 热卖商品金额TOP5
    this.getHotMoneyTopFive();
    // 下单金额
    // this.getOrderAmount();
    // 下单量
    this.getOrderNum();
    // 客单价分布
    this.getUnitPrice();
    // 用户统计
    this.getUserStatistics();
    // 平台销量
    this.getClientTypeTotal();
  },
  computed: {
    progressInnerStyle() {
      return (goods) => {
        let max = _.get(this.hotGoodstop5List, '0.amount');
        let widthPercent = (_.get(goods, 'amount') / max) * 100;
        return `width: ${widthPercent}%`;
      };
    }
  },
  methods: {
    cycleTypeChangeHandler(value) {
      this.params.cycle_type = value;
      // 农场销量排行
      this.getMoneyTopFive();
      // 商品分类销售额
      this.getGoodsCategoryAmount();
      // 购买力top5
      this.getCityPurchasPower();
      // 热卖商品金额TOP5
      this.getHotMoneyTopFive();
      // 下单量
      this.getOrderNum();
      // 下单金额
      // this.getOrderAmount();
      // 客单价分布
      this.getUnitPrice();
      // 城市购买力地图
      this.getCityPurchasPowerMap();
      // 商品分类销售额曲线
      this.getGoodsCategoryAmountCurve();
      // 用户统计
      this.getUserStatistics();
      // 平台销量
      this.getClientTypeTotal();
    },
    orderStatusChangeHandler(value) {
      this.params.order_status = value;
      // 农场销量排行
      this.getMoneyTopFive();
      // 商品分类销售额
      this.getGoodsCategoryAmount();
      // 购买力top5
      this.getCityPurchasPower();
      // 热卖商品金额TOP5
      this.getHotMoneyTopFive();
      // 下单量
      this.getOrderNum();
      // 下单金额
      // this.getOrderAmount();
      // 客单价分布
      this.getUnitPrice();
      // 城市购买力地图
      this.getCityPurchasPowerMap();
      // 商品分类销售额曲线
      this.getGoodsCategoryAmountCurve();
      // 用户统计
      this.getUserStatistics();
      // 平台销量
      this.getClientTypeTotal();
    },
    dateFormatByCycleType(cycle_type, date) {
      switch (cycle_type) {
        case 'ALL':
          return this.$util.dateFormat('YYYY', new Date(parseInt(date)));
        case 'YEAR':
          return this.$util.dateFormat('mm', new Date(parseInt(date)));
        case 'MONTH':
          return this.$util.dateFormat('mm-dd', new Date(parseInt(date)));
      }
    },
    // 会员数统计
    getMemeberTotal() {
      this.$service.getMemeberTotal('TODAY')
        .then((res) => {
          if (res && res.code === 0) {
            let memeberTotal = res.data || 0;
            this.memeberTotal = memeberTotal;
          }
        }).catch((err) => {
          console.log(err);
        });
    },
    // 会员数统计
    getMemeberTotalAll() {
      this.$service.getMemeberTotal('ALL')
        .then((res) => {
          if (res && res.code === 0) {
            let allMemeberTotal = res.data || 0;
            this.allMemeberTotal = allMemeberTotal * 100;
          }
        }).catch((err) => {
          console.log(err);
        });
    },
    // 今日已售金额
    getAmountSoldToday() {
      this.$service.getAmountSoldToday('TODAY')
        .then((res) => {
          if (res && res.code === 0) {
            let amountSoldToday = res.data || 0;
            this.amountSoldToday = amountSoldToday;
          }
        }).catch((err) => {
          console.log(err);
        });
    },
    // 累计已售金额
    getAmountSoldAll() {
      this.$service.getAmountSoldToday('ALL')
        .then((res) => {
          if (res && res.code === 0) {
            let allAmountSold = res.data || 0;
            this.allAmountSold = allAmountSold * 100;
          }
        }).catch((err) => {
          console.log(err);
        });
    },
    // 购买力top5
    getCityPurchasPower() {
      this.$service.getCityPurchasPower(this.params)
        .then((res) => {
          if (res && res.code === 0) {
            let topList = res.data || [];
            this.topList = topList.map((item) => {
              if (_.isNumber(item.order_price)) {
                item.order_price = (item.order_price * 100).toFixed(2);
              } else {
                item.order_price = 0;
              }
              return item;
            });
          }
        }).catch((err) => {
          console.log(err);
        });
    },
    // 城市购买力地图
    getCityPurchasPowerMap() {
      this.$service.getCityPurchasPowerMap(this.params)
        .then((res) => {
          if (res && res.code === 0) {
            let list = res.data.map((item) => {
              let obj = constants.provinceLnglat.find((_item) => _item.name === item.region_name);
              item.lnglat = _.get(obj, 'value');
              return item;
            }).filter((item) => item.sn_num > 0);

            this.saleMapList = list;
          }
        }).catch((err) => {
          console.log(err);
        });
    },
    // 商品分类销售额
    getGoodsCategoryAmount() {
      this.$service.getGoodsCategoryAmount(this.params)
        .then((res) => {
          if (res && res.code === 0) {
            let data = _.chain(res.data)
                        .omit('总额')
                        .keys()
                        .map((key) => {
                          let name = key;
                          let value = _.get(res.data, key);
                          return {name, value}
                        })
                        .filter((item) => {
                          return item.value !== 0;
                        })
                        .map((item) => {
                          item.value = item.value * 100;
                          return item;
                        })
                        .sortBy('name')
                        .value();
            if (data.length === 0) {
              this.goodsCategoryAmountNoData = true;
            } else {
              this.goodsCategoryAmountNoData = false;
              this.initLeftSideMiddleTopChart(data);
            }
          }
        }).catch((err) => {
          console.log(err);
        });
    },
    // 商品分类销售额曲线
    getGoodsCategoryAmountCurve() {
      this.$service.getGoodsCategoryAmountCurve(this.params)
        .then((res) => {
          if (res && res.code === 0) {
            let labelList = _.chain(res.data).keys().sortBy().value();
            let valueList = _.chain(res.data)
                        .values()
                        .map((item) => _.keys(item))
                        .flattenDeep()
                        .uniq()
                        .sortBy()
                        .map((item) => {
                          let name = item;
                          let type = 'line';
                          let data = labelList.map((label) => {
                            let value = _.get(res.data, `${label}.${item}`) || 0;
                            return value * 100;
                          });
                          return {name, data, type};
                        })
                        .value();

            let _labelList = labelList.map((date) => this.dateFormatByCycleType(this.params.cycle_type, date))
            let data = {labelList: _labelList, valueList}
            if (_labelList.length === 0) {
              this.getGoodsCategoryAmountCurveNoData = true;
            } else {
              this.getGoodsCategoryAmountCurveNoData = false;
              this.initLeftSideMiddleBottomChart(data);
            }
          }
        }).catch((err) => {
          console.log(err);
        });
    },
    // 热卖商品金额TOP5
    getHotMoneyTopFive() {
      this.$service.getHotMoneyTopFive(this.params)
        .then((res) => {
          if (res && res.code === 0) {
            this.hotGoodstop5List = _.chain(res.data)
                                     .map((goods) => {
                                        return {
                                          name: _.get(goods, '商品名称'),
                                          amount: _.get(goods, '金额')
                                        }
                                     })
                                     .sortBy('amount')
                                     .map((item) => {
                                       item.amount = this.$util.deal(item.amount * 100);
                                       return item;
                                     })
                                     .reverse()
                                     .take(5)
                                     .value();
          }
        }).catch((err) => {
          console.log(err);
        });
    },
    // 农场销量排行
    getMoneyTopFive() {
      this.$service.getMoneyTopFive(this.params)
        .then((res) => {
          if (res && res.code === 0) {
            let farmSaleTopList = res.data || [];
            this.farmSaleTopList = farmSaleTopList.map((item) => {
              let total = item.total || 0;
              item.total = (total * 100).toFixed(2);
              return item;
            });
          }
        }).catch((err) => {
          console.log(err);
        });
    },
    // 下单金额
    getOrderAmount() {
      this.$service.getOrderAmount(this.params)
        .then((res) => {
          if (res && res.code === 0) {
            let labelList = _.chain(res.data).keys().sortBy().value();
            let valueList = labelList.map((key) => {
              let value = _.get(res.data, key) || 0;
              return value * 100;
            });
            let _labelList = labelList.map((date) => this.dateFormatByCycleType(this.params.cycle_type, date))
            let data = {labelList: _labelList, valueList};
            if (_labelList.length === 0) {
              this.orderAmountNoData = true;
            } else {
              this.orderAmountNoData = false;
              this.initRightSideMiddleChart(data);
            }
          }
        }).catch((err) => {
          console.log(err);
        });
    },
    // 用户统计
    getUserStatistics() {
      this.$service.getUserStatistics(this.params)
        .then((res) => {
          if (res && res.code === 0) {
            let labelList = _.chain(res.data).keys().sortBy().value();
            let valueList = labelList.map((key) => {
              let value = _.get(res.data, key) || 0;
              return value * 100;
            });
            let _labelList = labelList.map((date) => this.dateFormatByCycleType(this.params.cycle_type, date))
            let data = {labelList: _labelList, valueList};
            if (_labelList.length === 0) {
              this.userStatisticsNoData = true;
            } else {
              this.userStatisticsNoData = false;
              this.initRightSideMiddleChart(data);
            }
          }
        }).catch((err) => {
          console.log(err);
        });
    },
    // 下单量
    getOrderNum() {
      this.$service.getOrderNum(this.params)
        .then((res) => {
          if (res && res.code === 0) {
            let labelList = _.chain(res.data).keys().sortBy().value();
            let valueList = labelList.map((key) => {
              let value = _.get(res.data, key);
              return value * 100;
            });
            let _labelList = labelList.map((date) => this.dateFormatByCycleType(this.params.cycle_type, date))
            let data = {labelList: _labelList, valueList};
            if (_labelList.length === 0) {
              this.orderNumNoData = true;
            } else {
              this.orderNumNoData = false;
              this.initRightSideTopChart(data);
            }
          }
        }).catch((err) => {
          console.log(err);
        });
    },
    // 客单价分布
    getUnitPrice() {
      this.$service.getUnitPrice(this.params)
        .then((res) => {
          if (res && res.code === 0) {
            let labelList = _.chain(res.data)
                             .keys()
                             .sortBy((item) => parseInt(_.get(item.split('-'), 0)))
                             .value();
            let valueList = labelList.map((key) => {
              let value = _.get(res.data, key);
              return value * 100;
            });
            let data = {labelList: labelList.map((item) => item.replace('-', '/')), valueList};
            if (labelList.length === 0) {
              this.unitPriceNoData = true;
            } else {
              this.unitPriceNoData = false;
              this.initRightSideBottomChart(data);
            }
          }
        }).catch((err) => {
          console.log(err);
        });
    },
    getClientTypeTotal() {
      this.$service.getClientTypeTotal(this.params)
        .then((res) => {
          if (res && res.code === 0) {
            this.clientTypeDataList = label.clientLabelList.map((label) => {
              let client = res.data.find((item) => item.client_type === label.client_type);
              let value = _.get(client, 'total') || 0;
              return {
                name: label.name,
                value: this.$util.deal(value * 100)
              };
            });
            let seriesData = this.clientTypeDataList.map((item) => item.value);
            let max = _.max(seriesData);

            let indicatorData = this.clientTypeDataList.map((item) => {
              return {
                name: item.name,
                max
              }
            });
            this.initClientTypeTotalChart({indicatorData, seriesData});
          }
        }).catch((err) => {
          console.log(err);
        });
    },
    async initClientTypeTotalChart(data) {
      try {
        await this.$nextTick();
        let clientTypeTotalDom = document.querySelector("#client-type-total-chart");
        let clientTypeTotalChart = echarts.init(clientTypeTotalDom);
        this.clientTypeTotalChart = clientTypeTotalChart;
        // 为echarts对象加载数据
        clientTypeTotalChart.clear();
        clientTypeTotalChart.setOption(this.getClientTypeTotalChartConfig(data), true);

        window.addEventListener('resize', () => {
         this.clientTypeTotalChart.resize();
        }, false);
      } catch (err) {
        console.log(err);
      }
    },
    async initMoneyTopFiveChart(data) {
      try {
        await this.$nextTick();
        let leftTopChartDom = document.querySelector("#left-top-chart");
        let leftTopChart = echarts.init(leftTopChartDom);
        this.leftTopChart = leftTopChart;
        // 为echarts对象加载数据
        leftTopChart.clear();
        leftTopChart.setOption(this.getLeftTopChartConfig(data), true);

        window.addEventListener('resize', () => {
         this.leftTopChart.resize();
        }, false);
      } catch (err) {
        console.log(err);
      }
    },
    async initLeftSideMiddleTopChart(data) {
      try {
        await this.$nextTick();
        let leftSideMiddleTopChartDom = document.querySelector(
          "#left-side-middle-top-chart"
        );
        let leftSideMiddleTopChart = echarts.init(leftSideMiddleTopChartDom);
        this.leftSideMiddleTopChart = leftSideMiddleTopChart;
        // 为echarts对象加载数据
        leftSideMiddleTopChart.clear();
        leftSideMiddleTopChart.setOption(
          this.leftSideMiddleTopChartConfig(data),
          true
        );

        window.addEventListener('resize', () => {
          this.leftSideMiddleTopChart.resize();
        }, false);
      } catch (err) {
        console.log(err);
      }
    },
    async initLeftSideMiddleBottomChart(data) {
      try {
        await this.$nextTick();
        let leftSideMiddleBottomChartDom = document.querySelector(
          "#left-side-middle-bottom-chart"
        );
        let leftSideMiddleBottomChart = echarts.init(leftSideMiddleBottomChartDom);
        this.leftSideMiddleBottomChart = leftSideMiddleBottomChart;
        // 为echarts对象加载数据
        leftSideMiddleBottomChart.clear();
        leftSideMiddleBottomChart.setOption(
          this.leftSideMiddleBottomChartConfig(data),
          true
        );

        window.addEventListener('resize', () => {
          this.leftSideMiddleBottomChart.resize();
        }, false);
      } catch (err) {
        console.log(err);
      }
    },
    async initLeftSideBottomChart(data) {
      try {
        await this.$nextTick();
        let leftSideBottomChartDom = document.querySelector(
          "#left-side-bottom-chart"
        );
        let leftSideBottomChart = echarts.init(leftSideBottomChartDom);
        this.leftSideBottomChart = leftSideBottomChart;
        // 为echarts对象加载数据
        leftSideBottomChart.clear();
        leftSideBottomChart.setOption(
          this.leftSideBottomChartConfig(data),
          true
        );

        window.addEventListener('resize', () => {
          this.leftSideBottomChart.resize();
        }, false);
      } catch (err) {
        console.log(err);
      }
    },
    async initRightSideTopChart(data) {
      try {
        await this.$nextTick();
        let rightSideTopChartDom = document.querySelector("#right-side-top-chart");
        let rightSideTopChart = echarts.init(rightSideTopChartDom);
        this.rightSideTopChart = rightSideTopChart;
        // 为echarts对象加载数据
        rightSideTopChart.clear();
        rightSideTopChart.setOption(this.getRightSideTopChartConfig(data), true);

        window.addEventListener('resize', () => {
          this.rightSideTopChart.resize();
        }, false);
      } catch (err) {
        console.log(err);
      }
    },
    async initRightSideMiddleChart(data) {
      try {
        await this.$nextTick();
        let rightSideMiddleChartDom = document.querySelector("#right-side-middle-chart");
        let rightSideMiddleChart = echarts.init(rightSideMiddleChartDom);
        this.rightSideMiddleChart = rightSideMiddleChart;
        // 为echarts对象加载数据
        rightSideMiddleChart.clear();
        rightSideMiddleChart.setOption(this.getRightSideMiddleChartConfig(data), true);

        window.addEventListener('resize', () => {
          this.rightSideMiddleChart.resize();
        }, false);
      } catch (err) {
        console.log(err);
      }
    },
    async initRightSideBottomChart(data) {
      try {
        await this.$nextTick();
        let rightSideBottomChartDom = document.querySelector("#right-side-bottom-chart");
        let rightSideBottomChart = echarts.init(rightSideBottomChartDom);
        this.rightSideBottomChart = rightSideBottomChart;
        // 为echarts对象加载数据
        rightSideBottomChart.clear();
        rightSideBottomChart.setOption(this.getRightSideBottomChartConfig(data), true);

        window.addEventListener('resize', () => {
          this.rightSideBottomChart.resize();
        }, false);
      } catch (err) {
        console.log(err);
      }
    },
    getLeftTopChartConfig(data) {
      return {
        tooltip: {
          trigger: "item",
          position: function(pos, params, dom, rect, size) {
            // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
            let obj = { top: 60 };
            obj[["left", "right"][+(pos[0] < size.viewSize[0] / 2)]] = 5;
            return obj;
          },
          formatter: "{b} : {c}"
        },
        grid: {
          left: "5%",
          right: "5%",
          top: "5%",
          bottom: "5%"
        },
        xAxis: {
          type: "value",
          min: 0,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          }
        },
        yAxis: {
          min: 0,
          z: 10,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            color: "#F0F0F0",
            inside: true,
            fontSize: 12
          },
          splitLine: {
            show: false
          },
          data: data.labelList
        },
        series: [
          {
            data: data.valueList,
            type: "bar",
            label: {
              show: true,
              color: "#9FA8B8",
              position: "right"
            },
            itemStyle: {
              //通常情况下：
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "#0a74da"
                  },
                  {
                    offset: 1,
                    color: "#4bbdd8"
                  }
                ])
              }
            },
            barWidth: 18,
            showBackground: true,
            backgroundStyle: {
              color: "#11233C"
            },
            animationCurve: "easeOutBack"
          }
        ]
      };
    },
    leftSideMiddleTopChartConfig(data) {
      return {
        color: ["#6992DE", "#D6B564", "#DD6F46", "#9258e6", "#ECC94C"],
        tooltip: {
          show: false,
          trigger: "item",
          position: function(pos, params, dom, rect, size) {
            // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
            let obj = { top: 60 };
            obj[["left", "right"][+(pos[0] < size.viewSize[0] / 2)]] = 5;
            return obj;
          },
          formatter: "{b} : {c} ({d}%)"
        },
        series: [
          {
            type: "pie",
            radius: "60%",
            // center: ["50%", "50%"],
            data,
            // roseType: "radius",
            label: {
              color: "#F0F0F0",
              fontSize: 12,
              lineHeight: 14,
              formatter: "{b} {d}%"
            },
            labelLine: {
              length: 8,
              length2: 6,
              lineStyle: {
                color: "#3E495E"
              }
            }
          }
        ]
      };
    },
    leftSideMiddleBottomChartConfig(data) {
      return {
        color: ["#6992DE", "#D6B564", "#DD6F46", "#ECC94C", "#884CDE"],
        tooltip: {
          trigger: 'item',
          formatter: (params) => {
            return `<span>${params.name}</span><br />
                    <span>${params.seriesName}: </span>
                    <span style="color: ${params.color};">${params.value}</span>`;
          }
        },
        grid: {
          top: '5%',
          left: '16%',
          right: '5%',
          bottom: '15%'
        },
        xAxis: {
          type: "category",
          data: data.labelList,
          axisLabel: {
            fontSize: 12,
            color: '#52B5E4'
          },
          axisLine: {
            lineStyle: {
              color: '#3E495E'
            }
          }
        },
        yAxis: {
          type: "value",
          axisLabel: {
            fontSize: 12,
            color: '#52B5E4'
          },
          axisLine: {
            lineStyle: {
              color: '#3E495E'
            }
          },
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: ['#3D485D']
            }
          }
        },
        series: data.valueList
      };
    },
    leftSideBottomChartConfig(data) {
      return {
        tooltip: {
          show: false,
          trigger: "item",
          position: function(pos, params, dom, rect, size) {
            // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
            let obj = { top: 60 };
            obj[["left", "right"][+(pos[0] < size.viewSize[0] / 2)]] = 5;
            return obj;
          },
          formatter: "{b} : {c}"
        },
        grid: {
          left: "5%",
          right: "5%",
          top: "5%",
          bottom: "5%"
        },
        xAxis: {
          type: "value",
          min: 0,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          }
        },
        yAxis: {
          min: 0,
          z: 10,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            color: "#f0f0f0",
            inside: true,
            fontSize: 10
          },
          splitLine: {
            show: false
          },
          data: data.labelList
        },
        series: [
          {
            data: data.valueList,
            type: "bar",
            label: {
              show: true,
              color: "#70CAEE",
              position: ['100%', '25%']
              // position: ['5%', '100%']
            },
            itemStyle: {
              emphasis: {
                barBorderRadius: 18,
              },
              //通常情况下：
              normal: {
                barBorderRadius: 18,
                color: function(params) { //柱状图不同颜色实现
                  let colorList = _.reverse([
                    "#6992DE",
                    "#D6B564",
                    "#DD6F46",
                    "#9258e6",
                    "#ECC94C"
                  ]);
                  return colorList[params.dataIndex];
                }
              }
            },
            barWidth: 18,
            showBackground: true,
            backgroundStyle: {
              color: "#11233C"
            },
            animationCurve: "easeOutBack"
          }
        ]
      };
    },
    getRightSideTopChartConfig(data) {
      return {
        color: ["#D6B564"],
        tooltip: {
          trigger: 'item',
          formatter: (params) => {
            return `<span>${params.name}</span><br />
                    <span>${params.seriesName}: </span>
                    <span style="color: ${params.color};">${params.value}</span>`;
          }
        },
        grid: {
          top: '10%',
          left: '12%',
          right: '5%',
          bottom: '15%'
        },
        xAxis: {
          type: "category",
          data: data.labelList,
          axisLabel: {
            fontSize: 12,
            color: '#52B5E4'
          },
          axisLine: {
            lineStyle: {
              color: '#3E495E'
            }
          }
        },
        yAxis: {
          type: "value",
          axisLabel: {
            fontSize: 12,
            color: '#52B5E4'
          },
          axisLine: {
            lineStyle: {
              color: '#3E495E'
            }
          },
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: ['#3D485D']
            }
          }
        },
        series: [
          {
            name: '下单量',
            data: data.valueList,
            type: "line",
            smooth: true,
            areaStyle: {
              normal: {
                color: {
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(255, 221, 43, 0.6)" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(230, 200, 96, 0.06)" // 100% 处的颜色
                    }
                  ],
                  globalCoord: true// 缺省为 false
                }
              }
            }
          }
        ]
      };
    },
    getRightSideMiddleChartConfig(data) {
      return {
        color: ["#11e6ce"],
        tooltip: {
          trigger: 'item',
          formatter: (params) => {
            return `<span>${params.name}</span><br />
                    <span>${params.seriesName}: </span>
                    <span style="color: ${params.color};">${params.value}</span>`;
          }
        },
        grid: {
          top: '10%',
          left: '12%',
          right: '5%',
          bottom: '15%'
        },
        xAxis: {
          type: "category",
          data: data.labelList,
          axisLabel: {
            fontSize: 12,
            color: '#52B5E4'
          },
          axisLine: {
            lineStyle: {
              color: '3E495E'
            }
          }
        },
        yAxis: {
          type: "value",
          axisLabel: {
            fontSize: 12,
            color: '#52B5E4'
          },
          axisLine: {
            lineStyle: {
              color: '#3E495E'
            }
          },
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: ['#3D485D']
            }
          }
        },
        series: [
          {
            name: '下单金额',
            data: data.valueList,
            type: "line",
            smooth: true,
            areaStyle: {
              normal: {
                color: {
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(0, 255, 207, 0.6)" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(8, 191, 255, 0.06)" // 100% 处的颜色
                    }
                  ],
                  globalCoord: true// 缺省为 false
                }
              }
            }
          }
        ]
      };
    },
    getRightSideBottomChartConfig(data) {
      return {
        tooltip: {
          trigger: 'item',
          formatter: (params) => {
            return `<span>${params.name}</span><br />
                    <span>${params.seriesName}: </span>
                    <span style="color: ${params.color};">${params.value}</span>`;
          }
        },
        grid: {
          top: '10%',
          left: '12%',
          right: '5%',
          bottom: '15%'
        },
        xAxis: {
          type: "category",
          data: data.labelList,
          axisLabel: {
            fontSize: 12,
            color: '#52B5E4'
          },
          axisLine: {
            lineStyle: {
              color: '#3E495E'
            }
          }
        },
        yAxis: {
          type: "value",
          axisLabel: {
            fontSize: 12,
            color: '#52B5E4'
          },
          axisLine: {
            lineStyle: {
              color: '#3E495E'
            }
          },
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: ['#3D485D']
            }
          }
        },
        series: [
          {
            name: '客单价',
            data: data.valueList,
            type: "bar",
            label: {
              show: true,
              color: "#9FA8B8",
              position: "top"
            },
            itemStyle: {
              //通常情况下：
              normal: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: "#1D6CDC"
                  },
                  {
                    offset: 1,
                    color: "#8F95FF"
                  }
                ])
              }
            },
            barWidth: 22,
          }
        ]
      };
    },
    getClientTypeTotalChartConfig(data) {
      return {
        radar: {
          // shape: 'circle',
          splitNumber: 5, // 雷达图圈数设置
          radius: 60,
          name: {
            textStyle: {
              color: '#fff'
            }
          },
          // 设置雷达图中间射线的颜色
          axisLine: {
            lineStyle: {
              color: 'rgba(17, 169, 180, 0.3)'
            }
          },
          indicator: data.indicatorData || [],
          //雷达图背景的颜色，在这儿随便设置了一个颜色，完全不透明度为0，就实现了透明背景
          splitArea: {
              show: false,
              areaStyle: {
                  color: 'rgba(255,0,0,0)', // 图表背景的颜色
              },
          },
          splitLine: {
              show: true,
              lineStyle: {
                width: 1,
                color: 'rgba(17, 169, 180, 0.8)', // 设置网格的颜色
              },
          }
        },
        series: [{
          type: 'radar',
          // areaStyle: {normal: {}},
          data: [
            {
              value: data.seriesData || [],
              // 设置区域边框和区域的颜色
              itemStyle: {
                color: '#FFDD2B'
              },
              lineStyle: {
                color: 'rgba(255, 221, 43, 0.6)'
              }
            }
          ]
        }]
      };
    }
  }
};
</script>
<style lang="scss" scoped>
.sale-container {
  display: flex;
  justify-content: space-between;
  height: calc(100% - 0.8rem);
  padding: 0.14rem 0.2rem 0.2rem 0.2rem;
  .field-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 0.22rem;
  }
  .left-side {
    width: 4rem;
    height: 100%;
    .left-side-content {
      width: 100%;
      height: calc(100% - 0.3rem);
      .left-side-top {
        width: 100%;
        height: 24.5714%;
        .charts-wrapper {
          position: relative;
          width: 100%;
          height: calc(100% - 0.42rem);
          #left-top-chart {
            width: 100%;
            height: 100%;
          }
        }
      }
      .left-side-middle {
        width: 100%;
        height: 50.8571%;
        .left-side-middle-content {
          height: calc(100% - 0.42rem);
          .left-side-middle-top {
            position: relative;
            height: 50%;
            #left-side-middle-top-chart {
              width: 100%;
              height: 100%;
            }
          }
          .left-side-middle-bottom {
            position: relative;
            height: 50%;
            #left-side-middle-bottom-chart {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      .left-side-bottom {
        width: 100%;
        height: 24.5714%;
        .left-side-bottom-content {
          position: relative;
          width: 100%;
          height: calc(100% - 0.42rem);
          #left-side-bottom-chart {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  .middle-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 10.4rem;
    height: 100%;
    .middle-top {
      width: 100%;
      // height: calc(100% - 3.25rem);
      height: calc(100% - 2.75rem);
      overflow: hidden;
      .map-header {
        display: flex;
        align-items: flex-start;
        // align-items: center;
        justify-content: space-between;
        width: 100%;
        // height: 0.7rem;
        // height: 1.2rem;
        .select-field  {
          display: flex;
          align-items: center;
          .date-select,
          .pay-select {
            display: flex;
            align-items: center;
            margin-left: 0.25rem;
            .label {
              color: #70CAEE;
              font-size: 0.16rem;
            }
          }
        }
        .date-btn {
          display: flex;
          align-items: center;
          .date-item {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 0.8rem;
            height: 0.4rem;
            background-color: #0B142B;
            border: 1px solid #1F4071;
            cursor: pointer;
            color: #417FC8;
            font-size: 0.16rem;
            &.active {
              color: #fff;
              background-color: #1A8DD2;
            }
            &:first-child {
              border-radius: 0.1rem 0 0 0.1rem;
              border-right: none;
            }
            &:last-child {
              border-radius: 0 0.1rem 0.1rem 0;
              border-left: none;
            }
          }
        }
        .header-middle {
          display: flex;
          .sale-amount-container {
            .sale-amount-title {
              display: flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 0.2rem;
              .svg-icon {
                width: 0.64rem;
                height: 0.04rem;
              }
              .title {
                font-size: 0.18rem;
                color: #00DCFF;
                margin: 0 0.15rem;
              }
            }
            &:nth-of-type(2) {
              .sale-amount-title {
                .title {
                  color: #00DCFF;
                }
              }
              .sale-amount {
                color: #00DCFF;
              }
            }
            &:nth-of-type(1) {
              .sale-amount-title {
                .title {
                  color: #FFDF12;
                }
              }
              .sale-amount {
                color: #FFDF12;
              }
            }
          }
          .sale-amount-container + .sale-amount-container {
            margin-left: 0.3rem;
          }
        }
        .sale-amount {
          display: flex;
          .label {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 0.9rem;
            height: 0.6rem;
            color: #70CAEE;
            text-align: center;
            margin-right: 0.1rem;
          }
          .left-unit {
            width: 0.4rem;
            height: 0.6rem;
            line-height: 0.6rem;
            // color: #f0f0f0;
            font-size: 0.26rem;
            text-align: center;
          }
          .amount-item {
            position: relative;
            width: 0.4rem;
            height: 0.6rem;
            margin-left: 0.06rem;
            .value {
              position: absolute;
              top: 0.1rem;
              left: 50%;
              transform: translateX(-50%);
              // color: #fff;
              font-size: 0.5rem;
            }
          }
          .split-dot {
            display: flex;
            align-items: flex-end;
            // color: #f0f0f0;
            margin: 0 0.04rem;
          }
          .right-unit {
            // color: #f0f0f0;
            width: 0.4rem;
            height: 0.6rem;
            line-height: 0.6rem;
            text-align: center;
            margin-left: 0.06rem;
          }
        }
      }
      .sale-user {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 0.68rem;
        margin-top: 0.12rem;
        .left-sale {
          display: flex;
          align-items: center;
          color: #FFDF12;
          .sale-user-item + .sale-user-item {
            margin-left: 0.4rem;
          }
          .label {
            font-size: 0.18rem;
          }
          .value {
            display: flex;
            align-items: center;
            font-size: 0.5rem;
            margin-top: 0.12rem;
            .unit {
              font-size: 0.2rem;
              margin-left: 0.06rem;
            }
          }
        }
        .right-user {
          display: flex;
          align-items: center;
          color: #00DCFF;
          .sale-user-item + .sale-user-item {
            margin-left: 0.4rem;
          }
          .label {
            font-size: 0.18rem;
          }
          .value {
            display: flex;
            align-items: center;
            font-size: 0.5rem;
            margin-top: 0.08rem;
            .unit {
              font-size: 0.2rem;
              margin-left: 0.06rem;
            }
          }
        }
      }
      .map-content {
        // height: calc(100% - 0.7rem);
        position: relative;
        height: calc(100% - 1.2rem);
        .map-title {
          position: absolute;
          top: 0.2rem;
          left: 50%;
          transform: translateX(-50%);
          width: 2.14rem;
          height: 0.4rem;
          line-height: 0.4rem;
          text-align: center;
          color: #70CAEE;
          font-size: 0.16rem;
          font-weight: 500;
          background-image: linear-gradient(to right, rgba(21, 46, 89, 0.1), rgba(52, 93, 154, 0.5), rgba(37, 76, 130, 0.1));
          z-index: 10000;
        }
      }
    }
    .middle-bottom {
      display: flex;
      justify-content: space-between;
      width: 100%;
      // height: 3.05rem;
      height: 2.55rem;
      // padding: 0 0.2rem;
      .middle-bottom-left {
        width: calc(50% - 0.1rem);
        height: 100%;
        padding: 0 0.2rem;
        .table {
          position: relative;
          height: calc(100% - 0.42rem);
          .table-list {
            width: 100%;
            .table-item {
              display: flex;
              justify-content: space-around;
              align-items: center;
              width: 100%;
              height: 0.32rem;
              color: #f0f0f0;
              &.header {
                background-color: #162E57;
                color: #70CAEE;
                font-size: 0.14rem;
              }
              &.eve {
                background-color: #101B36;
              }
              &.odd {
                background-color: #152B4C;
              }
              .money {
                color: #FF6E6E;
              }
              .item {
                flex: 1;
                font-size: 0.14rem;
                text-align: center;
              }
            }
          }
        }
      }
      .middle-bottom-right {
        position: relative;
        width: calc(50% - 0.1rem);
        height: 100%;
        padding: 0 0.2rem;
        .label-chart {
          display: flex;
          height: calc(100% - 0.42rem);
          .label-list {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 1.6rem;
            height: 100%;
            .client-data-list {
              .client-data-item {
                display: flex;
                font-size: 0.14rem;
                margin-bottom: 0.08rem;
                .label {
                  min-width: 0.6rem;
                  color: #fff;
                  margin-right: 0.1rem;
                  text-align: right;
                }
                .value {
                  color: #FFDD2B;
                }
              }
            }
          }
        }
        #client-type-total-chart {
          position: absolute;
          right: 0.2rem;
          top: 50%;
          transform: translateY(-50%);
          // width: calc(100% - 2rem);
          // height: calc(100% - 0.2rem);
          width: 3.2rem;
          height: 2.3rem;
        }
      }
    }
  }
  .right-side {
    width: 4rem;
    height: 100%;
    .right-side-content {
      width: 100%;
      height: calc(100% - 0.3rem);
      .right-side-top {
        width: 100%;
        height: 33.33333%;
        .right-side-top-content {
          position: relative;
          width: 100%;
          height: calc(100% - 0.42rem);
          #right-side-top-chart {
            width: 100%;
            height: 100%;
          }
        }
      }
      .right-side-middle {
        width: 100%;
        height: 33.33333%;
        .right-side-middle-content {
          position: relative;
          width: 100%;
          height: calc(100% - 0.42rem);
          #right-side-middle-chart {
            width: 100%;
            height: 100%;
          }
        }
      }
      .right-side-bottom {
        width: 100%;
        height: 33.33333%;
        .right-side-bottom-content {
          position: relative;
          width: 100%;
          height: calc(100% - 0.42rem);
          #right-side-bottom-chart {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>

