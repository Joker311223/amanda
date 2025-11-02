const app = getApp();

Page({
  data: {
    courseId: null,
    totalScore: 30,
    assignments: []
  },

  onLoad(options) {
    const courseId = options.courseId;

    if (courseId) {
      this.setData({
        courseId: parseInt(courseId)
      });
      this.loadAssignments();
      this.loadCourseScore();
    }
  },

  // 加载课程分数
  loadCourseScore() {
    const { courseId } = this.data;
    const course = app.globalData.courses.find(c => c.id === courseId);

    if (course) {
      this.setData({
        totalScore: course.experience || 30
      });
    }
  },

  // 加载作业列表
  loadAssignments() {
    const { courseId } = this.data;
    const allAssignments = app.globalData.assignments;

    // 筛选出与当前课程相关的作业
    const courseAssignments = allAssignments.filter(
      assignment => assignment.courseId === courseId
    );

    // 为每个作业添加标题和副标题（示例数据）
    const formattedAssignments = courseAssignments.map((assignment, index) => ({
      ...assignment,
      title: assignment.title || '题干题干',
      subtitle: assignment.category || '题干题干'
    }));

    this.setData({
      assignments: formattedAssignments
    });
  },

  // 返回上一页
  goBack() {
    wx.navigateBack();
  },

  // 点击查看作业按钮
  onViewAssignment() {
    wx.showToast({
      title: '查看作业功能',
      icon: 'none'
    });
  },

  // 点击作业项
  onAssignmentItemClick(e) {
    const assignmentId = e.currentTarget.dataset.assignmentId;

    // 跳转到作业详情页
    wx.navigateTo({
      url: `/pages/assignment-detail/assignment-detail?assignmentId=${assignmentId}`
    });
  }
});
