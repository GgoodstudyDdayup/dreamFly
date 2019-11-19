// pages/template/shoucang/shoucang.js
var app=getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    is_cang:{
      type:Number
    },
    shoucangid:{
      type: Number
    },
    shoucangjiekou:{
      type:String
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
     
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 收藏
    collect: function (e) {
      var is_cang = this.properties.is_cang;
      var shoucangid = this.properties.shoucangid;
      var shoucangjiekou = this.properties.shoucangjiekou;

      if (is_cang == 0) {
        wx.request({
          url: app.globalData.host + shoucangjiekou,
          data: {
            status: 1,
            class: 2,
            music_id: shoucangid,
            user_id: app.globalData.user_id
          },
          success: (res) => {
              wx.showToast({
                title: '收藏成功',
                icon: 'succes',
                duration: 1000,
                mask: true
              })
              // 收藏成功变红心
              this.setData({
                is_cang: 1
              })
          }
        })
      } else {
        wx.request({
          url: app.globalData.host + shoucangjiekou,
          data: {
            status: 0,
            class: 2,
            music_id: shoucangid,
            user_id: app.globalData.user_id
          },
          success: (res) => {
              wx.showToast({
                title: '取消收藏成功',
                icon: 'succes',
                duration: 1000,
                mask: true
              })
              // 取消变空心
              this.setData({
                is_cang: 0
              })
          }
        })
      }
    },
  }
})
