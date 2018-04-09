// pages/components/shoppingItems/shoppingItems.js
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
    ishotPage:true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    seeDetail:function(){
     this.setData({
       ishotPage:false
     })
    }
  }
})
