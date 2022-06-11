// 物理环境设备
import _ from 'lodash';
import service from '@/service';

let keyTypes = [
  {
    keyType: 'farmCategory',
    title: '农场类型'
  },
  {
    keyType: 'manageRange',
    title: '经营范围'
  },
  {
    keyType: 'trainType',
    title: '培训类型'
  },
  {
    keyType: 'organizer',
    title: '组织者'
  },
  {
    keyType: 'irrigation',
    title: '水利条件'
  },
  {
    keyType: 'landMode',
    title: '地块形式'
  },
  {
    keyType: 'landUse',
    title: '地块用途'
  },
  {
    keyType: 'machineryType',
    title: '机械类型'
  },
  {
    keyType: 'powerType',
    title: '动力类型'
  },
  {
    keyType: 'cropType',
    title: '作物类型'
  },
  {
    keyType: 'foodType',
    title: '粮食作物'
  },
  {
    keyType: 'fibreType',
    title: '纤维作物'
  },
  {
    keyType: 'vegetablesType',
    title: '蔬菜作物'
  },
  {
    keyType: 'fruitType',
    title: '水果作物'
  },
  {
    keyType: 'oilType',
    title: '油料作物'
  },
  {
    keyType: 'medicineType',
    title: '药用作物'
  },
  {
    keyType: 'economicType',
    title: '经济林作物'
  },
  {
    keyType: 'cropTypeOther',
    title: '其它作物'
  },
  {
    keyType: 'inputType',
    title: '投入品'
  },
  {
    keyType: 'pesticide',
    title: '农药'
  },
  {
    keyType: 'inorganicFertilizer',
    title: '无机肥'
  },
  {
    keyType: 'organicFertilizer',
    title: '有机肥'
  },
  {
    keyType: 'landManage',
    title: '管理类型'
  },
  {
    keyType: 'harvestType',
    title: '采收方式'
  },
  {
    keyType: 'storageType',
    title: '仓储类型'
  },
  {
    keyType: 'disasterType',
    title: '受灾类型'
  },
  {
    keyType: 'classType',
    title: '级别'
  },
  {
    keyType: 'stageType',
    title: '状态/项目阶段'
  },
  {
    keyType: 'approveType',
    title: '补贴状态'
  },
  {
    keyType: 'accountType',
    title: '银行转账'
  },
  {
    keyType: 'subsidyType',
    title: '类型(补贴类型)'
  },
  {
    keyType: 'serviceType',
    title: '服务类型'
  },
  {
    keyType: 'serviceClient',
    title: '服务对象'
  },
  {
    keyType: 'feeType',
    title: '费用类型'
  },
  {
    keyType: 'processingParty',
    title: '加工方'
  },
  {
    keyType: 'farmMarks',
    title: '农场标签'
  },
  {
    keyType: 'checkType',
    title: '检测类型'
  },
  {
    keyType: 'harvestType',
    title: '采收方式'
  },
  {
    keyType: 'metric'
  }
];

const defaultDict = {};

const state = {
  dict: _.cloneDeep(defaultDict),
  dictList: []
};

const getters = {
  dict(state) {
    return state.dict;
  },
  dictList(state) {
    return state.dictList;
  }
};

const mutations = {
  setDict(state, payload) {
    state.dict = payload.dict;
  },
  setDictList(state, payload) {
    state.dictList = payload.dictList;
  },
  updateDict(state, payload) {
    let {key, value} = payload;
    _.set(state.dict, key, value);
  },
  resetDict(state) {
    state.dict = _.cloneDeep(defaultDict);
  }
}

const actions = {
  async getDictByKey({commit}, keyType) {
    try {
      let res = await service.getDictByKey({keyType});
      if (res && res.code === 0) {
        commit('updateDict', {key: keyType, value: res.data});
      }
      return res;
    } catch (err) {
        console.log(err);
    }
  },
  async getDictList({commit}) {
    try {
      let keyTypeList = keyTypes.map((item) => item.keyType);
      let res = await service.getDictList({keyTypeList});
      if (res && res.code === 0) {
        let dict = _.groupBy(res.data, (item) => item.keyType);
        commit('setDictList', {dictList: res.data});
        commit('setDict', {dict});
      }
    } catch (err) {
        console.log(err);
    }
  },
  async getAllDictList({commit}) {
    try {
      let res = await service.getAllDictList();
      if (res && res.code === 0) {
        let dict = _.groupBy(res.data, (item) => item.keyType);
        commit('setDictList', {dictList: res.data});
        commit('setDict', {dict});
      }
    } catch (err) {
        console.log(err);
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
