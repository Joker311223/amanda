const app = getApp();

Page({
  data: {
    totalExperience: 0,
    courses: [],
    filteredCourses: [],
    assignments: app.globalData.assignments,
    filteredAssignments: [],
    searchKeyword: "",
    nowPage: "课程回顾",
  },

  onLoad() {
    this.loadData();
  },

  onShow() {
    this.loadData();
  },

  // 加载数据
  loadData() {
    const learningProgress = app.globalData.learningProgress;
    const assignments = app.globalData.assignments;
    const courses = app.globalData.courses;

    // 更新课程状态
    this.updateCourseStatus(courses, learningProgress.completedCourses);
    this.updateAssigmentsStatus(
      assignments,
      learningProgress.completedAssignments
    );
    this.setData({
      totalExperience: learningProgress.totalExperience,
      courses: courses,
      filteredCourses: courses,
      assignments: assignments,
      filteredAssignments: assignments,
    });
  },

  // 更新课程状态
  updateCourseStatus(courses, completedCourseIds) {
    courses.forEach((course, index) => {
      if (completedCourseIds.includes(course.id)) {
        course.status = "completed";
      } else if (
        index === 0 ||
        completedCourseIds.includes(courses[index - 1].id)
      ) {
        course.status = "available";
      } else {
        course.status = "locked";
      }
    });
    console.log("yjc=>courses", courses);
  },

  // 更新课程状态
  updateAssigmentsStatus(assignments, assignmentIds) {
    assignments.forEach((assignment, index) => {
      if (assignmentIds.includes(assignment.id)) {
        assignment.status = "completed";
      } else if (
        app.globalData.courses[assignment.courseId - 1]?.status ===
          "completed" ||
        assignment.id === 1
      ) {
        assignment.status = "available";
      } else {
        assignment.status = "locked";
      }
    });
  },
  // 搜索输入
  onSearchInput(e) {
    const keyword = e.detail.value.toLowerCase();
    this.setData({
      searchKeyword: keyword,
    });
    this.filterCoursesAndAssignments(keyword);
  },

  // 过滤课程和作业
  filterCoursesAndAssignments(keyword) {
    if (!keyword) {
      this.setData({
        filteredCourses: this.data.courses,
        filteredAssignments: this.data.assignments,
      });
      return;
    }

    // 过滤课程
    const filteredCourses = this.data.courses.filter(
      (course) =>
        course.title.toLowerCase().includes(keyword) ||
        course.category.toLowerCase().includes(keyword)
    );

    // 过滤作业
    const filteredAssignments = this.data.assignments.filter(
      (assignment) =>
        assignment.title.toLowerCase().includes(keyword) ||
        (assignment.category && assignment.category.toLowerCase().includes(keyword))
    );

    this.setData({
      filteredCourses: filteredCourses,
      filteredAssignments: filteredAssignments,
    });
  },

  // 点击课程卡片
  onCourseClick(e) {
    const courseId = e.currentTarget.dataset.courseId;
    const course = this.data.courses.find((c) => c.id === courseId);

    if (course.status === "locked") {
      wx.showToast({
        title: "课程尚未解锁",
        icon: "none",
      });
      return;
    }

    // 跳转到视频播放页面
    wx.navigateTo({
      url: `/pages/video/video?courseId=${courseId}`,
    });
  },

  // 开始学习
  startLearning(e) {
    const courseId = e.currentTarget.dataset.courseId;
    wx.navigateTo({
      url: `/pages/video/video?courseId=${courseId}`,
    });
  },

  jumpToZuoye(e) {
    const zuoyeId = e.currentTarget.dataset.zuoyeId;
    wx.navigateTo({
      url: `/pages/zuoye/index?zuoyeId=${zuoyeId}`,
    });
  },

  unionJump(e) {
    const status = e.currentTarget.dataset.zuoyeStatus;
    if ("completed" === status) {
      this.viewAssignment(e);
    } else if ("available" === status) {
      this.jumpToZuoye(e);
    } else {
      wx.showToast({
        title: "作业尚未解锁",
        icon: "none",
      });
    }
  },

  // 查看作业
  viewAssignment(e) {
    console.log("yjc=>viewAssignment");
    const zuoyeId = e.currentTarget.dataset.zuoyeId;
    wx.navigateTo({
      url: `/pages/assignment-review/assignment-review?assignmentId=${zuoyeId}`,
    });
  },

  // 跳转到课程回顾
  goToCourseReview() {
    this.setData({
      nowPage: "课程回顾",
    });
  },

  // 跳转到作业回顾
  goToAssignmentReview() {
    this.setData({
      nowPage: "作业回顾",
    });
  },

  // 处理课程完成事件（来自course-card组件）
  onCourseCompleted(e) {
    const { courseId, status } = e.detail;

    if (status === "completed") {
      // 如果已完成，跳转到视频页面重播
      wx.navigateTo({
        url: `/pages/video/video?courseId=${courseId}`,
      });
    } else if (status === "available") {
      // 如果可学习，跳转到视频页面开始学习
      wx.navigateTo({
        url: `/pages/video/video?courseId=${courseId}`,
      });
    }
  },

  // 处理查看作业事件（来自course-card组件）
  onCourseAssignment(e) {
    const { courseId } = e.detail;
    wx.navigateTo({
      url: `/pages/assignment-list/assignment-list?courseId=${courseId}`,
    });
  },
});
