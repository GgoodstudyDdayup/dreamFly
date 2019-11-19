// pages/myfriend/myfriend.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isUser: false,
    text: '请先登录',
    friendList: []
  },
  // 获取好友列表
  getFriendList: function () {
    wx.request({
      url: app.globalData.host + '/index/friend/getFriendList',
      method: 'post',
      data: {
        user_id: app.globalData.user_id
        // user_id: 277
      },
      success: (res) => {
        if(res.data.msg == "还没有好友哦") {
          this.setData({
            text: res.data.msg
          })
        } else {
          this.setData({
            isUser: true,
            friendList: res.data.data
          })
          // console.log(this.data.friendList)
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getFriendList()
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