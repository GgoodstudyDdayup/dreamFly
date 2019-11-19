// pages/shopping-mall/guize/guize.js
var WxParse = require('../../../wxParse/wxParse.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ctext: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    if (options.is_choujiang == '1') {
      // 获取抽奖信息
      wx.request({
        url: app.globalData.host + '/index/shop/GetKanjiaguize',
        data: {
          event: 'CHOUJIANG'
        },
        success: (res) => {
          that.setData({
            ctext: res.data
          })
          var article = that.data.ctext
          console.log('article:', article);
          WxParse.wxParse('article', 'html', article, this, 5)
          console.log(res)
        }
      })
    } else {
      // 获取砍价信息
      wx.request({
        url: app.globalData.host + '/index/shop/GetKanjiaguize',
        data: {
          event: 'KANJIA'
        },
        success: (res) => {
          that.setData({
            ctext: res.data
          })
          var article = that.data.ctext
          console.log('article:', article);
          WxParse.wxParse('article', 'html', article, this, 5)
          console.log(res)
        }
      })
    }



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
  attached: function() {
    // 富文本解析
    var article = this.data.ctext
    console.log('article:', article);
    WxParse.wxParse('article', 'html', article, this, 5)
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