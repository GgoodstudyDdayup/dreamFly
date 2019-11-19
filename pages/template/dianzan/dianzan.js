var app = getApp();
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        is_zan: {
            type: Number
        },
        zanid: {
            type: Number
        },
        zan_count: {
            type: Number
        },
        shoucangjiekou: {
            type: String
        }

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
        dianzan: function(e) {
            var is_zan = this.properties.is_zan;
            var zanid = this.properties.zanid;
            var zan_count = this.properties.zan_count;
            var shoucangjiekou = this.properties.shoucangjiekou;
            if (is_zan == 0) {
                wx.request({
                    url: app.globalData.host + shoucangjiekou,
                    data: {
                        status: 1,
                        class: 1,
                        music_id: zanid,
                        user_id: app.globalData.user_id
                    },
                    success: (res) => {
                        wx.showToast({
                            title: '点赞成功',
                            icon: 'succes',
                            duration: 1000,
                            mask: true
                        });
                        // 点赞成功变红手
                        this.setData({
                            is_zan: 1,
                            zan_count: zan_count + 1
                        })
                    }
                })
            } else {
                wx.request({
                    url: app.globalData.host + shoucangjiekou,
                    data: {
                        status: 0,
                        class: 1,
                        music_id: zanid,
                        user_id: app.globalData.user_id
                    },
                    success: (res) => {
                        wx.showToast({
                            title: '取消点赞成功',
                            icon: 'succes',
                            duration: 1000,
                            mask: true
                        })
                        this.setData({
                            is_zan: 0,
                            zan_count: zan_count - 1
                        })
                    }
                })
            }
        },
    }
})