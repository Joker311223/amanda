# 微信云开发数据库配置说明
## 概述

本应用已集成微信云开发功能，实现了用户信息和作业数据的云端存储。

## 云开发环境配置

### 1. 环境ID
当前配置的云开发环境ID：`cloud1-6gnh2toe07d2c577`

如需修改，请在 `app.js` 文件中更新：
```javascript
wx.cloud.init({
  env: 'cloud1-6gnh2toe07d2c577' // 替换为你的环境ID
})
```

## 数据库集合配置

### 集合1: users（用户信息表）

**集合名称**: `users`

**权限设置**: 建议设置为"仅创建者可读写"

**数据结构**:
```json
{
  "_id": "云数据库自动生成的ID",
  "_openid": "用户的openid（自动添加）",
  "name": "用户姓名",
  "gender": "male/female",
  "birthDate": "出生年月，格式：YYYY-MM",
  "phone": "手机号",
  "wechat": "微信号",
  "createTime": "创建时间（服务器时间）",
  "learningProgress": {
    "currentWeek": 1,
    "currentDay": 1,
    "completedCourses": [],
    "completedAssignments": [],
    "totalExperience": 0,
    "happinessScore": 0
  }
}
```

**索引建议**:
- `_openid`: 用于快速查询用户信息
- `phone`: 用于手机号查询
- `createTime`: 用于按注册时间排序

### 集合2: assignments（作业提交记录表）

**集合名称**: `assignments`

**权限设置**: 建议设置为"仅创建者可读写"

**数据结构**:
```json
{
  "_id": "云数据库自动生成的ID",
  "_openid": "用户的openid（自动添加）",
  "userId": "用户在users表中的_id",
  "userName": "用户姓名",
  "assignmentId": "作业ID",
  "assignmentTitle": "作业标题",
  "assignmentCategory": "作业分类（正念/情绪调节/痛苦耐受/人际效能）",
  "answers": {
    "0": "第1题答案",
    "1": "第2题答案",
    ...
  },
  "problems": [
    {
      "question": "题目内容",
      "type": "题目类型（text/choose/multiple/score）",
      "answer": "格式化后的答案"
    }
  ],
  "earnedPoints": "获得的经验值",
  "submitTime": "提交时间（服务器时间）",
  "completedAt": "完成时间（ISO格式）"
}
```

**索引建议**:
- `_openid`: 用于查询用户的所有作业
- `userId`: 用于关联用户信息
- `assignmentId`: 用于查询特定作业的提交记录
- `submitTime`: 用于按提交时间排序

## 数据库创建步骤

### 1. 登录微信开发者工具
打开微信开发者工具，进入云开发控制台

### 2. 创建数据库集合

#### 创建 users 集合
1. 点击"数据库" -> "添加集合"
2. 集合名称：`users`
3. 权限设置：选择"仅创建者可读写"
4. 点击"确定"

#### 创建 assignments 集合
1. 点击"数据库" -> "添加集合"
2. 集合名称：`assignments`
3. 权限设置：选择"仅创建者可读写"
4. 点击"确定"

### 3. 配置索引（可选，提升查询性能）

#### users 集合索引
```javascript
// 在云开发控制台 -> 数据库 -> users -> 索引 中添加
{
  "index_name": "openid_index",
  "index_keys": [{"name": "_openid", "direction": "asc"}]
}
```

#### assignments 集合索引
```javascript
// 在云开发控制台 -> 数据库 -> assignments -> 索引 中添加
{
  "index_name": "user_assignment_index",
  "index_keys": [
    {"name": "_openid", "direction": "asc"},
    {"name": "submitTime", "direction": "desc"}
  ]
}
```

## 功能说明

### 1. 用户注册
- **触发时机**: 用户在引导页面完成信息填写并提交时
- **文件位置**: `pages/onboarding/onboarding.js` -> `saveUserToCloud()`
- **操作**: 将用户信息保存到 `users` 集合
- **本地存储**: 将云数据库返回的 `_id` 保存到本地存储的 `cloudUserId`

### 2. 作业提交
- **触发时机**: 用户完成所有作业题目并点击"下一题"时
- **文件位置**: `pages/zuoye/index.js` -> `saveAssignmentToCloud()`
- **操作**: 将作业答案和相关信息保存到 `assignments` 集合
- **数据包含**: 
  - 用户信息
  - 作业ID和标题
  - 所有题目和答案
  - 获得的经验值
  - 提交时间

## 数据查询示例

### 查询用户信息
```javascript
const db = wx.cloud.database()
db.collection('users')
  .where({
    _openid: '{openid}'
  })
  .get()
  .then(res => {
    console.log('用户信息', res.data)
  })
```

### 查询用户的所有作业
```javascript
const db = wx.cloud.database()
db.collection('assignments')
  .where({
    _openid: '{openid}'
  })
  .orderBy('submitTime', 'desc')
  .get()
  .then(res => {
    console.log('作业列表', res.data)
  })
```

### 查询特定作业的提交记录
```javascript
const db = wx.cloud.database()
db.collection('assignments')
  .where({
    _openid: '{openid}',
    assignmentId: 1
  })
  .get()
  .then(res => {
    console.log('作业提交记录', res.data)
  })
```

## 注意事项

1. **权限设置**: 确保数据库权限设置正确，建议使用"仅创建者可读写"，保护用户隐私
2. **网络异常**: 代码中已处理网络异常情况，云数据库操作失败不会影响用户正常使用
3. **数据同步**: 用户数据同时保存在本地存储和云数据库，确保离线也能使用
4. **openid**: 微信云开发会自动为每条记录添加 `_openid` 字段，用于标识用户身份
5. **服务器时间**: 使用 `db.serverDate()` 获取服务器时间，避免客户端时间不准确的问题

## 数据导出

如需导出数据进行分析，可以在云开发控制台进行：
1. 进入"数据库"
2. 选择对应的集合
3. 点击"导出" -> 选择导出格式（JSON/CSV）
4. 下载数据文件

## 数据备份

建议定期备份数据库：
1. 进入云开发控制台
2. 选择"数据库" -> "备份与恢复"
3. 创建备份任务
4. 设置自动备份策略

## 技术支持

如有问题，请联系：
- 项目负责人：杨老师
- 电话：18888929709
