<template>
  <div class="farm-stock-data-container container">
    <farm-aside-nav></farm-aside-nav>
    <div class="content">
      <div class="title-wrapper">
        <div class="tab-list">
          <div
            @click="changeTab(0)"
            :class="['tab-item', activeIndex === 0 && 'active']"
          >
            设备数据
          </div>
          <div
            @click="changeTab(1)"
            :class="['tab-item', activeIndex === 1 && 'active']"
          >
            企业数据
          </div>
        </div>
        <div class="farm-title">{{ farm.name }}</div>
      </div>
      <div v-if="activeIndex === 1" class="tab-content">
        <div class="data-chart-container">
          <div class="data-charts">
            <div class="data-chart-item border-icon6">
              <div class="title">
                <span>地块数据<i>(公顷)</i></span>
                <svg-icon icon-class="chart_title_icon"></svg-icon>
              </div>
              <div class="label-tag-wrapper">
                <label-tag :labelList="labelList1"></label-tag>
              </div>
              <div class="charts-wrapper">
                <div id="land-chart"></div>
              </div>
            </div>
            <div class="data-chart-item border-icon6">
              <div class="title">
                <span>从业人员<i>(人)</i></span>
                <svg-icon icon-class="chart_title_icon"></svg-icon>
              </div>
              <div class="label-tag-wrapper">
                <label-tag :labelList="labelList2"></label-tag>
              </div>
              <div class="charts-wrapper">
                <div id="member-chart"></div>
              </div>
            </div>
            <div class="data-chart-item border-icon6">
              <div class="title">
                <span>农机具<i>(台)</i></span>
                <svg-icon icon-class="chart_title_icon"></svg-icon>
              </div>
              <div class="label-tag-wrapper">
                <label-tag :labelList="labelList3"></label-tag>
              </div>
              <div class="charts-wrapper">
                <!-- <dv-charts :option="machineOption"/> -->
                <div id="machine-chart"></div>
              </div>
            </div>
          </div>
          <div class="data-charts">
            <div class="data-chart-item border-icon6">
              <div class="title">
                <span>产量数据<i>(吨)</i></span>
                <svg-icon icon-class="chart_title_icon"></svg-icon>
              </div>
              <div class="label-tag-wrapper">
                <label-tag :labelList="labelList4"></label-tag>
              </div>
              <div class="charts-wrapper">
                <div id="plant-chart"></div>
              </div>
            </div>
            <div class="data-chart-item border-icon6">
              <div class="title">
                <span>投入品<i>(吨)</i></span>
                <svg-icon icon-class="chart_title_icon"></svg-icon>
              </div>
              <div class="label-tag-wrapper">
                <label-tag :labelList="labelList5"></label-tag>
              </div>
              <div class="charts-wrapper">
                <div id="input-chart"></div>
              </div>
            </div>
            <div class="data-chart-item border-icon6">
              <div class="title">
                <span>经营数据<i>(万元)</i></span>
                <svg-icon icon-class="chart_title_icon"></svg-icon>
              </div>
              <div class="label-tag-wrapper">
                <label-tag :labelList="labelList6"></label-tag>
              </div>
              <div class="charts-wrapper">
                <div id="operating-chart"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="activeIndex === 0" class="tab-content device-content">
        <div class="title-one big">
          <div class="wrapper">
            <h5>
              <svg-icon class="title-icon" icon-class="title_icon"></svg-icon
              >实时数据
            </h5>
            <v-select
              class="my-vue-select"
              label="name"
              v-model="selectedSensor"
              @input="changeSensorHandler"
              :options="sensorList"
            >
              <div slot="no-options">无数据</div>
            </v-select>
          </div>
        </div>
        <sensor-data :list="sensorDataList"></sensor-data>
        <div class="title-one big">
          <div class="wrapper">
            <h5>
              <svg-icon class="title-icon" icon-class="title_icon"></svg-icon
              >趋势图
            </h5>
          </div>
        </div>
        <div class="trend-chart-container border-icon18">
          <!-- <trend-chart-two ref="trendChart"></trend-chart-two> -->
          <trend-chart-two
            :deviceName="selectedSensorDeviceName"
            :sensorType="sensorType"
            ref="trendChart"
          ></trend-chart-two>
        </div>
        <div class="device-bottom-container">
          <div class="device-type-chart-wrapper">
            <div class="title-one big">
              <div class="wrapper">
                <h5>
                  <svg-icon
                    class="title-icon"
                    icon-class="title_icon"
                  ></svg-icon
                  >数据统计
                </h5>
              </div>
            </div>
            <div class="device-type-chart-container">
              <div class="data-chart-wrapper border-icon6">
                <div class="title">
                  <span>设备种类<i>(个)</i></span>
                  <svg-icon icon-class="chart_title_icon"></svg-icon>
                </div>
                <div class="label-tag-wrapper">
                  <label-tag :labelList="labelList7"></label-tag>
                </div>
                <div class="charts-wrapper">
                  <div id="device-chart"></div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="controllerList.length > 0" class="controller-info-wrapper">
            <div class="title-one big">
              <div class="wrapper">
                <h5>
                  <svg-icon
                    class="title-icon"
                    icon-class="title_icon"
                  ></svg-icon
                  >智能设备
                </h5>
                <v-select
                  v-if="controllerList.length > 0"
                  class="my-vue-select"
                  label="name"
                  v-model="selectedController"
                  @input="changeControllerHandler"
                  :options="controllerList"
                >
                  <div slot="no-options">无数据</div>
                </v-select>
                <h6
                  class="vr-btn"
                  v-if="controllerLastData.length > 0 && showControllerBtn"
                  @click="ControlHandler"
                >
                  切换模式
                </h6>
                <div class="controller-status">
                  <span v-if="selectedController.deviceStatus === 'ONLINE'">
                    <i class="on"></i>
                    在线
                  </span>
                  <span v-if="selectedController.deviceStatus === 'OFFLINE'">
                    <i class="off"></i>
                    离线
                  </span>
                </div>
              </div>
            </div>
            <div class="controller-content border-icon57">
              <div
                v-if="controllerLastData.length > 0"
                class="controller-content-inner-wrapper"
              >
                <div class="current-mode-title">
                  当前模式：{{ currentModeLabel }}
                </div>
                <div class="current-mode-content">
                  <div v-if="controllerTabActiveIndex === 0" class="controller-tab-content-item">
                      <ul class="dcfkg-list">
                        <li v-for="index in 10" :key="index" class="dcfkg-item">
                          <span class="title"><i :class="[ controllerDataByProp(`Dcfkg${padZero(index)}`) === '1' ? 'online' : 'offline']">•</i>电磁阀{{padZero(index)}} &nbsp;</span>
                        </li>
                      </ul>
                      <div class="ben-wrapper">
                        <div class="ben">
                          <span class="title"><i :class="[ controllerDataByProp(`SubmesriblePump`) === '1' ? 'online' : 'offline']">•</i>潜水泵 &nbsp;</span>
                        </div>
                        <div class="ben">
                          <span class="title"><i :class="[ controllerDataByProp(`SubmersiblePump2`) === '1' ? 'online' : 'offline']">•</i>潜水泵02 &nbsp;</span>
                        </div>
                      </div>
                      <div class="ben">
                        <span class="title"><i :class="[ controllerDataByProp(`PipelinePump`) === '1' ? 'online' : 'offline']">•</i>管道泵 &nbsp;</span>
                      </div>
                  </div>
                  <div
                    v-if="controllerTabActiveIndex === 1"
                    class="controller-tab-content-item"
                  >
                    <div class="info-item">
                      <div class="label">轮灌间隔(秒)</div>
                      <div class="value">
                        {{ controllerDataByProp("RotIrrItva") || "/" }}
                      </div>
                    </div>
                    <div class="info-item">
                      <div class="label">轮灌次数</div>
                      <div class="value">
                        {{ controllerDataByProp("RotIrrCount") || "/" }}
                      </div>
                    </div>
                    <div class="info-item">
                      <div class="label">单个阀门运行时间(秒)</div>
                      <div class="value">
                        {{ controllerDataByProp("SingleValveRunTime") || "/" }}
                      </div>
                    </div>
                  </div>
                  <div
                    v-if="controllerTabActiveIndex === 2"
                    class="controller-tab-content-item"
                  >
                    <div class="info-item">
                      <div class="label">轮灌间隔(秒)</div>
                      <div class="value">
                        {{ controllerDataByProp("RotIrrItva") || "/" }}
                      </div>
                    </div>
                    <div class="info-item">
                      <div class="label">轮灌次数</div>
                      <div class="value">
                        {{ controllerDataByProp("RotIrrCount") || "/" }}
                      </div>
                    </div>
                    <div class="info-item">
                      <div class="label">单个阀门运行时间(秒)</div>
                      <div class="value">
                        {{ controllerDataByProp("SingleValveRunTime") || "/" }}
                      </div>
                    </div>
                    <div class="info-item">
                      <div class="label">定时运行间隔(天)</div>
                      <div class="value">
                        {{ controllerDataByProp("IntervalDays") || "/" }}
                      </div>
                    </div>
                    <div class="info-item">
                      <div class="label">定时开始时间</div>
                      <div class="value">
                        {{ controllerDataByProp("TimingHour") }}:{{
                          controllerDataByProp("TimingMinute")
                        }}
                      </div>
                    </div>
                    <div class="info-item">
                      <div class="label">定时结束日期</div>
                      <div class="value">
                        {{ controllerDataByProp("EndYear") }}-{{
                          controllerDataByProp("EndMonth")
                        }}-{{ controllerDataByProp("EndDay") }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="empty-container">
                <svg-icon icon-class="empty_icon"></svg-icon>
                <div class="tips">暂无数据</div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="insectSituationList.length > 0" class="title-one big">
          <div class="wrapper">
            <h5>
              <svg-icon class="title-icon" icon-class="title_icon"></svg-icon
              >虫情设备
            </h5>
            <v-select
              class="my-vue-select"
              label="name"
              v-model="selectedInsectSituation"
              @input="changeInsectSituationHandler"
              :options="insectSituationList"
            >
              <div slot="no-options">无数据</div>
            </v-select>
          </div>
        </div>
        <div
          v-if="insectSituationList.length > 0"
          class="insect-situation-wrapper"
        >
          <insect-situation
            :deviceName="selectedInsectSituationDeviceName"
            :name="selectedInsectSituation.name"
            ref="insectSituation"
          ></insect-situation>
        </div>
      </div>
    </div>
    <controller-dialog
      :deviceName="selectedControllerDeviceName"
      :controller="selectedController"
      ref="controllerDialog"
    ></controller-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import _ from "lodash";
import echarts from "echarts";
import constants from "@/util/constants";
import label from "@/util/label";
import LabelTag from "@/components/LabelTag";
import FarmAsideNav from "./components/FarmAsideNav";
import SensorData from "./components/SensorData";
import TrendChartTwo from "./components/TrendChartTwo";
import ControllerDialog from "./components/ControllerDialog";
import InsectSituation from "./trace/InsectSituation";
export default {
  name: "FarmStockData",
  components: {
    FarmAsideNav,
    SensorData,
    LabelTag,
    TrendChartTwo,
    ControllerDialog,
    InsectSituation,
  },
  data() {
    return {
      activeIndex: 0,
      labelList1: label.labelList1,
      labelList2: label.labelList2,
      labelList3: label.labelList3,
      labelList4: label.labelList4,
      labelList5: label.labelList5,
      labelList6: label.labelList6,
      labelList7: label.labelList7,
      landChart: null,
      memberChart: null,
      machineChart: null,
      inputChart: null,
      operatingChart: null,
      plantChart: null,
      deviceChart: null,
      statisticsData: {
        landStatisticsList: [],
        memberStatisticsList: [],
        machineryStatisticsList: [],
        inputStatisticsList: [],
        operatingStatisticsList: [],
        plantStatisticsList: [],
        deviceStatisticsList: [],
      },
      sensorDataList: [],
      selectedLand: "",
      landList: [],
      landCode: "",
      selectedSensor: {}, //选中的传感器
      sensorList: [], // 传感器列表
      // 控制设备
      controllerLastData: [],
      controllerList: [],
      currentMode: "",
      selectedController: {},
      // 虫情预测灯
      selectedInsectSituation: {},
      insectSituationList: [],
    };
  },
  async created() {
    try {
      let { id } = this.$route.params;
      await this.getFarmById(id);
      let res = await this.$service.getStatisticsAll({ farmId: id });
      let res2 = await this.$service.getStatisticsPlant({ farmId: id });
      let res3 = await this.$service.getDeviceStatistics({ farmId: id });
      if (res && res.code === 0) {
        this.statisticsData.landStatisticsList =
          _.get(res.data, "landStatisticsList") || [];
        this.statisticsData.memberStatisticsList =
          _.get(res.data, "memberStatisticsList") || [];
        this.statisticsData.machineryStatisticsList =
          _.get(res.data, "machineryStatisticsList") || [];
        this.statisticsData.inputStatisticsList =
          _.get(res.data, "inputStatisticsList") || [];
        this.statisticsData.operatingStatisticsList =
          _.get(res.data, "operatingStatisticsList") || [];
        this.initAllChart();
      }
      if (res2 && res2.code === 0) {
        this.statisticsData.plantStatisticsList = res2.data || [];
        this.initPlantChart(this.statisticsData.plantStatisticsList);
      }
      if (res3 && res3.code === 0) {
        this.statisticsData.deviceStatisticsList =
          _.get(res3.data, "deviceStatisticsList") || [];
        this.initDeviceChart(this.statisticsData.deviceStatisticsList);
      }
      this.changeTab(0);
    } catch (err) {
      console.log(err);
    }
  },
  computed: {
    ...mapGetters({
      farm: "farm/currentFarm",
    }),
    sensorLabelList() {
      if (this.sensorType === `水产养殖传感器`) {
        return _.cloneDeep(constants.waterSensorRealList);
      } else if (this.sensorType === `气象传感器`) {
        return _.cloneDeep(constants.sensorRealList2);
      } else {
        return _.cloneDeep(constants.sensorRealList);
      }
    },
    selectedSensorDeviceName() {
      return _.get(this.selectedSensor, "deviceName");
    },
    sensorType() {
      let sensor = this.sensorList.find(
        (sensor) => sensor.deviceName === this.selectedSensorDeviceName
      );
      return _.get(sensor, "sensorType");
    },
    selectedControllerDeviceName() {
      return _.get(this.selectedController, "deviceName");
    },
    selectedInsectSituationDeviceName() {
      return _.get(this.selectedInsectSituation, "deviceName");
    },
    controllerDataByProp() {
      return (prop) => {
        let obj = this.controllerLastData.find((item) => item.metric === prop);
        return _.get(obj, "value");
      };
    },
    controllerTabActiveIndex() {
      let activeIndex = "";
      let automatic = this.controllerLastData.find(
        (item) => item.metric === "Automatic"
      );
      let manual = this.controllerLastData.find(
        (item) => item.metric === "Manual"
      );
      let automaticValue = _.get(automatic, "value");
      let manualValue = _.get(manual, "value");
      if (parseInt(automaticValue) === 0 && parseInt(manualValue) === 1) {
        activeIndex = 1;
      } else if (
        parseInt(automaticValue) === 1 &&
        parseInt(manualValue) === 0
      ) {
        activeIndex = 2;
      } else {
        activeIndex = 0;
      }
      return activeIndex;
    },
    currentModeLabel() {
      let label = "";
      switch (this.currentMode) {
        case 0:
          label = "手动模式";
          break;
        case 1:
          label = "自动模式";
          break;
        case 2:
          label = "定时模式";
          break;
        default:
          label = "";
      }
      return label;
    },
    showControllerBtn() {
      return _.get(this.selectedController, `deviceStatus`) === `ONLINE`;
    }
  },
  methods: {
    ...mapActions({
      getFarmById: "farm/getFarmById",
    }),
    initAllChart() {
      // 图表初始化
      this.initLandChart(this.statisticsData.landStatisticsList);
      this.initMemberChart(this.statisticsData.memberStatisticsList);
      this.initMachineChart(this.statisticsData.machineryStatisticsList);
      this.initInputChart(this.statisticsData.inputStatisticsList);
      this.initOperatingChart(this.statisticsData.operatingStatisticsList);
    },
    changeSensorHandler() {
      this.getSensorLastDataByDeviceName(this.selectedSensorDeviceName);
      this.$refs.trendChart.getTrendData();
    },
    getSensorDataList(id) {
      this.$service
        .getSensorListByFarmId(id)
        .then((res) => {
          if (res && res.code === 0) {
            let sensorList = res.data || [];
            // 传感器数据相关
            this.sensorList = sensorList.filter(
              (sensor) => sensor.sensorType !== `虫情测报灯`
            );
            let deviceName1 = _.get(this.sensorList, "0.deviceName");
            if (deviceName1) {
              this.selectedSensor = _.get(this.sensorList, "0");
              this.getSensorLastDataByDeviceName(deviceName1);
              this.$refs.trendChart.getTrendData();
            }
            // 虫情预测灯相关
            this.insectSituationList = sensorList.filter(
              (sensor) => sensor.sensorType === `虫情测报灯`
            );
            let deviceName = _.get(this.insectSituationList, "0.deviceName");
            if (deviceName) {
              this.selectedInsectSituation = _.get(
                this.insectSituationList,
                "0"
              );
              this.$nextTick(() => {
                this.$refs.insectSituation.getSensorCameraImageList();
              });
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getSensorLastDataByDeviceName(deviceName) {
      // 获取传感器的最后一条数据
      this.$service
        .getSensorLastData(deviceName)
        .then((res) => {
          if (res && res.code === 0) {
            let resList = res.data || [];
            this.sensorDataList = this.sensorLabelList.map((item) => {
              let obj = resList.find((_item) => _item.metric === item.metric);
              let value = _.get(obj, "value");
              if (value) {
                item.value = parseFloat(value).toFixed(2);
              }
              return item;
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async initLandChart(inputData) {
      try {
        await this.$nextTick();
        let landChartDom = document.querySelector("#land-chart");
        let landChart = echarts.init(landChartDom);
        this.landChart = landChart;
        // 为echarts对象加载数据
        landChart.clear();
        landChart.setOption(this.getLandOption(inputData), true);

        window.addEventListener(
          "resize",
          () => {
            this.landChart.resize();
          },
          false
        );
      } catch (err) {
        console.log(err);
      }
    },
    async initMemberChart(inputData) {
      try {
        await this.$nextTick();
        let memberChartDom = document.querySelector("#member-chart");
        let memberChart = echarts.init(memberChartDom);
        this.memberChart = memberChart;
        // 为echarts对象加载数据
        memberChart.clear();
        memberChart.setOption(this.getMemberOption(inputData), true);

        window.addEventListener(
          "resize",
          () => {
            this.memberChart.resize();
          },
          false
        );
      } catch (err) {
        console.log(err);
      }
    },
    async initMachineChart(inputData) {
      try {
        await this.$nextTick();
        let machineChartDom = document.querySelector("#machine-chart");
        let machineChart = echarts.init(machineChartDom);
        this.machineChart = machineChart;
        // 为echarts对象加载数据
        machineChart.clear();
        machineChart.setOption(this.getMachineOption(inputData), true);

        window.addEventListener(
          "resize",
          () => {
            this.machineChart.resize();
          },
          false
        );
      } catch (err) {
        console.log(err);
      }
    },
    async initInputChart(inputData) {
      try {
        await this.$nextTick();
        let inputChartDom = document.querySelector("#input-chart");
        let inputChart = echarts.init(inputChartDom);
        this.inputChart = inputChart;
        // 为echarts对象加载数据
        inputChart.clear();
        inputChart.setOption(this.getInputOption(inputData), true);

        window.addEventListener(
          "resize",
          () => {
            this.inputChart.resize();
          },
          false
        );
      } catch (err) {
        console.log(err);
      }
    },
    async initOperatingChart(inputData) {
      try {
        await this.$nextTick();
        let operatingChartDom = document.querySelector("#operating-chart");
        let operatingChart = echarts.init(operatingChartDom);
        this.operatingChart = operatingChart;
        // 为echarts对象加载数据
        operatingChart.clear();
        operatingChart.setOption(this.getOperatingOption(inputData), true);

        window.addEventListener(
          "resize",
          () => {
            this.operatingChart.resize();
          },
          false
        );
      } catch (err) {
        console.log(err);
      }
    },
    async initPlantChart(inputData) {
      try {
        await this.$nextTick();
        let plantChartDom = document.querySelector("#plant-chart");
        let plantChart = echarts.init(plantChartDom);
        this.plantChart = plantChart;
        // 为echarts对象加载数据
        plantChart.clear();
        plantChart.setOption(this.getPlantOption(inputData), true);

        window.addEventListener(
          "resize",
          () => {
            this.plantChart.resize();
          },
          false
        );
      } catch (err) {
        console.log(err);
      }
    },
    async initDeviceChart(inputData) {
      try {
        await this.$nextTick();
        let deviceChartDom = document.querySelector("#device-chart");
        let deviceChart = echarts.init(deviceChartDom);
        this.deviceChart = deviceChart;
        // 为echarts对象加载数据
        deviceChart.clear();
        deviceChart.setOption(this.getDeviceOption(inputData), true);

        window.addEventListener(
          "resize",
          () => {
            this.deviceChart.resize();
          },
          false
        );
      } catch (err) {
        console.log(err);
      }
    },
    async changeTab(index) {
      try {
        await this.$nextTick();
        this.activeIndex = index;
        if (this.activeIndex === 0) {
          let { id } = this.$route.params;
          this.getSensorDataList(id);
          this.initDeviceChart(this.statisticsData.deviceStatisticsList);
          this.getControllerListByFarmId(id);
        } else {
          this.initAllChart();
          this.initPlantChart(this.statisticsData.plantStatisticsList);
        }
      } catch (err) {
        console.log(err);
      }
    },
    mixOption(obj) {
      return {
        tooltip: {
          trigger: "item",
          formatter: "{b} <br />{a} : {c}",
        },
        grid: {
          left: "12%",
          right: "5%",
          top: "2%",
          bottom: "14%",
        },
        xAxis: {
          axisLabel: {
            color: "#9FA8B8",
            fontSize: 12,
          },
          axisLine: {
            lineStyle: {
              color: "#3E495E",
              width: 2,
            },
          },
          data: obj.year,
        },
        yAxis: {
          min: 0,
          axisLabel: {
            color: "#9FA8B8",
            fontSize: 12,
            // formatter: `{value}(${obj.unit || ''})`
          },
          splitLine: {
            lineStyle: {
              color: ["#3D485D"],
              type: "dashed",
            },
          },
          axisLine: {
            show: false,
          },
        },
        series: obj.series,
      };
    },
    getLandOption(data) {
      let obj = _.groupBy(data, "year");
      let years = Object.keys(obj);
      let yearData = years.map((year) => {
        let item = _.get(obj, `${year}.0`);
        return item;
      });

      let series = this.labelList1.map((label) => {
        return {
          name: label.name,
          data: yearData.map((item) => _.get(item, label.prop) || 0),
          type: "bar",
          barWidth: "5%",
          itemStyle: {
            normal: {
              color: function () {
                //柱状图不同颜色实现
                return label.color;
              },
            },
          },
        };
      });
      return this.mixOption({ year: years, series, unit: "公顷" });
    },
    getMemberOption(data) {
      let obj = _.groupBy(data, "year");
      let years = Object.keys(obj);
      let yearData = years.map((year) => {
        let item = _.get(obj, `${year}.0`);
        return item;
      });
      let series = this.labelList2.map((label) => {
        return {
          name: label.name,
          data: yearData.map((item) => _.get(item, label.prop) || 0),
          type: "bar",
          stack: label.stack,
          barWidth: "5%",
          itemStyle: {
            normal: {
              color: function () {
                //柱状图不同颜色实现
                return label.color;
              },
            },
          },
        };
      });
      return this.mixOption({ year: years, series, unit: "个" });
    },
    getMachineOption(data) {
      let obj = _.groupBy(data, "year");
      let years = Object.keys(obj);
      let yearData = years.map((year) => {
        let item = _.get(obj, `${year}.0`);
        return item;
      });
      let series = this.labelList3.map((label) => {
        return {
          name: label.name,
          data: yearData.map((item) => _.get(item, label.prop) || 0),
          type: "bar",
          stack: label.stack,
          barWidth: "5%",
          itemStyle: {
            normal: {
              color: function () {
                //柱状图不同颜色实现
                return label.color;
              },
            },
          },
        };
      });
      return this.mixOption({ year: years, series, unit: "台" });
    },
    getInputOption(data) {
      let obj = _.groupBy(data, "year");
      let years = Object.keys(obj);
      let yearData = years.map((year) => {
        let item = _.get(obj, `${year}.0`);
        return item;
      });
      let series = this.labelList5.map((label) => {
        return {
          name: label.name,
          data: yearData.map((item) => _.get(item, label.prop) || 0),
          type: "bar",
          stack: label.stack,
          barWidth: "5%",
          itemStyle: {
            normal: {
              color: function () {
                //柱状图不同颜色实现
                return label.color;
              },
            },
          },
        };
      });
      return this.mixOption({ year: years, series, unit: "吨" });
    },
    getOperatingOption(data) {
      let obj = _.groupBy(data, "year");
      let years = Object.keys(obj);
      let yearData = years.map((year) => {
        let item = _.get(obj, `${year}.0`);
        return item;
      });
      let series = this.labelList6.map((label) => {
        return {
          name: label.name,
          data: yearData.map((item) => {
            let value = _.get(item, label.prop) || 0;
            return this.$util.unitConvert(value).num;
          }),
          type: "bar",
          stack: label.stack,
          barWidth: "5%",
          itemStyle: {
            normal: {
              color: function () {
                //柱状图不同颜色实现
                return label.color;
              },
            },
          },
        };
      });
      return this.mixOption({ year: years, series, unit: "万元" });
    },
    getPlantOption(data) {
      let obj = _.groupBy(data, "year");
      let years = Object.keys(obj);
      let yearData = years.map((year) => {
        let item = _.get(obj, `${year}.0`);
        return item;
      });
      let series = this.labelList4.map((label) => {
        return {
          name: label.name,
          data: yearData.map((item) => _.get(item, label.prop) || 0),
          type: "bar",
          stack: label.stack,
          barWidth: "5%",
          itemStyle: {
            normal: {
              color: function () {
                //柱状图不同颜色实现
                return label.color;
              },
            },
          },
        };
      });
      return this.mixOption({ year: years, series, unit: "公顷" });
    },
    getDeviceOption(data) {
      let obj = _.groupBy(data, "year");
      let years = Object.keys(obj);
      let yearData = years.map((year) => {
        let item = _.get(obj, `${year}.0`);
        return item;
      });
      let series = this.labelList7.map((label) => {
        return {
          name: label.name,
          data: yearData.map((item) => _.get(item, label.prop) || 0),
          type: "bar",
          stack: label.stack,
          barWidth: "5%",
          itemStyle: {
            normal: {
              color: function () {
                //柱状图不同颜色实现
                return label.color;
              },
            },
          },
        };
      });
      return this.mixOption({ year: years, series, unit: "个" });
    },
    getControllerLastData() {
      this.$service
        .getControllerLastData(this.selectedControllerDeviceName)
        .then((res) => {
          if (res && res.code === 0) {
            let controllerLastData = res.data || [];
            this.controllerLastData = controllerLastData;
            this.currentMode = this.controllerTabActiveIndex;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getControllerListByFarmId(id) {
      this.$service
        .getControllerListByFarmId(id)
        .then((res) => {
          if (res && res.code === 0) {
            let controllerList = res.data || [];
            this.controllerList = controllerList;
            // this.controllerList = controllerList.filter(
            //   (item) => item.deviceStatus === `ONLINE`
            // );
            let deviceName = _.get(res.data, `0.deviceName`);
            if (deviceName) {
              this.selectedController = _.get(res.data, "0");
              this.getControllerLastData();
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changeControllerHandler() {
      this.getControllerLastData();
    },
    padZero(index) {
      if (index > 0 && index < 10) {
        return `0${index}`;
      } else {
        return index;
      }
    },
    ControlHandler() {
      this.$refs.controllerDialog.show(this.selectedControllerDeviceName, this.selectedController);
    },
    changeInsectSituationHandler() {
      this.$refs.insectSituation.getSensorCameraImageList();
    },
  },
};
</script>
<style lang="scss" scoped>
.farm-stock-data-container {
  .title-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // height: 0.9rem;
    height: 8.1632%;
    .tab-list {
      display: flex;
      .tab-item {
        width: 1.1rem;
        height: 0.4rem;
        line-height: 0.4rem;
        text-align: center;
        color: #417fc8;
        font-size: 0.16rem;
        background: url("../../assets/image/tab_bg_icon.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
        &.active {
          color: #fff;
        }
      }
      .tab-item + .tab-item {
        margin-left: 0.1rem;
      }
    }
  }
  .tab-content {
    // height: calc(100% - 0.9rem);
    height: 91.8367%;
    overflow: hidden;
    overflow-y: scroll;
    .data-chart-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      .data-charts {
        display: flex;
        flex: 1;
        .data-chart-item {
          position: relative;
          flex: 1;
          height: calc(100% - 0.1rem);
          background-color: #0b142b;
          .title {
            position: absolute;
            top: -0.09rem;
            left: 0;
            width: 1.1rem;
            height: 0.42rem;
            i {
              font-size: 0.12rem;
            }
            .svg-icon {
              width: 1.1rem;
              height: 0.42rem;
            }
            span {
              position: absolute;
              top: 40%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 100%;
              text-align: center;
              color: #70caee;
              font-size: 0.14rem;
            }
          }
          .label-tag-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 28%;
          }
          .charts-wrapper {
            height: 72%;
            #land-chart,
            #member-chart,
            #machine-chart,
            #plant-chart,
            #input-chart,
            #operating-chart,
            #device-chart {
              width: calc(100% - 0.01rem);
              height: calc(100% - 0.01rem);
            }
          }
        }
        .data-chart-item + .data-chart-item {
          margin-left: 0.2rem;
        }
      }
      // .data-charts:nth-of-type(1) {
      //   margin-bottom: 0.2rem;
      // }
      .data-charts {
        margin-top: 0.1rem;
      }
    }
    &.device-content {
      // display: flex;
      // flex-direction: column;
      .my-vue-select {
        position: absolute;
        z-index: 300;
        left: 1.2rem;
        top: 50%;
        transform: translateY(-50%);
      }
      .trend-chart-container {
        width: 100%;
        height: 38.68%;
      }
      .device-bottom-container {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 3.6rem;
        .device-type-chart-wrapper {
          display: flex;
          flex-direction: column;
          width: 33.33%;
          .title-one {
            margin-bottom: 0.1rem;
          }
          .device-type-chart-container {
            width: 100%;
            height: calc(100% - 0.52rem);
            .data-chart-wrapper {
              display: flex;
              flex-direction: column;
              position: relative;
              width: 100%;
              height: 100%;
              .label-tag-wrapper {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 20%;
              }
              .charts-wrapper {
                width: 100%;
                height: 80%;
                #device-chart {
                  width: calc(100% - 0.01rem);
                  height: calc(100% - 0.01rem);
                }
              }
              .title {
                position: absolute;
                top: -0.09rem;
                left: 0;
                width: 1.1rem;
                height: 0.42rem;
                i {
                  font-size: 0.12rem;
                }
                .svg-icon {
                  width: 1.1rem;
                  height: 0.42rem;
                }
                span {
                  position: absolute;
                  top: 40%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  width: 100%;
                  text-align: center;
                  color: #70caee;
                  font-size: 0.14rem;
                }
              }
            }
          }
        }
        .controller-info-wrapper {
          width: calc(66.67% - 0.2rem);
          height: 100%;
          .title-one {
            margin-bottom: 0.1rem;
            h6 {
              position: absolute;
              z-index: 300;
              left: 2.4rem;
              top: 50%;
              transform: translate(-50%, -50%);
              color: #fff;
              cursor: pointer;
              &.vr-btn {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 1.08rem;
                height: 0.32rem;
                line-height: 0.32rem;
                margin-left: 0.7rem;
                font-size: 0.14rem;
                color: #61a615;
                background-color: #162a00;
                border: 1px solid #61a615;
                border-radius: 0.02rem;
                .svg-icon {
                  width: 0.14rem;
                  height: 0.14rem;
                  margin-right: 0.06rem;
                }
              }
            }
            .controller-status {
              position: absolute;
              left: 3.8rem;
              top: 50%;
              transform: translateY(-50%);
              display: flex;
              align-items: center;
              justify-content: center;
              width: 0.6rem;
              height: 0.22rem;
              background-color: #202E50;
              border-radius: 0.04rem;
              color: #fff;
              font-size: 0.12rem;
              span {
                display: flex;
                align-items: center;
                i {
                  display: inline-block;
                  width: 0.06rem;
                  height: 0.06rem;
                  border-radius: 50%;
                  margin-right: 0.06rem;
                  &.on {
                    background-color: #7ED321;
                  }
                  &.off {
                    background-color: #F35151;
                  }
                }
              }
            }
          }
          .control-btn {
            position: absolute;
            z-index: 300;
            left: 2.3rem;
            top: 50%;
            transform: translateY(-50%);
            color: red;
            font-size: 0.16rem;
            cursor: pointer;
          }
          .controller-content {
            position: relative;
            width: 100%;
            height: calc(100% - 0.52rem);
            padding: 0.2rem;
            .current-mode-title {
              color: #f0f0f0;
              font-size: 0.14rem;
            }
            .current-mode-content {
              .controller-tab-content-item {
                .dcfkg-list {
                  display: flex;
                  margin-top: 0.3rem;
                  .dcfkg-item {
                    .title {
                      color: #9fa8b8;
                      font-size: 0.14rem;
                      i {
                        display: inline-block;
                        width: 0.06rem;
                        height: 0.06rem;
                        margin-right: 0.08rem;
                        &.online {
                          color: #7ed321;
                        }
                        &.offline {
                          color: #f35151;
                        }
                      }
                    }
                  }
                  .dcfkg-item + .dcfkg-item {
                    margin-left: 0.2rem;
                  }
                }
                .ben {
                  margin-top: 0.3rem;
                  .title {
                    color: #9fa8b8;
                    font-size: 0.14rem;
                    i {
                      display: inline-block;
                      width: 0.06rem;
                      height: 0.06rem;
                      margin-right: 0.08rem;
                      &.online {
                        color: #7ed321;
                      }
                      &.offline {
                        color: #f35151;
                      }
                    }
                  }
                }
                .ben-wrapper {
                  display: flex;
                  .ben + .ben {
                    margin-left: 0.2rem;
                  }
                }
                .info-item {
                  display: flex;
                  margin-top: 0.2rem;
                  color: #9fa8b8;
                  font-size: 0.14rem;
                  .label {
                    margin-right: 0.08rem;
                  }
                  .value {
                  }
                }
              }
            }
          }
          .empty-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            .svg-icon {
              width: 0.64rem;
              height: 0.64rem;
            }
            .tips {
              font-size: 0.14rem;
              color: #9fa8b8;
              margin-top: 0.2rem;
            }
          }
        }
      }
    }
  }
}
</style>
