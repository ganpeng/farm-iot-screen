<template>
  <div class="farm-aside-nav-container">
    <div class="aside-list">
      <li @click="gotoPage(aside)" v-for="(aside, index) in asideList" :key="index"
        :class="['aside-item', aside.name === activeName && 'active']">
        <span class="icon">
          <svg-icon v-if="aside.name === activeName" :icon-class="`${aside.icon}_active`"></svg-icon>
          <svg-icon v-else :icon-class="aside.icon"></svg-icon>
        </span>
        <span class="title">
          {{aside.title}}
        </span>
      </li>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FarmAsideNav',
  data() {
    return {
      asideList: [],
      asides:[
        {
          title: '概况',
          name: 'FarmStockSurvey',
          icon: 'left_side_tab_icon1',
          path: '/farmstock/id/survey'
        },
        {
          title: '数据',
          name: 'FarmStockData',
          icon: 'left_side_tab_icon2',
          path: '/farmstock/id/data'
        },
        {
          title: '监控',
          name: 'FarmStockMonitor',
          icon: 'left_side_tab_icon3',
          path: '/farmstock/id/monitor'
        },
        {
          title: '预警',
          name: 'FarmStockWarning',
          icon: 'left_side_tab_icon4',
          path: '/farmstock/id/warning'
        },
        {
          title: '溯源',
          name: 'Trace',
          icon: 'left_side_tab_icon6',
          path: '/farmstock/id/trace'
        }
      ],
      asides2: [
        {
          title: '概况',
          name: 'FarmStockSurvey',
          icon: 'left_side_tab_icon1',
          path: '/farmstock/id/survey'
        },
        {
          title: '数据',
          name: 'FarmStockData',
          icon: 'left_side_tab_icon2',
          path: '/farmstock/id/data'
        },
        {
          title: '监控',
          name: 'FarmStockMonitor',
          icon: 'left_side_tab_icon3',
          path: '/farmstock/id/monitor'
        },
        {
          title: '预警',
          name: 'FarmStockWarning',
          icon: 'left_side_tab_icon4',
          path: '/farmstock/id/warning'
        },
        {
          title: '管理',
          name: 'Manage',
          icon: 'left_side_tab_icon5',
          path: '/farmstock/id/manage'
        },
        {
          title: '销售',
          name: 'FarmSale',
          icon: 'left_side_tab_icon7',
          path: '/farmstock/id/farm_sale'
        }
      ]
    };
  },
  async created() {
    try {
      await this.$nextTick();
      this.getGoodsListByFarmId();
    } catch (err) {
      console.log(err);
    }
  },
  computed: {
    activeName() {
      let {name} = this.$route;
      return name;
    }
  },
  methods: {
    getGoodsListByFarmId() {
      let {id} = this.$route.params;
      this.$service.getGoodsListByFarmId({farmId: id, pageSize: 100000, disabled: 1, marketEnable: 1})
        .then((res) => {
          if (res && res.code === 0) {
            let goodsList = this.$_.get(res, 'data.list') || [];
            let asides = goodsList.length > 0 ? this.asides : this.asides2;
            let asideList = asides.map((aside) => {
              aside.path = aside.path.replace('id', id);
              return aside;
            });
            this.asideList = asideList;
          }
        }).catch((err) => {
          console.log(err);
        });
    },
    gotoPage(aside) {
      if (this.$route.path !== aside.path) {
        this.$router.push({path: aside.path});
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.farm-aside-nav-container {
  width: 1rem;
  height: 100%;
  background-color: #0F1C34;
  .aside-list {
    .aside-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 0.8rem;
      font-size: 0.16rem;
      color: #9FA8B8;
      cursor: pointer;
      .title {
        margin-top: 0.04rem;
      }
      &.active {
        color: #fff;
        background:linear-gradient(207deg,rgba(66,100,140,1) 0%,rgba(31,52,83,1) 100%);
      }
    }
  }
}
</style>
