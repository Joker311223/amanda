const app = getApp()

Page({
  data: {
    completedCount: 0,
    totalCount: 0,
    progressPercent: 0,
    courses: [],
    showTip: true,
    tipCharacter: '🐻',
    tipText: '加油！每完成一关就能获得三颗星星哦！'
  },

  onLoad() {
    this.loadCourses()
    this.showRandomTip()
  },

  onShow() {
    this.loadCourses()
  },

  // 加载课程数据
  loadCourses() {
    const learningProgress = app.globalData.learningProgress
    const allCourses = app.globalData.courses
    const assignments = app.globalData.assignments || []

    // 可爱的emoji图标库
    const emojiList = ['🌱', '🌸', '🌺', '🌻', '🌼', '🌷', '🍀', '🌿', '🦋', '🐝', '🐞', '🐛', '🦗', '🐌']

    // 处理课程数据
    const courses = allCourses.map((course, index) => {
      const courseCompleted = learningProgress.completedCourses.includes(course.id)

      // 查找该课程的作业
      const courseAssignments = assignments.filter(a => a.courseId === course.id)
      const assignmentCompleted = courseAssignments.length > 0 &&
        courseAssignments.every(a => learningProgress.completedAssignments.includes(a.id))

      // 判断是否是当前课程
      const isCurrent = !courseCompleted && (index === 0 || learningProgress.completedCourses.includes(allCourses[index - 1].id))
      const locked = !courseCompleted && !isCurrent

      // 计算位置（蛇形路径）
      const row = Math.floor(index / 3)
      const col = index % 3
      const isEvenRow = row % 2 === 0
      const xPos = isEvenRow ? col * 33 : (2 - col) * 33
      const yPos = row * 200

      return {
        id: course.id,
        index: index + 1,
        title: course.title,
        category: course.category,
        duration: course.duration || '30分钟',
        emoji: emojiList[index % emojiList.length],
        courseCompleted: courseCompleted,
        assignmentCompleted: assignmentCompleted,
        hasAssignment: courseAssignments.length > 0,
        current: isCurrent,
        locked: locked,
        progress: isCurrent ? (course.progress || 0) : 0,
        completedDate: courseCompleted ? this.getCompletedDate(course.id) : null,
        position: `left: ${xPos}%; top: ${yPos}rpx;`
      }
    })

    // 计算统计数据（课程和作业都完成才算完成）
    const completedCount = courses.filter(c => c.courseCompleted && c.assignmentCompleted).length
    const totalCount = courses.length
    const progressPercent = Math.round((completedCount / totalCount) * 100)

    this.setData({
      courses: courses,
      completedCount: completedCount,
      totalCount: totalCount,
      progressPercent: progressPercent
    })
  },

  // 获取完成日期
  getCompletedDate(courseId) {
    // 从本地存储获取完成日期
    const completedDates = wx.getStorageSync('coursesCompletedDates') || {}
    if (completedDates[courseId]) {
      return this.formatDate(new Date(completedDates[courseId]))
    }
    return null
  },

  // 格式化日期
  formatDate(date) {
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${month}月${day}日`
  },

  // 点击课程
  onCourseClick(e) {
    const course = e.currentTarget.dataset.course

    if (course.locked) {
      wx.showToast({
        title: '🔒 先完成前面的关卡才能解锁哦！',
        icon: 'none',
        duration: 2000
      })
      return
    }

    // 跳转到课程视频页面
    wx.navigateTo({
      url: `/pages/video/video?courseId=${course.id}`
    })
  },

  // 点击作业
  onAssignmentClick(e) {
    const course = e.currentTarget.dataset.course

    if (course.locked) {
      wx.showToast({
        title: '🔒 先完成前面的关卡才能解锁哦！',
        icon: 'none',
        duration: 2000
      })
      return
    }

    if (!course.hasAssignment) {
      wx.showToast({
        title: '这个课程暂时没有作业哦',
        icon: 'none',
        duration: 2000
      })
      return
    }

    // 跳转到作业页面
    wx.navigateTo({
      url: `/pages/assignments/assignments?courseId=${course.id}`
    })
  },

  // 显示随机鼓励提示
  showRandomTip() {
    const tips = [
      { character: '🐻', text: '加油！每完成一关就能获得三颗星星哦！' },
      { character: '🦊', text: '你真棒！继续努力通关吧！' },
      { character: '🐰', text: '学习让你变得更聪明啦！' },
      { character: '🐼', text: '坚持就是胜利，加油加油！' },
      { character: '🐨', text: '每天进步一点点，你会越来越厉害！' },
      { character: '🐯', text: '勇敢挑战新关卡，你一定可以的！' }
    ]

    const randomTip = tips[Math.floor(Math.random() * tips.length)]

    this.setData({
      showTip: true,
      tipCharacter: randomTip.character,
      tipText: randomTip.text
    })

    // 5秒后隐藏提示
    setTimeout(() => {
      this.setData({ showTip: false })
    }, 5000)
  }
})
