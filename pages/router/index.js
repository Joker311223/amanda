const app = getApp()

Page({
  data: {
    totalScore: 0,
    completedCount: 0,
    totalCount: 0,
    progressPercent: 0,
    courses: []
  },

  onLoad() {
    this.loadCourses()
  },

  onShow() {
    this.loadCourses()
  },

  // 加载课程数据
  loadCourses() {
    const learningProgress = app.globalData.learningProgress
    const allCourses = app.globalData.courses
    const assignments = app.globalData.assignments || []

    // 可爱的角色emoji库
    const characterEmojis = ['🌵', '🍄', '🐣', '🍦', '🌱', '🦔', '🐝', '🍀', '🦋', '🌸']

    // 处理课程数据
    const courses = []
    let nodeIndex = 0

    allCourses.forEach((course, courseIndex) => {
      const courseCompleted = learningProgress.completedCourses.includes(course.id)
      const courseAssignments = assignments.filter(a => a.courseId === course.id)
      const assignmentCompleted = courseAssignments.length > 0 &&
        courseAssignments.every(a => learningProgress.completedAssignments.includes(a.id))

      // 判断是否是当前课程
      const isCurrent = !courseCompleted && (courseIndex === 0 || learningProgress.completedCourses.includes(allCourses[courseIndex - 1].id))
      const locked = !courseCompleted && !isCurrent

      // 添加1-2个lesson节点
      const lessonCount = Math.floor(Math.random() * 2) + 1
      for (let i = 0; i < lessonCount; i++) {
        const position = this.calculatePosition(nodeIndex)
        courses.push({
          id: `${course.id}-lesson-${i}`,
          courseId: course.id,
          index: nodeIndex + 1,
          type: 'lesson',
          title: course.title,
          courseCompleted: courseCompleted,
          assignmentCompleted: assignmentCompleted,
          current: isCurrent && i === 0,
          locked: locked,
          position: position
        })
        nodeIndex++
      }

      // 添加1个character节点
      const position = this.calculatePosition(nodeIndex)
      courses.push({
        id: `${course.id}-character`,
        courseId: course.id,
        index: nodeIndex + 1,
        type: 'character',
        emoji: characterEmojis[courseIndex % characterEmojis.length],
        title: course.title,
        courseCompleted: courseCompleted,
        assignmentCompleted: assignmentCompleted,
        current: isCurrent && lessonCount === 0,
        locked: locked,
        position: position
      })
      nodeIndex++
    })

    // 计算统计数据
    const completedCount = allCourses.filter(c => learningProgress.completedCourses.includes(c.id)).length
    const totalCount = allCourses.length
    const progressPercent = Math.round((completedCount / totalCount) * 100)

    // 计算总积分 (每完成一个课程10分)
    const totalScore = completedCount * 10

    this.setData({
      courses: courses,
      completedCount: completedCount,
      totalCount: totalCount,
      progressPercent: progressPercent,
      totalScore: totalScore
    })
  },

  // 计算节点位置 - 垂直蛇形路径
  calculatePosition(index) {
    const rowHeight = 280 // 每行高度
    const nodeWidth = 200 // 节点宽度
    const containerWidth = 750 // 容器宽度(rpx)
    const padding = 40 // 左右padding
    const availableWidth = containerWidth - padding * 2 - nodeWidth

    // 计算行和列
    const nodesPerRow = 2 // 每行2个节点
    const row = Math.floor(index / nodesPerRow)
    const col = index % nodesPerRow

    // 蛇形路径: 偶数行从左到右,奇数行从右到左
    const isEvenRow = row % 2 === 0
    let xPos

    if (nodesPerRow === 1) {
      // 单列居中
      xPos = availableWidth / 2
    } else if (nodesPerRow === 2) {
      // 两列布局
      if (isEvenRow) {
        xPos = col === 0 ? 40 : (availableWidth - 40)
      } else {
        xPos = col === 0 ? (availableWidth - 40) : 40
      }
    } else {
      // 多列布局
      if (isEvenRow) {
        xPos = col * (availableWidth / (nodesPerRow - 1))
      } else {
        xPos = (nodesPerRow - 1 - col) * (availableWidth / (nodesPerRow - 1))
      }
    }

    const yPos = row * rowHeight

    return `left: ${xPos}rpx; top: ${yPos}rpx;`
  },

  // 点击节点
  onNodeClick(e) {
    const course = e.currentTarget.dataset.course

    if (course.locked) {
      wx.showToast({
        title: '🔒 先完成前面的关卡才能解锁哦!',
        icon: 'none',
        duration: 2000
      })
      return
    }

    // 根据节点类型跳转
    if (course.type === 'lesson') {
      // 跳转到课程视频页面
      wx.navigateTo({
        url: `/pages/video/video?courseId=${course.courseId}`
      })
    } else if (course.type === 'character') {
      // 跳转到作业页面
      wx.navigateTo({
        url: `/pages/assignments/assignments?courseId=${course.courseId}`
      })
    }
  }
})
