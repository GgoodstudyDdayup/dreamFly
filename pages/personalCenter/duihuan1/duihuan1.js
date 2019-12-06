// pages/personalCenter/duihuan1/duihuan1.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cishu: '',
        disabled: false,
        userInfo: {},
        yiduihuan:{},//已兑换详情
    },
    // 兑换票
    duihuan: function() {
        wx.request({
            url: app.globalData.host + '/apppic/article/get_user_order_update',
            data: {
                user_id: app.globalData.user_id,
            },
            success: (res) => {
                wx.showToast({
                    title: '兑换成功',
                    icon: 'succes',
                    duration: 1000,
                    mask: true
                })
            }
        })
    },
    // 跳转已购列表
    toorderlist: function() {
        wx.navigateTo({
            url: '/pages/personalCenter/duihuan1/orderlist/myOrder',
        }) 
    },
    // 跳转兑换记录
    toDuihuanjilu: function() {
        wx.navigateTo({
            url: '../duihuan2/duihuan2',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            userInfo: app.globalData.userInfo2
        })
        // 请求可兑换次数
        wx.request({
            url: app.globalData.host + '/apppic/article/get_user_order',
            data: {
                user_id: app.globalData.user_id,
            },
            success: (res) => {
              console.log(res)
                var data = res.data.data
                if (data<10){
                    this.setData({
                        disabled:true 
                    })
                }
                this.setData({
                    cishu: data
                })
            }
        }),
        // 请求兑换过的票
        wx.request({
            url: app.globalData.host + '/index/shop/GetexChange',
            success: (res) => {
                var data = res.data;
                this.setData({
                    yiduihuan: data
                })
                console.log(this.data.yiduihuan);

            }
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

    }
})