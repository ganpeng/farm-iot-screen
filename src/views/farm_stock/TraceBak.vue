<template>
  <div class="trace-goods-container container">
    <farm-aside-nav></farm-aside-nav>
    <div class="content">
      <div class="title-wrapper">
        <div class="farm-title">{{farm.name}}</div>
      </div>
      <div class="title-one big">
        <div class="wrapper">
          <h5>
            <svg-icon class="title-icon" icon-class="title_icon"></svg-icon>商品信息
          </h5>
        </div>
      </div>
    <div class="goods-container border-icon39">
    </div>
    <div class="title-one big">
      <div class="wrapper">
        <h5>
          <svg-icon class="title-icon" icon-class="title_icon"></svg-icon>溯源信息
        </h5>
      </div>
    </div>
    <div class="trace-container border-icon40">
    </div>
    </div>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex';
import FarmAsideNav from "./components/FarmAsideNav";
export default {
  name: 'Trace',
  components: {FarmAsideNav},
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
    })
  }
}
</script>
<style lang="scss" scoped>
.trace-goods-container {
  .goods-container {
    width: 100%;
    height: 2.65rem;
  }
  .trace-container {
    width: 100%;
    height: 5.5rem;
  }
}
</style>
