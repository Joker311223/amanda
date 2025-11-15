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
    // 技能卡片与图片的映射关系（使用 OSS 图片）
    imageMap: {
      // 1-情绪管理（3张）
      '生物社会理论1': { 
        order: 1, 
        images: ['https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/图片/技能卡片（最新）/情绪管理-生物社会理论1.jpg'] 
      },
      '生物社会理论2': { 
        order: 2, 
        images: ['https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/图片/技能卡片（最新）/情绪管理-生物社会理论2.jpg'] 
      },
      '生物社会技能3': { 
        order: 3, 
        images: ['https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/图片/技能卡片（最新）/情绪管理-生物社会技能3.jpg'] 
      },

      // 2-正念（4张）
      '智慧心': { 
        order: 4, 
        images: ['https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/图片/技能卡片（最新）/正念-智慧心.jpg'] 
      },
      'WHAT技能': { 
        order: 5, 
        images: ['https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/图片/技能卡片（最新）/正念-WHAT技能.jpg'] 
      },
      'HOW技能': { 
        order: 6, 
        images: ['https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/图片/技能卡片（最新）/正念-HOW技能.jpg'] 
      },
      '练习观察': { 
        order: 7, 
        images: ['https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/图片/技能卡片（最新）/正念-练习观察.jpg'] 
      },

      // 3-痛苦耐受（13张）
      '总概': { 
        order: 8, 
        images: ['https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/图片/技能卡片（最新）/痛苦耐受-总概.jpg'] 
      },
      'ACCEPT': { 
        order: 9, 
        images: ['https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/图片/技能卡片（最新）/痛苦耐受-转移注意力ACCEPT.jpg'] 
      },
      'IMPROVE': { 
        order: 10, 
        images: ['https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/图片/技能卡片（最新）/痛苦耐受-改善当下IMPROVE.jpg'] 
      },
      'STOP': { 
        order: 11, 
        images: ['https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/图片/技能卡片（最新）/痛苦耐受-STOP.jpg'] 
      },
      'TIP': { 
        order: 12, 
        images: ['https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/图片/技能卡片（最新）/痛苦耐受-TIP.jpg'] 
      },
      '保持正念': { 
        order: 13, 
        images: ['https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/图片/技能卡片（最新）/痛苦耐受-保持正念.jpg'] 
      },
      '全然接纳1': { 
        order: 14, 
        images: ['https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/图片/技能卡片（最新）/痛苦耐受-全然接纳1.jpg'] 
      },
      '全然接纳2': { 
        order: 15, 
        images: ['https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/图片/技能卡片（最新）/痛苦耐受-全然接纳2.jpg'] 
      },
      '全然接纳3': { 
        order: 16, 
        images: ['https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/图片/技能卡片（最新）/痛苦耐受-全然接纳3.jpg'] 
      },
      '全然接纳4': { 
        order: 17, 
        images: ['https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/图片/技能卡片（最新）/痛苦耐受-全然接纳4.jpg'] 
      },
      '全然接纳5': { 
        order: 18, 
        images: ['https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/图片/技能卡片（最新）/痛苦耐受-全然接纳5.jpg'] 
      },
      '身体扫描': { 
        order: 19, 
        images: ['https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/图片/技能卡片（最新）/痛苦耐受-身体扫描.jpg'] 
      },
      '自我安抚': { 
        order: 20, 
        images: ['https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/图片/技能卡片（最新）/痛苦耐受-自我安抚.jpg'] 
      },

      // 4-情绪调节（3张）
      'PLEASE': { 
        order: 21, 
        images: ['https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/图片/技能卡片（最新）/情绪调节-PLEASE.jpg'] 
      },
      '相反行为': { 
        order: 22, 
        images: ['https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/图片/技能卡片（最新）/情绪调节-相反行为.jpg'] 
      },
      '积累正面情绪': { 
        order: 23, 
        images: ['https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/图片/技能卡片（最新）/情绪调节-积累正面情绪.jpg'] 
      },

      // 5-人际效能（5张）
      '总概': { 
        order: 24, 
        images: ['https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/图片/技能卡片（最新）/人际效能-总概.jpg'] 
      },
      'FAST': { 
        order: 25, 
        images: ['https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/图片/技能卡片（最新）/人际效能-尊重自己FAST.jpg'] 
      },
      'GIVE': { 
        order: 26, 
        images: ['https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/图片/技能卡片（最新）/人际效能-维持关系GIVE.jpg'] 
      },
      'DEARMAN1': { 
        order: 27, 
        images: ['https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/图片/技能卡片（最新）/人际效能-如你所愿DEARMAN1.jpg'] 
      },
      'DEARMAN2': { 
        order: 28, 
        images: ['https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/图片/技能卡片（最新）/人际效能-如你所愿DEARMAN2.jpg'] 
      }
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
    // 按照imageMap中的order字段排序卡片
    const sortedCards = skillCards
    this.setData({
      totalExperience: learningProgress.totalExperience,
      skillCards: skillCards,
      filteredCards: sortedCards
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
    const { skillCards, currentCategory, imageMap } = this.data
    let filtered = skillCards

    if (currentCategory !== 'all') {
      filtered = skillCards.filter(card => card.category === currentCategory)
    } else {
      // 当选择"全部"时，按照imageMap中的order字段排序
      filtered = [...skillCards].sort((a, b) => {
        const mapA = imageMap[a.title]
        const mapB = imageMap[b.title]
        
        // 如果都在imageMap中，按照order排序
        if (mapA && mapB) {
          return mapA.order - mapB.order
        }
        // 如果只有a在imageMap中，a排在前面
        if (mapA) return -1
        // 如果只有b在imageMap中，b排在前面
        if (mapB) return 1
        // 如果都不在imageMap中，保持原顺序
        return 0
      })
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
    const imageMapItem = this.data.imageMap[card.title]
    const images = imageMapItem ? imageMapItem.images : []
    console.log('卡片标题:', card.title)
    console.log('对应的图片:', images)

    if (!images || images.length === 0) {
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
