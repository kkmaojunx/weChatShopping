// pages/components/buyDetail/buyDetail.js
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
    bottomValue:'-90rpx',
    valudScale:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showBtn(){
      this.setData({
        bottomValue:'0'
      })
      setTimeout(() => {
        this.setData({
          bottomValue: '-90rpx'
        })
      }, 3000)
    },
    toShopCar(){
      wx.showToast({
        title: '添加成功',
        icon: 'success',
        duration: 2000
      })
    },
    showBox(){
        this.setData({
          valudScale:1
        })
    },
    submitBtn(){
      this.setData({
        valudScale:0
      })
      wx.showToast({
        title: '购买成功',
        icon: 'success',
        duration: 2000
      })
    }
  },

})
