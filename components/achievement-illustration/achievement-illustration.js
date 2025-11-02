Component({
  properties: {
    // 图标类型: star, cactus, mushroom, sun
    iconType: {
      type: String,
      value: 'star'
    },
    // 是否显示文档图标
    showDocuments: {
      type: Boolean,
      value: true
    },
    // 文档数量
    documentCount: {
      type: Number,
      value: 2
    }
  },

  data: {
    particleColors: []
  },

  lifetimes: {
    attached() {
      this.setParticleColors();
    }
  },

  methods: {
    // 根据图标类型设置粒子颜色
    setParticleColors() {
      const colorSchemes = {
        star: ['#ffd54f', '#ffb300', '#42a5f5', '#90caf9', '#ffd54f', '#ffb300'],
        cactus: ['#ffd54f', '#ffb300', '#42a5f5', '#90caf9', '#66bb6a', '#4caf50'],
        mushroom: ['#ff7043', '#ff5722', '#ffd54f', '#ffb300', '#42a5f5', '#90caf9'],
        sun: ['#ff7043', '#ff5722', '#ffd54f', '#ffb300', '#42a5f5', '#90caf9']
      };

      this.setData({
        particleColors: colorSchemes[this.data.iconType] || colorSchemes.star
      });
    }
  }
});
