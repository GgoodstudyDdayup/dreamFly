// pages/videosearch/videosearch.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: '日期',
    goodsList: [],
    message: '',
  },
  bindRegionChange: function (e) {
    console.log(e)
    this.setData({
      region: e.detail.value
    })
  },
  toSearch: function () {
    this.addVideoComments();
  },
  // 搜索商品
  addVideoComments: function () {
    var time = this.data.region
    if (time == '日期') {
     // time = (new Date()).getFullYear() + '-' + ((new Date()).getMonth() + 1)
     time=''
    }
    wx.request({
      url: app.globalData.host + '/index/ticket/searchMusic',
      method: 'get',
      data: {
        // article_id: this.data.videoId,
        time: time,
        name: this.data.message
        // page: '1',
        // hot: ''
      },
      success: res => {
        if (res.data.msg == "获取失败" || res.data.msg == "未找到数据") {
          this.setData({
            goodsList: false
          })
          return false
        }
        this.setData({
          goodsList: res.data.data
        })
        // console.log(this.data.goodsList)
      }
    })
  },
  // input双向绑定数据
  inputedit: function (e) {
    console.log(e)
    // let value = e.detail.value;
    console.log(e.detail.value)
    // this.data[dataset.obj][dataset.item] = value;
    this.setData({
      message: e.detail.value
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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