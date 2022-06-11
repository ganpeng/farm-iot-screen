// 2019年比例产值
import label from './label';
const production2019 = [
  {
    name: '农业',
    color: '#FFDF12',
    value: 1014.12
  },
  {
    name: '林业',
    color: '#4DFBFF',
    value: 68.09
  },
  {
    name: '牧业',
    color: '#059eff',
    value: 1239.58
  },
  {
    name: '渔业',
    color: '#9258E6',
    value: 40.12
  }
];

const tabListOne = [
  {
    name: '近5年'
  },
  {
    name: '近10年'
  },
  {
    name: '近15年'
  },
  {
    name: '近20年'
  }
];

const production20Years = {
  labelList: ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'],
  valueList: [
    {
      name: '总产量',
      type: 'line',
      color: label.colors[0],
      data: [609.37, 691.83, 734.21, 792.14, 940.67, 1050.49, 1111.49, 1329.16, 1542.77, 1619.53, 1688.9, 2029.86, 2181.92, 2276.4, 2302.04, 2292.97, 2167.89, 2064.29, 2184.34, 2442.73]
    },
    {
      name: '农业',
      type: 'line',
      color: label.colors[1],
      data: [320.27, 405.4, 410.22, 438.34, 486.23, 518.13, 586.52, 627.08, 715.78, 726.02, 791.33, 910.43, 1017.33, 1075.44, 1118.55, 1114.7, 948.98, 895.83, 992.96, 1014.12]
    },
    {
      name: '林业',
      type: 'line',
      color: label.colors[2],
      data: [11.38, 13.83, 33.91, 33.77, 32.85, 39.9, 44.35, 47.69, 52.52, 55.01, 62.38, 73.03, 85.55, 83.63, 87.01, 87.42, 72.64, 69.38, 73.28, 68.09]
    },
    {
      name: '牧业',
      type: 'line',
      color: label.colors[3],
      data: [268.72, 263.24, 271.13, 298.44, 399.06, 467.59, 449.2, 621.01, 735.85, 770.9, 758.93, 958.64, 985.75, 1021.62, 995.65, 990.92, 1033.4, 982.37, 1001.64, 1239.58]
    },
    {
      name: '渔业',
      type: 'line',
      color: label.colors[4],
      data: [9, 9.36, 10.83, 13.56, 13.44, 14.87, 17.48, 18.39, 21.52, 21.92, 23.14, 27.76, 29.78, 31.32, 33.43, 31.77, 40.25, 41.72, 39.02, 40.12]
    }
  ]
};

const farmProduceData20Years = {
  labelList: ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'],
  valueList: [
    {
      name: '粮食',
      type: 'line',
      active: true,
      color: label.colors[0],
      prod: [1638, 1953.4, 2214.8, 2259.6, 2510, 2581.21, 2720, 2437.99, 2896.41, 2479.35, 2790.72, 3231.79, 3450.21, 3763.3, 3800.06, 3974.1, 4150.7, 4154, 3632.74, 3877.93],
      area: [3357.1, 3357.2, 4037.6, 4013.8, 4312.1, 4294.5, 4325.5, 4472.9, 4555.3, 4560.9, 4676.7, 4766.4, 4891.3, 5132.1, 5411.7, 5534.1, 5542.4, 5543.9, 5599.7, 5644.93]
    },
    {
      name: '稻谷',
      type: 'line',
      active: true,
      color: label.colors[1],
      prod: [374.8, 371.2, 370, 318.2, 437.62, 478, 493, 501.24, 584.94, 510.48, 574.14, 629.26, 539.9, 573.09, 595.39, 644.26, 670.45, 684.43, 646.32, 657.17],
      area: [483.9, 465.4, 666.1, 541, 600.1, 654, 664, 671.5, 665.5, 667.5, 680.2, 697.7, 711.6, 739.4, 757, 778.8, 800.2, 820.8, 839.7, 840.39]
    },
    {
      name: '玉米',
      type: 'line',
      active: true,
      color: label.colors[2],
      prod: [11.38, 13.83, 33.91, 33.77, 32.85, 39.9, 44.35, 47.69, 52.52, 55.01, 62.38, 73.03, 85.55, 83.63, 87.01, 87.42, 72.64, 69.38, 73.28, 68.09],
      area: [1821.1, 1927.2, 2579.5, 2627.2, 2901.5, 2775.2, 2805.9, 2885.4, 2987.6, 3029.5, 3214.9, 3340.2, 3534.2, 3808.2, 4062.7, 4251.1, 4242, 4164, 4231.5, 4219.61]
    },
    {
      name: '小麦',
      type: 'line',
      active: true,
      color: label.colors[3],
      prod: [16.3, 11.58, 7.94, 6, 3.37, 2.68, 3, 1.61, 1.94, 1.13, 1.46, 1.64, 1.26, 0, 1.56, 0.14, 0.15, 0.15, 0.04, 1.11],
      area: [77.3, 53.8, 23, 22.1, 11.4, 9.5, 1.1, 5.61, 6.18, 4.63, 4.21, 3.89, 4.09, 0, 4, 0.37, 0.41, 2.42, 1.2, 2.94]
    },
    {
      name: '豆类',
      type: 'line',
      active: true,
      color: label.colors[4],
      prod: [140.6, 134.18, 184.96, 191.1, 166.91, 152.83, 150, 93.4, 108.17, 103.88, 109.99, 106.5, 56.31, 61.94, 54.89, 50.25, 55, 67.08, 62.75, 77.04],
      area: [666.5, 646.53, 582.9, 607.7, 633.2, 632.9, 282.2, 593.64, 632.33, 612.86, 556.09, 503.11, 395.43, 367.23, 364.14, 303.69, 287.9, 328.97, 343.52, 403.82]
    },
    {
      name: '薯类',
      type: 'line',
      active: true,
      color: label.colors[5],
      prod: [49.1, 43.65, 41.72, 52.9, 57.73, 75.89, 39, 24.37, 28.23, 29.33, 69.31, 49.28, 61.57, 41.45, 41.61, 44.58, 41.55, 42.95, 36.18, 31.44],
      area: [123.4, 112.5, 69.2, 87.6, 84.8, 107.2, 133.5, 98.9, 92.3, 105.3, 82.5, 77.7, 70.5, 68.9, 68.2, 65.3, 61.3, 62.1, 46.3, 47.01]
    },
    {
      name: '油料',
      type: 'line',
      active: true,
      color: label.colors[6],
      prod: [38.96, 34.34, 46.12, 57.13, 38.1, 54.45, 58.37, 29.3, 54.03, 53.63, 76.53, 77.14, 91.4, 97.12, 101.14, 92.08, 109.3, 128.48, 87.53, 81.78],
      area: [271.9, 234, 257.8, 301.8, 222.1, 288.5, 287.8, 248.3, 221.3, 258.5, 329.3, 271.8, 301.8, 319.7, 314.3, 324.3, 390, 408.7, 280.8, 257.38]
    },
    {
      name: '蔬菜',
      type: 'line',
      active: true,
      color: label.colors[7],
      prod: [836.43, 777.84, 859.44, 881.01, 699.89, 832.56, 814, 968.57, 886.63, 872.72, 792.95, 599.01, 536.59, 482.89, 422.08, 380.23, 348.01, 356.64, 438.15, 445.39],
      area: [264.88, 259.82, 291.11, 269.1, 235.6, 209.57, 215.33, 180.5, 150.69, 144.11, 134.09, 142.75, 131.97, 109.44, 99.79, 86.5, 80.57, 82.84, 110.9, 121.45]
    }
  ]
};

const aDayInJilin = [
  {
    name: '2010年',
    data: [
      {
        name: '水稻',
        value: 1.57,
        unit: '万吨'
      },
      {
        name: '玉米',
        value: 5.47,
        unit: '万吨'
      },
      {
        name: '大豆',
        value: 0.3,
        unit: '万吨'
      },
      {
        name: '高梁',
        value: 0.19,
        unit: '万吨'
      },
      {
        name: '马铃薯',
        value: 0.19,
        unit: '万吨'
      },
      {
        name: '油料',
        value: 0.21,
        unit: '万吨'
      }
    ]
  },
  {
    name: '2015年',
    data: [
      {
        name: '水稻',
        value: 1.77,
        unit: '万吨'
      },
      {
        name: '玉米',
        value: 8.6,
        unit: '万吨'
      },
      {
        name: '大豆',
        value: 0.14,
        unit: '万吨'
      },
      {
        name: '高梁',
        value: 0.23,
        unit: '万吨'
      },
      {
        name: '马铃薯',
        value: 0.12,
        unit: '万吨'
      },
      {
        name: '油料',
        value: 0.25,
        unit: '万吨'
      }
    ]
  },
  {
    name: '2016年',
    data: [
      {
        name: '水稻',
        value: 1.84,
        unit: '万吨'
      },
      {
        name: '玉米',
        value: 9,
        unit: '万吨'
      },
      {
        name: '大豆',
        value: 0.15,
        unit: '万吨'
      },
      {
        name: '高梁',
        value: 0.24,
        unit: '万吨'
      },
      {
        name: '马铃薯',
        value: 0.11,
        unit: '万吨'
      },
      {
        name: '油料',
        value: 0.3,
        unit: '万吨'
      }
    ]
  },
  {
    name: '2017年',
    data: [
      {
        name: '水稻',
        value: 1.88,
        unit: '万吨'
      },
      {
        name: '玉米',
        value: 8.91,
        unit: '万吨'
      },
      {
        name: '大豆',
        value: 0.18,
        unit: '万吨'
      },
      {
        name: '高梁',
        value: 0.23,
        unit: '万吨'
      },
      {
        name: '马铃薯',
        value: 0.12,
        unit: '万吨'
      },
      {
        name: '油料',
        value: 0.35,
        unit: '万吨'
      }
    ]
  },
  {
    name: '2018年',
    data: [
      {
        name: '水稻',
        value: 1.77 ,
        unit: '万吨'
      },
      {
        name: '玉米',
        value: 7.67,
        unit: '万吨'
      },
      {
        name: '大豆',
        value: 0.18,
        unit: '万吨'
      },
      {
        name: '高梁',
        value: 0.21,
        unit: '万吨'
      },
      {
        name: '马铃薯',
        value: 0.1,
        unit: '万吨'
      },
      {
        name: '油料',
        value: 0.24,
        unit: '万吨'
      }
    ]
  }
];

const mapData =  {
  '长春市': {
    data1: [
      {
        industry: '农林牧渔业', // 产业
        addedValue: 359.7, // 增加值
        growth: 2.10 // 同比增长
      },
      {
        industry: '农业', // 产业
        addedValue: 125.5, // 增加值
        growth: 2.1 // 同比增长
      },
      {
        industry: '林业', // 产业
        addedValue: 2.3, // 增加值
        growth: -23 // 同比增长
      },
      {
        industry: '牧业', // 产业
        addedValue: 216.7, // 增加值
        growth: 2.4 // 同比增长
      },
      {
        industry: '渔业', // 产业
        addedValue: 3.6, // 增加值
        growth: 6.9 // 同比增长
      },
    ],
    data2: [
      {
        industry: '粮食', // 产业
        addedValue: 943.1, // 增加值
        growth: 9.1 // 同比增长
      },
      {
        industry: '蔬菜', // 产业
        addedValue: 101.4, // 增加值
        growth: 13.1 // 同比增长
      },
      {
        industry: '玉米', // 产业
        addedValue: 780, // 增加值
        growth: 11.90 // 同比增长
      },
      {
        industry: '水稻', // 产业
        addedValue: 139.9, // 增加值
        growth: -1.6 // 同比增长
      },
      {
        industry: '牛奶', // 产业
        addedValue: 5.8, // 增加值
        growth: 3.7 // 同比增长
      },
          ]
  },
  '吉林市': {
    data1: [
      {
        industry: '农林牧渔业', // 产业
        addedValue: 170.4, // 增加值
        growth: 1.70 // 同比增长
      },
      {
        industry: '农业', // 产业
        addedValue: '/', // 增加值
        growth: '/' // 同比增长
      },
      {
        industry: '林业', // 产业
        addedValue: '/', // 增加值
        growth: '/' // 同比增长
      },
      {
        industry: '牧业', // 产业
        addedValue: '/', // 增加值
        growth: '/' // 同比增长
      },
      {
        industry: '渔业', // 产业
        addedValue: '/', // 增加值
        growth: '/' // 同比增长
      },
    ],
    data2: [
      {
        industry: '粮食', // 产业
        addedValue: 428.8, // 增加值
        growth: 9.9 // 同比增长
      },
      {
        industry: '玉米', // 产业
        addedValue: 318.4, // 增加值
        growth: 12.5 // 同比增长
      },
      {
        industry: '水稻', // 产业
        addedValue: 101.4, // 增加值
        growth: 2.7 // 同比增长
      },
      {
        industry: '大豆', // 产业
        addedValue: 6.4, // 增加值
        growth: 4.9 // 同比增长
      },

      {
        industry: '牛奶', // 产业
        addedValue: 2.2, // 增加值
        growth: -3.1 // 同比增长
      },
    ]
  },
  '四平市': {
    data1: [
      {
        industry: '农林牧渔业', // 产业
        addedValue: 233.6, // 增加值
        growth: 3.2 // 同比增长
      },
      {
        industry: '农业', // 产业
        addedValue: '/', // 增加值
        growth: 5.8 // 同比增长
      },
      {
        industry: '林业', // 产业
        addedValue: '/', // 增加值
        growth: -21 // 同比增长
      },
      {
        industry: '牧业', // 产业
        addedValue: '/', // 增加值
        growth: 2.9 // 同比增长
      },
      {
        industry: '渔业', // 产业
        addedValue: '/', // 增加值
        growth: 0.3 // 同比增长
      },
    ],
    data2: [
      {
        industry: '粮食', // 产业
        addedValue: 718.23, // 增加值
        growth: 4.8 // 同比增长
      },
      {
        industry: '玉米', // 产业
        addedValue: 662.49, // 增加值
        growth: 4.69 // 同比增长
      },
      {
        industry: '水稻', // 产业
        addedValue: 43.79, // 增加值
        growth: 9.04 // 同比增长
      },
      {
        industry: '大豆', // 产业
        addedValue: '/', // 增加值
        growth: 11.53 // 同比增长
      },
      {
        industry: '牛奶', // 产业
        addedValue: '/', // 增加值
        growth: '/' // 同比增长
      },
    ]
  },
  '辽源市': {
    data1: [
      {
        industry: '农林牧渔业', // 产业
        addedValue: 40.98, // 增加值
        growth: 2 // 同比增长
      },
      {
        industry: '农业', // 产业
        addedValue: 18.32, // 增加值
        growth: 4.1 // 同比增长
      },
      {
        industry: '林业', // 产业
        addedValue: 0.51, // 增加值
        growth: 38 // 同比增长
      },
      {
        industry: '牧业', // 产业
        addedValue: 21.03, // 增加值
        growth: 0.7 // 同比增长
      },
      {
        industry: '渔业', // 产业
        addedValue: 0.31, // 增加值
        growth: -7 // 同比增长
      },
    ],
    data2: [
      {
        industry: '粮食', // 产业
        addedValue: 160.11, // 增加值
        growth: 8.5 // 同比增长
      },
      {
        industry: '玉米', // 产业
        addedValue: 144.34, // 增加值
        growth: 9.8 // 同比增长
      },
      {
        industry: '水稻', // 产业
        addedValue: 13.58, // 增加值
        growth: -7.5 // 同比增长
      },
      {
        industry: '牛奶', // 产业
        addedValue: 0.34, // 增加值
        growth: 20.8 // 同比增长
      },
      {
        industry: '禽蛋', // 产业
        addedValue: 8.99, // 增加值
        growth: 13.8 // 同比增长
      },
    ]
  },
  '通化市': {
    data1: [
      {
        industry: '农林牧渔业', // 产业
        addedValue: 141.6, // 增加值
        growth: 4.9 // 同比增长
      },
      {
        industry: '农业', // 产业
        addedValue: '/', // 增加值
        growth: '/' // 同比增长
      },
      {
        industry: '林业', // 产业
        addedValue: '/', // 增加值
        growth: '/' // 同比增长
      },
      {
        industry: '牧业', // 产业
        addedValue: 54.2, // 增加值
        growth: 15.1 // 同比增长
      },
      {
        industry: '渔业', // 产业
        addedValue: '/', // 增加值
        growth: '/' // 同比增长
      }
    ],
    data2: [
      {
        industry: '粮食', // 产业
        addedValue: 204.04, // 增加值
        growth: 7.2 // 同比增长
      },
      {
        industry: '蔬菜', // 产业
        addedValue: 34.14, // 增加值
        growth: -8.1 // 同比增长
      },
      {
        industry: '玉米', // 产业
        addedValue: 138.87, // 增加值
        growth: '/' // 同比增长
      },
      {
        industry: '牛奶', // 产业
        addedValue: 0.69, // 增加值
        growth: -1.7 // 同比增长
      },
      {
        industry: '禽蛋', // 产业
        addedValue: 4.13, // 增加值
        growth: 70.7 // 同比增长
      },
    ]
  },
  '白山市': {
    data1: [
      {
        industry: '农林牧渔业', // 产业
        addedValue: 56.15, // 增加值
        growth: 3 // 同比增长
      },
      {
        industry: '农业', // 产业
        addedValue: '/', // 增加值
        growth: '/' // 同比增长
      },
      {
        industry: '林业', // 产业
        addedValue: '/', // 增加值
        growth: '/' // 同比增长
      },
      {
        industry: '牧业', // 产业
        addedValue: '/', // 增加值
        growth: '/' // 同比增长
      },
      {
        industry: '渔业', // 产业
        addedValue: '/', // 增加值
        growth: '/' // 同比增长
      },
    ],
    data2: [
      {
        industry: '粮食', // 产业
        addedValue: 31.38, // 增加值
        growth: 15.5 // 同比增长
      },
      {
        industry: '玉米', // 产业
        addedValue: 25, // 增加值
        growth: 11.3 // 同比增长
      },
      {
        industry: '水稻', // 产业
        addedValue: 0.51, // 增加值
        growth: -2.9 // 同比增长
      },
      {
        industry: '牛奶', // 产业
        addedValue: 0.1, // 增加值
        growth: -16.8 // 同比增长
      },
      {
        industry: '禽蛋', // 产业
        addedValue: 1.1, // 增加值
        growth: 14.7 // 同比增长
      },
    ]
  },
  '白城市': {
    data1: [
      {
        industry: '农林牧渔业', // 产业
        addedValue: 129.11, // 增加值
        growth: 2.7 // 同比增长
      },
      {
        industry: '农业', // 产业
        addedValue: 80.77, // 增加值
        growth: 1.7 // 同比增长
      },
      {
        industry: '林业', // 产业
        addedValue: 4.34, // 增加值
        growth: 0.9 // 同比增长
      },
      {
        industry: '牧业', // 产业
        addedValue: 33.79, // 增加值
        growth: 6.8 // 同比增长
      },
      {
        industry: '渔业', // 产业
        addedValue: 5.28, // 增加值
        growth: 5.4 // 同比增长
      },
    ],
    data2: [
      {
        industry: '粮食', // 产业
        addedValue: 504.5, // 增加值
        growth: 5.3 // 同比增长
      },
      {
        industry: '玉米', // 产业
        addedValue: 284.32, // 增加值
        growth: 12.1 // 同比增长
      },
      {
        industry: '水稻', // 产业
        addedValue: 157.42, // 增加值
        growth: 3.9 // 同比增长
      },
      {
        industry: '牛奶', // 产业
        addedValue: 22.66, // 增加值
        growth: 8.42 // 同比增长
      },
      {
        industry: '禽蛋', // 产业
        addedValue: 2.92, // 增加值
        growth: -18.2 // 同比增长
      },
    ]
  },
  '延边朝鲜族自治州': {
    data1: [
      {
        industry: '农林牧渔业', // 产业
        addedValue: 54.81, // 增加值
        growth: 2.9 // 同比增长
      },
      {
        industry: '农业', // 产业
        addedValue: '/', // 增加值
        growth: '/' // 同比增长
      },
      {
        industry: '林业', // 产业
        addedValue: '/', // 增加值
        growth: '/' // 同比增长
      },
      {
        industry: '牧业', // 产业
        addedValue: '/', // 增加值
        growth: '/' // 同比增长
      },
      {
        industry: '渔业', // 产业
        addedValue: '/', // 增加值
        growth: '/' // 同比增长
      },
    ],
    data2: [
      {
        industry: '粮食', // 产业
        addedValue: 168.54, // 增加值
        growth: 14.5 // 同比增长
      },
      {
        industry: '玉米', // 产业
        addedValue: 116.32, // 增加值
        growth: 10.7 // 同比增长
      },
      {
        industry: '稻谷', // 产业
        addedValue: 24.09, // 增加值
        growth: 9.9 // 同比增长
      },
      {
        industry: '大豆', // 产业
        addedValue: 27.25, // 增加值
        growth: 42.3 // 同比增长
      },
      {
        industry: '牛奶', // 产业
        addedValue: 0.16, // 增加值
        growth: -9.1 // 同比增长
      },
    ]
  },
  '松原市': {
    data1: [
      {
        industry: '农林牧渔业', // 产业
        addedValue: 199.05, // 增加值
        growth: 3.2 // 同比增长
      },
      {
        industry: '农业', // 产业
        addedValue: '/', // 增加值
        growth: '/' // 同比增长
      },
      {
        industry: '林业', // 产业
        addedValue: '/', // 增加值
        growth: '/' // 同比增长
      },
      {
        industry: '牧业', // 产业
        addedValue: '/', // 增加值
        growth: '/' // 同比增长
      },
      {
        industry: '渔业', // 产业
        addedValue: '/', // 增加值
        growth: '/' // 同比增长
      },
    ],
    data2: [
      {
        industry: '粮食', // 产业
        addedValue: 719.24, // 增加值
        growth: 2.5 // 同比增长
      },
      {
        industry: '玉米', // 产业
        addedValue: 575.53, // 增加值
        growth: 3.8 // 同比增长
      },
      {
        industry: '水稻', // 产业
        addedValue: 115.31, // 增加值
        growth: 6 // 同比增长
      },
      {
        industry: '牛奶', // 产业
        addedValue: 4.47, // 增加值
        growth: -7 // 同比增长
      },
      {
        industry: '禽蛋', // 产业
        addedValue: 12.11, // 增加值
        growth: 22.6 // 同比增长
      },
    ]
  }
};

const cityList = [
  {
    name: '长春市',
    selected: true,
    value: 1,
    start: 1,
    end: 1,
    label: '长春市',
    color: '#008BDC'
  },
  {
    name: '吉林市',
    selected: false,
    value: 2,
    start: 2,
    end: 2,
    label: '吉林市',
    color: '#008BDC'
  },
  {
    name: '四平市',
    selected: false,
    value: 3,
    start: 3,
    end: 3,
    label: '四平市',
    color: '#008BDC'
  },
  {
    name: '辽源市',
    selected: false,
    value: 4,
    start: 4,
    end: 4,
    label: '辽源市',
    color: '#008BDC'
  },
  {
    name: '通化市',
    selected: false,
    value: 5,
    start: 5,
    end: 5,
    label: '通化市',
    color: '#008BDC'
  },
  {
    name: '白山市',
    selected: false,
    value: 6,
    start: 6,
    end: 6,
    label: '白山市',
    color: '#008BDC'
  },
  {
    name: '白城市',
    selected: false,
    value: 7,
    start: 7,
    end: 7,
    label: '白城市',
    color: '#008BDC'
  },
  {
    name: '延边朝鲜族自治州',
    selected: false,
    value: 8,
    start: 8,
    end: 8,
    label: '延边朝鲜族自治州',
    color: '#008BDC'
  },
  {
    name: '松原市',
    selected: false,
    value: 9,
    start: 9,
    end: 9,
    label: '松原市',
    color: '#008BDC'
  }
];

export default {
  production2019,
  tabListOne,
  production20Years,
  aDayInJilin,
  farmProduceData20Years,
  mapData,
  cityList
}
