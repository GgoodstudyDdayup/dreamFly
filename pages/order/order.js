// pages/order/order.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yinyuejie: {},
    // 获取用户实例
    address: '现场取票',
    userName: '',
    userPhone: '',
    userWx: '',
    ticket_id: '',
    passW: '',
    // 票价
    total: "",
    // 单价票价
    piaojia: '',
    ticketname: '', //票的类型
    num: 1, // input默认是1 
    // 使用data数据对象设置样式名  
    minusStatus: 'disabled',
    host: app.globalData.host,
    orderData: null,
    musicData: {},
    price: 0,
    ticketsWay:'现场取票',
    array: ['现场取票', '邮寄'],
  },
  toTicketsWayView:function(){

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
        console.log('获取手机号:', res);
        if (res.data.code == '1') {
          that.setData({
            userPhone: res.data.data
          })
        } else {
          wx.showModal({
            title: '失败',
            content: '获取手机号错误，请手动填写',
          })
        }
      }
    })
  },
  // 提交订单
  submitOrder: function () {
    // 表单验证
    var data = this.data;
    if (data.userName == "" || data.userPhone == '' || data.userWx == '' || data.address == '') {
      wx.showToast({
        title: '内容不能为空',
        icon: 'none',
        duration: 1000,
        mask: true
      });
      return false
    } else if (data.userPhone != Number && data.userPhone.length != 11) {
      wx.showToast({
        title: '手机号错误',
        icon: 'none',
        duration: 1000,
        mask: true
      });
      return false
    };

    console.log(this.data.orderData.number)
    wx.request({
      url: this.data.host + '/index/shop/SetOrder',
      method: 'get',
      // data: this.data.orderData,
      data: {
        ticket_id: this.data.ticket_id,
        number: this.data.orderData.number,
        money: this.data.piaojia,
        link_name: this.data.userName,
        link_tel: this.data.userPhone,
        link_addressed: this.data.address,
        link_wechat: this.data.userWx,
        music_id: this.data.music_id,
        user_id: app.globalData.user_id
      },
      success: res => {
       
        console.log('data')
        console.log(data)
        console.log('生产订单')
        console.log(res)
        if(res.data.status == "订单成功" && res.data.order_id) {
          // console.log(app.globalData)
          // 调用支付
          wx.request({
            url: this.data.host + '/apppic/pay/wechat_app_pay2',
            method: 'post',
            data: {
              oid: res.data.order_id,
              openid: app.globalData.userInfo2.openid
            },
            success: res => {
              console.log('微信支付')
              console.log(res)
              // 微信支付
              wx.requestPayment({
                timeStamp: String(res.data.data.timeStamp),
                signType: res.data.data.signType,
                nonceStr: res.data.data.nonceStr,
                package: res.data.data.package,
                paySign: res.data.data.paySign,
                success: res => {
                  wx.showToast({
                    title: '支付成功',
                  })
                  wx.switchTab({
                    url: '/pages/orderList/orderList?type=1'
                  })
                },
                fail: function(res) {
                  wx.showToast({
                    title: '用户取消支付',
                  })
                  // console.log('支付取消：', res);
                }
              })
            }
          })

        }
      }
    })
  },
  // 获取订单详情
  getOrder: function () {
    wx.request({
      url: this.data.host + '/index/index/GetMusicInfo',
      method: 'get',
      data: {
        music_id: this.data.orderData.music_id,
        user_id: this.data.orderData.user_id
      },
      success: res => {
        this.setData({
          musicData: res.data
        })
         console.log(this.data.musicData)
      }
    })
    wx.request({
      url: this.data.host + '/index/ticket/getMoney',
      method: 'get',
      data: {
        price: this.data.orderData.money,
        number: this.data.orderData.number
      },
      success: res => {
        this.setData({
          price: res.data.money
        })
        // console.log(this.data.price)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    this.setData({
      orderData: {
        user_id: options.user_id,
        music_id: options.music_id,
        number: options.number,
        money: options.money,
        ticket_id: options.ticket_id
      }
    })

    this.setData({
      total: options.piaojia,
      piaojia: options.piaojia,
      ticket_id: options.ticket_id,
      ticketname: options.ticketname,
      music_id: options.music_id
    })
    // console.log(this.data.orderData)
    this.getOrder()
  },

  bindPickerChange: function (e) {
    var value = e.detail.value;
    if (value==1) {
      this.setData({
        ticketsWay: '邮寄',
        address: ''
      })
    } else {
      this.setData({
        ticketsWay: '现场取票',
        address: '现场取票'
      })
    }
  },
  /* 输入框事件 */
  bindManual: function (e) {
    var num = e.detail.value;
    // 将数值与状态写回  
    this.setData({
      num: num
    });
  },
  //输入用户名
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  userNamePhone: function (e) {
    this.setData({
      userPhone: e.detail.value
    })
  },
  userNameAdress: function (e) {
    this.setData({
      address: e.detail.value
    })
  },
  userNameWx: function (e) {

    this.setData({
      userWx: e.detail.value
    })
    console.log(this.data.userWx)
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