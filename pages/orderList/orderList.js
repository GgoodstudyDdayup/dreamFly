// pages/shopping-mall/shopping-mall.js
var time = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: '',
    // 点赞的图片
    weidianzan: '/pages/images/zan.png',
    yidianzan: '/pages/images/zanBG.png',
    yinyuejie: [],
    page: 1, //页数
    // 年份pick数据
    array: ['2019', '2020', '2021'],
    nav: ["待付款", "已支付"],
    tabindex: 0,
    index: 0,
    year: "2019",
    //piker数据结束
    monthindex: 0,
    month: "",
    //月份piker数据结束
    is_pay: 0,
    payList: [],
    nopay: [],
    payed: [],
    host: app.globalData.host,
    money: 0, // 合计
    isSelectAll: false
  },

  // 切换tab栏
  tabchange: function (e) {
    if (e.currentTarget.dataset.index) {
      this.setData({
        tabindex: e.currentTarget.dataset.index,
        payList: this.data.payed
      })
    } else {
      this.setData({
        tabindex: e.currentTarget.dataset.index,
        payList: this.data.nopay
      })
    }
    // console.log(this.data.payList)
  },
  see_QRcode(e) {
    let that = this;
    console.log('e:', e);
    let order_id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: 'QRCode?order_id=' + order_id,
    })

  },
  // 获取用户订单
  getUserOrder: function() {
    
    wx.request({
      url: app.globalData.host + '/index/user/GetUserOrder2',
      method: 'get',
      data: {
        user_id: app.globalData.user_id
      },
      success: (res) => {
        console.log(res)
        console.log(res.data.nopay)
        console.log(res.data.payed)
        
        let payList = res.data.nopay
        if (payList.length){
          payList[0].checked = true
        }
        
        this.setData({
          nopay: res.data.nopay,
          payed: res.data.payed,
          payList 
        })
        if (this.data.tabindex) {
          this.setData({
            payList: this.data.payed
          })
        } else {
          this.setData({
            payList: this.data.nopay
          })
        }
        wx.hideLoading()
    //       wx.showToast({
    //         title: '刷新成功',
    //         icon: 'success'
    //       })
    //       // 停止下拉动作
          wx.stopPullDownRefresh();
      }
    })
  },
  // // 多选选择商品
  // checkboxChange: function (e) {
  //   var i = e.currentTarget.dataset.index
  //   var check = !Boolean(this.data.payList[i].checked)
  //   var payList = this.data.payList
  //   payList[i].checked = check
  //   this.setData({
  //     payList
  //   })
  //   this.total()
  // },
  // 单选选择商品
  checkboxChange: function (e) {
    var i = e.currentTarget.dataset.index
    // var check = !Boolean(this.data.payList[i].checked)
    var payList = this.data.payList
    payList.forEach((item, index) => {
      payList[index].checked = false
    })
    payList[i].checked = true
    this.setData({
      payList
    })
    this.total(i)
  },
  // 减少
  reduce: function (e) {
    var i = e.currentTarget.dataset.index
    var payList = this.data.payList
    if (payList[i].number <= 1) {
      payList[i].number++
    }
    payList[i].number--
    this.setData({
      payList
    })
    this.total(i)
  },
  // 增加
  add: function (e) {
    var i = e.currentTarget.dataset.index
    var payList = this.data.payList
    payList[i].number++
    this.setData({
      payList
    })
    this.total(i)
  },
  // 计算合计
  total: function(i) {
    var money = 0
    var payList = this.data.payList
    if (payList.length){
      var isSelectAll = true
      // this.data.payList.forEach((item, index) => {
      //   if (item.checked) {
      // 调用接口计算
      wx.request({
        url: this.data.host + '/index/ticket/getMoney',
        method: 'get',
        data: {
          price: this.data.payList[i].money,
          number: Number(this.data.payList[i].number)
        },
        success: res => {
          this.data.payList.forEach((item, index) => {
            if (item.checked) {
              money += res.data.money
              let payList = this.data.payList
              payList[i].totalMoney = money
              if (payList[i].checked) {
                this.setData({
                  money,
                  payList,
                  isSelectAll
                })
              }
            }
          })
        }
      })
        // console.log(money)
        // 多选计算
        // money += item.money * Number(item.number)
      // } else {
      //   isSelectAll = false
      // }
    // })


    // 多选计算
    // this.setData({
    //   money,
    //   isSelectAll
    // })
    }
   
  },
  // 全选
  checkboxAll: function(){
    var payList = this.data.payList
    if (!this.data.isSelectAll) {
      payList.forEach((item, index) => {
        payList[index].checked = true
      })
    } else {
      payList.forEach((item, index) => {
        payList[index].checked = false
      })
    }
    // console.log(payList)
    this.setData({
      payList,
      isSelectAll: !this.data.isSelectAll
    })
    this.total()
  },
  // 获取input内容
  getinput: function (e) {
    var data = e.detail.value;
    console.log(data)
    this.setData({
      keyword: data
    })
  },
  // 结算
  jiesuan: function () {
    var that=this;
    this.data.payList.forEach((item, index) => {
      if(item.checked){
        // console.log(item)
        wx.request({
          url: this.data.host + '/apppic/pay/wechat_app_pay2',
          method: 'post',
          data: {
            oid: item.order_id,
            openid: app.globalData.userInfo2.openid
          },
          success: res => {
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
                that.getUserOrder();
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
    })
  },
  // piker组件
  bindPickerChange(e) {
    var index = e.detail.value;
    var year = this.data.array[index]
    this.setData({
      index: index,
      year: year
    })
    console.log(this.data.year)
  },
  // 月份piker组件
  bindPickerChangeMonth(e) {
    console.log(e)
    var index = e.detail.value;
    var month = this.data.monthobjectArray[index].id
    this.setData({
      monthindex: index,
      month: month
    })
    console.log(this.data.month)
  },


  // 跳转到音乐节和夜店详情页
  toDetails: function (e) {
    wx.navigateTo({
      url: '/pages/huodong/xiangqing0/xiangqing0?music_id=' + e.currentTarget.dataset.id,
    })
  },
  // 砍价页
  kanjia: function () {
    wx.navigateTo({
      url: 'kanjia/kanjia',
    })
  },

  // 抽奖页
  lottery: function () {
    wx.navigateTo({
      url: '../prizeTime/prizeTime',
    })
  },
  // 请求音乐节

  getMusicList: function (is_fresh) {
    if (is_fresh) {
      wx.showLoading({
        title: '正在刷新',
      })
    }
    this.getUserOrder();
    // this.setData({
    //   page: 1
    // })
    // wx.request({
    //   url: app.globalData.host + '/index/index/GetMusicPageList',
    //   data: {
    //     class: 1,
    //     limit: 2,
    //     type: 2,
    //     user_id: app.globalData.user_id
    //   },
    //   success: (res) => {
    //     var NowTime = Math.round(new Date() / 1000);
    //     for (var i = 0; i < res.data.length; i++) {
    //       // 拼接地址
    //       res.data[i].thumb_path = app.globalData.host + res.data[i].thumb_path;
    //       res.data[i].time1 = time.formatTime(res.data[i].time, 'Y');
    //       res.data[i].time2 = time.formatTime(res.data[i].time, 'M/D');
    //       res.data[i].time3 = time.formatTime(res.data[i].end_time, 'M/D');
    //       if (res.data[i].is_ticket == 2) {
    //         if (NowTime < res.data[i].ticket_time) {
    //           res.data[i].is_pay = "待售中"
    //         } else if (NowTime > res.data[i].ticket_time && NowTime < res.data[i].ticket_endtime) {
    //           res.data[i].is_pay = "销售中"
    //         } else {
    //           res.data[i].is_pay = "已结束"
    //         }
    //       }
    //     }
    //     this.setData({
    //       yinyuejie: res.data,
    //     })
    //     if (is_fresh) {
    //       wx.hideLoading()
    //       wx.showToast({
    //         title: '刷新成功',
    //         icon: 'success'
    //       })
    //       // 停止下拉动作
    //       wx.stopPullDownRefresh();
    //     }
    //   }
    // });

    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //this.getMusicList()
    this.getUserOrder()
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
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
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

    this.getMusicList(true)
  },

  // 加载更多
  onReachBottom: function () {
    // 显示加载图标
    // wx.showLoading({
    //   title: '玩命加载中',
    // })
    // 页数+1
    this.data.page += 1;
    wx.request({
      url: app.globalData.host + '/index/index/GetMusicPageList',
      data: {
        class: 1,
        limit: 2,
        type: 2,
        page: this.data.page,
        user_id: app.globalData.user_id
      },
      success: (res) => {
        var NowTime = Math.round(new Date() / 1000);

        for (var i = 0; i < res.data.length; i++) {
          // 拼接地址
          res.data[i].thumb_path = app.globalData.host + res.data[i].thumb_path;
          res.data[i].time1 = time.formatTime(res.data[i].time, 'Y');
          res.data[i].time2 = time.formatTime(res.data[i].time, 'M/D');
          res.data[i].time3 = time.formatTime(res.data[i].end_time, 'M/D');
          if (res.data[i].is_ticket == 2) {
            if (NowTime < res.data[i].ticket_time) {
              res.data[i].is_pay = "待售中"
            } else if (NowTime > res.data[i].ticket_time && NowTime < res.data[i].ticket_endtime) {
              res.data[i].is_pay = "销售中"
            } else {
              res.data[i].is_pay = "已结束"
            }
          }
        }
        var cont = this.data.yinyuejie.concat(res.data);
        this.setData({
          yinyuejie: cont
        })
        console.log(cont)
        wx.hideLoading();
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    return {
      title: this.data.details.name,
      path: "/pages/huodong/xiangqing0/xiangqing0?music_id=" + this.data.details.music_id,
      imageUrl: this.data.details.thumb_path
    }
  },
  search() {
    let that = this;
    console.log('key', that.data.keyword)
    wx.navigateTo({
      url: `search/search?keyword=${that.data.keyword}&year=${that.data.year}&month=${that.data.month}`,
    })
  }
})