// pages/information/information.js
var time = require('../../../../utils/util');
const app = getApp();

Component({

    /**
     * 页面的初始数据
     */
    data: {
        dataList: [],
       
    },
    methods:{
        getTuiwen:function(){
            // 获取推文列表
            wx.request({
                url: app.globalData.host + '/index/article/GetGoodPageList',
                data: {
                    cate: 4,
                    class: 2,
                    user_id: app.globalData.user_id
                },
                success: (res) => {
                    for (var i = 0; i < res.data.length; i++) {
                        res.data[i].filepath = app.globalData.host + res.data[i].filepath;
                        res.data[i].thumbpath = app.globalData.host + res.data[i].thumbpath;
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
     * 页面跳转
     */
   
    /**
     * 生命周期函数--监听页面加载
     */
    ready: function(options) {
        this.getTuiwen()  
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