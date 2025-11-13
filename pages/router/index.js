const app = getApp();

Page({
  data: {
    totalScore: 0,
    completedCount: 0,
    totalCount: 0,
    progressPercent: 0,
    courses: [],
    assignments: getApp().globalData.assignments,
    showDialog: false,
    dialogData: {},
    dialogType: "", // 'course' 或 'assignment'
    dialogParams: {}, // 存储跳转参数
    showGuide: false, // 是否显示导引
    guideSteps: [], // 导引步骤
    showDebugButtons: false, // 是否显示debug按钮
    showCompletionTip: false, // 是否显示完成提示条
    availableExperience: 0, // 可兑换的经验值
    showCompletionModal: false, // 是否显示完成所有课程的弹窗
    totalEarnedExperience: 0, // 总共获得的经验值
  },

  // 加载数据
  loadData() {
    console.log(
      "yjc=>app.globalData.learningProgress",
      app.globalData.learningProgress
    );
    const learningProgress = app.globalData.learningProgress;
    const skillCards = app.globalData.skillCards;
    const assignments = app.globalData.assignments;

    console.log(
      "yjc=>更新 totalExperience 为:",
      learningProgress.totalExperience
    );
    this.setData({
      totalExperience: learningProgress.totalExperience,
      skillCards: skillCards,
      filteredCards: skillCards,
      assignments,
    });
  },

  onLoad(options) {
    // 检查是否有debug参数
    if (options.debug === 'true') {
      this.setData({
        showDebugButtons: true,
      });
    }
    this.loadCourses();
    this.loadData();
  },

  onShow() {
    // 从本地存储重新加载最新数据
    app.loadUserData();

    this.loadCourses();
    this.loadData(); // 更新经验值等数据

    // 检查是否需要显示导引（只有在未看过且未选择不再提示时才显示）
    if (!app.globalData.hasSeenGuide && !app.globalData.isFirstTime && !app.globalData.noMoreGuide) {
      // 延迟显示导引，确保页面已完全渲染
      setTimeout(() => {
        this.showNewUserGuide();
      }, 800);
    }
  },

  // 显示新手导引
  showNewUserGuide() {
    // 获取第一个可用课程的icon
    const firstAvailableCourse = app.globalData.courses.find(
      (c) => c.status === "available"
    );
    const courseIconUrl = firstAvailableCourse
      ? firstAvailableCourse.icon
      : "/images/kechenghuigu-icon1.svg";

    const guideSteps = [
      {
        icon: "👋",
        title: "欢迎来到学习路线",
        desc: "这里是你的DBT学习之旅的起点！让我带你快速了解如何使用这个页面。",
        selector: null, // 无选择器，居中显示
        padding: 10,
      },
      {
        iconUrl: courseIconUrl,
        title: "课程学习",
        desc: "点击这些课程图标可以观看视频课程。完成课程后可以获得经验值，并解锁下一个课程！",
        selector: ".item-image.available", // 高亮第一个可用课程
        padding: 15,
      },
      {
        icon: "✍️",
        title: "作业练习",
        desc: "这些是配套的作业练习。完成课程后，相关作业会自动解锁。通过作业巩固所学知识！",
        selector: ".item-image-mini.available", // 高亮第一个可用作业
        padding: 10,
      },
      {
        icon: "⭐",
        title: "经验值系统",
        desc: "完成课程和作业都能获得经验值。积累经验值，见证自己的成长！",
        selector: ".experience-badge", // 高亮经验值显示
        padding: 10,
      },
      {
        icon: "🎯",
        title: "开始你的学习之旅",
        desc: "现在你已经了解了基本功能，点击第一个课程开始学习吧！记得完成配套作业哦～",
        selector: null,
        padding: 10,
      },
    ];

    this.setData({
      showGuide: true,
      guideSteps: guideSteps,
    });
  },

  // 导引完成
  onGuideComplete(e) {
    const noMoreGuide = e.detail && e.detail.noMoreGuide;

    this.setData({
      showGuide: false,
    });

    // 标记已看过导引
    app.globalData.hasSeenGuide = true;

    // 如果用户选择不再提示，则保存该设置
    if (noMoreGuide) {
      app.globalData.noMoreGuide = true;
    }

    app.saveUserData();

    // 显示提示
    wx.showToast({
      title: noMoreGuide ? "已关闭自动导引" : "开始学习吧！",
      icon: "success",
      duration: 1500,
    });
  },

  // 手动显示导引
  showGuideManually() {
    this.showNewUserGuide();
  },

  // 导引步骤变化
  onGuideStepChange(e) {
    const step = e.detail.step;
    console.log("当前导引步骤:", step);
  },

  // 显示作业弹窗
  showAssignmentDialog(e) {
    const courseId = e.currentTarget.dataset.id;
    const subIndex = e.currentTarget.dataset.index;
    const zuoyeId = app.globalData.courses[courseId - 1].asssignIds[subIndex];
    const assignment = this.data.assignments[zuoyeId - 1];
    const course = app.globalData.courses[courseId - 1];

    // 检查作业状态，如果是 locked 则显示锁定弹窗
    if (assignment && assignment.status === "locked") {
      this.setData({
        showDialog: true,
        dialogType: "locked",
        dialogParams: {},
        dialogData: {
          iconUrl: course.icon,
          title: "作业尚未解锁",
          desc: `需要先完成「${course.title}」课程才能解锁这个作业哦！`,
          info: "继续加油，完成前面的课程吧！",
          confirmText: "我知道了",
          showCancel: false,
        },
      });
      return;
    }

    // 如果已完成，直接跳转不显示弹窗
    if (assignment && assignment.status === "completed") {
      wx.navigateTo({
        url: `/pages/assignment-review/assignment-review?assignmentId=${zuoyeId}`,
      });
      return;
    }

    // 显示确认弹窗
    this.setData({
      showDialog: true,
      dialogType: "assignment",
      dialogParams: { zuoyeId },
      dialogData: {
        iconUrl: course.icon,
        title: assignment.title || "开始作业",
        desc: "准备好开始这个作业了吗？完成后可以获得经验值奖励！",
        info: assignment.experience
          ? `完成可获得 ${assignment.experience} 经验值`
          : "",
        confirmText: "开始作业",
        showCancel: true,
      },
    });
  },

  // 显示课程弹窗
  showCourseDialog(e) {
    const { id, title, status } = e.currentTarget.dataset;
    const course = app.globalData.courses.find((c) => c.id === id);

    // 检查课程状态，如果是 locked 则显示锁定弹窗
    if (status === "locked") {
      // 找到前一个课程
      const courseIndex = app.globalData.courses.findIndex((c) => c.id === id);
      const prevCourse =
        courseIndex > 0 ? app.globalData.courses[courseIndex - 1] : null;

      this.setData({
        showDialog: true,
        dialogType: "locked",
        dialogParams: {},
        dialogData: {
          iconUrl: course.icon,
          title: "课程尚未解锁",
          desc: prevCourse
            ? `需要先完成「${prevCourse.title}」才能解锁这门课程哦！`
            : "需要先完成前面的课程才能解锁哦！",
          info: "按顺序学习效果更好！",
          confirmText: "我知道了",
          showCancel: false,
        },
      });
      return;
    }

    // 如果已完成，直接跳转不显示弹窗
    if (status === "completed") {
      wx.navigateTo({
        url: `/pages/video/video?courseId=${id}`,
      });
      return;
    }

    // 显示确认弹窗
    this.setData({
      showDialog: true,
      dialogType: "course",
      dialogParams: { courseId: id },
      dialogData: {
        iconUrl: course.icon,
        title: title || "开始学习",
        desc: "准备好开始这门课程了吗？让我们一起学习新知识！",
        info: course?.experience
          ? `完成可获得 ${course.experience} 经验值`
          : "",
        confirmText: "开始学习",
        showCancel: true,
      },
    });
  },

  // 隐藏弹窗
  hideDialog() {
    this.setData({
      showDialog: false,
    });
  },

  // 确认弹窗
  confirmDialog() {
    const { dialogType, dialogParams } = this.data;

    // 如果是锁定状态，只关闭弹窗
    if (dialogType === "locked") {
      this.hideDialog();
      return;
    }

    if (dialogType === "assignment") {
      // 跳转到作业页面
      wx.navigateTo({
        url: `/pages/zuoye/index?zuoyeId=${dialogParams.zuoyeId}`,
      });
    } else if (dialogType === "course") {
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

  viewAssignment(e) {
    const assignmentId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/assignment-detail/assignment-detail?assignmentId=${assignmentId}&view=true`,
    });
  },

  jumpToZuoye(e) {
    const courseId = e.currentTarget.dataset.id;
    const subIndex = e.currentTarget.dataset.index;
    const zuoyeId = app.globalData.courses[courseId - 1].asssignIds[subIndex];

    // 检查作业状态，如果是 locked 则不允许跳转
    const assignment = this.data.assignments[zuoyeId - 1];
    if (assignment && assignment.status === "locked") {
      wx.showToast({
        title: "该作业尚未解锁",
        icon: "none",
        duration: 2000,
      });
      return;
    }

    if (assignment && assignment.status === "completed") {
      wx.navigateTo({
        url: `/pages/assignment-detail/assignment-detail?assignmentId=${zuoyeId}&view=true`,
      });
    }

    wx.navigateTo({
      url: `/pages/zuoye/index?zuoyeId=${zuoyeId}`,
    });
  },

  jumpToCourse(e) {
    const { id, title, status } = e.currentTarget.dataset;

    // 检查课程状态，如果是 locked 则不允许跳转
    if (status === "locked") {
      wx.showToast({
        title: "该课程尚未解锁",
        icon: "none",
        duration: 2000,
      });
      return;
    }

    wx.navigateTo({
      url: `/pages/video/video?courseId=${id}`,
    });
  },

  // 更新课程状态
  updateCourseStatus(courses, completedCourseIds) {
    console.log("yjc=>completedCourseIds", completedCourseIds);

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
    console.log("yjc=>coursecourse", courses);
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

  // 加载课程数据
  loadCourses() {
    console.log("yjc=>loadCourses");
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
    this.updateAssigmentsStatus(
      assignments,
      learningProgress.completedAssignments
    );

    // 计算学习进度（基于经验分数，总分850分）
    const totalCount = allCourses.length;
    const completedCount = learningProgress.completedCourses.length;
    const totalExperience = 850; // 总分
    const currentExperience = learningProgress.totalExperience; // 当前获得的经验值
    const progressPercent =
      totalExperience > 0 ? Math.round((currentExperience / totalExperience) * 100) : 0;

    // 检查是否所有课程和作业都已完成
    const allCoursesCompleted = completedCount === totalCount;
    const allAssignmentsCompleted = learningProgress.completedAssignments.length === assignments.length;
    const isAllCompleted = allCoursesCompleted && allAssignmentsCompleted;

    // 计算可兑换的经验值（未兑换的经验值）
    const availableExperience = learningProgress.totalExperience;

    // 如果所有课程和作业都完成了，每次进入页面都显示完成弹窗
    if (isAllCompleted) {
      setTimeout(() => {
        this.setData({
          showCompletionModal: true,
          totalEarnedExperience: availableExperience,
        });
      }, 500);
    }

    this.setData({
      allCourses: allCourses,
      courses: courses,
      totalCount: totalCount,
      completedCount: completedCount,
      progressPercent: progressPercent,
      assignments: assignments,
      showCompletionTip: isAllCompleted && availableExperience > 0,
      availableExperience: availableExperience,
    });
  },

  // 关闭完成弹窗
  closeCompletionModal() {
    this.setData({
      showCompletionModal: false,
    });
  },

  // 复制微信号
  copyWechat() {
    wx.setClipboardData({
      data: '18888929709',
      success: () => {
        wx.showToast({
          title: '微信号已复制',
          icon: 'success',
          duration: 2000,
        });
      },
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

  // Debug: 清空所有学习记录
  debugClearAllProgress() {
    wx.showModal({
      title: '确认清空',
      content: '确定要清空所有学习的课程和作业记录吗？',
      confirmText: '确定',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          const app = getApp();
          app.globalData.learningProgress = {
            currentWeek: 1,
            currentDay: 1,
            completedCourses: [],
            completedAssignments: [],
            totalExperience: 0,
          };
          app.saveUserData();
          this.loadCourses();
          this.loadData();
          wx.showToast({
            title: '已清空所有记录',
            icon: 'success',
            duration: 1500,
          });
        }
      },
    });
  },

  // Debug: 一键完成所有课程
  debugCompleteAllCourses() {
    wx.showModal({
      title: '确认完成',
      content: '确定要一键完成所有课程吗？',
      confirmText: '确定',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          const app = getApp();
          const allCourseIds = app.globalData.courses.map(c => c.id);
          const allAssignmentIds = app.globalData.assignments.map(a => a.id);

          // 计算总经验值
          const totalExperience = app.globalData.courses.reduce((sum, course) => {
            return sum + (course.experience || 0);
          }, 0) + app.globalData.assignments.reduce((sum, assignment) => {
            return sum + (assignment.experience || 0);
          }, 0);

          app.globalData.learningProgress = {
            currentWeek: 1,
            currentDay: 1,
            completedCourses: allCourseIds,
            completedAssignments: allAssignmentIds,
            totalExperience: totalExperience,
            happinessScore: 0,
          };
          app.saveUserData();
          this.loadCourses();
          this.loadData();
          wx.showToast({
            title: '已完成所有课程',
            icon: 'success',
            duration: 1500,
          });
        }
      },
    });
  },

  // Debug: 一键学习所有课程（不包括作业）
  debugCompleteCoursesOnly() {
    wx.showModal({
      title: '确认学习',
      content: '确定要一键学习所有课程吗？（不包括作业）',
      confirmText: '确定',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          const app = getApp();
          const allCourseIds = app.globalData.courses.map(c => c.id);

          // 只计算课程的经验值
          const coursesExperience = app.globalData.courses.reduce((sum, course) => {
            return sum + (course.experience || 0);
          }, 0);

          // 保留当前已完成的作业
          const currentCompletedAssignments = app.globalData.learningProgress.completedAssignments || [];
          
          // 计算作业的经验值
          const assignmentsExperience = app.globalData.assignments
            .filter(a => currentCompletedAssignments.includes(a.id))
            .reduce((sum, assignment) => {
              return sum + (assignment.experience || 0);
            }, 0);

          app.globalData.learningProgress = {
            currentWeek: 1,
            currentDay: 1,
            completedCourses: allCourseIds,
            completedAssignments: currentCompletedAssignments,
            totalExperience: coursesExperience + assignmentsExperience,
            happinessScore: app.globalData.learningProgress.happinessScore || 0,
          };
          app.saveUserData();
          this.loadCourses();
          this.loadData();
          wx.showToast({
            title: '已学习所有课程',
            icon: 'success',
            duration: 1500,
          });
        }
      },
    });
  },

  // 打开快乐分兑换页面
  openHappinessExchange() {
    wx.navigateTo({
      url: `/pages/happiness-exchange/happiness-exchange?experience=${this.data.availableExperience}`,
    });
  },

  // 关闭完成提示条
  closeCompletionTip() {
    this.setData({
      showCompletionTip: false,
    });
  },
});
