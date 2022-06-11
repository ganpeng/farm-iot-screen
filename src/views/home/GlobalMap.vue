<template>
  <div id="box" class="box"></div>
</template>
<script>
/* eslint-disable */
import echarts from "echarts";
import "echarts-gl";
import * as d3 from "d3";
export default {
  name: "GlobalMap",
  data() {
    return {
      img: null
    };
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler);
  },
  async created() {
    try {
      await this.$nextTick();
      this.init();
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    async init() {
      try {
        await this.$nextTick();
        let _this = this;
        let config = {
          // color: "#750be8",
          levels: 1,
          intensity: 4,
          threshold: 0.01
        };
        let imageUrl = require("@/assets/image/8.png");
        // let imageUrl = require("@/assets/image/蓝色.jpg");
        let image = await this.image(imageUrl);
        let canvas = document.createElement("canvas");
        canvas.width = 2048;
        canvas.height = 1024;
        let context = canvas.getContext("2d");

        context.lineWidth = 0.5;
        context.strokeStyle = config.color;
        context.fillStyle = config.color;
        context.shadowColor = config.color;

        let m = image.height;
        let n = image.width;
        let values = new Array(n * m);
        let contours = d3
          .contours()
          .size([n, m])
          .smooth(true);
        let projection = d3.geoIdentity().scale(canvas.width / n);
        let path = d3.geoPath(projection, context);

        for (let j = 0, k = 0; j < m; ++j) {
          for (let i = 0; i < n; ++i, ++k) {
            values[k] = image.data[k << 2] / 255;
          }
        }
        let opt = {
          image: canvas
        };
        var results = [];
        function update(threshold, levels) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          var thresholds = [];
          for (let i = 0; i < levels; i++) {
            thresholds.push((threshold + (1 / levels) * i) % 1);
          }
          results = contours.thresholds(thresholds)(values);
          redraw();
        }
        function redraw() {
          results.forEach(function(d, idx) {
            context.beginPath();
            path(d);
            context.globalAlpha = 1;
            context.stroke();
            if (idx > (config.levels / 5) * 3) {
              context.globalAlpha = 0.01;
              context.fill();
            }
          });
          if (_this && _this.onupdate) {
            _this.onupdate();
          }
        }

        d3.timer(function(t) {
          let threshold = (t % 10000) / 10000;
          update(threshold, 1);
        });

        this.initChart(opt);
        update(config.threshold, config.levels);
      } catch (err) {
        console.log("++++++++++++");
        console.log(err);
        console.log("++++++++++++");
      }
    },
    onupdate() {
      if (this.img) {
        this.img.dirty();
      }
    },
    async initChart(opt) {
      try {
        await this.$nextTick();
        let box = document.querySelector("#box");
        let myChart = echarts.init(box);
        this.myChart = myChart;
        let canvas2 = document.createElement("canvas");
        let mapChart = echarts.init(canvas2, null, {
          width: 2048,
          height: 1024
        });
        let contourChart = echarts.init(
          document.createElement("canvas"),
          null,
          {
            width: 2048,
            height: 1024
          }
        );
        let img = new echarts.graphic.Image({
          style: {
            image: opt.image,
            x: -1,
            y: -1,
            width: opt.image.width + 2,
            height: opt.image.height + 2
          }
        });
        this.img = img;
        contourChart.getZr().add(img);
        mapChart.setOption({
          series: [
            {
              type: "map",
              map: "world",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              boundingCoords: [[-180, 90], [180, -90]]
            }
          ]
        });
        let canvas1 = document.createElement("canvas");
        let mapChart1 = echarts.init(canvas1, null, {
          width: 2048,
          height: 1024
        });
        mapChart1.setOption({
          backgroundColor: "transparent",
          series: [
            {
              type: "map",
              map: "china",
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              boundingCoords: [[-180, 90], [180, -90]],
              label: {
                normal: {
                  show: false,
                  fontSize: 4,
                  lineHeigh: 4,
                  color: "#000"
                }
              },
              itemStyle: {
                normal: {
                  areaColor: "transparent",
                  borderWidth: 1,
                  borderType: "solid",
                  borderColor: "#a85000"
                }
              }
            }
          ]
        });
        let option = {
          globe: {
            // environment: require("@/assets/image/starfield.jpg"),
            // baseTexture: require("@/assets/image/蓝色.jpg"),
            baseTexture: require("@/assets/image/8.jpg"),
            shading: "lambert",
            light: {
              // 光照阴影
              main: {
                color: "blue", // 光照颜色
                intensity: 4.2, // 光照强度
                shadowQuality: "ultra", //阴影亮度
                shadow: true, // 是否显示阴影
                alpha: 40,
                beta: -30
              },
              ambient: {
                intensity: 4.6
              }
            },
            viewControl: {
              alpha: 30,
              beta: 160,
              distance: 240,
              autoRotateSpeed: 6,
              rotateSensitivity: 0, //鼠标旋转灵敏度，设置为0后无法旋转。
              zoomSensitivity: 0, //鼠标缩放灵敏度
              autoRotate: true, //自动旋转
              autoRotateAfterStill: 1 //鼠标停止后多久恢复旋转(为0时暂停后不恢复旋转)
            },
            postEffect: {
              //为画面添加高光，景深，环境光遮蔽（SSAO），调色等效果
              enable: true, //是否开启
              SSAO: {
                //环境光遮蔽
                radius: 1, //环境光遮蔽的采样半径。半径越大效果越自然
                intensity: 1, //环境光遮蔽的强度
                enable: true
              }
            },
            layers: [
              {
                type: "blend",
                blendTo: "emission",
                texture: contourChart,
                intensity: 4
              }
            ]
          },
          series: [
            {
              name: "lines3D",
              type: "lines3D",
              coordinateSystem: "globe",
              effect: {
                show: true,
                period: 2,
                trailWidth: 3,
                trailLength: 0.5,
                trailOpacity: 1,
                trailColor: "#0087f4"
              },
              blendMode: "lighter",
              lineStyle: {
                width: 1,
                color: "#0087f4",
                opacity: 0.2
              },
              data: this.serializeData(),
              silent: true
            }
          ]
        };
        myChart.setOption(option);

        window.addEventListener('resize', this.resizeHandler, false);
      } catch (err) {
        console.log("========");
        console.log(err);
        console.log("========");
      }
    },
    resizeHandler() {
      this.myChart.resize();
    },
    rodamData() {
      let longitude = 125.4;
      let longitude2 = Math.random() * 360 - 180;
      let latitude = 44.36;
      let latitude2 = Math.random() * 180 - 90;
      return {
        coords: [[longitude2, latitude2], [longitude, latitude]],
        value: (Math.random() * 3000).toFixed(2)
      };
    },
    serializeData() {
      let data = [
        {
          coords: [[117.11, 34.15], [125.4, 44.36]],
          value: (Math.random() * 3000).toFixed(2)
        },
        {
          coords: [[123.38, 41.8], [125.4, 44.36]],
          value: (Math.random() * 3000).toFixed(2)
        },
        {
          coords: [[112.01, 38.01], [125.4, 44.36]],
          value: (Math.random() * 3000).toFixed(2)
        },
        {
          coords: [[139.46, 35.42], [125.4, 44.36]],
          value: (Math.random() * 3000).toFixed(2)
        },
        {
          coords: [[116.58, 6.1], [125.4, 44.36]],
          value: (Math.random() * 3000).toFixed(2)
        },
        {
          coords: [[102.9, 25.31], [125.4, 32.01]],
          value: (Math.random() * 3000).toFixed(2)
        }
      ];

      for (let i = 0; i < 10; i++) {
        data = data.concat(this.rodamData());
      }
      return data;
    },
    image(url) {
      return new Promise(resolve => {
        var image = new Image();
        image.src = url;
        image.onload = () => {
          let canvas = document.createElement("canvas");
          canvas.width = image.width / 8;
          canvas.height = image.height / 8;
          let context = canvas.getContext("2d");
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          resolve(context.getImageData(0, 0, canvas.width, canvas.height));
        };
      });
    }
  }
};
</script>
<style lang="scss" scoped>
#box {
  width: 100%;
  height: 100%;
}
</style>

