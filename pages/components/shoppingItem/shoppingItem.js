// pages/components/shoppingItem/shoppingItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    clickData: {
      type: Array,
      value: [],
    },
    clickId: {
      type: String,
      value: null
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    ishotPage: true,
    goodsDetail: [],

  },

  /**
   * 组件的方法列表
   */
  methods: {
    seeDetail: function () {
      wx.navigateTo({
        url: '../buyDetails/buyDetails?id=' + this.properties.clickId
      })

    },

  },
})
