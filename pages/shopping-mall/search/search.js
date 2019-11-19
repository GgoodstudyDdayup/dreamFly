// pages/shopping-mall/shopping-mall.js
var time = require('../../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 点赞的图片
    weidianzan: '/pages/images/zan.png',
    yidianzan: '/pages/images/zanBG.png',
    yinyuejie: [],
    page: 1, //页数
    // 年份pick数据
    array: ['2019', '2020', '2021'],
    index: 0
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

  getMusicList: function (keyword,year,month) {
    this.setData({
      page: 1
    })
    wx.showLoading({
      title: '正在搜索',
    })
    wx.request({
      url: app.globalData.host + '/index/index/GetMusicPageList',
      data: {
        keyword,year,month
      },
      success: (res) => {
        wx.hideLoading()
        if(res.data.length<1){
          wx.showModal({
            title: '温馨提示',
            content: '暂无搜索结果',
            showCancel:false,
            success(){
              wx.navigateBack({
                delta:0
              })
            }
          })
        }
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
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMusicList(options.keyword,options.year,options.month)
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
    this.getMusicList()
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
  }
})