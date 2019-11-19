// pages/personalCenter/gerenzhuye/index/index.js
var app = getApp()
var utils = require('../../../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo2: {}, //个人信息
        yifabuList: [], //已发布列表
        yitougaoList: [], //已投稿列表
        yiguanzhuList: [], //关注人列表
        tab: ['已发布', '已关注'],  //
        active: 0 ,//选中的tap页
    },
    // 选项卡切换
    tab: function(e) {
        this.setData({
            active: e.currentTarget.dataset.index
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      if (options.type==1){
        this.setData({
          active: 1
        })
      }
        //全局变量中获取个人信息.
        this.setData({
            userInfo2: app.globalData.userInfo2
        })
        // 请求已发布的信息
        wx.request({
            url: app.globalData.host + '/index/user/GetUserFabu',
            data: {
                user_id: app.globalData.user_id
            },
            success: (res) => {
                var list = res.data.list;
                for (var i = 0; i < list.length; i++) {
                    list[i].time1 = utils.formatTime(list[i].add_time, 'Y-M-D');
                    if (list[i].logo!=null){
                        list[i].logo = app.globalData.host + list[i].logo
                    }
                }
                this.setData({
                    yifabuList: list
                })
                console.log(list)
            }
        })
        // 请求已投稿
        wx.request({
            url: app.globalData.host + '/index/user/GetUserTg',
            data: {
                user_id: app.globalData.user_id
            },
            success: (res) => {
                var list = res.data.list;
                for (var i = 0; i < list.length; i++) {
                    list[i].time1 = utils.formatTime(list[i].create_time, 'Y-M-D');
                    if (list[i].thumbpath!=''){
                        list[i].thumbpath = app.globalData.host + list[i].thumbpath
                    }
                    if (list[i].logo != null) {
                        list[i].logo = app.globalData.host + list[i].logo
                    }
                }
                this.setData({
                    yitougaoList: list
                })
        
            }
        })
        // 请求我关注人的列表
        wx.request({
            url: app.globalData.host + '/index/user/GetUserList',
            data: {
                user_id: app.globalData.user_id
            },
            success: (res) => {
                for (var i = 0; i < res.data.length; i++) {
                    res.data[i].time1 = utils.formatTime(res.data[i].add_time, 'Y-M-D');
                }
                this.setData({
                    yiguanzhuList: res.data
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
        console.log(e);
        var share = e.target.dataset;
        return {
            title: share.title,
            path: share.path + share.id,
            imageUrl: share.img,
        }
    }
})