var app = getApp();
// 时间戳转换
function formatTime(number, format) {
  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];

  var date = new Date(number * 1000);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
 // 导航栏跳转
const  gotoCompanyIndex= function () {
    wx.navigateTo({
      url: '../shopping-mall/shopping-mall'
    })
  }
const  gotobusinessCard= function () {
    wx.navigateTo({
      url: '../information/information'
    })
  }
const  gotopublish= function () {
    wx.navigateTo({
      url: '../index/index'
    })
  }
const  gotoMessages= function () {
    wx.navigateTo({
      url: '../Interaction/Interaction'
    })
  }
const  bindViewMy= function () {
    wx.navigateTo({
      url: '../personalCenter/personalCenter'
    })
  }
const cutString=function(str){
  var data = str.substring(0,str.length - 4).slice(3);
  return data
}
const getPath=function(){
  var pages = getCurrentPages() //获取加载的页面
  var currentPage = pages[pages.length - 1] //获取当前页面的对象
  var url = currentPage.route //当前页面url
  return url
}

module.exports = {
  formatTime: formatTime,
  formatNumber: formatNumber,
  gotoCompanyIndex: gotoCompanyIndex,
  gotobusinessCard: gotobusinessCard,
  gotopublish: gotopublish,
  gotoMessages: gotoMessages,
  bindViewMy: bindViewMy,
  cutString:cutString,
  getPath:getPath,
  
}
