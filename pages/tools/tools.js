const app = getApp()

Page({
  data: {
    totalExperience: 0,
    skillCards: [],
    filteredCards: [],
    currentCategory: 'all'
  },

  onLoad() {
    this.loadData()
  },

  onShow() {
    this.loadData()
  },

  // 加载数据
  loadData() {
    const learningProgress = app.globalData.learningProgress
    const skillCards = app.globalData.skillCards

    this.setData({
      totalExperience: learningProgress.totalExperience,
      skillCards: skillCards,
      filteredCards: skillCards
    })
  },

  // 设置分类筛选
  setCategory(e) {
    const category = e.currentTarget.dataset.category
    this.setData({
      currentCategory: category
    })
    this.filterCards()
  },

  // 筛选卡片
  filterCards() {
    const { skillCards, currentCategory } = this.data
    let filtered = skillCards

    if (currentCategory !== 'all') {
      filtered = skillCards.filter(card => card.category === currentCategory)
    }

    this.setData({
      filteredCards: filtered
    })
  },

  // 获取分类图标
  getCategoryIcon(category) {
    const icons = {
      '情绪管理-生物社会理论': '🧠',
      '正念': '🧘',
      '痛苦耐受': '💪',
      '情绪调节': '❤️',
      '人际效能': '🤝'
    }
    return icons[category] || '🛠️'
  },

  // 获取分类样式类
  getCategoryClass(category) {
    const classes = {
      '情绪管理-生物社会理论': 'theory-icon',
      '正念': 'mindfulness-icon',
      '痛苦耐受': 'distress-icon',
      '情绪调节': 'emotion-icon',
      '人际效能': 'interpersonal-icon'
    }
    return classes[category] || 'default-icon'
  },

  // 查看技能卡片详情
  viewSkillCard(e) {
    const cardId = e.currentTarget.dataset.cardId
    wx.navigateTo({
      url: `/pages/skill-card/skill-card?cardId=${cardId}`
    })
  },

  // 跳转到我的笔记
  goToEmotion() {
    wx.switchTab({
      url: '/pages/emotion/emotion'
    })
  },

  // 显示即将推出提示
  showComingSoon() {
    wx.showToast({
      title: '功能即将推出',
      icon: 'none'
    })
  }
})
