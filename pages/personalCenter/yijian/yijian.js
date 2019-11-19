// pages/comment/pinglun.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        text: '',
    },
    getContent: function(e) {
        this.setData({
            text: e.detail.value
        })
    },
    upSubmit: function() {
      // 表单验证
      var data = this.data;
      if (data.text == "") {
        wx.showToast({
          title: '内容不能为空',
          icon: 'none',
          duration: 1000,
          mask: true
        });
        return false
      } 
        wx.request({
            url: app.globalData.host + '/index/user/SetFankui',
            data: {
                user_id: app.globalData.user_id,
                content: this.data.text
            },
            success: (res) => {
                console.log(res)
                if (res.data.msg == "反馈成功") {
                    wx.showToast({
                        title: '反馈成功',
                        icon: 'succes',
                        duration: 1000,
                        success: function(res) {
                            setTimeout(() => {
                                wx.redirectTo({
                                    url: '../personalCenter'
                                })
                            }, 1000);
                        }
                    })
                }
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {},
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