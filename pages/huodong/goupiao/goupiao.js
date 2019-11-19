// pages/hudong/goupiao/goupiao.js
var app = getApp();
var utils = require('../../../utils/util.js');
import WxValidate from '../../../utils/WxValidate.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    yinyuejie: {},
    // 获取用户实例
    address: '',
    userName: '',
    userPhone: '',
    userWx: '',
    ticket_id: '',
    passW: '',
    // 票价
    total: "",
    // 单价票价
    piaojia: '',
    ticketname: '', //票的类型
    num: 1, // input默认是1 
    // 使用data数据对象设置样式名  
    minusStatus: 'disabled',
  },
  getUserInfo(e) {
    console.log('eee:', e);
  },
  // 获取手机号
  getPhone(e) {
    let that = this;
    console.log('获取手机号e:', e);
    console.log('globalData:', app.globalData);
    wx.request({
      url: app.globalData.host + '/index/index/GetMusiciPhone',
      data: {
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
        user: app.globalData.user_id,
      },
      success: (res) => {
        console.log('获取手机号:', res);
        if (res.data.code == '1') {
          that.setData({
            userPhone: res.data.data
          })
        } else {
          wx.showModal({
            title: '失败',
            content: '获取手机号错误，请手动填写',
          })
        }
      }
    })
  },
  /* 点击减号 */
  bindMinus: function() {
    var num = this.data.num;
    // 如果大于1时，才可以减  
    if (num > 1) {
      num--;
    }
    var piaojia = this.data.piaojia * num;

    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus,
      total: piaojia.toFixed(2),
    });
  },
  /* 点击加号 */
  bindPlus: function() {
    var num = this.data.num;
    // 不作过多考虑自增1  
    num++;
    var piaojia = this.data.piaojia * num;
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      total: piaojia.toFixed(2),
      minusStatus: minusStatus
    });
  },
  /* 输入框事件 */
  bindManual: function(e) {
    var num = e.detail.value;
    // 将数值与状态写回  
    this.setData({
      num: num
    });
  },
  //输入用户名
  userNameInput: function(e) {
    this.setData({
      userName: e.detail.value
    })
  },
  userNamePhone: function(e) {
    this.setData({
      userPhone: e.detail.value
    })
  },
  userNameAdress: function(e) {
    this.setData({
      address: e.detail.value
    })
  },
  userNameWx: function(e) {
    this.setData({
      userWx: e.detail.value
    })
    console.log(this.data.userWx)
  },
  // 跳转到待支付页面
  toDaizhifu: function() {
    // wx.redirectTo({
    //   url: '/pages/personalCenter/daifukuan/daifukuan',
    // })
    wx.redirectTo({
      url: '/pages/personalCenter/myOrder/myOrder?show=1',
    })
  },
  pay: function() {
    // 表单验证
    var data = this.data;
    if (data.userName == "" || data.userPhone == '' || data.userWx == '') {
      wx.showToast({
        title: '内容不能为空',
        icon: 'none',
        duration: 1000,
        mask: true
      });
      return false
    } else if (data.userPhone != Number && data.userPhone.length != 11) {
      wx.showToast({
        title: '手机号错误',
        icon: 'none',
        duration: 1000,
        mask: true
      });
      return false
    };
    wx.request({
      url: app.globalData.host + '/index/shop/SetOrder',
      data: {
        ticket_id: this.data.ticket_id,
        number: this.data.num,
        money: this.data.piaojia,
        link_name: this.data.userName,
        link_tel: this.data.userPhone,
        link_addressed: this.data.address,
        link_wechat: this.data.userWx,
        music_id: this.data.music_id,
        user_id: app.globalData.user_id
      },
      success: (res) => {
        if(res.data.order_id=='0'){
          wx.showModal({
            title: '温馨提示',
            content: res.data.status,
          })
          return 0;
        }
        wx.showToast({
          title: '下单成功',
          icon: 'success',
          duration: 1000,
          success: () => {
            // 跳转到待支付页面
            this.toDaizhifu()
          },
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 接收传来的票价     
    console.log(options)
    this.setData({
      total: options.piaojia,
      piaojia: options.piaojia,
      ticket_id: options.ticket_id,
      ticketname: options.ticketname,
      music_id: options.music_id
    })
    // 获取音乐节详情信息
    wx.request({
      url: app.globalData.host + '/index/index/GetMusicInfo',
      data: {
        music_id: options.music_id,
        user_id: app.globalData.user_id
      },
      success: (res) => {
        // 拼接图片地址
        res.data.thumb_path = app.globalData.host + res.data.thumb_path;
        res.data.starTime = utils.formatTime(res.data.time, 'Y年M月D日');
        res.data.endTime = utils.formatTime(res.data.end_time, 'Y年M月D日');
        this.setData({
          details: res.data,
        })
        console.log(this.data.details)
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