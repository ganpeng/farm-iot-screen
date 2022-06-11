<template>
  <div class="farm-stock-container">
    <div class="left-side">
      <div class="left-side-top border-icon1 field-content">
        <div class="title-one title-one-header-icon white">
          <h5>
            <svg-icon class="title-icon" icon-class="title_icon"></svg-icon>土地利用
          </h5>
        </div>
        <div class="charts-container">
          <div class="charts-header">
            总面积
            <i class="my-font">{{landData.totalArea}}</i>
            <span>公顷</span>
          </div>
          <div class="charts-wrapper no-sub-title">
            <dv-active-ring-chart class="ring-chart" :config="landConfig"/>
          </div>
          <label-tag :labelList="landLabelList"></label-tag>
        </div>
      </div>
      <div class="left-side-bottom border-icon2 field-content">
        <div class="title-one title-one-header-icon white">
          <h5>
            <svg-icon class="title-icon" icon-class="title_icon"></svg-icon>农产统计
          </h5>
        </div>
        <div class="litter-tab">
          <div @click="changeLitterTab(0)" :class="['litter-tab-item', activeIndex === 0 && 'active']">农作物</div>
          <div @click="changeLitterTab(1)" :class="['litter-tab-item', activeIndex === 1 && 'active']">水产</div>
        </div>
        <div class="half-field-container">
          <div v-if="activeIndex === 0" class="litter-tab-content">
            <div class="half-field">
              <div class="charts-container">
                <div class="charts-header">
                  本年度总播种
                  <i class="my-font">{{plantData.totalArea}}</i>
                  <span>公顷</span>
                </div>
                <div class="charts-wrapper">
                  <div id="area-chart"></div>
                </div>
              </div>
            </div>
            <div class="half-field">
              <div class="charts-container">
                <div class="charts-header">
                  本年度总产量
                  <i class="my-font">{{plantData.totalYield | toFixed2}}</i>
                  <span>吨</span>
                </div>
                <div class="charts-wrapper">
                  <div id="production-chart"></div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="activeIndex === 1"  class="litter-tab-content">
            <div class="half-field">
              <div class="charts-container">
                <div class="charts-header">
                  本年度总养殖
                  <i class="my-font">{{plantData.totalWaterArea}}</i>
                  <span>公顷</span>
                </div>
                <div class="charts-wrapper">
                  <div id="water-area-chart"></div>
                </div>
              </div>
            </div>
            <div class="half-field">
              <div class="charts-container">
                <div class="charts-header">
                  本年度总产量
                  <i class="my-font">{{plantData.totalWaterYield | toFixed2}}</i>
                  <span>吨</span>
                </div>
                <div class="charts-wrapper">
                  <div id="water-production-chart"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="middle-content">
      <div class="middle-top border-icon4">
        <div class="middle-top-content farm-map-container field-content">
          <farm-map ref="farmMap" :getMapCenter="getMapCenter"></farm-map>
          <div class="map-title border-icon29">企业分布</div>
          <div v-if="mapCenterHtml" v-html="mapCenterHtml" class="map-center border-icon22"></div>
          <div class="farm-count">
            <div class="farm-machine-icon">
              <svg-icon icon-class="farm_member_icon"></svg-icon>
            </div>
            <div class="farm-count-info">
              <div class="label">企业</div>
              <div class="value">
                <span class="my-font gradient-num1">{{farmCount}}</span>
                <i>&nbsp;个</i>
              </div>
            </div>
          </div>
          <div class="people-count">
            <div class="farm-member-icon">
              <svg-icon icon-class="farm_machine_icon"></svg-icon>
            </div>
            <div class="people-count-info">
              <div class="label">从业人员</div>
              <div class="value">
                <span class="my-font gradient-num1">{{MemberData.totalNumber}}</span>
                <i>&nbsp;个</i>
              </div>
            </div>
          </div>
          <div @click="resetMapHandler" class="map-reset-btn border-icon31">
            <svg-icon icon-class="map_reset_icon"></svg-icon>
          </div>
          <div class="zoom-container border-icon30">
            <div @click="zoomOutHandler" class="zoom-plus">
              <svg-icon icon-class="zoom_plus"></svg-icon>
            </div>
            <div @click="zoomInHandler" class="zoom-sub">
              <svg-icon icon-class="zoom_sub"></svg-icon>
            </div>
          </div>
          <div class="label-list border-icon56">
            <div
              v-for="(item, index) in farmLabelList"
              :key="index"
              class="label-item"
            >
              <div
                :style="`background-color: ${item.color}`"
                class="icon"
              ></div>
              <div class="name">{{ item.name }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="middle-bottom border-icon3">
        <div class="middle-bottom-content">
          <!-- <farm-alert :warningList="warningList"></farm-alert> -->
          <div class="title-one big white">
            <h5>
              <svg-icon class="title-icon" icon-class="title_icon"></svg-icon>预警信息
            </h5>
          </div>
          <div class="warning-list-wrapper">
            <warning-list :warningList="warningList" :status="2"></warning-list>
          </div>
        </div>
      </div>
    </div>
    <div class="right-side">
      <div class="right-side-top border-icon1 field-content">
        <div class="title-one title-one-header-icon white">
          <h5>
            <svg-icon class="title-icon" icon-class="title_icon"></svg-icon>物环统计
          </h5>
        </div>
        <div class="charts-container">
          <div class="charts-header">
            物环总数
            <i class="my-font">{{deviceData.totalNumber}}</i>个
          </div>
          <div class="charts-wrapper no-sub-title">
            <dv-active-ring-chart class="ring-chart" :config="deviceConfig"/>
          </div>
          <label-tag :labelList="deviceLabelList" :split="true"></label-tag>
        </div>
      </div>
      <div class="right-side-bottom border-icon2 field-content">
        <div class="title-one title-one-header-icon white">
          <h5>
            <svg-icon class="title-icon" icon-class="title_icon"></svg-icon>经营情况统计
          </h5>
        </div>
        <div class="content-item-container">
          <div class="field-content-item">
            <div class="title-one">
              <h5>
                <i class="point"></i>
                <span class="statisitcs-icon statisitcs-icon1"></span>
                农业现代化
              </h5>
            </div>
            <div class="info-row">
              <div class="info-item">
                <div class="title">农机具数量</div>
                <div class="value">
                  <span class="my-font">{{MachineryData.totalNumber}}</span>
                  <i>&nbsp;辆/台</i>
                </div>
              </div>
              <div class="info-item">
                <div class="title">农民累积培训</div>
                <div class="value">
                  <span class="my-font">{{MemberData.trainingDays}}</span>
                  <i>&nbsp;天</i>
                </div>
              </div>
            </div>
            <div class="info-row">
              <div class="info-item">
                <div class="title">证书总量</div>
                <div class="value">
                  <span class="my-font">{{MemberData.certificatedMemberNumber}}</span>
                  <i>&nbsp;个</i>
                </div>
              </div>
              <div class="info-item"></div>
            </div>
          </div>
          <div class="field-content-item">
            <div class="title-one">
              <h5>
                <i class="point"></i>
                <span class="statisitcs-icon statisitcs-icon2"></span>
                政府扶持
              </h5>
            </div>
            <div class="info-row">
              <div class="info-item">
                <div class="title">政府项目累计</div>
                <div class="value">
                  <span class="my-font">{{operatingData.governmentProjectNumber}}</span>
                  <i>&nbsp;个</i>
                </div>
              </div>
              <div class="info-item">
                <div class="title">累计金额</div>
                <div class="value">
                  <span class="my-font">{{operatingData.appropriationAmount | unitConvert('num')}}</span>
                  <i>&nbsp;{{operatingData.appropriationAmount | unitConvert('unit')}}</i>
                </div>
              </div>
            </div>
            <div class="info-row">
              <div class="info-item">
                <div class="title">农业补贴累计</div>
                <div class="value">
                  <span class="my-font">{{operatingData.subsidyProjectNumber}}</span>
                  <i>&nbsp;次</i>
                </div>
              </div>
              <div class="info-item">
                <div class="title">累计金额</div>
                <div class="value">
                  <span class="my-font">{{operatingData.subsidyAmount | unitConvert('num')}}</span>
                  <i>&nbsp;{{operatingData.subsidyAmount | unitConvert('unit')}}</i>
                </div>
              </div>
            </div>
          </div>
          <div class="field-content-item">
            <div class="title-one">
              <h5>
                <i class="point"></i>
                <span class="statisitcs-icon statisitcs-icon3"></span>
                农业社会化服务
              </h5>
            </div>
            <div class="info-row">
              <div class="info-item">
                <div class="title">累计服务营收</div>
                <div class="value">
                  <span class="my-font">{{operatingData.revenueAmount | unitConvert('num')}}</span>
                  <i>&nbsp;{{operatingData.revenueAmount | unitConvert('unit')}}</i>
                </div>
              </div>
              <div class="info-item"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import _ from "lodash";
import echarts from 'echarts';
import LabelTag from "@/components/LabelTag";
import FarmMap from "./components/FarmMap";
import WarningList from './components/WarningList';
import label from "@/util/label";
export default {
  name: "FarmStock",
  components: { LabelTag, FarmMap, WarningList },
  data() {
    return {
      activeIndex: 0,
      // 图表
      areaChart: null,
      productChart: null,
      waterAreaChart: null,
      landLabelList: label.landLabelList,
      deviceLabelList: label.deviceLabelList,
      farmCount: "", // 农场总数
      mapCenterHtml: '',
      deviceData: {},
      deviceConfig: {},
      landData: {},
      landConfig: {},
      operatingData: {},
      MemberData: {},
      MachineryData: {},
      warningList: [],
      plantData: {},
      farmLabelList: [
        {
          name: '农业',
          color: '#35F0AC'
        },
        {
          name: '林业',
          color: '#FE572F'
        },
        {
          name: '渔业',
          color: '#F9CD31'
        },
        {
          name: "畜牧业",
          color: '#FF8A0A'
        },
        {
          name: '综合',
          color: '#6C63FF'
        }
      ]
    };
  },
  created() {
    this.getLandStatistics()
    this.getDeviceStatistics()
    this.getOperatingStatistics()
    this.getStatisticsPlant()
    this.getFarmCount()
    this.getMemberStatistics()
    this.getMachineryStatistics()
    this.getWarningList()
  },
  methods: {
    bindEvents() {
      window.addEventListener('resize', this.resizeHandler, false);
    },
    async changeLitterTab(index) {
      try {
        await this.$nextTick();
        this.activeIndex = index;
        if (this.activeIndex === 0) {
          this.initAreaProdChart();
        } else {
          this.initWaterAreaProdChart();
        }
      } catch (err) {
        console.log(err);
      }
    },
    getWarningList() {
      this.$service.getWarningList({ pageSize: 1000 })
        .then((res) => {
          let warningList = res.data.list || [];
          this.warningList = warningList;
          // this.warningList = _.chain(warningList)
          //                     .reject((warning) => {
          //                       return _.get(warning, 'description.description') === '设备离线';
          //                     })
          //                     .take(20)
          //                     .value();
        }).catch((err) => {
          console.log(err);
        });
    },
    getLandStatistics() {
      let year = new Date().getFullYear();
      this.$service.getLandStatistics({ farmId: 0, year })
        .then((res) => {
          this.landData = _.get(res.data, "0") || {};
          this.landConfig = this.getLandConfig(res.data);
        }).catch((err) => {
          console.log(err);
        });
    },
    getDeviceStatistics() {
      let year = new Date().getFullYear();
      this.$service.getDeviceStatistics({ farmId: 0, year })
        .then((res) => {
          this.deviceData = _.get(res.data, `deviceStatisticsList.0`) || {};
          this.deviceConfig = this.getDeviceConfig(this.deviceData);
        }).catch((err) => {
          console.log(err);
        });
    },
    getOperatingStatistics() {
      let year = new Date().getFullYear();
      this.$service.getOperatingStatistics({ farmId: 0, year })
        .then((res) => {
          this.operatingData = _.get(res.data, "0") || {};
        }).catch((err) => {
          console.log(err);
        })
    },
    getStatisticsPlant() {
      let year = new Date().getFullYear();
      this.$service.getStatisticsPlant({ farmId: 0, year })
        .then((res) => {
          this.plantData = _.get(res.data, "0") || {};
          this.initAreaProdChart();
          this.initWaterAreaProdChart();
        }).catch((err) => {
          console.log(err);
        });
    },
    getFarmCount() {
      this.$service.getFarmCount()
        .then((res) => {
          this.farmCount = _.get(res.data, "0.totalFarmNum");
        }).catch((err) => {
          console.log(err);
        });
    },
    getMemberStatistics() {
      let year = new Date().getFullYear();
      this.$service.getMemberStatistics({ farmId: 0, year })
        .then((res) => {
          this.MemberData = _.get(res.data, "0") || {};
        }).catch((err) => {
          console.log(err);
        });
    },
    getMachineryStatistics() {
      let year = new Date().getFullYear();
      this.$service.getMachineryStatistics({ farmId: 0, year })
        .then((res) => {
          this.MachineryData = _.get(res.data, "0") || {};
        }).catch((err) => {
          console.log(err);
        });
    },
    fetchAll() {
      let year = new Date().getFullYear();
      return Promise.all([
        this.$service.getWarningList({ pageSize: 10000 }),
        this.$service.getLandStatistics({ farmId: 0, year }),
        this.$service.getDeviceStatistics({ farmId: 0, year }),
        this.$service.getOperatingStatistics({ farmId: 0, year }),
        this.$service.getStatisticsPlant({ farmId: 0, year }),
        this.$service.getFarmCount(),
        this.$service.getMemberStatistics({ farmId: 0, year }),
        this.$service.getMachineryStatistics({ farmId: 0, year })
      ]);
    },
    initAreaProdChart() {
      let areaData = label.plantLabelList.map((label) => {
        return {
          name: label.name,
          value: _.get(this.plantData, label.prop)
        };
      });
      let prodData = label.plantLabelList.reduce((res, label) => {
        res.yAxisData = res.yAxisData || [];
        res.yAxisData.push(label.name);
        res.seriesData = res.seriesData || [];
        res.seriesData.push(_.get(this.plantData, label.prop2));
        return res;
      }, {});
      this.initAreaChart(areaData);
      this.initProductChart(prodData);
    },
    initWaterAreaProdChart() {
      let waterAreaData = label.waterLabelList.map((label) => {
        return {
          name: label.name,
          value: _.get(this.plantData, label.prop)
        };
      });
      let waterProdData = label.waterLabelList.reduce((res, label) => {
        res.yAxisData = res.yAxisData || [];
        res.yAxisData.push(label.name);
        res.seriesData = res.seriesData || [];
        res.seriesData.push(_.get(this.plantData, label.prop2));
        return res;
      }, {});

      this.initWaterAreaChart(waterAreaData);
      this.initWaterProductChart(waterProdData);
    },
    async initAreaChart(inputData) {
      try {
        await this.$nextTick();
        let areaChartDom = document.querySelector('#area-chart');
        let areaChart = echarts.init(areaChartDom);
        this.areaChart = areaChart;
        // 为echarts对象加载数据
        areaChart.clear();
        areaChart.setOption(this.getPlantConfig(inputData), true);

        window.addEventListener('resize', () => {
         this.areaChart.resize();
        }, false);
      } catch (err) {
        console.log(err);
      }
    },
    async initProductChart(inputData) {
      try {
        await this.$nextTick();
        let productChartDom = document.querySelector('#production-chart');
        let productChart = echarts.init(productChartDom);
        this.productChart = productChart;
        // 为echarts对象加载数据
        productChart.clear();
        productChart.setOption(this.getPlantConfig2(inputData), true);

        window.addEventListener('resize', () => {
         this.productChart.resize();
        }, false);
      } catch (err) {
        console.log(err);
      }
    },
    async initWaterAreaChart(inputData) {
      try {
        await this.$nextTick();
        let waterAreaChartDom = document.querySelector('#water-area-chart');
        let waterAreaChart = echarts.init(waterAreaChartDom);
        this.waterAreaChart = waterAreaChart;
        // 为echarts对象加载数据
        waterAreaChart.clear();
        waterAreaChart.setOption(this.getPlantConfig(inputData), true);

        window.addEventListener('resize', () => {
         this.waterAreaChart.resize();
        }, false);
      } catch (err) {
        console.log(err);
      }
    },
    async initWaterProductChart(inputData) {
      try {
        await this.$nextTick();
        let waterProductChartDom = document.querySelector('#water-production-chart');
        let waterProductChart = echarts.init(waterProductChartDom);
        this.waterProductChart = waterProductChart;
        // 为echarts对象加载数据
        waterProductChart.clear();
        waterProductChart.setOption(this.getPlantConfig2(inputData), true);

        window.addEventListener('resize', () => {
         this.waterProductChart.resize();
        }, false);
      } catch (err) {
        console.log(err);
      }
    },
    getLandConfig(inputData) {
       let data = label.landLabelList.map((label) => {
         return {
           name: label.name,
           value: _.get(inputData, `0.${label.prop}`)
         };
       });
      return Object.assign({}, this.$util.ringChartDefaultConfig, { data });
    },
    getDeviceConfig(inputData) {
      let data = label.deviceLabelList.map((label) => {
         return {
           name: label.name,
           value: _.get(inputData, `${label.prop}`) || 1
         };
      });
      return Object.assign({}, this.$util.ringChartDefaultConfig, { data });
    },
    getPlantConfig(data) {
      return {
        color: label.colors3,
        tooltip: {
          trigger: 'item',
          position: function (pos, params, dom, rect, size) {
              // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
              let obj = {top: 60};
              obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
              return obj;
          },
          formatter: '{b} : {c} ({d}%)'
        },
        series: [{
          type: "pie",
          radius: "50%",
          // center: ['50%', '50%'],
          data: data,
          // roseType: 'radius',
          label: {
            color: '#F0F0F0',
            fontSize: 12,
            lineHeight: 14,
            formatter: '{b} {d}%'
          },
          labelLine: {
            length: 8,
            length2: 6,
            lineStyle: {
              color: '#3E495E'
            }
          }
        }]
      };
    },
    getPlantConfig2(data) {
      return {
        tooltip: {
          trigger: 'item',
          position: function (pos, params, dom, rect, size) {
            // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
            let obj = {top: 60};
            obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
            return obj;
          },
          formatter: '{b} : {c}'
        },
        grid: {
          left: 60,
          right: 34,
          top: "10%",
          bottom: "10%"
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
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            color: "#f0f0f0",
            fontSize: 12
          },
          splitLine: {
            show: false
          },
          inverse: true, //反转坐标轴
          data: data.yAxisData
        },
        series: [
          {
            data: data.seriesData,
            type: "bar",
            label: {
              show: true,
              color: '#fff',
              position: "right",
              offset: [1, 0],
            },
            emphasis: {
              barBorderRadius: 18,
            },
            itemStyle: {
              normal: {
              barBorderRadius: 18,
                color: function(params) { //柱状图不同颜色实现
                  let colorList = label.colors3;
                  return colorList[params.dataIndex];
                }
              }
            },
            barWidth: 18,
            showBackground: true,
            backgroundStyle: {
              color: '#11233C',
              barBorderRadius: 18
            },
            animationCurve: "easeOutBack"
          }
        ]
      };
    },
    getMapCenter(data) {
      let {
        zoom,
        mapCenter: { province, city }
      } = data;
      let mapCenterHtml = "";
      if (zoom >= 5 && zoom < 8) {
        mapCenterHtml = `${province}`;
      } else if (zoom >= 8 && zoom < 9) {
        if (city) {
          mapCenterHtml = `${province}${city}`;
        } else {
          mapCenterHtml = `${province}`;
        }
      } else if (zoom >= 9 && zoom < 10) {
        if (city) {
          mapCenterHtml = `${province}${city}`;
        } else {
          mapCenterHtml = `${province}`;
        }
      } else {
        if (city) {
          mapCenterHtml = `${province}${city}`;
        } else {
          mapCenterHtml = `${province}`;
        }
      }
      this.mapCenterHtml = mapCenterHtml;
    },
    resetMapHandler() {
      this.$refs.farmMap.resetPosition();
    },
    zoomOutHandler() {
      this.$refs.farmMap.zoomOut();
    },
    zoomInHandler() {
      this.$refs.farmMap.zoomIn();
    }
  }
};
</script>
<style lang="scss" scoped>
.farm-stock-container {
  display: flex;
  justify-content: space-between;
  height: calc(100% - 0.8rem);
  padding: 0.14rem 0.2rem 0.2rem 0.2rem;
  .left-side {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 17.02%;
    .left-side-top {
      height: 32.9896%;
    }
    .left-side-bottom {
      height: 64.9484%;
      overflow-y: scroll;
      .litter-tab {
        display: flex;
        height: 0.3rem;
        line-height: 0.3rem;
        margin-top: 0.1rem;
        margin-left: 0.1rem;
        .litter-tab-item {
          color: #fff;
          font-size: 0.14rem;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          &.active {
            border-color: #68E0E3;
          }
        }
        .litter-tab-item + .litter-tab-item {
          margin-left: 0.2rem;
        }
      }
      .half-field-container {
        height: calc(100% - 0.8rem);
        .litter-tab-content {
          width: 100%;
          height: 100%;
        }
        .half-field {
          height: 50%;
          .charts-container {
            height: 100%;
            .charts-wrapper {
              height: calc(100% - 0.5rem);
            }
          }
        }
        .half-field:nth-of-type(1) {
          .charts-container {
            .charts-wrapper {
              height: calc(100% - 0.5rem);
            }
          }
        }
      }
    }
  }
  .middle-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 63.8297%;
    .middle-top {
      height: 69.5876%;
      .middle-top-content {
        position: relative;
        height: 100%;
        overflow: hidden;
        &.farm-map-container {
          padding: 4px;
        }
        .label-list {
          display: none;
          position: absolute;
          left: 0.2rem;
          bottom: 0.2rem;
          padding: 0.1rem 0.14rem;
          z-index: 100;
          .label-item {
            display: flex;
            align-items: center;
            .icon {
              width: 0.1rem;
              height: 0.1rem;
              margin-bottom: 0.02rem;
            }
            .name {
              font-size: 0.12rem;
              line-height: 0.16rem;
              color: #fff;
              margin-left: 0.08rem;
              margin-bottom: 0.02rem;
            }
          }
          .label-item + .label-item {
            margin-top: 0.08rem;
          }
        }
        .map-title {
          position: absolute;
          top: 0.2rem;
          left: 0.2rem;
          width: 1.3rem;
          height: 0.5rem;
          line-height: 0.5rem;
          font-size: 0.16rem;
          font-weight: 500;
          color: #70caee;
          text-align: center;
        }
        .map-center {
          position: absolute;
          top: 0.2rem;
          left: 1.7rem;
          height: 0.5rem;
          line-height: 0.5rem;
          padding: 0 0.12rem;
          font-size: 0.14rem;
          font-weight: 500;
          color: #70CAEE;
        }
        .farm-count {
          position: absolute;
          top: 0.2rem;
          right: 2.3rem;
          width: 1.96rem;
          height: 0.8rem;
          display: flex;
          align-items: center;
          background: url("../../assets/image/farm_map_right_icon3.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
          .farm-machine-icon {
            width: 40%;
            text-align: center;
            .svg-icon {
              width: 0.24rem;
              height: 0.2rem;
            }
          }
          .farm-count-info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 60%;
            .label {
              font-size: 0.12rem;
              // color: #417fc8;
              color: #fff;
              margin-top: 0.1rem;
            }
            .value {
              font-size: 0.3rem;
              line-height: 0.3rem;
              font-weight: 500;
              i {
                color: #B8E2FF;
                font-size: 0.14rem;
              }
            }
          }
        }
        .people-count {
          position: absolute;
          top: 0.2rem;
          right: 0.2rem;
          width: 1.96rem;
          height: 0.8rem;
          display: flex;
          align-items: center;
          background: url("../../assets/image/farm_map_right_icon3.png");
          // background: url("../../assets/image/farm_map_right_icon2.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
          .farm-member-icon {
            width: 40%;
            text-align: center;
            .svg-icon {
                width: 0.24rem;
                height: 0.2rem;
            }
          }
          .people-count-info {
            width: 50%;
            .label {
              font-size: 0.12rem;
              color: #fff;
              margin-top: 0.1rem;
            }
            .value {
              font-size: 0.3rem;
              line-height: 0.3rem;
              font-weight: 500;
              i {
                color: #B8E2FF;
                font-size: 0.14rem;
              }
            }
          }
        }
        .map-reset-btn {
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          bottom: 1rem;
          right: 0.2rem;
          width: 0.36rem;
          height: 0.36rem;
          cursor: pointer;
          .svg-icon {
            width: 0.19rem;
            height: 0.19rem;
          }
        }
        .zoom-container {
          display: flex;
          flex-direction: column;
          position: absolute;
          bottom: 0.2rem;
          right: 0.2rem;
          width: 0.36rem;
          height: 0.7rem;
          padding: 0.03rem;
          .zoom-plus,
          .zoom-sub {
            display: flex;
            justify-content: center;
            align-items: center;
            flex: 1;
            cursor: pointer;
          }
          .zoom-plus {
            border-bottom: 1px solid #1F4071;
            .svg-icon {
              width: 0.16rem;
              height: 0.16rem;
            }
          }
          .zoom-sub {
            .svg-icon {
              width: 0.16rem;
              height: 2px;
            }
          }
        }
      }
    }
    .middle-bottom {
      height: 28.3505%;
      .middle-bottom-content {
        width: 100%;
        height: 100%;
        padding: 0 0.22rem 0.22rem 0.22rem;
        .warning-list-wrapper {
          width: 100%;
          height: calc(100% - 0.42rem);
        }
      }
    }
  }
  .right-side {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 17.02%;
    .right-side-top {
      height: 32.9896%;
    }
    .right-side-bottom {
      height: 64.9484%;
      overflow-y: scroll;
      .content-item-container {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: calc(100% - 0.3rem);
        .field-content-item {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          flex: 2;
          margin-top: 0.12rem;
          .info-row {
            display: flex;
            margin-top: 0.06rem;
            padding-left: 0.15rem;
            .info-item {
              flex: 1;
              .title {
                font-size: 0.14rem;
                color: #f0f0f0;
                // color: #417fc8;
              }
              .value {
                font-size: 0.3rem;
                font-weight: bold;
                color: #29E3FD;
                // color: #2eabff;
                i {
                  font-size: 0.14rem;
                  // color: #2eabff;
                }
              }
            }
            .info-item + .info-item {
              margin-left: 0.1rem;
            }
          }
          &:last-child {
            flex: 1;
            justify-content: flex-start;
            .info-row {
              display: block;
            }
          }
        }
      }
    }
  }
  .field-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 0.22rem;
  }
}

#area-chart,
#production-chart,
#water-area-chart,
#water-production-chart {
  width: calc(100% - 0.01rem);
  height: calc(100% - 0.01rem);
}

</style>
<style lang="scss">
.farm-stock-container {
  .dv-scroll-board {
    .row-item {
      .cell {
        font-size: 12px;
      }
    }
  }
}
</style>
