# 完整作业数据提交功能说明
## 功能概述

当用户完成作业的所有题目后，系统会自动将完整的作业数据提交到云数据库的 `fullans` 集合中。这个集合包含了比 `assignments` 集合更详细、更完整的数据，便于后续的数据分析和导出。

## 数据对比

### assignments 集合（简化版）
- 保存基本的作业信息
- 答案以简单的键值对形式存储
- 适合快速查询和统计

### fullans 集合（完整版）
- 保存完整的用户信息（包括性别、手机号、微信号）
- 保存完整的作业信息（包括导语）
- 每道题目的详细信息（题目文本、类型、选项、参数等）
- 原始答案和格式化答案都保存
- 统计信息（总题数、完成率）
- 设备信息
- 适合数据分析和导出

## 数据结构详解

### fullans 集合字段说明

#### 用户信息
```javascript
{
  userId: "用户在users表中的_id",
  userName: "用户姓名",
  userGender: "用户性别（male/female）",
  userPhone: "用户手机号",
  userWechat: "用户微信号"
}
```

#### 作业基本信息
```javascript
{
  assignmentId: "作业ID（数字）",
  assignmentTitle: "作业标题",
  assignmentCategory: "作业分类（正念/情绪调节/痛苦耐受/人际效能）",
  assignmentLead: "作业导语"
}
```

#### 题目和答案详情
```javascript
{
  questionsAndAnswers: [
    {
      questionNumber: 1,              // 题目序号
      questionText: "题目内容",        // 题目文本
      questionType: "text",            // 题目类型：text/choose/multiple/score
      questionPlaceholder: "提示文本", // 输入提示（text类型）
      questionOptions: [],             // 选项数组（choose/multiple类型）
      questionMin: 0,                  // 最小值（score类型）
      questionMax: 100,                // 最大值（score类型）
      questionStep: 10,                // 步长（score类型）
      rawAnswer: "原始答案",           // 原始答案数据
      formattedAnswer: "格式化答案",   // 格式化后的答案
      answerType: "string"             // 答案数据类型
    }
  ]
}
```

#### 统计信息
```javascript
{
  totalQuestions: 5,        // 总题目数
  answeredQuestions: 5,     // 已回答题目数
  completionRate: 100,      // 完成率（百分比）
  earnedPoints: 20          // 获得的经验值
}
```

#### 时间信息
```javascript
{
  submitTime: "服务器时间",           // 提交时间（服务器时间）
  completedAt: "2024-01-01T00:00:00.000Z"  // 完成时间（ISO格式）
}
```

#### 设备信息
```javascript
{
  deviceInfo: {
    platform: "ios",        // 设备平台
    system: "iOS 15.0",     // 系统版本
    version: "8.0.0"        // 微信版本
  }
}
```

## 数据示例

### 文本题示例
```json
{
  "questionNumber": 1,
  "questionText": "请描述你今天的心情",
  "questionType": "text",
  "questionPlaceholder": "请输入你的答案",
  "questionOptions": [],
  "rawAnswer": "今天心情很好，阳光明媚",
  "formattedAnswer": "今天心情很好，阳光明媚",
  "answerType": "string"
}
```

### 单选题示例
```json
{
  "questionNumber": 2,
  "questionText": "你最常使用的正念技能是？",
  "questionType": "choose",
  "questionOptions": [
    {"title": "观察", "subtitle": "注意观察周围环境"},
    {"title": "描述", "subtitle": "用语言描述感受"},
    {"title": "参与", "subtitle": "全身心投入当下"}
  ],
  "rawAnswer": {"title": "观察", "subtitle": "注意观察周围环境"},
  "formattedAnswer": "观察",
  "answerType": "object"
}
```

### 多选题示例
```json
{
  "questionNumber": 3,
  "questionText": "你使用过哪些情绪调节技能？",
  "questionType": "multiple",
  "questionOptions": [
    {"title": "深呼吸"},
    {"title": "运动"},
    {"title": "听音乐"}
  ],
  "rawAnswer": [
    {"title": "深呼吸", "selected": true},
    {"title": "运动", "selected": true}
  ],
  "formattedAnswer": "深呼吸、运动",
  "answerType": "object"
}
```

### 评分题示例
```json
{
  "questionNumber": 4,
  "questionText": "你的情绪强度",
  "questionType": "score",
  "questionMin": 0,
  "questionMax": 100,
  "questionStep": 10,
  "rawAnswer": 60,
  "formattedAnswer": "60",
  "answerType": "number"
}
```

## 数据用途

### 1. 数据分析
- 分析用户的答题情况
- 统计不同题型的答案分布
- 分析完成率和经验值获取情况
- 按分类统计作业完成情况

### 2. 数据导出
- 导出完整的作业数据用于研究
- 生成用户学习报告
- 制作数据可视化图表

### 3. 用户画像
- 根据用户信息和答题情况建立用户画像
- 分析不同性别、年龄段的答题特点
- 优化课程和作业设计

### 4. 质量监控
- 监控作业完成质量
- 发现异常答题行为
- 优化题目设计

## 数据查询示例

### 查询用户的所有作业
```javascript
const db = wx.cloud.database()
db.collection('fullans')
  .where({
    _openid: '{openid}'
  })
  .orderBy('submitTime', 'desc')
  .get()
  .then(res => {
    console.log('用户的所有作业', res.data)
  })
```

### 查询特定分类的作业
```javascript
const db = wx.cloud.database()
db.collection('fullans')
  .where({
    assignmentCategory: '正念'
  })
  .get()
  .then(res => {
    console.log('正念类作业', res.data)
  })
```

### 查询特定作业的所有提交记录
```javascript
const db = wx.cloud.database()
db.collection('fullans')
  .where({
    assignmentId: 1
  })
  .orderBy('submitTime', 'desc')
  .get()
  .then(res => {
    console.log('作业1的所有提交记录', res.data)
  })
```

### 统计完成率
```javascript
const db = wx.cloud.database()
db.collection('fullans')
  .where({
    completionRate: db.command.gte(80) // 完成率大于等于80%
  })
  .count()
  .then(res => {
    console.log('高完成率作业数量', res.total)
  })
```

## 数据导出

### 导出为 CSV
在云开发控制台：
1. 进入"数据库" -> "fullans"
2. 点击"导出" -> 选择"CSV"
3. 下载文件

### 导出为 JSON
在云开发控制台：
1. 进入"数据库" -> "fullans"
2. 点击"导出" -> 选择"JSON"
3. 下载文件

## 注意事项

1. **数据量**: fullans 集合的数据量会比 assignments 大，注意存储空间
2. **查询性能**: 建议创建索引以提升查询性能
3. **数据隐私**: 包含用户手机号等敏感信息，注意数据安全
4. **权限设置**: 建议设置为"仅创建者可读写"
5. **数据备份**: 定期备份数据，防止数据丢失

## 索引建议

```javascript
// 在云开发控制台 -> 数据库 -> fullans -> 索引 中添加

// 1. 用户查询索引
{
  "index_name": "user_index",
  "index_keys": [
    {"name": "_openid", "direction": "asc"},
    {"name": "submitTime", "direction": "desc"}
  ]
}

// 2. 作业查询索引
{
  "index_name": "assignment_index",
  "index_keys": [
    {"name": "assignmentId", "direction": "asc"},
    {"name": "submitTime", "direction": "desc"}
  ]
}

// 3. 分类查询索引
{
  "index_name": "category_index",
  "index_keys": [
    {"name": "assignmentCategory", "direction": "asc"},
    {"name": "submitTime", "direction": "desc"}
  ]
}
```

## 技术支持

如有问题，请联系：
- 项目负责人：杨老师
- 电话：18888929709
