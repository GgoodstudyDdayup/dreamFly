// pages/Interaction/Interaction.js
const app = getApp()
const util = require("../../utils/util.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    nav: ["动态", "朋友动态", "淘票"],
    // nav: ["动态"],
    tabindex: 0,
    dongtaiList: [], //动态数据
    dongtaiPage: 1, //动态页数
    friendList: [], //朋友圈数据
    friendPage: 1, //动态页数
    taopiaoList: [], //淘票数据
    taopiaoPage: 1, //动态页数

  },
  tabchange: function(e) {
    this.setData({
      tabindex: e.currentTarget.dataset.index
    })
  },
  // 获取动态
  getdontai: function() {
    wx.request({
      url: app.globalData.host + '/index/hudong/GetQuanList',
      data: {
        user_id: app.globalData.user_id,
        page: 1,
        pagelimit: 5
      },
      success: (res) => {
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].logo_path != null) {
            res.data[i].logo_path = app.globalData.host + res.data[i].logo_path
          }
          res.data[i].time1 = util.formatTime(res.data[i].add_time, 'Y-M-D');
          res.data[i].is_guan = false
        }
        this.setData({
          dongtaiList: res.data,
          dongtaiPage: 1
        })
        // 关闭刷新
        wx.stopPullDownRefresh()
      }
    })
  },
  // 加载更多动态
  addDontai: function() {
    wx.request({
      url: app.globalData.host + '/index/hudong/GetQuanList',
      data: {
        user_id: app.globalData.user_id,
        page: this.data.dongtaiPage + 1,
        pagelimit: 5
      },
      success: (res) => {
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].logo_path != null) {
            res.data[i].logo_path = app.globalData.host + res.data[i].logo_path
          }
          res.data[i].time1 = util.formatTime(res.data[i].add_time, 'Y-M-D');
          res.data[i].is_guan = false
        }

        this.setData({
          dongtaiList: this.data.dongtaiList.concat(res.data),
          dongtaiPage: this.data.dongtaiPage + 1
        })
        console.log(this.data.dongtaiPage)
        // 关闭刷新
        wx.stopPullDownRefresh()
      }
    })
  },
  // 获取朋友圈
  getFriend: function() {
    wx.request({
      url: app.globalData.host + '/index/hudong/GetMyFriend',
      data: {
        user_id: app.globalData.user_id,
        page: 1,
        pagelimit: 5
      },
      success: (res) => {
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].logo_path != null) {
            res.data[i].logo_path = app.globalData.host + res.data[i].logo_path
          }
          res.data[i].time1 = util.formatTime(res.data[i].add_time, 'Y-M-D');

        };
        this.setData({
          friendList: res.data,
          friendPage: 1
        })
        // 关闭刷新
        wx.stopPullDownRefresh()
      }
    })
  },
  // 获取更多朋友圈
  addFriend: function() {
    wx.request({
      url: app.globalData.host + '/index/hudong/GetMyFriend',
      data: {
        user_id: app.globalData.user_id,
        page: this.data.friendPage + 1,
        pagelimit: 5
      },
      success: (res) => {
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].logo_path != null) {
            res.data[i].logo_path = app.globalData.host + res.data[i].logo_path
          }
          res.data[i].time1 = util.formatTime(res.data[i].add_time, 'Y-M-D');

        };
        this.setData({
          friendList: this.data.friendList.concat(res.data),
          friendPage: this.data.friendPage + 1
        })
        // 关闭刷新
        wx.stopPullDownRefresh()
      }
    })
  },
  // 获取淘票信息
  getTaopiao: function() {
    wx.request({
      url: app.globalData.host + '/index/tao/GetTaoList',
      data: {
        page: 1,
        pagelimit: 5
      },
      success: (res) => {
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].logo_path != null) {
            res.data[i].logo_path = app.globalData.host + res.data[i].logo_path
          }
          res.data[i].time1 = util.formatTime(res.data[i].add_time, 'Y-M-D')
        }
        this.setData({
          taopiaoList: res.data,
          taopiaoPage: 1
        })
        // 关闭刷新
        wx.stopPullDownRefresh()
      }
    })
  },
  // 获取更多淘票信息
  addTaopiao: function() {
    wx.request({
      url: app.globalData.host + '/index/tao/GetTaoList',
      data: {
        page: this.data.taopiaoPage + 1,
        pagelimit: 5
      },
      success: (res) => {
        if (res.data.length > 0) {
          for (var i = 0; i < res.data.length; i++) {
            if (res.data[i].logo_path != null) {
              res.data[i].logo_path = app.globalData.host + res.data[i].logo_path
            }
            res.data[i].time1 = util.formatTime(res.data[i].add_time, 'Y-M-D')
          }
          this.setData({
            taopiaoList: this.data.taopiaoList.concat(res.data),
            taopiaoPage: this.data.taopiaoPage + 1
          })
          // 关闭刷新
          wx.stopPullDownRefresh()
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getdontai();
    this.getFriend();
    this.getTaopiao();

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
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
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
   * 下拉刷新
   */
  onPullDownRefresh: function() {
    wx.showLoading({
      title: '正在加载',
    })
    if (this.data.tabindex == 0) {
      this.getdontai()
    } else if (this.data.tabindex == 1) {
      this.getFriend();
    } else {
      this.getTaopiao();
    }
    setTimeout(() => {
      wx.hideLoading()
      wx.showToast({
        title: '加载成功',
        icon: 'success'
      })
    }, 1000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.tabindex == 0) {
      this.addDontai()
    } else if (this.data.tabindex == 1) {
      this.addFriend();
    } else {
      this.addTaopiao();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})