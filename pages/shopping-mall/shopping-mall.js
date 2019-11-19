// pages/shopping-mall/shopping-mall.js
var time = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: '',
    // 点赞的图片
    weidianzan: '/pages/images/zan.png',
    yidianzan: '/pages/images/zanBG.png',
    yinyuejie: [],
    page: 1, //页数
    // 年份pick数据
    array: ['2019', '2020', '2021'],
    index: 0,
    year: "2019",
    //piker数据结束
    // 月份pick数据
    monthobjectArray: [{
      id: "",
      name: '全年'
    },
    {
      id: 1,
      name: '1月'
    },
    {
      id: 2,
      name: '2月'
    },
    {
      id: 3,
      name: '3月'
    },
    {
      id: 4,
      name: '4月'
    },
    {
      id: 5,
      name: '5月'
    },
    {
      id: 6,
      name: '6月'
    },
    {
      id: 7,
      name: '7月'
    },
    {
      id: 8,
      name: '8月'
    },
    {
      id: 9,
      name: '9月'
    },
    {
      id: 10,
      name: '10月'
    },
    {
      id: 12,
      name: '11月'
    },
    {
      id: 12,
      name: '12月'
    }
    ],
    monthindex: 0,
    month: ""
    //月份piker数据结束
  },


  // 获取input内容
  getinput: function (e) {
    var data = e.detail.value;
    console.log(data)
    this.setData({
      keyword: data
    })
  },
  // piker组件
  bindPickerChange(e) {
    var index = e.detail.value;
    var year = this.data.array[index]
    this.setData({
      index: index,
      year: year
    })
    console.log(this.data.year)
  },
  // 月份piker组件
  bindPickerChangeMonth(e) {
    console.log(e)
    var index = e.detail.value;
    var month = this.data.monthobjectArray[index].id
    this.setData({
      monthindex: index,
      month: month
    })
    console.log(this.data.month)
  },


  // 跳转到音乐节和夜店详情页
  toDetails: function (e) {
    wx.navigateTo({
      url: '/pages/huodong/xiangqing0/xiangqing0?music_id=' + e.currentTarget.dataset.id,
    })
  },
  // 砍价页
  kanjia: function () {
    wx.navigateTo({
      url: 'kanjia/kanjia',
    })
  },

  // 抽奖页
  lottery: function () {
    wx.navigateTo({
      url: '../prizeTime/prizeTime',
    })
  },
  // 请求音乐节

  getMusicList: function (is_fresh) {
    if (is_fresh) {
      wx.showLoading({
        title: '正在刷新',
      })
    }
    this.setData({
      page: 1
    })
    wx.request({
      url: app.globalData.host + '/index/index/GetMusicPageList',
      data: {
        class: 1,
        limit: 2,
        type: 2,
        user_id: app.globalData.user_id
      },
      success: (res) => {
        var NowTime = Math.round(new Date() / 1000);
        for (var i = 0; i < res.data.length; i++) {
          // 拼接地址
          res.data[i].thumb_path = app.globalData.host + res.data[i].thumb_path;
          res.data[i].time1 = time.formatTime(res.data[i].time, 'Y');
          res.data[i].time2 = time.formatTime(res.data[i].time, 'M/D');
          res.data[i].time3 = time.formatTime(res.data[i].end_time, 'M/D');
          if (res.data[i].is_ticket == 2) {
            if (NowTime < res.data[i].ticket_time) {
              res.data[i].is_pay = "待售中"
            } else if (NowTime > res.data[i].ticket_time && NowTime < res.data[i].ticket_endtime) {
              res.data[i].is_pay = "销售中"
            } else {
              res.data[i].is_pay = "已结束"
            }
          }
        }
        this.setData({
          yinyuejie: res.data,
        })
        if (is_fresh) {
          wx.hideLoading()
          wx.showToast({
            title: '刷新成功',
            icon: 'success'
          })
          // 停止下拉动作
          wx.stopPullDownRefresh();
        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMusicList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

    this.getMusicList(true)
  },

  // 加载更多
  onReachBottom: function () {
    // 显示加载图标
    // wx.showLoading({
    //   title: '玩命加载中',
    // })
    // 页数+1
    this.data.page += 1;
    wx.request({
      url: app.globalData.host + '/index/index/GetMusicPageList',
      data: {
        class: 1,
        limit: 2,
        type: 2,
        page: this.data.page,
        user_id: app.globalData.user_id
      },
      success: (res) => {
        var NowTime = Math.round(new Date() / 1000);

        for (var i = 0; i < res.data.length; i++) {
          // 拼接地址
          res.data[i].thumb_path = app.globalData.host + res.data[i].thumb_path;
          res.data[i].time1 = time.formatTime(res.data[i].time, 'Y');
          res.data[i].time2 = time.formatTime(res.data[i].time, 'M/D');
          res.data[i].time3 = time.formatTime(res.data[i].end_time, 'M/D');
          if (res.data[i].is_ticket == 2) {
            if (NowTime < res.data[i].ticket_time) {
              res.data[i].is_pay = "待售中"
            } else if (NowTime > res.data[i].ticket_time && NowTime < res.data[i].ticket_endtime) {
              res.data[i].is_pay = "销售中"
            } else {
              res.data[i].is_pay = "已结束"
            }
          }
        }
        var cont = this.data.yinyuejie.concat(res.data);
        this.setData({
          yinyuejie: cont
        })
        console.log(cont)
        wx.hideLoading();
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    return {
      title: this.data.details.name,
      path: "/pages/huodong/xiangqing0/xiangqing0?music_id=" + this.data.details.music_id,
      imageUrl: this.data.details.thumb_path
    }
  },
  search() {
    let that = this;
    console.log('key', that.data.keyword)
    wx.navigateTo({
      url: `search/search?keyword=${that.data.keyword}&year=${that.data.year}&month=${that.data.month}`,
    })
  }
})