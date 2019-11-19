// pages/personalCenter/duihuan1/chooseMusicAll/chooseMusicAll.js
var app = getApp();
var util = require('../../../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        meanPrice:null,
        musicList: [],
        order_id:null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            meanPrice: options.meanPrice,
            order_id:options.order_id
        })
        console.log(this.options.order_id)

        // 请求数据
        wx.request({
            url: app.globalData.host + '/index/shop/Exchange_list',
            data: {
                user_id: app.globalData.user_id,
            },
            success: (res) => {
                var data=res.data;
                for(var i=0;i<data.length;i++){
                    data[i].thumb_path = app.globalData.host + data[i].thumb_path;
                    data[i].time = util.formatTime(data[i].time, 'Y-M-D');
                    data[i].end_time = util.formatTime(data[i].end_time, 'Y-M-D');
                }
                this.setData({
                    musicList: data
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})