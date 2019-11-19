Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dataList: Array,
    value: {
      type: String,
      value: false
    },
    friend: {
      type: Array,
      value: false
    },
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
    addWatch: function (e) {
      console.log(e);
      wx.setClipboardData({
        data: e.currentTarget.dataset.item.link_wechat,
        success: function (res) {
          wx.getClipboardData({
            success: function (res) {
              wx.showToast({
                title: '复制微信号成功',
              })
            }
          })
        }
      })
    },
  },
  ready: function () {
    // console.log(this.properties.friend)
  }
})