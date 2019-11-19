const app=getApp();
var util = require('../../../utils/util.js');
Component({
    properties: {
        next_jiang: Object,

    },
    /**
     * 页面的初始数据
     */
    data: {
        
    },
    methods: function() {
        toGuize: () => {
            wx.navigateTo({
                url: '/pages/shopping-mall/guize/guize',
            })
        }
    },
    ready: function() {
    },
  // 规则
  toGuize: function () {
    wx.navigateTo({
      url: '/pages/shopping-mall/guize/guize?is_choujiang=1',
    })
  }
})