// pages/information/information.js
var app = getApp();
var time = require('../../../utils/util.js');
Component({
  properties: {},
  /**
   * 页面的初始数据
   */
  data: {
    yinyuejie: [],
    arr: ["yinyuejie", "shipin", "yinyue", "remen", "yedian", "taobao"],
    nav: ["音乐节", "现场", "音乐", "热门推文", "夜店"],
    weidianzan: '/pages/images/zan.png',
    yidianzan: '/pages/images/zanBG.png',
    page: 1, //页数
    keyword: '', //获取搜索框的值
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
        id: 11,
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
  methods: {
    // 获取input内容
    getinput: function(e) {
      var data = e.detail.value;
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
    },
    // 月份piker组件
    bindPickerChangeMonth(e) {
      var index = e.detail.value;
      var month = this.data.monthobjectArray[index].id
      this.setData({
        monthindex: index,
        month: month
      })
    },
    /**
     * 页面跳转
     */
    toDetails: function(e) {
      wx.navigateTo({
        url: '/pages/huodong/xiangqing0/xiangqing0?music_id=' + e.currentTarget.dataset.id,
      })
    },
    // 下拉刷新
    downRefresh: function() {
      // page重置为1
      this.setData({
        page: 1
      });
      wx.request({
        url: app.globalData.host + '/index/index/GetMusicPageList',
        data: {
          class: 1,
          limit: 2,
          type: 1,
          year: this.data.year,
          keyword: this.data.keyword,
          month: this.data.month,
          user_id: app.globalData.user_id
        },
        success: (res) => {
          for (var i = 0; i < res.data.length; i++) {
            // 拼接地址
            res.data[i].thumb_path = app.globalData.host + res.data[i].thumb_path;
            res.data[i].time1 = time.formatTime(res.data[i].time, 'Y');
            res.data[i].time2 = time.formatTime(res.data[i].time, 'M/D');
            res.data[i].time3 = time.formatTime(res.data[i].end_time, 'M/D');
          }
          this.setData({
            yinyuejie: res.data,
          })
          wx.showToast({
            title: '刷新成功',
            icon: 'success',
            duration: 1000
          })
          // 停止下拉动作
          wx.stopPullDownRefresh();
        }
      })
    },
    // 加载更多
    addMore: function() {
      // 显示加载图标
      // wx.showLoading({
      //     title: '玩命加载中',
      // })
      // 页数 + 1
      this.data.page += 1;
      console.log(this.data.page)
      wx.request({
        url: app.globalData.host + '/index/index/GetMusicPageList',
        data: {
          class: 1,
          page: this.data.page,
          limit: 2,
          type: 1,
          year: this.data.year,
          keyword: this.data.keyword,
          month: this.data.month,
          user_id: app.globalData.user_id
        },
        success: (res) => {
          for (var i = 0; i < res.data.length; i++) {
            // 拼接地址
            res.data[i].thumb_path = app.globalData.host + res.data[i].thumb_path;
            res.data[i].time1 = time.formatTime(res.data[i].time, 'Y');
            res.data[i].time2 = time.formatTime(res.data[i].time, 'M/D');
            res.data[i].time3 = time.formatTime(res.data[i].end_time, 'M/D');
          }
          var cont = this.data.yinyuejie.concat(res.data);
          this.setData({
            yinyuejie: cont
          })
          wx.hideLoading();
        }
      })
    },
    getMusic: function() {
      wx.request({
        url: app.globalData.host + '/index/index/GetMusicPageList',
        data: {
          class: 1,
          page: 1,
          limit: 10,
          type: 1,
          year: this.data.year,
          keyword: this.data.keyword,
          month: this.data.month,
          user_id: app.globalData.user_id
        },
        success: (res) => {
          var NowTime = Date.parse(new Date()) / 1000;
          for (var i = 0; i < res.data.length; i++) {
            // 拼接地址
            res.data[i].thumb_path = app.globalData.host + res.data[i].thumb_path;
            res.data[i].time1 = time.formatTime(res.data[i].time, 'Y');
            res.data[i].time2 = time.formatTime(res.data[i].time, 'M/D');
            res.data[i].time3 = time.formatTime(res.data[i].end_time, 'M/D');
          }
          this.setData({
            yinyuejie: res.data,
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  ready: function(options) {
    this.getMusic()
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