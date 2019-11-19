// pages/personalCenter/myOrder/myOrder.js
var app = getApp();
var util = require('../../../../utils/util.js');
Page({
    /**
     * 页面的初始数据
     */
    data: {
        order: [],
        orderId:[],//订单id合集
        is_disable:true//默认不可点击
    },
    // 复选框
    checked:function(e){
        var data = e.currentTarget.dataset
        if(this.data.order[data.index].is_checked==false){
            this.data.orderId.push(data.order_id);
            // 选择十个票音乐按钮可点击
            if (this.data.orderId.length==10){
                this.setData({
                    is_disable:false
                })
            };
            var up = "order[" + data.index + "].is_checked";
            this.setData({
                [up]:true
            })
        }else{
            this.data.orderId.splice(this.data.orderId.indexOf(data.order_id), 1);
            if (this.data.orderId.length < 1) {
                this.setData({
                    is_disable: true
                })
            };
            var up = "order[" + data.index + "].is_checked";
            this.setData({
                [up]: false
            })
        }
    },
    //获取平均值跳转到选票页面
    toChooseMusic:function(){
        new Promise((resolve, reject)=>{
            var string = this.data.orderId.join(',')
            wx.request({
                url: app.globalData.host + '/index/shop/GetAvagePrice',
                data: {
                    order_id: string
                },
                success: (res) => {
                    resolve(res.data.average)
                }
            })
        }).then((res)=>{
            var string = this.data.orderId.join(',')
            wx.navigateTo({
                url: '/pages/personalCenter/duihuan1/chooseMusicAll/chooseMusicAll?meanPrice=' + res + '&order_id=' + string,
            })
        })
        
    },
    
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // 请求数据
        wx.request({
            url: app.globalData.host + '/index/shop/GetExchangeOrderList',
            data: {
                user_id: app.globalData.user_id,
            },
            success: (res) => {
                var data=res.data;
                for(var i=0;i<data.length;i++){
                    data[i].thumb_path = app.globalData.host + data[i].thumb_path;
                    data[i].pay_time = util.formatTime(data[i].pay_time, 'Y-M-D');
                    data[i].is_checked=false;
                }
                this.setData({
                    order: data
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