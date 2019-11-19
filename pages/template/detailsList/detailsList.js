// pages/template/detailsList/detailsList.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goods: Array,
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
      wx.navigateTo({
        url: '/pages/details/details?musicid=' + e.currentTarget.dataset.musicid + '&type=' + this.data.type,
      })
    }
  },
  ready: function() {
    // console.log(this.properties.goods)
  }
})
