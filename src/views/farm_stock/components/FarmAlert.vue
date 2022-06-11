<template>
  <div class="farm-alert-container">
    <dv-scroll-board class="scroll-boad1" :config="config"/>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
import _ from 'lodash';
export default {
  name: 'FarmAlert',
  props: {
    warningList: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapGetters({
      dict: 'dict/dict'
    }),
    metricList() {
      return this.dict.metric || [];
    },
    config() {
      let data = this.serializeAlertData(this.warningList);
      return {
        // header: ['设备ID/设备名称', '所属农场', '预警类型', '预警详情', '发出时间'].map((item) => {
        //   return `<span class="table-title">${item}</span>`;
        // }),
        data,
        headerBGC: '#162E57',
        oddRowBGC: '#101B36', // 奇数行
        evenRowBGC: '#152B4C', // 偶数行
        headerHeight: 40,
        // columnWidth: [260, 200, 200, 640, 160],
        align: ['left']
      };
    }
  },
  data() {
    return {
      warnTypeOption: {
        'DEVICE_ERROR': '设备异常',
        'MODEL_WARN': '模型预警'
      },
      statusOption: {
        'HANDLED': '已处理',
        'UNHANDLED': '未处理',
        'RECOVER': '自动恢复'
      }
    };
  },
  methods: {
    serializeAlertData(warningList) {
      return warningList.map((item) => {
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
        // res.push(item.deviceName || '/');
        // res.push(item.farmName || '/');
        // res.push(this.warnTypeOption[item.warnType]);

        let content = `${this.$util.dateFormat('mm-dd HH:MM:SS', new Date(item.warnTime))}&nbsp;&nbsp; <span style="color: #9FA8B8;">${item.deviceName}</span>&nbsp;&nbsp;${item.farmName}：${description}`;
        res.push(content);
        // res.push(description);
        // res.push(this.$util.dateFormat('mm-dd HH:MM:SS', new Date(item.warnTime)));
        // let status = '';
        // switch (item.status) {
        //   case 'HANDLED':
        //         status = `<span class="status-two">${this.statusOption[item.status]}</span>`;
        //         break;
        //   case 'UNHANDLED':
        //         status = `<span class="status-one">${this.statusOption[item.status]}</span>`;
        //         break;
        //   case 'RECOVER':
        //         status = `<span class="status-three">${this.statusOption[item.status]}</span>`;
        //         break;
        //   default:
        // }
        // res.push(status);
        return res;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.farm-alert-container {
  height: 100%;
  .scroll-boad1 {
    // color: #9FA8B8;
    color: #f0f0f0;
    height: 100%;
    font-size: 12px!important;
    font-weight: 400;
  }
}
</style>