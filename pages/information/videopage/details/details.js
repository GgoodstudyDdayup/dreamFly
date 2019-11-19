// pages/details/details.js
var app = getApp();
var utils = require('../../../../utils/util.js');
var WxParse = require('../../../../wxParse/wxParse.js');

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
        console.log(e)
        wx.navigateTo({
            url: "/pages/information/videopage/pinglun/pinglun?videoid=" + e.target.dataset.videoid
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var scene = decodeURIComponent(options.scene)
        // 获取视频详情
        wx.request({
            url: app.globalData.host + '/index/article/GetArticleInfo',
            data: {
                user_id: app.globalData.user_id,
                id: options.id || scene
            },
            success: (res) => {
                if (res.data.filepath!=null){
                    // res.data.filepath = app.globalData.host + res.data.filepath;
                }
                // res.data.thumbpath = app.globalData.host + res.data.thumbpath;
                this.setData({
                    details: res.data
                })
                // 富文本解析
                var article = this.data.details.content
                WxParse.wxParse('article', 'html', article, this, 5)
            }
        });
        // 获取视频评论
        wx.request({
            url: app.globalData.host + '/index/article/GetArticleCommentPageList',
            data: {
                article_id: options.id || scene,
                user_id:app.globalData.user_id
            },
            success: (res) => {
                for (var i = 0; i < res.data.length; i++) {
                    res.data[i].add_time = utils.formatTime(res.data[i].add_time, 'Y-M-D')
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