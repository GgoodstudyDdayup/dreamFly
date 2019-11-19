// pages/shopping-mall/kanjia/kanjia.js
var app = getApp();
var util = require('../../../utils/util.js');
Page({
    /**
     * 页面的初始数据
     */
    data: {
        dataList: [],
    },
    // 页面切换
    guize: function() {
        wx: wx.navigateTo({
            url: '../guize/guize',
        })
    },
    wode: function(e) {
        var dataset = e.currentTarget.dataset
        if(dataset.kan_num=='0'){
          return 0;
        }
        wx: wx.navigateTo({
            url: '../wode/wode?id=' + dataset.id,
        })
    },
    towdkj: function() { //跳转到我的砍价
        wx: wx.navigateTo({
            url: '../yikan/yikan',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // 获取砍价列表
        wx.request({
            url: app.globalData.host + '/index/shop/GetKanjiaList',
            data: {
                status: 1
            },
            success: (res) => {
                var data = res.data
                for (var i = 0; i < data.length; i++) {
                    data[i].thumb_path =  data[i].thumb_path;
                    data[i].kan_money = data[i].old_money - data[i].min_money
                }
                this.setData({
                    dataList: data
                })
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