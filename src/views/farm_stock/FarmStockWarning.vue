<template>
  <div class="farm-stock-warning-container container">
    <farm-aside-nav></farm-aside-nav>
    <div class="content">
      <div class="title-wrapper">
        <div class="farm-title">{{farm.name}}</div>
      </div>
      <my-bord :bordList="bordList"></my-bord>
      <div class="warning-table-container border-icon8">
        <div class="my-scroll-board">
          <warning-list :rowNum="14" :fontSize="0.14" :warningList="warningList"></warning-list>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash';
import {mapGetters, mapActions} from 'vuex';
import MyBord from '@/components/MyBord';
import FarmAsideNav from "./components/FarmAsideNav";
import WarningList from './components/WarningList';
export default {
  name: "FarmStockWarning",
  components: { FarmAsideNav, MyBord, WarningList },
  data() {
    return {
      warningList: [],
      bordList: [
        {
          title: '总数',
          count: 0
        },
        {
          title: '模型预警',
          count: 0
        },
        {
          title: '设备状态异常',
          count: 0
        }
      ]
    };
  },
  created() {
    let {id} = this.$route.params;
    this.getFarmById(id);
    this.getWarnStatisticsByFarmId(id);
    this.getFarmWarnList(id);
  },
  computed: {
    ...mapGetters({
      farm: 'farm/currentFarm'
    })
  },
  methods: {
    ...mapActions({
      getFarmById: 'farm/getFarmById'
    }),
    getFarmWarnList(id) {
      this.$service.getFarmWarnList({farmId: id, days: 3})
        .then((res) => {
          if (res && res.code === 0) {
            let warningList = res.data || [];
            this.warningList = warningList;
          }
        }).catch((err) => {
          console.log(err);
        });
    },
    getWarnStatisticsByFarmId(id) {
      this.$service.getWarnStatisticsByFarmId({farmId: id, days: 3})
        .then((res) => {
          if (res && res.code === 0) {
            let bordList = [];
            let total = _.get(res.data, 'total');
            let modelWarnTotal = _.get(res.data, 'modelWarnTotal');
            let deviceErrorTotal = _.get(res.data, 'deviceErrorTotal');
            bordList.push({
              title: '总数',
              count: total
            });
            bordList.push({
              title: '模型预警',
              count: modelWarnTotal
            });
            bordList.push({
              title: '设备状态异常',
              count: deviceErrorTotal
            });
            this.bordList = bordList;
          }
        }).catch((err) => {
          console.log(err);
        });
    },
  }
};
</script>
<style lang="scss" scoped>
.farm-stock-warning-container {
  .content {
    justify-content: flex-start;
  }
  .title-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 8.1632%;
  }
  .warning-table-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 79.5918%;
    margin-top: 0.1rem;
    .my-scroll-board {
      position: absolute;
      width: 99%;
      height: 98%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #f0f0f0;
      box-shadow: rgba(28,86,165, 0.5) 0px 0px 15px;
    }
  }
}
</style>
