const app = getApp()

// DBT作业模板配置
const ASSIGNMENT_TEMPLATES = {
  'PLEASE技能': {
    type: 'please',
    guide: 'PLEASE技巧·我已经',
    fields: [
      { id: 'q1', label: '1、治疗身体疾病?', type: 'radio-text', options: ['是', '否'], textPlaceholder: '请填写具体内容' },
      { id: 'q2', label: '2、均衡饮食?', type: 'radio-text', options: ['是', '否'], textPlaceholder: '请填写具体内容' },
      { id: 'q3', label: '3、远离改变情绪的物质?', type: 'radio-text', options: ['是', '否'], textPlaceholder: '请填写具体内容' },
      { id: 'q4', label: '4、均衡睡眠?', type: 'radio-text', options: ['是', '否'], textPlaceholder: '请填写具体内容' },
      { id: 'q5', label: '5、适当运动?', type: 'radio-text', options: ['是', '否'], textPlaceholder: '请填写具体内容' }
    ]
  },
  '相反行为': {
    type: 'opposite-action',
    guide: '用相反行为改变情绪，找出您想改变的情绪反应，或者您为之感到痛苦的情绪反应，评估这种情绪反应是否和事实符合。如果不是，请关注因情绪而来的行为冲动。然后找出与这种情绪相反的行为，并采取这个相反行为。记住，要练习完全相反的行为。描述所发生的事。',
    fields: [
      { id: 'emotion', label: '1、情绪名称', type: 'text' },
      { id: 'intensity_before', label: '2、请评价其强度(0~100) - 练习前', type: 'number', min: 0, max: 100 },
      { id: 'intensity_after', label: '练习后', type: 'number', min: 0, max: 100 },
      { id: 'trigger', label: '3、诱发事件(人、事、时、地):是什么引发了情绪?', type: 'textarea' },
      { id: 'reasonable_yes', label: '4、我的情绪合理之处', type: 'textarea' },
      { id: 'reasonable_no', label: '我的情绪不合理之处', type: 'textarea' },
      { id: 'is_reasonable', label: '我的情绪是否合理?', type: 'radio', options: ['合理:解决问题', '不合理:继续完成此练习单'] },
      { id: 'impulse', label: '4.1 行为冲动-我想做什么或说什么?(若不合理，请填写)', type: 'textarea' },
      { id: 'opposite', label: '4.2 相反行为-我的冲动的相反行为是什么?(若不合理，请填写)', type: 'textarea' },
      { id: 'what_did', label: '4.3 我做了什么?具体描述(若不合理，请填写)', type: 'textarea' },
      { id: 'how_did', label: '4.4 我如何做:描述肢体语言、面部表情姿势、手势和想法(若不合理，请填写)', type: 'textarea' },
      { id: 'consequence', label: '4.5 相反行为会导致什么后果(心理状态其他情绪、行为、想法、记忆、身体状态等)?(若不合理，请填写)', type: 'textarea' }
    ]
  },
  '对当下情绪保持正念': {
    type: 'mindful-emotion',
    guide: '对当下的情绪保持正念',
    fields: [
      { id: 'emotion', label: '1、情绪名称', type: 'text' },
      { id: 'intensity_before', label: '2、请评价其强度(0~100) - 练习前', type: 'number', min: 0, max: 100 },
      { id: 'intensity_after', label: '练习后', type: 'number', min: 0, max: 100 },
      { id: 'situation', label: '3、详细写下诱发情绪的情境', type: 'textarea' },
      { id: 'steps', label: '5、按以下步骤进行', type: 'checkbox', options: [
        'A. 让一切停顿下来，只关注能感受到的情绪',
        'B. 感受情绪的起起落落',
        'C. 不对情绪加以评判',
        'D. 注意身体的哪个部位感受到情绪最强烈',
        'E. 将注意力投放在当下的身体感觉',
        'F. 注意情绪的削弱时间',
        'G. 提醒自己不要太苛求情绪',
        'H. 自己不喜欢的情绪，可以试着练习"我愿意"技能',
        'I. 想象情绪的来来去去',
        'J. 察觉随着情绪而来的行为冲动',
        'K. 不要跟着情绪走',
        'L. 告诫自己曾经的不同感受',
        'M. 练习全然接纳自己的情绪',
        'N. 尝试去爱自己的情绪'
      ]},
      { id: 'reflection', label: '6、对体验的感想与描述', type: 'textarea' }
    ]
  }
  // 可以继续添加其他作业模板...
}

Page({
  data: {
    assignmentId: null,
    assignment: null,
    template: null,
    formData: {},
    canSubmit: false,
    completedData: null
  },

  onLoad(options) {
    const assignmentId = parseInt(options.assignmentId)
    this.setData({ assignmentId })
    this.loadAssignment(assignmentId)
  },

  // 加载作业信息
  loadAssignment(assignmentId) {
    const assignment = app.globalData.assignments.find(a => a.id === assignmentId)
    if (!assignment) {
      wx.showToast({ title: '作业不存在', icon: 'none' })
      wx.navigateBack()
      return
    }

    // 获取作业模板
    const template = ASSIGNMENT_TEMPLATES[assignment.title]

    // 初始化表单数据
    const formData = {}
    if (template && template.fields) {
      template.fields.forEach(field => {
        if (field.type === 'checkbox') {
          formData[field.id] = []
        } else if (field.type === 'radio-text') {
          formData[field.id] = { radio: '', text: '' }
        } else {
          formData[field.id] = ''
        }
      })
    }

    this.setData({
      assignment,
      template,
      formData
    })

    // 加载已完成的数据
    if (app.globalData.learningProgress.completedAssignments.includes(assignmentId)) {
      this.loadCompletedData(assignmentId)
    }
  },

  // 加载已完成的作业数据
  loadCompletedData(assignmentId) {
    const completedAssignments = wx.getStorageSync('completedAssignments') || {}
    const completedData = completedAssignments[assignmentId]

    if (completedData) {
      this.setData({
        completedData,
        formData: completedData.formData || {}
      })
    }
  },

  // 表单输入处理
  onFieldInput(e) {
    const { field } = e.currentTarget.dataset
    const value = e.detail.value

    this.setData({
      [`formData.${field}`]: value
    })
    this.checkCanSubmit()
  },

  // 单选框处理
  onRadioChange(e) {
    const { field } = e.currentTarget.dataset
    const value = e.detail.value

    this.setData({
      [`formData.${field}`]: value
    })
    this.checkCanSubmit()
  },

  // 复选框处理
  onCheckboxChange(e) {
    const { field } = e.currentTarget.dataset
    const values = e.detail.value

    this.setData({
      [`formData.${field}`]: values
    })
    this.checkCanSubmit()
  },

  // 单选+文本框处理
  onRadioTextChange(e) {
    const { field, type } = e.currentTarget.dataset
    const value = e.detail.value

    const currentData = this.data.formData[field] || { radio: '', text: '' }
    if (type === 'radio') {
      currentData.radio = value
    } else {
      currentData.text = value
    }

    this.setData({
      [`formData.${field}`]: currentData
    })
    this.checkCanSubmit()
  },

  // 检查是否可以提交
  checkCanSubmit() {
    // 简单检查：至少填写了一个字段
    const formData = this.data.formData
    let hasContent = false

    for (let key in formData) {
      const value = formData[key]
      if (typeof value === 'string' && value.trim() !== '') {
        hasContent = true
        break
      } else if (Array.isArray(value) && value.length > 0) {
        hasContent = true
        break
      } else if (typeof value === 'object' && (value.radio || value.text)) {
        hasContent = true
        break
      }
    }

    this.setData({ canSubmit: hasContent })
  },

  // 提交作业
  submitAssignment() {
    if (!this.data.canSubmit) {
      wx.showToast({ title: '请至少填写一项内容', icon: 'none' })
      return
    }

    const assignmentData = {
      formData: this.data.formData,
      completionDate: this.formatDate(new Date()),
      timestamp: Date.now()
    }

    // 保存到本地存储
    let completedAssignments = wx.getStorageSync('completedAssignments') || {}
    completedAssignments[this.data.assignmentId] = assignmentData
    wx.setStorageSync('completedAssignments', completedAssignments)

    // 更新全局数据
    const learningProgress = app.globalData.learningProgress
    if (!learningProgress.completedAssignments.includes(this.data.assignmentId)) {
      learningProgress.completedAssignments.push(this.data.assignmentId)
      learningProgress.totalExperience += 35
      app.saveUserData()
    }

    wx.showToast({ title: '作业提交成功！+20经验值', icon: 'success', duration: 2000 })

    setTimeout(() => {
      wx.navigateBack()
    }, 2000)
  },

  // 格式化日期
  formatDate(date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day} ${hours}:${minutes}`
  }
})
