<template>
  <div class="member-list-container">
    <ul class="member-list">
      <li v-for="(member, index) in manageMemberList" :key="`manage${index}`" class="member-item border-icon37">
        <div class="top-field">
          <!-- <div :class="['top-left', member.gender === 'MALE' ? 'avatar_male' : 'avatar_female']"> -->
          <div class="top-left">
            <img :src="memberImage(member)" alt="">
          </div>
          <div class="top-right">
            <div class="name-gender">
              <div class="name">{{member.name}}</div>
              <div class="gender">
                <svg-icon v-if="member.gender === 'MALE'" icon-class="icon_male"></svg-icon>
                <svg-icon v-if="member.gender === 'FEMALE'" icon-class="icon_female"></svg-icon>
              </div>
            </div>
            <div class="phone">{{member.mobile}}</div>
            <div class="type">经营</div>
          </div>
        </div>
        <div class="bottom-field">
          <div class="bottom-item">
            <div class="label">出资金额</div>
            <div class="value">
              <div class="my-font">{{member.fundAmount || 0}}</div>
              <div class="unit">元</div>
            </div>
          </div>
          <div class="bottom-item">
            <div class="label">出地面积</div>
            <div class="value">
              <div class="my-font">{{member.landArea || 0}}</div>
              <div class="unit">公顷</div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <ul class="member-list">
      <li v-for="(member, index) in plantMemberList" :key="`plant${index}`" class="member-item border-icon37">
        <div class="top-field">
          <!-- <div :class="['top-left', member.gender === 'MALE' ? 'avatar_male' : 'avatar_female']"> -->
          <div class="top-left">
            <img :src="memberImage(member)" alt="">
          </div>
          <div class="top-right">
            <div class="name-gender">
              <div class="name">{{member.name}}</div>
              <div class="gender">
                <svg-icon v-if="member.gender === 'MALE'" icon-class="icon_male"></svg-icon>
                <svg-icon v-if="member.gender === 'FEMALE'" icon-class="icon_female"></svg-icon>
              </div>
            </div>
            <div class="phone">{{member.mobile}}</div>
            <div class="type two">种植</div>
          </div>
        </div>
        <div class="bottom-field">
          <div class="bottom-item">
            <div class="label">培训时长</div>
            <div class="value">
              <div class="my-font">{{member.trainingDays}}</div>
              <div class="unit">天</div>
            </div>
          </div>
          <div class="bottom-item">
            <div class="label">专业证书</div>
            <div class="value">
              <div class="my-font">{{member.certificateList.length || 0}}</div>
              <div class="unit">个</div>
            </div>
          </div>
          <div class="bottom-item">
            <div class="label">贫困户</div>
            <div class="value">
              <div class="is-poor">{{member.isPoor ? '是' : '否'}}</div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import _ from 'lodash';
import constants from '@/util/constants';
export default {
  name: 'MemberList',
  data() {
    return {
      manageMemberImageList: constants.manageMemberImageList,
      plantMemberImageList: constants.plantMemberImageList,
      memberRealImageMap: constants.memberRealImageMap,
      manageMemberList: [],
      plantMemberList: []
    };
  },
  created() {
    this.$service.getManageMemberList({pageSize: 10000, farmId: 29})
      .then((res) => {
        if (res && res.code === 0) {
          this.manageMemberList = _.get(res.data, 'list') || [];
        }
      }).catch((err) => {
        console.log(err);
      });
    this.$service.getPlantMemberList({pageSize: 10000, farmId: 29})
      .then((res) => {
        if (res && res.code === 0) {
          this.plantMemberList = _.get(res.data, 'list') || [];
        }
      }).catch((err) => {
        console.log(err);
      });
  },
  computed: {
    memberImage() {
      return (member) => {
        let {name, gender} = member;
        return _.get(this.memberRealImageMap, _.trim(name)) || _.get(this.memberRealImageMap, gender);
      };
    },
    plantMemberImageUrl() {
      return (index) => {
        return _.get(this.plantMemberImageList, `${index}.url`);
      };
    }
  }
}
</script>
<style lang="scss" scoped>
.member-list-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
  .member-list {
    display: flex;
    flex-wrap: wrap;
    .member-item {
      width: 3.4rem;
      height: 1.8rem;
      margin-left: 0.2rem;
      margin-bottom: 0.2rem;
      padding: 0.12rem;
      .top-field {
        display: flex;
        .top-left {
          width: 0.8rem;
          height: 0.8rem;
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
          .type {
            width: 0.64rem;
            height: 0.26rem;
            line-height: 0.26rem;
            text-align: center;
            font-size: 0.14rem;
            color: #FF8000;
            background: #291504;
            border-radius: 0.04rem;
            border: 1px solid #FF8000;
            &.two {
              color: #61A615;
              background: #182D00;
              border-color: #61A615;
            }
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
            .unit {
              font-size: 0.14rem;
              margin-left: 0.04rem;
            }
            .is-poor {
              font-size: 0.16rem;
            }
          }
        }
      } 
    }
    .member-item:nth-of-type(5n + 1) {
      margin-left: 0;
    }
  }
}
</style>