/* eslint-disable */
function dateFormat(fmt, date) {
  let ret;
  const opt = {
    "Y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "H+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "S+": date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")));
    }
  }
  return fmt;
}

export function strNumSize(tempNum) {
  let stringNum = tempNum.toString();
  let index = stringNum.indexOf(".");
  let newNum = stringNum;
  if (index != -1) {
    newNum = stringNum.substring(0, index);
  }
  return newNum.length;
}

export function unitConvert(num) {
  let moneyUnits = ["元", "万元", "亿元", "万亿"];
  let dividend = 10000;
  let curentNum = num;
  //转换数字
  let curentUnit = moneyUnits[0];
  //转换单位
  for (let i = 0; i < 4; i++) {
    curentUnit = moneyUnits[i];
    if (strNumSize(curentNum) < 5) {
      break;
    }
    curentNum = curentNum / dividend;
  }
  let m = {
    num: 0,
    unit: ""
  };
  m.num = curentNum.toFixed(2);
  m.unit = curentUnit;
  return m;
}

function getDate(AddDayCount, type) {
  let dd = new Date();
  dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
  var y = dd.getFullYear();
  var m = dd.getMonth() + 1; //获取当前月份的日期
  var d = dd.getDate();
  m = m <= 9 ? "0" + m : m;
  d = d <= 9 ? "0" + d : d;
  if (type === 1) {
    return m + "/" + d;
  } else {
    return y + "-" + m + "-" + d;
  }
}

function getDaysNearByToday(day, type) {
  let dateList = [];
  for (let i = 0; i < (day || 7); i++) {
    dateList.push(getDate(0 - i, type));
  }
  return dateList;
}

function get24HoursByToday() {
  let dateList = [];
  for (let i = 0; i < 12; i++) {
    let date = "";
    if (i * 2 < 9) {
      date += "0" + i * 2 + ":00";
    } else {
      date += "" + i * 2 + ":00";
    }
    dateList.push(date);
  }
  return dateList;
}

function currentYear() {
  return new Date().getFullYear();
}

function currentMonth() {
  return new Date().getMonth() + 1;
}

// 存储localStorage
export const setLocal = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// 得到localStorage
export const getLocal = (key) => {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null;
};

// 删除localStorage
export const delLocal = (key) => {
  localStorage.removeItem(key);
};

// 清空localStorage
export const clearLocal = () => {
  localStorage.clear();
};

function getWindDirection(value) {
  let direction = '';
  if(value > 22.5 && value <= 67.5) {
    direction = '东北风';
  } else if(value > 67.5 && value <= 112.5 ) {
    direction = '东风';
  } else if(value > 112.5 && value <= 157.5 ) {
    direction = '东南风';
  } else if(value > 157.5 && value <= 202.5 ) {
    direction = '南风';
  } else if(value > 202.5 && value <= 247.5 ) {
    direction = '西南风';
  } else if(value > 247.5 && value <= 292.5 ) {
    direction = '西风';
  } else if(value > 292.5 && value <= 337.5 ) {
    direction = '西北风';
  } else if((value > 337.5 && value <= 360) || (value > 0 && value <= 22.5)) {
    direction = '北风';
  }
  return direction;
}

function deal(num) {
  return Math.round(num *100) / 100;
}

export default {
  ringChartDefaultConfig: {
    color: ['#FFDF12', '#4DFBFF', '#059eff', '#9258E6', '#ECC94C'],
    digitalFlopStyle: {
      fontSize: 16
    },
    radius: '70%',
    activeRadius: '80%',
    lineWidth: 16,
    // showOriginValue: true,
    data: []
  },
  get12MonthNearBy() {
    let dataArr = [];
    let data = new Date();
    data.setMonth(data.getMonth()+1, 1) //获取到当前月份,设置月份
    for (let i = 0; i < 12; i++) {
      data.setMonth(data.getMonth() - 1); //每次循环一次 月份值减1
      let m = data.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      dataArr.push(data.getFullYear() + "-" + (m));
    }
    return dataArr;
  },
  unitConvert,
  dateFormat,
  getDaysNearByToday,
  get24HoursByToday,
  currentYear,
  currentMonth,
  getWindDirection,
  deal,
  store: {
    setLocal,
    getLocal,
    delLocal,
    clearLocal
  }
};