# 统一数据库架构文档
## 概述

本文档描述了重构后的统一数据库管理架构。通过创建 `db-manager.js` 模块，将所有分散的云数据库交互集中管理，实现了一个用户对应一条数据的设计模式。

## 核心设计原则

### 1. 单一用户数据模型
- **一个用户 = 一条数据**：每个用户在云数据库中只有一条记录
- **完整数据包含**：用户注册信息 + 学习进度 + 课程进度 + 作业进度 + 作业答案
- **数据一致性**：所有用户相关的数据都存储在同一条记录中，避免数据分散

### 2. 应用启动流程
```
应用启动
  ↓
检查是否首次使用
  ├─ 是 → 跳转到注册页面
  └─ 否 → 从本地加载数据
         ↓
      检查是否有 cloudUserId
         ├─ 是 → 从云数据库拉取最新数据
         └─ 否 → 使用本地数据
```

### 3. 数据同步策略
- **启动时**：从云数据库拉取最新数据，覆盖本地数据
- **操作时**：同时更新本地和云数据库
- **离线支持**：本地数据始终可用，网络恢复后自动同步

## 数据库集合结构

### 集合名称：`users`

#### 数据结构
```javascript
{
  "_id": "云数据库自动生成的ID",
  "_openid": "用户的openid（自动添加）",
  
  // 用户注册信息
  "name": "用户姓名",
  "gender": "male/female",
  "birthDate": "出生年月，格式：YYYY-MM",
  "phone": "手机号",
  "wechat": "微信号",
  "createTime": "创建时间（服务器时间）",
  
  // 学习进度（总体统计）
  "learningProgress": {
    "currentWeek": 1,           // 当前第几周
    "currentDay": 1,            // 当前第几天
    "completedCourses": [],     // 已完成的课程ID列表
    "completedAssignments": [], // 已完成的作业ID列表
    "totalExperience": 0,       // 总经验值
    "happinessScore": 0         // 快乐分
  },
  
  // 课程进度详情
  "courseProgress": {
    "1": {                      // courseId 作为 key
      "status": "completed",    // 状态：available/completed/locked
      "completedAt": "2025-01-15T10:30:00Z",
      "notes": "用户笔记",
      "updatedAt": "服务器时间"
    },
    "2": { ... }
  },
  
  // 作业进度详情
  "assignmentProgress": {
    "1": {                      // assignmentId 作为 key
      "status": "completed",    // 状态：available/completed/locked
      "completedAt": "服务器时间",
      "earnedPoints": 30        // 获得的经验值
    },
    "2": { ... }
  },
  
  // 作业填写内容（完整答案）
  "assignmentAnswers": {
    "1": {                      // assignmentId 作为 key
      "answers": {              // 所有答案
        "0": "第1题答案",
        "1": "第2题答案",
        ...
      },
      "problems": [             // 题目和答案的对应关系
        {
          "question": "题目内容",
          "type": "text/choose/multiple/score",
          "answer": "格式化后的答案"
        },
        ...
      ],
      "submitTime": "服务器时间",
      "earnedPoints": 30
    },
    "2": { ... }
  }
}
```

## 数据库管理模块 API

### 文件位置
`/utils/db-manager.js`

### 主要方法

#### 1. 初始化用户
```javascript
dbManager.initializeUser(userInfo)
```
- **功能**：创建或获取用户数据
- **参数**：`userInfo` - 用户信息对象
- **返回**：Promise，返回用户完整数据
- **使用场景**：用户注册时

#### 2. 创建新用户
```javascript
dbManager.createUser(userInfo)
```
- **功能**：创建新用户记录
- **参数**：`userInfo` - 用户信息
- **返回**：Promise，返回创建的用户数据
- **使用场景**：注册页面提交

#### 3. 获取用户数据
```javascript
dbManager.getUser(userId)
```
- **功能**：获取指定用户的完整数据
- **参数**：`userId` - 用户ID
- **返回**：Promise，返回用户数据
- **使用场景**：需要获取用户信息时

#### 4. 更新学习进度
```javascript
dbManager.updateLearningProgress(userId, learningProgress)
```
- **功能**：更新学习进度
- **参数**：
  - `userId` - 用户ID
  - `learningProgress` - 学习进度对象
- **返回**：Promise
- **使用场景**：完成课程或作业时

#### 5. 更新课程进度
```javascript
dbManager.updateCourseProgress(userId, courseId, courseData)
```
- **功能**：更新特定课程的进度
- **参数**：
  - `userId` - 用户ID
  - `courseId` - 课程ID
  - `courseData` - 课程数据 {status, completedAt, notes}
- **返回**：Promise
- **使用场景**：完成课程时

#### 6. 更新作业进度和答案
```javascript
dbManager.updateAssignmentProgress(userId, assignmentId, assignmentData)
```
- **功能**：更新作业进度和答案
- **参数**：
  - `userId` - 用户ID
  - `assignmentId` - 作业ID
  - `assignmentData` - 作业数据 {answers, problems, earnedPoints}
- **返回**：Promise
- **使用场景**：提交作业时

#### 7. 获取作业答案
```javascript
dbManager.getAssignmentAnswers(userId)
```
- **功能**：获取用户的所有作业答案
- **参数**：`userId` - 用户ID
- **返回**：Promise，返回所有作业答案
- **使用场景**：查看作业回顾时

#### 8. 获取特定作业答案
```javascript
dbManager.getAssignmentAnswer(userId, assignmentId)
```
- **功能**：获取特定作业的答案
- **参数**：
  - `userId` - 用户ID
  - `assignmentId` - 作业ID
- **返回**：Promise，返回作业答案
- **使用场景**：查看单个作业详情时

#### 9. 拉取用户数据
```javascript
dbManager.pullUserDataFromCloud(userId)
```
- **功能**：从云数据库拉取用户的完整数据
- **参数**：`userId` - 用户ID
- **返回**：Promise，返回格式化的用户数据
- **使用场景**：应用启动时

#### 10. 批量更新学习进度
```javascript
dbManager.updateBatchProgress(userId, completedCourses, completedAssignments, totalExperience)
```
- **功能**：批量更新学习进度
- **参数**：
  - `userId` - 用户ID
  - `completedCourses` - 已完成课程列表
  - `completedAssignments` - 已完成作业列表
  - `totalExperience` - 总经验值
- **返回**：Promise
- **使用场景**：保存用户数据时

#### 11. 更新快乐分
```javascript
dbManager.updateHappinessScore(userId, happinessScore)
```
- **功能**：更新用户快乐分
- **参数**：
  - `userId` - 用户ID
  - `happinessScore` - 快乐分值
- **返回**：Promise
- **使用场景**：快乐分兑换时

## 集成指南

### 1. 在 app.js 中集成

```javascript
// 在 onLaunch 中
onLaunch(options) {
  wx.cloud.init({
    env: "cloud1-6gnh2toe07d2c577"
  });
  
  // 检查首次使用
  const isFirstTime = wx.getStorageSync("isFirstTime");
  if (isFirstTime === "") {
    this.globalData.isFirstTime = true;
  } else {
    this.globalData.isFirstTime = false;
    this.loadUserData(); // 加载用户数据
  }
}

// 在 loadUserData 中
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
    dbManager.pullUserDataFromCloud(cloudUserId).then(cloudData => {
      this.globalData.userInfo = cloudData.userInfo;
      this.globalData.learningProgress = cloudData.learningProgress;
      this.saveUserData();
    }).catch(error => {
      console.error('拉取云数据失败，使用本地数据:', error);
    });
  }
}

// 在 saveUserData 中
saveUserData() {
  // 保存到本地
  wx.setStorageSync("userInfo", this.globalData.userInfo);
  wx.setStorageSync("learningProgress", this.globalData.learningProgress);
  
  // 同步到云数据库
  const dbManager = require('./utils/db-manager');
  const cloudUserId = wx.getStorageSync("cloudUserId");
  
  if (cloudUserId) {
    const learningProgress = this.globalData.learningProgress;
    dbManager.updateBatchProgress(
      cloudUserId,
      learningProgress.completedCourses,
      learningProgress.completedAssignments,
      learningProgress.totalExperience
    ).catch(error => {
      console.error('同步到云数据库失败:', error);
    });
  }
}
```

### 2. 在注册页面中集成

```javascript
// pages/onboarding/onboarding.js
saveUserToCloud() {
  const dbManager = require('../../utils/db-manager');
  const userInfo = this.data.userInfo;
  
  dbManager.createUser(userInfo).then(res => {
    console.log('用户创建成功', res);
    // 跳转到首页
    wx.switchTab({
      url: '/pages/router/index'
    });
  }).catch(err => {
    console.error('创建用户失败', err);
    wx.showToast({
      title: '注册失败，请重试',
      icon: 'none'
    });
  });
}
```

### 3. 在作业页面中集成

```javascript
// pages/zuoye/index.js
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
  
  if (cloudUserId) {
    dbManager.updateAssignmentProgress(cloudUserId, this.data.zuoyeId, assignmentData)
      .then(() => {
        console.log('作业保存成功');
      })
      .catch(err => {
        console.error('作业保存失败', err);
      });
  }
}
```

## 数据流图

### 用户注册流程
```
用户填写信息
  ↓
提交表单
  ↓
dbManager.createUser()
  ↓
创建云数据库记录
  ↓
保存 cloudUserId 到本地
  ↓
保存用户信息到本地
  ↓
跳转到首页
```

### 完成课程流程
```
用户完成课程
  ↓
app.completeCourse(courseId)
  ↓
更新 globalData.learningProgress
  ↓
app.saveUserData()
  ↓
保存到本地存储
  ↓
dbManager.updateBatchProgress()
  ↓
更新云数据库
```

### 提交作业流程
```
用户提交作业
  ↓
zuoye/index.js saveAssignmentToCloud()
  ↓
dbManager.updateAssignmentProgress()
  ↓
更新云数据库中的 assignmentProgress 和 assignmentAnswers
  ↓
app.finishWork()
  ↓
更新 globalData.learningProgress
  ↓
app.saveUserData()
  ↓
同步到云数据库
```

### 应用启动流程
```
应用启动
  ↓
app.onLaunch()
  ↓
检查 isFirstTime
  ├─ true → 跳转注册页面
  └─ false → app.loadUserData()
             ↓
          从本地加载数据
             ↓
          检查 cloudUserId
             ├─ 有 → dbManager.pullUserDataFromCloud()
             │       ↓
             │    从云数据库拉取最新数据
             │       ↓
             │    更新 globalData
             │       ↓
             │    保存到本地
             └─ 无 → 使用本地数据
```

## 数据库权限设置

### 推荐配置
- **权限模式**：仅创建者可读写
- **原因**：保护用户隐私，每个用户只能访问自己的数据

### 权限规则
```javascript
{
  "read": "doc._openid == auth.uid",
  "write": "doc._openid == auth.uid"
}
```

## 索引建议

为了提升查询性能，建议在云数据库中创建以下索引：

```javascript
// 索引1：按 openid 查询
{
  "index_name": "openid_index",
  "index_keys": [{"name": "_openid", "direction": "asc"}]
}

// 索引2：按创建时间排序
{
  "index_name": "createTime_index",
  "index_keys": [{"name": "createTime", "direction": "desc"}]
}
```

## 错误处理

### 常见错误场景

#### 1. 网络连接失败
```javascript
dbManager.updateAssignmentProgress(userId, assignmentId, data)
  .catch(error => {
    console.error('网络错误:', error);
    // 使用本地数据，等待网络恢复后重试
  });
```

#### 2. 用户不存在
```javascript
dbManager.getUser(userId)
  .then(user => {
    if (!user) {
      console.log('用户不存在');
      // 重新创建用户
    }
  })
  .catch(error => {
    console.error('查询失败:', error);
  });
```

#### 3. 权限不足
```javascript
// 确保用户已登录且有正确的 openid
// 检查云数据库权限设置
```

## 性能优化建议

### 1. 批量操作
使用 `updateBatchProgress` 而不是多次调用单个更新方法

### 2. 缓存策略
- 应用启动时缓存用户数据
- 减少不必要的云数据库查询

### 3. 异步处理
- 使用 Promise 处理异步操作
- 不阻塞 UI 线程

### 4. 错误重试
- 网络错误时自动重试
- 实现指数退避策略

## 迁移指南

### 从旧架构迁移

如果需要从旧的分散数据库架构迁移到新的统一架构：

1. **备份旧数据**
   - 导出现有的 users 和 assignments 集合

2. **数据转换**
   - 将旧的 assignments 集合数据合并到 users 集合中
   - 更新数据结构以符合新的格式

3. **验证数据**
   - 检查数据完整性
   - 测试数据查询和更新

4. **灰度发布**
   - 先在测试环境验证
   - 逐步推送到生产环境

## 常见问题

### Q1: 如何处理离线场景？
A: 应用会先使用本地数据，当网络恢复时自动同步到云数据库。

### Q2: 如何查看用户的所有作业答案？
A: 使用 `dbManager.getAssignmentAnswers(userId)` 获取所有答案。

### Q3: 如何清空用户数据？
A: 使用 `dbManager.clearUserData(userId)` 方法（仅用于测试）。

### Q4: 数据同步的延迟是多少？
A: 通常在 1-2 秒内完成，取决于网络状况。

### Q5: 如何处理数据冲突？
A: 采用"云端优先"策略，启动时云端数据覆盖本地数据。

## 总结

新的统一数据库架构提供了以下优势：

1. **数据一致性**：一个用户一条数据，避免数据分散
2. **易于维护**：所有数据库操作集中在 db-manager.js 中
3. **离线支持**：本地数据始终可用
4. **自动同步**：操作时自动同步到云数据库
5. **扩展性强**：易于添加新的数据字段和操作方法
