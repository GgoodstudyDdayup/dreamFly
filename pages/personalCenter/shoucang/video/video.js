// pages/videopage/video.js

const app = getApp();
var time = require('../../../../utils/util');

Component({
    /**
     * 页面的初始数据
     */
    data: {
        dataList: [],
        
    },
    methods: {
        getVideo:function(){
            // 获取视频列表
            wx.request({
                url: app.globalData.host + '/index/article/GetGoodPageList',
                data: {
                    cate: 2,
                    class: 2,
                    user_id: app.globalData.user_id
                },
                success: (res) => {
                    for (var i = 0; i < res.data.length; i++) {
                        res.data[i].filepath = app.globalData.host + res.data[i].filepath;
                        // res.data[i].thumbpath = app.globalData.host + res.data[i].thumbpath;
                        res.data[i].time1 = time.formatTime(res.data[i].update_time, 'Y');
                        res.data[i].time2 = time.formatTime(res.data[i].update_time, 'M/D/h');
                    }
                    this.setData({
                        dataList: res.data
                    })
                 
                    // 停止下拉动作
                    wx.stopPullDownRefresh();
                }
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    ready: function(options) {
        this.getVideo()
    },
    /**
     * 用户点击分享
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