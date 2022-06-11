<template>
  <div class="farm-statistics-contaienr">
    <ul class="farm-item-list">
      <li class="farm-item border-icon36">
        <div class="title">
          <span>土地<i>(公顷)</i></span>
          <svg-icon icon-class="chart_title_icon"></svg-icon>
        </div>
        <div class="farm-item-content">
          <div class="item-info">
            <div class="value my-font">{{statistic.landTotal}}</div>
            <div class="label">总数</div>
          </div>
          <div class="item-info">
            <div class="value my-font">{{statistic.farmland}}</div>
            <div class="label">耕地</div>
          </div>
          <div class="item-info">
            <div class="value my-font">{{statistic.waterArea + statistic.otherLand}}</div>
            <div class="label">其他</div>
          </div>
        </div>
      </li>
      <li class="farm-item border-icon36">
        <div class="title">
          <span>种植<i>(公顷)</i></span>
          <svg-icon icon-class="chart_title_icon"></svg-icon>
        </div>
        <div class="farm-item-content">
          <div class="item-info">
            <div class="value my-font">{{statistic.plantArea}}</div>
            <div class="label">种植面积</div>
          </div>
          <div class="item-info">
            <div class="value my-font">{{statistic.rice}}</div>
            <div class="label">水稻</div>
          </div>
          <div class="item-info">
            <div class="value my-font">{{statistic.otherPlants}}</div>
            <div class="label">其它</div>
          </div>
        </div>
      </li>
      <li class="farm-item border-icon36">
        <div class="title">
          <span>农机<i>(组)</i></span>
          <svg-icon icon-class="chart_title_icon"></svg-icon>
        </div>
        <div class="farm-item-content">
          <div class="item-info">
            <div class="value my-font">{{statistic.totalMachineryNumber}}</div>
            <div class="label">总数</div>
          </div>
          <div class="item-info">
            <div class="value my-font">{{statistic.plantingMachineryNumber}}</div>
            <div class="label">种植</div>
          </div>
          <div class="item-info">
            <div class="value my-font">{{statistic.processMachineryNumber}}</div>
            <div class="label">加工</div>
          </div>
          <div class="item-info">
            <div class="value my-font">{{statistic.transportMachineryNumber}}</div>
            <div class="label">运输</div>
          </div>
          <!-- <div class="item-info">
            <div class="value my-font">{{statistic.aqMaNumber}}</div>
            <div class="label">水产</div>
          </div> -->
          <div class="item-info">
            <div class="value my-font">{{statistic.otherUseMachineryNumber + statistic.aqMaNumber}}</div>
            <div class="label">其它</div>
          </div>
        </div>
      </li>
      <li class="farm-item border-icon36">
        <div class="title">
          <span>物联网<i>(套)</i></span>
          <svg-icon icon-class="chart_title_icon"></svg-icon>
        </div>
        <div class="farm-item-content">
          <div class="item-info">
            <div class="value my-font">{{statistic.sensor}}</div>
            <div class="label">传感器</div>
          </div>
          <div class="item-info">
            <div class="value my-font">{{statistic.domeCamera}}</div>
            <div class="label">球机摄像头</div>
          </div>
          <div class="item-info">
            <div class="value my-font">{{statistic.boxCamera}}</div>
            <div class="label">枪机摄像头</div>
          </div>
        </div>
      </li>
      <li class="farm-item border-icon36">
        <div class="title">
          <span>成员<i>(人)</i></span>
          <svg-icon icon-class="chart_title_icon"></svg-icon>
        </div>
        <div class="farm-item-content">
          <div class="item-info">
            <div class="value my-font">{{statistic.members}}</div>
            <div class="label">总数</div>
          </div>
          <div class="item-info">
            <div class="value my-font">{{statistic.manageMembers}}</div>
            <div class="label">经营人员</div>
          </div>
          <div class="item-info">
            <div class="value my-font">{{statistic.plantMembers}}</div>
            <div class="label">种植人员</div>
          </div>
        </div>
      </li>
      <li class="farm-item border-icon36">
        <div class="title">
          <span>经营<i>(万元)</i></span>
          <svg-icon icon-class="chart_title_icon"></svg-icon>
        </div>
        <div class="farm-item-content">
          <div class="item-info">
            <div class="value my-font">{{statistic.governProject}}</div>
            <div class="label">项目拨款</div>
          </div>
          <div class="item-info">
            <div class="value my-font">{{statistic.subsidy}}</div>
            <div class="label">专项补贴</div>
          </div>
          <div class="item-info">
            <div class="value my-font">{{statistic.socialService}}</div>
            <div class="label">农业社会化服务</div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'FarmStatisticsList',
  data() {
    return {
      statistic: {
        // 成员
        members: 0, // 总数
        manageMembers: 0, // 管理人员总数
        plantMembers: 0, // 种植人员总数
        // 土地
        landTotal: 0, // 总数
        farmland: 0, // 耕地
        homestead: 0, // 宅基地
        // 农机
        machineryTotal: 0, // 总数
        plantMachineryNum: 0, // 种植
        processMachineryNum: 0, // 加工
        transportMachineryNum: 0, // 运输
        otherMachinery: 0, // 其它
        // 种植
        plantArea: 0, // 种植面积
        rice: 0, // 水稻
        otherPlants: 0, // 其它
        // 经营
        governProject: 0, // 政府项目
        subsidy: 0, // 专项补贴
        socialService: 0, // 农业社会化服务
        // 物联网
        sensor: 0, // 传感器
        domeCamera: 0, // 球机摄像头
        boxCamera: 0 // 枪机摄像头
      }
    };
  },
  created() {
      let { id } = this.$route.params;
      this.$service.getStatisticFullYear(id)
        .then((res) => {
          if (res && res.code === 0) {
            this.statistic = res.data;
          }
        }).catch((err) => {
          console.log(err);
        });
  }
}
</script>
<style lang="scss" scoped>
.farm-statistics-contaienr {
  .farm-item-list {
    display: flex;
    flex-wrap: wrap;
    .farm-item {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 32.149%;
      height: 1.3rem;
      margin-bottom: 1.776%;
      margin-left: 1.776%;
      .title {
        position: absolute;
        top: -0.09rem;
        left: 0;
        width: 1.1rem;
        height: 0.42rem;
        i {
          font-size: 0.12rem;
        }
        .svg-icon {
          width: 1.1rem;
          height: 0.42rem;
        }
        span {
          position: absolute;
          top: 40%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          text-align: center;
          color: #70caee;
          font-size: 0.14rem;
        }
      }
      .farm-item-content {
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex: 1;
        .item-info {
          text-align: center;
          margin-top: 0.1rem;
          .label {
            font-size: 0.16rem;
            color: #9FA8B8;
          }
          .value {
            font-size: 0.4rem;
            line-height: 0.4rem;
            color: #29E3FD;
          }
        }
      }
    }
    .farm-item:nth-of-type(3n + 1) {
      margin-left: 0;
    }
  }
}
</style>