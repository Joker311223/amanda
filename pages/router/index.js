const app = getApp();

Page({
  data: {
    totalScore: 0,
    completedCount: 0,
    totalCount: 0,
    progressPercent: 0,
    courses: [],
    assignments:getApp().globalData.assignments,
  },

  // 加载数据
  loadData() {
    console.log('yjc=>app.globalData.learningProgress',app.globalData.learningProgress );
    const learningProgress = app.globalData.learningProgress;
    const skillCards = app.globalData.skillCards;
    const assignments = app.globalData.assignments;

    this.setData({
      totalExperience: learningProgress.totalExperience,
      skillCards: skillCards,
      filteredCards: skillCards,
      assignments
    });
  },

  onLoad() {
    this.loadCourses();
    this.loadData();
  },

  onShow() {
    this.loadCourses();
  },

  jumpToZuoye(e) {
    const courseId = e.currentTarget.dataset.id;
    const subIndex = e.currentTarget.dataset.index;
    const zuoyeId = app.globalData.courses[courseId - 1].asssignIds[subIndex];

    // 检查作业状态，如果是 locked 则不允许跳转
    const assignment = this.data.assignments[zuoyeId - 1];
    if (assignment && assignment.status === 'locked') {
      wx.showToast({
        title: '该作业尚未解锁',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    wx.navigateTo({
      url: `/pages/zuoye/index?zuoyeId=${zuoyeId}`,
    });
  },

  jumpToCourse(e) {
    const { id, title, status } = e.currentTarget.dataset;

    // 检查课程状态，如果是 locked 则不允许跳转
    if (status === 'locked') {
      wx.showToast({
        title: '该课程尚未解锁',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    wx.navigateTo({
      url: `/pages/video/video?courseId=${id}`,
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
  },

  // 更新课程状态
  updateAssigmentsStatus(assignments, assignmentIds) {
    assignments.forEach((assignment, index) => {
      if (assignmentIds.includes(assignment.id)) {
        assignment.status = "completed";
      } else if (
        app.globalData.courses[assignment.id-1].status === "completed"
      ) {
        assignment.status = "available";
      } else {
        assignment.status = "locked";
      }
    });
  },

  // 加载课程数据
  loadCourses() {
    const learningProgress = app.globalData.learningProgress;
    const assignments = app.globalData.assignments;
    const allCourses = app.globalData.courses;
    const characterEmojis = [
      "🌵",
      "🍄",
      "🐣",
      "🍦",
      "🌱",
      "🦔",
      "🐝",
      "🍀",
      "🦋",
      "🌸",
    ];
    // 处理课程数据
    const courses = [];
    this.updateCourseStatus(allCourses, learningProgress.completedCourses);
    this.updateAssigmentsStatus(allCourses, learningProgress.completedCourses);

    // 计算学习进度
    const totalCount = allCourses.length;
    const completedCount = learningProgress.completedCourses.length;
    const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    this.setData({
      allCourses: allCourses,
      courses: courses,
      totalCount: totalCount,
      completedCount: completedCount,
      progressPercent: progressPercent,
      assignments:assignments,
    });
  },

  // 计算节点位置 - 垂直蛇形路径
  calculatePosition(index) {
    const rowHeight = 280; // 每行高度
    const nodeWidth = 200; // 节点宽度
    const containerWidth = 750; // 容器宽度(rpx)
    const padding = 40; // 左右padding
    const availableWidth = containerWidth - padding * 2 - nodeWidth;

    // 计算行和列
    const nodesPerRow = 2; // 每行2个节点
    const row = Math.floor(index / nodesPerRow);
    const col = index % nodesPerRow;

    // 蛇形路径: 偶数行从左到右,奇数行从右到左
    const isEvenRow = row % 2 === 0;
    let xPos;

    if (nodesPerRow === 1) {
      // 单列居中
      xPos = availableWidth / 2;
    } else if (nodesPerRow === 2) {
      // 两列布局
      if (isEvenRow) {
        xPos = col === 0 ? 40 : availableWidth - 40;
      } else {
        xPos = col === 0 ? availableWidth - 40 : 40;
      }
    } else {
      // 多列布局
      if (isEvenRow) {
        xPos = col * (availableWidth / (nodesPerRow - 1));
      } else {
        xPos = (nodesPerRow - 1 - col) * (availableWidth / (nodesPerRow - 1));
      }
    }

    const yPos = row * rowHeight;

    return `left: ${xPos}rpx; top: ${yPos}rpx;`;
  },

  // 点击节点
  onNodeClick(e) {
    const course = e.currentTarget.dataset.course;

    if (course.locked) {
      wx.showToast({
        title: "🔒 先完成前面的关卡才能解锁哦!",
        icon: "none",
        duration: 2000,
      });
      return;
    }

    // 根据节点类型跳转
    if (course.type === "lesson") {
      // 跳转到课程视频页面
      wx.navigateTo({
        url: `/pages/video/video?courseId=${course.courseId}`,
      });
    } else if (course.type === "character") {
      // 跳转到作业页面
      wx.navigateTo({
        url: `/pages/assignments/assignments?courseId=${course.courseId}`,
      });
    }
  },
});
