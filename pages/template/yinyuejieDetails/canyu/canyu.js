// pages/template/yinyuejieDetails/canyu/canyu.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        huiyuanList: Array
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
        // 跳转用户主页
        togerenzhuye: function (e) {
            wx.navigateTo({
                url: '/pages/personalCenter/gerenzhuye/guanzhuren/yifabu?user_id=' + e.currentTarget.dataset.user_id
            })
        },
    }
})