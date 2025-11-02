# Achievement Illustration 成就插画组件

这是一个可爱的成就插画组件，包含4种不同的图标类型和动画效果。

## 功能特点

- 🌟 4种可爱的图标类型：星星、仙人掌、蘑菇、太阳
- 📄 可选的完成文档图标显示
- ✨ 动态粒子装饰效果
- 🎨 流畅的动画效果
- 📱 响应式设计

## 使用方法

### 1. 在页面 JSON 中引入组件

```json
{
  "usingComponents": {
    "achievement-illustration": "/components/achievement-illustration/achievement-illustration"
  }
}
```

### 2. 在 WXML 中使用组件

```xml
<!-- 基础使用 - 只显示星星 -->
<achievement-illustration iconType="star" />

<!-- 显示仙人掌和2个文档图标 -->
<achievement-illustration
  iconType="cactus"
  showDocuments="{{true}}"
  documentCount="{{2}}"
/>

<!-- 显示蘑菇和4个文档图标 -->
<achievement-illustration
  iconType="mushroom"
  showDocuments="{{true}}"
  documentCount="{{4}}"
/>

<!-- 显示太阳和6个文档图标 -->
<achievement-illustration
  iconType="sun"
  showDocuments="{{true}}"
  documentCount="{{6}}"
/>
```

## 属性说明

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| iconType | String | 'star' | 图标类型：'star'(星星)、'cactus'(仙人掌)、'mushroom'(蘑菇)、'sun'(太阳) |
| showDocuments | Boolean | true | 是否显示左侧的文档图标 |
| documentCount | Number | 2 | 文档图标的数量 |

## 图标类型说明

### star - 星星
- 适用场景：第一个成就、特殊奖励
- 颜色：黄色
- 动画：上下弹跳

### cactus - 仙人掌
- 适用场景：完成2个任务
- 颜色：绿色 + 蓝色花盆
- 动画：轻微浮动

### mushroom - 蘑菇
- 适用场景：完成4个任务
- 颜色：蓝色蘑菇帽 + 白色茎
- 动画：轻微浮动

### sun - 太阳
- 适用场景：完成6个任务、最高成就
- 颜色：黄色
- 动画：缓慢旋转

## 示例页面

查看 `pages/achievement-demo/achievement-demo` 页面了解完整示例。

## 自定义样式

组件使用了标准的 rpx 单位，可以通过外部样式类进行自定义：

```xml
<achievement-illustration
  iconType="star"
  class="custom-illustration"
/>
```

```css
.custom-illustration {
  transform: scale(0.8);
}
```

## 注意事项

1. 组件使用了 CSS 动画，在低端设备上可能影响性能
2. 粒子颜色会根据图标类型自动调整
3. 文档图标数量建议不超过6个，以保持视觉平衡
