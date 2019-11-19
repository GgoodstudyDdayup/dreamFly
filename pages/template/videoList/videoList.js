const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    video: Array,
    type: {
      type: Number,
      value: 0
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    host: app.globalData.host
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 跳转详情页
    toGoodsDetails: function (e) {
      // console.log(e)
      if (this.properties.type == 0) {
        wx.navigateTo({
          url: '/pages/videoComments/videoComments?id=' + e.currentTarget.dataset.item.id,
        })

      } else if (this.properties.type == 2) {
        wx.navigateTo({
          url: '/pages/videoComments/videoComments?id=' + e.currentTarget.dataset.item.id + '&type=1',
        })
      } else {
        wx.navigateTo({
          url: '/pages/yedianDetails/yedianDetails?id=' + e.currentTarget.dataset.item.id,
        })
      }
    },
  },
  ready: function () {
    // console.log(this.properties.video)
  }
})