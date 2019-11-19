// pages/goodsDetails/goodsDetails.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsdetails: '',
    message:'',
    item: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let item = JSON.parse(decodeURIComponent(options.item));
    this.setData({
          item: item
        })
    wx.request({
      url: app.globalData.host + '/index/tao/GetTaoInfo',
      method: 'post',
      data: {
        tao_id: item.tao_id,
    
      },
      success: (res) => {
        console.log('淘票详情');
        console.log(res);
        this.setData({
          goodsdetails: res.data
        })
      }
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
   // input双向绑定数据
    inputedit: function (e) {
    // console.log(e)
    // let value = e.detail.value;
    // this.data[dataset.obj][dataset.item] = value;
    this.setData({
      message: e.detail.value
    });
  },
  // 添加视频评论
  addVideoComments: function () {
    if (this.data.message == '') {
      wx.showToast({
        title: '留言信息不能为空',
        icon: 'none',
      })
      return;
    }
    console.log(this.data.item.tao_id);
    console.log(app.globalData.user_id);
    console.log(this.data.message);
var that=this;
    wx.request({
      url: app.globalData.host + '/index/tao/SetTaoComment',
      data: {
        tao_id: that.data.item.tao_id,
        user_id: app.globalData.user_id,
        content: that.data.message
      },
      method: 'POST',
      success: (res) => {
        if (res.data.code == 1) {
          wx.showToast({
            title: '评论成功，请等待审核',
            icon: 'succes',
            duration: 1000,
            
          })
        }
      }
    })
  },
  //   wx.request({
  //     url: app.globalData.host + '/index/tao/SetTaoComment',
  //     data: {
  //       tao_id: this.data.goodsdetails.tao_id,
  //       user_id: app.globalData.user_id,
  //       content: this.data.message,
  //     },
  //     method: 'POST',
  //     success: (res) => {
  //       if (res.data.code == 1) {
  //         wx.showToast({
  //           title: '评论成功，请等待审核',
  //           icon: 'succes',
  //           duration: 1000,
  //         })
  //       }
  //     }
  //   })
  // },
})