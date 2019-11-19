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
        id: '',
        details: {},
        pinglunList: [],
        is_guanzhu:null//是否关注
    },
    toPinglun: function(e) {
        wx.navigateTo({
            url: "../pinglun/pinglun?id=" + e.target.dataset.id
        })
    },
    // 关注
    guanzhu: function(e) {
        wx.request({
            url: app.globalData.host + '/index/hudong/SetGuan',
            data: {
                status: 1,
                user_id: app.globalData.user_id,
                buser_id: e.currentTarget.dataset.buser_id
            },
            success: (res) => {
                    this.setData({
                        "details.guanzhu": 1
                    })
            }
        })
    },
    // 取消关注
    qxguanzhu: function (e) {
        wx.request({
            url: app.globalData.host + '/index/hudong/SetGuan',
            data: {
                status: 0,
                user_id: app.globalData.user_id,
                buser_id: e.currentTarget.dataset.buser_id
            },
            success: (res) => {
                    this.setData({
                        "details.guanzhu": 0
                    })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var scene = decodeURIComponent(options.scene)
        // 获取推文详情
        wx.request({
            url: app.globalData.host + '/index/article/GetArticleInfo',
            data: {
                id: options.id || scene,
                user_id: app.globalData.user_id
            },
            success: (res) => {
                var data=res.data
                if(data.music_logo!=null){
                    data.music_logo = app.globalData.host + data.music_logo;
                }
                if (data.filepath!=''){
                    data.filepath = app.globalData.host + data.filepath;
                }
                if (data.thumbpath!=''){
                    data.thumbpath = app.globalData.host + data.thumbpath;
                }
                data.content = utils.cutString(data.content);
                data.create_time=utils.formatTime(data.create_time,'Y-M-D')
                // 富文本解析
                var article = data.content
                WxParse.wxParse('article', 'html', article, this, 5)
                this.setData({
                    details: data
                })
            }
        });
        // 获取推文评论
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
        var share = e.target.dataset;
        return {
            title: share.title,
            path: share.path + share.id,
            imageUrl: share.img,
        }
    }
})