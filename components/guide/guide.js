Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    steps: {
      type: Array,
      value: []
    }
  },

  data: {
    currentStepIndex: 0,
    currentStep: {},
    totalSteps: 0,
    highlightTop: 0,
    highlightLeft: 0,
    highlightWidth: 0,
    highlightHeight: 0,
    tipTop: 0,
    tipLeft: 0,
    tipPosition: 'tip-bottom',
    arrowPosition: 'arrow-top'
  },

  observers: {
    'show, steps': function(show, steps) {
      if (show && steps && steps.length > 0) {
        this.setData({
          totalSteps: steps.length,
          currentStepIndex: 0
        })
        this.showStep(0)
      }
    }
  },

  methods: {
    // 显示指定步骤
    showStep(index) {
      const steps = this.properties.steps
      if (index < 0 || index >= steps.length) return

      const step = steps[index]
      this.setData({
        currentStepIndex: index,
        currentStep: step
      })

      // 如果有选择器，计算高亮位置
      if (step.selector) {
        this.calculatePosition(step.selector, step)
      } else {
        // 没有选择器，显示居中提示
        this.setData({
          tipPosition: 'tip-center',
          highlightWidth: 0,
          highlightHeight: 0
        })
      }
    },

    // 计算高亮和提示框位置
    calculatePosition(selector, step) {
      // 使用页面级别的选择器查询，而不是组件内部的
      const query = wx.createSelectorQuery()
      query.select(selector).boundingClientRect()
      query.selectViewport().scrollOffset()
      query.exec((res) => {
        if (res[0]) {
          const rect = res[0]
          const scrollTop = res[1] ? res[1].scrollTop : 0

          // 设置高亮区域
          const padding = step.padding || 10
          this.setData({
            highlightTop: rect.top + scrollTop - padding,
            highlightLeft: rect.left - padding,
            highlightWidth: rect.width + padding * 2,
            highlightHeight: rect.height + padding * 2
          })

          // 计算提示框位置
          this.calculateTipPosition(rect, scrollTop, step)
        } else {
          console.warn('未找到选择器对应的元素:', selector)
        }
      })
    },

    // 计算提示框位置
    calculateTipPosition(rect, scrollTop, step) {
      const systemInfo = wx.getSystemInfoSync()
      const windowHeight = systemInfo.windowHeight
      const windowWidth = systemInfo.windowWidth
      const pixelRatio = systemInfo.pixelRatio || 2

      // rpx转px: 750rpx = windowWidth px
      const tipMaxWidth = (600 / 750) * windowWidth // 600rpx转为实际px
      const tipHeight = 280 // 估算提示框高度（px）

      let tipTop = 0
      let tipLeft = 0
      let tipPosition = 'tip-bottom'
      let arrowPosition = 'arrow-top'

      // 判断提示框应该在高亮区域的上方还是下方
      const spaceBelow = windowHeight - rect.bottom
      const spaceAbove = rect.top

      if (spaceBelow > tipHeight + 40 || spaceBelow > spaceAbove) {
        // 提示框在下方
        tipTop = rect.bottom + 20
        tipPosition = 'tip-bottom'
        arrowPosition = 'arrow-top'
      } else {
        // 提示框在上方
        tipTop = rect.top - tipHeight - 20
        tipPosition = 'tip-top'
        arrowPosition = 'arrow-bottom'
      }

      // 水平居中对齐高亮区域
      tipLeft = rect.left + rect.width / 2 - tipMaxWidth / 2

      // 确保不超出屏幕边界
      const margin = 20
      if (tipLeft < margin) {
        tipLeft = margin
      }
      if (tipLeft + tipMaxWidth > windowWidth - margin) {
        tipLeft = windowWidth - tipMaxWidth - margin
      }

      console.log('提示框位置计算:', {
        rect,
        tipTop,
        tipLeft,
        tipPosition,
        windowHeight,
        windowWidth,
        spaceBelow,
        spaceAbove
      })

      this.setData({
        tipTop,
        tipLeft,
        tipPosition,
        arrowPosition
      })
    },

    // 下一步
    onNextStep() {
      const nextIndex = this.data.currentStepIndex + 1

      if (nextIndex >= this.data.totalSteps) {
        // 完成导引
        this.triggerEvent('complete')
      } else {
        this.showStep(nextIndex)
        this.triggerEvent('stepchange', { step: nextIndex })
      }
    },

    // 上一步
    onPrevStep() {
      const prevIndex = this.data.currentStepIndex - 1
      if (prevIndex >= 0) {
        this.showStep(prevIndex)
        this.triggerEvent('stepchange', { step: prevIndex })
      }
    },

    // 点击遮罩层（可选：允许点击遮罩关闭）
    onMaskTap() {
      // 不做任何操作，强制用户完成导引
      // 如果想允许跳过，可以调用：this.triggerEvent('skip')
    }
  }
})
