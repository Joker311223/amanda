const app = getApp();

Page({
  data: {
    assignment: null,
    currentQuestion: 0,
    totalQuestions: 0,
    progressPercent: 0,
    problems: [],
    currentProblem: null,
    answer: "",
    optionLabels: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
    sliderSegments: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], // 10个分段
    showCompletionModal: false, // 完成弹窗显示状态
    earnedPoints: 0, // 获得的经验值
    showLeadScreen: true, // 显示导语界面
    isStarting: false, // 开始动画状态
    isAssignmentCompleted: false // 作业是否已完成
  },

  // 加载数据
  loadData(props) {
    const zuoyeId = props.zuoyeId;
    const assignment = app.globalData.assignments[zuoyeId-1];
    const problems = assignment.problems || [];
    const currentProblem = problems[this.data.currentQuestion];
    const progressPercent = ((this.data.currentQuestion + 1) / problems.length) * 100;

    // 检查作业是否已完成
    const isAssignmentCompleted = app.globalData.learningProgress.completedAssignments.includes(zuoyeId);

    // 根据题目类型初始化答案
    let answer = "";
    if (currentProblem) {
      if (currentProblem.type === 'multiple') {
        answer = [];
        // 为多选题的每个选项添加selected属性
        if (currentProblem.options) {
          currentProblem.options = currentProblem.options.map(option => {
            if (typeof option === 'object') {
              return { ...option, selected: false };
            }
            return { title: option, selected: false };
          });
        }
      } else if (currentProblem.type === 'score') {
        answer = currentProblem.min || 0;
      }
    }

    this.setData({
      assignment: assignment,
      zuoyeId: zuoyeId,
      progressPercent: progressPercent,
      totalQuestions: problems.length,
      problems: problems,
      currentProblem: currentProblem,
      answer: answer,
      isAssignmentCompleted: isAssignmentCompleted
    });
  },

  // 文本输入变化
  onInputChange(e) {
    this.setData({
      answer: e.detail.value
    });
  },

  // 单选题选择
  onRadioChange(e) {
    this.setData({
      answer: e.detail.value
    });
  },

  // 单选题点击选项
  onOptionTap(e) {
    const value = e.currentTarget.dataset.value;
    this.setData({
      answer: value
    });
  },

  // 多选题变化
  onCheckboxChange(e) {
    this.setData({
      answer: e.detail.value
    });
  },

  // 多选题点击选项
  onCheckboxTap(e) {
    const index = e.currentTarget.dataset.index;
    const value = e.currentTarget.dataset.value;
    const currentProblem = this.data.currentProblem;

    // 切换选中状态
    currentProblem.options[index].selected = !currentProblem.options[index].selected;

    // 收集所有选中的选项
    const answer = currentProblem.options
      .filter(option => option.selected)
      .map(option => {
        // 如果有原始值，返回原始值，否则返回整个对象
        if (option.originalValue !== undefined) {
          return option.originalValue;
        }
        const { selected, ...rest } = option;
        return rest;
      });

    console.log('多选题答案:', answer);

    this.setData({
      currentProblem: currentProblem,
      answer: answer
    });
  },

  // 评分滑块变化（拖动中）
  onSliderChanging(e) {
    this.setData({
      answer: e.detail.value
    });
  },

  // 评分滑块变化（拖动结束）
  onSliderChange(e) {
    this.setData({
      answer: e.detail.value
    });
  },

  // 下一题
  onNextQuestion() {
    // 验证答案
    if (!this.validateAnswer()) {
      wx.showToast({
        title: '请完成当前题目',
        icon: 'none'
      });
      return;
    }

    // 保存答案
    this.saveAnswer();

    if (this.data.currentQuestion < this.data.totalQuestions - 1) {
      const newQuestion = this.data.currentQuestion + 1;
      const currentProblem = this.data.problems[newQuestion];
      const progressPercent = ((newQuestion + 1) / this.data.totalQuestions) * 100;

      // 根据题目类型初始化答案
      let answer = "";
      if (currentProblem.type === 'multiple') {
        answer = [];
        // 为多选题的每个选项添加selected属性
        if (currentProblem.options) {
          currentProblem.options = currentProblem.options.map(option => {
            if (typeof option === 'object') {
              return { ...option, selected: false };
            }
            return { title: option, selected: false };
          });
        }
      } else if (currentProblem.type === 'score') {
        answer = currentProblem.min || 0;
      }

      this.setData({
        currentQuestion: newQuestion,
        progressPercent: progressPercent,
        currentProblem: currentProblem,
        answer: answer
      });

      wx.showToast({
        title: '已保存',
        icon: 'success'
      });
    } else {
      // 完成所有题目
      // 计算获得的经验值（使用作业的experience字段）
      const earnedPoints = this.data.assignment.experience || 20;

      // 调用app的finishWork方法，传入作业ID和经验值
      app.finishWork(this.data.zuoyeId, earnedPoints);

      // 显示完成弹窗
      this.setData({
        showCompletionModal: true,
        earnedPoints: earnedPoints
      });
    }
  },

  // 上一题
  onPreviousQuestion() {
    // 保存当前答案
    this.saveAnswer();

    if (this.data.currentQuestion > 0) {
      const newQuestion = this.data.currentQuestion - 1;
      const currentProblem = this.data.problems[newQuestion];
      const progressPercent = ((newQuestion + 1) / this.data.totalQuestions) * 100;

      // 获取之前保存的答案
      let answer = "";
      try {
        const key = `assignment_answers_${this.data.zuoyeId}`;
        const answers = wx.getStorageSync(key) || {};
        answer = answers[newQuestion] || "";
      } catch (error) {
        console.error('获取答案失败:', error);
      }

      // 如果是多选题，需要恢复selected状态
      if (currentProblem.type === 'multiple') {
        if (currentProblem.options) {
          currentProblem.options = currentProblem.options.map(option => {
            if (typeof option === 'object') {
              return { ...option, selected: false };
            }
            return { title: option, selected: false };
          });
        }
        // 恢复之前选中的选项
        if (Array.isArray(answer) && answer.length > 0) {
          currentProblem.options.forEach(option => {
            if (answer.some(ans => JSON.stringify(ans) === JSON.stringify(option) || ans === option.title || ans === option)) {
              option.selected = true;
            }
          });
        }
      }

      this.setData({
        currentQuestion: newQuestion,
        progressPercent: progressPercent,
        currentProblem: currentProblem,
        answer: answer
      });

      wx.showToast({
        title: '已返回上一题',
        icon: 'success'
      });
    } else {
      wx.showToast({
        title: '已是第一题',
        icon: 'none'
      });
    }
  },

  // 验证答案
  validateAnswer() {
    const { currentProblem, answer } = this.data;

    if (!currentProblem) return false;

    if (currentProblem.type === 'text') {
      return answer && answer.trim().length > 0;
    } else if (currentProblem.type === 'choose') {
      return answer !== "";
    } else if (currentProblem.type === 'multiple') {
      return answer && answer.length > 0;
    } else if (currentProblem.type === 'score') {
      return answer !== null && answer !== undefined;
    }

    return true;
  },

  // 保存答案
  saveAnswer() {
    const { currentQuestion, answer, zuoyeId } = this.data;

    try {
      // 从本地存储获取已有答案
      const key = `assignment_answers_${zuoyeId}`;
      let answers = wx.getStorageSync(key) || {};

      // 保存当前题目的答案
      answers[currentQuestion] = answer;

      // 保存到本地存储
      wx.setStorageSync(key, answers);

      console.log(`题目 ${currentQuestion + 1} 的答案已保存:`, answer);
    } catch (error) {
      console.error('保存答案失败:', error);
    }
  },

  // 关闭完成弹窗并返回
  onCloseCompletionModal() {
    this.setData({
      showCompletionModal: false
    });

    // 返回上一页
    setTimeout(() => {
      wx.navigateBack();
    }, 300);
  },

  // 继续按钮点击
  onContinue() {
    this.onCloseCompletionModal();
  },

  // 开始做题
  onStartQuiz() {
    this.setData({
      isStarting: true
    });

    // 延迟隐藏导语界面，创建丝滑过渡效果
    setTimeout(() => {
      this.setData({
        showLeadScreen: false,
        isStarting: false
      });
    }, 300);
  },

  onLoad(options) {
    this.loadData(options);
  },

  onShow() {}
});
