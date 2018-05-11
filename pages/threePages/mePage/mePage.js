// pages/threePages/mePage/mePage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    showPersonal:false,
    meDate: {},//我的界面全部信息
    userId: null,
    msgM: ' 登录窗口',
    username: '',
    password: '',
    dates: '1996-02-20',
    content: '',
    phone: '',
    loginRight: false,//是否显示我的窗口
    showPersonal: false,//个人信息显示
    changePwd: false,//修改密码显示
    oldPwd: '',//原来的密码
    newPwd: '',//新密码
    newPwd2: '',//新密码确认
    noCheck: true,//让新的密码不能输入
    index: 0,
    nowDate: new Date(),
    addId: '',//一条地址的id

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'userId',
      success: (res)=> {
        this.setData({
          userId:res.data
        })
      },
    })
  },
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },
  swiperChange: function (e) {

    this.setData({
      currentTab: e.detail.current,
    })

  }, 
  //个人信息点击
  personalinfo() {
    this.setData({
      showPersonal: true
    })
    wx.showLoading({
      title: '获取中',
      mask: 'true'
    })
    wx.request({
      url: 'http://192.168.8.102/user/userInfo',
      data: { id: this.data.userId },
      success: (res) => {
        wx.hideLoading()
        console.log(res.data)
        if (res.data.code == 1) {
          this.setData({
            meDate: res.data.info,
            dates: res.data.info.birthday,
            content: res.data.info.content,
            username: res.data.info.username,
            phone: res.data.info.phone
          })
        }
      },
      fail: (err) => {
        console.log(err)
      }
    })
  },
  //关闭个人信息
  closeInfo() {
    this.setData({
      showPersonal: false
    })
  },
  //修改密码
  changePwd() {
    this.setData({
      changePwd: true,
      noCheck: true

    })
  },
  //获取原有密码
  getOldpwd(e) {
    this.setData({
      oldPwd: e.detail.value
    })
  },
  //点击验证
  checkPwd() {
    wx.showLoading({
      title: '验证中',
      mask: 'true'
    })
    wx.request({
      url: 'http://192.168.8.102/user/validPassword',
      data: { id: this.data.userId, password: this.data.oldPwd },
      success: (res) => {
        wx.hideLoading()
        console.log(res.data)
        if (res.data.code == 1) {
          wx.showToast({
            title: '验证通过',
            icon: 'success',
            duration: 2000
          })
          this.setData({
            noCheck: false
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1000
          })
        }
      }
    })
  },
  //获取新密码
  getNewPwd(e) {
    this.setData({
      newPwd: e.detail.value
    })
  },
  getNewPwd2(e) {
    this.setData({
      newPwd2: e.detail.value
    })
  },
  //确认修改密码
  rewritePwd() {
    if (this.data.newPwd != this.data.newPwd2) {
      wx.showToast({
        title: '请输入相同密码',
        icon: 'none',
        duration: 1000
      })
    } else {
      wx.showLoading({
        title: '修改中',
        mask: 'true'
      })
      wx.request({
        url: 'http://192.168.8.102/user/register',
        data: { id: this.data.userId, repetition: this.data.newPwd, password: this.data.newPwd2 },
        success: (res) => {
          console.log(res.data)
          wx.hideLoading()
          if (res.data.code == 1) {
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 2000
            })
            this.setData({
              changePwd: false
            })
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 1000
            })
          }
        }
      })
    }

  },
  //关闭修改密码
  closePwd() {
    this.setData({
      changePwd: false,
      oldPwd: '',
      newPwd: '',
      newPwd2: ''

    })
  },
  //退出登录
  existLogin() {
    wx.clearStorage()
    wx.setStorage({
      key: 'username',
      data: '',
    })
    wx.setStorage({
      key: 'password',
      data: '',
    })
    this.setData({
      loginRight: false,
      username: '',
      password: ''
    })
  },
  //获取用户名
  getUsername(e) {
    this.setData({
      username: e.detail.value
    })
  },
  getPhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  getContent(e) {
    this.setData({
      content: e.detail.value
    })
  },
  bindDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      dates: e.detail.value
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