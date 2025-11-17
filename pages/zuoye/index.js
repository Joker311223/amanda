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
    optionLabels: [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ],
    sliderSegments: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], // 10个分段
    showCompletionModal: false, // 完成弹窗显示状态
    earnedPoints: 0, // 获得的经验值
    showLeadScreen: true, // 显示导语界面
    isStarting: false, // 开始动画状态
    isAssignmentCompleted: false, // 作业是否已完成
  },

  // 加载数据
  loadData(props) {
    const zuoyeId = props.zuoyeId;
    const assignment = app.globalData.assignments[zuoyeId - 1];
    // 深拷贝problems数组，避免修改原始数据
    const problems = JSON.parse(JSON.stringify(assignment.problems || []));

    // 检查作业是否已完成
    const isAssignmentCompleted =
      app.globalData.learningProgress.completedAssignments.includes(zuoyeId);

    // 从本地存储加载已保存的答案
    const savedAnswers = this.loadAnswersFromStorage(zuoyeId);

    // 找到第一个未做的题目索引
    let startQuestion = 0;
    let hasAnsweredQuestions = false;

    for (let i = 0; i < problems.length; i++) {
      const savedAnswer = savedAnswers[i];
      if (this.isAnswerValid(savedAnswer, problems[i])) {
        hasAnsweredQuestions = true;
        startQuestion = i + 1; // 从下一题开始
      } else {
        break; // 找到第一个未做的题目
      }
    }

    // 如果所有题目都做过了,从最后一题开始
    if (startQuestion >= problems.length) {
      startQuestion = problems.length - 1;
    }

    const currentQuestion = startQuestion;
    const currentProblem = problems[currentQuestion];
    const progressPercent = ((currentQuestion + 1) / problems.length) * 100;

    // 根据题目类型初始化答案
    let answer = "";
    if (currentProblem) {
      // 先尝试加载已保存的答案
      const savedAnswer = savedAnswers[currentQuestion];

      if (currentProblem.type === "multiple") {
        console.log(
          "yjc=>多选题currentProblem.options",
          currentProblem.options
        );
        answer = [];
        // 为多选题的每个选项添加selected属性
        if (currentProblem.options) {
          currentProblem.options = currentProblem.options.map((option) => {
            if (typeof option === "object") {
              return { ...option, selected: false };
            }
            return { title: option, selected: false };
          });
        }
        // 恢复已保存的答案
        if (Array.isArray(savedAnswer) && savedAnswer.length > 0) {
          console.log("yjc=>多选题1", answer);

          answer = savedAnswer;
          currentProblem.options.forEach((option) => {
            if (
              savedAnswer.some((ans) =>
                this.compareAnswerOptions(ans.title || ans, option)
              )
            ) {
              option.selected = true;
            }
          });
        }
      } else if (currentProblem.type === "choose") {
        // 单选题恢复已保存的答案
        answer =
          savedAnswer !== undefined &&
          savedAnswer !== null &&
          savedAnswer !== ""
            ? savedAnswer
            : "";
      } else if (currentProblem.type === "score") {
        answer =
          savedAnswer !== undefined &&
          savedAnswer !== null &&
          savedAnswer !== ""
            ? savedAnswer
            : currentProblem.min || 0;
      } else {
        console.log("yjc=>多选题", answer);
        // 文本或单选题
        answer =
          savedAnswer !== undefined &&
          savedAnswer !== null &&
          savedAnswer !== ""
            ? savedAnswer
            : "";
      }
    }

    this.setData({
      assignment: assignment,
      zuoyeId: zuoyeId,
      currentQuestion: currentQuestion,
      progressPercent: progressPercent,
      totalQuestions: problems.length,
      problems: problems,
      currentProblem: currentProblem,
      answer: answer,
      isAssignmentCompleted: isAssignmentCompleted,
      showLeadScreen: true, // 每次进入都显示导引
    });
  },

  // 从本地存储加载答案
  loadAnswersFromStorage(zuoyeId) {
    try {
      const key = `assignment_answers_${zuoyeId}`;
      const answers = wx.getStorageSync(key) || {};
      return answers;
    } catch (error) {
      console.error("加载答案失败:", error);
      return {};
    }
  },

  // 检查答案是否有效
  isAnswerValid(answer, problem) {
    if (!problem) return false;

    if (answer === undefined || answer === null || answer === "") {
      return false;
    }

    if (problem.type === "multiple") {
      return Array.isArray(answer) && answer.length > 0;
    }

    if (problem.type === "text") {
      return typeof answer === "string" && answer.trim().length > 0;
    }

    if (problem.type === "score") {
      return answer !== null && answer !== undefined && answer !== "";
    }

    if (problem.type === "choose") {
      return answer !== "";
    }

    return true;
  },

  // 比较答案选项是否相同
  compareAnswerOptions(savedAnswer, option) {
    // 如果保存的答案是字符串
    if (typeof savedAnswer === "string") {
      // 比较字符串
      if (typeof option === "string") {
        return savedAnswer === option;
      }
      // 比较对象的title或整个对象
      if (typeof option === "object") {
        return savedAnswer === option.title || savedAnswer === option;
      }
    }

    // 如果保存的答案是对象
    if (typeof savedAnswer === "object" && savedAnswer !== null) {
      // 深度比较对象
      if (typeof option === "object" && option !== null) {
        // 比较JSON字符串
        return JSON.stringify(savedAnswer) === JSON.stringify(option);
      }
      // 比较对象的title
      if (typeof option === "string") {
        return savedAnswer.title === option;
      }
    }
    return false;
  },

  // 文本输入变化
  onInputChange(e) {
    this.setData({
      answer: e.detail.value,
    });
  },

  // 单选题选择
  onRadioChange(e) {
    this.setData({
      answer: e.detail.value,
    });
  },

  // 单选题点击选项
  onOptionTap(e) {
    const value = e.currentTarget.dataset.value;
    this.setData({
      answer: value,
    });
  },

  // 多选题变化
  onCheckboxChange(e) {
    this.setData({
      answer: e.detail.value,
    });
  },

  // 多选题点击选项
  onCheckboxTap(e) {
    const index = e.currentTarget.dataset.index;
    const value = e.currentTarget.dataset.value;
    const currentProblem = this.data.currentProblem;

    // 切换选中状态
    currentProblem.options[index].selected =
      !currentProblem.options[index].selected;

    // 收集所有选中的选项
    const answer = currentProblem.options
      .filter((option) => option.selected)
      .map((option) => {
        // 如果有原始值，返回原始值，否则返回整个对象
        if (option.originalValue !== undefined) {
          return option.originalValue;
        }
        const { selected, ...rest } = option;
        return rest;
      });

    console.log("多选题答案:", answer);

    this.setData({
      currentProblem: currentProblem,
      answer: answer,
    });
  },

  // 评分滑块变化（拖动中）
  onSliderChanging(e) {
    this.setData({
      answer: e.detail.value,
    });
  },

  // 评分滑块变化（拖动结束）
  onSliderChange(e) {
    this.setData({
      answer: e.detail.value,
    });
  },

  // 下一题
  onNextQuestion() {
    // 验证答案
    if (!this.validateAnswer()) {
      wx.showToast({
        title: "请完成当前题目",
        icon: "none",
      });
      return;
    }

    // 保存答案
    this.saveAnswer();

    if (this.data.currentQuestion < this.data.totalQuestions - 1) {
      const newQuestion = this.data.currentQuestion + 1;
      // 深拷贝currentProblem，避免修改原始数据
      const currentProblem = JSON.parse(
        JSON.stringify(this.data.problems[newQuestion])
      );
      const progressPercent =
        ((newQuestion + 1) / this.data.totalQuestions) * 100;

      // 获取已保存的答案
      const savedAnswers = this.loadAnswersFromStorage(this.data.zuoyeId);
      const savedAnswer = savedAnswers[newQuestion];

      // 根据题目类型初始化答案
      let answer = "";
      if (currentProblem.type === "multiple") {
        answer = [];
        // 为多选题的每个选项添加selected属性
        if (currentProblem.options) {
          currentProblem.options = currentProblem.options.map((option) => {
            if (typeof option === "object") {
              return { ...option, selected: false };
            }
            return { title: option, selected: false };
          });
        }
        // 恢复已保存的答案
        if (Array.isArray(savedAnswer) && savedAnswer.length > 0) {
          answer = savedAnswer;
          currentProblem.options.forEach((option) => {
            if (
              savedAnswer.some((ans) =>
                this.compareAnswerOptions(ans.title || ans, option)
              )
            ) {
              option.selected = true;
            }
          });
        }
      } else if (currentProblem.type === "choose") {
        // 单选题恢复已保存的答案
        answer =
          savedAnswer !== undefined &&
          savedAnswer !== null &&
          savedAnswer !== ""
            ? savedAnswer
            : "";
      } else if (currentProblem.type === "score") {
        answer =
          savedAnswer !== undefined &&
          savedAnswer !== null &&
          savedAnswer !== ""
            ? savedAnswer
            : currentProblem.min || 0;
      } else {
        // 文本题
        answer =
          savedAnswer !== undefined &&
          savedAnswer !== null &&
          savedAnswer !== ""
            ? savedAnswer
            : "";
      }

      this.setData({
        currentQuestion: newQuestion,
        progressPercent: progressPercent,
        currentProblem: currentProblem,
        answer: answer,
      });

      wx.showToast({
        title: "已保存",
        icon: "success",
      });
    } else {
      // 完成所有题目
      // 计算获得的经验值（使用作业的experience字段）
      const earnedPoints = this.data.assignment.experience || 20;

      // 调用app的finishWork方法，传入作业ID和经验值
      app.finishWork(this.data.zuoyeId, earnedPoints);

      // 保存作业到云数据库
      this.saveAssignmentToCloud(earnedPoints);

      // 显示完成弹窗
      this.setData({
        showCompletionModal: true,
        earnedPoints: earnedPoints,
      });
    }
  },

  // 上一题
  onPreviousQuestion() {
    // 保存当前答案
    this.saveAnswer();

    if (this.data.currentQuestion > 0) {
      const newQuestion = this.data.currentQuestion - 1;
      // 深拷贝currentProblem，避免修改原始数据
      const currentProblem = JSON.parse(
        JSON.stringify(this.data.problems[newQuestion])
      );
      const progressPercent =
        ((newQuestion + 1) / this.data.totalQuestions) * 100;

      // 获取之前保存的答案
      const savedAnswers = this.loadAnswersFromStorage(this.data.zuoyeId);
      let answer = savedAnswers[newQuestion] || "";

      // 如果是多选题，需要恢复selected状态
      if (currentProblem.type === "multiple") {
        if (currentProblem.options) {
          currentProblem.options = currentProblem.options.map((option) => {
            if (typeof option === "object") {
              return { ...option, selected: false };
            }
            return { title: option, selected: false };
          });
        }
        console.log("yjc=>answer", answer);
        // 恢复之前选中的选项
        if (Array.isArray(answer) && answer.length > 0) {
          currentProblem.options.forEach((option) => {
            if (
              answer.some((ans) =>
                this.compareAnswerOptions(ans.title || ans, option)
              )
            ) {
              option.selected = true;
            }
          });
        }
      }

      this.setData({
        currentQuestion: newQuestion,
        progressPercent: progressPercent,
        currentProblem: currentProblem,
        answer: answer,
      });

      wx.showToast({
        title: "已返回上一题",
        icon: "success",
      });
    } else {
      wx.showToast({
        title: "已是第一题",
        icon: "none",
      });
    }
  },

  // 验证答案
  validateAnswer() {
    const { currentProblem, answer } = this.data;

    if (!currentProblem) return false;

    if (currentProblem.type === "text") {
      return answer && answer.trim().length > 0;
    } else if (currentProblem.type === "choose") {
      return answer !== "";
    } else if (currentProblem.type === "multiple") {
      return answer && answer.length > 0;
    } else if (currentProblem.type === "score") {
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
      console.error("保存答案失败:", error);
    }
  },

  // 关闭完成弹窗并返回
  onCloseCompletionModal() {
    this.setData({
      showCompletionModal: false,
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

  // 保存作业到云数据库
  saveAssignmentToCloud(earnedPoints) {
    const dbManager = require('../../utils/db-manager')
    const cloudUserId = wx.getStorageSync('cloudUserId')

    // 获取所有答案
    const answers = this.loadAnswersFromStorage(this.data.zuoyeId)

    // 构建作业数据
    const assignmentData = {
      assignmentId: this.data.zuoyeId,
      answers: answers, // 所有答案
      problems: this.data.problems.map((problem, index) => ({
        question: problem.info || problem.question || problem.title,
        type: problem.type,
        answer: this.formatAnswerForCloud(answers[index])
      })),
      earnedPoints: earnedPoints
    }

    // 使用统一的数据库管理模块保存作业
    if (cloudUserId) {
      dbManager.updateAssignmentProgress(cloudUserId, this.data.zuoyeId, assignmentData)
        .then(() => {
          console.log('作业保存到云数据库成功')
        })
        .catch(err => {
          console.error('作业保存到云数据库失败', err)
          // 不影响用户体验，静默失败
        })
    }
  },

  // 格式化答案用于云存储
  formatAnswerForCloud(answer) {
    if (answer === undefined || answer === null || answer === '') {
      return ''
    }

    // 如果是数组
    if (Array.isArray(answer)) {
      return answer.map(item => {
        if (typeof item === 'object') {
          return item.title || JSON.stringify(item)
        }
        return String(item)
      }).join('、')
    }

    // 如果是对象
    if (typeof answer === 'object') {
      // 尝试提取常见的字段
      if (answer.text) return answer.text
      if (answer.value) return answer.value
      if (answer.content) return answer.content
      if (answer.title) return answer.title

      // 对于多选题，提取选中的项
      const entries = Object.entries(answer)
      const selectedItems = entries
        .filter(([key, value]) => value === true || value === 1 || value === '1')
        .map(([key]) => key)

      if (selectedItems.length > 0) {
        return selectedItems.join('、')
      }

      return JSON.stringify(answer)
    }

    // 其他类型直接转字符串
    return String(answer)
  },

  // 开始做题
  onStartQuiz() {
    this.setData({
      isStarting: true,
    });

    // 延迟隐藏导语界面，创建丝滑过渡效果
    setTimeout(() => {
      this.setData({
        showLeadScreen: false,
        isStarting: false,
      });
    }, 300);
  },

  onLoad(options) {
    // 保存zuoyeId，供onShow使用
    this.zuoyeId = options.zuoyeId;
    this.loadData(options);
  },

  onShow() {
    // 如果zuoyeId存在，重新加载数据以刷新页面
    if (this.zuoyeId) {
      this.loadData({ zuoyeId: this.zuoyeId });
    }
  },

  // 下拉刷新
  onPullDownRefresh() {
    console.log("下拉刷新作业数据");

    // 如果zuoyeId存在，重新加载数据
    if (this.zuoyeId) {
      this.loadData({ zuoyeId: this.zuoyeId });

      // 显示刷新提示
      wx.showToast({
        title: "刷新成功",
        icon: "success",
        duration: 1500,
      });

      // 停止下拉刷新动画
      setTimeout(() => {
        wx.stopPullDownRefresh();
      }, 500);
    } else {
      // 如果没有zuoyeId，直接停止刷新
      wx.stopPullDownRefresh();
    }
  },
});
