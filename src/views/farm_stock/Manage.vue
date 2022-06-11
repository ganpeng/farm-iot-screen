<template>
  <div class="land-container container">
    <farm-aside-nav></farm-aside-nav>
    <div class="content">
      <div class="title-wrapper">
        <div class="tab-list">
          <div @click="changeTab(0)" :class="['tab-item', activeIndex === 0 && 'active']">经营信息</div>
          <div @click="changeTab(1)" :class="['tab-item', activeIndex === 1 && 'active']">农事记录</div>
          <!-- <div @click="changeTab(2)" :class="['tab-item', activeIndex === 2 && 'active']">农机具</div> -->
        </div>
        <div class="farm-title">{{farm.name}}</div> 
      </div>
      <div v-if="activeIndex === 0" class="tab-content border-icon55">
        <!-- <member-list></member-list> -->
      </div>
      <div v-if="activeIndex === 1" class="tab-content device-content">
        <land-plant></land-plant>
      </div>
      <div v-if="activeIndex === 2" class="tab-content device-content">
        <machine-list></machine-list>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex';
import FarmAsideNav from "./components/FarmAsideNav";
// import MemberList from './components//MemberList';
import MachineList from './components/MachineList';
import LandPlant from './components/LandPlant';
export default {
  name: 'Manage',
  components: {FarmAsideNav, MachineList, LandPlant},
  data() {
    return {
      activeIndex: 0
    };
  },
  async created() {
    try {
      let { id } = this.$route.params;
      await this.getFarmById(id);
    } catch (err) {
      console.log(err);
    }
  },
  computed: {
    ...mapGetters({
      farm: "farm/currentFarm"
    })
  },
  methods: {
    ...mapActions({
      getFarmById: "farm/getFarmById"
    }),
    changeTab(index) {
      this.activeIndex = index;
    }
  }
}
</script>
<style lang="scss" scoped>
.land-container {
  .title-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // height: 0.9rem;
    height: 8.1632%;
    .tab-list {
      display: flex;
      .tab-item {
        width: 1.1rem;
        height: 0.4rem;
        line-height: 0.4rem;
        text-align: center;
        color: #417fc8;
        font-size: 0.16rem;
        background: url("../../assets/image/tab_bg_icon.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
        &.active {
          color: #fff;
        }
      }
      .tab-item + .tab-item {
        margin-left: 0.1rem;
      }
    }
  }
  .tab-content {
    // height: calc(100% - 0.9rem);
    height: 91.8367%;
  }
}
</style>