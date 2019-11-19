Component({
  data: {
    selected: 0,
    color: "#333",
    selectedColor: "#ea4479",
    list: [
        {
          pagePath: "/pages/index/index",
          iconPath: "/pages/images/index/shop.png",
          selectedIconPath: "/pages/images/index/shopselect.png",
          text: "首页"
        },
        {
          pagePath: "/pages/Interaction/Interaction",
          iconPath: "/pages/images/index/talk.png",
          selectedIconPath: "/pages/images/index/talkselect.png",
          text: "客服"
        },
        {
            pagePath: "/pages/orderList/orderList",
            iconPath: "/pages/images/index/order.png",
            selectedIconPath: "/pages/images/index/orderselect.png",
            text: "订单"
        },
        // {
        //     pagePath: "/pages/information/information",
        //     iconPath: "/pages/images/bottom-zixun.png",
            // selectedIconPath: "/pages/images/bottom-zixun-active.png",
        //     text: "资讯"
        // },
        {
            pagePath: "/pages/personalCenter/personalCenter",
            iconPath: "/pages/images/index/mine.png",
            selectedIconPath: "/pages/images/index/mineselect.png",
            text: "个人"
        },
    ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      if(e.currentTarget.dataset.index == 1) return false;
      const data = e.currentTarget.dataset
      this.setData({
        selected: data.index
      })
      const url = data.path
      wx.switchTab({url})
      // console.log(e)
    }
  }
})