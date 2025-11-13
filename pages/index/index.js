const app = getApp()

Page({
  data: {
    userName: '',
    totalExperience: 0,
    currentWeek: 1,
    currentDay: 1,
    completedCourses: 0,
    totalCourses: 14,
    completedAssignments: 0,
    progressPercentage: 0,
    recentCourses: [],
    motivationText: ''
  },

  onLoad() {
    // 检查是否首次使用
    if (app.globalData.isFirstTime) {
      wx.reLaunch({
        url: '/pages/onboarding/onboarding'
      })
      return
    }

    this.loadUserData()
  },

  onShow() {
    // 每次显示页面时刷新数据
    if (!app.globalData.isFirstTime) {
      this.loadUserData()
    }
  },

  // 加载用户数据
  loadUserData() {
    const userInfo = app.globalData.userInfo
    const learningProgress = app.globalData.learningProgress
    const courses = app.globalData.courses

    if (!userInfo) {
      wx.reLaunch({
        url: '/pages/onboarding/onboarding'
      })
      return
    }

    // 计算进度数据（基于经验分数，总分850分）
    const completedCourses = learningProgress.completedCourses.length
    const completedAssignments = learningProgress.completedAssignments.length
    const totalExperience = 850 // 总分
    const currentExperience = learningProgress.totalExperience // 当前获得的经验值
    const progressPercentage = totalExperience > 0 ? Math.round((currentExperience / totalExperience) * 100) : 0

    // 获取最近学习的课程（最多3个）
    const recentCourses = this.getRecentCourses(courses, learningProgress.completedCourses)

    // 获取激励文本
    const motivationText = this.getMotivationText(completedCourses)

    this.setData({
      userName: userInfo.name,
      totalExperience: learningProgress.totalExperience,
      currentWeek: learningProgress.currentWeek,
      currentDay: learningProgress.currentDay,
      completedCourses: completedCourses,
      completedAssignments: completedAssignments,
      progressPercentage: progressPercentage,
      recentCourses: recentCourses,
      motivationText: motivationText
    })
  },

  // 获取最近学习的课程
  getRecentCourses(courses, completedCourseIds) {
    const categoryIcons = {
      '正念': '🧘',
      '痛苦耐受': '💪',
      '情绪调节': '❤️',
      '人际效能': '🤝'
    }

    // 获取已完成的课程
    const completedCourses = courses
      .filter(course => completedCourseIds.includes(course.id))
      .map(course => ({
        ...course,
        categoryIcon: categoryIcons[course.category] || '📚',
        status: 'completed'
      }))
      .slice(-2) // 最近2个已完成的

    // 获取下一个可学习的课程
    const nextCourse = courses.find(course => course.status === 'available')
    if (nextCourse) {
      const nextCourseWithIcon = {
        ...nextCourse,
        categoryIcon: categoryIcons[nextCourse.category] || '📚',
        status: 'available'
      }
      return [nextCourseWithIcon, ...completedCourses].slice(0, 1)
    }

    return completedCourses.slice(0, 1)
  },

  // 获取激励文本
  getMotivationText(completedCourses) {
    const motivationTexts = [
      '每一步都是进步，继续加油！',
      '学习DBT技能，让情绪管理更轻松。',
      '坚持练习，你会发现自己的改变。',
      '情绪成长没有终点，带着这些技能继续出发吧！',
      '你已经掌握了宝贵的情绪管理工具。'
    ]

    if (completedCourses === 0) {
      return '开始你的DBT学习之旅，第一步总是最重要的！'
    } else if (completedCourses < 5) {
      return motivationTexts[0]
    } else if (completedCourses < 10) {
      return motivationTexts[1]
    } else if (completedCourses < 14) {
      return motivationTexts[2]
    } else {
      return motivationTexts[3]
    }
  },

  // 跳转到学习页面
  goToLearning() {
    wx.switchTab({
      url: '/pages/router/index'
    })
  },

  // 跳转到作业页面
  goToAssignments() {
    wx.navigateTo({
      url: '/pages/assignments/assignments'
    })
  },

  // 跳转到工具页面
  goToTools() {
    wx.switchTab({
      url: '/pages/tools/tools'
    })
  },

  // 跳转到我的笔记页面
  goToEmotion() {
    wx.switchTab({
      url: '/pages/emotion/emotion'
    })
  },

  // 跳转到具体课程
  goToCourse(e) {
    const courseId = e.currentTarget.dataset.courseId
    wx.navigateTo({
      url: `/pages/video/video?courseId=${courseId}`
    })
  }
})
