// pages/shopping-mall/wangqi-choujiang/wangqi-choujiang.js
const app = getApp()
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[],
  },

  // 抽奖页
  xianshi: function(){
    wx.navigateTo({
      url: '../../prizeTime/prizeTime',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: app.globalData.host + '/index/shop/yikaijiang',
      success: (res) => {
        for (var i = 0; i < res.data.length; i++) {
          res.data[i].thumb_path = app.globalData.host + res.data[i].thumb_path;// 拼接地址
          // res.data[i].time1 = util.formatTime(res.data[i].add_time, 'Y-M-D');
          res.data[i].time2 = util.formatTime(res.data[i].kai_time, 'Y-M-D');
        }
        this.setData({
          dataList:res.data
        })
        console.log(this.data.dataList)

      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})