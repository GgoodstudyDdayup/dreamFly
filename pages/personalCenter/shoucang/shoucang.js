var time = require('../../../utils/util.js');
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        dataList: [],//音乐节数据
        tabindex:0,
        nav: ["音乐节", "现场", "音乐", "热门推文", "夜店"],
    },
    changeTab:function(e){
        this.setData({
            tabindex: e.currentTarget.dataset.index
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        

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
        if(this.data.tabindex==0){
            this.selectComponent("#my-yinyuejieList").getMusic()
        } else if (this.data.tabindex == 1){
            this.selectComponent("#my-videoall").getVideo()
        } else if (this.data.tabindex == 2) {
            this.selectComponent("#my-musicList").getMusic()
        } else if (this.data.tabindex == 3) {
            this.selectComponent("#my-tuiwenList").getTuiwen()
        } else if (this.data.tabindex == 4) {
            this.selectComponent("#my-yedianList").getYedian()
        }
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function(e) {
        // 组件内传来的参数
        console.log(e);
        var share = e.target.dataset;
        return {
            title: share.title,
            path: share.path + share.id,
            imageUrl: share.img,
        }
    }
})