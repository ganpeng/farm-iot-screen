<template>
  <div id="rose-chart">
    <dv-charts :option="option"/>
  </div>
</template>
<script>
import constants from '@/util/constants';
export default {
  name: "RoseChart",
  data() {
    return {
      option: {}
    };
  },
  async created() {
    try {
      let year = new Date().getFullYear();
      let res = await this.$service.getStatisticsPlant({farmId: 0, year});
      if (res && res.code === 0) {
        this.plantConfig = this.getPlantConfig(res.data, '0');
      }
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    getPlantConfig(data) {
      return {
        series: [
          {
            type: "pie",
            radius: "70%",
            roseSort: false,
            data: [
              { name: "水稻", value: data.riceArea },
              { name: "大豆", value: data.soyaArea },
              { name: "玉米", value: data.cornArea },
              { name: "其他粮食", value: data.otherGrainArea },
              { name: "其他", value: data.otherCropArea }
            ],
            insideLabel: {
              show: false
            },
            outsideLabel: {
              formatter: "{name} {percent}%",
              labelLineEndLength: 10,
              style: {
                fill: "#9FA8B8"
              },
              labelLineStyle: {
                stroke: "#9FA8B8"
              }
            },
            roseType: true
          }
        ],
        color: constants.colors
      };
    },
    createData() {
      const { randomExtend } = this;
      this.option = {
        series: [
          {
            type: "pie",
            radius: "70%",
            roseSort: false,
            data: [
              { name: "水稻", value: randomExtend(40, 70) },
              { name: "大豆", value: randomExtend(20, 30) },
              { name: "玉米", value: randomExtend(10, 50) },
              { name: "其他粮食", value: randomExtend(5, 20) },
              { name: "其他", value: randomExtend(40, 50) }
            ],
            insideLabel: {
              show: false
            },
            outsideLabel: {
              formatter: "{name} {percent}%",
              labelLineEndLength: 10,
              style: {
                fill: "#fff"
              },
              labelLineStyle: {
                stroke: "#fff"
              }
            },
            roseType: true
          }
        ],
        color: constants.colors
      };
    },
    randomExtend(minNum, maxNum) {
      if (arguments.length === 1) {
        return parseInt(Math.random() * minNum + 1, 10);
      } else {
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      }
    }
  },
  mounted() {
    const { createData } = this;
    createData();
    setInterval(createData, 30000);
  }
};
</script>
<style lang="scss" scoped>
#rose-chart {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  .dv-charts-container {
    height: calc(100% - 10px);
  }
}
</style>
