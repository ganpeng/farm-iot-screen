<template>
  <div v-if="visible" class="controller-dialog-container">
    <div class="controller-dialog-content border-icon4">
      <span @click="hide" class="controller-close-btn">
        <svg-icon icon-class="video_dialog_close_btn"></svg-icon>
      </span>
      <div class="control-content">
        <ul class="controller-tab-list">
          <li
            @click="modeChangeHandler(0)"
            :class="[
              'controller-tab-item',
              controllerTabActiveIndex === 0 && 'active',
            ]"
          >
            手动模式
          </li>
          <li
            @click="modeChangeHandler(1)"
            :class="[
              'controller-tab-item',
              controllerTabActiveIndex === 1 && 'active',
            ]"
          >
            自动模式
          </li>
          <li
            @click="modeChangeHandler(2)"
            :class="[
              'controller-tab-item',
              controllerTabActiveIndex === 2 && 'active',
            ]"
          >
            定时模式
          </li>
        </ul>
        <div class="controller-tab-content">
          <p class="controller-tip">{{ controllerTip }}</p>
          <div class="my-form">
            <div
              v-if="controllerTabActiveIndex === 0"
              class="controller-tab-content-item first"
            >
              <div class="controller-content-left">
                <ul class="dcfkg-list">
                  <li v-for="index in 10" :key="index" class="dcfkg-item">
                    <span class="title"
                      ><i
                        :class="[
                          controllerDataByProp(`Dcfkg${padZero(index)}`) === '1'
                            ? 'online'
                            : 'offline',
                        ]"
                        >•</i
                      >电磁阀{{ padZero(index) }} &nbsp;</span
                    >
                    <input
                      class="my-switch switch-anim"
                      type="checkbox"
                      :checked="
                        controllerDataByProp(`Dcfkg${padZero(index)}`) === '1'
                      "
                      @click="
                        dcfkgChangeHandler(
                          controllerDataByProp(`Dcfkg${padZero(index)}`),
                          `Dcfkg${padZero(index)}`
                        )
                      "
                    />
                  </li>
                </ul>
                <div class="ben-wrapper">
                  <div class="ben">
                    <span class="title"
                      ><i
                        :class="[
                          controllerDataByProp(`SubmersiblePump`) === '1'
                            ? 'online'
                            : 'offline',
                        ]"
                        >•</i
                      >潜水泵 &nbsp;</span
                    >
                    <input
                      class="my-switch switch-anim"
                      type="checkbox"
                      :checked="controllerDataByProp(`SubmersiblePump`) === '1'"
                      @click="
                        dcfkgChangeHandler(
                          controllerDataByProp(`SubmersiblePump`),
                          `SubmersiblePump`
                        )
                      "
                    />
                  </div>
                  <div class="ben">
                    <span class="title"
                      ><i
                        :class="[
                          controllerDataByProp(`SubmersiblePump2`) === '1'
                            ? 'online'
                            : 'offline',
                        ]"
                        >•</i
                      >潜水泵02 &nbsp;</span
                    >
                    <input
                      class="my-switch switch-anim"
                      type="checkbox"
                      :checked="controllerDataByProp(`SubmersiblePump2`) === '1'"
                      @click="
                        dcfkgChangeHandler(
                          controllerDataByProp(`SubmersiblePump2`),
                          `SubmersiblePump2`
                        )
                      "
                    />
                  </div>
                </div>
                <div class="ben">
                  <span class="title"
                    ><i
                      :class="[
                        controllerDataByProp(`PipelinePump`) === '1'
                          ? 'online'
                          : 'offline',
                      ]"
                      >•</i
                    >管道泵 &nbsp;</span
                  >
                  <input
                    class="my-switch switch-anim"
                    type="checkbox"
                    :checked="controllerDataByProp(`PipelinePump`) === '1'"
                    @click="
                      dcfkgChangeHandler(
                        controllerDataByProp(`PipelinePump`),
                        `PipelinePump`
                      )
                    "
                  />
                </div>
              </div>
              <div class="controller-content-right">
                <div class="c-img"></div>
              </div>
            </div>
            <div
              v-if="controllerTabActiveIndex === 1"
              class="controller-tab-content-item"
            >
              <div class="el-form-item" label="轮灌间隔" required>
                <div class="label">轮灌间隔</div>
                <input
                  :value="controllerDataByProp('RotIrrItva')"
                  @input="inputHandler($event, 'RotIrrItva')"
                />
                <span class="unit">&nbsp;(秒)</span>
                <span class="tip">2次轮灌的时间间隔为轮灌间隔</span>
                <div class="error-message">
                  {{ errorMessage["RotIrrItva"] }}
                </div>
              </div>
              <div class="el-form-item" label="轮灌次数" required>
                <div class="label">轮灌次数</div>
                <input
                  :value="controllerDataByProp('RotIrrCount')"
                  @input="inputHandler($event, 'RotIrrCount')"
                />
                <span class="tip">10个电磁阀门轮流开启1圈为轮灌1次</span>
                <div class="error-message">
                  {{ errorMessage["RotIrrCount"] }}
                </div>
              </div>
              <div class="el-form-item" label="单个阀门运行时间" required>
                <div class="label">单个阀门运行时间</div>
                <input
                  :value="controllerDataByProp('SingleValveRunTime')"
                  @input="inputHandler($event, 'SingleValveRunTime')"
                />
                <span class="unit">&nbsp;(秒)</span>
                <span class="tip">1个电磁阀门运行时长</span>
                <div class="error-message">
                  {{ errorMessage["SingleValveRunTime"] }}
                </div>
              </div>
            </div>
            <div
              v-if="controllerTabActiveIndex === 2"
              class="controller-tab-content-item"
            >
              <div class="el-form-item" label="轮灌间隔" required>
                <div class="label">轮灌间隔</div>
                <input
                  :value="controllerDataByProp('RotIrrItva')"
                  @input="inputHandler($event, 'RotIrrItva')"
                />
                <span class="unit">&nbsp;(秒)</span>
                <span class="tip">2次轮灌的时间间隔为轮灌间隔</span>
                <div class="error-message">
                  {{ errorMessage["RotIrrItva"] }}
                </div>
              </div>
              <div class="el-form-item" label="轮灌次数" required>
                <div class="label">轮灌次数</div>
                <input
                  :value="controllerDataByProp('RotIrrCount')"
                  @input="inputHandler($event, 'RotIrrCount')"
                />
                <span class="tip">10个电磁阀门轮流开启1圈为轮灌1次</span>
                <div class="error-message">
                  {{ errorMessage["RotIrrCount"] }}
                </div>
              </div>
              <div class="el-form-item" label="单个阀门运行时间" required>
                <div class="label">单个阀门运行时间</div>
                <input
                  :value="controllerDataByProp('SingleValveRunTime')"
                  @input="inputHandler($event, 'SingleValveRunTime')"
                />
                <span class="unit">&nbsp;(秒)</span>
                <span class="tip">1个电磁阀门运行时长</span>
                <div class="error-message">
                  {{ errorMessage["SingleValveRunTime"] }}
                </div>
              </div>
              <div class="el-form-item" label="定时运行间隔" required>
                <div class="label">定时运行间隔</div>
                <input
                  :value="controllerDataByProp('IntervalDays')"
                  @input="inputHandler($event, 'IntervalDays')"
                />
                <span class="unit">&nbsp;(天)</span>
                <span class="tip"
                  >每次间隔指定天数后的定时时间点根据设定的轮灌间隔，轮灌次数，单个阀门运行时间执行</span
                >
                <div class="error-message">
                  {{ errorMessage["IntervalDays"] }}
                </div>
              </div>
              <div class="el-form-item" label="定时开始时间" required>
                <div class="label">定时开始时间</div>
                <date-picker v-model="timing" @input="timeChangeHandler($event)" type="time" value-type="format" format="HH:mm"></date-picker>
                <span class="tip">在此时间开始运行</span>
                <div class="error-message">{{ errorMessage["timing"] }}</div>
              </div>
              <div class="el-form-item" label="定时结束日期" required>
                <div class="label">在此时间开始运行</div>
                <date-picker v-model="end" @input="endChangeHandler($event)" type="date" value-type="format" format="YYYY-M-D"></date-picker>
                <span class="tip">在结束日期0点结束运行</span>
                <div class="error-message">{{ errorMessage["end"] }}</div>
              </div>
            </div>
          </div>
        </div>

      </div>
        <button
          class="btn-style-two edit-bottom-btn"
          @click="commitController"
        >
          执行
        </button>
    </div>
  </div>
</template>
<script>
import _ from "lodash";
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/zh-cn';
export default {
  name: "ControllerDialog",
  components: {DatePicker},
  props: {
    controller: {
      type: Object,
      default: () => {}
    },
    deviceName: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      visible: false,
      timing: "",
      end: "",
      controllerInfo: {},
      controllerLastData: [],
      controllerLastDataMap: {},
      currentMode: "",
      selectMapPositionVisible: false,
      errorMessage: {},
    };
  },
  computed: {
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
    controllerTip() {
      let tip = "";
      switch (this.controllerTabActiveIndex) {
        case 0:
          tip = "手动模式下，需要手动开启或关闭每个电磁阀，潜水泵和管道泵";
          break;
        case 1:
          tip = "自动模式下，可自动控制全部电磁阀，潜水泵和管道泵进行轮灌";
          break;
        case 2:
          tip = "定时模式下，可定时自动控制全部电磁阀，潜水泵和管道泵进行轮灌";
          break;
        default:
          tip = "";
      }
      return tip;
    },
    changedModeLabel() {
      let label = "";
      switch (this.controllerTabActiveIndex) {
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
  },
  methods: {
    async show() {
      try {
        this.visible = true;
        await this.$nextTick();
        let {deviceName} = this.controller;
        if (deviceName) {
          this.getControllerLastData(deviceName);
        }
      } catch (err) {
        console.log(err);
      }
    },
    hide() {
      this.visible = false;
    },
    getControllerLastData(deviceName) {
      this.$service
        .getControllerLastData(deviceName)
        .then((res) => {
          if (res && res.code === 0) {
            this.controllerLastData = res.data || [];
            this.currentMode = this.controllerTabActiveIndex;
            this.controllerLastData.forEach((item, index) => {
              let key = item.metric;
              _.set(this.controllerLastDataMap, key, index);
            });
            this.formatData();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    formatData() {
      let timeHour = _.get(
        this.controllerLastData.find((item) => item.metric === "TimingHour"),
        "value"
      );
      let timeMinute = _.get(
        this.controllerLastData.find((item) => item.metric === "TimingMinute"),
        "value"
      );
      let endYear = _.get(
        this.controllerLastData.find((item) => item.metric === "EndYear"),
        "value"
      );
      let endMonth = _.get(
        this.controllerLastData.find((item) => item.metric === "EndMonth"),
        "value"
      );
      let endDay = _.get(
        this.controllerLastData.find((item) => item.metric === "EndDay"),
        "value"
      );
      this.timing = timeHour && timeMinute ? `${timeHour}:${timeMinute}` : "";
      this.end =
        endYear && endMonth && endDay ? `${endYear}-${endMonth}-${endDay}` : "";
    },
    dcfkgChangeHandler(value, key) {
      _.set(this.errorMessage, key, "");
      this.controllerLastData = this.controllerLastData.map((item) => {
        if (item.metric === key) {
          if (value === "0") {
            item.value = "1";
          } else {
            item.value = "0";
          }
        }
        return item;
      });
    },
    inputHandler(e, key) {
      let value = e.target.value;
      _.set(this.errorMessage, key, "");
      this.controllerLastData = this.controllerLastData.map((item) => {
        if (item.metric === key) {
          item.value = value;
        }
        return item;
      });
    },
    timeChangeHandler(value) {
      _.set(this.errorMessage, "timing", "");
      this.timing = value;
      let time = _.split(value, ":");
      this.controllerLastData = this.controllerLastData.map((item) => {
        if (item.metric === "TimingHour") {
          item.value = _.get(time, "0");
        }
        if (item.metric === "TimingMinute") {
          item.value = _.get(time, "1");
        }
        return item;
      });
    },
    endChangeHandler(value) {
      _.set(this.errorMessage, "end", "");
      this.end = value;
      let date = _.split(value, "-");
      this.controllerLastData = this.controllerLastData.map((item) => {
        if (item.metric === "EndYear") {
          item.value = _.get(date, "0");
        }
        if (item.metric === "EndMonth") {
          item.value = _.get(date, "1");
        }
        if (item.metric === "EndDay") {
          item.value = _.get(date, "2");
        }
        return item;
      });
    },
    modeChangeHandler(activeIndex) {
      if (activeIndex === 0) {
        this.controllerLastData = this.controllerLastData.map((item) => {
          if (item.metric === "Automatic") {
            item.value = "0";
          }
          if (item.metric === "Manual") {
            item.value = "0";
          }
          return item;
        });
      } else if (activeIndex === 1) {
        this.controllerLastData = this.controllerLastData.map((item) => {
          if (item.metric === "Automatic") {
            item.value = "0";
          }
          if (item.metric === "Manual") {
            item.value = "1";
          }
          return item;
        });
      } else {
        this.controllerLastData = this.controllerLastData.map((item) => {
          if (item.metric === "Automatic") {
            item.value = "1";
          }
          if (item.metric === "Manual") {
            item.value = "0";
          }
          return item;
        });
      }
    },
    padZero(index) {
      if (index > 0 && index < 10) {
        return `0${index}`;
      } else {
        return index;
      }
    },
    validator() {
      let errorMessage = {};
      if (this.controllerTabActiveIndex === 1) {
        let errorPropList = ["RotIrrItva", "RotIrrCount", "SingleValveRunTime"];
        errorPropList.map((item) => {
          let value = _.get(
            this.controllerLastData,
            `${_.get(this.controllerLastDataMap, item)}.value`
          );
          if (value === "" || value === undefined || value === null) {
            _.set(errorMessage, item, "该项不能为空");
          } else if (!/^[+]{0,1}(\d+)$/.test(value)) {
            _.set(errorMessage, item, "请输入正整数");
          }
        });
      }

      if (this.controllerTabActiveIndex === 2) {
        let errorPropList = [
          "RotIrrItva",
          "RotIrrCount",
          "SingleValveRunTime",
          "IntervalDays",
        ];
        errorPropList.map((item) => {
          let value = _.get(
            this.controllerLastData,
            `${_.get(this.controllerLastDataMap, item)}.value`
          );
          if (value === "" || value === undefined || value === null) {
            _.set(errorMessage, item, "该项不能为空");
          } else if (!/^[+]{0,1}(\d+)$/.test(value)) {
            _.set(errorMessage, item, "请输入正整数");
          }
        });
        if (
          this.timing === "" ||
          this.timing === undefined ||
          this.timing === null
        ) {
          _.set(errorMessage, "timing", "该项不能为空");
        }
        if (
          this.end === "" ||
          this.timing === undefined ||
          this.timing === null
        ) {
          _.set(errorMessage, "end", "该项不能为空");
        }
      }
      return errorMessage;
    },
    async commitController() {
      try {
        // let { id } = this.$route.params;
        let {id, deviceName} = this.controller;
        let errorMessage = this.validator();
        if (_.keys(errorMessage).length > 0) {
          this.errorMessage = _.assign({}, errorMessage);
          return false;
        }
        let reqBody = [];
        if (this.controllerTabActiveIndex === 0) {
          let filterList = [
            "Dcfkg01",
            "Dcfkg02",
            "Dcfkg03",
            "Dcfkg04",
            "Dcfkg05",
            "Dcfkg06",
            "Dcfkg07",
            "Dcfkg08",
            "Dcfkg09",
            "Dcfkg10",
            "SubmersiblePump",
            "SubmersiblePump2",
            "PipelinePump",
            "Manual",
            "Automatic",
          ];
          reqBody = this.controllerLastData.filter((item) => {
            let index = filterList.findIndex((_item) => _item === item.metric);
            if (index >= 0) {
              return item;
            }
          });
        } else if (this.controllerTabActiveIndex === 1) {
          let filterList = [
            "RotIrrItva",
            "RotIrrCount",
            "SingleValveRunTime",
            "Manual",
            "Automatic",
          ];
          reqBody = this.controllerLastData.filter((item) => {
            let index = filterList.findIndex((_item) => _item === item.metric);
            if (index >= 0) {
              return item;
            }
          });
        } else {
          let filterList = [
            "RotIrrItva",
            "RotIrrCount",
            "SingleValveRunTime",
            "IntervalDays",
            "TimingHour",
            "TimingMinute",
            "EndYear",
            "EndMonth",
            "EndDay",
            "Manual",
            "Automatic",
          ];
          let timingSplit = this.timing.split(":");
          let endSplit = this.end.split("-");
          reqBody = this.controllerLastData
            .filter((item) => {
              let index = filterList.findIndex(
                (_item) => _item === item.metric
              );
              if (index >= 0) {
                return item;
              }
            })
            .map((item) => {
              if (item.metric === "TimingHour") {
                item.value = timingSplit[0];
              }
              if (item.metric === "TimingMinute") {
                item.value = timingSplit[1];
              }
              if (item.metric === "EndYear") {
                item.value = endSplit[0];
              }
              if (item.metric === "EndMonth") {
                item.value = endSplit[1];
              }
              if (item.metric === "EndDay") {
                item.value = endSplit[2];
              }
              return item;
            });
        }
        let commandList = reqBody.map((item) => {
          return {
            name: item.metric,
            value: item.value,
          };
        });
        let res = await this.$service.getControllerRun({
          id,
          deviceName,
          commandList,
        });
        if (res && res.code === 0) {
          alert(`控制设备指令发送成功`)
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.controller-dialog-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 900;
  .controller-dialog-content {
    display: flex;
    justify-content: center;
    align-items: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    width: 60%;
    height: 54%;
    padding: 2.8% 2% 0.8% 2%;
    .controller-close-btn {
      position: absolute;
      top: 0.2rem;
      right: 0.2rem;
      cursor: pointer;
      .svg-icon {
        width: 0.3rem;
        height: 0.3rem;
      }
    }
    .btn-style-two {
      position: absolute;
      bottom: 0.5rem;
      right: 0.2rem;
      width: 0.8rem;
      height: 0.32rem;
      line-height: 0.32rem;
      font-size: 0.12rem;
      font-weight: 400;
      color: #DAEDFF;
      background: #2692FF;
      border-radius: 0.04rem;
      border: none;
      cursor: pointer;
    }
    .control-content {
      width: 100%;
      height: 100%;
      .controller-tab-list {
        display: flex;
        .controller-tab-item {
          width: 1rem;
          height: 0.4rem;
          line-height: 0.4rem;
          font-size: 0.14rem;
          text-align: center;
          color: #b6d8ff;
          border-radius: 0.04rem;
          border: 1px solid #b6d8ff;
          cursor: pointer;
          &.active {
            color: #fff;
            background-color: #2eabff;
            border-color: #2eabff;
          }
        }
        .controller-tab-item + .controller-tab-item {
          margin-left: 0.2rem;
        }
      }

      .controller-tab-content-item {
        &.first {
          display: flex;
          // align-items: center;
        }
        .controller-content-left {
          width: 40%;
          height: 100%;
        }
        .controller-content-right {
          width: 60%;
          .c-img {
            width: 100%;
            height: 90%;
            background-image: url('../../../assets/image/controller_img.png');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center center;
          }
        }
        .dcfkg-list {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          .dcfkg-item {
            width: 2rem;
            margin: 0.1rem 0;
            color: #417FC8;
          }
        }
        .ben {
          margin: 0.2rem 0;
          color: #417FC8;
        }
        .ben-wrapper {
          display: flex;
          align-items: center;
          .ben {
            width: 2rem;
          }
        }
        .el-form-item {
          display: flex;
          align-items: center;
          margin-bottom: 0.2rem;
          .label {
            width: 2rem;
            text-align: right;
            font-size: 0.14rem;
            margin-right: 0.1rem;
            color: #b6d8ff;
          }
          input {
            outline: none;
            width: 1.6rem;
            height: 0.32rem;
            color: #fff;
            font-size: 0.14rem;
            border: 1px solid #b6d8ff;
            border-radius: 0.04rem;
            text-indent: 0.1rem;
          }
          .unit, .tip {
            color: #b6d8ff;
            font-size: 0.12rem;
            margin-left: 0.1rem;
          }
        }
        .error-message {
          font-size: 0.12rem;
          line-height: 0.12rem;
          color: #f35151;
          margin-left: 0.2rem;
        }
        i {
          &.offline {
            color: #f35151;
          }
          &.online {
            color: #7ed321;
          }
        }
      }
      .controller-tip {
        margin: 0.1rem 0;
        font-size: 0.12rem;
        color: #b6d8ff;
      }
    }
  }
}
</style>
<style lang="scss">
.mx-datepicker {
  width: 1.6rem;
  .mx-input-wrapper {
    input {
      outline: none;
      width: 1.6rem;
      height: 0.32rem;
      color: #fff;
      font-size: 0.14rem;
      border: 1px solid #b6d8ff;
      border-radius: 0.04rem;
      background-color: transparent;
      text-indent: 0.1rem;
      padding: 0;
    }
  }
}
</style>