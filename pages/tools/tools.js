const app = getApp()

Page({
  data: {
    totalExperience: 0,
    skillCards: [],
    filteredCards: [],
    currentCategory: 'all',
    showImagePreview: false,
    currentImages: [],
    currentImageIndex: 0,
    // 技能卡片与图片的映射关系（使用本地图片）
    imageMap: {
      // 人际效能
      'DEARMAN1': ['/images/技能卡片/人际效能-DEARMAN1.jpg'],
      'DEARMAN2': ['/images/技能卡片/人际效能-DEARMAN2.jpg'],
      'FAST': ['/images/技能卡片/人际效能-FAST.jpg'],
      'GIVE': ['/images/技能卡片/人际效能-GIVE.jpg'],
      '总概': ['/images/技能卡片/人际效能-总概.jpg'],

      // 情绪管理
      '生物社会技能3': ['/images/技能卡片/情绪管理-生物社会技能3.jpg'],
      '生物社会理论1': ['/images/技能卡片/情绪管理-生物社会理论1.jpg'],
      '生物社会理论2': ['/images/技能卡片/情绪管理-生物社会理论2.jpg'],

      // 情绪调节
      'PLEASE': ['/images/技能卡片/情绪调节-PLEASE.jpg'],
      '相反行为': ['/images/技能卡片/情绪调节-相反行为.jpg'],
      '积累正面情绪': ['/images/技能卡片/情绪调节-积累正面情绪.jpg'],

      // 正念
      'HOW技能': ['/images/技能卡片/正念-HOW技能.jpg'],
      'WHAT技能': ['/images/技能卡片/正念-WHAT技能.jpg'],
      '智慧心': ['/images/技能卡片/正念-智慧心.jpg'],
      '练习观察': ['/images/技能卡片/正念-练习观察.jpg'],

      // 痛苦耐受
      'IMPROVE': ['/images/技能卡片/痛苦耐受-IMPROVE.jpg'],
      'STOP': ['/images/技能卡片/痛苦耐受-STOP.jpg'],
      'TIP': ['/images/技能卡片/痛苦耐受-TIP.jpg'],
      '保持正念': ['/images/技能卡片/痛苦耐受-保持正念.jpg'],
      '全然接纳1': ['/images/技能卡片/痛苦耐受-全然接纳1.jpg'],
      '全然接纳2': ['/images/技能卡片/痛苦耐受-全然接纳2.jpg'],
      '全然接纳3': ['/images/技能卡片/痛苦耐受-全然接纳3.jpg'],
      '全然接纳4': ['/images/技能卡片/痛苦耐受-全然接纳4.jpg'],
      '全然接纳5': ['/images/技能卡片/痛苦耐受-全然接纳5.jpg'],
      '总概': ['/images/技能卡片/痛苦耐受-总概.jpg'],
      '自我安抚': ['/images/技能卡片/痛苦耐受-自我安抚.jpg'],
      '身体扫描': ['/images/技能卡片/痛苦耐受-身体扫描.jpg'],
      '转移注意力': ['/images/技能卡片/痛苦耐受-转移注意力.jpg']
    }
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

  // 查看技能卡片详情 - 打开图片预览
  viewSkillCard(e) {
    const cardId = e.currentTarget.dataset.cardId
    console.log('点击卡片ID:', cardId)

    const card = this.data.skillCards.find(c => c.id === cardId)
    console.log('找到的卡片:', card)

    if (!card) {
      console.log('未找到卡片')
      wx.showToast({
        title: '卡片不存在',
        icon: 'none'
      })
      return
    }

    // 获取对应的图片列表
    const images = this.data.imageMap[card.title] || []
    console.log('卡片标题:', card.title)
    console.log('对应的图片:', images)

    if (images.length === 0) {
      wx.showToast({
        title: `暂无图片: ${card.title}`,
        icon: 'none',
        duration: 2000
      })
      return
    }

    // 显示图片预览
    console.log('准备显示图片预览')
    this.setData({
      showImagePreview: true,
      currentImages: images,
      currentImageIndex: 0
    }, () => {
      console.log('图片预览状态已更新:', this.data.showImagePreview)
    })
  },

  // 关闭图片预览
  closeImagePreview() {
    this.setData({
      showImagePreview: false,
      currentImages: [],
      currentImageIndex: 0
    })
  },

  // 切换图片
  onImageChange(e) {
    this.setData({
      currentImageIndex: e.detail.current
    })
  },

  // 图片加载完成
  onImageLoad(e) {
    console.log('图片加载完成', e.detail)
  },

  // 图片点击
  onImageTap(e) {
    // 可以添加其他交互逻辑
  },

  // 阻止事件冒泡
  preventTap() {
    // 阻止点击事件冒泡到背景层
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
