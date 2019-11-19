// pages/template/search/search.js
var app = getApp();
var time = require('../../../utils/util.js');
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
    keyword: '', //获取搜索框的值
    // pick数据
    array: ['2019', '2018', '2017'],
    objectArray: [{
        id: 0,
        name: '2019'
      },
      {
        id: 1,
        name: '2018'
      },
      {
        id: 2,
        name: '2017'
      }
    ],
    index: 0,
    year: "2019"

  },

  /**
   * 组件的方法列表
   */
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
      var year = this.data.objectArray[index].name
      this.setData({
        index: e.detail.value,
        year: year
      })
    },
    // 搜索功能
    search: function(e) {
      wx.request({
        url: app.globalData.host + '/index/index/GetMusicPageList',
        data: {
          class: 1,
          page: this.data.page,
          limit: 2,
          user_id: app.globalData.user_id,
          year: this.data.year,
          keyword: this.data.keyword
        },
        success: (res) => {
          for (var i = 0; i < res.data.length; i++) {
            // 拼接地址
            res.data[i].thumb_path = app.globalData.host + res.data[i].thumb_path;
            res.data[i].time1 = time.formatTime(res.data[i].time, 'Y');
            res.data[i].time2 = time.formatTime(res.data[i].time, 'M/D');
            res.data[i].time3 = time.formatTime(res.data[i].end_time, 'M/D');
          }

          this.triggerEvent('showTab', res.data);
        }
      })
    },
  }
})