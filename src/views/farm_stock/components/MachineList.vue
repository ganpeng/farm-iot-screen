<template>
  <div class="machine-list-container">
    <div class="machinery-type-list">
      <div v-for="(type, index) in machineryTypeList" :key="`type${index}`" class="machinery-type-item">
        <div class="title-one big">
          <div class="wrapper">
            <h5>
              <svg-icon class="title-icon" icon-class="title_icon"></svg-icon>{{type}}
            </h5>
          </div>
        </div>
        <ul class="machine-list">
          <li v-for="(machine, _index) in machineListByType(type)" :key="`machine_${type}${_index}`" class="machine-item border-icon37">
            <div class="top-field">
              <div class="top-left">
                <img :src="machineImageUrl(index)" alt="">
              </div>
              <div class="top-right">
                <div class="name-gender">
                  <div class="name">{{machine.name}}</div>
                </div>
                <div class="phone">{{machine.factory}}</div>
                <div class="type-list">
                  <div class="type">{{machine.brand}}</div>
                  <div class="type">{{machine.powerType}}</div>
                </div>
              </div>
            </div>
            <div class="bottom-field">
              <div class="bottom-item">
                <div class="label">额定功率</div>
                <div class="value">
                  <div class="my-font">{{machine.ratedPower}}</div>
                  <div class="unit">千瓦</div>
                </div>
              </div>
              <div class="bottom-item">
                <div class="label">价格</div>
                <div class="value">
                  <div class="my-font">{{machine.price}}</div>
                  <div class="unit">元</div>
                </div>
              </div>
              <div class="bottom-item">
                <div class="label">购入日期</div>
                <div class="value">
                  <div class="date">{{dateFamater(machine.buyDate)}}</div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash';
import constants from '@/util/constants';
export default {
  name: 'MachineList',
  data() {
    return {
      machineImageList: constants.machineImageList,
      machineList: [],
      machineryTypeList: [],
      machineListByGroup: {}
    };
  },
  created() {
    this.$service.getFarmMachineList({pageSize: 10000, farmId: 29})
      .then((res) => {
        if (res && res.code === 0) {
          this.machineList = _.get(res.data, 'list') || [];
          this.machineListByGroup = _.groupBy(this.machineList, 'machineryType') || {};
          this.machineryTypeList = _.keys(this.machineListByGroup) || [];
        }
      }).catch((err) => {
        console.log(err);
      });
  },
  computed: {
    dateFamater() {
      return (date) => {
        return this.$util.dateFormat('YYYY-mm-dd', new Date(date));
      };
    },
    machineListByType() {
      return (machineryType) => {
        return _.get(this.machineListByGroup, machineryType) || [];
      };
    },
    machineImageUrl() {
      return (index) => {
        return _.get(this.machineImageList, `${index}.url`);
      };
    }
  }
}
</script>
<style lang="scss" scoped>
.machine-list-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
  .machine-list {
    display: flex;
    flex-wrap: wrap;
    .machine-item {
      width: 4.3rem;
      height: 1.86rem;
      margin-left: 0.2rem;
      margin-bottom: 0.2rem;
      padding: 0.12rem;
      .top-field {
        display: flex;
        .top-left {
          margin-right: 0.2rem;
          img {
            width: 0.8rem;
            height: 0.8rem;
          }
        }
        .top-right {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .name-gender {
            display: flex;
            align-items: center;
            .name {
              font-size: 0.16rem;
              color: #fff;
              margin-right: 0.1rem;
            }
            .gender {
              .svg-icon {
                width: 0.28rem;
                height: 0.28rem;
              }
            }
          }
          .phone {
            font-size: 0.16rem;
            color: #667799;
          }
          .type-list {
            display: flex;
          }
          .type {
            min-width: 0.64rem;
            height: 0.26rem;
            line-height: 0.26rem;
            padding: 0 0.04rem;
            text-align: center;
            font-size: 0.14rem;
            color: #417FC8;
            background: #10254B;
            border-radius: 0.04rem;
            border: 1px solid #417FC8;
            margin-right: 0.1rem;
          }
        }
      }
      .bottom-field {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 0.1rem;
        .bottom-item {
          .label {
            color: #5BB0FF;
            font-size: 0.16rem;
            margin-bottom: 0.08rem;
          }
          .value {
            display: flex;
            align-items: flex-end;
            color: #40CEE2;
            font-size: 0.3rem;
            .date {
              font-size: 0.14rem;
            }
            .unit {
              font-size: 0.14rem;
              margin-left: 0.04rem;
            }
          }
        }
      } 
    }
    .machine-item:nth-of-type(4n + 1) {
      margin-left: 0;
    }
  }
}
</style>