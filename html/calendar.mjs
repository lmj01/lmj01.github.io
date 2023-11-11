/**
 * 源自https://juejin.cn/post/6941022036919582728
 * 可参数python的zhDate库处理的农历数据
 * https://github.com/CutePandaSh/zhdate/blob/master/zhdate/constants.py
 */

/* 源数据说明：
 *   lunarYear数据来自香港天文台提供的源数据反向推导得出，其中201项数据分别对应1900-2100年。
 *   示例： 2021年 -- 0x06aa0
 *   ╭-------┰-------┰-------┰-------┰--------╮
 *   ┆ 0000  ┆ 0110  ┆ 1010  ┆ 1010  ┆ 0000   ┆
 *   ┠-------╊-------╊-------╊-------╊--------┨
 *   ┆ 20-17 ┆ 16-12 ┆ 12-9  ┆  8-5  ┆  4-1   ┆
 *   ╰-------┸-------┸-------┸-------┸--------╯
 *   1-4: 表示当年有无闰年，有的话，为闰月的月份，没有的话，为0。 2021年无闰月
 *   5-16：为除了闰月外的正常月份是大月还是小月，1为30天，0为29天。从1月到12月对应的是第16位到第5位，2021年各月天数[29,30,30,29,30,29,30,29,30,29,30,29]
 *   17-20： 表示闰月是大月还是小月，仅当存在闰月的情况下有意义。(0/1,即闰大/小月)
 */

const lunarYears = [
    0x04bd8,
    // 1901-2000
    0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,0x04ae0,
    0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,0x04970,
    0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,0x06566,
    0x0d4a0,0x0ea50,0x16a95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,0x0d4a0,
    0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,0x06ca0,
    0x0b550,0x15355,0x04da0,0x0a5b0,0x14573,0x052b0,0x0a9a8,0x0e950,0x06aa0,0x0aea6,
    0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,0x096d0,
    0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b6a0,0x195a6,0x095b0,
    0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,0x04af5,
    0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x05ac0,0x0ab60,0x096d5,0x092e0,0x0c960,
    // 2001-2100
    0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,0x0a950,
    0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,0x07954,
    0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,0x05aa0,
    0x076a3,0x096d0,0x04afb,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,0x0b5a0,
    0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0,0x14b63,
    0x09370,0x049f8,0x04970,0x064b0,0x168a6,0x0ea50,0x06b20,0x1a6c4,0x0aae0,0x092e0,
    0x0d2e3,0x0c960,0x0d557,0x0d4a0,0x0da50,0x05d55,0x056a0,0x0a6d0,0x055d4,0x052d0,
    0x0a9b8,0x0a950,0x0b4a0,0x0b6a6,0x0ad50,0x055a0,0x0aba4,0x0a5b0,0x052b0,0x0b273,
    0x06930,0x07337,0x06aa0,0x0ad50,0x14b55,0x04b60,0x0a570,0x054e4,0x0d160,0x0e968,
    0x0d520,0x0daa0,0x16aa6,0x056d0,0x04ae0,0x0a9d4,0x0a2d0,0x0d150,0x0f252,0x0d520
]

// ['月','正','一','二','三','四','五','六','七','八','九','十','冬','腊'];
const ChinaMonths = ["\u6708","\u6b63","\u4e8c","\u4e09","\u56db","\u4e94","\u516d","\u4e03","\u516b","\u4e5d","\u5341","\u51ac","\u814a"]
// ['日','一','二','三','四','五','六','七','八','九','十']
const ChinaDay = ["\u65e5","\u4e00","\u4e8c","\u4e09","\u56db","\u4e94","\u516d","\u4e03","\u516b","\u4e5d","\u5341"]
// ['初','十','廿','卅','闰']
const ChinaElement = ["\u521d","\u5341","\u5eff","\u5345", "\u95f0"]

// 农历日中文显示，参数日期day
export const toChinaDay = function(day) {
    let str = '';
    switch(day) {
        case 10: 
            str = '\u521d\u5341';break; // "初十"
        case 20:
            str = '\u5eff\u5341';break; // "廿十"
        case 30: 
            str = '\u5345\u5341';break; // "卅十"
        default: 
            str = ChinaElement[Math.floor(day/10)] + ChinaDay[day%10];
    }
    return str
}
// 农历月初一中文月显示（如农历二月初一 -> 二月，农历闰四月初一 ->闰四月）
export const toChinaMonth = function(month, isleap) {
    isleap = isleap || false;
    return isleap ? (ChinaElement[4] + ChinaMonths[month] + ChinaMonths[0]) : (ChinaMonths[month] + ChinaMonths[0]);
}

const nowInfo = function() {
    let now = new Date();
    return {
        y: now.getFullYear(),
        m: now.getMonth()+1,
        d: now.getDate()
    };
}
// 某年农历闰月月份
export const leapMonth = function(year) {
    year = year || nowInfo().y;
    return lunarYears[year - 1900] & 0xF;
}
// 某年农历闰月天数
export const leapDays = function(year) {
    year = year || nowInfo().y;
    if(leapMonth(year)) {
        return (lunarYears[year-1900] & 0x10000) ? 30 : 29;
    }
    return 0;
}

// 某年份农历各月天数
export const lunarMonthDays = function(year) {
    year = year || nowInfo().y;
    let lunarYear = lunarYears[year - 1900];
    let monthDays = [];
    for(let i = 4; i< 16; i++) {
        let monthDay = (lunarYear >> i & 0x1) ? 30 :29;
        monthDays.push(monthDay);
    }
    monthDays.reverse();
    // 添加闰月
    let leapM = leapMonth(year);
    if(leapM) monthDays.splice(leapM, 0 , leapDays(year));
    return monthDays;
}
// 某年农历天数
const lunarYearDays = function(year) {
    year = year || nowInfo().y;
    let num = 0;
    lunarMonthDays(year).forEach(item => {
        num += item;
    });
    return num;
}

export const solarToLunar = function(y,m,d) {
    if(y < 1901 || y > 2100) return -1;
    let date;
    if(!y) {
        date = new Date();
    } else {
        date = new Date(y,m-1,d);
    }

    // 参照日期 1901-02-19 正月初一
    let offset = (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(1901,1,19))/86400000;
    let temp = 0, i;
    for(i = 1901; i < 2101 && offset > 0; i++ ){
        temp = lunarYearDays(i);
        offset -= temp;
    }
    if(offset < 0) {
        offset += temp;
        i--;
    }

    // 农历年、月、日
    let isLeap = false, j;
    let monthDays = lunarMonthDays(i);
    let leapM = leapMonth(i);

    if(offset > 0) {
        for(j = 0; j < monthDays.length && offset > 0; j++) {
            temp = monthDays[j];
            offset -=temp;
        }
        if(offset == 0) {
            j++;
        }
        if(offset < 0) {
            offset += temp;
        }
    } else {
        // 补偿公历1901年2月的农历信息
        if(offset == -23) {
            return {
                lunarY: i,
                lunarM: 12,
                lunarD: 8,
                isLeap: false
            }
        }
    }

    // 矫正闰年月
    if(leapM) {
        if(j == leapM + 1) {
            isLeap = true
        }
        if(j >= leapM + 1) {
            j--
        }
    }

    return {
        lunarY: i,
        lunarM: j,
        lunarD: ++offset,
        isLeap: isLeap
    }
}

// 公历月表推算表中各农历日
const solarToLunarMonthTable = function(firstDay, days) {
    let firstMoonDay = solarToLunar(firstDay.years, firstDay.months + 1, firstDay.date);
    let curY = firstMoonDay.lunarY,
      curM = firstMoonDay.lunarM,
      curD = firstMoonDay.lunarD,
      leap = firstMoonDay.isLeap;
  
    // 判断当前是否为闰年闰月
    let leap_m = leapMonth(curY);
    let isleap = false;
    if(leap_m === curM) {
      isleap = true;
    }
  
    // 获取当前年份各农历月天数, 首先获取当前月在当前农历年份中的天数
    let moonMonthDays = lunarMonthDays(curY);
    let moonMonthTotal;
    if(moonMonthDays.length === 12 || (moonMonthDays.length > 12 && curM < leap_m) || (moonMonthDays.length > 12 && curM === leap_m && !leap)) {
      moonMonthTotal = moonMonthDays[curM - 1];
    } else {
      moonMonthTotal = moonMonthDays[curM];
    }
  
    for(let i = 0, len = days.length; i < len; i++) {
      if(moonMonthTotal < curD) {
        if(!isleap || leap) {
          curM++;
        }
        curD = 1;
        if(curM > 12) {
          curY++;
          curM = 1;
          curD = 1;
          moonMonthTotal = lunarMonthDays(curY)[0];
        }
        if(isleap) leap = !leap;
      }
  
      days[i].lunarY = curY;
      days[i].lunarM = curM;
      days[i].lunarD = curD === 1 ? toChinaMonth(curM, leap) : toChinaDay(curD);
      days[i].isLeap = leap;
      curD++;
    }
    return days;
}
  
