// pages/xiangqing0/xiangqing0.js
var app = getApp();
var utils = require('../../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo2: '',
    swiper: [],
    tuijian: [],
    details: '',
    nav: ["详情介绍", "参与会员", "音乐列表", "相关评论"],
    huiyuanList: [], //参与会员列表
    musicList: [], //音乐列表
    pinglunList: [], //评论列表
    tapindex: 0, //选项卡切换
    is_show: false, //详情组件是否显示
    music_id: ''
  },
  // 选项卡切换
  tapchange: function(e) {
    this.setData({
      tapindex: e.currentTarget.dataset.index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var scene = decodeURIComponent(options.scene)
    this.setData({
      userInfo2: app.globalData.userInfo2,
      music_id: options.music_id || scene
    })
    // 获取轮播图

    wx.request({
      url: app.globalData.host + '/index/index/SaveLunbo',
      data: {},
      success: (res) => {
        for (var i = 0; i < res.data.length; i++) {
          // 格式化数据
          // res.data[i].filepath = app.globalData.host + res.data[i].filepath;
          res.data[i].thumpath = app.globalData.host + res.data[i].thumpath;
        }
        this.setData({
          swiper: res.data
        })
      }
    })

    // 获取轮播图
    /* wx.request({
       url: app.globalData.host + '/index/index/adv',
       data: {
         adv_class: 1,
         limit: 3
       },
       success: (res) => {
         for (var i = 0; i < res.data.length; i++) {
           // 拼接地址
           res.data[i].filepath = app.globalData.host + res.data[i].filepath
         }
         this.setData({
           swiper: res.data,
         })
       }
     });*/
    // 获取详情信息
    wx.request({
      url: app.globalData.host + '/index/index/GetMusicInfo',
      data: {
        music_id: options.music_id || scene,
        user_id: app.globalData.user_id
      },
      success: (res) => {
        // 如果以收藏就显示红心，否则显示空心
        if (res.data.cang == 0) {
          this.setData({
            shoucang: false
          })
        } else {
          this.setData({
            shoucang: true
          })
        }
        var NowTime = Date.parse(new Date()) / 1000;
        if (NowTime < res.data.ticket_time) {
          res.data.is_pay = "待售中"
        } else if (NowTime > res.data.ticket_time && NowTime < res.data.ticket_endtime) {
          res.data.is_pay = "销售中"
        } else {
          res.data.is_pay = "已结束"
        }
        // 拼接图片地址
        res.data.thumb_path = app.globalData.host + res.data.thumb_path;
        res.data.starTime = utils.formatTime(res.data.time, 'Y-M-D');
        res.data.endTime = utils.formatTime(res.data.end_time, 'Y-M-D');
        this.setData({
          details: res.data,
          is_show: true
        })
      }
    })

    // 获取相关推荐
    wx.request({
      url: app.globalData.host + '/index/index/GetMusicPageList',
      data: {
        user_id: app.globalData.host,
        limit: 3,
        class: 1
      },
      success: (res) => {
        for (var i = 0; i < res.data.length; i++) {
          // 拼接地址
          res.data[i].thumb_path = app.globalData.host + res.data[i].thumb_path;
          res.data[i].time1 = utils.formatTime(res.data[i].time, 'Y-M-D');
        }
        this.setData({
          tuijian: res.data
        })
      }
    });
    // 获取参与会员
    wx.request({
      url: app.globalData.host + '/index/shop/GetMusicUserList',
      data: {
        music_id: options.music_id || scene
      },
      success: (res) => {
        this.setData({
          huiyuanList: res.data
        })
      }
    });
    // 获取音乐列表
    wx.request({
      url: app.globalData.host + '/index/index/GetMusics',
      data: {
        music_id: options.music_id || scene,
        page: 1,
        pagelimit: 20,
      },
      success: (res) => {
        for (var i = 0; i < res.data.length; i++) {
          // res.data[i].filepath = app.globalData.host + res.data[i].filepath
          // res.data[i].thumbpath = app.globalData.host + res.data[i].thumbpath

        }
        this.setData({
          musicList: res.data
        })
      }
    })
    // 获取评论 
    wx.request({
      url: app.globalData.host + '/index/index/GetCommentList',
      data: {
        music_id: options.music_id || scene,
        user_id: app.globalData.user_id
      },
      success: (res) => {
        for (var i = 0; i < res.data.length; i++) {
          res.data[i].add_time = utils.formatTime(res.data[i].add_time, 'Y年M月D日');
        }
        this.setData({
          pinglunList: res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  toDetails: function(e) {
    console.log('e:', e);
    if (e.currentTarget.dataset.path.length > 1) {
      wx.navigateTo({
        url: e.currentTarget.dataset.path,
        fail() {
          wx.switchTab({
            url: e.currentTarget.dataset.path,
          })
          // wx.showModal({
          //   title: '跳转出错',
          //   content: e.currentTarget.dataset.path,
          // })
        }
      })
    }
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
  onShareAppMessage: function(e) {
    // 组件内传来的参数
    var share = e.target.dataset;
    return {
      title: share.title,
      path: share.path + share.id,
      imageUrl: share.img,
    }
  }
})