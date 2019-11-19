// pages/details/details.js
const app = getApp();
var utils = require('../../../utils/util');
var WxParse = require('../../../wxParse/wxParse.js');

Page({
    /**
     * 页面的初始数据
     */
    data: {
        article: "",
        detailse: {},
        pinglunList:[]//评论列表
    },
    toPinglun: function (e) {
        wx.navigateTo({
            url: "/pages/information/toptweets/pinglun/pinglun?id=" + e.target.dataset.id
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) { 
        var scene = decodeURIComponent(options.scene)
        wx.request({
            url: app.globalData.host + '/index/article/GetArticleInfo',
            data: {
                id: options.id || scene,
                user_id: app.globalData.user_id
            },
            success: (res) => {
                res.data.thumbpath = res.data.thumbpath;
                // 富文本解析
                var article = res.data.content
                WxParse.wxParse('article', 'html', article, this, 5)
                this.setData({
                    details: res.data
                })
            }
        })
        // 获取评论
        wx.request({
            url: app.globalData.host + '/index/article/GetArticleCommentPageList',
            data: {
                article_id: options.id || scene,
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
    onShareAppMessage: function (e) {
        // 组件内传来的参数
        var share = e.target.dataset;
        return {
            title: share.title,
            path: share.path + share.id,
            imageUrl: share.img,
        }
    }
})