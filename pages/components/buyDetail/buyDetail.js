// pages/components/buyDetail/buyDetail.js
Component({
  relations: {
    '../shoppingItems/shoppingItems': {
      type: 'parent', // 关联的目标节点应为子节点
      linked: function (target) {
        console.log('这是link')
        // 每次有custom-li被插入时执行，target是该节点实例对象，触发在该节点attached生命周期之后
      },
      linkChanged: function (target) {
        // 每次有custom-li被移动后执行，target是该节点实例对象，触发在该节点moved生命周期之后
        console.log('这是link后')
      },
      unlinked: function (target) {
        // 每次有custom-li被移除时执行，target是该节点实例对象，触发在该节点detached生命周期之后
        console.log('这是没有link')
      }
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    clickId: {
      type: String,
      value: null
    },

  },

  /**
   * 组件的初始数据
   */
  data: {
    valudScale:0,
    beiClick:null,
    goodsDetail:[],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toShopCar(){
      wx.showToast({
        title: '添加购物车成功',
        icon: 'success',
        duration: 2000
      })
    },
    showBox(){
        this.setData({
          valudScale:1,
        })
    },
    submitBtn(){
     wx.showLoading({
       title: '加载中',
     })
    this.setData({
      valudScale:0
    })
      wx.showToast({
        title: '购买成功',
        icon: 'success',
        duration: 2000
      })
    },
    showId(event){
   this.setData({
     beiClick:event.currentTarget.dataset.index
   })
 console.log(event.currentTarget.dataset.index)
    }
  },
  ready:function(){
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'http://192.168.6.102/shop/shopById',
      data: { id: this.properties.clickId },
      success: (res) => {
        this.setData({
          goodsDetail: res.data.info,
        })
        wx.hideLoading()
        console.log(res.data.info)
      }
    })


  }

})
