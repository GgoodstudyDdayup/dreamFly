
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
      video: {
        type: Array,
        value: false
      },
      listSize: {
        type: Number,
        value: 1000
      },
      url: String,
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
        // 跳转到音乐节和夜店详情页
        // toDetails: function(e) {
        //     wx.navigateTo({
        //         url: '/pages/huodong/xiangqing0/xiangqing0?music_id=' + e.currentTarget.dataset.id,
        //     })
        // },
    },
    ready: function() {
        
    }
})