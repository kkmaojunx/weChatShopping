// pages/firstPage/firstPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  msgM:' 登录窗口',
  username:'',
  password:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  showCreat: function () {
wx.navigateTo({
  url: '../creatPage/creatPage',
})
  },
  getusername:function(e){
   this.setData({
     username:e.detail.value
   })

   
  },
  getpassword: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  loginBtn:function(){
    console.log(this.data.username + '用户名', this.data.password+'密码')
     wx.request({
       url: 'http://192.168.6.102/user/login',
       data:{
         username:this.data.username,
         password:this.data.password
       },
       header: {
         'content-type': 'application/json' // 默认值
       },
       success:function(res){
         if(res.data.code==0){
           wx.showToast({
             title: res.data.msg,
             icon: 'none',
             duration: 2000
           })
         }else if(res.data.code==1){
           wx.showToast({
             title: '成功',
             icon: 'success',
             duration: 2000
           })
           wx.redirectTo({
             url: '../threePages/mePage/mePage',
           })
         }
        
       },
       fail:function(err){
         console.log('调用失败')
         wx.showToast({
           title: '失败',
           icon: 'none',
           duration: 2000
         })
       }
     })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  console.log('下拉')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
 
})