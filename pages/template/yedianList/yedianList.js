// pages/template/yedianList/yedianList.js
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
        // 跳转到音乐节和夜店详情页
        toDetails: function(e) {
            wx.navigateTo({
                url: '/pages/information/details/details?id=' + e.currentTarget.dataset.id,
            })
        },
    }
})