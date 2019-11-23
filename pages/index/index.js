// pages/homePage/homePage.js
var time = require('../../utils/util.js');
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    lunbo: [],
    yinyuejie: [],
    /*音乐节列表*/
    yedian: [],
    /*夜店列表*/
    // nav: ["活动", "推文", "现场", "音乐", "福利"],
    nav: ["活动", "推文", "现场", "音乐"],
    tuiwen: [], //推文列表
    video: [], //视频列表
    music: [], //音乐列表
    show: 0,
    dialog: false,
    userInfo: {},
    hotVideo: [],
    tuijianVideo: [],
  },
  tab: function(e) {
    this.setData({
      show: e.currentTarget.dataset.index
    })
  },
  // 跳转到更多门票页面
  toShoppingMall: function() {
    app.globalData.zixunTab = 0
    wx.navigateTo({
      url: '/pages/goods-list/goods-list?type=官方推荐',
      success(){
        // app.globalData.zixunTab = 0
      }
    })
  },
  // 跳转到视频搜索页 
  toSearch: function () {
    wx.navigateTo({
      url: '/pages/videosearch/videosearch',
      success: () => {
        
      }
    })
  },
  // 跳转到更多夜店页面
  moreYedian: function() {
    app.globalData.zixunTab = 4
    wx.navigateTo({
      url: '/pages/video/video?type=热门活动',
      success: () => {
        // app.globalData.zixunTab = 4
      }
    })
  },
  // 跳转到音乐节详情页
  toDetails: function(e) {
    console.log('e:',e);
    // pages / details / details
    if (e.currentTarget.dataset.path.length > 1) {
      wx.navigateTo({
        url: e.currentTarget.dataset.path,
        fail() {
          wx.switchTab({
            url: e.currentTarget.dataset.path,
          })
          wx.showModal({
            title: '跳转出错',
            content: e.currentTarget.dataset.path,
          })
        }
      })
    }
  },
  // 请求音乐节
  // requestData: function() {
  //   wx.request({
  //     url: app.globalData.host + '/index/index/GetMusicPageList',
  //     data: {
  //       class: 1,
  //       limit: 2,
  //       user_id: app.globalData.user_id
  //     },
  //     success: (res) => {
  //       // console.log(res, '首页音乐节')
  //       var NowTime = Math.round(new Date() / 1000);
  //       var arr = [];
  //       for (var i = 0; i < res.data.length; i++) {
  //         // 拼接地址
  //         res.data[i].thumb_path = app.globalData.host + res.data[i].thumb_path;
  //         res.data[i].time1 = time.formatTime(res.data[i].time, 'Y');
  //         res.data[i].time2 = time.formatTime(res.data[i].time, 'M/D');
  //         res.data[i].time3 = time.formatTime(res.data[i].end_time, 'M/D');
  //         if (res.data[i].is_ticket == 2) {
  //           if (NowTime < res.data[i].ticket_time) {
  //             res.data[i].is_pay = "待售中"
  //           } else if (NowTime > res.data[i].ticket_time && NowTime < res.data[i].ticket_endtime) {
  //             res.data[i].is_pay = "销售中"
  //           } else {
  //             res.data[i].is_pay = "已结束"
  //           }
  //           // arr.push(res.data[i])
  //         }
  //       }
  //       this.setData({
  //         yinyuejie: res.data
  //       })
  //     }
  //   });
  // },
  // 请求夜店列表
  // getyedian: function() {
  //   wx.request({
  //     url: app.globalData.host + '/index/article/GetArticlePageList',
  //     data: {
  //       cate_id: 8,
  //       user_id: app.globalData.user_id
  //     },
  //     success: (res) => {
  //       for (var i = 0; i < res.data.length; i++) {
  //         res.data[i].filepath = app.globalData.host + res.data[i].filepath;
  //         res.data[i].thumbpath = app.globalData.host + res.data[i].thumbpath;
  //         res.data[i].time1 = time.formatTime(res.data[i].create_time, 'Y');
  //         res.data[i].time2 = time.formatTime(res.data[i].create_time, 'M/D');
  //       }
  //       this.setData({
  //         yedian: res.data
  //       })
  //     }
  //   })
  // },
  // 获取推文列表
  // getTuiwen: function() {
  //   wx.request({
  //     url: app.globalData.host + '/index/article/GetArticlePageList',
  //     data: {
  //       cate_id: 4,
  //       user_id: app.globalData.user_id
  //     },
  //     success: (res) => {
  //       for (var i = 0; i < res.data.length; i++) {
  //         res.data[i].filepath = app.globalData.host + res.data[i].filepath;
  //         res.data[i].thumbpath = app.globalData.host + res.data[i].thumbpath;
  //         res.data[i].time1 = time.formatTime(res.data[i].update_time, 'Y');
  //         res.data[i].time2 = time.formatTime(res.data[i].update_time, 'M/D');
  //       }
  //       this.setData({
  //         tuiwen: res.data
  //       })
  //     }
  //   })
  // },
  // 获取视频列
  // getvideo: function() {
  //   wx.request({
  //     url: app.globalData.host + '/index/article/GetArticlePageList',
  //     data: {
  //       cate_id: 2,
  //       user_id: app.globalData.user_id,
  //       pagelimit: 2,
  //     },
  //     success: (res) => {
  //       for (var i = 0; i < res.data.length; i++) {
  //         res.data[i].filepath = app.globalData.host + res.data[i].filepath;
  //         // res.data[i].thumbpath = app.globalData.host + res.data[i].thumbpath;
  //         res.data[i].time1 = time.formatTime(res.data[i].update_time, 'Y');
  //         res.data[i].time2 = time.formatTime(res.data[i].update_time, 'M/D');
  //       }
  //       this.setData({
  //         video: res.data
  //       })
  //     }
  //   })
  // },
  // 获取音乐
  // getmusic: function() {
  //   wx.request({
  //     url: app.globalData.host + '/index/article/GetArticlePageList',
  //     data: {
  //       cate_id: 3,
  //       user_id: app.globalData.user_id
  //     },
  //     success: (res) => {
  //       for (var i = 0; i < res.data.length; i++) {
  //         // 格式化数据
  //         // res.data[i].filepath = app.globalData.host + res.data[i].filepath;
  //         // res.data[i].thumbpath = app.globalData.host + res.data[i].thumbpath;
  //         res.data[i].time1 = time.formatTime(res.data[i].update_time, 'Y');
  //         res.data[i].time2 = time.formatTime(res.data[i].update_time, 'M/D')
  //       }
  //       this.setData({
  //         music: res.data
  //       })
  //     }
  //   })
  // },
  // 弹出设置
  showDialog: function(e) {
    this.setData ({
      dialog: Boolean(e.currentTarget.dataset.isboolean)
    })
    // console.log(e)
  },
  // 获取轮播图
  getlunbo() {
    wx.request({
      url: app.globalData.host + '/index/index/SaveLunbo',
      data: {},
      success: (res) => {
        console.log(res)
        for (var i = 0; i < res.data.length; i++) {
          // 格式化数据
          // res.data[i].filepath = app.globalData.host + res.data[i].filepath;
          res.data[i].thumpath =  res.data[i].thumpath;
        }
        this.setData({
          lunbo: res.data
        })
      }
    })
  },
  // 获取官方推荐
  getTJVideo: function () {
    wx.request({
      url: app.globalData.host + '/index/article/GetArticle',
      method: 'post',
      // data: {
      //   page: "1"
      // },
      success: (res) => {
        console.log(res);
        this.setData({
          tuijianVideo: res.data
        })
        // console.log(this.data.tuijianVideo)
      }
    })
  },
  // 获取热门活动
  getHotVideo: function () {
    wx.request({
      url: app.globalData.host + '/index/article/GetArticleRe',
      method: 'post',
      data: {
        page: "1"
      },
      success: (res) => {
        console.log(res);
        this.setData({
          hotVideo: res.data
        })
        // console.log(this.data.hotVideo)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 请求数据
    app.getUserId = (data) => {
      // this.requestData();
      // this.getyedian();
      // this.getTuiwen();
      // this.getvideo();
      // this.getmusic();
      this.getHotVideo();
      this.getTJVideo();
      this.setData({
        userInfo: app.globalData.userInfo2
      })
    };
    // app.onLaunch()
    // app.getDetailsUserInfo().then(res => {
    //   console.log(res)
      // app.globalData.userInfo2 = res
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 请求数据


      this.getHotVideo();
      this.getTJVideo();
    
    // wx.getSetting({
    //   success: res => {
    //     console.log(res.authSetting['scope.userInfo'])
    //     if(!res.authSetting['scope.userInfo']) {
    //       wx.navigateTo({
    //         url: "/pages/personalCenter/personalCenter"
    //       })
    //     }
    //   }
    // })
    this.getlunbo();
    // console.log(app.globalData.userInfo2)
    // console.log(app.globalData.userInfo2)
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }

    // if (app.globalData.user_id != null) {
      // this.requestData();
      // this.getyedian();
      // this.getTuiwen();
      // this.getvideo();
      // this.getmusic()
    // }

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