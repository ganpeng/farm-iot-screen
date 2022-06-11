import _ from 'lodash';

const navList = [
  {
    title: '吉林农况',
    name: 'Home',
    path: '/home/index'
  },
  {
    title: '企业数据',
    name: 'FarmStock',
    path: '/farmstock/index'
  },
  {
    title: '销售数据',
    name: 'Sale',
    path: '/sale/index'
  },
  // {
  //   title: '仓储物流',
  //   name: 'Storage',
  //   path: '/storage/index'
  // },
  // {
  //   title: '5G网络',
  //   name: 'Internet',
  //   path: '/internet/index'
  // }
];


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

/**
 *  产生指定范围不重复的随机数(对数组随机排序思路)
 *  参数一: 最小值    int
 *  参数二: 最大值    int
 *  参数三: 随机数量  int
 *  返回值: 结果数组  Array
 **/

function getRandNumForRangen(least, max, num) {
  // 检查传值是否合法
  if (num > max - least) return false;
  // 产生指定范围的所有数值
  var numList = [];
  for (var i = least; i < max; i++) numList.push(i);
  // 对数组随机排序
  numList.sort(function () {
    return Math.random() < 0.5 ? -1 : 1
  });
  // 返回前N个值
  return numList.slice(0, num);
}

// 环形图数据
const ringChartData1 = [{
  name: '旱田',
  value: 55
},
{
  name: '水浇地',
  value: 120
},
{
  name: '水田',
  value: 78
}
];

const ringChartData2 = [{
  name: '传感器',
  value: 55
},
{
  name: '球机摄像头',
  value: 120
},
{
  name: '枪机摄像头',
  value: 78
}
];

// 柱状图数据
const barChartData1 = [{
  name: '水稻',
  value: 167
},
{
  name: '大豆',
  value: 123
},
{
  name: '高粱',
  value: 98
},
{
  name: '其他',
  value: 75
}
];

const alertList = [{
  type: '设备异常状态',
  description: '空气温度: 43℃, 上升3度，最高阈值: 40℃ 土壤温度: 5℃,下降5，最低阈值: 10℃',
  date: '2-25 12:00:32',
  status: '未处理'
},
{
  type: '设备异常状态',
  description: '空气温度: 43℃, 上升3度，最高阈值: 40℃ 土壤温度: 5℃,下降5，最低阈值: 10℃',
  date: '2-25 12:00:32',
  status: '未处理'
},
{
  type: '设备异常状态',
  description: '空气温度: 43℃, 上升3度，最高阈值: 40℃ 土壤温度: 5℃,下降5，最低阈值: 10℃',
  date: '2-25 12:00:32',
  status: '未处理'
},
{
  type: '设备异常状态',
  description: '空气温度: 43℃, 上升3度，最高阈值: 40℃ 土壤温度: 5℃,下降5，最低阈值: 10℃',
  date: '2-25 12:00:32',
  status: '未处理'
},
{
  type: '设备异常状态',
  description: '空气温度: 43℃, 上升3度，最高阈值: 40℃ 土壤温度: 5℃,下降5，最低阈值: 10℃',
  date: '2-25 12:00:32',
  status: '未处理'
},
{
  type: '设备异常状态',
  description: '空气温度: 43℃, 上升3度，最高阈值: 40℃ 土壤温度: 5℃,下降5，最低阈值: 10℃',
  date: '2-25 12:00:32',
  status: '未处理'
},
{
  type: '设备异常状态',
  description: '空气温度: 43℃, 上升3度，最高阈值: 40℃ 土壤温度: 5℃,下降5，最低阈值: 10℃',
  date: '2-25 12:00:32',
  status: '未处理'
},
{
  type: '设备异常状态',
  description: '空气温度: 43℃, 上升3度，最高阈值: 40℃ 土壤温度: 5℃,下降5，最低阈值: 10℃',
  date: '2-25 12:00:32',
  status: '未处理'
},
{
  type: '设备异常状态',
  description: '空气温度: 43℃, 上升3度，最高阈值: 40℃ 土壤温度: 5℃,下降5，最低阈值: 10℃',
  date: '2-25 12:00:32',
  status: '未处理'
}
]

const warningList = [{
  title: '总数',
  count: 22
},
{
  title: '模型预警',
  count: 10
},
{
  title: '设备状态异常',
  count: 5
},
{
  title: '已处理',
  count: 4
},
{
  title: '未处理',
  count: 1
}
];

const labelList1 = [
  {
    name: '水浇地',
    color: colors[1]
  },
  {
    name: '水田',
    color: colors[2]
  },
  {
    name: '旱田',
    color: colors[3]
  },
  {
    name: '耕地',
    color: colors[4]
  },
  {
    name: '宅基地',
    color: colors[5]
  },
];

// 从业人员
const labelList2 = [
{
  name: '经营人员',
  color: colors[1]
},
{
  name: '种植人员',
  color: colors[2]
},
{
  name: '贫困户',
  color: colors[3]
},
{
  name: '有证书人员',
  color: colors[4]
}
];

// 农机具类型
const labelList3 = [
{
  name: '风力',
  color: colors[1]
},
{
  name: '太阳能',
  color: colors[2]
},
{
  name: '汽油',
  color: colors[3]
},
{
  name: '柴油',
  color: colors[4]
},
{
  name: '电力',
  color: colors[5]
},
{
  name: '煤炭',
  color: colors[6]
},
{
  name: '其他动力类型',
  color: colors[7]
},
{
  name: '运输',
  color: colors[8]
},
{
  name: '加工',
  color: colors[9]
},
{
  name: '种植',
  color: colors[10]
},
{
  name: '其他',
  color: colors[11]
}
];

// 种植数据 水稻、大豆、玉米、其他粮食 其他
const labelList4 = [
{
  name: '水稻',
  color: colors[1]
},
{
  name: '大豆',
  color: colors[2]
},
{
  name: '玉米',
  color: colors[3]
},
{
  name: '其他粮食',
  color: colors[4]
},
{
  name: '其他',
  color: colors[5]
}
];

// 投入品
const labelList5 = [
{
  name: '无机肥',
  color: colors[1]
},
{
  name: '有机肥',
  color: colors[2]
},
{
  name: '农药',
  color: colors[3]
},
{
  name: '其他',
  color: colors[4]
}
];

// 经营统计
const labelList6 = [
{
  name: '项目拨款',
  color: colors[1]
},
{
  name: '补贴金额',
  color: colors[2]
},
{
  name: '农业社会化服务',
  color: colors[3]
}
];

// 设备统计
const labelList7 = [
{
  name: '枪机摄像头',
  color: colors[1]
},
{
  name: '球机摄像头',
  color: colors[2]
},
{
  name: '传感器',
  color: colors[3]
}
];

// 农场摄像头分布数据
const cameraData = {
  '粮食农田': {
    bgImage: require('../assets/image/农田03.jpg'),
    bgImages: [
      require('../assets/image/农田02.jpg'),
      require('../assets/image/农田03.jpg'),
      require('../assets/image/农田04.jpg'),
      require('../assets/image/农田05.jpg'),
      require('../assets/image/农田06.jpg'),
      require('../assets/image/农田07.jpg'),
      require('../assets/image/农田08.jpg'),
      require('../assets/image/农田09.jpg')
    ],
    position: {
      left: {
        max: 64,
        min: 5
      },
      top: {
        max: 60,
        min: 20
      }
    }
  },
  '果树林地': {
    bgImage: require('../assets/image/果树01.jpg'),
    bgImages: [
      require('../assets/image/果树01.jpg'),
      require('../assets/image/果树02.jpg')
    ],
    position: {
      left: {
        max: 64,
        min: 5
      },
      top: {
        max: 60,
        min: 20
      }
    }
  },
  '育苗大棚': {
    bgImage: require('../assets/image/育苗大棚.jpg'),
    position: {
      left: {
        max: 60,
        min: 10
      },
      top: {
        max: 64,
        min: 20
      }
    }
  },
  '蔬菜大棚': {
    bgImage: require('../assets/image/蔬菜大棚.jpg'),
    position: {
      left: {
        max: 60,
        min: 10
      },
      top: {
        max: 64,
        min: 20
      }
    }
  },
  '仓储建筑': {
    bgImage: require('../assets/image/仓储01.jpg'),
    // bgImages: [
    //   require('../assets/image/仓储01.jpg'),
    //   require('../assets/image/仓储02.jpg')
    // ],
    position: {
      left: {
        max: 60,
        min: 10
      },
      top: {
        max: 54,
        min: 10
      }
    }
  },
  '生态观光': {
    bgImage: require('../assets/image/生态观光.jpg'),
    position: {
      left: {
        max: 64,
        min: 40
      },
      top: {
        max: 64,
        min: 54
      }
    }
  },
  '河流湖泊': {
    bgImage: require('../assets/image/河流湖泊.jpg'),
    position: {
      left: {
        max: 64,
        min: 40
      },
      top: {
        max: 64,
        min: 54
      }
    }
  },
  '水库坑塘': {
    bgImage: require('../assets/image/水库坑塘.jpg'),
    position: {
      left: {
        max: 64,
        min: 40
      },
      top: {
        max: 64,
        min: 54
      }
    }
  },
  '沼泽滩涂': {
    bgImage: require('../assets/image/沼泽滩涂.jpg'),
    position: {
      left: {
        max: 64,
        min: 40
      },
      top: {
        max: 64,
        min: 54
      }
    }
  },
  '人工鱼塘': {
    bgImage: require('../assets/image/人工鱼塘.jpg'),
    position: {
      left: {
        max: 64,
        min: 40
      },
      top: {
        max: 64,
        min: 54
      }
    }
  }
};

const warningTableList = _.times(30, () => {
  let obj = {
    id: 'YJ-2020070122334400001',
    deviceId: 'V134124124',
    farm: 'V134124124',
    type: '设备异常状态',
    description: '空气温度: 43℃, 上升3度，最高阈值: 40℃ 土壤温度: 5℃,下降5，最低阈值: 10℃',
    date: '2-25 12:00:32',
    status: '未处理'
  };
  return Object.assign({}, obj);
});

const borderColors = ['#0B142B', '#1C56A5'];

const trendChartLabelList = [{
  name: '空气温度',
  active: true,
  metric: 'dqwd',
  unit: '℃',
  color: colors[0]
},
{
  name: '空气湿度',
  active: true,
  metric: 'dqsd',
  min: 0.2,
  unit: '%',
  color: colors[1]
},
{
  name: '光照度',
  active: true,
  metric: 'gzd',
  unit: 'klux',
  color: colors[2]
},
{
  name: '光照总辐射',
  active: true,
  metric: 'gzzfs',
  unit: '',
  color: colors[3]
},
{
  name: '降雨量',
  active: true,
  metric: 'jyl',
  unit: 'mm',
  color: colors[4]
},
{
  name: '气压',
  active: true,
  metric: 'qy',
  min: 800,
  unit: 'kpa',
  color: colors[5]
},
{
  name: '风速',
  active: true,
  metric: 'fs',
  unit: 'm/s',
  color: colors[6]
},
{
  name: '风向',
  active: false,
  metric: 'fx',
  unit: '°',
  color: colors[12]
},
{
  name: '土壤温度',
  active: false,
  metric: 'trwd',
  min: 10,
  unit: '℃',
  color: colors[7]
},
{
  name: '土壤湿度',
  active: false,
  metric: 'trxdsd',
  unit: '%',
  color: colors[8]
},
{
  name: '捕虫量',
  active: false,
  metric: 'sccs',
  unit: '个',
  color: colors[9]
},
{
  name: '温度',
  active: false,
  metric: 'szwd',
  unit: '℃',
  color: colors[10]
},
{
  name: 'PH值',
  active: false,
  metric: 'sph',
  unit: 'PH值',
  color: colors[11]
}
];
const waterTrendChartLabelList = [
  {
    name: '温度',
    active: true,
    metric: 'swd',
    unit: '℃',
    color: colors[0]
  },
  {
    name: 'PH值',
    active: true,
    metric: 'sph',
    unit: 'PH值',
    color: colors[5]
  },
  {
    name: '溶解氧',
    active: true,
    metric: 'rjy',
    unit: 'mg/L',
    color: colors[2]
  }
];

const meteoroTrendChartLabelList = [{
  name: '空气温度',
  active: true,
  metric: 'dqwd',
  unit: '℃',
  color: colors[0]
},
{
  name: '空气湿度',
  active: true,
  metric: 'dqsd',
  min: 0.2,
  unit: '%',
  color: colors[1]
},
{
  name: '光照度',
  active: true,
  metric: 'gzd',
  unit: 'klux',
  color: colors[2]
},
// {
//   name: '光照总辐射',
//   active: true,
//   metric: 'gzzfs',
//   unit: '',
//   color: colors[3]
// },
{
  name: '降雨量',
  active: true,
  metric: 'jyl',
  unit: 'mm',
  color: colors[4]
},
{
  name: '气压',
  active: true,
  metric: 'qy',
  min: 800,
  unit: 'kpa',
  color: colors[5]
},
{
  name: '风速',
  active: true,
  metric: 'fs',
  unit: 'm/s',
  color: colors[6]
},
{
  name: '风向',
  active: true,
  metric: 'fx',
  unit: '°',
  color: colors[12]
},
]

// 首页图表label '#FFDF12', '#4DFBFF', '#417FC8'
const landLabelList = [{
  name: '旱田',
  color: '#FFDF12'
},
{
  name: '水浇地',
  color: '#4DFBFF'
},
{
  name: '水田',
  color: '#059eff'
}
];

const deviceLabelList = [{
  name: '传感器',
  color: '#FFDF12'
},
{
  name: '球机',
  color: '#4DFBFF'
},
{
  name: '枪机',
  color: '#059eff'
}
];

const baseStationLabelList = [{
  name: '高频',
  color: '#FFDF12'
},
{
  name: '低频',
  color: '#4DFBFF'
}
];

// 传感器实时数据列表
const sensorRealList = [{
  title: '空气温度',
  metric: 'dqwd',
  value: '/',
  unit: '℃',
  icon: 'sensor_icon1',
  wapIcon: 'wap_sensor_icon1'
},
{
  title: '空气湿度',
  metric: 'dqsd',
  value: '/',
  unit: '%',
  icon: 'sensor_icon2',
  wapIcon: 'wap_sensor_icon2'
},
{
  title: '风速',
  metric: 'fs',
  value: '/',
  unit: 'm/s',
  icon: 'sensor_icon3',
  wapIcon: 'wap_sensor_icon3'
},
{
  title: '风向',
  metric: 'fx',
  value: '/',
  unit: '°',
  icon: 'sensor_icon13',
  wapIcon: 'wap_sensor_icon3'
},
{
  title: '降雨量',
  metric: 'jyl',
  value: '/',
  unit: 'mm',
  icon: 'sensor_icon5',
  wapIcon: 'wap_sensor_icon4'
},
{
  title: '光照度',
  metric: 'gzd',
  value: '/',
  unit: 'klux',
  icon: 'sensor_icon4',
  wapIcon: 'wap_sensor_icon5'
},
{
  title: '光照总辐射',
  metric: 'gzzfs',
  value: '/',
  unit: 'um/m2/s',
  icon: 'sensor_icon6',
  wapIcon: 'wap_sensor_icon6'
},
{
  title: '大气压',
  metric: 'qy',
  value: '/',
  unit: 'kpa',
  icon: 'sensor_icon7',
  wapIcon: 'wap_sensor_icon7'
},
{
  title: '土壤温度',
  metric: 'trwd',
  value: '/',
  unit: '℃',
  icon: 'sensor_icon8',
  wapIcon: 'wap_sensor_icon8'
},
{
  title: '土壤湿度',
  metric: 'trxdsd',
  value: '/',
  unit: '%',
  icon: 'sensor_icon9',
  wapIcon: 'wap_sensor_icon9'
},
{
  title: '水质温度',
  metric: 'szwd',
  value: '/',
  unit: '℃',
  icon: 'sensor_icon11',
  wapIcon: 'wap_sensor_icon10'
},
{
  title: '水质PH值',
  metric: 'sph',
  value: '/',
  unit: 'PH值',
  // isWarning: true,
  icon: 'sensor_icon10',
  wapIcon: 'wap_sensor_icon11'
},
{
  title: '捕虫量',
  metric: 'sccs',
  value: '/',
  unit: '个',
  // isDanger: true,
  icon: 'sensor_icon12',
  wapIcon: 'wap_sensor_icon12'
}
];

const sensorRealList2 = [{
  title: '空气温度',
  metric: 'dqwd',
  value: '/',
  unit: '℃',
  icon: 'sensor_icon1',
  wapIcon: 'wap_sensor_icon1'
},
{
  title: '空气湿度',
  metric: 'dqsd',
  value: '/',
  unit: '%',
  icon: 'sensor_icon2',
  wapIcon: 'wap_sensor_icon2'
},
{
  title: '风速',
  metric: 'fs',
  value: '/',
  unit: 'm/s',
  icon: 'sensor_icon3',
  wapIcon: 'wap_sensor_icon3'
},
{
  title: '风向',
  metric: 'fx',
  value: '/',
  unit: '°',
  icon: 'sensor_icon13',
  wapIcon: 'wap_sensor_icon3'
},
{
  title: '降雨量',
  metric: 'jyl',
  value: '/',
  unit: 'mm',
  icon: 'sensor_icon5',
  wapIcon: 'wap_sensor_icon4'
},
{
  title: '光照度',
  metric: 'gzd',
  value: '/',
  unit: 'klux',
  icon: 'sensor_icon4',
  wapIcon: 'wap_sensor_icon5'
},
// {
//   title: '光照总辐射',
//   metric: 'gzzfs',
//   value: '/',
//   unit: 'um/m2/s',
//   icon: 'sensor_icon6',
//   wapIcon: 'wap_sensor_icon6'
// },
{
  title: '大气压',
  metric: 'qy',
  value: '/',
  unit: 'kpa',
  icon: 'sensor_icon7',
  wapIcon: 'wap_sensor_icon7'
}
];

const waterSensorRealList = [{
  title: '温度',
  metric: 'swd',
  value: '/',
  unit: '℃',
  icon: 'sensor_icon1',
  wapIcon: 'wap_sensor_icon1'
},
{
  title: 'PH值',
  metric: 'sph',
  value: '/',
  unit: '',
  icon: 'sensor_icon10',
  wapIcon: 'wap_sensor_icon11'
},
{
  title: '溶解氧',
  metric: 'rjy',
  value: '/',
  unit: 'mg/L',
  // isDanger: true,
  icon: 'sensor_icon12',
  wapIcon: 'wap_sensor_icon12'
}
];

const spreadSensorList = [
  {
    title: '空气温度',
    metric: 'dqwd',
    value: '/',
    unit: '℃',
    icon: 'sensor_icon1',
    wapIcon: 'wap_sensor_icon1'
  },
  {
    title: '空气湿度',
    metric: 'dqsd',
    value: '/',
    unit: '%',
    icon: 'sensor_icon2',
    wapIcon: 'wap_sensor_icon2'
  },
  {
    title: '降雨量',
    metric: 'jyl',
    value: '/',
    unit: 'mm',
    icon: 'sensor_icon5',
    wapIcon: 'wap_sensor_icon4'
  },
  {
    title: '土壤温度',
    metric: 'trwd',
    value: '/',
    unit: '℃',
    icon: 'sensor_icon8',
    wapIcon: 'wap_sensor_icon8'
  },
  {
    title: '土壤湿度',
    metric: 'trxdsd',
    value: '/',
    unit: '%',
    icon: 'sensor_icon9',
    wapIcon: 'wap_sensor_icon9'
  },
  {
    title: '水质PH值',
    metric: 'sph',
    value: '/',
    unit: '',
    // isWarning: true,
    icon: 'sensor_icon10',
    wapIcon: 'wap_sensor_icon11'
  }
];

// 销售页面labelList
const saleLabelList1 = [{
  name: '水稻',
  color: '#6992DE'
},
{
  name: '大豆',
  color: '#D6B564'
},
{
  name: '玉米',
  color: '#DD6F46'
},
{
  name: '其他粮食',
  color: '#ECC94C'
},
{
  name: '其他',
  color: '#884CDE'
}
];

const areaChartOption = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  series: [{
    type: 'pie',
    radius: '55%',
    center: ['50%', '50%'],
    data: [{
      value: 335,
      name: '直接访问'
    },
    {
      value: 310,
      name: '邮件营销'
    },
    {
      value: 274,
      name: '联盟广告'
    },
    {
      value: 235,
      name: '视频广告'
    },
    {
      value: 400,
      name: '搜索引擎'
    }
    ],
    roseType: 'radius',
    label: {
      color: 'rgba(255, 255, 255, 0.3)'
    }
  }]
};

// 省市经纬度JSON
const provinceLnglat = [
  { name: '北京', value: ['116.3979471', '39.9081726'] },

  { name: '上海', value: ['121.4692688', '31.2381763'] },

  { name: '天津', value: ['117.2523808', '39.1038561'] },

  { name: '重庆', value: ['106.548425', '29.5549144'] },

  { name: '河北', value: ['114.4897766', '38.0451279'] },

  { name: '山西', value: ['112.5223053', '37.8357424'] },

  { name: '辽宁', value: ['123.4116821', '41.7966156'] },

  { name: '吉林', value: ['125.3154297', '43.8925629'] },

  { name: '黑龙江', value: ['126.6433411', '45.7414932'] },

  { name: '浙江', value: ['120.1592484', '30.265995'] },

  { name: '福建', value: ['119.2978134', '26.0785904'] },

  { name: '山东', value: ['117.0056', '36.6670723'] },

  { name: '河南', value: ['113.6500473', '34.7570343'] },

  { name: '湖北', value: ['114.2919388', '30.5675144'] },

  { name: '湖南', value: ['112.9812698', '28.2008247'] },

  { name: '广东', value: ['113.2614288', '23.1189117'] },

  { name: '海南', value: ['110.3465118', '20.0317936'] },

  { name: '四川', value: ['104.0817566', '30.6610565'] },

  { name: '贵州', value: ['106.7113724', '26.5768738'] },

  { name: '云南', value: ['102.704567', '25.0438442'] },

  { name: '江西', value: ['115.8999176', '28.6759911'] },

  { name: '陕西', value: ['108.949028', '34.2616844'] },

  { name: '青海', value: ['101.7874527', '36.6094475'] },

  { name: '甘肃', value: ['103.7500534', '36.0680389'] },

  { name: '广西', value: ['108.3117676', '22.8065434'] },

  { name: '新疆', value: ['87.6061172', '43.7909393'] },

  { name: '内蒙古', value: ['111.6632996', '40.8209419'] },

  { name: '西藏', value: ['91.1320496', '29.657589'] },

  { name: '宁夏', value: ['106.2719421', '38.4680099'] },

  { name: '台湾', value: ['120.9581316', '23.8516062'] },

  { name: '港澳', value: ['114.139452', '22.391577'] },
  // { name: '香港', value: ['114.139452', '22.391577'] },

  // { name: '澳门', value: ['113.5678411', '22.167654'] },

  { name: '安徽', value: ['117.2757034', '31.8632545'] },

  { name: '江苏', value: ['118.7727814', '32.0476151'] }

];

const manageMemberImageList = [
  {
    url: require('../assets/image/member1.png')
  },
  {
    url: require('../assets/image/member2.png')
  }
];

const plantMemberImageList = _.times(14, (index) => {
  return {
    url: require(`../assets/image/member${index + 3}.png`)
  };
});

const machineImageList = [
  {
    url: require('../assets/image/machine3.png')
  },
  {
    url: require('../assets/image/machine2.png')
  },
  {
    url: require('../assets/image/machine1.png')
  }
];

// 种植管理
const STEP_LIST = [
  {
    title: "作物信息",
    active: true
  },
  {
    title: "投入品",
    active: false
  },
  {
    title: "田间管理",
    active: false
  },
  {
    title: "采收管理",
    active: false
  },
  {
    title: "加工管理",
    active: false
  },
  {
    title: "仓储管理",
    active: false
  },
  {
    title: "检测信息",
    active: false
  },
  {
    title: "受灾信息",
    active: false
  },
  {
    title: "农机具使用",
    active: false
  }
];

const memberRealImageMap = {
  '邹本臣': require('../assets/image/member_real1.png'),
  '张亚茹': require('../assets/image/member_real2.png'),
  '王硕': require('../assets/image/member_real3.png'),
  '赵艳春': require('../assets/image/member_real4.png'),
  '李建光': require('../assets/image/member_real5.png'),
  '邹儒君': require('../assets/image/member_real6.png'),
  '赵丽影': require('../assets/image/member_real7.png'),
  '张晓丽': require('../assets/image/member_real8.png'),
  '刘淑红': require('../assets/image/member_real9.png'),
  '牟艳华': require('../assets/image/member_real10.png'),
  '冯春艳': require('../assets/image/member_real11.png'),
  '王艳萍': require('../assets/image/member_real12.png'),
  '李辉': require('../assets/image/member_real13.png'),
  '郭海全': require('../assets/image/member_real14.png'),
  '艾有': require('../assets/image/member_real15.png'),
  '宋景福': require('../assets/image/member_real16.png'),
  '王静远': require('../assets/image/member_real17.png'),
  'MALE': require('../assets/image/avatar_male.png'),
  'FEMALE': require('../assets/image/avatar_female.png')
};

export default {
  navList,
  ringChartData1,
  ringChartData2,
  barChartData1,
  alertList,
  warningList,
  warningTableList,
  borderColors,
  // 图表的label
  labelList1,
  labelList2,
  labelList3,
  labelList4,
  labelList5,
  labelList6,
  labelList7,
  // 农场摄像头
  cameraData,
  getRandNumForRangen,
  colors,
  // 首页图表
  landLabelList,
  deviceLabelList,
  baseStationLabelList,
  // 趋势图表
  trendChartLabelList,
  waterTrendChartLabelList,
  sensorRealList,
  waterSensorRealList,
  sensorRealList2,
  meteoroTrendChartLabelList,
  // 图表配置项
  areaChartOption,
  // 销售页面labelList
  saleLabelList1,
  // 推广页传感器
  spreadSensorList,
  // 省市经纬度
  provinceLnglat,
  manageMemberImageList,
  plantMemberImageList,
  machineImageList,
  STEP_LIST,
  memberRealImageMap
};
