# 导引功能更新说明

## 更新内容

### 1. 遮罩透明度调整 ✅
- **原值**: 70% (rgba(0, 0, 0, 0.7))
- **新值**: 40% (rgba(0, 0, 0, 0.4))
- **影响范围**:
  - 遮罩层背景色
  - 高亮区域的box-shadow
  - 脉冲动画效果

### 2. 提示框位置修复 ✅
- **问题**: 提示框位置固定，无法正确定位到对应模块
- **原因**: 组件内部使用 `wx.createSelectorQuery().in(this)` 只能查询组件内部元素
- **解决方案**: 改用 `wx.createSelectorQuery()` 查询页面级别元素

### 3. 位置计算优化 ✅
- 修正了rpx到px的转换逻辑
- 优化了提示框上下位置判断算法
- 改进了边界检测，防止提示框超出屏幕
- 增加了调试日志，便于排查问题

## 技术细节

### 选择器查询修改

**修改前:**
```javascript
const query = wx.createSelectorQuery().in(this)
```

**修改后:**
```javascript
const query = wx.createSelectorQuery()
```

这个改动使得组件能够查询到父页面中的元素，而不仅限于组件内部。

### 位置计算改进

**rpx转px转换:**
```javascript
// 750rpx = windowWidth px
const tipMaxWidth = (600 / 750) * windowWidth
```

**空间判断优化:**
```javascript
const spaceBelow = windowHeight - rect.bottom
const spaceAbove = rect.top

if (spaceBelow > tipHeight + 40 || spaceBelow > spaceAbove) {
  // 提示框在下方
  tipTop = rect.bottom + 20
} else {
  // 提示框在上方
  tipTop = rect.top - tipHeight - 20
}
```

### 延迟时间调整

将导引显示延迟从500ms增加到800ms，确保页面元素完全渲染后再计算位置。

```javascript
setTimeout(() => {
  this.showNewUserGuide();
}, 800);
```

## 测试要点

### 1. 遮罩透明度测试
- 启动导引后，检查背景是否为40%透明度
- 高亮区域应该清晰可见，不会太暗
- 脉冲动画应该流畅自然

### 2. 位置定位测试
- **步骤1（欢迎）**: 提示框应居中显示
- **步骤2（课程学习）**: 提示框应定位在第一个可用课程图标附近
- **步骤3（作业练习）**: 提示框应定位在第一个可用作业图标附近
- **步骤4（经验值）**: 提示框应定位在右上角经验值徽章附近
- **步骤5（开始学习）**: 提示框应居中显示

### 3. 响应式测试
- 在不同屏幕尺寸下测试（iPhone、Android、iPad）
- 检查提示框是否超出屏幕边界
- 验证箭头指示器方向是否正确

### 4. 边界情况测试
- 当目标元素在屏幕顶部时，提示框应显示在下方
- 当目标元素在屏幕底部时，提示框应显示在上方
- 当目标元素靠近屏幕左右边缘时，提示框应自动调整水平位置

## 调试方法

### 查看位置计算日志
在控制台中可以看到每个步骤的位置计算信息：

```javascript
提示框位置计算: {
  rect: { top, left, width, height, bottom, right },
  tipTop: 数值,
  tipLeft: 数值,
  tipPosition: 'tip-top' 或 'tip-bottom',
  windowHeight: 屏幕高度,
  windowWidth: 屏幕宽度,
  spaceBelow: 下方空间,
  spaceAbove: 上方空间
}
```

### 检查元素是否找到
如果选择器未找到对应元素，会在控制台输出警告：

```
未找到选择器对应的元素: .item-image.available
```

## 已知问题和注意事项

### 1. 选择器依赖
导引功能依赖于页面中存在对应的CSS类名：
- `.item-image.available` - 可用的课程图标
- `.item-image-mini.available` - 可用的作业图标
- `.experience-badge` - 经验值徽章

如果这些元素不存在或类名改变，导引将无法正确高亮。

### 2. 渲染时机
导引需要在页面元素完全渲染后才能正确计算位置。当前设置了800ms延迟，如果页面加载较慢，可能需要增加延迟时间。

### 3. 动态内容
如果页面内容是动态加载的（如通过网络请求），需要确保在内容加载完成后再显示导引。

## 文件修改清单

### 修改的文件
1. `components/guide/guide.wxss`
   - 调整遮罩透明度
   - 调整高亮区域透明度
   - 调整脉冲动画透明度

2. `components/guide/guide.js`
   - 修改选择器查询方式
   - 优化位置计算逻辑
   - 添加调试日志
   - 添加错误处理

3. `pages/router/index.js`
   - 增加导引显示延迟时间

## 后续优化建议

1. **自适应延迟**: 根据页面加载状态动态调整延迟时间
2. **重试机制**: 如果元素未找到，自动重试几次
3. **降级方案**: 如果元素始终未找到，显示通用提示
4. **位置缓存**: 缓存计算结果，避免重复计算
5. **动画优化**: 添加提示框位置变化的过渡动画

## 版本信息

- **更新日期**: 2024-01-XX
- **版本**: v1.1
- **更新内容**: 遮罩透明度调整 + 位置定位修复
