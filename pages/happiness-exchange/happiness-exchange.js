const app = getApp();

Page({
  data: {
    totalExperience: 0,
    exchangeRate: 5, // 5经验 = 1快乐分
    maxHappinessScore: 0, // 最多可兑换的快乐分
    selectedHappiness: 0, // 选中的快乐分数量
    showAnimation: false, // 是否显示兑换动画
    animationData: {}, // 动画数据
    exchangeSuccess: false, // 兑换是否成功
    currentHappiness: 0, // 当前快乐分
  },

  onLoad(options) {
    const experience = parseInt(options.experience) || 0;
    const maxHappiness = Math.floor(experience / this.data.exchangeRate);

    const app = getApp();
    const currentHappiness = app.globalData.learningProgress.happinessScore || 0;

    this.setData({
      totalExperience: experience,
      maxHappinessScore: maxHappiness,
      selectedHappiness: maxHappiness,
      currentHappiness: currentHappiness,
    });
  },

  // 更新选中的快乐分
  updateSelectedHappiness(e) {
    const value = parseInt(e.detail.value) || 0;
    this.setData({
      selectedHappiness: Math.min(value, this.data.maxHappinessScore),
    });
  },

  // 执行兑换
  performExchange() {
    if (this.data.selectedHappiness <= 0) {
      wx.showToast({
        title: '请选择要兑换的快乐分',
        icon: 'none',
      });
      return;
    }

    // 显示动画
    this.setData({
      showAnimation: true,
    });

    // 执行兑换动画
    this.startExchangeAnimation();
  },

  // 开始兑换动画
  startExchangeAnimation() {
    const animation = wx.createAnimation({
      duration: 800,
      timingFunction: 'ease-in-out',
    });

    // 第一阶段：缩放和旋转
    animation.scale(0.5).rotate(360).step();

    this.setData({
      animationData: animation.export(),
    });

    // 延迟后显示成功状态
    setTimeout(() => {
      const successAnimation = wx.createAnimation({
        duration: 600,
        timingFunction: 'ease-out',
      });

      successAnimation.scale(1).rotate(0).step();

      this.setData({
        animationData: successAnimation.export(),
        exchangeSuccess: true,
      });

      // 再延迟后完成兑换
      setTimeout(() => {
        this.completeExchange();
      }, 600);
    }, 800);
  },

  // 完成兑换
  completeExchange() {
    const app = getApp();
    const exchangedExperience = this.data.selectedHappiness * this.data.exchangeRate;
    const newHappiness = this.data.currentHappiness + this.data.selectedHappiness;
    const remainingExperience = this.data.totalExperience - exchangedExperience;

    // 更新全局数据
    app.globalData.learningProgress.happinessScore = newHappiness;
    app.globalData.learningProgress.totalExperience = remainingExperience;
    app.saveUserData();

    // 显示成功提示
    wx.showToast({
      title: `成功兑换 ${this.data.selectedHappiness} 快乐分！`,
      icon: 'success',
      duration: 2000,
    });

    // 延迟返回
    setTimeout(() => {
      wx.navigateBack();
    }, 2000);
  },

  // 返回上一页
  goBack() {
    wx.navigateBack();
  },

  // 快速选择
  quickSelect(e) {
    const percentage = parseInt(e.currentTarget.dataset.percentage) || 100;
    const selected = Math.floor((this.data.maxHappinessScore * percentage) / 100);

    this.setData({
      selectedHappiness: selected,
    });
  },
});
