const app = getApp()

Page({
  data: {
    totalExperience: 0,
    notes: [],
    showModal: false,
    isEditing: false,
    currentNoteId: null,
    currentNoteContent: ''
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
    const notes = wx.getStorageSync('userNotes') || []

    this.setData({
      totalExperience: learningProgress.totalExperience,
      notes: notes
    })
  },

  // 添加笔记
  addNote() {
    this.setData({
      showModal: true,
      isEditing: false,
      currentNoteId: null,
      currentNoteContent: ''
    })
  },

  // 编辑笔记
  editNote(e) {
    const noteId = e.currentTarget.dataset.id
    const note = this.data.notes.find(n => n.id === noteId)

    if (note) {
      this.setData({
        showModal: true,
        isEditing: true,
        currentNoteId: noteId,
        currentNoteContent: note.content
      })
    }
  },

  // 删除笔记
  deleteNote(e) {
    const noteId = e.currentTarget.dataset.id

    wx.showModal({
      title: '确认删除',
      content: '确定要删除这条笔记吗？',
      success: (res) => {
        if (res.confirm) {
          let notes = this.data.notes.filter(n => n.id !== noteId)
          wx.setStorageSync('userNotes', notes)

          this.setData({
            notes: notes
          })

          wx.showToast({
            title: '删除成功',
            icon: 'success'
          })
        }
      }
    })
  },

  // 笔记内容输入
  onNoteInput(e) {
    this.setData({
      currentNoteContent: e.detail.value
    })
  },

  // 保存笔记
  saveNote() {
    const content = this.data.currentNoteContent.trim()

    if (!content) {
      wx.showToast({
        title: '请输入笔记内容',
        icon: 'none'
      })
      return
    }

    let notes = [...this.data.notes]
    const isEditing = this.data.isEditing

    if (isEditing) {
      // 编辑现有笔记
      const index = notes.findIndex(n => n.id === this.data.currentNoteId)
      if (index !== -1) {
        notes[index] = {
          ...notes[index],
          content: content,
          updateTime: this.formatDate(new Date())
        }
      }
    } else {
      // 添加新笔记
      const newNote = {
        id: Date.now(),
        content: content,
        createTime: this.formatDate(new Date()),
        updateTime: this.formatDate(new Date())
      }
      notes.unshift(newNote)
    }

    // 保存到本地存储
    try {
      wx.setStorageSync('userNotes', notes)

      this.setData({
        notes: notes,
        showModal: false,
        currentNoteContent: '',
        currentNoteId: null,
        isEditing: false
      })

      wx.showToast({
        title: isEditing ? '修改成功' : '添加成功',
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

  // 关闭弹窗
  closeModal() {
    const content = this.data.currentNoteContent.trim()

    // 如果有内容，提示用户确认
    if (content) {
      wx.showModal({
        title: '提示',
        content: '确定要放弃编辑吗？',
        success: (res) => {
          if (res.confirm) {
            this.setData({
              showModal: false,
              currentNoteContent: '',
              currentNoteId: null,
              isEditing: false
            })
          }
        }
      })
    } else {
      this.setData({
        showModal: false,
        currentNoteContent: '',
        currentNoteId: null,
        isEditing: false
      })
    }
  },

  // 阻止事件冒泡
  stopPropagation() {
    // 空函数，用于阻止事件冒泡
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
