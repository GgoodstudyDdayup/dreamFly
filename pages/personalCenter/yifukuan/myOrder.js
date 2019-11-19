// pages/personalCenter/myOrder/myOrder.js
var app = getApp();
var time = require('../../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    order: [],
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
  // 跳转到订单详情页
  toDetails: function(e) {
    var dataset = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/personalCenter/yifukuan/xiangqing/xiangqing?fengmian=' + dataset.fengmian + '&time=' + dataset.time,
    })
  },
  //退款
  tuikuan(e) {
    var index = e.currentTarget.dataset.index
    wx.showModal({
      title: '提示',
      content: '确定要退款吗？',
      success: (sm) => {
        if (sm.confirm) {
          wx.request({
            url: app.globalData.host + '/index/shop/SetOrderTui',
            data: {
              order_id: e.currentTarget.dataset.id
            },
            success: (res) => {
              if (res.data.code == 1) {
                var dataIndex = 'order[' + index + '].is_pay'
                this.setData({
                  [dataIndex]: -2
                })
                wx.showToast({
                  title: '申请退款成功'
                })
              }
            }
          })
        } else if (sm.cancel) {
          console.log('用户点击取消')
        }
      }
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
        is_pay: 2
      },
      success: (res) => {
        var orderData = res.data[0];
        for (var i = 0; i < orderData.length; i++) {
          orderData[i].thumb_path = app.globalData.host + orderData[i].thumb_path;
          orderData[i].pay_time = time.formatTime(orderData[i].pay_time, 'Y-M-D');
          if (orderData[i].music_id == 1) {
            orderData[i].thumb_path = "/pages/images/viporder.png"
            orderData[i].name = "VIP"
          };
        }
        this.setData({
          order: orderData
        })

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