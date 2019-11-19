// pages/personalCenter/personalCenter.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */

  data: {
    show_mask: true,
    userInfo: {},
    userInfo2: {}, //详细信息
    hasUserInfo: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    serviceTF: false,
    nickName: '', //修改昵称
    tanchuang: false, //修改昵称弹窗
    xiala: false, // 下拉二维码
    erWeiMa: ''
  },
  // 请求个人详细信息
  getDetailsUserInfo: function() {
    wx.request({
      url: app.globalData.host + '/index/user/GetUserInfo',
      data: {
        user_id: app.globalData.user_id,
      },
      success: (res) => {
         console.log(res, "请求个人详细信息")
        if (res.data.nickname == null || res.data.nickname == '') {
          // 用户未授权
          this.setData({
            hasUserInfo: false
          })
        } else {
          // 编号补够6位
          // res.data.card_id = this.fn2(res.data.user_id, 6)
          res.data.card_id = res.data.user_id
          this.setData({
            userInfo2: res.data
          })
          app.globalData.userInfo2 = res.data
        }

      }
    })
   
  },
  changeTouxiang:function(){

  },
  ordercode:function(){
    console.log('111');
    // 获取最近订单
    wx.request({
      url: app.globalData.host + '/index/ticket/getNewestOrder',
      method: 'get',
      data: {
        user_id: app.globalData.userInfo2.user_id
      },
      success: res => {
        var order_id = res.data.data.order_id
        // 获取二维码
        wx.request({
          url: app.globalData.host + '/index/shop/ordercode',
          method: 'get',
          data: {
            order_id: order_id,
            page: `pages/verify/verify`
          },
          success: res => {
            // console.log('二维码');
            // console.log(res)
            this.setData({
              erWeiMa: res.data.url
            })
          }
        })
      }
    })
  },
  //获取用户信息并保存到服务器
  getUserInfo: function(e) {
    // console.log(e, "getuserinfo")
    if (e.detail.userInfo) {
      // 已授权
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        hasUserInfo: true
      })
    } else {
      console.log("拒绝授权")
      return
    }

    // 将微信信息存到服务器
    wx.request({
      url: app.globalData.host + '/index/user/SetUserInfo',
      data: {
        city: app.globalData.userInfo.city,
        country: app.globalData.userInfo.country,
        gender: app.globalData.userInfo.gender,
        nickname: app.globalData.userInfo.nickName,
        province: app.globalData.userInfo.province,
        openid: app.globalData.openid,
        head_img: e.detail.userInfo.avatarUrl
      },
      success: (res) => {
        console.log(res)
        // 调取最新的用户信息
        this.getDetailsUserInfo()
      }
    })
  },
  // 修改头像
  changeTouxiang: function () {
    console.log("修改头像");
    var that = this
    // 选择图片文件
    wx.chooseImage({
      success: (res) => {
        const tempFilePaths = res.tempFilePaths;
        // 上传图片
        wx.uploadFile({
          url: app.globalData.host + '/index/index/uploadfile',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            user_id: app.globalData.user_id
          },
          success: (res) => {
            // 修改头像
            var img_src = res.data;
            wx.request({
              url: app.globalData.host + "/index/user/UpdateHeadImg",
              data: {
                user_id: app.globalData.user_id,
                head_img: app.globalData.host + img_src
              },
              // 上传头像成功重新调用接口
              success: (res) => {
                this.getDetailsUserInfo()
              }
            });

          }
        })
      }
    })
  },
  // 下拉显示门票
  xiala: function() {
    this.setData({
      xiala: !this.data.xiala
    })
  },
  //修改昵称
  changeNickName: function() {
    wx.request({
      url: app.globalData.host + '/index/user/SetUserName',
      data: {
        user_id: app.globalData.user_id,
        user_name: this.data.nickName
      },
      success: (res) => {
        if (res.data.code == 1) {
          wx.showToast({
            title: '修改昵称成功',
          })
          this.closeTanchuang()
          this.getDetailsUserInfo()
        }

      }
    })
  },
  // 修改头像
  changeTouxiang: function() {
    var that = this
    // 选择图片文件
    wx.chooseImage({
      success: (res) => {
        const tempFilePaths = res.tempFilePaths;
        // 上传图片
        wx.uploadFile({
          url: app.globalData.host + '/index/index/uploadfile',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            user_id: app.globalData.user_id
          },
          success: (res) => {
            // 修改头像
            var img_src = res.data;
            wx.request({
              url: app.globalData.host + "/index/user/UpdateHeadImg",
              data: {
                user_id: app.globalData.user_id,
                head_img: app.globalData.host + img_src
              },
              // 上传头像成功重新调用接口
              success: (res) => {
                this.getDetailsUserInfo()
              }
            });

          }
        })
      }
    })
  },

  // 开通VIP
  creatorder: function() {

    wx.request({
      url: app.globalData.host + '/apppic/article/prepayOrder',
      data: {
        openid: app.globalData.openid
      },
      success: (res) => {
        var orderid = res.data.data; //订单Id
        wx.showModal({
          title: '提示',
          content: "确定支付一年的VIP？",
          success: (res) => {
            if (res.confirm) {
              this.buy(orderid)
            } else {
              console.log('用户点击取消')
            }
          }
        })
      }
    })
  },
  // 订单支付
  buy: function(orderid) {
    let pay = new Promise((resolve, reject) => {
      wx.request({
        url: app.globalData.host + '/apppic/pay/wechat_app_pay',
        data: {
          oid: orderid,
          openid: app.globalData.openid
        },
        success: function(res) {
          console.log(res)
          let order_id = res.data.data;
          resolve(res.data.data)
        }
      })
    })
    let pay2 = pay.then(
      data => {
        return new Promise((resolve, reject) => {
          console.log('吊起微信支付data:', data);
          if (data.return_code == 'error') {
            wx.showModal({
              title: '支付出错',
              content: data.return_message.return_msg,
            })
          } else {
            wx.requestPayment({
              'timeStamp': data.timeStamp.toString(),
              'nonceStr': data.nonceStr,
              'package': data.package,
              'signType': data.signType,
              'paySign': data.paySign,
              'success': function(res) {
                console.log('支付成功：', res);
                resolve(data.package)
              },
              'fail': function(res) {
                wx.showToast({
                  title: '用户取消支付',
                })
                console.log('支付取消：', res);
              }
            })
          }
        })
      }
    )
    let pay3 = pay2.then(
      res => {
        console.log('支付成功：', res);
        wx.request({
          url: app.globalData.host + '/apppic/pay/notify',
          data: {
            orderid: orderid,
            formid: res,
            openid: app.globalData.openid
          },
          success: res => {
            wx.showToast({
              title: '购买成功~',
            })
            console.log('成功购买:', res);
          }
        })
      }
    )
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if(wx.getStorageSync('user_phone')){
      this.setData({
        show_mask:false
      })
    }
    this.getDetailsUserInfo()
  },
  // 编号补6位
  fn2: function(num, length) {
    return ("0000000000000000" + num).substr(-length);
  },
  toMyOrder: function() {
    wx.navigateTo({
      url: 'myOrder/myOrder'
    })
  },
  toTougao: function() {
    wx.navigateTo({
      url: 'tougao/tougao'
    })
  },
  toShoucang: function() {
    wx.navigateTo({
      url: 'shoucang/shoucang'
    })
  },
  service() {
    console.log("点击客服");
    var that = this;
    that.setData({
      serviceTF: true
    })
  },
  guanbiService() {
    console.log("点击关闭客服");
    var that = this;
    that.setData({
      serviceTF: false
    })
  },
  // 打开弹窗
  showTanchuang: function() {
    this.setData({
      tanchuang: true
    })
  },
  // 关闭弹窗
  closeTanchuang: function() {
    this.setData({
      tanchuang: false
    })
  },
  // 获取输入框的内容
  setValue: function(e) {
    var data = e.detail.value
    this.setData({
      nickName: data
    })
  },

  // 跳转意见反馈
  toyijian: function() {
    wx.navigateTo({
      url: 'yijian/yijian'
    })
  },
  togerenzhuye: function() {
    wx.navigateTo({
      url: '/pages/personalCenter/gerenzhuye/index/index'
    })
  },
  toDuihuan: function() {
    wx.navigateTo({
      url: '/pages/personalCenter/duihuan1/duihuan1',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3
      })
    }
    this.ordercode();
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

  },
  cancel() {
    let that = this;
    that.setData({
      show_mask: false
    })
  },
  // 获取手机号
  getPhone(e) {
    let that = this;
    console.log('获取手机号e:', e);
    console.log('globalData:', app.globalData);
    wx.request({
      url: app.globalData.host + '/index/index/GetMusiciPhone',
      data: {
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
        user: app.globalData.user_id,
      },
      success: (res) => {
        console.log('获取手机号返回结果:', res);
        if (res.data.code == '1') {
          that.setData({
            show_mask: false
          })
          wx.setStorageSync('user_phone', res.data.data)
        } else {
          wx.showModal({
            title: '失败',
            content: '授权失败~',
          })
        }
      }
    })
  },
  //  保存图片
  savePicture: function () {
    var that=this;
    console.log(this.erWeiMa);
    wx.showModal({
      title: '提示',
      content: '是否保存二维码？',
      success: function (res) {
        if (res.confirm) {

          wx.downloadFile({
            url: that.data.erWeiMa,     //仅为示例，并非真实的资源
            success: function (res) {
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