const colors = [
  '#297CEB',
  '#7C82FB',
  '#71CACF',
  '#23A6F5',
  '#98BD72',
  '#E2CA7F',
  '#5FD2DB',
  '#E9C366',
  '#D9647E',
  '#DF7C57',
  '#884CDE',
  '#4796FF',
  '#C08EF2'
];

const labelList1 = [
  {
    name: '粮食农田',
    prop: 'farmLandArea',
    color: colors[1]
  },
  {
    name: '果树林地',
    prop: 'fruitLandArea',
    color: colors[2]
  },
  {
    name: '育苗大棚',
    prop: 'plantGreenhouseArea',
    color: colors[3]
  },
  {
    name: '蔬菜大棚',
    prop: 'vegetableGreenhouseArea',
    color: colors[4]
  },
  {
    name: '仓储建筑',
    prop: 'warehouseArea',
    color: colors[5]
  },
  {
    name: '生态观光',
    prop: 'ecologicalLandArea',
    color: colors[6]
  },
  {
    name: '河流湖泊',
    prop: 'riverArea',
    color: colors[7]
  },
  {
    name: '水库坑塘',
    prop: 'reservoirArea',
    color: colors[8]
  },
  {
    name: '沼泽滩涂',
    prop: 'moorArea',
    color: colors[9]
  },
  {
    name: '人工鱼塘',
    prop: 'fishpondArea',
    color: colors[10]
  },
  {
    name: '宅基地',
    prop: 'homesteadArea',
    color: colors[11]
  }
];

// 从业人员
const labelList2 = [
  {
    name: '经营人员',
    prop: 'manageMemberNumber',
    stack: 'b',
    color: colors[1]
  },
  {
    name: '种植人员',
    prop: 'plantMemberNumber',
    stack: 'b',
    color: colors[2]
  },
  {
    name: '贫困户',
    prop: 'poorMemberNumber',
    stack: 'c',
    color: colors[3]
  },
  {
    name: '有证书人员',
    prop: 'certificatedMemberNumber',
    stack: 'd',
    color: colors[4]
  }
];

// 农机具类型
const labelList3 = [
  {
    name: '风力',
    prop: 'windMachineryNumber',
    stack: 'a',
    color: colors[1]
  },
  {
    name: '太阳能',
    prop: 'solarMachineryNumber',
    stack: 'a',
    color: colors[2]
  },
  {
    name: '汽油',
    prop: 'gasolineMachineryNumber',
    stack: 'a',
    color: colors[3]
  },
  {
    name: '柴油',
    prop: 'dieselMachineryNumber',
    stack: 'a',
    color: colors[4]
  },
  {
    name: '电力',
    prop: 'electricMachineryNumber',
    stack: 'a',
    color: colors[5]
  },
  {
    name: '水利',
    prop: 'hydraulicMachineryNumber',
    stack: 'a',
    color: colors[12]
  },
  {
    name: '煤炭',
    prop: 'coalMachineryNumber',
    stack: 'a',
    color: colors[6]
  },
  {
    name: '其他动力类型',
    prop: 'otherPowerMachineryNumber',
    stack: 'a',
    color: colors[7]
  },
  {
    name: '运输',
    prop: 'transportMachineryNumber',
    stack: 'b',
    color: colors[8]
  },
  {
    name: '加工',
    prop: 'processMachineryNumber',
    stack: 'b',
    color: colors[9]
  },
  {
    name: '种植',
    prop: 'plantingMachineryNumber',
    stack: 'b',
    color: colors[10]
  },
  {
    name: '其他',
    prop: 'otherUseMachineryNumber',
    stack: 'b',
    color: colors[11]
  },
  {
    name: '水产养殖',
    prop: 'aquicultureMachineryNumber',
    stack: 'b',
    color: colors[0]
  }
];

  // 种植数据 水稻、大豆、玉米、其他粮食 其他
const labelList4 = [
  {
    name: '水稻',
    prop: 'riceYield',
    stack: 'a',
    color: colors[1]
  },
  {
    name: '大豆',
    prop: 'soyaYield',
    stack: 'a',
    color: colors[2]
  },
  {
    name: '玉米',
    prop: 'cornYield',
    stack: 'a',
    color: colors[3]
  },
  {
    name: '其他粮食',
    prop: 'otherGrainYield',
    stack: 'a',
    color: colors[4]
  },
  {
    name: '其他作物',
    prop: 'otherCropYield',
    stack: 'a',
    color: colors[5]
  },
  {
    name: '淡水鱼类',
    prop: 'freshWaterFishYield',
    stack: 'b',
    color: colors[6]
  },
  {
    name: '淡水甲壳类',
    prop: 'freshWaterShellYield',
    stack: 'b',
    color: colors[7]
  },
  {
    name: '淡水其他',
    prop: 'freshWaterOtherYield',
    stack: 'b',
    color: colors[8]
  },
  {
    name: '其他水产',
    prop: 'otherWaterYield',
    stack: 'b',
    color: colors[9]
  }
];

  // 投入品
const labelList5 = [
  {
    name: '无机肥',
    prop: 'inorganicFertilizerAmount',
    stack: 'a',
    color: colors[1]
  },
  {
    name: '有机肥',
    prop: 'organicFertilizerAmount',
    stack: 'a',
    color: colors[2]
  },
  {
    name: '农药',
    prop: 'pesticideAmount',
    stack: 'a',
    color: colors[3]
  },
  {
    name: '饲料',
    prop: 'forageAmount',
    stack: 'a',
    color: colors[4]
  },
  {
    name: '鱼药',
    prop: 'fisheryMedicinesAmount',
    stack: 'a',
    color: colors[5]
  },
  {
    name: '其他',
    prop: 'otherAmount',
    stack: 'a',
    color: colors[6]
  }
];

  // 经营统计
const labelList6 = [
  {
    name: '项目拨款',
    prop: 'appropriationAmount',
    stack: 'b',
    color: colors[1]
  },
  {
    name: '补贴金额',
    prop: 'subsidyAmount',
    stack: 'b',
    color: colors[2]
  },
  {
    name: '农业社会化服务',
    prop: 'revenueAmount',
    stack: 'b',
    color: colors[3]
  }
];

  // 设备统计
const labelList7 = [
  {
    name: '枪机摄像头',
    prop: 'boxCameraNumber',
    stack: 'a',
    color: colors[1]
  },
  {
    name: '球机摄像头',
    prop: 'domeCameraNumber',
    stack: 'b',
    color: colors[2]
  },
  {
    name: '传感器',
    prop: 'sensorNumber',
    stack: 'c',
    color: colors[3]
  },
  {
    name: 'NVR',
    prop: 'nvrNumber',
    stack: 'd',
    color: colors[4]
  }
];

let colors2 = ['#FFDF12', '#4DFBFF', '#059eff', '#D9647E'];

const landLabelList = [
  {
    name: '耕地',
    prop: 'farmLandArea',
    prop2: 'totalYield',
    color: colors2[0]
  },
  {
    name: '水产',
    prop: 'waterArea',
    prop2: 'totalWaterYield',
    color: colors2[1]
  },
  {
    name: '其他',
    prop: 'otherLandArea',
    color: colors2[2]
  }
];

const prodLabelList = [
  {
    name: '农作物',
    prop: 'totalYield',
    color: colors2[0]
  },
  {
    name: '水产',
    prop: 'totalWaterYield',
    color: colors2[1]
  }
];

const deviceLabelList = [
  {
    name: '传感器',
    prop: 'sensorNumber',
    color: colors2[0]
  },
  {
    name: '球机',
    prop: 'domeCameraNumber',
    color: colors2[1]
  },
  {
    name: '枪机',
    prop: 'boxCameraNumber',
    color: colors2[2]
  },
  {
    name: 'NVR',
    prop: 'nvrNumber',
    color: '#9258E6'
  },
  {
    name: '智能灌溉机',
    prop: 'Irrigator',
    color: '#ECC94C'
  }
];

const colors3 = ["#6992DE", "#D6B564", "#DD6F46", "#9258E6", "#ECC94C"];
const plantLabelList = [
  {
    name: '水稻',
    prop: 'riceArea',
    prop2: 'riceYield',
    color: colors3[0]
  },
  {
    name: '大豆',
    prop: 'soyaArea',
    prop2: 'soyaYield',
    color: colors3[1]
  },
  {
    name: '玉米',
    prop: 'cornArea',
    prop2: 'cornYield',
    color: colors3[2]
  },
  {
    name: '其他粮食',
    prop: 'otherGrainArea',
    prop2: 'otherGrainYield',
    color: colors3[3]
  },
  {
    name: '其他',
    prop: 'otherCropArea',
    prop2: 'otherCropYield',
    color: colors3[4]
  }
];

const waterLabelList = [
  {
    name: '淡水鱼类',
    prop: 'freshWaterFishArea',
    prop2: 'freshWaterFishYield',
    color: colors3[0]
  },
  {
    name: '淡水甲壳',
    prop: 'freshWaterShellYield',
    prop2: 'freshWaterShellYield',
    color: colors3[1]
  },
  {
    name: '淡水其他',
    prop: 'freshWaterOtherArea',
    prop2: 'freshWaterOtherYield',
    color: colors3[2]
  },
  {
    name: '其他',
    prop: 'otherWaterArea',
    prop2: 'otherWaterYield',
    color: colors3[3]
  }
];

const clientLabelList = [
  {
    name: 'PC端',
    client_type: 'PC'
  },
  {
    name: '小程序',
    client_type: 'MINI'
  },
  {
    name: 'WAP端',
    client_type: 'WAP'
  },
  {
    name: 'APP',
    client_type: 'REACT'
  }
];

export default {
  colors,
  colors3,
  labelList1,
  labelList2,
  labelList3,
  labelList4,
  labelList5,
  labelList6,
  labelList7,
  landLabelList,
  prodLabelList,
  deviceLabelList,
  plantLabelList,
  waterLabelList,
  clientLabelList
};
