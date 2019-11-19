// pages/details/details.js
var app=getApp();
var utils = require('../../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 详情
    details:{},
    pinglunList:[]
  },
  toPinglun:function(e){
    console.log(e)
    wx.navigateTo({
      url: "/pages/Interaction/pengyouquan/pinglun/pinglun"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
      // 获取详情
      wx.request({
        url: app.globalData.host +'/index/hudong/GetQuanInfo',
        data:{
          // id: options.videoId
          quan_id: app.globalData.quan_id
        },
        success:(res)=>{
          res.data.filepath = app.globalData.host + res.data.filepath;
          res.data.thumbpath = app.globalData.host + res.data.thumbpath;
          res.data.content = utils.cutString(res.data.content);
          this.setData({
            details:res.data
          })
          console.log(this.data.details)
        }
      });
      // 获取评论
      wx.request({
        url: app.globalData.host +'/index/hudong/GetQuanComment',
        data:{
          // id: options.videoId
          quan_id: app.globalData.quan_id,
        },
        success:(res)=>{
          for(var i=0;i<res.data.length;i++){
            res.data[i].time1 = utils.formatTime(res.data[i].add_time, 'Y-M-D');
          }
          this.setData({
            pinglunList:res.data
          })
          console.log(this.data.pinglunList)

        }
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})