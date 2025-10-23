const app = getApp()

Page({
  data: {
    totalExperience: 0,
    assignments: [],
    filteredAssignments: [],
    currentFilter: 'all',
    availableCount: 0,
    completedCount: 0,
    lockedCount: 0
  },

  onLoad(options) {
    // 检查是否有特定筛选器
    if (options.filter) {
      this.setData({
        currentFilter: options.filter
      })
    }
    this.loadData()
  },

  onShow() {
    this.loadData()
  },

  // 加载数据
  loadData() {
    const learningProgress = app.globalData.learningProgress
    const assignments = app.globalData.assignments

    // 更新作业状态
    this.updateAssignmentStatus(assignments, learningProgress.completedCourses, learningProgress.completedAssignments)

    // 计算各状态数量
    const availableCount = assignments.filter(a => a.status === 'available').length
    const completedCount = assignments.filter(a => a.status === 'completed').length
    const lockedCount = assignments.filter(a => a.status === 'locked').length

    this.setData({
      totalExperience: learningProgress.totalExperience,
      assignments: assignments,
      availableCount: availableCount,
      completedCount: completedCount,
      lockedCount: lockedCount
    })

    this.filterAssignments()
  },

  // 更新作业状态
  updateAssignmentStatus(assignments, completedCourses, completedAssignments) {
    assignments.forEach(assignment => {
      if (completedAssignments.includes(assignment.id)) {
        assignment.status = 'completed'
      } else if (assignment.courseId === null || completedCourses.includes(assignment.courseId)) {
        assignment.status = 'available'
      } else {
        assignment.status = 'locked'
      }
    })
  },

  // 设置筛选器
  setFilter(e) {
    const filter = e.currentTarget.dataset.filter
    this.setData({
      currentFilter: filter
    })
    this.filterAssignments()
  },

  // 筛选作业
  filterAssignments() {
    const { assignments, currentFilter } = this.data
    let filtered = assignments

    if (currentFilter !== 'all') {
      filtered = assignments.filter(assignment => assignment.status === currentFilter)
    }

    this.setData({
      filteredAssignments: filtered
    })
  },

  // 获取课程标题
  getCourseTitle(courseId) {
    const course = app.globalData.courses.find(c => c.id === courseId)
    return course ? course.title : '未知课程'
  },

  // 获取筛选器文本
  getFilterText(filter) {
    const filterTexts = {
      'all': '',
      'available': '待完成',
      'completed': '已完成',
      'locked': '未解锁'
    }
    return filterTexts[filter] || ''
  },

  // 点击作业卡片
  onAssignmentClick(e) {
    const assignmentId = e.currentTarget.dataset.assignmentId
    const assignment = this.data.assignments.find(a => a.id === assignmentId)

    if (assignment.status === 'locked') {
      wx.showToast({
        title: '作业尚未解锁',
        icon: 'none'
      })
      return
    }

    this.startAssignment(e)
  },

  // 开始作业
  startAssignment(e) {
    const assignmentId = e.currentTarget.dataset.assignmentId
    wx.navigateTo({
      url: `/pages/assignment-detail/assignment-detail?assignmentId=${assignmentId}`
    })
  },

  // 查看作业详情
  viewAssignment(e) {
    const assignmentId = e.currentTarget.dataset.assignmentId
    wx.navigateTo({
      url: `/pages/assignment-detail/assignment-detail?assignmentId=${assignmentId}&view=true`
    })
  }
})
