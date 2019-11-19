// pages/information/information.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        nav: ["音乐节", "现场", "音乐", "热门推文", "夜店"],
        tabindex: 0,
    },
    tabchange: function (e) {
        this.setData({
            tabindex: e.currentTarget.dataset.index
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function (options) {
      if (typeof this.getTabBar === 'function' && this.getTabBar()) {
        this.getTabBar().setData({
          selected: 1
        })
      }
      console.log('app.globalData.zixunTab:', app.globalData.zixunTab);
      if (app.globalData.zixunTab == 0 || app.globalData.zixunTab == 4) {
            this.setData({
                tabindex: app.globalData.zixunTab
            })
        }

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
       
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
        if(this.data.tabindex==0){
            this.selectComponent("#my-yinyuejie").downRefresh()
        }else if(this.data.tabindex==1){
            this.selectComponent("#my-video").downRefresh()
        } else if (this.data.tabindex == 2) {
            this.selectComponent("#my-music").downRefresh()
        }else if(this.data.tabindex==3){
            this.selectComponent("#my-tuiwen").downRefresh()
        }else if(this.data.tabindex==4){
            this.selectComponent("#my-yedian").downRefresh()
        }
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if(this.data.tabindex==0){
            this.selectComponent("#my-yinyuejie").addMore()
        }else if(this.data.tabindex==1){
            this.selectComponent("#my-video").addMore()
        } else if (this.data.tabindex == 2) {
            this.selectComponent("#my-music").addMore()
        }else if(this.data.tabindex==3){
            this.selectComponent("#my-tuiwen").addMore()
        }else if(this.data.tabindex==4){
            this.selectComponent("#my-yedian").addMore()
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})