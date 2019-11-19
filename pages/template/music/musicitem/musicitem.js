const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    musicitem: Object, //item详情
    itemindex: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    no: "/pages/images/5.png",
    off: "/pages/images/6.png",
    is_play: null,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 播放音乐
    playMusic: function() {
      app.store.$state.backgroundAudioManager.loopPlay(this.data.itemindex)
      app.store.setState({
        "backgroundAudioManager.is_play": true,
        "backgroundAudioManager.dangqian": this.data.itemindex,
        "backgroundAudioManager.src": this.data.musicitem.filepath
      })
    },
    // 暂停音乐播放
    stopMusic: function() {
      app.store.setState({
        "backgroundAudioManager.is_play": false
      })
      app.store.$state.backgroundAudioManager.pause()
    },
    toDetails: function(e) {
      wx.navigateTo({
        url: '/pages/information/music/details/details?id=' + e.currentTarget.dataset.id
      })
    }
  },
  ready: function() {

  }
})