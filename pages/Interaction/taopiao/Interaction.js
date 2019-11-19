// pages/Interaction/Interaction.js
var app = getApp();
Component({
    properties:{
        dataList:Array,

    },
    /**
     * 页面的初始数据
     */
    data: {
       
    },
    methods:{
        // 跳转投稿
        toTougao: function () {
            wx.navigateTo({
                url: '/pages/Interaction/taopiao/tougao/tougao'
            })
        },
        // 跳转详情
        toDetails: function (e) {
            wx.navigateTo({
                url: '/pages/Interaction/taopiao/details/details?tao_id=' + e.currentTarget.dataset.tao_id
            })
        },
        // 跳转用户主页
        togerenzhuye: function (e) {
            wx.navigateTo({
                url: '/pages/personalCenter/gerenzhuye/guanzhuren/yifabu?user_id=' + e.currentTarget.dataset.user_id
            })
        },
        toMusic:function(e){
            wx.navigateTo({
                url: '/pages/huodong/xiangqing0/xiangqing0?music_id=' + e.currentTarget.dataset.music_id,
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    ready: function() {
        // 获取动态数据
        // wx.request({
        //     url: app.globalData.host + '/index/hudong/GetQuanList',
        //     data: {
        //         user_id: app.globalData.user_id
        //     },
        //     success: (res) => {
        //         for (var i = 0; i < res.data.length; i++) {
        //             if (res.data[i].logo_path != null) {
        //                 res.data[i].logo_path = app.globalData.host + res.data[i].logo_path
        //             }
        //             res.data[i].time1 = time.formatTime(res.data[i].add_time, 'Y-M-D');
        //             res.data[i].is_guan = false
        //         }
        //         this.setData({
        //             dataList: res.data
        //         })
        //     }
        // })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function(e) {
        // 组件内传来的参数
        console.log(e);
        var share = e.target.dataset;
        return {
            title: share.title,
            path: share.path + share.id,
            imageUrl: share.img,
        }
    }
})