App({
  globalData: {
    userInfo: null,
    isFirstTime: true,
    learningProgress: {
      currentWeek: 1,
      currentDay: 1,
      completedCourses: [],
      completedAssignments: [],
      totalExperience: 0
    },
    courses: [
      // 正念技能
      { id: 1, title: '智慧心', category: '正念', duration: '08:45', status: 'locked', experience: 30, icon: '/images/kechenghuigu-icon1.svg', asssignIds: [1,2], position: '0%' },
      { id: 2, title: '正念"怎样做"技能', category: '正念', duration: '10:30', status: 'locked', experience: 30, icon: '/images/kechenghuigu-icon2.svg', asssignIds: [3,4], position: '40%' },
      { id: 3, title: '正念"是什么"技能', category: '正念', duration: '09:15', status: 'locked', experience: 30, icon: '/images/kechenghuigu-icon3.svg', asssignIds: [5,6], position: '15%'  },

      // 痛苦耐受技能
      { id: 4, title: 'ACCEPT技能', category: '痛苦耐受', duration: '12:20', status: 'locked', experience: 30, icon: '/images/kechenghuigu-icon4.svg', asssignIds: [7],  position: '10%'   },
      { id: 5, title: 'IMPROVE技能', category: '痛苦耐受', duration: '11:45', status: 'locked', experience: 30 , icon: '/images/kechenghuigu-icon5.svg', asssignIds: [8],  position: '40%' },
      { id: 6, title: 'TIP技能', category: '痛苦耐受', duration: '08:30', status: 'locked', experience: 30, icon: '/images/kechenghuigu-icon6.svg', asssignIds: [9],  position: '60%'  },
      { id: 7, title: '全然接纳', category: '痛苦耐受', duration: '13:10', status: 'locked', experience: 30 ,icon: '/images/kechenghuigu-icon7.svg', asssignIds: [10], position: '50%'},
      { id: 8, title: '自我安抚', category: '痛苦耐受', duration: '09:50', status: 'locked', experience: 30, icon: '/images/kechenghuigu-icon8.svg', asssignIds: [11],position: '30%' },

      // 情绪调节技能
      { id: 9, title: 'PLEASE技能', category: '情绪调节', duration: '10:15', status: 'locked', experience: 30, icon: '/images/kechenghuigu-icon9.svg',  asssignIds: [12], position: '10%'  },
      { id: 10, title: '相反行为', category: '情绪调节', duration: '11:30', status: 'locked', experience: 30, icon: '/images/kechenghuigu-icon10.svg',  asssignIds: [13], position: '35%' },
      { id: 11, title: '对当下情绪保持正念', category: '情绪调节', duration: '09:40', status: 'locked', experience: 30, icon: '/images/kechenghuigu-icon11.svg',  asssignIds: [14], position: '60%'  },

      // 人际效能技能
      { id: 12, title: '维持关系（GIVE）', category: '人际效能', duration: '12:00', status: 'locked', experience: 30, icon: '/images/kechenghuigu-icon12.svg',  asssignIds: [15,16], position: '40%'  },
      { id: 13, title: '尊重自己（FAST）', category: '人际效能', duration: '10:45', status: 'locked', experience: 30, icon: '/images/kechenghuigu-icon13.svg',  asssignIds: [17], position: '25%'  },
      { id: 14, title: '如你所愿（DEAR MAN）', category: '人际效能', duration: '13:25', status: 'locked', experience: 30, icon: '/images/kechenghuigu-icon14.svg',  asssignIds: [18], position: '60%'  }
    ],
    assignments: [
      // 正念作业
      { id: 1, title: '正念觉察', category: '正念', courseId: null, status: 'locked', dueDate: '2024-01-15' },
      { id: 2, title: '智慧心', category: '正念', courseId: 1, status: 'locked', dueDate: '2024-01-16' },
      { id: 3, title: '正念"怎样做"技能1（WHAT-1）', category: '正念', courseId: 2, status: 'locked', dueDate: '2024-01-17' },
      { id: 4, title: '正念"怎样做"技能2（WHAT-2）', category: '正念', courseId: 2, status: 'locked', dueDate: '2024-01-18' },
      { id: 5, title: '正念"是什么"技能1（HOW-1）', category: '正念', courseId: 3, status: 'locked', dueDate: '2024-01-19' },
      { id: 6, title: '正念"是什么"技能2（HOW-2）', category: '正念', courseId: 3, status: 'locked', dueDate: '2024-01-20' },

      // 痛苦耐受作业
      { id: 7, title: 'ACCEPT', category: '痛苦耐受', courseId: 4, status: 'locked', dueDate: '2024-01-21' },
      { id: 8, title: 'IMPROVE', category: '痛苦耐受', courseId: 5, status: 'locked', dueDate: '2024-01-22' },
      { id: 9, title: 'TIP', category: '痛苦耐受', courseId: 6, status: 'locked', dueDate: '2024-01-23' },
      { id: 10, title: '全然接纳', category: '痛苦耐受', courseId: 7, status: 'locked', dueDate: '2024-01-24' },
      { id: 11, title: '自我安抚', category: '痛苦耐受', courseId: 8, status: 'locked', dueDate: '2024-01-25' },

      // 情绪调节作业
      { id: 12, title: 'PLEASE技能', category: '情绪调节', courseId: 9, status: 'locked', dueDate: '2024-01-26' },
      { id: 13, title: '相反行为', category: '情绪调节', courseId: 10, status: 'locked', dueDate: '2024-01-27' },
      { id: 14, title: '对当下情绪保持正念', category: '情绪调节', courseId: 11, status: 'locked', dueDate: '2024-01-28' },

      // 人际效能作业
      { id: 15, title: '人际觉察', category: '人际效能', courseId: null, status: 'locked', dueDate: '2024-01-29' },
      { id: 16, title: '维持关系（GIVE）', category: '人际效能', courseId: 12, status: 'locked', dueDate: '2024-01-30' },
      { id: 17, title: '尊重自己（FAST）', category: '人际效能', courseId: 13, status: 'locked', dueDate: '2024-01-31' },
      { id: 18, title: '如你所愿（DEAR MAN）', category: '人际效能', courseId: 14, status: 'locked', dueDate: '2024-02-01' }
    ],
    skillCards: [
      // 情绪管理-生物社会理论（3张）
      { id: 1, title: '生物社会理论基础', category: '情绪管理-生物社会理论' },
      { id: 2, title: '情绪脆弱性', category: '情绪管理-生物社会理论' },
      { id: 3, title: '无效环境', category: '情绪管理-生物社会理论' },

      // 正念（4张）
      { id: 4, title: 'HOW技能', category: '正念' },
      { id: 5, title: 'WHAT技能', category: '正念' },
      { id: 6, title: '练习观察', category: '正念' },
      { id: 7, title: '智慧心', category: '正念' },

      // 痛苦耐受（13张）
      { id: 8, title: '使用情境', category: '痛苦耐受' },
      { id: 9, title: 'ACCEPT', category: '痛苦耐受' },
      { id: 10, title: 'IMPROVE', category: '痛苦耐受' },
      { id: 11, title: 'STOP', category: '痛苦耐受' },
      { id: 12, title: 'TIP', category: '痛苦耐受' },
      { id: 13, title: '保持正念', category: '痛苦耐受' },
      { id: 14, title: '全然接纳1', category: '痛苦耐受' },
      { id: 15, title: '全然接纳2', category: '痛苦耐受' },
      { id: 16, title: '全然接纳3', category: '痛苦耐受' },
      { id: 17, title: '全然接纳4', category: '痛苦耐受' },
      { id: 18, title: '全然接纳5', category: '痛苦耐受' },
      { id: 19, title: '身体扫描', category: '痛苦耐受' },
      { id: 20, title: '自我安抚', category: '痛苦耐受' },

      // 情绪调节（3张）
      { id: 21, title: '情绪调节-PLEASE', category: '情绪调节' },
      { id: 22, title: '情绪调节-积累正面情绪', category: '情绪调节' },
      { id: 23, title: '情绪调节-相反行为', category: '情绪调节' },

      // 人际效能（5张）
      { id: 24, title: '人际效能目标', category: '人际效能' },
      { id: 25, title: 'DEARMAN1', category: '人际效能' },
      { id: 26, title: 'DEARMAN2', category: '人际效能' },
      { id: 27, title: 'FAST', category: '人际效能' },
      { id: 28, title: 'GIVE', category: '人际效能' }
    ]
  },

  onLaunch() {
    // 检查是否首次使用
    const isFirstTime = wx.getStorageSync('isFirstTime')
    if (isFirstTime === '') {
      this.globalData.isFirstTime = true
    } else {
      this.globalData.isFirstTime = false
      // 加载用户数据
      this.loadUserData()
    }
  },

  loadUserData() {
    try {
      const userInfo = wx.getStorageSync('userInfo')
      const learningProgress = wx.getStorageSync('learningProgress')

      if (userInfo) {
        this.globalData.userInfo = userInfo
      }
      if (learningProgress) {
        this.globalData.learningProgress = learningProgress
      }
    } catch (e) {
      console.error('加载用户数据失败', e)
    }
  },

  saveUserData() {
    try {
      wx.setStorageSync('userInfo', this.globalData.userInfo)
      wx.setStorageSync('learningProgress', this.globalData.learningProgress)
      wx.setStorageSync('isFirstTime', false)
    } catch (e) {
      console.error('保存用户数据失败', e)
    }
  },

  // 解锁下一个课程
  unlockNextCourse() {
    const courses = this.globalData.courses
    const completedCount = this.globalData.learningProgress.completedCourses.length

    if (completedCount < courses.length) {
      courses[completedCount].status = 'available'
    }
  },

  // 完成课程
  completeCourse(courseId) {
    const progress = this.globalData.learningProgress
    if (!progress.completedCourses.includes(courseId)) {
      progress.completedCourses.push(courseId)
      progress.totalExperience += 30

      // 解锁对应作业
      this.unlockAssignmentsByCourse(courseId)

      // 解锁下一个课程
      this.unlockNextCourse()

      this.saveUserData()
    }
  },

  // 根据课程解锁作业
  unlockAssignmentsByCourse(courseId) {
    const assignments = this.globalData.assignments
    assignments.forEach(assignment => {
      if (assignment.courseId === courseId) {
        assignment.status = 'available'
      }
    })
  }
})
