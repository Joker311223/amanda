const app = getApp();

Page({
  data: {
    totalScore: 0,
    completedCount: 0,
    totalCount: 0,
    progressPercent: 0,
    courses: [],
    assignments:getApp().globalData.assignments,
    showDialog: false,
    dialogData: {},
    dialogType: '', // 'course' 或 'assignment'
    dialogParams: {}, // 存储跳转参数
    showGuide: false, // 是否显示导引
    guideSteps: [], // 导引步骤
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

    // 检查是否需要显示导引
    if (!app.globalData.hasSeenGuide && !app.globalData.isFirstTime) {
      // 延迟显示导引，确保页面已完全渲染
      setTimeout(() => {
        this.showNewUserGuide();
      }, 800);
    }
  },

  // 显示新手导引
  showNewUserGuide() {
    const guideSteps = [
      {
        icon: '👋',
        title: '欢迎来到学习路线',
        desc: '这里是你的DBT学习之旅的起点！让我带你快速了解如何使用这个页面。',
        selector: null, // 无选择器，居中显示
        padding: 10
      },
      {
        icon: '📚',
        title: '课程学习',
        desc: '点击这些课程图标可以观看视频课程。完成课程后可以获得经验值，并解锁下一个课程！',
        selector: '.item-image.available', // 高亮第一个可用课程
        padding: 15
      },
      {
        icon: '✍️',
        title: '作业练习',
        desc: '这些是配套的作业练习。完成课程后，相关作业会自动解锁。通过作业巩固所学知识！',
        selector: '.item-image-mini.available', // 高亮第一个可用作业
        padding: 10
      },
      {
        icon: '⭐',
        title: '经验值系统',
        desc: '完成课程和作业都能获得经验值。积累经验值，见证自己的成长！',
        selector: '.experience-badge', // 高亮经验值显示
        padding: 10
      },
      {
        icon: '🎯',
        title: '开始你的学习之旅',
        desc: '现在你已经了解了基本功能，点击第一个课程开始学习吧！记得完成配套作业哦～',
        selector: null,
        padding: 10
      }
    ];

    this.setData({
      showGuide: true,
      guideSteps: guideSteps
    });
  },

  // 导引完成
  onGuideComplete() {
    this.setData({
      showGuide: false
    });

    // 标记已看过导引
    app.globalData.hasSeenGuide = true;
    app.saveUserData();

    // 显示提示
    wx.showToast({
      title: '开始学习吧！',
      icon: 'success',
      duration: 1500
    });
  },

  // 导引步骤变化
  onGuideStepChange(e) {
    const step = e.detail.step;
    console.log('当前导引步骤:', step);
  },

  // 显示作业弹窗
  showAssignmentDialog(e) {
    const courseId = e.currentTarget.dataset.id;
    const subIndex = e.currentTarget.dataset.index;
    const zuoyeId = app.globalData.courses[courseId - 1].asssignIds[subIndex];
    const assignment = this.data.assignments[zuoyeId - 1];

    // 检查作业状态，如果是 locked 则显示锁定弹窗
    if (assignment && assignment.status === 'locked') {
      // 找到需要完成的前置课程
      const course = app.globalData.courses[courseId - 1];
      this.setData({
        showDialog: true,
        dialogType: 'locked',
        dialogParams: {},
        dialogData: {
          emoji: '🔒',
          title: '作业尚未解锁',
          desc: `需要先完成「${course.title}」课程才能解锁这个作业哦！`,
          info: '继续加油，完成前面的课程吧！',
          confirmText: '我知道了',
          showCancel: false
        }
      });
      return;
    }

    // 如果已完成，直接跳转不显示弹窗
    if (assignment && assignment.status === 'completed') {
      wx.navigateTo({
        url: `/pages/zuoye/index?zuoyeId=${zuoyeId}`,
      });
      return;
    }

    // 显示确认弹窗
    this.setData({
      showDialog: true,
      dialogType: 'assignment',
      dialogParams: { zuoyeId },
      dialogData: {
        emoji: '📝',
        title: assignment.title || '开始作业',
        desc: '准备好开始这个作业了吗？完成后可以获得经验值奖励！',
        info: assignment.experience ? `完成可获得 ${assignment.experience} 经验值` : '',
        confirmText: '开始作业',
        showCancel: true
      }
    });
  },

  // 显示课程弹窗
  showCourseDialog(e) {
    const { id, title, status } = e.currentTarget.dataset;

    // 检查课程状态，如果是 locked 则显示锁定弹窗
    if (status === 'locked') {
      // 找到前一个课程
      const courseIndex = app.globalData.courses.findIndex(c => c.id === id);
      const prevCourse = courseIndex > 0 ? app.globalData.courses[courseIndex - 1] : null;

      this.setData({
        showDialog: true,
        dialogType: 'locked',
        dialogParams: {},
        dialogData: {
          emoji: '🔒',
          title: '课程尚未解锁',
          desc: prevCourse
            ? `需要先完成「${prevCourse.title}」才能解锁这门课程哦！`
            : '需要先完成前面的课程才能解锁哦！',
          info: '按顺序学习效果更好！',
          confirmText: '我知道了',
          showCancel: false
        }
      });
      return;
    }

    // 如果已完成，直接跳转不显示弹窗
    if (status === 'completed') {
      wx.navigateTo({
        url: `/pages/video/video?courseId=${id}`,
      });
      return;
    }

    // 获取课程信息
    const course = app.globalData.courses.find(c => c.id === id);

    // 显示确认弹窗
    this.setData({
      showDialog: true,
      dialogType: 'course',
      dialogParams: { courseId: id },
      dialogData: {
        emoji: '🎓',
        title: title || '开始学习',
        desc: '准备好开始这门课程了吗？让我们一起学习新知识！',
        info: course?.experience ? `完成可获得 ${course.experience} 经验值` : '',
        confirmText: '开始学习',
        showCancel: true
      }
    });
  },

  // 隐藏弹窗
  hideDialog() {
    this.setData({
      showDialog: false
    });
  },

  // 确认弹窗
  confirmDialog() {
    const { dialogType, dialogParams } = this.data;

    // 如果是锁定状态，只关闭弹窗
    if (dialogType === 'locked') {
      this.hideDialog();
      return;
    }

    if (dialogType === 'assignment') {
      // 跳转到作业页面
      wx.navigateTo({
        url: `/pages/zuoye/index?zuoyeId=${dialogParams.zuoyeId}`,
      });
    } else if (dialogType === 'course') {
      // 跳转到课程页面
      wx.navigateTo({
        url: `/pages/video/video?courseId=${dialogParams.courseId}`,
      });
    }

    this.hideDialog();
  },

  // 阻止事件冒泡
  stopPropagation() {},

  // 阻止滚动穿透
  preventTouchMove() {},

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
    console.log('yjc=>completedCourseIds',completedCourseIds );
    
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
    console.log('yjc=>coursecourse',courses );
  },

  // 更新课程状态
  updateAssigmentsStatus(assignments, assignmentIds) {
    assignments.forEach((assignment, index) => {
      if (assignmentIds.includes(assignment.id)) {
        assignment.status = "completed";
      } else if (
        app.globalData.courses[assignment.courseId-1]?.status === "completed"
      ) {
        assignment.status = "available";
      } else {
        assignment.status = "locked";
      }
    });
  },

  // 加载课程数据
  loadCourses() {
    console.log('yjc=>loadCourses', );
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
    this.updateAssigmentsStatus(assignments, learningProgress.completedAssignments);

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
