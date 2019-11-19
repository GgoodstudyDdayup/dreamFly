// pages/personalCenter/myOrder/myOrder.js
var app = getApp();
var time = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav: [{
        title: "全部",
        methods: "toQuanbu"
      },
      {
        title: "待付款",
        methods: "toDaifukuan"
      },
      {
        title: "有效单",
        methods: "toYifukuan"
      }
    ],
    order: [],
  },
  toQuanbu: function() {
    // wx.redirectTo({
    //     url: '../myOrder/myOrder'
    // })
    wx.navigateTo({
      url: '../myOrder/myOrder',
    })
  },
  toDaifukuan: function() {
    // wx.redirectTo({
    //     url: '../daifukuan/daifukuan'
    // })
    wx.navigateTo({
      url: '../daifukuan/daifukuan'
    })
  },
  toYifukuan: function() {
    // wx.redirectTo({
    //     url: '../yifukuan/myOrder'
    // })
    wx.navigateTo({
      url: '../yifukuan/myOrder'
    })
  },
  // 订单支付
  buy: function(e) {

    let pay = new Promise((resolve, reject) => {
      wx.request({
        url: app.globalData.host + '/apppic/pay/wechat_app_pay2',
        data: {
          oid: e.currentTarget.id,
          openid: app.globalData.openid
        },
        success: function(res) {
          resolve(res.data.data)
        }
      })
    })
    let pay2 = pay.then((data) => {
      return new Promise((resolve, reject) => {
        // console.log('吊起微信支付data:', data);
        if (data.return_code == 'error') {
          wx.showModal({
            title: '支付出错',
            content: data.return_message.return_msg,
          })
        } else {
          wx.requestPayment({
            'timeStamp': data.timeStamp.toString(),
            'nonceStr': data.nonceStr,
            'package': data.package,
            'signType': data.signType,
            'paySign': data.paySign,
            'success': function(res) {
              console.log('支付成功：', res);
              resolve(data.package)
            },
            'fail': function(res) {
              wx.showToast({
                title: '用户取消支付',
              })
              console.log('支付取消：', res);
            }
          })
        }
      })
    })
    let pay3 = pay2.then((res) => {
      wx.request({
        url: app.globalData.host + '/apppic/pay/notify',
        data: {
          orderid: e.currentTarget.id,
          formid: res,
          openid: app.globalData.openid
        },
        success: res => {
          wx.showToast({
            title: '购买成功~',
          })
          setTimeout(() => {
            wx.redirectTo({
              url: '/pages/personalCenter/yifukuan/myOrder',
            })
          }, 1000)
        }
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.request({
      url: app.globalData.host + '/index/user/GetUserOrder',
      data: {
        user_id: app.globalData.user_id,
        is_pay: 0,
        page: 1,
        // pagelimit:10
      },
      success: (res) => {
        var orderData = res.data[0];
        for (var i = 0; i < orderData.length; i++) {
          orderData[i].thumb_path = app.globalData.host + orderData[i].thumb_path;
          orderData[i].time1 = time.formatTime(orderData[i].add_time, 'Y-M-D');
          if (orderData[i].music_id == 1) {
            orderData[i].thumb_path = "/pages/images/viporder.png"
            orderData[i].name = "VIP"
            orderData[i].c_sum = (orderData[i].number * orderData[i].money).toFixed(2)
          };
        }
        this.setData({
          order: orderData
        })
        console.log(this.data.order)
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