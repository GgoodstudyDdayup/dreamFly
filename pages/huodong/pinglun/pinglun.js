// pages/comment/pinglun.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        text: '',
        tu: [{
            imaone: "/pages/images/huatong.png",
            imgtwo: "/pages/images/xiangji.png",
            imagesthree: "/pages/images/shexiang.png",
            jiantou: "/pages/images/302.png"
        }, ]
    },
    getContent: function(e) {
        this.setData({
            text: e.detail.value
        })
    },
    upSubmit: function() {
        wx.request({
            url: app.globalData.host + '/index/index/SetComment',
            data: {
                music_id: this.data.music_id,
                user_id: app.globalData.user_id,
                content: this.data.text
            },
            success: (res) => {
                if (res.data.res == 1) {
                    wx.showToast({
                        title: '评论成功，请等待审核',
                        icon: 'succes',
                        duration: 1000,
                        success: function(res) {
                            setTimeout(function() {
                                wx.navigateBack({
                                    delta: 1
                                })
                            }, 1000)
                        }
                    })
                }
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            music_id: options.music_id
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