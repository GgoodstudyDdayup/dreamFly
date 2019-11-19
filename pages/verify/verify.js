// pages/verify/verify.js
var psw;
var app = getApp();
var order_id;
var order_sn = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_verify: false,
    show_input: true,
    show_result: true,
    music_data: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function(options) {
    let that = this;
    order_id = options.scene
    wx.request({
      url: app.globalData.host + '/index/shop/orderdetails',
      data: {
        order_id: options.scene,
      },
      success(res) {
        if (res.data.status == '0') {
          that.setData({
            show_result: false
          })
          wx.showModal({
            title: '出错',
            content: '获取订单信息失败，请手动输入订单号进行验证',
          })
          return 0;
        }
        console.log('订单:', res);
        that.setData({
          music_data: res.data.data
        })
      }
    })

  },
  getpsw(e) {
    psw = e.detail
    // console.log('e:', psw);
  },
  get_order_sn(e) {
    order_sn = e.detail
    // console.log('e:', psw);
  },
  login() {
    let that = this;
    wx.request({
      url: app.globalData.host + '/index/shop/checkpassword',
      data: {
        password: psw,
      },
      success(res) {
        console.log('验证密码:', res);
        if (res.data.status == '1') {
          wx.setStorageSync('is_admin', true)
          that.setData({
            show_verify: true,
            show_input: false,
          })
        } else {
          wx.showToast({
            title: '密码错误~',
            icon: 'loading'
          })
        }
      }
    })
  },
  checkorder() {
    wx.request({
      url: app.globalData.host + '/index/shop/checkorder',
      data: {
        order_id: (order_sn.length>1?'':order_id),
        order_sn
      },
      success(res) {
        console.log('核销:', res);
        if (res.data.status == '0') {
          wx.showModal({
            title: '核销失败',
            content: res.data.message,
          })
        } else {
          wx.showToast({
            title: '核销成功~',
            icon: "success"
          })
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
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let that = this;
    if (wx.getStorageSync('is_admin')) {
      that.setData({
        show_verify: true,
        show_input: false,
      })
    }
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