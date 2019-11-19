// pages/template/yinyuejieDetails/pinglun/pinglun.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        pinglunList: Array,
        music_id: String
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
        toPinglun: function() {
            wx.navigateTo({
                url: '/pages/huodong/pinglun/pinglun?music_id='+this.data.music_id,
            })
        }

    }
})