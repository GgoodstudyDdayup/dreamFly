// pages/template/yinyuejieDetails/introduce/introduce.js
var WxParse = require('../../wxParse/wxParse.js');
const app =  getApp();
Page({
    data: {
        openclass: 'wr-bottom', //展开更多
        tapindex: null, //选项卡切换
        ticket: {}, //票的信息
        // yedianDetails: ''
        id: 28
    },
    getYedianDetails: function () {
      console.log(this.data.id);
      wx.request({
        url: app.globalData.host + '/index/index/yeidandetail',
        method: 'post',
        data: {
          id: this.data.id,
          user_id: app.globalData.userInfo2.user_id
        },
        success: res => {
          console.log(res)
          this.setData({
            yedianDetails: res
          })
          var article = res.data.content
          console.log(res)
          console.log(article)
          WxParse.wxParse('article', 'html', article, this, 5)
          // console.log(this.data.goodsDetails)
        }
      })
    },
    onLoad: function (options) {
      this.setData({
        id: options.id 
      })
      this.getYedianDetails()
    }
})