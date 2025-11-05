const app = getApp()

Page({
  data: {
    currentStep: 'intro', // intro, userInfo
    userInfo: {
      name: '',
      gender: '',
      birthDate: '',
      phone: '',
      wechat: ''
    },
    isFormValid: false
  },

  onLoad() {
    // 检查是否首次使用
    if (!app.globalData.isFirstTime) {
      // 如果不是首次使用，直接跳转到首页
      wx.reLaunch({
        url: '/pages/index/index'
      })
    }
  },

  // 下一步
  nextStep() {
    this.setData({
      currentStep: 'userInfo'
    })
  },

  // 输入框变化
  onInputChange(e) {
    const field = e.currentTarget.dataset.field
    const value = e.detail.value

    this.setData({
      [`userInfo.${field}`]: value
    }, () => {
      this.validateForm()
    })
  },

  // 选择性别
  selectGender(e) {
    const gender = e.currentTarget.dataset.gender
    this.setData({
      'userInfo.gender': gender
    }, () => {
      this.validateForm()
    })
  },

  // 选择日期
  onDateChange(e) {
    this.setData({
      'userInfo.birthDate': e.detail.value
    }, () => {
      this.validateForm()
    })
  },

  // 验证表单
  validateForm() {
    const { name, gender, birthDate, phone, wechat } = this.data.userInfo
    const isValid = name && gender && birthDate && phone && wechat

    this.setData({
      isFormValid: isValid
    })
  },

  // 提交用户信息
  submitUserInfo(e) {
    if (!this.data.isFormValid) {
      wx.showToast({
        title: '请完善所有信息',
        icon: 'none'
      })
      return
    }

    // 保存用户信息到全局数据
    app.globalData.userInfo = this.data.userInfo
    app.globalData.isFirstTime = false
    app.globalData.hasSeenGuide = false // 标记还未看过导引

    // 初始化第一个课程为可用状态
    if (app.globalData.courses.length > 0) {
      app.globalData.courses[0].status = 'available'
    }

    // 保存到本地存储
    app.saveUserData()

    // 显示欢迎提示
    wx.showToast({
      title: '欢迎加入DBT学习之旅！',
      icon: 'success',
      duration: 2000
    })

    // 延迟跳转到router页面（学习路线页面）并触发导引
    setTimeout(() => {
      wx.switchTab({
        url: '/pages/router/index'
      })
    }, 2000)
  }
})
