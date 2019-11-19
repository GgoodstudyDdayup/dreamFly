// pages/taoTicket/taoTicket.js
// pages/video/video.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoList: [],
    isVideoList: true,
    host: app.globalData.host
  },
  // 获取视频列表
  getVideoList: function (data) {

    wx.request({
      url: app.globalData.host + data.url,
      method: 'post',
      data: {
        page: data.page
      },
      success: (res) => {
        console.log(res)
        if (res.data.msg) {
          this.setData({
            isVideoList: false
          })
          return false
        }
        this.setData({
          videoList: res.data
        })
        console.log(this.data.videoList)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.getVideoList({
      url: '/index/tao/GetTaoList',
      page: 1,
      pagelimit: 1000,
    })

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

  },
  toDetails: function (e) {

    console.log(e)
    wx.navigateTo({
      url: '/pages/goodsDetails/goodsDetails?item=' + JSON.stringify(e.currentTarget.dataset.item),
    })
  }
})