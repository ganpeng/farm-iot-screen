import _ from 'lodash';
import service from '@/service';

const defaultFarm = {
  name: '', // 农场名称
  address: '', // 地址
  contactName: '', //  联系人名称
  contactTel: '', // 联系人电话
  contactAddr: '', // 联系人地址
  corporationAddr: '', // 法人地址
  corporationId: '', // 法人id
  corporationName: '', // 法人名称
  corporationTel: '', // 法人电话
  creditCode: '', // 统一社会信用代码
  description: '', // 详情
  farmType: '', // 农场类型
  feature: '', // 特色
  fieldArea: '', // 地块面积
  longitude: '', // 经度
  latitude: '', // 纬度
  manageType: '', // 经营项目
  manageTypes: [], // 经营项目多个
  partyOrg: false, // 是否成立党组织
  partyMemberNum: '', // 党组人数
  createdAt: '', // 创建日期
  farmIndexUrl: '', // 农场封面
  farmCertificates: [], // 农场证书
  farmMarks: []
};

const state = {
  currentFarm: _.cloneDeep(defaultFarm)
};

const getters = {
  currentFarm(state) {
    return state.currentFarm;
  }
};

const mutations = {
  // 当前农场
  setCurrentFarm(state, payload) {
    state.currentFarm = formatData(payload.farm);
  }
}

const actions = {
  async getFarmById({
    commit
  }, id) {
    try {
      let res = await service.getFarmById(id);
      if (res && res.code === 0) {
        commit('setCurrentFarm', {
          farm: formatData(res.data)
        });
      }
      return res;
    } catch (err) {
      console.log(err);
    }
  }
};

function formatData(data) {
  if (!_.isArray(data.farmCertificates)) {
    data.farmCertificates = [];
  }

  if (!_.isArray(data.farmMarks)) {
    data.farmMarks = [];
  }
  return Object.assign({}, {
    contactAddr: ''
  }, data);
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}