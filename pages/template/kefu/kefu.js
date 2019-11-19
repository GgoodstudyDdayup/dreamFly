// pages/template/kefu/kefu.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    show:false,
    img1:'/pages/images/cebian-show.png',
    img2:'/pages/images/cebian-hide.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    close(){
      this.setData({
        show:false
      })
    },
    show() {
      this.setData({
        show: true
      })
    }
  }
})
