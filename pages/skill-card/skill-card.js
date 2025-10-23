const app = getApp()

Page({
  data: {
    cardId: null,
    skillCard: null,
    relatedCourse: null,
    relatedAssignment: null
  },

  onLoad(options) {
    const cardId = parseInt(options.cardId)
    this.setData({
      cardId: cardId
    })
    this.loadSkillCard(cardId)
  },

  // 加载技能卡片信息
  loadSkillCard(cardId) {
    const skillCard = app.globalData.skillCards.find(c => c.id === cardId)
    if (!skillCard) {
      wx.showToast({
        title: '技能卡片不存在',
        icon: 'none'
      })
      wx.navigateBack()
      return
    }

    this.setData({
      skillCard: skillCard
    })

    // 查找相关课程和作业
    this.findRelatedResources(skillCard)
  },

  // 查找相关资源
  findRelatedResources(skillCard) {
    const courses = app.globalData.courses
    const assignments = app.globalData.assignments

    // 根据分类查找相关课程
    const relatedCourse = courses.find(course =>
      course.category === skillCard.category ||
      course.title.includes(skillCard.title.split('-')[0])
    )

    // 根据分类查找相关作业
    const relatedAssignment = assignments.find(assignment =>
      assignment.category === skillCard.category ||
      assignment.title.includes(skillCard.title.split('-')[0])
    )

    this.setData({
      relatedCourse: relatedCourse,
      relatedAssignment: relatedAssignment
    })
  },

  // 获取技能描述
  getSkillDescription(title) {
    const descriptions = {
      '生物社会理论基础': 'DBT的生物社会理论认为，情绪调节困难源于生物脆弱性和无效环境的相互作用。理解这一理论有助于我们更好地认识情绪问题的根源。',
      'HOW技能': '正念的"HOW"技能包括：不评判、一心一意、有效地。这些技能帮助我们以正确的方式进行正念练习。',
      'WHAT技能': '正念的"WHAT"技能包括：观察、描述、参与。这些是正念练习的核心内容。',
      '智慧心': '智慧心是理性心和情绪心的平衡状态，在这种状态下我们能够做出最明智的决定。',
      'ACCEPT': 'ACCEPT技能帮助我们在痛苦时刻接受现实，包括：活动、贡献、比较、情绪、推开、思考。',
      'IMPROVE': 'IMPROVE技能通过改善当下时刻来缓解痛苦，包括：意象、意义、祈祷、放松、一件事、假期、鼓励。',
      'TIP': 'TIP技能通过改变身体化学来快速改变情绪，包括：温度、激烈运动、节律呼吸、肌肉放松。'
    }
    return descriptions[title] || '这是一个重要的DBT技能，通过学习和练习可以帮助你更好地管理情绪和应对困难。'
  },

  // 获取技能要点
  getSkillTips(title) {
    const tips = {
      '生物社会理论基础': [
        '理解情绪问题的生物和环境因素',
        '认识到情绪调节困难不是个人缺陷',
        '学会用同情心对待自己'
      ],
      'HOW技能': [
        '不评判：观察而不评价',
        '一心一意：专注当下',
        '有效地：关注什么有用'
      ],
      'WHAT技能': [
        '观察：注意但不反应',
        '描述：用词语标记体验',
        '参与：全身心投入活动'
      ],
      '智慧心': [
        '平衡理性和情绪',
        '寻找内在智慧',
        '做出明智决定'
      ]
    }
    return tips[title] || ['定期练习这个技能', '在日常生活中应用', '保持耐心和坚持']
  },

  // 获取练习建议
  getPracticeAdvice(title) {
    const advice = {
      '生物社会理论基础': '每天花几分钟思考你的情绪反应，尝试识别其中的生物因素和环境因素。',
      'HOW技能': '在日常活动中练习这些技能，比如吃饭时一心一意，观察时不评判。',
      'WHAT技能': '从简单的观察练习开始，逐渐增加描述和参与的练习。',
      '智慧心': '通过冥想和反思来培养智慧心，在做决定前先问问自己的内在智慧。'
    }
    return advice[title] || '建议每天练习这个技能5-10分钟，并在需要时应用到实际情况中。'
  },

  // 跳转到相关课程
  goToRelatedCourse() {
    if (this.data.relatedCourse) {
      wx.navigateTo({
        url: `/pages/video/video?courseId=${this.data.relatedCourse.id}`
      })
    }
  },

  // 跳转到相关作业
  goToRelatedAssignment() {
    if (this.data.relatedAssignment) {
      wx.navigateTo({
        url: `/pages/assignment-detail/assignment-detail?assignmentId=${this.data.relatedAssignment.id}`
      })
    }
  },

  // 跳转到我的笔记
  goToEmotion() {
    wx.switchTab({
      url: '/pages/emotion/emotion'
    })
  }
})
