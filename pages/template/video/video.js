// pages/template/video/video.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
      dataList: Array,
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
        toDetails: function(e) {
            console.log(e)
            wx.navigateTo({
                url: '/pages/information/videopage/details/details?id=' + e.currentTarget.dataset.videoid,
            })
        },
    },
    ready:function(){
    }

})