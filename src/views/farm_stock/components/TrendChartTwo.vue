<template>
  <div class="trend-chart-inner-container">
    <div class="label-tag">
      <div
        @click="toggleTrendLabel(index)"
        :title="tagDisabled(item) && '最多可同时查看7项数据'"
        :class="['label-item', item.active && 'active', tagDisabled(item) && 'disabled']"
        v-for="(item, index) in trendLabelList" :key="item.name">
        <div :style="`background-color: ${ item.active ? item.color : '#667799'};`"/>
        {{item.name}}
      </div>
    </div>
    <div class="day-list">
      <div @click="changeDay(index)" v-for="(item, index) in dayList" :key="index" :class="['day-item', item.active && 'active']">
        {{item.label}}
      </div>
    </div>
    <div class="trend-chart-wrapper">
      <div v-show="trendDataList.length === 0" class="empty-container">
        <svg-icon icon-class="empty_icon"></svg-icon>
        <div class="tips">暂无数据</div>
      </div>
      <div v-show="trendDataList.length > 0" id="trend-chart"></div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts';
import _ from 'lodash';
import constants from '@/util/constants';
export default {
  name: 'TrendChartTwo',
  props: {
    deviceName: {
      type: String,
      default: ''
    },
    sensorType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dayList: [
        {
          label: '日',
          value: 1,
          active: true
        },
        {
          label: '7日',
          value: 7,
          active: false
        },
        {
          label: '30日',
          value: 30,
          active: false
        },
        {
          label: '6个月',
          value: 180,
          active: false
        },
        {
          label: '1年',
          value: 365,
          active: false
        }
      ],
      trendLabelList: [],
      trendDataList: [],
      myChart: null
    };
  },
  async created() {
    try {
      await this.$nextTick();
      this.getTrendData();
    } catch (err) {
      console.log(err);
    }
  },
  computed: {
    tagDisabled() {
      return (label) => {
        let activeLength = this.trendLabelList.filter((item) => item.active).length;
        return !label.active && activeLength >= 7;
      };
    }
  },
  methods: {
    setTrendLabelList() {
      if (this.sensorType === `水产养殖传感器`) {
        this.trendLabelList = _.cloneDeep(constants.waterTrendChartLabelList);
      } else if (this.sensorType === `气象传感器`) {
        this.trendLabelList = _.cloneDeep(constants.meteoroTrendChartLabelList);
      } else {
        this.trendLabelList = _.cloneDeep(constants.trendChartLabelList);
      }
    },
    async getTrendData() {
      try {
        await this.$nextTick();
        this.setTrendLabelList();
        let activeDay = this.dayList.find((item) => item.active);
        let days = _.get(activeDay, 'value');
        let res = await this.$service.getSensor({deviceName: this.deviceName, days});
        if (res && res.code === 0) {
          this.trendDataList = res.data;
          if (this.trendDataList.length > 0) {
            this.initCharts();
          } else {
            if (this.myChart) {
              this.myChart.clear();
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
    async initCharts() {
      try {
        let myChartId = document.getElementById('trend-chart');
        //高度计算
        this.chartssize(document.querySelector('.trend-chart-wrapper'), myChartId);
        let myChart = echarts.init(myChartId);
        this.myChart = myChart;
        // 为echarts对象加载数据
        myChart.clear();
        myChart.setOption(this.getOption(), true);
        //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
        window.addEventListener('resize', () => {
          this.chartssize(document.querySelector('.trend-chart-wrapper'), myChartId);
          this.myChart.resize();
        });
      } catch (err) {
        console.log(err);
      }
    },
    chartssize(container, charts) {
      function getStyle(el) {
        if (window.getComputedStyle) {
          return window.getComputedStyle(el, null);
        } else {
          return el.currentStyle;
        }
      }
      let wi = getStyle(container, 'width').width;
      let hi = getStyle(container, 'height').height;

      charts.style.width = wi;
      charts.style.height = hi;
    },
    getOption() {
      let trendDataList = this.trendLabelList.filter((item) => item.active);
      let colors = trendDataList.map((item) => item.color);
      let yAxis = trendDataList.map((item, index) => {
        return {
          name: item.unit,
          nameLocation: 'end',
          type: "value",
          position: "left",
          offset: index * 46,
          axisLine: {
            lineStyle: {
              color: item.color
            }
          },
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: ['#3D485D']
            }
          },
          axisLabel: {
            formatter: `{value}`
          }
        };
      });

      let trendOne = _.get(this.trendDataList, `0.orderDps`) || [];
      let xAxisData = trendOne.map((item) => item.timestamp).map((item) => {
        return this.$util.dateFormat('YY-mm-dd HH:MM:SS', new Date(item))
      });
      let series = trendDataList.map((item, index) => {
        let trend = this.trendDataList.find((trend) => trend.metric === item.metric);
        let orderDps = _.get(trend, 'orderDps') || [];
        let data = orderDps.map((item) => item.value);
        return {
          name: item.name,
          type: "line",
          smooth: true,
          yAxisIndex: index,
          data
        };
      });
      let gridLeft = `${(trendDataList.length * 3)}%`;
      return {
        color: colors,
        tooltip: {
          trigger: 'item',
          formatter: (params) => {
            let windDirection = params.seriesName === '风向' ? this.$util.getWindDirection(params.value) : '';
            return `<span>${params.name}</span><br />
                    <span>${params.seriesName}: </span>
                    <span style="color: ${params.color};">${params.value} ${windDirection}</span>`;
          }
        },
        grid: {
          top: '12%',
          right: "4%",
          left: gridLeft,
          bottom: '22%'
        },
        legend: {
          show: false
        },
        xAxis: [
          {
            type: "category",
            axisTick: {
              alignWithLabel: false
            },
            axisLabel: {
              color: '#9FA8B8'
            },
            data: xAxisData
          }
        ],
        yAxis,
        series
      };
    },
    toggleTrendLabel(index) {
      let active = _.get(this.trendLabelList, `${index}.active`);
      let length = this.trendLabelList.filter((item) => item.active).length;
      if (!active && length >= 7) {
        return false;
      }
      if (active && length === 1) {
        return false;
      }

      this.trendLabelList = this.trendLabelList.map((item, _index) => {
        if (index === _index) {
          item.active = !item.active;
        }
        return item;
      });

      if (this.myChart) {
        this.myChart.clear();
        this.myChart.setOption(this.getOption());
      }
    },
    changeDay(index) {
      this.dayList = this.dayList.map((item, _index) => {
        if (index === _index) {
          item.active = true;
        } else {
          item.active = false;
        }
        return item;
      });
      this.getTrendData();
    }
  }
};
</script>
<style lang="scss" scoped>
.trend-chart-inner-container {
  position: relative;
  height: 100%;
  .label-tag {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 0.5rem;
    .label-item {
      margin: 0.05rem;
      font-size: 0.12rem;
      display: flex;
      align-items: center;
      color: #667799;
      cursor: pointer;
      z-index: 200;
      &.active {
        color: #F0F0F0;
      }
      &.disabled {
        cursor: default;
      }
      div {
        width: 0.12rem;
        height: 0.12rem;
        margin-right: 0.05rem;
      }
    }
  }
  .day-list {
    position: absolute;
    top: 0.12rem;
    right: 0.2rem;
    display: flex;
    align-items: center;
    border-radius: 4px;
    overflow: hidden;
    .day-item {
      width: 0.5rem;
      height: 0.26rem;
      line-height: 0.26rem;
      color: #9FA8B8;
      font-size: 0.12rem;
      text-align: center;
      border: 1px solid #3E495E;
      cursor: pointer;
      &.active {
        color: #2EABFF;
        border-color: #2EABFF;
      }
    }
    .day-item:first-child {
      border-radius: 4px 0px 0px 4px;
    }
    .day-item:last-child {
      border-radius: 0px 4px 4px 0px;
    }
  }
  .trend-chart-wrapper {
    position: relative;
    width: 100%;
    height: calc(100% - 0.5rem);
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
        color: #9FA8B8;
        margin-top: 0.20rem;
      }
    }
  }
}
</style>
