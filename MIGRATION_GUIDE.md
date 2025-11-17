# 数据库架构迁移指南
## 概述

本指南说明如何从旧的分散数据库架构迁移到新的统一数据库架构。

## 迁移前准备

### 1. 备份现有数据
在进行任何迁移操作前，请先备份现有的云数据库数据：

```bash
# 在微信开发者工具中
1. 打开云开发控制台
2. 进入数据库
3. 选择 users 集合 → 导出 → 选择 JSON 格式
4. 选择 assignments 集合 → 导出 → 选择 JSON 格式
5. 保存导出文件到本地
```

### 2. 测试环境验证
建议先在测试环境中验证迁移过程：

```javascript
// 在 app.js 中临时添加测试标志
const isTestEnv = true; // 设置为 true 进行测试

if (isTestEnv) {
  // 使用测试环境的云数据库
  wx.cloud.init({
    env: "cloud1-test-env-id"
  });
}
```

## 迁移步骤

### 步骤 1: 更新数据库集合结构

#### 1.1 修改 users 集合

在云开发控制台中，为 users 集合添加新字段：

```javascript
// 对于现有的每条用户记录，添加以下字段：

{
  // 保留现有字段
  "_id": "...",
  "_openid": "...",
  "name": "...",
  "gender": "...",
  "birthDate": "...",
  "phone": "...",
  "wechat": "...",
  "createTime": "...",
  
  // 添加新字段
  "learningProgress": {
    "currentWeek": 1,
    "currentDay": 1,
    "completedCourses": [],
    "completedAssignments": [],
    "totalExperience": 0,
    "happinessScore": 0
  },
  "courseProgress": {},
  "assignmentProgress": {},
  "assignmentAnswers": {}
}
```

#### 1.2 数据迁移脚本

使用以下脚本将旧数据迁移到新结构：

```javascript
// 在云函数中执行（或在本地通过云开发工具执行）

const cloud = require('wx-server-sdk');
cloud.init();

exports.migrateUserData = async (event, context) => {
  const db = cloud.database();
  
  try {
    // 获取所有用户
    const usersRes = await db.collection('users').get();
    const users = usersRes.data;
    
    // 获取所有作业记录
    const assignmentsRes = await db.collection('assignments').get();
    const assignments = assignmentsRes.data;
    
    // 为每个用户迁移数据
    for (const user of users) {
      // 获取该用户的所有作业
      const userAssignments = assignments.filter(a => a._openid === user._openid);
      
      // 构建新的数据结构
      const assignmentProgress = {};
      const assignmentAnswers = {};
      let totalExperience = 0;
      const completedAssignments = [];
      
      for (const assignment of userAssignments) {
        const assignmentId = assignment.assignmentId;
        
        // 更新作业进度
        assignmentProgress[assignmentId] = {
          status: 'completed',
          completedAt: assignment.submitTime,
          earnedPoints: assignment.earnedPoints || 0
        };
        
        // 保存作业答案
        assignmentAnswers[assignmentId] = {
          answers: assignment.answers || {},
          problems: assignment.problems || [],
          submitTime: assignment.submitTime,
          earnedPoints: assignment.earnedPoints || 0
        };
        
        // 累计经验值
        totalExperience += assignment.earnedPoints || 0;
        completedAssignments.push(assignmentId);
      }
      
      // 更新用户记录
      await db.collection('users').doc(user._id).update({
        data: {
          learningProgress: {
            currentWeek: user.learningProgress?.currentWeek || 1,
            currentDay: user.learningProgress?.currentDay || 1,
            completedCourses: user.learningProgress?.completedCourses || [],
            completedAssignments: completedAssignments,
            totalExperience: totalExperience,
            happinessScore: user.learningProgress?.happinessScore || 0
          },
          assignmentProgress: assignmentProgress,
          assignmentAnswers: assignmentAnswers,
          courseProgress: user.courseProgress || {}
        }
      });
    }
    
    return {
      success: true,
      message: `成功迁移 ${users.length} 个用户的数据`
    };
  } catch (error) {
    console.error('迁移失败:', error);
    return {
      success: false,
      error: error.message
    };
  }
};
```

### 步骤 2: 部署新的数据库管理模块

1. 将 `db-manager.js` 复制到 `utils/` 目录
2. 确保文件路径正确：`/utils/db-manager.js`

### 步骤 3: 更新应用代码

#### 3.1 更新 app.js

```javascript
// 在 onLaunch 中添加数据库初始化
onLaunch(options) {
  wx.cloud.init({
    env: "cloud1-6gnh2toe07d2c577"
  });
  
  // ... 其他代码 ...
  
  // 检查是否首次使用
  const isFirstTime = wx.getStorageSync("isFirstTime");
  if (isFirstTime === "") {
    this.globalData.isFirstTime = true;
  } else {
    this.globalData.isFirstTime = false;
    this.loadUserData(); // 加载用户数据
  }
}

// 更新 loadUserData 方法
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
        this.globalData.userInfo = cloudData.userInfo;
        this.globalData.learningProgress = cloudData.learningProgress;
        this.saveUserData();
        console.log('云数据库数据拉取成功');
      })
      .catch(error => {
        console.error('从云数据库拉取数据失败，使用本地数据:', error);
      });
  }
}

// 更新 saveUserData 方法
saveUserData() {
  try {
    wx.setStorageSync("userInfo", this.globalData.userInfo);
    wx.setStorageSync("learningProgress", this.globalData.learningProgress);
    wx.setStorageSync("isFirstTime", false);
    wx.setStorageSync("hasSeenGuide", this.globalData.hasSeenGuide);
    wx.setStorageSync("noMoreGuide", this.globalData.noMoreGuide);
    
    // 同时同步到云数据库
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
        console.error('同步学习进度到云数据库失败:', error);
      });
    }
  } catch (e) {
    console.error("保存用户数据失败", e);
  }
}
```

#### 3.2 更新 pages/onboarding/onboarding.js

```javascript
// 替换 saveUserToCloud 方法
saveUserToCloud() {
  const dbManager = require('../../utils/db-manager');
  const userInfo = this.data.userInfo;
  
  dbManager.createUser(userInfo)
    .then(res => {
      console.log('用户信息保存到云数据库成功', res);
      wx.showToast({
        title: '注册成功',
        icon: 'success',
        duration: 1500
      });
    })
    .catch(err => {
      console.error('用户信息保存到云数据库失败', err);
      wx.showToast({
        title: '数据同步失败，请检查网络',
        icon: 'none',
        duration: 2000
      });
    });
}
```

#### 3.3 更新 pages/zuoye/index.js

```javascript
// 替换 saveAssignmentToCloud 方法
saveAssignmentToCloud(earnedPoints) {
  const dbManager = require('../../utils/db-manager');
  const cloudUserId = wx.getStorageSync('cloudUserId');
  
  const answers = this.loadAnswersFromStorage(this.data.zuoyeId);
  
  const assignmentData = {
    assignmentId: this.data.zuoyeId,
    answers: answers,
    problems: this.data.problems.map((problem, index) => ({
      question: problem.info || problem.question || problem.title,
      type: problem.type,
      answer: this.formatAnswerForCloud(answers[index])
    })),
    earnedPoints: earnedPoints
  };
  
  if (cloudUserId) {
    dbManager.updateAssignmentProgress(cloudUserId, this.data.zuoyeId, assignmentData)
      .then(() => {
        console.log('作业保存到云数据库成功');
      })
      .catch(err => {
        console.error('作业保存到云数据库失败', err);
      });
  }
}
```

#### 3.4 更新 pages/index/index.js

```javascript
// 替换 calculateLearningDuration 方法
calculateLearningDuration() {
  const dbManager = require('../../utils/db-manager');
  const cloudUserId = wx.getStorageSync('cloudUserId');
  
  if (!cloudUserId) {
    this.setData({
      currentWeek: 1,
      currentDay: 1
    });
    return;
  }
  
  dbManager.getUser(cloudUserId)
    .then(user => {
      if (user && user.createTime) {
        const createTime = new Date(user.createTime);
        const now = new Date();
        
        const timeDiff = now.getTime() - createTime.getTime();
        const daysPassed = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const weeksPassed = Math.floor(daysPassed / 7);
        
        const currentWeek = weeksPassed + 1;
        const currentDay = (daysPassed % 7) + 1;
        
        this.setData({
          currentWeek: currentWeek,
          currentDay: currentDay
        });
      } else {
        this.setData({
          currentWeek: 1,
          currentDay: 1
        });
      }
    })
    .catch(err => {
      console.error('获取用户注册时间失败', err);
      this.setData({
        currentWeek: 1,
        currentDay: 1
      });
    });
}
```

### 步骤 4: 测试迁移

#### 4.1 功能测试

```javascript
// 测试用户注册
1. 打开应用
2. 进入注册页面
3. 填写用户信息并提交
4. 验证用户是否成功创建

// 测试数据拉取
1. 重启应用
2. 检查是否从云数据库拉取了用户数据
3. 验证本地数据是否与云端数据一致

// 测试作业提交
1. 完成一个作业
2. 检查作业是否保存到云数据库
3. 验证作业答案是否完整

// 测试学习进度同步
1. 完成一个课程
2. 检查学习进度是否同步到云数据库
3. 验证经验值是否正确累计
```

#### 4.2 数据验证

```javascript
// 在云开发控制台中验证数据
1. 打开数据库 → users 集合
2. 查看用户记录是否包含新字段
3. 检查 learningProgress、assignmentProgress、assignmentAnswers 是否正确填充
4. 验证数据类型和格式是否正确
```

### 步骤 5: 灰度发布

#### 5.1 小范围测试
- 邀请少数用户进行测试
- 收集反馈并修复问题

#### 5.2 逐步推送
- 第一阶段：10% 的用户
- 第二阶段：50% 的用户
- 第三阶段：100% 的用户

#### 5.3 监控和回滚
- 监控错误日志
- 如发现严重问题，立即回滚到旧版本

## 常见问题

### Q1: 迁移过程中数据会丢失吗？
A: 不会。迁移脚本只是重新组织数据结构，不会删除任何数据。建议先备份数据以防万一。

### Q2: 旧的 assignments 集合还需要保留吗？
A: 可以保留作为备份，但应用不再使用。建议在确认迁移成功后删除。

### Q3: 如何处理迁移失败的情况？
A: 
1. 检查错误日志
2. 恢复备份数据
3. 修复问题后重新迁移

### Q4: 迁移需要多长时间？
A: 取决于用户数量和数据量。通常几分钟到几小时不等。

### Q5: 迁移期间用户能继续使用应用吗？
A: 建议在迁移期间暂停应用，以避免数据不一致。

## 回滚方案

如果迁移出现问题，可以按以下步骤回滚：

### 1. 停止新版本
立即停止推送新版本，通知用户暂停使用。

### 2. 恢复备份
```javascript
// 在云开发控制台中
1. 进入数据库 → 备份与恢复
2. 选择迁移前的备份
3. 点击恢复
```

### 3. 发布旧版本
发布之前的稳定版本，让用户继续使用。

### 4. 问题排查
分析迁移失败的原因，修复后重新迁移。

## 迁移完成后

### 1. 清理旧数据
```javascript
// 删除旧的 assignments 集合（可选）
// 在云开发控制台中
1. 进入数据库
2. 选择 assignments 集合
3. 点击删除集合
```

### 2. 更新文档
- 更新项目文档，说明新的数据库架构
- 更新开发指南，说明如何使用新的 db-manager 模块

### 3. 培训团队
- 向开发团队介绍新的数据库架构
- 演示如何使用 db-manager 模块

### 4. 监控和优化
- 监控应用性能
- 根据实际使用情况优化数据库查询

## 总结

通过以上步骤，可以顺利地从旧的分散数据库架构迁移到新的统一数据库架构。关键是：

1. **充分准备**：备份数据，测试迁移脚本
2. **谨慎执行**：先在测试环境验证，再灰度发布
3. **持续监控**：发布后持续监控，及时发现和解决问题
4. **完善文档**：更新文档，便于团队理解和维护

祝迁移顺利！
