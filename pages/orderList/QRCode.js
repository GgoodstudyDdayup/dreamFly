// pages/personalCenter/myOrder/QRCode.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "泰国芭提雅gogogo~",
    pic: "/pages/images/lijifabu.png",
    time: '2018-18-18',
    qrcode: '/pages/images/dreamfly.png',
    order_num: '123456789'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    console.log('options:', options);
    wx.request({
      url: app.globalData.host + '/index/shop/ordercode',
      data: {
        order_id: options.order_id,
        page: `pages/verify/verify`,
      },
      success(res) {
        console.log('二维码:', res);
        that.setData({
          qrcode: res.data.url,
          time: res.data.time + "-"+res.data.endtime,
          order_num: res.data.order_sn,
          pic: res.data.img,
          title: res.data.name
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