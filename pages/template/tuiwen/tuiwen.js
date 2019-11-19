// pages/template/tuiwen/tuiwen.js
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
        todetails: function(e) {
            wx.navigateTo({
                url: '/pages/information/toptweets/details/details?id=' + e.currentTarget.dataset.id,
            })
        },
    }
})