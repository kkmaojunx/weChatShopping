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
    searchColor:'#aaa',
    searchValue:'',
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
    rebackColor(e){
      this.setData({
        colorChange: '#ccc',
        searchColor: '#aaa',
        searchValue:e.detail.value
      })
    },
    startSearch(){
      if (this.data.searchValue==''){
        wx.showToast({
          title: '请输入关键字再进行查询',
          icon:'none'
        })
      }else{
        wx.navigateTo({
          url: '../../goodList/goodList?searchValue=' + this.data.searchValue+'&hot=null',
        })
      }
     
    }
  }
})
