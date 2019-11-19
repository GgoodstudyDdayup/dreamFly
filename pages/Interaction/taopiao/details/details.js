// pages/details/details.js
var app = getApp();
var utils = require('../../../../utils/util.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 详情
        details: {},
        pinglunList: []
    },
    toPinglun: function(e) {
        wx.navigateTo({
            url: "/pages/Interaction/taopiao/pinglun/pinglun?tao_id=" + e.target.dataset.tao_id
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var scene = decodeURIComponent(options.scene)
        // 获取详情
        wx.request({
            url: app.globalData.host + '/index/tao/GetTaoInfo',
            data: {
                tao_id: options.tao_id || scene
            },
            success: (res) => {
                res.data.filepath = app.globalData.host + res.data.filepath;
                res.data.thumbpath = app.globalData.host + res.data.thumbpath;
                this.setData({
                    details: res.data
                })
            }
        });
        // 获取评论
        wx.request({
            url: app.globalData.host + '/index/tao/GetTaoCommentList',
            data: {
                tao_id: options.tao_id || scene,
                user_id:app.globalData.user_id
            },
            success: (res) => {
                for (var i = 0; i < res.data.length; i++) {
                    res.data[i].time1 = utils.formatTime(res.data[i].add_time, 'Y-M-D');
                }
                this.setData({
                    pinglunList: res.data
                })
                console.log(this.data.pinglunList)

            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})