const app = getApp()

Page({
  data: {
    courseId: null,
    currentCourse: null,
    isPlaying: false,
    playProgress: 0,
    currentTime: '00:00',
    totalTime: '08:45',
    notes: '',
    isCompleted: false,
    showExperienceGain: false,
    playTimer: null
  },

  onLoad(options) {
    const courseId = parseInt(options.courseId)
    this.setData({
      courseId: courseId
    })
    this.loadCourse(courseId)
  },

  onUnload() {
    // 清理定时器
    if (this.data.playTimer) {
      clearInterval(this.data.playTimer)
    }
  },

  // 加载课程信息
  loadCourse(courseId) {
    const course = app.globalData.courses.find(c => c.id === courseId)
    if (!course) {
      wx.showToast({
        title: '课程不存在',
        icon: 'none'
      })
      wx.navigateBack()
      return
    }

    this.setData({
      currentCourse: course,
      totalTime: course.duration
    })

    // 如果是已完成的课程，显示完成状态
    if (app.globalData.learningProgress.completedCourses.includes(courseId)) {
      this.setData({
        playProgress: 100,
        currentTime: course.duration,
        isCompleted: false // 可以重新观看
      })
    }
  },

  // 切换播放状态
  togglePlay() {
    const isPlaying = !this.data.isPlaying
    this.setData({
      isPlaying: isPlaying
    })

    if (isPlaying) {
      this.startPlayTimer()
    } else {
      this.stopPlayTimer()
    }
  },

  // 开始播放计时器
  startPlayTimer() {
    const timer = setInterval(() => {
      let progress = this.data.playProgress
      if (progress < 100) {
        progress += 2 // 每秒增加2%进度
        const currentSeconds = Math.floor((progress / 100) * this.timeToSeconds(this.data.totalTime))

        this.setData({
          playProgress: progress,
          currentTime: this.secondsToTime(currentSeconds)
        })

        if (progress >= 100) {
          this.setData({
            isPlaying: false,
            playProgress: 100
          })
          this.stopPlayTimer()
        }
      }
    }, 1000)

    this.setData({
      playTimer: timer
    })
  },

  // 停止播放计时器
  stopPlayTimer() {
    if (this.data.playTimer) {
      clearInterval(this.data.playTimer)
      this.setData({
        playTimer: null
      })
    }
  },

  // 后退功能
  rewind() {
    let progress = Math.max(0, this.data.playProgress - 10)
    const currentSeconds = Math.floor((progress / 100) * this.timeToSeconds(this.data.totalTime))

    this.setData({
      playProgress: progress,
      currentTime: this.secondsToTime(currentSeconds)
    })
  },

  // 时间转换辅助函数
  timeToSeconds(timeStr) {
    const [minutes, seconds] = timeStr.split(':').map(Number)
    return minutes * 60 + seconds
  },

  secondsToTime(seconds) {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  },

  // 笔记输入
  onNotesInput(e) {
    this.setData({
      notes: e.detail.value
    })
  },

  // 保存笔记
  saveNotes() {
    wx.showToast({
      title: '笔记已保存',
      icon: 'success'
    })
  },

  // 完成课程
  completeCourse() {
    if (this.data.playProgress < 100) {
      wx.showToast({
        title: '请完整观看视频',
        icon: 'none'
      })
      return
    }

    // 标记课程为已完成
    app.completeCourse(this.data.courseId)

    // 检查是否完成所有课程
    const totalCourses = app.globalData.courses.length
    const completedCourses = app.globalData.learningProgress.completedCourses.length

    if (completedCourses >= totalCourses) {
      // 显示全部完成界面
      this.setData({
        isCompleted: true
      })
    } else {
      // 显示经验获得界面
      this.setData({
        showExperienceGain: true
      })
    }
  },

  // 继续学习之旅
  continueJourney() {
    wx.navigateBack()
  },

  // 查看详情
  viewDetails() {
    wx.showModal({
      title: '学习详情',
      content: `恭喜完成《${this.data.currentCourse.title}》课程！\n\n获得经验：${this.data.currentCourse.experience}分\n课程时长：${this.data.currentCourse.duration}\n\n继续保持学习的热情，每一步都是成长！`,
      showCancel: false,
      confirmText: '知道了'
    })
  }
})
