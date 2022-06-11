<template>
  <div v-if="visible" class="my-dialog-container">
    <div class="my-dialog border-icon19">
      <div class="title">{{name}}</div>
      <div class="controller-content">
        <div
          v-if="controllerLastData.length > 0"
          class="controller-content-inner-wrapper"
        >
          <div class="current-mode-title">当前模式：{{ currentModeLabel }}</div>
          <div class="current-mode-content">
            <div
              v-if="controllerTabActiveIndex === 0"
              class="controller-tab-content-item"
            >
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
      <span @click="hide" class="close-btn">
        <svg-icon icon-class="video_dialog_close_btn"></svg-icon>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: "ControllerLastDataDialog",
  data() {
    return {
      visible: false,
      // 控制设备
      controllerLastData: [],
      currentMode: "",
      name: '',
      deviceName: ''
    };
  },
  computed: {
    controllerDataByProp() {
      return (prop) => {
        let obj = this.controllerLastData.find((item) => item.metric === prop);
        return this.$_.get(obj, "value");
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
      let automaticValue = this.$_.get(automatic, "value");
      let manualValue = this.$_.get(manual, "value");
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
  },
  methods: {
    async show(deviceName, name) {
      try {
        await this.$nextTick();
        this.visible = true;
        this.deviceName = deviceName;
        this.name = name;
        this.getControllerLastData();
      } catch (err) {
        console.log(err);
      }
    },
    hide() {
      this.visible = false;
      this.controllerLastData = [];
      this.currentMode = '';
      this.name = '';
      this.deviceName = '';
    },
    getControllerLastData() {
      this.$service.getControllerLastData(this.deviceName)
        .then((res) => {
          if (res && res.code === 0) {
            this.controllerLastData = res.data || [];
            this.currentMode = this.controllerTabActiveIndex;
          }
        }).catch((err) => {
          console.log(err);
        });
    },
    padZero(index) {
      if (index > 0 && index < 10) {
        return `0${index}`;
      } else {
        return index;
      }
    }
  },
};
</script>
<style lang="scss" scoped>
.my-dialog-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 10;
  .my-dialog {
    position: absolute;
    top: 50%;
    left: calc(50% + 0.5rem);
    transform: translate(-50%, -50%);
    width: 90%;
    height: 3.72rem;
    padding: 0.2rem;
    z-index: 9;
    .close-btn {
      position: absolute;
      top: -0.4rem;
      right: 0;
      cursor: pointer;
      .svg-icon {
        width: 0.3rem;
        height: 0.3rem;
      }
    }
    .title {
      color: #fff;
      font-size: 0.18rem;
      text-align: center;
    }
    .controller-content {
      position: relative;
      width: 100%;
      height: calc(100% - 0.52rem);
      padding: 0.2rem;
      .current-mode-title {
        color: #F0F0F0;
        font-size: 0.14rem;
      }
      .current-mode-content {
        .controller-tab-content-item {
          .dcfkg-list {
            display: flex;
            margin-top: 0.3rem;
            .dcfkg-item {
              .title {
                color: #9FA8B8;
                font-size: 0.14rem;
                i {
                  display: inline-block;
                  width: 0.06rem;
                  height: 0.06rem;
                  margin-right: 0.08rem;
                  &.online {
                    color: #7ED321;
                  }
                  &.offline {
                    color: #F35151;
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
                color: #9FA8B8;
                font-size: 0.14rem;
                i {
                  display: inline-block;
                  width: 0.06rem;
                  height: 0.06rem;
                  margin-right: 0.08rem;
                  &.online {
                    color: #7ED321;
                  }
                  &.offline {
                    color: #F35151;
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
            color: #9FA8B8;
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
        color: #9FA8B8;
        margin-top: 0.20rem;
      }
    }
  }
}
</style>