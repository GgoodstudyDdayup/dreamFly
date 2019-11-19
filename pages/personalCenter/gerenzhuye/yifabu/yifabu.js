Component({
    /**
     * 组件的属性列表
     */
    properties: {
        dataList: Array,
        userInfo2:Object,
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
        // 跳转详情
        toDetails: function(e) {
            wx.navigateTo({
                url: '/pages/Interaction/pengyouquan/details/details?quan_id=' + e.currentTarget.dataset.quan_id
            })
        },
        // 跳转音乐节
        toMusic: function (e) {
            wx.navigateTo({
                url: '/pages/huodong/xiangqing0/xiangqing0?music_id=' + e.currentTarget.dataset.music_id,
            })
        },
    },
    ready:function(){
        console.log(11111)
    }
})