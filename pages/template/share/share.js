const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    shareId: Number,
    shareImg: String,
    shareTitle: String,
    sharePath: String,
    codepath: String,
    shareType: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    // shareFriend: false, //分享好友弹窗
    canvaShow: false,
    painting: {}, //绘制canvas的数据
    host: app.globalData.host
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 打开好友弹窗
    openShareFriend: function(e) {
      var dataset = e.target.dataset;
      var details = {
        music_id: dataset.music_id,
        name: dataset.name,
        thumb_path: dataset.thumb_path
      };
      this.setData({
        shareFriend: true,
        details: details
      })
    },
    // 关闭分享弹窗
    closeShareFriend: function() {
      this.setData({
        shareFriend: false,
      })
    },
    //canvas开始点击分享朋友圈调用此函数
    getImg: function() {
      let that = this;
      wx.showLoading({
        title: '图片生成中',
      })
      //对于非音乐节的分享调用此接口
      console.log('that:', that);
      console.log(that.data.shareType)
      if (that.data.shareType) {
        let p1 = new Promise((resolve, reject) => {
          var url = "https://www.dreamflygo.com/index/code/sharequanimg?page=" + this.data.codepath + "&scene=" + this.data.shareId + "&type=" + this.data.shareType
          wx.request({
            url,
            success(res) {
              console.log('非音乐节分享请求图片：', res)
              resolve(res.data.umgurl)
            }
          })
        })
        p1.then((umgurl) => {
          wx.downloadFile({
            url: umgurl,
            success: (res) => {
              console.log(res)
              console.log('非音乐节分享下载之后：', res.tempFilePath)
              wx.hideLoading()
              wx.previewImage({
                current: res.tempFilePath,
                urls: [res.tempFilePath]
              })
            }
          })
        })
        that.setData({
          shareFriend: false,
        })
        return 0;
      }
      // 对于音乐节的分享
      let p1 = new Promise((resolve, reject) => {
        var url = "https://www.dreamflygo.com/index/code/shareimg?page=" + this.data.codepath + "&scene=" + this.data.shareId
        wx.request({
          url,
          success(res) {
            console.log('请求图片：', res)
            resolve(res.data.umgurl)
          }
        })
        // wx.downloadFile({
        //   url: this.properties.shareImg || 'https://www.dreamflygo.com/img/xianchang.jpg',
        //   success: (res) => {
        //     console.log(res)
        //     resolve(res.tempFilePath)
        //   }
        // })
      })
      p1.then((umgurl) => {
        wx.downloadFile({
          url: umgurl,
          success: (res) => {
            console.log(res)
            console.log('下载之后：', res.tempFilePath)
            wx.hideLoading()
            wx.previewImage({
              current: res.tempFilePath,
              urls: [res.tempFilePath]
            })
          }
        })
      })
      that.setData({
        shareFriend: false,
      })

      return 0;
      //下载二维码
      let p2 = new Promise((resolve, reject) => {
        // var url = "https://www.dreamflygo.com/index/code/GetQRCode?page=" + this.data.codepath + "&scene=" + this.data.shareId
        wx.downloadFile({
          url: url,
          success: (res) => {
            console.log('', res.tempFilePath)
            resolve(res.tempFilePath)
          }
        })
      })
      Promise.all([p1, p2]).then((result) => {
        console.log(result, "图片下载成功") //['成功了', 'success']
        var width = wx.getSystemInfoSync().screenWidth //屏幕宽度
        var height = wx.getSystemInfoSync().screenHeight //屏幕高度
        this.setData({
          painting: {
            width: width,
            height: 1134 / 1334 * height,
            views: [{
                type: 'rect',
                background: '#fff',
                top: 0,
                left: 0,
                width: width,
                height: 1134 / 1334 * height,
              },
              // 封面
              {
                type: 'image',
                url: result[0],
                top: 0,
                left: 0,
                width: width,
                height: 403 / 1334 * height
              },
              // // 标题
              {
                type: 'text',
                content: this.data.shareTitle,
                fontSize: 16,
                color: '#402D16',
                textAlign: 'left',
                top: 444 / 1334 * height,
                left: 30 / 750 * width,
                width: 500 / 750 * width,
                MaxLineNumber: 2,
                breakWord: true,
              },
              // // 公众号
              {
                type: 'text',
                content: "微信小程序[DreamFly电音之旅]",
                fontSize: 14,
                color: '#402D16',
                textAlign: 'left',
                top: 533 / 1334 * height,
                left: 30 / 750 * width,
              },
              // 横线
              {
                type: 'image',
                url: '/pages/images/canvas_line.png',
                top: 600 / 1334 * height,
                left: 30 / 750 * width,
                width: 650 / 750 * width,
                height: 2
              },

              // 二维码
              {
                type: 'image',
                url: result[1],
                top: 650 / 1334 * height,
                left: 53 / 750 * width,
                width: 233 / 750 * width,
                height: 233 / 1334 * height
              },
              {
                type: 'text',
                content: "扫码或长按小程序码",
                fontSize: 12,
                color: '#402D16',
                textAlign: 'left',
                top: 745 / 1334 * height,
                left: 410 / 750 * width,
              },
              {
                type: 'text',
                content: "查看详情",
                fontSize: 12,
                color: '#402D16',
                textAlign: 'left',
                top: 795 / 1334 * height,
                left: 410 / 750 * width,
              },
            ]
          }
        })
      }).catch((error) => {
        console.log(error)
      })
    },
    // 绘图完成后预览
    eventGetImage: function(e) {
      wx.hideLoading()
      console.log(e, '预览')
      wx.previewImage({
        current: e.detail.tempFilePath,
        urls: [e.detail.tempFilePath]
      })
    }
  },
  attached: function() {
    this.setData({
      is_shareFriend: app.globalData.is_shareFriend
    })
  },
  
  
})