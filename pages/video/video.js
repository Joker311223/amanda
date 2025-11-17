const app = getApp()

Page({
  data: {
    courseId: null,
    currentCourse: null,
    courseNumber: 0, // 课程序号
    isPlaying: false,
    isFinied:false,
    playProgress: 0,
    currentTime: '00:00',
    totalTime: '08:45',
    notes: '',
    courseNotesList: [], // 当前课程的笔记列表
    editingNoteId: null, // 正在编辑的笔记ID
    isCompleted: false,
    showExperienceGain: false,
    playTimer: null,
    videoUrl: '',
    isCourseCompleted: false, // 课程是否已完成
    playbackRate: 1, // 播放速率
    isLongPressing: false, // 是否正在长按
    isFullscreen: false, // 是否全屏
    longPressTimer: null, // 长按计时器
    isVideoPlaying: false, // 视频播放状态
    videoCurrentTime: 0 // 视频当前播放时间（秒）
  },

  onLoad(options) {
    const courseId = parseInt(options.courseId)
    const courses = app.globalData.courses;
    const course = courses.find(c => c.id === courseId)
    const videoUrl = course.url

    console.log('yjc=>videoUrl', videoUrl);
    this.setData({
      courseId: courseId,
      videoUrl: videoUrl
    })
    this.loadCourse(courseId)
    this.loadCourseNotes(courseId)
    
    // 加载保存的播放进度
    this.loadVideoProgress(courseId)
  },

  onUnload() {
    // 清理定时器
    if (this.data.playTimer) {
      clearInterval(this.data.playTimer)
    }
    
    // 保存播放进度（使用当前记录的时间）
    this.saveVideoProgressSync()
  },
  
  onHide() {
    // 页面隐藏时也保存进度
    this.saveVideoProgressSync()
  },

  onVideoEnded() {
    console.log('yjc=>视频播放完成');
    this.setData({
      isFinied: true
    })
    
    // 清除该课程的播放进度记录
    try {
      const progressData = wx.getStorageSync('videoProgress') || {}
      delete progressData[this.data.courseId]
      wx.setStorageSync('videoProgress', progressData)
      console.log('yjc=>清除播放进度记录:', this.data.courseId)
    } catch (error) {
      console.error('清除播放进度失败:', error)
    }
    
    // 如果课程还未完成，自动执行完成课程操作
    if (!this.data.isCourseCompleted) {
      console.log('yjc=>自动完成课程:', this.data.courseId)
      // 延迟500ms执行，让用户看到视频结束的画面
      setTimeout(() => {
        this.completeCourse()
      }, 500)
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

    // 判断课程是否已完成
    const isCourseCompleted = course.status === 'completed'
    
    // 计算课程序号（根据ID在所有课程中的位置）
    const courseIndex = app.globalData.courses.findIndex(c => c.id === courseId)
    const courseNumber = courseIndex + 1

    this.setData({
      currentCourse: course,
      courseNumber: courseNumber,
      totalTime: course.duration,
      isCourseCompleted: isCourseCompleted
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

  // 加载课程笔记
  loadCourseNotes(courseId) {
    try {
      // 获取所有笔记
      let allNotes = wx.getStorageSync('userNotes') || []

      // 筛选出当前课程的笔记，按时间倒序排列
      const courseNotes = allNotes
        .filter(note => note.courseId === courseId)
        .sort((a, b) => b.id - a.id)

      this.setData({
        courseNotesList: courseNotes
      })
    } catch (error) {
      console.error('加载笔记失败:', error)
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
    const content = this.data.notes.trim()

    if (!content) {
      wx.showToast({
        title: '请输入笔记内容',
        icon: 'none'
      })
      return
    }

    try {
      // 获取现有笔记列表
      let notes = wx.getStorageSync('userNotes') || []

      if (this.data.editingNoteId) {
        // 编辑模式：更新现有笔记
        const noteIndex = notes.findIndex(note => note.id === this.data.editingNoteId)
        if (noteIndex !== -1) {
          notes[noteIndex].content = content
          notes[noteIndex].updateTime = this.formatDate(new Date())
        }

        this.setData({
          editingNoteId: null
        })
      } else {
        // 新增模式：创建新笔记
        const newNote = {
          id: Date.now(),
          courseId: this.data.courseId,
          content: content,
          courseTitle: this.data.currentCourse ? this.data.currentCourse.title : '视频课程',
          createTime: this.formatDate(new Date()),
          updateTime: this.formatDate(new Date())
        }

        // 添加到笔记列表开头
        notes.unshift(newNote)
      }

      // 保存到本地存储
      wx.setStorageSync('userNotes', notes)

      // 清空输入框
      this.setData({
        notes: ''
      })

      // 重新加载笔记列表
      this.loadCourseNotes(this.data.courseId)

      wx.showToast({
        title: '笔记已保存',
        icon: 'success'
      })
    } catch (error) {
      console.error('保存笔记失败:', error)
      wx.showToast({
        title: '保存失败，请重试',
        icon: 'none'
      })
    }
  },

  // 格式化日期
  formatDate(date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')

    return `${year}-${month}-${day} ${hours}:${minutes}`
  },

  // 完成课程
  completeCourse() {
    // 标记课程为已完成
    app.completeCourse(this.data.courseId)

    // 显示完成弹窗
    this.setData({
      showExperienceGain: true
    })
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
  },

  // 编辑笔记
  editNote(e) {
    const noteId = e.currentTarget.dataset.id
    const note = this.data.courseNotesList.find(n => n.id === noteId)

    if (note) {
      this.setData({
        notes: note.content,
        editingNoteId: noteId
      })

      // 滚动到输入框
      wx.pageScrollTo({
        selector: '.notes-textarea',
        duration: 300
      })
    }
  },

  // 取消编辑
  cancelEdit() {
    this.setData({
      notes: '',
      editingNoteId: null
    })
  },

  // 删除笔记
  deleteNote(e) {
    const noteId = e.currentTarget.dataset.id

    wx.showModal({
      title: '确认删除',
      content: '确定要删除这条笔记吗？',
      success: (res) => {
        if (res.confirm) {
          try {
            let notes = wx.getStorageSync('userNotes') || []
            notes = notes.filter(note => note.id !== noteId)
            wx.setStorageSync('userNotes', notes)

            // 重新加载笔记列表
            this.loadCourseNotes(this.data.courseId)

            wx.showToast({
              title: '删除成功',
              icon: 'success'
            })
          } catch (error) {
            console.error('删除笔记失败:', error)
            wx.showToast({
              title: '删除失败',
              icon: 'none'
            })
          }
        }
      }
    })
  },

  // 切换视频播放/暂停
  toggleVideoPlay() {
    const videoContext = wx.createVideoContext('center', this)
    if (this.data.isVideoPlaying) {
      videoContext.pause()
    } else {
      videoContext.play()
    }
  },

  // 视频播放事件
  onVideoPlay() {
    this.setData({
      isVideoPlaying: true
    })
  },

  // 视频暂停事件
  onVideoPause() {
    this.setData({
      isVideoPlaying: false
    })
  },

  // 进入全屏
  enterFullscreen() {
    const videoContext = wx.createVideoContext('center', this)
    videoContext.requestFullScreen({ direction: 90 }) // 0: 正常竖向, 90: 屏幕逆时针90度, -90: 屏幕顺时针90度
  },

  // 全屏状态变化
  onFullscreenChange(e) {
    this.setData({
      isFullscreen: e.detail.fullScreen
    })
  },

  // 关闭全屏
  onCloseFullscreen() {
    const videoContext = wx.createVideoContext('center', this)
    videoContext.exitFullScreen()
  },

  // 长按开始加速播放
  onLongPressStart() {
    // 只有未完成的课程才能长按加速
    if (!this.data.isCourseCompleted && !this.data.isFullscreen) {
      this.setData({
        isLongPressing: true
      })
      const videoContext = wx.createVideoContext('center', this)
      videoContext.playbackRate(1.5) // 设置1.5倍速
      this.setData({
        playbackRate: 1.5
      })
    }
  },

  // 长按结束恢复正常播放
  onLongPressEnd() {
    if (!this.data.isCourseCompleted && this.data.isLongPressing) {
      const videoContext = wx.createVideoContext('center', this)
      videoContext.playbackRate(1) // 恢复正常速度
      this.setData({
        isLongPressing: false,
        playbackRate: 1
      })
    }
  },

  // 保存视频播放进度（同步方式，使用已记录的时间）
  saveVideoProgressSync() {
    try {
      if (this.data.videoCurrentTime > 0) {
        const progressData = wx.getStorageSync('videoProgress') || {}
        progressData[this.data.courseId] = this.data.videoCurrentTime
        wx.setStorageSync('videoProgress', progressData)
        console.log('yjc=>保存播放进度:', this.data.courseId, this.data.videoCurrentTime)
      }
    } catch (error) {
      console.error('保存播放进度失败:', error)
    }
  },
  
  // 保存视频播放进度（异步方式，获取实时时间）
  saveVideoProgress() {
    try {
      const videoContext = wx.createVideoContext('center', this)
      videoContext.currentTime((currentTime) => {
        if (currentTime > 0) {
          const progressData = wx.getStorageSync('videoProgress') || {}
          progressData[this.data.courseId] = currentTime
          wx.setStorageSync('videoProgress', progressData)
          console.log('yjc=>保存播放进度:', this.data.courseId, currentTime)
        }
      })
    } catch (error) {
      console.error('保存播放进度失败:', error)
    }
  },

  // 加载视频播放进度
  loadVideoProgress(courseId) {
    try {
      const progressData = wx.getStorageSync('videoProgress') || {}
      const savedTime = progressData[courseId] || 0
      
      // 如果有保存的进度且不是接近结尾（留5秒缓冲），则恢复进度
      if (savedTime > 5) {
        // 延迟设置，确保video组件已加载
        setTimeout(() => {
          const videoContext = wx.createVideoContext('center', this)
          videoContext.seek(savedTime)
          this.setData({
            videoCurrentTime: savedTime
          })
          console.log('yjc=>恢复播放进度:', courseId, savedTime, '秒')
          
          // 显示提示
          wx.showToast({
            title: `继续播放 ${this.formatTime(savedTime)}`,
            icon: 'none',
            duration: 2000
          })
        }, 800)
      }
    } catch (error) {
      console.error('加载播放进度失败:', error)
    }
  },
  
  // 格式化时间显示（秒转为 mm:ss）
  formatTime(seconds) {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  },

  // 视频时间更新事件
  onVideoTimeUpdate(e) {
    const currentTime = e.detail.currentTime
    
    // 更新当前播放时间
    this.setData({
      videoCurrentTime: currentTime
    })
    
    // 定期保存播放进度（每5秒保存一次）
    if (Math.floor(currentTime) % 5 === 0 && Math.floor(currentTime) % 5 !== Math.floor(this.lastSaveTime || 0) % 5) {
      this.lastSaveTime = currentTime
      this.saveVideoProgressSync()
    }
  }
})
