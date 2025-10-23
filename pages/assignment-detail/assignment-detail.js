const app = getApp()

Page({
  data: {
    assignmentId: null,
    assignment: null,
    isViewMode: false,
    practiceRecord: '',
    learningInsight: '',
    canSubmit: false,
    completedData: {}
  },

  onLoad(options) {
    const assignmentId = parseInt(options.assignmentId)
    const isViewMode = options.view === 'true'

    this.setData({
      assignmentId: assignmentId,
      isViewMode: isViewMode
    })

    this.loadAssignment(assignmentId)
  },

  // 加载作业信息
  loadAssignment(assignmentId) {
    const assignment = app.globalData.assignments.find(a => a.id === assignmentId)
    if (!assignment) {
      wx.showToast({
        title: '作业不存在',
        icon: 'none'
      })
      wx.navigateBack()
      return
    }

    this.setData({
      assignment: assignment
    })

    // 如果是已完成的作业，加载完成数据
    if (assignment.status === 'completed') {
      this.loadCompletedData(assignmentId)
    }
  },

  // 加载已完成的作业数据
  loadCompletedData(assignmentId) {
    const completedAssignments = wx.getStorageSync('completedAssignments') || {}
    const completedData = completedAssignments[assignmentId] || {}

    this.setData({
      completedData: completedData
    })
  },

  // 获取课程标题
  getCourseTitle(courseId) {
    const course = app.globalData.courses.find(c => c.id === courseId)
    return course ? course.title : '未知课程'
  },

  // 练习记录输入
  onPracticeRecordInput(e) {
    this.setData({
      practiceRecord: e.detail.value
    })
    this.checkCanSubmit()
  },

  // 学习心得输入
  onLearningInsightInput(e) {
    this.setData({
      learningInsight: e.detail.value
    })
    this.checkCanSubmit()
  },

  // 检查是否可以提交
  checkCanSubmit() {
    const canSubmit = this.data.practiceRecord.trim() !== '' || this.data.learningInsight.trim() !== ''
    this.setData({
      canSubmit: canSubmit
    })
  },

  // 提交作业
  submitAssignment() {
    if (!this.data.canSubmit) {
      wx.showToast({
        title: '请至少填写一项内容',
        icon: 'none'
      })
      return
    }

    const assignmentData = {
      practiceRecord: this.data.practiceRecord,
      learningInsight: this.data.learningInsight,
      completionDate: this.formatDate(new Date()),
      timestamp: Date.now()
    }

    // 保存到本地存储
    let completedAssignments = wx.getStorageSync('completedAssignments') || {}
    completedAssignments[this.data.assignmentId] = assignmentData
    wx.setStorageSync('completedAssignments', completedAssignments)

    // 更新全局数据
    const learningProgress = app.globalData.learningProgress
    if (!learningProgress.completedAssignments.includes(this.data.assignmentId)) {
      learningProgress.completedAssignments.push(this.data.assignmentId)
      app.saveUserData()
    }

    wx.showToast({
      title: '作业提交成功',
      icon: 'success'
    })

    // 延迟返回
    setTimeout(() => {
      wx.navigateBack()
    }, 1500)
  },

  // 格式化日期
  formatDate(date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')

    return `${year}-${month}-${day} ${hours}:${minutes}`
  }
})
