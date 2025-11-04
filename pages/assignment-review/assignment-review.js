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

    this.setData({
      assignment: assignment,
      problems: assignment.problems || [],
      answers: answers
    });
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

  // 查看题目详情（可选功能，如果需要查看单个题目的详细答案）
  viewProblemDetail(e) {
    const index = e.currentTarget.dataset.index;
    const problem = this.data.problems[index];
    const answer = this.data.answers[index];

    // 显示答案详情
    let content = `题目：${problem.info}\n\n`;

    if (answer !== undefined && answer !== null && answer !== '') {
      if (Array.isArray(answer)) {
        content += `答案：${answer.join(', ')}`;
      } else if (typeof answer === 'object') {
        content += `答案：${JSON.stringify(answer)}`;
      } else {
        content += `答案：${answer}`;
      }
    } else {
      content += '暂无答案';
    }

    wx.showModal({
      title: `第 ${index + 1} 题`,
      content: content,
      showCancel: false,
      confirmText: '知道了'
    });
  }
});
