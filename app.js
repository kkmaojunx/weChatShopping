//app.js
App({
  onLaunch(){
wx.setStorage({
  key: 'username',
  data: '',
})
    wx.setStorage({
      key: 'password',
      data: '',
    })
  },

  globalData: {
    userInfo: null
  }
})