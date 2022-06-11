<template>
  <div class="pc-spread-container">
    <div class="banner">
      <div class="logo"></div>
      <div class="title">原产农场&nbsp;质量保证</div>
      <div class="desc">溯源追溯&nbsp;|&nbsp;实时监控&nbsp;|&nbsp;品质检测</div>
    </div>
    <div class="tab-list-container">
      <div class="tab-list">
        <div @click="changeTabActive(0)" :class="['tab-item', tabActiveIndex === 0 && 'active']">全程溯源</div>
        <div @click="changeTabActive(1)" :class="['tab-item', tabActiveIndex === 1 && 'active']">产地信息</div>
      </div>
    </div>
    <div v-if="tabActiveIndex === 0" class="tab-content">
      <div class="trace-list-container">
        <ul v-if="traceInfo.length > 0" class="trace-list">
          <li v-for="(trace, index) in traceInfo" :key="index" class="trace-item">
            <div class="file-list-wrapper">
              <carousel :dataList="dataList(trace)"></carousel>
            </div>
            <div class="title">
              {{trace.name}}
            </div>
            <div class="desc" :title="trace.moreInfo">
              {{trace.moreInfo}}
            </div>
          </li>
        </ul>
        <no-data v-else></no-data>
      </div>
    </div>
    <div v-if="tabActiveIndex === 1" class="tab-content">
      <div v-if="cameraList.length > 0" class="env-live-container">
        <div class="title">直播监控</div>
        <div class="desc">种植环境直播，过程更放心，质量有保障</div>
        <div class="camera-list">
          <scrollBar direction="x" :activeIndex="activeIndex">
            <div
              v-for="(camera, index) in cameraList"
              :key="index"
              @click="changeCamera(camera, index)"
              :class="[
                'camera-item',
                'scrollBarItem',
                activeIndex === index && 'active',
              ]"
            >
              {{ camera.deviceName }}
            </div>
          </scrollBar>
        </div>
        <div class="live-video-container">
          <div class="header">
            <div class="left">
              <div
                @click="changeToLive"
                :class="['live-btn', month && 'disabled']"
              >
                实时监控
                <svg-icon icon-class="wap_real_live_icon"></svg-icon>
              </div>
            </div>
            <div class="right">
              <div
                @click="monthSelectHandler"
                :class="['month-select', month && 'active']"
              >
                <svg-icon icon-class="pc_select_month_icon"></svg-icon>
                {{ month ? month : "选择月份" }}
                <ul v-if="monthListVisible" class="month-list">
                  <li
                    v-for="(month, index) in monthList"
                    :key="index"
                    @click.stop="selectHandler(month)"
                    class="month-item"
                  >
                    {{ month }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="live-video-wrapper">
            <div v-if="playUrl !== noLapseUrl" class="video-player-wrapper">
              <video-player
                ref="videoPlayer"
                :playUrl="playUrl"
                :videoType="videoType"
              ></video-player>
            </div>
            <div
              v-else
              v-html="`本月暂未生成延时摄影`"
              class="no-data-text"
            ></div>
          </div>
        </div>
      </div>
      <div v-if="sensorList.length > 0" class="env-data-container">
        <div class="title">农场数据</div>
        <div class="desc">环境数据实时监看，数据透明化，从源头健康</div>
        <ul class="sensor-real-list">
          <li
            v-for="(sensor, index) in sensorList"
            :key="index"
            @click="changeSensor(sensor)"
            :class="['sensor-real-item', sensorActive(sensor.id) && 'active']"
          >
            {{ sensor.name }}
          </li>
        </ul>
        <ul class="sensor-list">
          <li
            v-for="(sensor, index) in sensorDataList"
            :key="index"
            @click="sensorChangeHandler(index)"
            :class="['sensor-item', sensorActiveIndex === index && 'active']"
          >
            <div class="left">
              <div class="label">{{ sensor.title }}</div>
              <div class="value">
                {{ sensor.value }}<i class="unit">{{ sensor.unit }}</i>
              </div>
            </div>
            <div class="right-icon">
              <svg-icon :icon-class="sensor.icon"></svg-icon>
            </div>
          </li>
        </ul>
        <div
          v-show="sensorChartData.days.length > 0"
          class="sensor-chart-container"
        >
          <div id="sensor-chart"></div>
        </div>
      </div>
      <div class="basic-info">
        <div class="text-info">
          <div class="name">{{ farm.name }}</div>
          <div class="created-area">
            <span class="created">{{ createdDate }}年成立</span>
            <span class="area">{{ farm.area }}公顷</span>
          </div>
          <div class="mark-list">
            <div
              v-for="(mark, index) in farmMarks"
              :key="index"
              class="mark-item"
            >
              {{ mark.name }}
            </div>
          </div>
          <div class="desc">
            {{ farm.description }}
          </div>
        </div>
        <div class="img-info">
          <pc-certificate-carousel
            :dataList="farm.farmCertificates"
          ></pc-certificate-carousel>
        </div>
      </div>
      <div class="map">
        <div id="my-map"></div>
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
      </div>
      <!-- <div class="charts-info">
        <div class="title">种植信息</div>
        <div class="desc">因地制宜, 智能管控</div>
        <div class="charts-container">
          <div class="charts-item">
            <div class="chart-title">
              <i class="split-line"></i>
              总面积<span class="value">{{ landData.totalArea }}</span
              ><span class="unit">公顷</span>
            </div>
            <div id="land-chart"></div>
          </div>
          <div class="charts-item">
            <div class="chart-title">
              <i class="split-line"></i>
              总产量<span class="value">{{ plantData.sumYield }}</span
              ><span class="unit">吨</span>
            </div>
            <div id="plant-chart"></div>
          </div>
        </div>
      </div> -->
    </div>
    <div class="footer">
      <div class="footer-content">
        <div class="left">
          <div class="logo"></div>
          <div class="go-shop-btn">扫一扫，手机访问店铺 >></div>
        </div>
        <div class="qr-code">
          <img src="../../assets/image/pc_shop_qrcode_icon.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import _ from "lodash";
import echarts from "echarts";
import rem from "@/util/rem";
rem(1920);
import PcCertificateCarousel from "./PcCertificateCarousel";
import ScrollBar from "@/components/ScrollBar";
import label from "@/util/label";
import VideoPlayer from "@/components/VideoPlayer";
import Carousel from '@/components/Carousel';

const plantSensorLabelList = [
  {
    title: "空气温度",
    metric: "dqwd",
    value: "/",
    unit: "℃",
    icon: "sensor_icon1",
  },
  {
    title: "空气湿度",
    metric: "dqsd",
    value: "/",
    unit: "%",
    icon: "sensor_icon2",
  },
  {
    title: "降雨量",
    metric: "jyl",
    value: "/",
    unit: "mm",
    icon: "sensor_icon5",
  },
  {
    title: "土壤温度",
    metric: "trwd",
    value: "/",
    unit: "℃",
    icon: "sensor_icon8",
  },
  {
    title: "土壤湿度",
    metric: "trxdsd",
    value: "/",
    unit: "%",
    icon: "sensor_icon9",
  },
  {
    title: "水质PH值",
    metric: "sph",
    value: "/",
    unit: "",
    // isWarning: true,
    icon: "sensor_icon10",
  },
];
const waterSensorLabelList = [
  {
    title: "温度",
    metric: "swd",
    value: "/",
    unit: "℃",
    icon: "sensor_icon1",
    wapIcon: "wap_sensor_icon1",
  },
  {
    title: "PH值",
    metric: "sph",
    value: "/",
    unit: "",
    icon: "sensor_icon10",
    wapIcon: "wap_sensor_icon11",
  },
  {
    title: "溶解氧",
    metric: "rjy",
    value: "/",
    unit: "mg/L",
    // isDanger: true,
    icon: "sensor_icon12",
    wapIcon: "wap_sensor_icon12",
  },
];

export default {
  name: "PcSpread",
  components: { PcCertificateCarousel, VideoPlayer, ScrollBar, Carousel },
  data() {
    return {
      map: null,
      activeIndex: 0,
      month: "", // 延时摄影
      monthList: this.$util.get12MonthNearBy(),
      monthListVisible: false,
      cameraList: [],
      trendDataList: [],
      cameraTimeLapseList: [], // 延时摄影
      farm: {
        latitude: "",
        longitude: "",
        farmCertificates: [],
        farmMarks: [],
      },
      playUrl: "http://haha",
      noLapseUrl: "http://null",
      // 统计数据
      landData: {},
      landChart: null,
      landChartData: [],
      plantData: {},
      plantChart: null,
      plantChartData: [],
      // 传感器相关
      sensorActiveIndex: 0,
      selectedSensor: "",
      sensorDataList: [],
      sensorList: [],
      tabActiveIndex: 0,
      traceInfo: []
    };
  },
  async created() {
    try {
      await this.$nextTick();
      if (this.tabActiveIndex === 0) {
        this.getBatchList();
      } else {
        this.init();
      }
    } catch (err) {
      console.log(err);
    }
  },
  computed: {
    sensorChartData() {
      let metric = _.get(
        this.sensorLabelList,
        `${this.sensorActiveIndex}.metric`
      );
      let trendData = this.trendDataList.find((item) => item.metric === metric);
      let orderDps = _.get(trendData, "orderDps") || [];
      return {
        value: orderDps.map((item) => item.value) || [],
        days:
          orderDps.map((item) => {
            return this.$util.dateFormat("mm-dd", new Date(item.timestamp));
          }) || [],
      };
    },
    sensorLabelList() {
      if (this.sensorType !== "水产养殖传感器") {
        return _.cloneDeep(plantSensorLabelList);
      } else {
        return _.cloneDeep(waterSensorLabelList);
      }
    },
    sensorActive() {
      return (id) => {
        return _.get(this.selectedSensor, `id`) === id;
      };
    },
    sensorType() {
      let sensor = this.sensorList.find(
        (sensor) =>
          sensor.deviceName === _.get(this.selectedSensor, "deviceName")
      );
      return _.get(sensor, "sensorType");
    },
    videoType() {
      return this.month ? "video/mp4" : "application/x-mpegURL";
    },
    createdDate() {
      return this.farm.createdAt
        ? new Date(this.farm.createdAt).getFullYear()
        : "";
    },
    farmMarks() {
      return _.take(this.farm.farmMarks, 3);
    },
    dataList() {
      return (trace) => {
        let {imageUrl, videoUrl} = trace;
        let dataList = [];
        if (imageUrl) {
          dataList = this.$_.concat(dataList, imageUrl.map((url) => {
            return {
              img: url
            };
          }));
        }
        if (videoUrl) {
          dataList = this.$_.concat(dataList, [{
            img: videoUrl,
            isVideo: true
          }]);
        }
        return dataList;
      };
    },
  },
  methods: {
    init() {
      let { farmId } = this.$route.query;
      // 获取农场信息
      this.getFarm(farmId);
      // 获取传感器数据
      this.getSensorDataList(farmId);
      // 获取摄像头数据
      this.getCameraList(farmId);
      // 初始化耕地图表
      // this.getLandStatistics(farmId);
      // 初始化种植图表
      // this.getPlantStatistics(farmId);
      // 绑定事件
      this.bindEvents();
    },
    getFarm(farmId) {
      this.$service
        .getFarmById(farmId)
        .then((res) => {
          if (res && res.code === 0) {
            this.farm = res.data;
            this.mapInit();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getSensorDataList(id) {
      this.$service
        .getSensorListByFarmId(id)
        .then((res) => {
          if (res && res.code === 0) {
            this.sensorList = res.data || [];
            let deviceName = _.get(res.data, "0.deviceName");
            if (deviceName) {
              this.selectedSensor = _.get(res.data, "0");
              this.getSensorLastDataByDeviceName(deviceName);
              this.getSensorData(deviceName);
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
    getSensorData(deviceName) {
      //  获取传感器的图表数据
      this.$service
        .getSensor({ deviceName, days: 7 })
        .then((res) => {
          if (res && res.code === 0) {
            this.trendDataList = res.data;
            this.initSensorChart();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changeSensor(sensor) {
      let { deviceName } = sensor;
      this.selectedSensor = sensor;
      this.sensorActiveIndex = 0;
      this.getSensorLastDataByDeviceName(deviceName);
      if (this.sensorChart) {
        this.sensorChart.clear();
        this.sensorChart.setOption(this.getSensorChartConfig(), true);
      }
    },
    // 传感器切换
    sensorChangeHandler(index) {
      this.sensorActiveIndex = index;
      if (this.sensorChart) {
        this.sensorChart.clear();
        this.sensorChart.setOption(this.getSensorChartConfig(), true);
      }
    },
    getCameraList(farmId) {
      this.$service
        .getCameraListByFarmId({ farmId, pageSize: 100 })
        .then((res) => {
          if (res && res.code === 0) {
            let cameraList = _.get(res.data, "list") || [];
            this.cameraList = cameraList
              .filter((item) => item.pullable)
              .filter((item) =>
                item.deviceStatus === "ONLINE" ||
                item.deviceStatus === "OFFLINE"
            );
            this.playUrl = _.get(this.cameraList, "0.playUrl");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async mapInit() {
      try {
        this.map = new window.AMap.Map("my-map", {
          zoom: 10,
          zoomEnable: true,
          zooms: [7, 21],
          scrollWheel: false // 关闭缩放
        });
        let marker = new window.AMap.Marker({
          icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
          position: new window.AMap.LngLat(116.39, 39.9),
        });
        this.map.add(marker);
        if (this.farm.longitude && this.farm.latitude) {
          let lnglat = [this.farm.longitude, this.farm.latitude];
          this.map.setCenter(lnglat);
          marker.setPosition(lnglat);
        }
      } catch (e) {
        console.log(e);
      }
    },
    resetMapHandler() {
      if (this.farm.longitude && this.farm.latitude) {
        let lnglat = [this.farm.longitude, this.farm.latitude];
        this.map.setCenter(lnglat);
        this.map.setZoom(10);
      }
    },
    zoomOutHandler() {
      const zoom = this.map.getZoom();
      console.log(zoom);
      this.map.setZoom(zoom + 1);
    },
    zoomInHandler() {
      const zoom = this.map.getZoom();
      this.map.setZoom(zoom - 1);
    },
    getLandStatistics(farmId) {
      let year = new Date().getFullYear();
      this.$service
        .getLandStatistics({ farmId, year })
        .then((res) => {
          this.landData = _.get(res.data, "0") || {};
          this.landChartData = [
            { name: "耕地", value: _.get(this.landData, `farmLandArea`) },
            { name: "水产", value: _.get(this.landData, `waterArea`) },
            { name: "其他", value: _.get(this.landData, `otherLandArea`) },
          ];
          this.initLandChart();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getPlantStatistics(farmId) {
      let year = new Date().getFullYear();
      this.$service
        .getStatisticsPlant({ farmId, year })
        .then((res) => {
          this.plantData = _.get(res.data, "0") || {};
          this.plantChartData = label.labelList4.map((label) => {
            return {
              name: label.name,
              value: _.get(this.plantData, label.prop),
            };
          });
          this.initPlantChart();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async initPlantChart() {
      try {
        await this.$nextTick();
        let plantChartDom = document.querySelector("#plant-chart");
        let plantChart = echarts.init(plantChartDom);
        this.plantChart = plantChart;
        // 为echarts对象加载数据
        plantChart.clear();
        plantChart.setOption(this.getPlantChartConfig(), true);
        window.addEventListener("resize", function () {
          setTimeout(() => {
            plantChart.resize();
          }, 100)
        });
      } catch (err) {
        console.log(err);
      }
    },
    async initLandChart() {
      try {
        await this.$nextTick();
        let landChartDom = document.querySelector("#land-chart");
        let landChart = echarts.init(landChartDom);
        this.landChart = landChart;
        // 为echarts对象加载数据
        landChart.clear();
        landChart.setOption(this.getLandChartConfig(), true);
        window.addEventListener("resize", function () {
          setTimeout(() => {
            landChart.resize();
          }, 100)
        });
      } catch (err) {
        console.log(err);
      }
    },
    async initSensorChart() {
      try {
        await this.$nextTick();
        let sensorChartDom = document.querySelector("#sensor-chart");
        let sensorChart = echarts.init(sensorChartDom);
        this.sensorChart = sensorChart;
        // 为echarts对象加载数据
        sensorChart.clear();
        sensorChart.setOption(this.getSensorChartConfig(), true);
        window.addEventListener("resize", function () {
          setTimeout(() => {
            sensorChart.resize();
          }, 100)
        });
      } catch (err) {
        console.log(err);
      }
    },
    changeCamera(camera, index) {
      this.activeIndex = index;
      if (this.month) {
        let nationalStandardId = _.get(camera, "nationalStandardId");
        this.getCameraTimeLapseByStreamName(nationalStandardId);
      } else {
        this.playUrl = camera.playUrl;
      }
    },
    monthSelectHandler() {
      this.monthListVisible = true;
    },
    selectHandler(month) {
      this.month = month;
      this.monthListVisible = false;
      let camera = _.get(this.cameraList, this.activeIndex);
      let nationalStandardId = _.get(camera, "nationalStandardId");
      this.getCameraTimeLapseByStreamName(nationalStandardId);
    },
    changeToLive() {
      this.month = "";
      this.playUrl = _.get(this.cameraList, `${this.activeIndex}.playUrl`);
    },
    bindEvents() {
      let body = document.querySelector("body");
      body.addEventListener(
        "click",
        (e) => {
          let className = e.target.className;
          if (className.indexOf("month-select") === -1) {
            this.monthListVisible = false;
          }
        },
        false
      );
    },
    async getCameraTimeLapseByStreamName(streamName) {
      try {
        let res = await this.$service.getCameraTimeLapse(streamName);
        if (res && res.code === 0) {
          this.cameraTimeLapseList = res.data || [];
          let timeLapse = this.cameraTimeLapseList.find(
            (item) => item.dateStr === this.month.replace("-", "")
          );
          let url = _.get(timeLapse, "url") || this.noLapseUrl;
          this.playUrl = url;
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 传感器图表配置文件
    getSensorChartConfig() {
      return {
        color: ["#45A1F8"],
        tooltip: {
          trigger: "item",
          formatter: (params) => {
            return `<span>${params.name}</span><br />
                    <span>${params.seriesName}: </span>
                    <span style="color: ${params.color};">${params.value}</span>`;
          },
        },
        grid: {
          top: "10%",
          left: "6%",
          right: "4%",
          bottom: "15%",
        },
        xAxis: {
          type: "category",
          data: this.sensorChartData.days,
          axisLabel: {
            fontSize: 16,
            color: "#98A4AF",
          },
          axisLine: {
            lineStyle: {
              // color: '#3E495E'
              color: "#98A4AF",
            },
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            fontSize: 16,
            color: "#98A4AF",
          },
          axisLine: {
            lineStyle: {
              color: "#98A4AF",
            },
          },
          splitLine: {
            lineStyle: {
              type: "dashed",
              color: ["#98A4AF"],
            },
          },
        },
        series: [
          {
            data: this.sensorChartData.value,
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
                      color: "rgba(69,161,248, 0.4)", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(69,161,248, 0)", // 100% 处的颜色
                    },
                  ],
                  globalCoord: true, // 缺省为 false
                },
              },
            },
          },
        ],
      };
    },
    getLandChartConfig() {
      return {
        color: ["#7B8BF6", "#43D1D5", "#ECC94C"],
        tooltip: {
          show: false,
          trigger: "item",
          formatter: "{b} : {c} ({d}%)",
        },
        grid: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        },
        graphic: [
          {
            //环形图中间添加文字
            type: "text", //通过不同top值可以设置上下显示
            left: "center",
            top: "40%",
            style: {
              text: this.landData.farmLandArea || "",
              textAlign: "center",
              fill: "#2787F5", //文字的颜色
              fontSize: 20,
              fontWeight: 600,
            },
          },
          {
            type: "text",
            left: "center",
            top: "50%",
            style: {
              text: "总面积",
              textAlign: "center",
              fill: "#98A4AF",
              fontSize: 14,
              lineHeight: 18,
            },
          },
        ],
        series: [
          {
            type: "pie",
            radius: ["50%", "70%"], // 内外半径
            label: {
              color: "#9FA8B8",
              fontSize: 16,
              lineHeight: 18,
              formatter: "{b} {d}%",
            },
            data: this.landChartData || [],
          },
        ],
      };
    },
    getPlantChartConfig() {
      return {
        tooltip: {
          show: false,
          trigger: "item",
          formatter: (params) => {
            return `<span>${params.name}: </span>
                    <span style="color: ${params.color};">${params.value}</span>`;
          },
        },
        grid: {
          top: "6%",
          left: "10%",
          right: "2%",
          bottom: "22%",
        },
        xAxis: {
          type: "category",
          data: this.plantChartData.map((item) => item.name),
          axisTick: {
            show: false,
          },
          axisLabel: {
            fontSize: 16,
            color: "#666",
            rotate: 40,
            interval: 0,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#A7A7A7",
            },
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            fontSize: 16,
            color: "#666",
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#A7A7A7",
            },
          },
          splitLine: {
            lineStyle: {
              type: "dashed",
              width: 0.4,
              color: ["#A7A7A7"],
            },
          },
        },
        series: [
          {
            data: this.plantChartData.map((item) => item.value),
            type: "bar",
            label: {
              show: true,
              color: "#777",
              position: "top",
            },
            itemStyle: {
              //通常情况下：
              normal: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: "#8A97F5",
                  },
                  {
                    offset: 1,
                    color: "#DDB1FE",
                  },
                ]),
              },
            },
            barWidth: 32,
            showBackground: true,
            backgroundStyle: {
              color: "#F4F4F4",
            },
          },
        ],
      };
    },
    changeTabActive(index) {
      this.tabActiveIndex = index;
      if (index === 1) {
        this.init();
      }
    },
    async getBatchList() {
      try {
        let { goodsId } = this.$route.query;
        if (goodsId) {
          let res = await this.$service.getBatchList({goodsId});
          if (res && res.code === 0) {
            let batchList = this.$_.get(res.data, 'list') || [];
            let batch = batchList.filter((batch) => {
              return batch.selectedStatus === 'DEFAULT';
            });
            let traceInfo = this.$_.get(batch, '0.traceInfo') || [];
            this.traceInfo = traceInfo.map((trace) => {
              if (!this.$_.isArray(trace.imageUrl)) {
                if (trace.imageUrl) {
                  trace.imageUrl = [trace.imageUrl];
                } else {
                  trace.imageUrl = [];
                }
              }
              return trace;
            });
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.pc-spread-container {
  .banner {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 4rem;
    background-image: url("../../assets/image/pc_spread_banner.png");
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    .logo {
      width: 3.62rem;
      height: 0.94rem;
      margin: 0.38rem 0 0.5rem 0;
      background-image: url("../../assets/image/pc_spread_logo.png");
      background-size: 100% 100%;
      background-position: center center;
      background-repeat: no-repeat;
    }
    .title {
      color: #fff;
      font-size: 0.6rem;
      line-height: 1rem;
      font-weight: 500;
    }
    .desc {
      color: #fff;
      font-weight: 400;
      font-size: 0.28rem;
      line-height: 0.48rem;
    }
  }
  .tab-list-container {
    width: 100%;
    height: 0.6rem;
    box-shadow: 0px 2px 8px 0px rgba(184, 200, 227, 0.5);
    .tab-list {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 0.6rem;
      .tab-item {
        color: #222;
        font-size: 0.16rem;
        font-weight: 500;
        border-bottom: 2px solid transparent;
        cursor: pointer;
        &.active {
          color: #2787F5;
          border-color: #2787F5;
        }
      }
      .tab-item + .tab-item {
        margin-left: 1.32rem;
      }
    }
  }
  .trace-list-container {
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    min-height: 3rem;
    margin: 0.4rem 0;
    .trace-list {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      width: 10.96rem;
      .trace-item {
        width: 3.52rem;
        margin-left: 0.2rem;
        margin-bottom: 0.2rem;
        .file-list-wrapper {
          width: 100%;
          height: 1.98rem;
        }
        .title {
          color: #222;
          font-size: 0.24rem;
          font-weight: 500;
          margin: 0.03rem 0;
        }
        .desc {
          color: #98A4AF;
          font-size: 0.18rem;
          height: 0.5rem;
          line-height: 0.20rem;
          overflow : hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
      .trace-item:nth-of-type(3n + 1) {
        margin-left: 0;
      }
    }
  }
  .basic-info {
    display: flex;
    align-items: center;
    width: 57.3%;
    padding: 0 0 0.6rem 0;
    margin: 0 auto;
    background-color: #fff;
    .text-info {
      flex: 1;
      margin-right: 0.9rem;
      .name {
        color: #222;
        font-size: 0.28rem;
        font-weight: 500;
        line-height: 0.4rem;
      }
      .created-area {
        color: #777;
        font-size: 0.24rem;
        .created {
          margin-right: 0.35rem;
        }
        .area {
        }
      }
      .mark-list {
        display: flex;
        margin: 0.15rem 0;
        .mark-item {
          color: #777;
          font-size: 0.18rem;
          height: 0.4rem;
          line-height: 0.4rem;
          padding: 0 0.1rem;
          background-color: #edf6ff;
          border-radius: 0.03rem;
        }
        .mark-item + .mark-item {
          margin-left: 0.1rem;
        }
      }
      .desc {
        color: #98a4af;
        font-size: 0.16rem;
        line-height: 0.24rem;
      }
    }
    .img-info {
    }
  }
  .map {
    position: relative;
    width: 100%;
    height: 4rem;
    #my-map {
      width: 100%;
      height: 100%;
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
        border-bottom: 1px solid #1f4071;
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
  .charts-info {
    width: 57.3%;
    margin: 0.8rem auto;
    text-align: center;
    .charts-container {
      display: flex;
      margin-top: 0.3rem;
      .charts-item {
        flex: 1;
        height: 3.8rem;
        padding: 0.3rem 0.4rem;
        background: #fff;
        box-shadow: 0 0.02rem 0.16rem 0 rgba(184, 200, 227, 0.5);
        border-radius: 0.1rem;
        .chart-title {
          display: flex;
          align-items: center;
          font-size: 0.18rem;
          line-height: 0.18rem;
          color: #98a4af;
          text-align: center;
          .split-line {
            display: inline-block;
            width: 0.04rem;
            height: 0.18rem;
            background: linear-gradient(
              231deg,
              rgba(255, 134, 0, 1) 0%,
              rgba(255, 177, 124, 1) 100%
            );
            border-radius: 0.02rem;
            margin-right: 0.1rem;
          }
          .value {
            color: #2787f5;
            font-size: 0.3rem;
            line-height: 0.3rem;
            font-weight: 600;
            margin: 0 0.06rem;
          }
          .unit {
            color: #2787f5;
            font-size: 0.18rem;
          }
        }
        #land-chart,
        #plant-chart {
          width: 100%;
          height: calc(100% - 0.3rem);
        }
      }
      .charts-item + .charts-item {
        margin-left: 0.3rem;
      }
    }
  }
  .env-data-container {
    width: 57.3%;
    margin: 0.8rem auto;
    text-align: center;
    .sensor-real-list {
      display: flex;
      justify-content: center;
      width: 100%;
      margin: 24px 0;
      .sensor-real-item {
        color: #666;
        font-size: 16px;
        font-weight: bold;
        padding: 4px 0;
        border-bottom: 4px solid transparent;
        cursor: pointer;
        &.active {
          color: #2787f5;
          border-color: #2787f5;
        }
      }
      .sensor-real-item + .sensor-real-item {
        margin-left: 20px;
      }
    }
    .sensor-list {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      margin-top: 0.3rem;
      .sensor-item {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 1.75rem;
        height: 0.8rem;
        padding: 0.15rem 0.2rem;
        margin-bottom: 0.1rem;
        background-color: #f7f8fa;
        border-radius: 0.05rem;
        cursor: pointer;
        &.active {
          background-color: #edf7ff;
        }
        .left {
          .label {
            color: #777;
            font-size: 0.14rem;
            line-height: 0.34rem;
            text-align: left;
          }
          .value {
            color: #222;
            font-size: 0.24rem;
            line-height: 0.34rem;
            .unit {
              font-size: 0.14rem;
            }
          }
        }
        .right-icon {
          position: absolute;
          top: 0.15rem;
          right: 0.2rem;
        }
        &:nth-of-type(1) {
          .svg-icon {
            width: 0.15rem;
            height: 0.3rem;
          }
        }
        &:nth-of-type(2) {
          .svg-icon {
            width: 0.24rem;
            height: 0.21rem;
          }
        }
        &:nth-of-type(3) {
          .svg-icon {
            width: 0.21rem;
            height: 0.21rem;
          }
        }
        &:nth-of-type(4) {
          .svg-icon {
            width: 0.22rem;
            height: 0.22rem;
          }
        }
        &:nth-of-type(5) {
          .svg-icon {
            width: 0.23rem;
            height: 0.26rem;
          }
        }
        &:nth-of-type(6) {
          .svg-icon {
            width: 0.26rem;
            height: 0.25rem;
          }
        }
        &:nth-of-type(7) {
          .svg-icon {
            width: 0.23rem;
            height: 0.22rem;
          }
        }
        &:nth-of-type(8) {
          .svg-icon {
            width: 0.24rem;
            height: 0.27rem;
          }
        }
        &:nth-of-type(9) {
          .svg-icon {
            width: 0.24rem;
            height: 0.22rem;
          }
        }
        &:nth-of-type(10) {
          .svg-icon {
            width: 0.2rem;
            height: 0.25rem;
          }
        }
        &:nth-of-type(11) {
          .svg-icon {
            width: 0.23rem;
            height: 0.25rem;
          }
        }
        &:nth-of-type(12) {
          .svg-icon {
            width: 0.23rem;
            height: 0.23rem;
          }
        }
      }
      .sensor-item + .sensor-item {
        margin-left: 0.08rem;
      }
    }
    .sensor-chart-container {
      width: 50%;
      height: 2.8rem;
      margin: 0 auto;
      #sensor-chart {
        width: 100%;
        height: 100%;
      }
    }
  }
  .env-live-container {
    width: 57.3%;
    margin: 0.8rem auto;
    text-align: center;
    .camera-list {
      display: flex;
      align-items: center;
      width: 100%;
      height: 0.8rem;
      padding: 0 0.16rem;
      margin: 0.3rem 0 0.6rem 0;
      box-shadow: 0 0.02rem 0.12rem 0 rgba(184, 200, 227, 0.4);
      border-radius: 0.1rem;
      .camera-item {
        display: inline-block;
        color: #98a4af;
        height: 0.5rem;
        line-height: 0.5rem;
        padding: 0 0.34rem;
        border-radius: 0.25rem;
        font-size: 0.24rem;
        cursor: pointer;
        &.active {
          color: #fff;
          background-color: #2787f5;
        }
      }
      .camera-item + .camera-item {
        margin-left: 0.62rem;
      }
    }
    .live-video-container {
      width: 100%;
      height: 6.92rem;
      padding: 0 0.28rem 0.3rem 0.28rem;
      box-shadow: 0 0.02rem 0.16rem 0 rgba(184, 200, 227, 0.5);
      border-radius: 0.1rem;
      .header {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        height: 0.75rem;
        .live-btn {
          display: flex;
          align-items: center;
          color: #2787f5;
          font-size: 0.18rem;
          margin-right: 0.6rem;
          cursor: pointer;
          &.disabled {
            color: #98a4af;
          }
          .svg-icon {
            width: 0.15rem;
            height: 0.15rem;
            margin-left: 4px;
          }
        }
        .month-select {
          position: relative;
          color: #98a4af;
          font-size: 0.18rem;
          width: 1.3rem;
          height: 0.4rem;
          line-height: 0.4rem;
          border-radius: 0.05rem;
          border: 1px solid #ddd;
          cursor: pointer;
          &.active {
            color: #222;
          }
          .month-list {
            position: absolute;
            top: 0.44rem;
            width: 1.3rem;
            height: 1.8rem;
            padding: 0.1rem 0;
            overflow-y: scroll;
            background-color: #fff;
            box-shadow: 0 0.02rem 0.12rem 0 rgba(184, 200, 227, 0.4);
            border-radius: 0.05rem;
            z-index: 200;
            .month-item {
              height: 0.3rem;
              line-height: 0.3rem;
              &:hover {
                color: #fff;
                background-color: #2787f5;
              }
            }
          }
        }
      }
      .live-video-wrapper {
        width: 100%;
        height: calc(100% - 0.75rem);
        .video-player-wrapper {
          width: 100%;
          height: 100%;
        }
        .no-data-text {
          display: flex;
          justify-content: center;
          align-items: center;
          color: #9fa8b8;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .env-live-container,
  .env-data-container,
  .charts-info {
    .title {
      color: #222;
      font-size: 0.34rem;
      line-height: 0.48rem;
    }
    .desc {
      color: #98a4af;
      font-size: 0.18rem;
      line-height: 0.26rem;
    }
  }
  .footer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 3rem;
    background-color: #33a3fa;
    .footer-content {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      .left {
        margin-right: 0.78rem;
        .logo {
          width: 5.15rem;
          height: 1.34rem;
          background-image: url("../../assets/image/pc_spread_logo.png");
          background-size: 100% 100%;
          background-position: center center;
          background-repeat: no-repeat;
        }
        .go-shop-btn {
          color: #fff;
          font-size: 0.18rem;
          line-height: 0.25rem;
          text-align: right;
        }
      }
      .qr-code {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 1.4rem;
        height: 1.4rem;
        background-color: #fff;
        img {
          width: 1.2rem;
          height: 1.2rem;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.vjs-modal-dialog-content {
  display: none !important;
}
.vjs-error .vjs-error-display:before {
  display: none !important;
}
.video-js .vjs-big-play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

