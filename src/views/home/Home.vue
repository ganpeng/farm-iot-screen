<template>
  <div class="home-container">
    <div class="left-field border-icon25">
      <div class="left-field-title">
        <div class="title-one title-one-header-icon white">
          <h5>
            <svg-icon class="title-icon" icon-class="title_icon"></svg-icon
            >全省概况
          </h5>
        </div>
      </div>
      <div class="left-field-content">
        <div class="left-top-field">
          <div class="title-one big">
            <h5><i class="point"></i> 2019年比例及产值</h5>
          </div>
          <div class="left-top-content">
            <div class="left-chart">
              <dv-active-ring-chart
                class="ring-chart"
                :config="leftTopChartConfig"
              />
            </div>
            <div class="right-label-list">
              <div class="label-list">
                <div
                  v-for="(item, index) in production2019"
                  :key="index"
                  class="label-item"
                >
                  <div
                    :style="`background-color: ${item.color}`"
                    class="icon"
                  ></div>
                  <div class="name">{{ item.name }}</div>
                  <div class="value my-font">
                    {{ item.value }}&nbsp;<i class="unit">亿元</i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="left-middle-field">
          <div class="title-one big">
            <h5><i class="point"></i> 历年产值(亿元)</h5>
          </div>
          <div class="left-middle-content">
            <div class="tab-wrapper">
              <multi-tab
                :tabList="tabListOne"
                :tabChangeHandler="leftMiddleTabChangeHandler"
              ></multi-tab>
            </div>
            <div class="chart-label">
              <div class="label-list">
                <div
                  v-for="(label, index) in production20YearsLabelList"
                  :key="index"
                  class="label-item"
                >
                  <div
                    :style="`background-color: ${label.color};`"
                    class="icon"
                  ></div>
                  <div class="name">{{ label.name }}</div>
                </div>
              </div>
            </div>
            <div class="chart-container">
              <div id="left-middle-chart"></div>
            </div>
          </div>
        </div>
        <div class="left-bottom-field">
          <div class="title-one big">
            <h5>
              <i class="point"></i> 吉林的一天
              <div class="prompt border-icon52">
                吉林省平均每天主要农作物产量
              </div>
            </h5>
          </div>
          <div class="left-bottom-content">
            <div class="tab-wrapper">
              <multi-tab
                :tabList="aDayInJilin"
                :tabChangeHandler="leftBottomTabChangeHandler"
              ></multi-tab>
            </div>
            <div class="day-list">
              <div
                v-for="(day, index) in aDayInJilinActiveData"
                :key="index"
                class="day-item"
              >
                <div class="left-icon">
                  <svg-icon :icon-class="`aday_icon${index + 1}`"></svg-icon>
                </div>
                <div class="right-info">
                  <div class="name">{{ day.name }}</div>
                  <div class="value my-font">
                    {{ day.value }}
                    <i class="unit">{{ day.unit }}</i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right-field">
      <div class="right-top-field border-icon50">
        <div class="title-one big">
          <h5><i class="point"></i> 各市农况</h5>
        </div>
        <div class="right-top-content">
          <div class="left-map-field">
            <div class="map-container border-icon53">
              <div id="my-map"></div>
              <div class="prompt">数据来源：国家统计局、吉林省统计局统计公报</div>
            </div>
          </div>
          <div class="right-tab-field">
            <div class="tab-container">
              <div class="tab-title">
                {{ selectedCity }}农业增加值(2019年)
                <div class="prompt-icon">
                  <svg-icon icon-class="home_prompt_icon"></svg-icon>
                  <div class="prompt border-icon52">
                    增加值：总产值扣除中间投入后的余额
                  </div>
                </div>
              </div>
              <div class="tab-list border-icon54">
                <div class="tab-item">
                  <div class="tab-inner-item">产业</div>
                  <div class="tab-inner-item">增加值(亿元)</div>
                  <div class="tab-inner-item">同比增长</div>
                </div>
                <div
                  v-for="(item, index) in selectedCityData.data1"
                  :key="index"
                  class="tab-item"
                >
                  <div class="tab-inner-item">{{ item.industry }}</div>
                  <div class="tab-inner-item">{{ item.addedValue }}</div>
                  <div :class="['tab-inner-item', item.growth < 0 && 'danger']">{{ item.growth }}{{ item.growth !== '/' ? '%' : ''}}</div>
                </div>
              </div>
            </div>
            <div class="tab-container">
              <div class="tab-title">
                {{ selectedCity }}主要农副产品产量(2019年)
              </div>
              <div class="tab-list border-icon54">
                <div class="tab-item">
                  <div class="tab-inner-item">类别</div>
                  <div class="tab-inner-item">产量(万吨)</div>
                  <div class="tab-inner-item">同比增长</div>
                </div>
                <div
                  v-for="(item, index) in selectedCityData.data2"
                  :key="index"
                  class="tab-item"
                >
                  <div class="tab-inner-item">{{ item.industry }}</div>
                  <div class="tab-inner-item">{{ item.addedValue }}</div>
                  <div :class="['tab-inner-item', item.growth < 0 && 'danger']">{{ item.growth }}{{ item.growth !== '/' ? '%' : ''}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right-bottom-field border-icon51">
        <div class="title-one white">
          <h5>
            <svg-icon class="title-icon" icon-class="title_icon"></svg-icon
            > 作物详情
            <div class="prompt border-icon52">
              近20年吉林省主要作物播种面积和产量趋势图
            </div>
          </h5>
        </div>
        <div class="right-bottom-content">
          <div class="label-list">
            <div
              v-for="(item, index) in farmProduceData20Years.valueList"
              :key="index"
              @click="toggleFarmProduceDataLabel(index)"
              :class="['label-item', !item.active && 'disabled']"
            >
              <div
                class="icon"
                :style="`background-color: ${item.color}`"
              ></div>
              <div class="name">{{ item.name }}</div>
            </div>
          </div>
          <div class="chart-container">
            <div id="right-bottom-chart"></div>
          </div>
          <div class="farm-product-tab">
            <div
              @click="farmProductTabChangeHandler('prod')"
              :class="[
                'farm-product-tab-item',
                farmProduceActiveTab === 'prod' && 'active',
              ]"
            >
              产量(万吨)
            </div>
            <div
              @click="farmProductTabChangeHandler('area')"
              :class="[
                'farm-product-tab-item',
                farmProduceActiveTab === 'area' && 'active',
              ]"
            >
              播种面积(千公顷)
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import _ from "lodash";
import echarts from "echarts";
import constants from "@/util/homeConstants";
import MultiTab from "./MultiTab";
import jilinJson from "./jilin";
export default {
  name: "Home",
  components: { MultiTab },
  data() {
    return {
      tabListOne: constants.tabListOne,
      production2019: constants.production2019,
      production20Years: constants.production20Years,
      aDayInJilin: _.reverse(constants.aDayInJilin),
      farmProduceData20Years: _.cloneDeep(constants.farmProduceData20Years),
      mapData: constants.mapData,
      cityList: _.cloneDeep(constants.cityList),
      aDayInJilinActiveIndex: 0,
      leftTopChartConfig: {},
      leftMiddleChartActiveIndex: 0,
      farmProduceActiveTab: "prod",
      selectedCity: "长春市",
    };
  },
  async created() {
    try {
      await this.$nextTick();
      this.leftTopChartConfig = this.getLeftTopChartConfig();
      this.initLeftMiddleChart(this.filterData(0));
      this.initRightBottomChart(this.serializeData());
      this.initMyMap();
    } catch (err) {
      console.log(err);
    }
  },
  computed: {
    production20YearsLabelList() {
      return this.production20Years.valueList;
    },
    aDayInJilinActiveData() {
      return _.get(this.aDayInJilin, `${this.aDayInJilinActiveIndex}.data`);
    },
    selectedCityData() {
      return _.get(this.mapData, `${this.selectedCity}`);
    },
  },
  methods: {
    serializeData() {
      let { labelList, valueList } = this.farmProduceData20Years;
      let newValueList = _.cloneDeep(valueList)
                          .filter((item) => {
                            return item.active;
                          })
                          .map((item) => {
                            item.data = _.get(item, `${this.farmProduceActiveTab}`);
                            return item;
                          });
      return {
        labelList,
        valueList: newValueList,
      };
    },
    filterData(index) {
      let { labelList, valueList } = _.cloneDeep(this.production20Years);
      let sliceIndex = labelList.length - (index + 1) * 5;
      let newLabelList = _.slice(labelList, sliceIndex);
      let newValueList = valueList.map((item) => {
        let data = _.slice(item.data, sliceIndex);
        item.data = data;
        return item;
      });
      return {
        labelList: newLabelList,
        valueList: newValueList,
      };
    },
    leftMiddleTabChangeHandler(index) {
      this.initLeftMiddleChart(this.filterData(index));
    },
    leftBottomTabChangeHandler(index) {
      this.aDayInJilinActiveIndex = index;
    },
    getLeftTopChartConfig() {
      return Object.assign({}, this.$util.ringChartDefaultConfig, {
        data: this.production2019,
      });
    },
    farmProductTabChangeHandler(farmProduceActiveTab) {
      this.farmProduceActiveTab = farmProduceActiveTab;
      this.initRightBottomChart(this.serializeData());
    },
    toggleFarmProduceDataLabel(index) {
      let { valueList } = this.farmProduceData20Years;
      let newValueList = _.cloneDeep(valueList).map((item, _index) => {
        if (index === _index) {
          item.active = !item.active;
        }
        return item;
      });
      this.farmProduceData20Years.valueList = newValueList;
      this.initRightBottomChart(this.serializeData());
    },
    async initLeftMiddleChart(data) {
      try {
        await this.$nextTick();
        let initLeftMiddleChartDom = document.querySelector(
          "#left-middle-chart"
        );
        let leftMiddleChart = echarts.init(initLeftMiddleChartDom);
        this.leftMiddleChart = leftMiddleChart;
        // 为echarts对象加载数据
        leftMiddleChart.clear();
        leftMiddleChart.setOption(this.leftMiddleChartConfig(data), true);

        window.addEventListener(
          "resize",
          () => {
            window.setTimeout(() => {
              this.leftMiddleChart.resize();
            }, 200);
          },
          false
        );
      } catch (err) {
        console.log(err);
      }
    },
    async initRightBottomChart(data) {
      try {
        await this.$nextTick();
        let initRightBottomChartDom = document.querySelector(
          "#right-bottom-chart"
        );
        let rightBottomChart = echarts.init(initRightBottomChartDom);
        this.rightBottomChart = rightBottomChart;
        // 为echarts对象加载数据
        rightBottomChart.clear();
        rightBottomChart.setOption(this.rightBottomChartConfig(data), true);

        window.addEventListener(
          "resize",
          () => {
            window.setTimeout(() => {
              this.rightBottomChart.resize();
            }, 200);
          },
          false
        );
      } catch (err) {
        console.log(err);
      }
    },
    mapChartSelectHandler(param) {
      let {name} = param;
      this.selectedCity = name;
      this.cityList = this.cityList.map((item) => {
        if (item.name === name) {
          item.selected = true;
        } else {
          item.selected = false;
        }
        return item;
      })
      this.mapChart.clear();
      this.mapChart.setOption(this.mapOption(), true);
      this.mapChart.on("click", this.mapChartSelectHandler);
    },
    async initMyMap() {
      try {
        await this.$nextTick();
        echarts.registerMap("jilin", jilinJson);
        let initMapChartDom = document.querySelector("#my-map");
        let mapChart = echarts.init(initMapChartDom);
        this.mapChart = mapChart;
        // 为echarts对象加载数据
        mapChart.clear();
        mapChart.setOption(this.mapOption(), true);
        mapChart.on("click", this.mapChartSelectHandler);
        window.addEventListener(
          "resize",
          () => {
            window.setTimeout(() => {
              this.mapChart.resize();
            }, 200);
          },
          false
        );
      } catch (err) {
        console.log(err);
      }
    },
    mapOption() {
      return {
        // backgroundColor: 'rgba(0, 0, 0, 0.4)',
        backgroundColor: "transparent",
        geo: {
            show: true,
            map: 'jilin',
            aspectScale: 0.8, //保持原始比例
            zoom: 1.2,
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: false,
                }
            },
            roam: false,//地图设置不可拖拽，固定的
            itemStyle: {
                normal: {
                    areaColor: '#006fff',
                    borderWidth: 0,
                    shadowColor: '#65F7FE',
                    shadowBlur: 10
                }
            }
        },
        series: [
          {
            type: "map",
            map: "jilin",
            data: this.cityList,
            aspectScale: 0.8, //保持原始比例
            zoom: 1.2,
            roam: false,
            label: {
              normal: {
                show: true,
                color: "#fff",
              },
              textStyle: {
                fontSize: 10,
              },
              emphasis: {
                show: true,
                fontSize: 12,
                color: "#fff",
              },
            },
            itemStyle: {
              normal: {
                label: { show: true },
                borderColor: "rgba(147, 235, 248, 1)",
                borderWidth: 1
              },
              emphasis: {
                //鼠标移入高亮显颜色
                areaColor: "#0078D3",
              }
            }
          }
        ],
        dataRange: {
          x: "-1000 px", //图例横轴位置
          y: "-1000 px", //图例纵轴位置
          splitList: this.cityList
        }
      };
    },
    leftMiddleChartConfig(data) {
      return {
        color: data.valueList.map((item) => item.color),
        tooltip: {
          trigger: "item",
          formatter: (params) => {
            return `<span>${params.name}</span><br />
                    <span>${params.seriesName}</span>: <span style="color: ${params.color};">${params.value}</span>`;
          },
        },
        grid: {
          top: "5%",
          left: 60,
          right: "3%",
          bottom: "18%",
        },
        xAxis: {
          type: "category",
          data: data.labelList,
          axisLabel: {
            fontSize: 12,
            color: "#52B5E4",
          },
          axisLine: {
            lineStyle: {
              color: "#3E495E",
            },
          },
        },
        yAxis: {
          type: "value",
          name: "亿元",
          position: "left",
          nameLocation: "start",
          nameTextStyle: {
            color: "#52B5E4",
            padding: [0, 0, 0, -40]
          },
          axisLabel: {
            fontSize: 12,
            color: "#52B5E4",
          },
          axisLine: {
            lineStyle: {
              color: "#3E495E",
            },
          },
          splitLine: {
            lineStyle: {
              type: "dashed",
              color: ["#3D485D"],
            },
          },
        },
        series: data.valueList,
      };
    },
    rightBottomChartConfig(data) {
      return {
        color: data.valueList.map((item) => item.color),
        tooltip: {
          trigger: "item",
          formatter: (params) => {
            console.log(params);
            return `<span>${params.name}</span><br />
                    <span>${params.seriesName}</span>: <span style="color: ${params.color};">${params.value}</span>`;
          },
        },
        grid: {
          top: "5%",
          left: 60,
          right: "3%",
          bottom: "15%",
        },
        xAxis: {
          type: "category",
          data: data.labelList,
          axisLabel: {
            fontSize: 12,
            color: "#52B5E4",
          },
          axisLine: {
            lineStyle: {
              color: "#3E495E",
            },
          },
        },
        yAxis: {
          type: "value",
          name: this.farmProduceActiveTab === "area" ? "千公顷" : "万吨",
          position: "left",
          nameLocation: "start",
          nameTextStyle: {
            color: "#52B5E4",
            padding: [0, 0, 0, -40]
          },
          axisLabel: {
            fontSize: 12,
            color: "#52B5E4",
          },
          axisLine: {
            lineStyle: {
              color: "#3E495E",
            },
          },
          splitLine: {
            lineStyle: {
              type: "dashed",
              color: ["#3D485D"],
            },
          },
        },
        series: data.valueList,
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.home-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: calc(100% - 0.8rem);
  padding: 0.2rem;
  padding-top: 0.12rem;
  overflow: hidden;
  .title-one {
    .prompt {
      font-size: 0.12rem;
      color: #b6d8ff;
      padding: 0.04rem 0.2rem;
      margin-left: 0.1rem;
    }
  }
  .left-field {
    width: 25.26%;
    height: 100%;
    padding: 0.2rem;
    .left-field-title {
      display: flex;
      align-items: center;
      width: 100%;
      height: 0.3rem;
      .title-one {
        width: 100%;
      }
    }
    .left-field-content {
      width: 100%;
      height: calc(100% - 0.3rem);
      .left-top-field {
        width: 100%;
        height: 26%;
        .left-top-content {
          display: flex;
          width: 100%;
          height: calc(100% - 0.42rem);
          .left-chart {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 50%;
            height: 100%;
            .ring-chart {
              width: 1.62rem;
              height: 1.62rem;
            }
          }
          .right-label-list {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 50%;
            height: 100%;
            .label-list {
              .label-item {
                display: flex;
                align-items: center;
                .icon {
                  width: 0.1rem;
                  height: 0.1rem;
                  margin-bottom: 0.02rem;
                }
                .name {
                  font-size: 0.14rem;
                  color: #fff;
                  margin-left: 0.04rem;
                  margin-right: 0.4rem;
                  margin-bottom: 0.02rem;
                }
                .value {
                  font-size: 0.22rem;
                  color: #00dcff;
                  .unit {
                    font-size: 0.12rem;
                  }
                }
              }
              .label-item + .label-item {
                margin-top: 0.12rem;
              }
            }
          }
        }
      }
      .left-middle-field {
        width: 100%;
        height: calc(37% - 0.1rem);
        margin-top: 0.1rem;
        .left-middle-content {
          width: 100%;
          height: calc(100% - 0.42rem);
          .tab-wrapper {
            width: 80%;
            margin: 0.1rem auto;
          }
          .chart-label {
            width: 60%;
            height: 0.2rem;
            margin: 0 auto;
            .label-list {
              display: flex;
              justify-content: space-between;
              align-items: center;
              .label-item {
                display: flex;
                align-items: center;
                height: 0.2rem;
                color: #f0f0f0;
                font-size: 0.12rem;
                .icon {
                  width: 0.12rem;
                  height: 0.02rem;
                  margin-right: 0.04rem;
                }
              }
            }
          }
          .chart-container {
            width: 100%;
            height: calc(100% - 0.66rem);
            #left-middle-chart {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      .left-bottom-field {
        width: 100%;
        height: calc(37% - 0.1rem);
        margin-top: 0.1rem;
        .left-bottom-content {
          width: 100%;
          height: calc(100% - 0.42rem);
          .tab-wrapper {
            width: 80%;
            margin: 0.1rem auto;
          }
          .day-list {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            width: 80%;
            height: calc(100% - 0.46rem);
            margin: 0 auto;
            .day-item {
              display: flex;
              width: 50%;
              .left-icon {
                margin-right: 0.1rem;
                .svg-icon {
                  width: 0.46rem;
                  height: 0.44rem;
                }
              }
              .right-info {
                .name {
                  color: #fff;
                  font-size: 0.14rem;
                }
                .value {
                  color: #00dcff;
                  font-size: 0.3rem;
                  .unit {
                    font-size: 0.14rem;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .right-field {
    width: calc(74.74% - 0.2rem);
    height: 100%;
    .right-top-field {
      width: 100%;
      height: calc(64.44% - 0.2rem);
      padding: 0.1rem 0.2rem 0.16rem 0.2rem;
      .right-top-content {
        display: flex;
        width: 100%;
        height: calc(100% - 0.42rem);
        .left-map-field {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 68.63%;
          height: 100%;
          .map-container {
            width: 90%;
            height: calc(100% - 0.4rem);
            #my-map {
              width: 100%;
              height: 100%;
            }
          }
          .prompt {
            position: absolute;
            left: 0;
            bottom: 0;
            color: #B6D8FF;
            font-size: 0.12rem;
          }
        }
        .right-tab-field {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 31.37%;
          height: 100%;
          .tab-container {
            width: 90%;
            height: calc(50% - 0.05rem);
            .tab-title {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 100%;
              height: 0.3rem;
              line-height: 0.3rem;
              color: #70caee;
              font-size: 0.14rem;
              text-align: center;
              .prompt-icon {
                position: relative;
                .svg-icon {
                  width: 0.15rem;
                  height: 0.15rem;
                  margin-left: 0.08rem;
                  cursor: pointer;
                }
                .prompt {
                  display: none;
                  position: absolute;
                  top: -0.3rem;
                  right: 0;
                  white-space: nowrap;
                  padding: 0 0.3rem;
                  font-size: 0.12rem;
                  color: #b6d8ff;
                }
              }
              &:hover {
                .prompt {
                  display: block;
                }
              }
            }
            .tab-list {
              display: flex;
              flex-direction: column;
              width: 100%;
              height: calc(100% - 0.3rem);
              padding: 0.02rem;
              .tab-item {
                display: flex;
                align-items: center;
                justify-content: space-around;
                flex: 1;
                font-size: 0.14rem;
                font-weight: 400;
                .tab-inner-item {
                  flex: 1;
                  text-align: center;
                  &:nth-of-type(1) {
                    color: #b6d8ff;
                  }
                  &:nth-of-type(2) {
                    color: #ebd54b;
                  }
                  &:nth-of-type(3) {
                    color: #70caee;
                  }
                  &.danger {
                    color: #FF6E6E;
                  }
                }
              }
              .tab-item:nth-child(odd) {
                background-color: #152b4c;
              }
              .tab-item:nth-child(even) {
                background-color: #101b36;
              }
              .tab-item:first-child {
                .tab-inner-item {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: #fff;
                  height: 100%;
                  background-color: #1b3f67;
                }
              }
            }
          }
          .tab-container + .tab-container {
            margin-top: 0.1rem;
          }
        }
      }
    }
    .right-bottom-field {
      position: relative;
      width: 100%;
      height: 35.56%;
      margin-top: 0.2rem;
      padding: 0.1rem 0.2rem;
      .right-bottom-content {
        width: 100%;
        height: calc(100% - 0.42rem);
        .label-list {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 0.2rem;
          .label-item {
            display: flex;
            align-items: center;
            cursor: pointer;
            .icon {
              width: 0.12rem;
              height: 0.12rem;
              margin-right: 0.04rem;
            }
            .name {
              color: #fff;
              font-size: 0.14rem;
            }
            &.disabled {
              .icon {
                background-color: #27334F!important;
              }
              .name {
                color: #667799;
              }
            }
          }
          .label-item + .label-item {
            margin-left: 0.2rem;
          }
        }
        .chart-container {
          width: 100%;
          height: calc(100% - 0.2rem);
          #right-bottom-chart {
            width: 100%;
            height: 100%;
          }
        }
        .farm-product-tab {
          display: flex;
          align-items: center;
          position: absolute;
          right: 0.4rem;
          top: 0.16rem;
          width: 2.8rem;
          height: 0.34rem;
          .farm-product-tab-item {
            flex: 1;
            text-align: center;
            line-height: 0.34rem;
            font-size: 0.14rem;
            color: #b6d8ff;
            border-top: 1px solid #1f4071;
            border-bottom: 1px solid #1f4071;
            border-left: 1px solid #1f4071;
            background-color: #0b142b;
            cursor: pointer;
            &:first-child {
              border-radius: 0.04rem 0 0 0.04rem;
            }
            &:last-child {
              border-right: 1px solid #1f4071;
              border-radius: 0 0.04rem 0.04rem 0;
            }
            &:hover {
              color: #fff;
              background-color: #176C9F;
            }
            &.active {
              color: #fff;
              background-color: #1a8dd2;
            }
          }
        }
      }
    }
  }
}
</style>
