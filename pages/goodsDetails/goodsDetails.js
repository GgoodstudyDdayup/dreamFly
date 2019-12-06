// pages/goodsDetails/goodsDetails.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsdetails: '',
    message: '',
    item: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
  // input双向绑定数据
  inputedit: function(e) {
    // console.log(e)
    // let value = e.detail.value;
    // this.data[dataset.obj][dataset.item] = value;
    this.setData({
      message: e.detail.value
    });
  },
  // 添加视频评论
  addVideoComments: function() {
    const item = this.data.item
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
    var that = this;
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
            title: '评论成功',
            icon: 'none',
            duration: 2000,
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
              console.log(res.data.commentList.length)
              this.setData({
                message: '',
                goodsdetails: res.data,
                bottomView: `bottom${res.data.commentList.length - 1}`
              })
              console.log(this.data.bottomView)
            }
          })
        }else{
          wx.showToast({
            title: '评论失败',
          })
          this.setData({
            message: '',
          })
        }
      }
    })
  },
})