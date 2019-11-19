// pages/personalCenter/gerenzhuye/yifabu/yifabu.js
var app = getApp()
var utils = require('../../../../utils/util.js');

Page({
    /**
     * 页面的初始数据
     */
    data: {
        userInfo2: {}, //个人信息
        dataList: [],
    },
    // 关注
    guanzhu: function(e) {
        wx.request({
            url: app.globalData.host + '/index/hudong/SetGuan',
            data: {
                status: 1,
                user_id: app.globalData.user_id,
                buser_id: this.data.userInfo2.user_id
            },
            success: (res) => {
                wx.showToast({
                    title: '关注成功'
                })
                this.setData({
                    is_guanzhu: true
                })
            }
        })
    },
    //取消关注
    qxguanzhu: function(e) {
        console.log(this.data.userInfo2.user_id)
        wx.request({
            url: app.globalData.host + '/index/hudong/SetGuan',
            data: {
                status: 0,
                user_id: app.globalData.user_id,
                buser_id: this.data.userInfo2.user_id
            },
            success: (res) => {
                wx.showToast({
                    title: '取消关注成功'
                })
                this.setData({
                    is_guanzhu: false
                })

            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options)
        //请求个人信息
        wx.request({
            url: app.globalData.host + '/index/user/GetUserFabu',
            data: {
                user_id: options.user_id
            },
            success: (res) => {
                var list = res.data.list;
                for (var i = 0; i < list.length; i++) {
                    list[i].time1 = utils.formatTime(list[i].add_time, 'Y-M-D');
                    if (list[i].logo!=null){
                        list[i].logo = app.globalData.host + list[i].logo;
                    }
                }
                this.setData({
                    dataList: list,
                    userInfo2: res.data.user_info
                })
                console.log(this.data.userInfo2)

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