<template>
  <div class="header-container">
    <div class="header-warpper">
      <div @click="gotoHome" class="logo">
        <div class="logo-icon">
          <!-- <h2 v-if="isFish">吉视5G智能渔业数据管理平台</h2>
          <h2 v-else>物联网大数据平台</h2> -->
          <svg-icon v-if="isFish" icon-class="logo_one"></svg-icon>
          <svg-icon v-else icon-class="logo_two"></svg-icon>
        </div>
      </div>
      <div class="nav-container">
        <div class="nav-icon">
          <svg-icon icon-class="nav_left_icon"></svg-icon>
        </div>
        <ul class="nav-list">
          <li v-for="(nav, index) in navList" :key="index"
            @click="goPage(nav)"
            :class="['nav-item', activeMenu === nav.path && 'active']">
            {{nav.title}}
          </li>
        </ul>
        <div class="nav-icon">
          <svg-icon icon-class="nav_left_icon"></svg-icon>
        </div>
      </div>
      <div class="date">
        {{time}}
        <span @click="logoutHandler" class="logout-btn">
          <svg-icon icon-class="logout_active"/>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
import _ from 'lodash';
import constants from "@/util/constants";
export default {
  name: 'PageHeader',
  data() {
    return {
      time: '',
      timer: null,
      farmId: null,
      navList: []
    };
  },
  async created() {
    try {
      await this.$nextTick();
      let user = this.$util.store.getLocal('login');
      let roleType = _.get(user, 'roleType');
      let farmId = _.get(user, 'farmId');
      this.farmId = farmId;
      if (roleType === 'FARM_OWNER' || roleType === 'FARM_EMPLOYEE') {
        this.navList = []
      } else {
        this.navList = constants.navList;
      }
      this.timer = setInterval(() => {
        this.startTime();
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  },
  computed: {
    ...mapGetters({
      'user': 'auth/user'
    }),
    isFish() {
      return this.farmId === 44;
    },
    activeMenu() {
      const route = this.$route;
      const {meta, path} = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path
    }
  },
  methods: {
    goPage(nav) {
      if (this.$route.path !== nav.path) {
        this.$router.push({name: nav.name});
      }
    },
    gotoHome() {
      this.$router.push({name: 'Home'});
    },
    startTime() {
      let today = new Date();
      let year = today.getFullYear();
      let month = today.getMonth() + 1;
      let day = today.getDate();
      let hour = today.getHours();
      let minutes = today.getMinutes();
      let seconds = today.getSeconds();
      month = this.checkTime(month);
      day = this.checkTime(day);
      hour = this.checkTime(hour);
      minutes = this.checkTime(minutes);
      seconds = this.checkTime(seconds);
      this.time = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
    },
    checkTime(i) {
      if(i < 10) {
        i = "0" + i;
      }
      return i;
    },
    logoutHandler() {
      this.$util.store.delLocal('login');
      this.$router.push({name: 'Login'});
    }
  }
};
</script>
<style lang="scss" scoped>
.header-container {
  height: 0.8rem;
  padding: 0.16rem 0.2rem 0.04rem 0.2rem;
  background-color: #0B172D;
  .header-warpper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    background: url('../assets/image/header_border_icon.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .logo {
      position: relative;
      display: flex;
      align-items: center;
      width: 4rem;
      height: 0.46rem;
      line-height: 0.46rem;
      margin-left: 0.1rem;
      background: url('../assets/image/logo_bg.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
      z-index: 6;
      .logo-icon {
        width: 3.04rem;
        height: 0.39rem;
        margin: 0 0.08rem;
        .svg-icon {
          width: 3.04rem;
          height: 0.39rem;
        }
      }
      h2 {
        color: #99D8FF;
        font-size: 0.18rem;
        font-weight: 500;
        margin-left: 0.4rem;
      }
    }
    .nav-container {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      .nav-icon {
        .svg-icon {
          width: 0.46rem;
          height: 0.14rem;
        }
      }
      .nav-list {
        display: flex;
        align-items: center;
        .nav-item {
          width: 1.28rem;
          height: 0.36rem;
          line-height: 0.36rem;
          cursor: pointer;
          color: #B6D8FF;
          font-size: 0.18rem;
          font-weight: 500;
          text-align: center;
          background: url('../assets/image/nav_bar_icon.png');
          background-repeat: no-repeat;
          background-size: 100% 100%;
          &.active {
            color: #FFF;
            background: url('../assets/image/nav_bar_icon_active2.png');
            // background: url('../assets/image/nav_bar_icon_active.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }
        }
        .nav-item + .nav-item {
          margin-left: -0.14rem;
        }
      }
    }
    .date {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 1.8rem;
      color: #fff;
      font-size: 0.14rem;
      margin-right: 0.2rem;
      text-align: right;
      .logout-btn {
        position: relative;
        width: 0.2rem;
        height: 0.5rem;
        margin-left: 0.1rem;
        cursor: pointer;
        z-index: 5;
        .svg-icon {
          width: 0.2rem;
          height: 0.5rem;
        }
      }
    }
  }
}
</style>
