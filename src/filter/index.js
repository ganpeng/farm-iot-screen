import _ from 'lodash';
export function borderColor() {
  return ['#1F4071', '#417FC8'];
}

export function toFixed2(value) {
  return _.isNumber(value) ? value.toFixed(2) : '';
}

export function justToFixed2(value) {
  return _.isNumber(value) ? value.toFixed(2) : '';
}

export function formatDate(timestamp, format) {
  if (!timestamp) {
    return '';
  }
  let date = new Date(timestamp);

  if (format) {
    // handle yyyy
    format = format.replace(/yyyy/g, date.getFullYear());
  }
  if (format) {
    // handle MM
    format = format.replace(/MM/g, _.padStart(date.getMonth() + 1, 2, '0'));
  }
  if (format) {
    // handle DD
    format = format.replace(/DD/g, _.padStart(date.getDate(), 2, '0'));
  }
  if (format) {
    // handle HH
    format = format.replace(/HH/g, _.padStart(date.getHours(), 2, '0'));
  }
  if (format) {
    // handle mm
    format = format.replace(/mm/g, _.padStart(date.getMinutes(), 2, '0'));
  }
  if (format) {
    // handle SS
    format = format.replace(/SS/g, _.padStart(date.getSeconds(), 2, '0'));
  }

  return format;
}

export function unitConvert(num, prop) {
  var moneyUnits = ["元", "万元", "亿元", "万亿"]
  var dividend = 10000;
  var curentNum = num;
  //转换数字
  var curentUnit = moneyUnits[0];
  //转换单位
  for (var i = 0; i <4; i++) {
      curentUnit = moneyUnits[i]
      if(strNumSize(curentNum)<5){
          break;
      }
      curentNum = curentNum / dividend
  }
  var m = {num: 0, unit: ""}
  m.num = curentNum.toFixed(2)
  m.unit = curentUnit;
  return _.get(m, prop) || '';
}

function strNumSize(tempNum){
  if (tempNum !== null && tempNum !== undefined) {
    var stringNum = tempNum.toString()
    var index = stringNum.indexOf(".")
    var newNum = stringNum;
    if(index!=-1){
        newNum = stringNum.substring(0,index)
    }
    return newNum.length;
  }
}

export function padZero(index) {
  if (index > 0 && index < 10) {
    return `0${index}`;
  } else {
    return index;
  }
}
