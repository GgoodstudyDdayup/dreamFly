// pages/details/details.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav: ["详情", "群组", "视频", '淘票'],
    tabindex: null,
    openclass: 'wr-bottom', //展开更多
    openclass2: 'wr-bottom', //展开更多
    // tapindex: null, //选项卡切换
    // ticket: {} //票的信息
    isModal: false, // 对话框
    // time: ['2019-09-27 周五 19:30'], // 时间选择
    // timeSelect: null,
    price: ['380元', '580元', '1380元'], // 价格选择
    priceSelect: 0,
    priceMoney: 0,
    select: true,
    host: app.globalData.host,
    music_id: 28,
    goodsDetails: {},
    talkList: [],
    videoList: [],
    priceNum: 1,
    type: 0,
    modaltype: '',
    taoPiaoList: [],
    shareFriend: false
  },
  // 
  addressCopy() {
    const that = this
    let addressCopy = that.data.goodsDetails.data.site
    wx.setClipboardData({
      data: addressCopy,
      success(res) {
        wx.getClipboardData({
          success(res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },
  getTaoPiaoList: function() {
    wx.request({
      url: this.data.host + '/index/tao/getMusicTao',
      method: 'get',
      data: {
        music_id: this.data.music_id || this.data.scene,
      },
      success: (res) => {

        console.log("淘票界面")
        console.log(res)
        this.setData({
          taoPiaoList: res.data.data
        })
        console.log(this.data.taoPiaoList)

      }
    })
  },

  // 获取详情
  getDetails: function() {
    wx.request({
      url: this.data.host + '/index/Ticket/getMusicDetail',
      method: 'get',
      data: {
        music_id: this.data.music_id || this.data.scene
      },
      success: res => {
        console.log('获取详情')
        console.log(res);
        this.setData({
          tabindex: 0,
          goodsDetails: res.data,
          fds: 2,
          price: res.data.cate,
          priceMoney: res.data.cate[0]
        })
      }
    })
  },
  // 获取讨论组列表
  getTalkGroup: function() {
    wx.request({
      url: this.data.host + '/index/ticket/getGroupList',
      method: 'post',
      data: {
        music_id: this.data.music_id || this.data.scene,
        page: 1
      },
      success: res => {
        console.log('获取讨论组列表')
        console.log(res)
        this.setData({
          talkList: res.data.data ? res.data.data : []
        })
        // console.log(this.data.goodsDetails)
      }
    })
  },
  // 获取往期视频列表
  getVideoList: function() {
    wx.request({
      url: this.data.host + '/index/ticket/getVideoReform',
      method: 'post',
      data: {
        music_id: this.data.music_id || this.data.scene,
        page: 1
      },
      success: res => {
        console.log('获取往期视频列表')
        console.log(res)
        this.setData({
          videoList: res.data.data ? res.data.data : []
        })
        // console.log(this.data.videoList)
      }
    })
  },
  /**
   * 展开详情
   */
  onopen: function() {
    this.setData({
      openclass: "openone"
    })
  },
  closexiangqing: function() {
    this.setData({
      openclass: "wr-bottom"
    })
  },
  /**
   * 展开详情2
   */
  onopen2: function() {
    this.setData({
      openclass2: "openone"
    })
  },
  closexiangqing2: function() {
    this.setData({
      openclass2: "wr-bottom"
    })
  },
  // 切换tab栏
  tabchange: function(e) {
    this.setData({
      tabindex: e.currentTarget.dataset.index
    })
  },
  // 对话框
  isShowModal: function(e) {
    // console.log(e)
    this.setData({
      isModal: e.currentTarget.dataset.isboolean,
      modaltype: e.currentTarget.dataset.modaltype
    })
  },
  // 选择场次
  // handleTimeSelect: function (val) {
  //   // console.log(val)
  //   this.setData({
  //     timeSelect: val.currentTarget.dataset.index
  //   })
  // },
  // 选择票档
  handlePriceSelect: function(val) {
    this.setData({
      priceSelect: val.currentTarget.dataset.index,
      priceMoney: this.data.price[val.currentTarget.dataset.index]
    })
    // console.log(this.data.priceMoney)
  },
  // 减少票
  minusPrice: function() {
    var priceNum = this.data.priceNum
    if (priceNum <= 1) {
      return false
    } else {
      priceNum--
      this.setData({
        priceNum
      })
    }
  },
  // 增加票
  addPrice: function() {
    var priceNum = this.data.priceNum
    priceNum++
    this.setData({
      priceNum
    })
  },
  // 跳转提交订单页
  toorder: function() {
    const user_id = app.globalData.userInfo2.user_id
    const music_id = this.data.music_id
    const scene = this.data.scene
    const number = this.data.priceNum
    const money = this.data.priceMoney.money
    const ticket_id = this.data.priceMoney.ticket_id
    wx.navigateTo({
      url: `../order/order?user_id=${user_id}&music_id=${music_id || scene}&number=${number}&money=${money}&ticket_id=${ticket_id}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    console.log(options)
    this.setData({
      music_id: options.musicid,
      type: options.type || 0,
      scene: options.scene
    })
    this.getDetails()
    this.getTalkGroup()
    this.getVideoList()
    this.getTaoPiaoList()
  },
  toDetails: function(e) {

    console.log(e)
    wx.navigateTo({
      url: '/pages/goodsDetails/goodsDetails?item=' + JSON.stringify(e.currentTarget.dataset.item),
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.toast = this.selectComponent('#toast')
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
    this.toast.closeShareFriend()
    console.log(111)
  },
  //  保存图片
  savePicture: function() {
    wx.showModal({
      title: '提示',
      content: '是否保存二维码？',
      success: function(res) {
        if (res.confirm) {

          wx.downloadFile({
            url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572778857692&di=bacce7c96295808cf8871e050fa2f90a&imgtype=0&src=http%3A%2F%2Fimg5.cache.netease.com%2Fgame%2F2014%2F6%2F12%2F2014061216555650c3d.png', //仅为示例，并非真实的资源
            success: function(res) {
              // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
              if (res.statusCode === 200) {
                wx.saveImageToPhotosAlbum({
                  filePath: res.tempFilePath,
                  success(res) {
                    wx.showToast({
                      title: '保存图片成功！',
                    })
                  },
                  fail(res) {
                    wx.showToast({
                      title: '保存图片失败！',
                    })
                  }
                })
              }
            }
          })

        } else {

        }

      }
    })


  }

})