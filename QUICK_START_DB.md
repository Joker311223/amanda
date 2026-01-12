# 数据库管理模块快速开始指南
## 概述

本指南帮助开发者快速了解和使用新的统一数据库管理模块 `db-manager.js`。

## 核心概念

### 一个用户 = 一条数据

```
用户 ID: user123
  ├─ 用户信息
  │  ├─ 姓名
  │  ├─ 性别
  │  ├─ 出生年月
  │  ├─ 手机号
  │  └─ 微信号
  ├─ 学习进度
  │  ├─ 已完成课程列表
  │  ├─ 已完成作业列表
  │  ├─ 总经验值
  │  └─ 快乐分
  ├─ 课程进度详情
  │  ├─ 课程1: {状态, 完成时间, 笔记}
  │  ├─ 课程2: {状态, 完成时间, 笔记}
  │  └─ ...
  ├─ 作业进度详情
  │  ├─ 作业1: {状态, 完成时间, 经验值}
  │  ├─ 作业2: {状态, 完成时间, 经验值}
  │  └─ ...
  └─ 作业答案
     ├─ 作业1: {所有答案, 题目详情, 提交时间}
     ├─ 作业2: {所有答案, 题目详情, 提交时间}
     └─ ...
```

## 基本使用

### 1. 导入模块

```javascript
const dbManager = require('../../utils/db-manager');
```

### 2. 创建用户（注册）

```javascript
// 在 pages/onboarding/onboarding.js 中
const userInfo = {
  name: '张三',
  gender: 'male',
  phone: '13800138000',
  wechat: 'wechat_id'
};

dbManager.createUser(userInfo)
  .then(user => {
    console.log('用户创建成功:', user);
    // 用户 ID 已自动保存到本地存储
  })
  .catch(error => {
    console.error('创建用户失败:', error);
  });
```

### 3. 获取用户数据

```javascript
const cloudUserId = wx.getStorageSync('cloudUserId');

dbManager.getUser(cloudUserId)
  .then(user => {
    console.log('用户数据:', user);
    console.log('学习进度:', user.learningProgress);
    console.log('作业答案:', user.assignmentAnswers);
  })
  .catch(error => {
    console.error('获取用户数据失败:', error);
  });
```

### 4. 完成课程

```javascript
// 在 app.js 中
completeCourse(courseId) {
  const progress = this.globalData.learningProgress;
  
  if (!progress.completedCourses.includes(courseId)) {
    progress.completedCourses.push(courseId);
    progress.totalExperience += 30;
  }
  
  // 保存到本地和云数据库
  this.saveUserData();
}

// saveUserData 会自动同步到云数据库
saveUserData() {
  wx.setStorageSync("learningProgress", this.globalData.learningProgress);
  
  const dbManager = require('./utils/db-manager');
  const cloudUserId = wx.getStorageSync("cloudUserId");
  
  if (cloudUserId) {
    const learningProgress = this.globalData.learningProgress;
    dbManager.updateBatchProgress(
      cloudUserId,
      learningProgress.completedCourses,
      learningProgress.completedAssignments,
      learningProgress.totalExperience
    );
  }
}
```

### 5. 提交作业

```javascript
// 在 pages/zuoye/index.js 中
saveAssignmentToCloud(earnedPoints) {
  const dbManager = require('../../utils/db-manager');
  const cloudUserId = wx.getStorageSync('cloudUserId');
  
  const assignmentData = {
    assignmentId: this.data.zuoyeId,
    answers: this.loadAnswersFromStorage(this.data.zuoyeId),
    problems: this.data.problems.map((problem, index) => ({
      question: problem.info || problem.question,
      type: problem.type,
      answer: this.formatAnswerForCloud(answers[index])
    })),
    earnedPoints: earnedPoints
  };
  
  dbManager.updateAssignmentProgress(cloudUserId, this.data.zuoyeId, assignmentData)
    .then(() => {
      console.log('作业保存成功');
    })
    .catch(error => {
      console.error('作业保存失败:', error);
    });
}
```

### 6. 查看作业答案

```javascript
// 获取所有作业答案
dbManager.getAssignmentAnswers(cloudUserId)
  .then(answers => {
    console.log('所有作业答案:', answers);
  });

// 获取特定作业答案
dbManager.getAssignmentAnswer(cloudUserId, assignmentId)
  .then(answer => {
    console.log('作业答案:', answer);
  });
```

## 常见场景

### 场景 1: 应用启动时拉取用户数据

```javascript
// 在 app.js 的 onLaunch 中
onLaunch(options) {
  wx.cloud.init({
    env: "cloud1-6gnh2toe07d2c577"
  });
  
  const isFirstTime = wx.getStorageSync("isFirstTime");
  if (isFirstTime === "") {
    this.globalData.isFirstTime = true;
  } else {
    this.globalData.isFirstTime = false;
    this.loadUserData();
  }
}

loadUserData() {
  const dbManager = require('./utils/db-manager');
  const cloudUserId = wx.getStorageSync("cloudUserId");
  
  // 先从本地加载
  const userInfo = wx.getStorageSync("userInfo");
  const learningProgress = wx.getStorageSync("learningProgress");
  
  if (userInfo) {
    this.globalData.userInfo = userInfo;
  }
  if (learningProgress) {
    this.globalData.learningProgress = learningProgress;
  }
  
  // 从云数据库拉取最新数据
  if (cloudUserId) {
    dbManager.pullUserDataFromCloud(cloudUserId)
      .then(cloudData => {
        // 用云端数据覆盖本地数据
        this.globalData.userInfo = cloudData.userInfo;
        this.globalData.learningProgress = cloudData.learningProgress;
        this.saveUserData();
      })
      .catch(error => {
        console.error('拉取云数据失败，使用本地数据:', error);
      });
  }
}
```

### 场景 2: 用户完成课程后更新进度

```javascript
// 在 pages/video/video.js 中
onCourseComplete() {
  const app = getApp();
  const courseId = this.data.courseId;
  
  // 更新全局数据
  app.completeCourse(courseId);
  
  // app.saveUserData() 会自动同步到云数据库
  
  wx.showToast({
    title: '课程完成！+30经验值',
    icon: 'success'
  });
}
```

### 场景 3: 用户提交作业后更新进度

```javascript
// 在 pages/zuoye/index.js 中
onSubmitAssignment() {
  const earnedPoints = this.data.assignment.experience || 20;
  
  // 保存作业到云数据库
  this.saveAssignmentToCloud(earnedPoints);
  
  // 更新全局学习进度
  const app = getApp();
  app.finishWork(this.data.zuoyeId, earnedPoints);
  
  // app.saveUserData() 会自动同步到云数据库
  
  wx.showToast({
    title: `作业完成！+${earnedPoints}经验值`,
    icon: 'success'
  });
}
```

### 场景 4: 查看学习统计

```javascript
// 在 pages/index/index.js 中
loadUserData() {
  const app = getApp();
  const userInfo = app.globalData.userInfo;
  const learningProgress = app.globalData.learningProgress;
  
  const completedCourses = learningProgress.completedCourses.length;
  const completedAssignments = learningProgress.completedAssignments.length;
  const totalExperience = learningProgress.totalExperience;
  
  this.setData({
    userName: userInfo.name,
    completedCourses: completedCourses,
    completedAssignments: completedAssignments,
    totalExperience: totalExperience
  });
}
```

## 错误处理

### 处理网络错误

```javascript
dbManager.updateAssignmentProgress(userId, assignmentId, data)
  .catch(error => {
    if (error.message.includes('network')) {
      console.log('网络连接失败，使用本地数据');
      // 使用本地数据，等待网络恢复
    } else {
      console.error('其他错误:', error);
    }
  });
```

### 处理用户不存在

```javascript
dbManager.getUser(userId)
  .then(user => {
    if (!user) {
      console.log('用户不存在');
      // 重新创建用户或跳转到注册页面
      wx.reLaunch({
        url: '/pages/onboarding/onboarding'
      });
    }
  })
  .catch(error => {
    console.error('查询失败:', error);
  });
```

## 调试技巧

### 1. 查看本地存储

```javascript
// 在浏览器控制台中
const cloudUserId = wx.getStorageSync('cloudUserId');
const userInfo = wx.getStorageSync('userInfo');
const learningProgress = wx.getStorageSync('learningProgress');

console.log('cloudUserId:', cloudUserId);
console.log('userInfo:', userInfo);
console.log('learningProgress:', learningProgress);
```

### 2. 查看云数据库数据

```javascript
// 在微信开发者工具中
1. 打开云开发控制台
2. 进入数据库 → users 集合
3. 查看用户记录
4. 检查 learningProgress、assignmentProgress、assignmentAnswers 字段
```

### 3. 添加日志

```javascript
// 在 db-manager.js 中添加详细日志
async updateAssignmentProgress(userId, assignmentId, assignmentData) {
  console.log('更新作业进度:', {
    userId,
    assignmentId,
    assignmentData
  });
  
  try {
    // ... 更新逻辑 ...
    console.log('作业进度更新成功');
  } catch (error) {
    console.error('作业进度更新失败:', error);
    throw error;
  }
}
```

## 性能优化

### 1. 减少数据库查询

```javascript
// 不好的做法：每次都查询
for (let i = 0; i < 10; i++) {
  dbManager.getUser(userId); // 10 次查询
}

// 好的做法：查询一次，缓存结果
const user = await dbManager.getUser(userId);
for (let i = 0; i < 10; i++) {
  // 使用缓存的 user 对象
}
```

### 2. 批量更新

```javascript
// 不好的做法：多次调用
dbManager.updateBatchProgress(userId, courses, assignments, experience);
dbManager.updateHappinessScore(userId, score);

// 好的做法：一次性更新
const user = await dbManager.getUser(userId);
user.learningProgress.completedCourses = courses;
user.learningProgress.completedAssignments = assignments;
user.learningProgress.totalExperience = experience;
user.learningProgress.happinessScore = score;

await db.collection('users').doc(userId).update({
  data: user.learningProgress
});
```

### 3. 异步处理

```javascript
// 不阻塞 UI
dbManager.updateAssignmentProgress(userId, assignmentId, data)
  .then(() => {
    console.log('更新成功');
  })
  .catch(error => {
    console.error('更新失败:', error);
  });

// 继续执行其他代码，不等待数据库操作完成
```

## 常见问题

### Q: 如何处理离线场景？
A: 应用会先使用本地数据，当网络恢复时自动同步到云数据库。

### Q: 如何清空用户数据？
A: 使用 `dbManager.clearUserData(userId)` 方法（仅用于测试）。

### Q: 数据同步的延迟是多少？
A: 通常在 1-2 秒内完成，取决于网络状况。

### Q: 如何处理数据冲突？
A: 采用"云端优先"策略，启动时云端数据覆盖本地数据。

### Q: 如何查看用户的所有作业答案？
A: 使用 `dbManager.getAssignmentAnswers(userId)` 获取所有答案。

## 下一步

- 阅读 [DATABASE_ARCHITECTURE.md](./DATABASE_ARCHITECTURE.md) 了解详细的架构设计
- 阅读 [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) 了解如何从旧架构迁移
- 查看 [db-manager.js](./utils/db-manager.js) 源代码了解实现细节

## 总结

新的数据库管理模块提供了以下优势：

✅ **简化开发**：统一的 API，易于使用
✅ **数据一致性**：一个用户一条数据，避免数据分散
✅ **离线支持**：本地数据始终可用
✅ **自动同步**：操作时自动同步到云数据库
✅ **易于维护**：所有数据库操作集中管理

祝你使用愉快！