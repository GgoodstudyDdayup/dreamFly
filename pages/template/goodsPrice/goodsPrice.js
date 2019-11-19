	var app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dataList: {
      type: Object,
      value: {}
    },
    'value': {
      type: String,
      value: false
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
	host:app.globalData.host
  },

  /**
   * 组件的方法列表
   */
  methods: {
  },
  ready: function () {
  }
})