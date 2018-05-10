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
    wx.setStorage({
      key: 'userId',
      data: '',
    })
  },

  globalData: {
    userInfo: null
  }
})