<template>
  <div class="warning-list-container">
    <dv-scroll-board class="my-scroll-boad" :config="config"/>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
import _ from 'lodash';
export default {
  name: 'WarningList',
  props: {
    warningList: {
      type: Array,
      default: () => []
    },
    status: {
      type: Number,
      default: 1
    },
    rowNum: {
      type: Number,
      default: 5
    },
    fontSize: {
      type: Number,
      default: 0.12
    }
  },
  computed: {
    ...mapGetters({
      dict: 'dict/dict'
    }),
    metricList() {
      return this.dict.metric || [];
    },
    headerList() {
      let headerList = ['设备名称', '预警类型', '设备类型', '预警详情', '预警时间'];
      return headerList.map((item) => {
        return `<span class="header-item">${item}</span>`;
      });
    },
    config() {
      let data = this.serializeAlertData(this.warningList);
      return {
        data,
        waitTime: 2000,
        headerHeight: this.status === 1 ? 46 : 32,
        header: this.headerList,
        headerBGC: '#11294D',
        oddRowBGC: '#0E1831', // 奇数行
        evenRowBGC: '#0D1F3A', // 偶数行
        rowNum: this.rowNum,
        align: ['left']
      };
    }
  },
  data() {
    return {
      warningType: {
        DEVICE_ERROR: '设备异常',
        MODEL_WARN: '模型预警'
      },
      deviceType: {
        1: '枪机摄像头',
        2: '球机摄像头',
        4: 'NVR摄像头',
        0: '传感器'
      }
    };
  },
  methods: {
    serializeAlertData(warningList) {
      let list =warningList.map((item) => {
        let res = [];
        let description = '';
        // &uarr;上升 &darr;下降
        if (_.isArray(item.description)) {
          description = item.description.reduce((prev, curr) => {
            let {metric, up, value, low, min, max} = curr;
            let obj = this.metricList.find((item) => item.value === metric.toUpperCase());
            let name = _.get(obj, 'name') || '';
            let unit = _.get(obj, 'unit') || '';
            prev += `${name}: ${value}${unit},`;
            if (up && max && value) {
              if (parseFloat(value) > parseFloat(max)) {
                prev += `<span class="up-danger">&uarr;${up}${unit}</span>,`;
              } else {
                prev += `<span>&uarr;${up}</span>,`;
              }
            }
            prev += ' ';
            if (max) {
              prev += `最高阈值: ${max}${unit}`;
            }
            prev += ' ';
            if (low && min && value) {
              if (parseFloat(value) < parseFloat(min)) {
                prev += `<span class="low-danger">&darr;${low}</span>,`;
              } else {
                prev += `<span>&darr;${low}</span>, `;
              }
            }

            if (min) {
              prev += `最低阈值: ${min}`;
            }
            return prev;
          }, '');
        } else {
          description = item.description.description;
        }
        let content = `<span class="warning-item" style="font-size: ${this.fontSize}rem;">
                        <span class="name">${item.name === null ? '/' : item.name}</span>
                        <span class="warning-type">${_.get(this.warningType, item.warnType)}</span>
                        <span class="device-type">${_.get(this.deviceType, item.deviceType)}</span>
                        <span class="name-desc">
                          <span class="farm-name">${item.farmName}</span>：<span class="desc">${description}</span>
                        </span>
                        <span class="date">${this.$util.dateFormat('mm-dd HH:MM:SS', new Date(item.warnTime))}</span>
                     </span>`;
        res.push(content);
        return res;
      });
      return list;
    }
  }
};
</script>
<style lang="scss">
.warning-list-container {
  width: 100%;
  height: 100%;
  .my-scroll-boad {
    height: 100%;
    font-weight: 400;
    .header {
      display: flex;
      padding: 0 10px;
      .header-item {
        font-size: 0.14rem;
        color: #70CAEE;
        font-weight: 500;
        padding: 0!important;
        &:nth-of-type(1) {
          width: 1.2rem!important;
        }
        &:nth-of-type(2) {
          width: 1.2rem!important;
        }
        &:nth-of-type(3) {
          width: 1.2rem!important;
        }
        &:nth-of-type(4) {
          flex: 1;
        }
        &:nth-of-type(5) {
          width: 1.3rem!important;
        }
        &:nth-of-type(6) {
          width: 0.6rem!important;
        }
      }
    }
    .warning-item {
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 100%;
      text-align: left;
      .warning-type {
        width: 1.2rem;
        color: #9FA8B8;
      }
      .device-type {
        width: 1.2rem;
        color: #9FA8B8;
      }
      .date {
        color: #EBC641;
        width: 1.3rem;
      }
      .name-desc {
        flex: 1;
        margin-right: 0.1rem;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .farm-name {
        // color: #f0f0f0;
        // color: #4BE660;
        color: #29E3FD;
      }
      .name {
        width: 1.2rem;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .prompt {
        width: 1rem;
      }
      .operator {
        width: 0.6rem;
      }
    }
  }
}
</style>