<template>
  <div class="plant-history-container">
      <div class="plant-protection-detail-container">
        <div class="steps">
          <ul class="step-list">
            <li
              v-for="(step, index) in stepList"
              :key="index"
              @click="toggleActive(index)"
              :class="['step-item', step.active && 'active']"
            >
              <span class="count">
                <svg-icon v-if="step.active" :icon-class="`plant_icon${index + 1}_active`"/>
                <svg-icon v-else :icon-class="`plant_icon${index + 1}`"/>
              </span>
              <span class="title">{{step.title}}</span>
            </li>
          </ul>
        </div>
        <div class="seperator-line"></div>
        <div class="steps-content">
          <div v-show="activeIndex === 0" class="step-content-item">
            <div class="step-item-row" v-if="plant.p1PlantType">
              <div class="step-item-field">
                <div class="sub-item">
                  <div class="label">作物分类</div>
                  <span class="value">{{plant.p1PlantType}}</span>
                </div>
                <div class="sub-item">
                  <div class="label">作物分类</div>
                  <span class="value">{{plant.p1SeedName}}</span>
                </div>
                <div class="sub-item">
                  <div class="label">种子批号</div>
                  <span class="value">{{plant.p1SeedBatchNo}}</span>
                </div>
                <div class="sub-item">
                  <div class="label">育苗时间</div>
                  <div class="value">
                    <span>{{plant.dateRange[0] | formatDate('yyyy-MM-DD')}}</span>
                      ~
                    <span>{{plant.dateRange[1] | formatDate('yyyy-MM-DD')}}</span>
                  </div>
                </div>
              </div>
              <div class="step-item-field">
                <div class="sub-item">
                  <div class="label">作物名称</div>
                  <span class="value">{{plant.p1PlantName}}</span>
                </div>
                <div class="sub-item">
                  <div class="label">种子公司名称</div>
                  <span class="value">{{plant.p1SeedCompanyName}}</span>
                </div>
                <div class="sub-item">
                  <div class="label">种植时间</div>
                  <span class="value">{{plant.p1PlantDate | formatDate('yyyy-MM-DD')}}</span>
                </div>
              </div>
            </div>
            <div v-else class="no-data">暂无数据</div>
          </div>
          <div v-show="activeIndex === 1" class="step-content-item">
            <div v-if="plant.p2InputThing.length > 0" class="training-list-container">
              <ul class="training-list">
                <li v-for="(p2Plant, index) in plant.p2InputThing"
                  :key="index" class="training-item">
                  <div class="training-item-header">
                    <div class="left">
                      <span class="title">投入品{{index + 1}}</span>
                    </div>
                    <div class="right"></div>
                  </div>
                  <div class="training-item-content">
                    <div class="step-item-row">
                      <div class="step-item-field">
                        <div class="sub-item">
                          <div class="label">投入品厂家</div>
                          <span class="value">{{p2Plant.factory}}</span>
                        </div>
                        <div class="sub-item">
                          <div class="label">投入量(公斤)</div>
                          <span class="value">{{p2Plant.amount}}</span>
                        </div>
                        <div class="sub-item">
                          <div class="label">投入品类型</div>
                          <span class="value">{{p2Plant.type}}</span>
                        </div>
                      </div>
                      <div class="step-item-field">
                        <div class="sub-item">
                          <div class="label">投入品生产批次</div>
                          <span class="value">{{p2Plant.batch}}</span>
                        </div>
                        <div class="sub-item">
                          <div class="label">投入时间</div>
                          <span class="value">{{p2Plant.date | formatDate('yyyy-MM-DD')}}</span>
                        </div>
                        <div class="sub-item" v-if="p2Plant.type !== '其它'">
                          <div class="label">投入品分类</div>
                          <span class="value">{{p2Plant.class}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div v-else class="no-data">暂无数据</div>
          </div>
          <div v-show="activeIndex === 2" class="step-content-item">
            <div v-if="plant.p3FieldManage.length > 0" class="training-list-container">
              <ul class="training-list">
                <li v-for="(p3Plant, index) in plant.p3FieldManage"
                  :key="index" class="training-item">
                  <div class="training-item-header">
                    <div class="left">
                      <span class="title">田间管理{{index + 1}}</span>
                    </div>
                    <div class="right">
                    </div>
                  </div>
                  <div class="training-item-content">
                    <div class="step-item-row">
                      <div class="step-item-field">
                        <div class="sub-item">
                          <div class="label">管理类型</div>
                          <span class="value">{{p3Plant.type}}</span>
                        </div>
                      </div>
                      <div class="step-item-field">
                        <div class="sub-item">
                          <div class="label">投入时间</div>
                          <span class="value">{{p3Plant.date | formatDate('yyyy-MM-DD')}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div v-else class="no-data">暂无数据</div>
          </div>
          <div v-show="activeIndex === 3" class="step-content-item">
            <div v-if="plant.p4HarvestManage.length > 0" class="training-list-container">
              <ul class="training-list">
                <li v-for="(p4Plant, index) in plant.p4HarvestManage"
                  :key="index" class="training-item">
                  <div class="training-item-header">
                    <div class="left">
                      <span class="title">采收管理{{index + 1}}</span>
                    </div>
                    <div class="right">
                    </div>
                  </div>
                  <div class="training-item-content">
                    <div class="step-item-row">
                      <div class="step-item-field">
                        <div class="sub-item">
                          <div class="label">采收面积(公顷)</div>
                          <span class="value">{{p4Plant.area}}</span>
                        </div>
                        <div class="sub-item">
                          <div class="label">采收产量(公斤)</div>
                          <span class="value">{{p4Plant.amount}}</span>
                        </div>
                        <div class="sub-item">
                          <div class="label">投入时间</div>
                          <span class="value">{{p4Plant.date | formatDate('yyyy-MM-DD')}}</span>
                        </div>
                      </div>
                      <div class="step-item-field">
                        <div class="sub-item">
                          <div class="label">采收方式</div>
                          <span class="value">{{p4Plant.mode}}</span>
                        </div>
                        <div class="sub-item">
                          <div class="label">平均亩产(公斤)</div>
                          <span class="value">{{p4Plant.averageAmount}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div v-else class="no-data">暂无数据</div>
          </div>
          <div v-show="activeIndex === 4" class="step-content-item">
            <div v-if="plant.p5ProcessManage.length > 0" class="training-list-container">
              <ul class="training-list">
                <li v-for="(p5Plant, index) in plant.p5ProcessManage"
                  :key="index" class="training-item">
                  <div class="training-item-header">
                    <div class="left">
                      <span class="title">加工管理{{index + 1}}</span>
                    </div>
                    <div class="right">
                    </div>
                  </div>
                  <div class="training-item-content">
                    <div class="step-item-row">
                      <div class="step-item-field">
                        <div class="sub-item">
                          <div class="label">加工方</div>
                          <span class="value">{{p5Plant.party}}</span>
                        </div>
                        <div class="sub-item"
                          v-if="p5Plant.party === '其它加工厂商'">
                          <div class="label">加工厂商证件号</div>
                          <span class="value">{{p5Plant.no}}</span>
                        </div>
                        <div class="sub-item">
                          <div class="label">加工时间</div>
                          <span class="value">{{p5Plant.date | formatDate('yyyy-MM-DD')}}</span>
                        </div>
                      </div>
                      <div class="step-item-field">
                        <div class="sub-item"
                          v-if="p5Plant.party === '其它加工厂商'">
                          <div class="label">加工方名称</div>
                          <span class="value">{{p5Plant.name}}</span>
                        </div>
                        <div class="sub-item">
                          <div class="label">加工方批次</div>
                          <span class="value">{{p5Plant.batch}}</span>
                        </div>
                        <div class="sub-item">
                          <div class="label">加工量(公斤)</div>
                          <span class="value">{{p5Plant.amount}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div v-else class="no-data">暂无数据</div>
          </div>
          <div v-show="activeIndex === 5" class="step-content-item">
            <div v-if="plant.p6SaveManage.length > 0" class="training-list-container">
              <ul class="training-list">
                <li v-for="(p6Plant, index) in plant.p6SaveManage"
                  :key="index" class="training-item">
                  <div class="training-item-header">
                    <div class="left">
                      <span class="title">仓储类型{{index + 1}}</span>
                    </div>
                    <div class="right">
                    </div>
                  </div>
                  <div class="training-item-content">
                    <div class="step-item-row">
                      <div class="step-item-field">
                        <div class="sub-item">
                          <div class="label">仓储类型</div>
                          <span class="value">{{p6Plant.type}}</span>
                        </div>
                        <div class="sub-item">
                          <div class="label">仓储容量(公斤)</div>
                          <span class="value">{{p6Plant.totalAmount}}</span>
                        </div>
                      </div>
                      <div class="step-item-field">
                        <div class="sub-item">
                          <div class="label">本次仓储量(公斤)</div>
                          <span class="value">{{p6Plant.amount}}</span>
                        </div>
                        <div class="sub-item">
                          <div class="label">入仓时间</div>
                          <span class="value">{{p6Plant.date | formatDate('yyyy-MM-DD')}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div v-else class="no-data">暂无数据</div>
          </div>
          <div v-show="activeIndex === 6" class="step-content-item">
            <div v-if="plant.p7CheckManage.length > 0" class="training-list-container">
              <ul class="training-list">
                <li v-for="(p7Plant, index) in plant.p7CheckManage"
                  :key="index" class="training-item">
                  <div class="training-item-header">
                    <div class="left">
                      <span class="title">检测信息{{index + 1}}</span>
                    </div>
                    <div class="right">
                    </div>
                  </div>
                  <div class="training-item-content">
                    <div class="step-item-row">
                      <div class="step-item-field">
                        <div class="sub-item">
                          <div class="label">检测机构</div>
                          <span class="value">{{p7Plant.org}}</span>
                        </div>
                        <div class="sub-item">
                          <div class="label">送检人</div>
                          <span class="value">{{p7Plant.user}}</span>
                        </div>
                        <div class="sub-item">
                          <div class="label">检测员</div>
                          <span class="value">{{p7Plant.tester}}</span>
                        </div>
                      </div>
                      <div class="step-item-field">
                        <div class="sub-item">
                          <div class="label">检测时间</div>
                          <span class="value">{{p7Plant.date | formatDate('yyyy-MM-DD')}}</span>
                        </div>
                        <div class="sub-item">
                          <div class="label">检测项目</div>
                          <span class="value">{{p7Plant.project}}</span>
                        </div>
                        <div class="sub-item">
                          <div class="label">检测员电话</div>
                          <span class="value">{{p7Plant.mobile}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div v-else class="no-data">暂无数据</div>
          </div>
          <div v-show="activeIndex === 7" class="step-content-item">
            <div v-if="plant.p8DisasterInfo.length > 0" class="training-list-container">
              <ul class="training-list">
                <li v-for="(p8Plant, index) in plant.p8DisasterInfo"
                  :key="index" class="training-item">
                  <div class="training-item-header">
                    <div class="left">
                      <span class="title">受灾信息{{index + 1}}</span>
                    </div>
                    <div class="right">
                    </div>
                  </div>
                  <div class="training-item-content">
                    <div class="step-item-row">
                      <div class="step-item-field">
                        <div class="sub-item">
                          <div class="label">受灾类型</div>
                          <span class="value">{{p8Plant.type}}</span>
                        </div>
                        <div class="sub-item">
                          <div class="label">受灾面积</div>
                          <span class="value">{{p8Plant.area}}</span>
                        </div>
                        <div class="sub-item">
                          <div class="label">预计损失</div>
                          <span class="value">{{p8Plant.lose}}</span>
                        </div>
                      </div>
                      <div class="step-item-field">
                        <div class="sub-item">
                          <div class="label">受灾时间</div>
                          <span class="value">{{p8Plant.date | formatDate('yyyy-MM-DD')}}</span>
                        </div>
                        <div class="sub-item">
                          <div class="label">预计减产(公斤)</div>
                          <span class="value">{{p8Plant.reduce}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div v-else class="no-data">暂无数据</div>
          </div>
          <div v-show="activeIndex === 8" class="step-content-item">
            <div v-if="plant.p9MachineryUse.length > 0" class="training-list-container">
              <ul class="training-list">
                <li v-for="(p9Plant, index) in plant.p9MachineryUse"
                  :key="index" class="training-item">
                  <div class="training-item-header">
                    <div class="left">
                      <span class="title">农机具使用{{index + 1}}</span>
                    </div>
                    <div class="right">
                    </div>
                  </div>
                  <div class="training-item-content">
                    <div class="step-item-row">
                      <div class="step-item-field">
                        <div class="sub-item">
                          <div class="label">农机具来源</div>
                          <span class="value">{{p9Plant.source}}</span>
                        </div>
                        <div class="sub-item">
                          <div class="label">农机具名称</div>
                          <span class="value">{{p9Plant.name}}</span>
                        </div>
                        <div class="sub-item">
                          <div class="label">作业面积(公顷)</div>
                          <span class="value">{{p9Plant.area}}</span>
                        </div>
                      </div>
                      <div class="step-item-field">
                        <div class="sub-item">
                          <div class="label">农机具类型</div>
                          <span class="value">{{p9Plant.type}}</span>
                        </div>
                        <div class="sub-item">
                          <div class="label">使用时间</div>
                          <span class="value">{{p9Plant.date | formatDate('yyyy-MM-DD')}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div v-else class="no-data">暂无数据</div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import _ from 'lodash';
import constants from '@/util/constants';
export default {
  name: 'PlantHistory',
  data() {
    return {
      stepList: constants.STEP_LIST,
      plant: {
        farmId: '', // 农场Id
        farmLandCode: '', // 地块编号
        farmLandId: '', // 地块Id
        area: '',// 地块面积
        p1PlantDate: '', // 种植时间
        p1PlantName: '', // 作物名称
        p1PlantType: '', // 作物分类
        p1PlantClass: '', // 作物品种
        p1PlantedStart: '', // 育苗开始时间
        p1PlantedEnd: '', // 育苗结束时间
        dateRange: [], // 时间区间
        p1SeedBatchNo: '', // 种子批号
        p1SeedCompanyName: '', // 种子公司名称
        p1SeedName: '', // 种子名称
        p2InputThing: [],
        p3FieldManage: [],
        p4HarvestManage: [],
        p5ProcessManage: [],
        p6SaveManage: [],
        p7CheckManage: [],
        p8DisasterInfo: [],
        p9MachineryUse: [],
        updatedAt: '',
        createdAt: ''
      }
    };
  },
  created() {
    this.$service.getPlantHistory({farmLandId: 63, year: 2020})
      .then((res) => {
        this.plant = this.formatData(res.data);
      }).catch((err) => {
        console.log(err);
      });
  },
  computed: {
    activeIndex() {
      let index = this.stepList.findIndex(item => item.active);
      return index;
    }
  },
  methods: {
    toggleActive(active) {
      this.stepList = this.stepList.map((item, index) => {
        if (index === active) {
          item.active = true;
        } else {
          item.active = false;
        }
        return item;
      });
    },
    formatData(data) {
      let dateRange = [];
      if (data.p1PlantedStart) {
        dateRange.push(data.p1PlantedStart);
      }
      if (data.p1PlantedEnd) {
        dateRange.push(data.p1PlantedEnd);
      }

      data.dateRange = dateRange;

      if (!_.isArray(data.p2InputThing)) {
        data.p2InputThing = [];
      }
      if (!_.isArray(data.p3FieldManage)) {
        data.p3FieldManage = [];
      }
      if (!_.isArray(data.p4HarvestManage)) {
        data.p4HarvestManage = [];
      }
      if (!_.isArray(data.p5ProcessManage)) {
        data.p5ProcessManage = [];
      }
      if (!_.isArray(data.p6SaveManage)) {
        data.p6SaveManage = [];
      }
      if (!_.isArray(data.p7CheckManage)) {
        data.p7CheckManage = [];
      }
      if (!_.isArray(data.p8DisasterInfo)) {
        data.p8DisasterInfo = [];
      }
      if (!_.isArray(data.p9MachineryUse)) {
        data.p9MachineryUse = [];
      }

      let keyList = ['p2InputThing', 'p3FieldManage', 'p4HarvestManage', 'p5ProcessManage',
                    'p6SaveManage', 'p7CheckManage', 'p8DisasterInfo', 'p9MachineryUse'];

      keyList.forEach((key) => {
        data[key] = data[key].map((item) => {
          item.isExpanded = true;
          return item;
        })
      });

      console.log(data);

      return Object.assign({}, data);
    }
  }
}
</script>
<style lang="scss" scoped>
.plant-history-container {
  height: 100%;
  padding: 0 0.2rem;
  overflow-y: hidden;
  .seperator-line {
    background-color: #222E4D;
    width: 100%;
    height: 0.02rem;
  }
  .plant-protection-detail-container {
    display: flex;
    flex-direction: column;
    height: calc(100% - 0.4rem);
    .steps {
      width: 80%;
      margin: 0 auto;
      margin-top: 0.2rem;
      margin-bottom: 0.2rem;
      .step-list {
        display: flex;
        .step-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
          font-weight: 400;
          cursor: pointer;
          .count {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 0.5rem;
            height: 0.5rem;
            border-radius: 50%;
            margin-bottom: 0.1rem;
            .svg-icon {
              width: 0.5rem;
              height: 0.5rem;
            }
          }
          .title {
            font-size: 0.14rem;
            color: #A8ABB3;
          }
          &.active {
            .title {
              color: #F0F0F0;
            }
          }
        }
      }
    }
    .steps-content {
      flex: 1;
      width: 60%;
      margin: 0 auto;
      margin-top: 0.2rem;
      // max-height: 3.8rem;
      overflow: hidden;
      overflow-y: scroll;
      .step-content-item {
        .step-item-row {
          display: flex;
          justify-content: space-between;
          .step-item-field {
            flex: 1;
            .sub-item {
              display: flex;
              font-size: 0.18rem;
              .label {
                color: #6F7480;
                margin-right: 0.5rem;
              }
              .value {
                color: #9FA8B8;
              }
            }
            .sub-item + .sub-item {
              margin-top: 0.16rem;
            }
          }
        }
      }
      .no-data {
        color: #6F7480;
        text-align: center;
      }
      .training-list-container {
        .training-list {
          .training-item {
            margin-bottom: 0.1rem;
            .training-item-header {
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-bottom: 0.1rem;
              .left {
                width: 1.3rem;
                overflow: hidden;
                .title {
                  min-width: 0.6rem;
                  height: 0.3rem;
                  line-height: 0.3rem;
                  padding: 0 0.1rem;
                  margin-right: 0.06rem;
                  text-align: center;
                  font-size: 0.14rem;
                  color: #8AB9E8;
                  border-radius: 2px;
                  border: 1px solid #466D94;
                }
              }
              .right {
                display: flex;
                align-items: center;
                margin-right: 0.4rem;
              }
            }
            .training-item-content {
              overflow: hidden;
            }
          }
        }
      }
    }
  }
}
</style>