// pages/video/video.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoList: [],
    isVideoList: true,
    host: app.globalData.host,
    type: 0
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
        // console.log(res)
        if(res.data.msg) {
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
    wx.setNavigationBarTitle({
      title: options.type
    })
    // if (options.type == "电音节") {
    //   if (this.data.tabindex) {
    //     this.getVideoList({ // 资讯
    //       url: '/index/ticket/getMusicVideoDetail',
    //       page: 1
    //     })
    //   } else {
    //     this.getVideoList({ // 商城
    //       url: '/index/article/GetArticleMusic',
    //       page: 1
    //     })
    //   }
    // } else
    if (options.type == "活动" || options.type == "热门活动") {
      wx.setNavigationBarTitle({
        title: "活动"
      })
      this.getVideoList({
        url: '/index/article/GetArticleHuo',
        page: 1
      })
    } else if (options.type == "夜店") {
      this.setData({
        type: 1
      })
      this.getVideoList({
        url: '/index/article/GetArticleDian',
        page: 1
      })
    } 
    // else if (options.type == "热门活动") {
    //   this.getVideoList({
    //     url: '/index/article/GetArticleRe',
    //     page: 1
    //   })
    // }
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