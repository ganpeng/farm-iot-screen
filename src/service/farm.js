import qs from 'querystring';
import _ from 'lodash';
import service from './config';

// 农场基本信息
export const getFarmById = (id) => {
  return service.get(`/v1/farm/${id}`);
};

export const getFarmList = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
      return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/farm/list?${paramsStr}`);
};

export const getStatistic = (id) => {
  return service.get(`/v1/farm/statistic?farmId=${id}`);
};

export const getFarmCount = () => {
  return service.get(`/v1/farm/count`);
};

// 农场农机具
export const getFarmMachineList = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/machinery/list?${paramsStr}`);
};

export const getFarmMachineById = (id) => {
  return service.get(`/v1/machinery/${id}`);
};

// 经营人员
export const createManageMember = (reqBody) => {
  return service.post(`/v1/manage_member/add`, reqBody);
};

export const updateManageMemberById = (reqBody) => {
  return service.put(`/v1/manage_member/edit`, reqBody);
};

export const deleteManageMemberById = (id) => {
  return service.delete(`/v1/manage_member/${id}`);
};

export const getManageMemberList = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/manage_member/list?${paramsStr}`);
};

export const getManageMemberById = (id) => {
  return service.get(`/v1/manage_member/${id}`);
};

// 种植人员
export const createPlantMember = (reqBody) => {
  return service.post(`/v1/plant_member/add`, reqBody);
};

export const updatePlantMemberById = (reqBody) => {
  return service.put(`/v1/plant_member/edit`, reqBody);
};

export const deletePlantMemberById = (id) => {
  return service.delete(`/v1/plant_member/${id}`);
};

export const getPlantMemberList = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/plant_member/list?${paramsStr}`);
};

export const getPlantMemberById = (id) => {
  return service.get(`/v1/plant_member/${id}`);
};

// 宅基地
export const createHomestead = (reqBody) => {
  return service.post(`/v1/homestead`, reqBody);
};

export const updateHomesteadById = (reqBody) => {
  return service.put(`/v1/homestead`, reqBody);
};

export const deleteHomesteadById = (id) => {
  return service.delete(`/v1/homestead/${id}`);
};

export const getHomesteadList = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/homestead/page?${paramsStr}`);
};

export const getHomesteadById = (id) => {
  return service.get(`/v1/homestead/${id}`);
};

// 耕地
export const createLand = (reqBody) => {
  return service.post(`/v1/land`, reqBody);
};

export const updateLandById = (reqBody) => {
  return service.put(`/v1/land`, reqBody);
};

export const deleteLandById = (id) => {
  return service.delete(`/v1/land/${id}`);
};

export const getLandList = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/land/page?${paramsStr}`);
};

export const getLandById = (id) => {
  return service.get(`/v1/land/${id}`);
};

// 政府项目
export const createGovernmentProject = (reqBody) => {
  return service.post(`/v1/government-project`, reqBody);
};

export const updateGovernmentProjectById = (reqBody) => {
  return service.put(`/v1/government-project`, reqBody);
};

export const deleteGovernmentProjectById = (id) => {
  return service.delete(`/v1/government-project/${id}`);
};

export const getGovernmentProjectList = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/government-project/list?${paramsStr}`);
};

export const getGovernmentProjectById = (id) => {
  return service.get(`/v1/government-project/${id}`);
};

// 专项补贴
export const createSubsidy = (reqBody) => {
  return service.post(`/v1/subsidy`, reqBody);
};

export const updateSubsidyById = (reqBody) => {
  return service.put(`/v1/subsidy`, reqBody);
};

export const deleteSubsidyById = (id) => {
  return service.delete(`/v1/subsidy/${id}`);
};

export const getSubsidyList = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/subsidy/list?${paramsStr}`);
};

export const getSubsidyById = (id) => {
  return service.get(`/v1/subsidy/${id}`);
};

// 农业社会化服务
export const createSocial = (reqBody) => {
  return service.post(`/v1/social`, reqBody);
};

export const updateSocialById = (reqBody) => {
  return service.put(`/v1/social`, reqBody);
};

export const deleteSocialById = (id) => {
  return service.delete(`/v1/social/${id}`);
};

export const getSocialList = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/social/list?${paramsStr}`);
};

// 种植管理
export const createPlant = (reqBody) => {
  return service.post(`/v1/plant`, reqBody);
};

export const getPlantById = (id) => {
  return service.get(`/v1/plant?farmLandId=${id}`);
};

export const getPlantHistory = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/plant/history?${paramsStr}`);
};

// 字典接口
export const getDictByKey = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/dict/list?${paramsStr}`);
};

export const getDictList = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/dict/listDict?${paramsStr}`);
};

export const getAllDictList = () => {
  return service.get(`/v1/dict/all`);
};

export const postDict = (reqBody) => {
  return service.post(`/v1/dict/add`, reqBody);
};

// 警告
export const getWarningList = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/warn/page?${paramsStr}`);
};
// 农场列表预警
export const getFarmWarnList = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/warn/farmWarnList?${paramsStr}`);
};

// 预警统计
export const getWarnStatisticsByFarmId = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/warn/warnStatistics?${paramsStr}`);
}

// 统计
export const getStatisticsAll = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/statistics/farm?${paramsStr}`);
};

export const getStatisticsPlant = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/statistics/planting/overView?${paramsStr}`);
};

// 首页耕地类型统计
export const getLandStatistics = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/statistics/land?${paramsStr}`);
};
// 首页物环设备统计
export const getDeviceStatistics = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/statistics/device?${paramsStr}`);
}
// 首页经营情况统计
export const getOperatingStatistics = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/statistics/operating?${paramsStr}`);
};
// 首页人员统计
export const getMemberStatistics = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/statistics/member?${paramsStr}`);
};
// 首页农机具统计
export const getMachineryStatistics = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/statistics/machinery?${paramsStr}`);
};

// 获取农场摄像头的列表
export const getCameraListByFarmId = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/camera/page?${paramsStr}`);
};

// 获取农场传感器的列表
export const getSensorListByFarmId = (id) => {
  return service.get(`/v1/sensor/farmPage?farmId=${id}`);
};

// 获取地块的传感器列表
export const getSensorListByLandCode = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/sensor/datamanage/page?${paramsStr}`);
};

// 获取传感器设备的数据
export const getSensor = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/sensor?${paramsStr}`);
};

// 获取传感器最后一条数据
export const getSensorLastData = (deviceName) => {
  return service.get(`/v1/sensor/lastData?deviceName=${deviceName}`);
};

// 获取摄像头的截图数据
export const getCameraImage = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/monitor/camera/page?${paramsStr}`);
};

// 获取摄像头的延时摄影数据
export const getCameraTimeLapse = (streamName) => {
  return service.get(`/v1/monitor/timelapse/page?streamName=${streamName}`);
};

// 获取摄像头的回看视频
export const getCameraRecordList = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/board/v1/record/record/page?${paramsStr}`);
};

// 获取商品列表
export const getGoodsListByFarmId = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/goods/pageByShop?${paramsStr}`);
};

// 获取商品详情接口
export const getGoodsDetailById = (id) => {
  return service.get(`/v1/goods/getGoodsDetailByShop?goodsId=${id}`);
  // return service.get(`/v1/goods/${id}`);
};

// 查询溯源批次列表
export const getBatchList = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/trace/traceInfo/page?${paramsStr}`);
};

// 溯源次数
export const getTraceConfirm = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/trace/confirm?${paramsStr}`);
};
// 销售统计接口
// 今日已售金额
export const getAmountSoldToday = (type) => {
  return service.get(`/v1/ecstatistics/amountSoldToday?type=${type}`);
};

//购买力top5
export const getCityPurchasPower = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/ecstatistics/cityPurchasPower?${paramsStr}`);
};

// 城市购买力地图
export const getCityPurchasPowerMap = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/ecstatistics/cityPurchasPowerMap?${paramsStr}`);
};

// 商品分类销售额
export const getGoodsCategoryAmount = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/ecstatistics/goodsCategoryAmount?${paramsStr}`);
};

// 商品分类销售额曲线
export const getGoodsCategoryAmountCurve = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/ecstatistics/goodsCategoryAmountCurve?${paramsStr}`);
};

// 热卖商品金额TOP5
export const getHotMoneyTopFive = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/ecstatistics/hotMoneyTopFive?${paramsStr}`);
};

// 农场销量排行
export const getMoneyTopFive = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/ecstatistics/moneyTopFive?${paramsStr}`);
};

// 下单金额
export const getOrderAmount = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/ecstatistics/orderAmount?${paramsStr}`);
};

// 下单量
export const getOrderNum = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/ecstatistics/orderNum?${paramsStr}`);
};

// 客单价分布
export const getUnitPrice = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/ecstatistics/unitPrice?${paramsStr}`);
};

// 会员数统计
export const getMemeberTotal = (type) => {
  return service.get(`/v1/ecstatistics/memeberTotal?type=${type}`);
}

// 用户统计
export const getUserStatistics = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/ecstatistics/memberStatistics?${paramsStr}`);
};

// 平台销量
export const getClientTypeTotal = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/ecstatistics/clientTypeTotal?${paramsStr}`);
};

// 获取预警通知
export const getNoticeList = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/notice/page?${paramsStr}`);
};

/**
 * 登录
 */
export const login = ({captcha, mobile, password}) => {
  return service.post(`/v1/auth/login`, {captcha, mobile, password});
};

/**
 * 获取农场下控制设备列表
 */
export const getControllerListByFarmId = (id) => {
  return service.get(`/v1/controller/farmPage?farmId=${id}`);
};

export const getControllerListByLandCode = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/controller/datamanage/page?${paramsStr}`);
};

/**
 * 获取控制设备最后数据
 */
export const getControllerLastData = (deviceName) => {
  return service.get(`/v1/controller/lastData?deviceName=${deviceName}`);
};

// 获取延时摄影日期列表
export const getTimeLapseDateList = (streamName) => {
  return service.get(`/v1/monitor/timelapse/dateList?streamName=${streamName}`);
};

export const getControllerRun = (obj) => {
  let {id, deviceName, commandList} = obj;
  return service.post(`/v1/controller/run?id=${id}&deviceName=${deviceName}`, commandList);
};

//  获取虫情截图列表
export const getSensorCameraImageList = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/sensor/camera/page?${paramsStr}`);
};

// 溯源农事记录相关
export const getCropCycleList = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/cropCycle/list?${paramsStr}`);
};

/**
 * 获取农事记录列表
 */
 export const getAgriculRecordList = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/agriculRecord/list?${paramsStr}`);
};

/**
 * 获取摄像头的详情
 */
export const getCameraDetailById = (id) => {
  return service.get(`/v1/camera/id?id=${id}`);
};

/**
 * 通过商品ID查溯源相关信息
 */
export const getTraceParamsByGoodsId = (goodsId) => {
  return service.get(`/v1/trace/getTraceInfoByGoodsId?goodsId=${goodsId}`);
};

/**
 * 农场统计数据
 */
export const getStatisticFullYear = (id) => {
  return service.get(`/v1/farm/statistic?farmId=${id}&year=${new Date().getFullYear()}`);
};
