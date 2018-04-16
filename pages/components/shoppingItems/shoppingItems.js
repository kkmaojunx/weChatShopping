// pages/components/shoppingItems/shoppingItems.js
Component({
  relations: {
    '../buyDetail/buyDetail': {
      type: 'child', // 关联的目标节点应为子节点
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
  
    },
    
  },
})
