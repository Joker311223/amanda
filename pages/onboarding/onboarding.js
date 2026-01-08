const app = getApp()

Page({
  data: {
    currentStep: 'intro', // intro, userInfo
    userInfo: {
      name: '',
      gender: '',
      birthDate: '',
      phone: '',
      wechat: '',
      inviteCode: ''
    },
    isFormValid: false,
    errors: {
      name: '',
      gender: '',
      birthDate: '',
      phone: '',
      wechat: '',
      inviteCode: ''
    },
    // 记录哪些字段已经显示过错误提示
    touchedFields: {
      name: false,
      gender: false,
      birthDate: false,
      phone: false,
      wechat: false,
      inviteCode: false
    },
    showSuccessModal: false,
    isPageReady: false, // 页面是否准备好显示
    VALID_INVITE_CODE: 'DBT2026' // 有效的邀请码
  },

  onLoad() {
    // 检查是否首次使用
    // 如果本地缓存中没有标记，需要等待从云数据库检查完成
    const localIsFirstTime = wx.getStorageSync("isFirstTime");
    
    if (localIsFirstTime === "") {
      // 本地缓存中没有标记，需要等待云数据库检查
      // 此时 app.checkFirstTimeFromCloud() 正在执行
      // 我们需要等待它完成后再检查 isFirstTime
      const checkInterval = setInterval(() => {
        const isFirstTime = wx.getStorageSync("isFirstTime");
        if (isFirstTime !== "") {
          // 检查完成了
          clearInterval(checkInterval);
          
          if (!app.globalData.isFirstTime) {
            // 如果不是首次使用，直接跳转到首页（不显示页面）
            wx.reLaunch({
              url: '/pages/index/index'
            })
          } else {
            // 是首次使用，显示页面
            this.setData({
              isPageReady: true
            })
          }
        }
      }, 100);
      
      // 设置超时，防止无限等待
      setTimeout(() => {
        clearInterval(checkInterval);
        // 超时后显示页面（假设是首次使用）
        this.setData({
          isPageReady: true
        })
      }, 5000);
    } else {
      // 本地缓存中有标记，直接使用
      if (!app.globalData.isFirstTime) {
        // 如果不是首次使用，直接跳转到首页（不显示页面）
        wx.reLaunch({
          url: '/pages/index/index'
        })
      } else {
        // 是首次使用，显示页面
        this.setData({
          isPageReady: true
        })
      }
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
    })
  },

  // 输入框失焦 - 如果该字段已经显示过错误，则进行验证
  onInputBlur(e) {
    const field = e.currentTarget.dataset.field
    const { touchedFields } = this.data

    // 如果该字段已经显示过错误提示，则在失焦时验证
    if (touchedFields[field]) {
      this.validateField(field)
    }
  },

  // 选择性别
  selectGender(e) {
    const gender = e.currentTarget.dataset.gender
    this.setData({
      'userInfo.gender': gender
    })
  },

  // 选择日期
  onDateChange(e) {
    this.setData({
      'userInfo.birthDate': e.detail.value
    })
  },

  // 验证单个字段
  validateField(field) {
    const { userInfo, VALID_INVITE_CODE } = this.data
    const errors = { ...this.data.errors }
    const touchedFields = { ...this.data.touchedFields }

    switch (field) {
      case 'name':
        errors.name = !userInfo.name ? '请输入姓名' : ''
        break
      case 'gender':
        errors.gender = !userInfo.gender ? '请选择性别' : ''
        break
      case 'birthDate':
        errors.birthDate = !userInfo.birthDate ? '请选择出生年月' : ''
        break
      case 'phone':
        const phoneRegex = /^1[3-9]\d{9}$/
        if (!userInfo.phone) {
          errors.phone = '请输入手机号'
        } else if (!phoneRegex.test(userInfo.phone)) {
          errors.phone = '手机号格式错误（需要11位数字，以1开头）'
        } else {
          errors.phone = ''
        }
        break
      case 'wechat':
        const wechatRegex = /^[a-zA-Z0-9_]{6,20}$/
        if (!userInfo.wechat) {
          errors.wechat = '请输入微信号'
        } else if (!wechatRegex.test(userInfo.wechat)) {
          errors.wechat = '微信号格式错误（需要6-20位字母、数字或下划线）'
        } else {
          errors.wechat = ''
        }
        break
      case 'inviteCode':
        if (!userInfo.inviteCode) {
          errors.inviteCode = '请输入邀请码'
        } else if (userInfo.inviteCode !== VALID_INVITE_CODE) {
          errors.inviteCode = '邀请码错误，请联系项目负责人获取正确的邀请码'
        } else {
          errors.inviteCode = ''
        }
        break
    }

    this.setData({
      errors: errors
    })
  },

  // 验证表单
  validateForm() {
    const { name, gender, birthDate, phone, wechat, inviteCode } = this.data.userInfo
    const { VALID_INVITE_CODE } = this.data
    const errors = {
      name: '',
      gender: '',
      birthDate: '',
      phone: '',
      wechat: '',
      inviteCode: ''
    }
    const touchedFields = {
      name: true,
      gender: true,
      birthDate: true,
      phone: true,
      wechat: true,
      inviteCode: true
    }

    // 验证姓名
    if (!name) {
      errors.name = '请输入姓名'
    }

    // 验证性别
    if (!gender) {
      errors.gender = '请选择性别'
    }

    // 验证出生年月
    if (!birthDate) {
      errors.birthDate = '请选择出生年月'
    }

    // 验证手机号格式（11位数字）
    const phoneRegex = /^1[3-9]\d{9}$/
    if (!phone) {
      errors.phone = '请输入手机号'
    } else if (!phoneRegex.test(phone)) {
      errors.phone = '手机号格式错误（需要11位数字，以1开头）'
    }

    // 验证微信号格式（6-20位字母数字下划线）
    const wechatRegex = /^[a-zA-Z0-9_]{6,20}$/
    if (!wechat) {
      errors.wechat = '请输入微信号'
    } else if (!wechatRegex.test(wechat)) {
      errors.wechat = '微信号格式错误（需要6-20位字母、数字或下划线）'
    }

    // 验证邀请码
    if (!inviteCode) {
      errors.inviteCode = '请输入邀请码'
    } else if (inviteCode !== VALID_INVITE_CODE) {
      errors.inviteCode = '邀请码错误，请联系项目负责人获取正确的邀请码'
    }

    const isValid = !errors.name && !errors.gender && !errors.birthDate && !errors.phone && !errors.wechat && !errors.inviteCode

    this.setData({
      isFormValid: isValid,
      errors: errors,
      touchedFields: touchedFields
    })
  },

  // 提交用户信息
  submitUserInfo(e) {
    // 在提交时进行验证
    this.validateForm()
    
    if (!this.data.isFormValid) {
      // 找出第一个有错误的字段
      const { errors } = this.data
      const errorMessages = []

      if (errors.name) errorMessages.push(errors.name)
      if (errors.gender) errorMessages.push(errors.gender)
      if (errors.birthDate) errorMessages.push(errors.birthDate)
      if (errors.phone) errorMessages.push(errors.phone)
      if (errors.wechat) errorMessages.push(errors.wechat)
      if (errors.inviteCode) errorMessages.push(errors.inviteCode)

      const errorMsg = errorMessages.join('；')

      wx.showToast({
        title: errorMsg || '请完善所有信息',
        icon: 'none',
        duration: 2000
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

    // 保存用户信息到云数据库
    this.saveUserToCloud()

    // 显示成功弹窗
    this.setData({
      showSuccessModal: true
    })
  },

  // 保存用户信息到云数据库
  saveUserToCloud() {
    const dbManager = require('../../utils/db-manager')
    const userInfo = this.data.userInfo

    // 使用统一的数据库管理模块保存用户
    dbManager.createUser(userInfo).then(res => {
      console.log('用户信息保存到云数据库成功', res)
      wx.showToast({
        title: '注册成功',
        icon: 'success',
        duration: 1500
      })
    }).catch(err => {
      console.error('用户信息保存到云数据库失败', err)
      wx.showToast({
        title: '数据同步失败，请检查网络',
        icon: 'none',
        duration: 2000
      })
    })
  },

  // 关闭成功弹窗
  closeSuccessModal() {
    this.setData({
      showSuccessModal: false
    })

    // 跳转到router页面（学习路线页面）
    wx.switchTab({
      url: '/pages/router/index'
    })
  }
})
