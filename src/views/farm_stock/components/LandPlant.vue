<template>
  <div class="land-plant-container">
    <div class="title-one big">
      <div class="wrapper">
        <h5>
          <svg-icon class="title-icon" icon-class="title_icon"></svg-icon>地块信息
        </h5>
      </div>
    </div>
    <div class="land-container border-icon38">
      <div class="land-info-container">
        <div class="left-img"></div>
        <div class="right-text">
          <div class="text-item">
            <div class="label">地块名称</div>
            <div class="value">{{land.name}}</div>
          </div>
          <div class="text-item">
            <div class="label">地块编码</div>
            <div class="value">{{land.code}}</div>
          </div>
          <div class="text-item">
            <div class="label">地块形式</div>
            <div class="value">{{land.form}}</div>
          </div>
          <div class="text-item">
            <div class="label">面积(公顷)</div>
            <div class="value">{{land.area}}</div>
          </div>
          <div class="text-item">
            <div class="label">水利条件</div>
            <div class="value">{{land.irrigation}}</div>
          </div>
          <div class="text-item">
            <div class="label">地址</div>
            <div class="value">{{land.address}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="title-one big">
      <div class="wrapper">
        <h5>
          <svg-icon class="title-icon" icon-class="title_icon"></svg-icon>种植信息
        </h5>
      </div>
    </div>
    <div class="plant-container border-icon38">
      <plant-history></plant-history>
    </div>
  </div>
</template>
<script>
import PlantHistory from './PlantHistory';
export default {
  name: 'LandPlant',
  components: {PlantHistory},
  data() {
    return {
      land: {}
    }
  },
  created() {
    this.$service.getLandById(63)
      .then((res) => {
        if (res && res.code === 0) {
          this.land = res.data;
        }
      }).catch((err) => {
        console.log(err);
      });
  }
}
</script>
<style lang="scss" scoped>
.land-plant-container {
  width: 100%;
  height: 100%;
  // height: 90%;
  overflow: hidden;
  // overflow-y: scroll;
  .land-container {
    width: 100%;
    // height: 3.4rem;
    height: calc(46% - 0.32rem);
    padding: 0.2rem;
    .land-info-container {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      .left-img {
        width: 6rem;
        height: 100%;
        margin-right: 0.8rem;
        background-image: url('../../../assets/image/jucheng_land.jpg');
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
      }
      .right-text {
        .text-item {
          display: flex;
          align-items: center;
          margin-bottom: 0.15rem;
          font-size: 0.20rem;
          .label {
            width: 1rem;
            color: #6F7480;
            margin-right: 0.5rem;
            text-align: right;
          }
          .value {
            color: #9FA8B8;
          }
        }
      }
    }
  }
  .plant-container {
    width: 100%;
    // height: 4rem;
    height: calc(54% - 0.64rem);
    overflow: hidden;
  }
}
</style>