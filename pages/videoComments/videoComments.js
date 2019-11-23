// pages/videoComments/videoComments.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host: app.globalData.host,
    comments: [],
    message: '',
    videoId: 0,
    videoDetails: {},
    isIndex: true,
    videoComments: [],
    type: 0
  },
  // 获取视频详情
  getVideoDetails: function(id) {
    // // console.log(Boolean(this.data.isIndex))
    console.log(this.data.videoId)
    console.log(this.data.type)
    // if (Boolean(this.data.isIndex)) {
    // if(this.data.type==1){
    //   console.log('往期视频');
    //   this.getVideoAPI({
    //     url: '/index/article/GetMusicVide',
    //     data: {
    //       id: this.data.videoId
    //       // id: 13
    //     }
    //   })
    // }
    // else{
    this.getVideoAPI({
      url: '/index/article/GetArticleDetail',
      data: {
        id: this.data.videoId
        // id: 13
      }
    })
    // }

    // } else {
    //   this.getVideoAPI({
    //     url: '/index/ticket/getMusicVideoDetail',
    //     data: {
    //       id: this.data.videoId
    //       // id: 1
    //     }
    //   })
    // }
  },
  // 接口包装
  getVideoAPI: function(data) {
    console.log('视频详情');
    wx.request({
      url: this.data.host + data.url,
      method: data.method || 'get',
      data: data.data,
      success: res => {
        console.log(res);
        this.setData({
          videoDetails: res.data
        })
      }
    })
  },
  // 获取视频评论列表
  getVideoComments: function(article_id) {
    wx.request({
      url: this.data.host + '/index/video/ArticleCommentList',
      method: 'get',
      data: {
        // id: options.id
        article_id: this.data.videoId,
        // article_id: 13
      },
      success: res => {
        console.log('取视频评论列表')
        console.log(res)
        this.setData({
          videoComments: res.data.data
        })
      }
    })
  },
  // 添加视频评论
  addVideoComments: function() {
    if (this.data.message == '') {
      wx.showToast({
        title: '留言信息不能为空',
        icon: 'none',
      })
      return;
    }
    wx.request({
      url: this.data.host + '/index/video/addArticleComment',
      method: 'get',
      data: {
        article_id: this.data.videoId,
        // article_id: 13,
        comment: this.data.message,
        user_id: app.globalData.user_id
      },
      success: res => {
        console.log(res)
        this.getVideoComments()
        this.setData({
          message: ''
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
  onLoad: function(options) {
    console.log(options)
    this.setData({
      videoId: options.id,
      isIndex: options.isindex,
      type: options.type
    })
    this.getVideoDetails()
    this.getVideoComments()
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

})