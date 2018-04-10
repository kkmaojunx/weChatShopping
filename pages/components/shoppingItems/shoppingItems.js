// pages/components/shoppingItems/shoppingItems.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    clickData:{
      type: Array,
      value: [],
    },
    clickId:{
      type:String,
      value:null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    ishotPage:true,
    goodsDetail:[],

  },

  /**
   * 组件的方法列表
   */
  methods: {
    seeDetail:function(){
     this.setData({
       ishotPage:false
     })
     wx.request({
       url: 'http://192.168.6.102/shop/shopById',
       data: { id: this.properties.clickId},
       success:(res)=>{
    this.setData({
      goodsDetail:res.data.info,
     
    })
    console.log(res.data.info)
       }
     })
    },
  }
})
