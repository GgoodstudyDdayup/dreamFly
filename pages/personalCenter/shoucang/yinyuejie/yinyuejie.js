// pages/personalCenter/shoucang/yinyuejie/yinyuejie.js
var app = getApp();
var utils = require("../../../../utils/util.js")
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    dataList: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getMusic: function() {
      // 请求收藏
      wx.request({
        url: app.globalData.host + "/index/user/GetCangList",
        data: {
          class: 2,
          user_id: app.globalData.user_id,
          music_class: 1
        },
        success: (res) => {
          var NowTime = Date.parse(new Date()) / 1000;
          for (var i = 0; i < res.data.length; i++) {
            // 拼接地址
            res.data[i].thumb_path = app.globalData.host + res.data[i].thumb_path;
            // res.data[i].time1 = utils.formatTime(res.data[i].time, 'Y');
            // res.data[i].time2 = utils.formatTime(res.data[i].time, 'M/D/h');
            res.data[i].time1 = utils.formatTime(res.data[i].time, 'Y');
            res.data[i].time2 = utils.formatTime(res.data[i].time, 'M/D');
            res.data[i].time3 = utils.formatTime(res.data[i].end_time, 'M/D');
            if (NowTime > res.data[i].end_time) {
              res.data[i].is_xiaoshou = false;
            } else {
              res.data[i].is_xiaoshou = true;
            }
          }
          this.setData({
            dataList: res.data,
          })
          console.log(this.data.dataList)
          // 停止下拉动作
          wx.stopPullDownRefresh();
        }
      });
    }
  },
  ready: function() {
    this.getMusic()
  }

})