
const app=getApp()
const utils=require("../../../utils/util.js")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isShow: false,
        dataList:[]//兑换记录
    },
    // 展开收缩
    open: function() {
        console.log('111')
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        wx.request({
            url: app.globalData.host +'/index/shop/GetexChange',
            success:(res)=>{
                var data=res.data;
                for(var i=0;i<data.length;i++){
                    data[i].pay_time = utils.formatTime(data[i].pay_time, 'Y-M-D');
                }
                this.setData({
                    dataList:data
                })
                console.log(this.data.dataList);

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