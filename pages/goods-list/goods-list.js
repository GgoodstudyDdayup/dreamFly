// pages/goods-list/goods-list.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav: ["商城", "资讯"],
    tabindex: 0,
    goodsList: [],
    isDianyin: true
  },
  // 跳转到视频搜索页 
  toSearch: function () {
    wx.navigateTo({
      url: '/pages/videosearch/videosearch',
      success: () => {

      }
    })
  },
  // 切换tab栏
  tabchange: function (e) {
    this.setData({
      tabindex: e.currentTarget.dataset.index
    })
    console.log(this.data.tabindex)
    if (this.data.tabindex) {

      this.getGoodsList({

        url: '/index/article/GetArticleMusic',
        data: { page: 1 },
        method: 'post',
      })
    
    } else {
      wx.request({
        url: app.globalData.host + '/index/ticket/getPreMusicList',
        // url: app.globalData.host + '/index/index/GetMusicPageList',
        method: 'post',
        data: { page: 1 },
        success: (res) => {
          this.setData({
            goodsList: res.data.data
          })
           console.log(this.data.goodsList)
        }
      })
    }
  },
  // 获取视频列表
  getGoodsList: function (data) {
    wx.request({
      url: app.globalData.host + data.url,
      method: data.method || 'get',
      data,
      success: (res) => {
        this.setData({
          goodsList: res.data
        })
         console.log(this.data.goodsList)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // if (options.type == "官方推荐") {
    //   wx.setNavigationBarTitle({
    //     title: options.type
    //   })
    //   this.getGoodsList({
    //     url: '/index/article/GetArticle',
    //     data: {},
    //     method: 'post',
    //   })
    //   this.setData({
    //     isDianyin: false
    //   })
    // } else {
      wx.request({
        url: app.globalData.host + '/index/ticket/getPreMusicList',
        // url: app.globalData.host + '/index/index/GetMusicPageList',
        method: 'post',
        data: { page: 1 },
        success: (res) => {
          this.setData({
            goodsList: res.data.data
          })
           console.log(this.data.goodsList)
        }
      })
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