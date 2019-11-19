// pages/personalCenter/myOrder/myOrder.js
var app = getApp();
var time = require('../../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    show_mask: false,
    qr_code:"",
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
    show: 0
  },
  hide_mask() {
    console.log('隐藏:');
    this.setData({
      show_mask: false
    })
  },
  see_QRcode(e) {
    let that = this;
    console.log('e:', e);
    let order_id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: 'QRCode?order_id=' + order_id,
    })

  },
  download_QRcode(url) {
    //下载图片
    wx.downloadFile({
      url,
      success(res) {
        if (res.statusCode === 200) {
          res.tempFilePath
          //保存到相册
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success(r) {
              wx.showToast({
                title: '保存成功',
                icon: 'success'
              })
            },
            fail() {
              wx.showToast({
                title: '保存失败',
                icon: 'fail'
              })
            }
          })
        }
      }
    })
  },
  toQuanbu: function() {
    // wx.redirectTo({
    //     url: '../myOrder/myOrder'
    // })
    // wx.navigateTo({
    //   url: '../myOrder/myOrder',
    // })
    let that = this;
    that.setData({
      show: 0
    })
  },
  toDaifukuan: function() {
    // wx.redirectTo({
    //     url: '../daifukuan/daifukuan'
    // })
    // wx.navigateTo({
    //   url: '../daifukuan/daifukuan'
    // })
    let that = this;
    that.setData({
      show: 1
    })
  },
  toYifukuan: function() {
    // wx.redirectTo({
    //     url: '../yifukuan/myOrder'
    // })
    // wx.navigateTo({
    //   url: '../yifukuan/myOrder'
    // })
    let that = this;
    that.setData({
      show: 2
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options){
    let that = this;
    if (options.show == '1') {
      that.setData({
        show: 1
      })
    }
  },
  onShow: function(options) {
    let that = this;
    // 请求全部订单
    wx.request({
      url: app.globalData.host + '/index/user/GetUserOrder',
      data: {
        user_id: app.globalData.user_id,
        is_pay: "all"
        // page: 1,
        // pagelimit:10   请求多少条
      },
      success: (res) => {
        var orderData = res.data[0];
        for (var i = 0; i < orderData.length; i++) {
          orderData[i].thumb_path = app.globalData.host + orderData[i].thumb_path;
          orderData[i].add_time = time.formatTime(orderData[i].add_time, 'Y-M-D');
          if (orderData[i].music_id == 1) {
            orderData[i].thumb_path = "/pages/images/viporder.png"
            orderData[i].name = "VIP"
          };
          orderData[i].c_sum = (orderData[i].money * orderData[i].number).toFixed(2)
        }
        this.setData({
          order: orderData
        })
        console.log(this.data.order)
      }
    })
    // 请求待付款
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
          orderData[i].c_sum = (orderData[i].money * orderData[i].number).toFixed(2)
        }
        this.setData({
          order1: orderData
        })
        console.log(this.data.order)
      }
    })
    //请求有效单
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
          orderData[i].c_sum = (orderData[i].money * orderData[i].number).toFixed(2)
        }
        this.setData({
          order2: orderData
        })
      }
    })
  },
  // 订单支付
  buy: function(e) {
    let that = this;
    var index = e.currentTarget.dataset.index;
    let pay = new Promise((resolve, reject) => {
      wx.request({
        url: app.globalData.host + '/apppic/pay/wechat_app_pay2',
        data: {
          oid: e.currentTarget.id,
          openid: app.globalData.openid
        },
        success: function(res) {
          resolve(res.data.data)
          console.log('吊起微信支付data:', res.data.data);
        }
      })
    })
    let pay2 = pay.then((data) => {
      return new Promise((resolve, reject) => {
        console.log('微信支付data:', data);
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
          var orderIndex = "order[" + index + "].is_pay"
          this.setData({
            [orderIndex]: 1
          })
          wx.showToast({
            title: '购买成功~',
          })
          that.onShow()
        }
      })
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
                //请求有效单
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
                      orderData[i].c_sum = (orderData[i].money * orderData[i].number).toFixed(2)
                    }
                    this.setData({
                      order2: orderData
                    })
                  }
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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


