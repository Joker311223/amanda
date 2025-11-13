const app = getApp();

Page({
  data: {
    assignmentId: null,
    assignment: null,
    problems: [],
    answers: {} // 存储用户的答案
  },

  onLoad(options) {
    const assignmentId = parseInt(options.assignmentId);
    this.setData({
      assignmentId: assignmentId
    });
    this.loadAssignment(assignmentId);
  },

  // 加载作业信息
  loadAssignment(assignmentId) {
    const assignment = app.globalData.assignments.find(a => a.id === assignmentId);

    if (!assignment) {
      wx.showToast({
        title: '作业不存在',
        icon: 'none'
      });
      wx.navigateBack();
      return;
    }

    // 从本地存储加载答案
    const answers = this.loadAnswersFromStorage(assignmentId);

    // 处理题目数据，添加格式化的答案
    const problems = (assignment.problems || []).map((problem, index) => {
      const answer = answers[index];
      return {
        ...problem,
        formattedAnswer: this.formatAnswer(answer)
      };
    });

    this.setData({
      assignment: assignment,
      problems: problems,
      answers: answers
    });
  },

  // 格式化答案显示
  formatAnswer(answer) {
    console.log('yjc=>formatAnswer', typeof answer);
    console.log('yjc=>formatAnswer',  answer);
    if (answer === undefined || answer === null || answer === '') {
      return '暂无答案';
    }

    // 如果是数组
    if (Array.isArray(answer)) {
      return answer.length > 0 ? answer.map(item=>item.title).join('、') : '暂无答案';
    }

    // 如果是对象
    if (typeof answer === 'object') {
      // 尝试提取常见的字段
      if (answer.text) return answer.text;
      if (answer.value) return answer.value;
      if (answer.content) return answer.content;
      if (answer.answer) return answer.answer;

      // 如果对象有多个键值对，格式化显示
      const entries = Object.entries(answer);
      if (entries.length > 0) {
        // 对于多选题，通常值是布尔值或选项标识，提取为数组显示
        const selectedItems = entries
          .filter(([key, value]) => value === true || value === 1 || value === '1')
          .map(([key]) => key);
        
        if (selectedItems.length > 0) {
          return selectedItems.join('、');
        }

        // 如果没有找到布尔值，尝试提取所有非空值
        const values = entries
          .filter(([key, value]) => value !== false && value !== 0 && value !== '' && value !== null && value !== undefined)
          .map(([key, value]) => value);
        
        if (values.length > 0) {
          return values.join('、');
        }

        return '暂无答案';
      }

      return '暂无答案';
    }

    // 其他类型直接转字符串
    return String(answer);
  },

  // 从本地存储加载答案
  loadAnswersFromStorage(assignmentId) {
    try {
      const key = `assignment_answers_${assignmentId}`;
      const answers = wx.getStorageSync(key) || {};
      return answers;
    } catch (error) {
      console.error('加载答案失败:', error);
      return {};
    }
  },

  // 返回上一页
  goBack() {
    wx.navigateBack();
  },

  // 跳转到作业填写页面
  goToFillAssignment() {
    const zuoyeId = this.data.assignmentId;
    wx.navigateTo({
      url: `/pages/zuoye/index?zuoyeId=${zuoyeId}`
    });
  }
});
