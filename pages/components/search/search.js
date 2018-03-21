// pages/components/search/search.js
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
    colorChange:'#ccc',
    searchColor:'#aaa'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeColor:function(){
      this.setData({
        colorChange :'#000',
        searchColor:'#000',
        
      })
    },
    rebackColor(){
      this.setData({
        colorChange: '#ccc',
        searchColor: '#aaa'
      })
    }
  }
})
