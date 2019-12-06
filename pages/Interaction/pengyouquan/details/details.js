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
            url: "/pages/Interaction/pengyouquan/pinglun/pinglun?quan_id="+this.data.details.quan_id
        })
    },
    // 关注
    guanzhu: function(e) {
        wx.request({
            url: app.globalData.host + '/index/hudong/SetGuan',
            data: {
                status: 1,
                user_id: app.globalData.user_id,
                buser_id: e.currentTarget.dataset.uid
            },
            success: (res) => {
                console.log(res)
                if (res.data.code == 1) {
                    this.setData({
                        "details.is_guan": 1
                    })
                }

            }
        })
    },
    //取消关注
    qxguanzhu: function(e) {
        wx.request({
            url: app.globalData.host + '/index/hudong/SetGuan',
            data: {
                status: 0,
                user_id: app.globalData.user_id,
                buser_id: e.currentTarget.dataset.uid
            },
            success: (res) => {
                console.log(res)
                if (res.data.code == 1) {
                    this.setData({
                        "details.is_guan": 0
                    })
                }
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var scene = decodeURIComponent(options.scene)
        // 获取详情
        wx.request({
            url: app.globalData.host + '/index/hudong/GetQuanInfo',
            data: {
                quan_id: options.quan_id || scene,
                user_id: app.globalData.user_id
            },
            success: (res) => {
              console.log(res)
                res.data.filepath = app.globalData.host + res.data.filepath;
                res.data.thumbpath = app.globalData.host + res.data.thumbpath;
                res.data.add_time = utils.formatTime(res.data.add_time, 'Y-M-D');

                if(res.data.logo_path!=null){
                    res.data.logo_path = app.globalData.host + res.data.logo_path;
                }
                this.setData({
                    details: res.data
                })
            }
        });
        // 获取评论
        wx.request({
            url: app.globalData.host + '/index/hudong/GetQuanComment',
            data: {
                user_id:app.globalData.user_id,
                quan_id: options.quan_id || scene,
            },
            success: (res) => {
                for (var i = 0; i < res.data.length; i++) {
                    res.data[i].add_time = utils.formatTime(res.data[i].add_time, 'Y-M-D');
                }
                this.setData({
                    pinglunList: res.data
                })
                console.log(res)
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