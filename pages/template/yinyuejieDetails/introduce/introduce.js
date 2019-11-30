// pages/template/yinyuejieDetails/introduce/introduce.js
var WxParse = require('../../../../wxParse/wxParse.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    details: Object,
    tuijian: Array,
    userInfo2: Object,
    content: String
  },
  /**
   * 组件的初始数据
   */
  data: {
    openclass: "openone",
    // openclass: 'wr-bottom', //展开更多
    tapindex: null, //选项卡切换
    ticket: {} //票的信息
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 跳转购票页面
    toGoupiao: function() {
      wx.navigateTo({
        url: '../goupiao/goupiao?piaojia=' + this.data.ticket.prise + "&ticketname=" + this.data.ticket.name + "&music_id=" + this.data.details.music_id + "&ticket_id=" + this.data.ticket.id
      })
    },
    // 选择票的类型
    chooseTicket: function(e) {
      var menpiaores = this.data.details.menpiaores; //全部票的类型
      var dataset = e.currentTarget.dataset; //当前选中的类型
      if (menpiaores[dataset.index].number <= 0) {
        this.setData({
          is_xiaoshou: false,
          tapindex: dataset.index,
          ticket: null,
        })
      } else {
        this.setData({
          is_xiaoshou: true,
          tapindex: dataset.index,
          ticket: menpiaores[dataset.index]
        })
      };
    },
    // 相关推荐详情页
    toDetails: function(e) {
      wx.navigateTo({
        url: '/pages/huodong/xiangqing0/xiangqing0?music_id=' + e.currentTarget.dataset.id
      })
    },
    /**
     * 展开详情
     */
    onopen: function() {
      this.setData({
        openclass: "openone"
      })
    },
    closexiangqing: function() {
      this.setData({
        openclass: "wr-bottom"
      })
    }
  },
  //生命周期
  attached: function() {
    // 富文本解析
    // console.log(WxParse)
    var article = this.data.content
    WxParse.wxParse('article', 'html', article, this, 5)
  },
  ready: function() {}
})