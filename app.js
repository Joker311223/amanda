App({
  globalData: {
    userInfo: null,
    isFirstTime: true,
    learningProgress: {
      currentWeek: 1,
      currentDay: 1,
      completedCourses: [],
      completedAssignments: [],
      totalExperience: 0
    },
    courses: [
      // 正念技能
      { id: 1, title: '智慧心', category: '正念', duration: '08:45', status: 'locked', experience: 30, icon: '/images/kechenghuigu-icon1.svg', asssignIds: [1,2], position: '0%', url:"https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/辩证行为疗法/视频-正念/正念-智慧心.mp4" },
      { id: 2, title: '正念"怎样做"技能', category: '正念', duration: '10:30', status: 'locked', experience: 30, icon: '/images/kechenghuigu-icon2.svg', asssignIds: [3,4], position: '40%' , url: "https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/辩证行为疗法/视频-正念/正念-怎样做.mp4"},
      { id: 3, title: '正念"是什么"技能', category: '正念', duration: '09:15', status: 'locked', experience: 30, icon: '/images/kechenghuigu-icon3.svg', asssignIds: [5,6], position: '15%' , url: "https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/辩证行为疗法/视频-正念/正念-是什么.mp4" },

      // 痛苦耐受技能
      { id: 4, title: 'ACCEPT技能', category: '痛苦耐受', duration: '12:20', status: 'locked', experience: 30, icon: '/images/kechenghuigu-icon4.svg', asssignIds: [7],  position: '10%' , url : "https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/辩证行为疗法/视频-痛苦耐受/痛苦忍受-转移注意力.mp4"  },
      { id: 5, title: 'IMPROVE技能', category: '痛苦耐受', duration: '11:45', status: 'locked', experience: 30 , icon: '/images/kechenghuigu-icon5.svg', asssignIds: [8],  position: '40%', url :"https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/辩证行为疗法/视频-痛苦耐受/痛苦忍受-改善当下.mp4" },
      { id: 6, title: 'TIP技能', category: '痛苦耐受', duration: '08:30', status: 'locked', experience: 30, icon: '/images/kechenghuigu-icon6.svg', asssignIds: [9],  position: '60%', url: "https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/辩证行为疗法/视频-痛苦耐受/痛苦忍受-TIP.mp4"  },
      { id: 7, title: '全然接纳', category: '痛苦耐受', duration: '13:10', status: 'locked', experience: 30 ,icon: '/images/kechenghuigu-icon7.svg', asssignIds: [10], position: '50%', url : "https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/辩证行为疗法/视频-痛苦耐受/痛苦忍受-全然接纳.mp4"},
      { id: 8, title: '自我安抚', category: '痛苦耐受', duration: '09:50', status: 'locked', experience: 30, icon: '/images/kechenghuigu-icon8.svg', asssignIds: [11],position: '30%', url : "https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/辩证行为疗法/视频-痛苦耐受/痛苦忍受-自我安抚.mp4" },

      // 情绪调节技能
      { id: 9, title: 'PLEASE技能', category: '情绪调节', duration: '10:15', status: 'locked', experience: 30, icon: '/images/kechenghuigu-icon9.svg',  asssignIds: [12], position: '10%', url:"https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/辩证行为疗法/视频-情绪调节/情绪调节-PLEASE.mp4"  },
      { id: 10, title: '相反行为', category: '情绪调节', duration: '11:30', status: 'locked', experience: 30, icon: '/images/kechenghuigu-icon10.svg',  asssignIds: [13], position: '35%', url:"https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/辩证行为疗法/视频-情绪调节/情绪调节-相反行为.mp4" },
      { id: 11, title: '对当下情绪保持正念', category: '情绪调节', duration: '09:40', status: 'locked', experience: 30, icon: '/images/kechenghuigu-icon11.svg',  asssignIds: [14], position: '60%' , url: "https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/辩证行为疗法/视频-情绪调节/情绪调节-当下正念.mp4" },

      // 人际效能技能
      { id: 12, title: '维持关系（GIVE）', category: '人际效能', duration: '12:00', status: 'locked', experience: 30, icon: '/images/kechenghuigu-icon12.svg',  asssignIds: [15,16], position: '40%', url: "https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/辩证行为疗法/视频-人际效能/人际效能-维持关系.mp4"  },
      { id: 13, title: '尊重自己（FAST）', category: '人际效能', duration: '10:45', status: 'locked', experience: 30, icon: '/images/kechenghuigu-icon13.svg',  asssignIds: [17], position: '25%', url: "https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/辩证行为疗法/视频-人际效能/人际效能-尊重自己.mp4"  },
      { id: 14, title: '如你所愿（DEAR MAN）', category: '人际效能', duration: '13:25', status: 'locked', experience: 30, icon: '/images/kechenghuigu-icon14.svg',  asssignIds: [18], position: '60%', url: "https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/辩证行为疗法/视频-人际效能/人际效能-如你所愿.mp4"  }
    ],
    assignments:[
  // 正念作业
    {
      id: 1,
      title: "正念觉察",
      category: "正念",
      courseId: null,
      status: "locked",
      dueDate: "2024-01-15",
      lead: "正念核心技能的练习·描述在什么情况下您决定练习正念技能。",
      problems: [
        { type: "text", info: "情境(人、事、时、地):________" },
        {
          type: "choose",
          info: "请勾选以下您所使用的技能。",
          options: ["智慧心念", "观察", "描述", "参与", "不评判", "专一地做", "有效地做"]
        },
        { type: "text", info: "请描述您使用的过程:________" },
        { type: "text", info: "请描述使用技能的经验:________" },
        {
          type: "multiple",
          info: "请勾选练习这种正念技能是否影响以下任何一个方面，哪怕只有一点点。（多选）",
          options: ["减少痛苦", "减少反应", "增加联结感", "增加快乐", "增加智慧", "提升个人认可", "提升专注力", "提升体验当下的能力"]
        },
        { type: "score", info: "请填写数字(1~5)，代表使用技能的有效程度" }
      ]
    },
    {
      id: 2,
      title: "智慧心",
      category: "正念",
      courseId: 1,
      status: "locked",
      dueDate: "2024-01-16",
      lead: "练习智慧心念",
      problems: [
        {
          type: "multiple",
          info: "智慧心念的练习:每次做完练习时，勾选练习的项目。",
          options: ["专注于自己的呼吸，将注意力放在身体中央", "将自己想象成湖中的石头", "想象自己跟随内在的回旋梯往下走", "吸气与呼气会有暂停，将自己置干其中", "吸进“智慧”，吐出“心念”", "吸气时问智慧心念一个问题，呼气时仔细倾听其回答", "自问“这是智慧心念吗?"]
        },
        { type: "text", info: "请描述练习智慧心念的情境及您的练习过程:________" },
        { type: "score", info: "请选择数字(1~5)，代表这个练习如何有效地协助您进入智慧心念。", options: ["1:没有效果", "2:介于1-3", "3:有一点效果", "4:介于3-5", "5:很有效"] },
        { type: "text", info: "请列出本周全部符合智慧心念的事:________" }
      ]
    },
    {
      id: 3,
      title: "正念\"怎样做\"技能1（WHAT-1）",
      category: "正念",
      courseId: 2,
      status: "locked",
      dueDate: "2024-01-17",
      lead: "“是什么”技能--观察、描述、参与",
      problems: [
        {
          type: "choose",
          info: "描述:记录本周的练习。",
          options: ["观察", "描述", "参与"]
        },
        { type: "text", info: "请描述练习的情境及练习方法:________" },
        {
          type: "multiple",
          info: "请勾选练习这种正念技能是否影响以下任何一个方面，哪怕只有一点点。",
          options: ["减少痛苦", "减少反应", "增加联结感", "增加快乐", "增加智慧", "提升个人认可", "提升专注力", "提升体验当下的能力"]
        },
        { type: "text", info: "请描述这个技能是否让您变得头脑更清晰:________" },
        { type: "text", info: "列出本周全部符合智慧心念的事:________" }
      ]
    },
    {
      id: 4,
      title: "正念\"怎样做\"技能2（WHAT-2）",
      category: "正念",
      courseId: 2,
      status: "locked",
      dueDate: "2024-01-18",
      lead: "观察、描述、参与的清单·记录您练习的技能。",
      problems: [
        {
          type: "multiple",
          info: "练习观察:每次做完练习时，勾选练习的项目。",
          options: ["您所看到的", "声音", "周围的气味", "食物的味道和吃的动作", "想做某事的冲动", "身体感受", "心里来来去去的想法", "呼吸", "通过扩展察觉", "打开您的心"]
        },
        {
          type: "multiple",
          info: "练习描述:每次做完练习时，请勾选练习的项目。",
          options: ["身体之外，眼之所及", "心中的想法、感受和身体感觉", "您的呼吸", "随着音乐起舞", "跟随音乐唱歌", "洗澡时唱歌", "边看电视边载歌载舞", "起床时，还未洗漱就唱歌或跳舞", "去有唱诗班的教堂", "和朋友唱卡拉OK", "将注意力全部集中在他人分享的内容中", "专注于正在做的事情", "做一项运动", "把自己变成呼吸的计数器", "反复以慢速说出某个字", "投入社会或者工作"]
        },
        { type: "text", info: "列出本周全部符合智慧心念的事:________" }
      ]
    },
    {
      id: 5,
      title: "正念\"是什么\"技能1（HOW-1）",
      category: "正念",
      courseId: 3,
      status: "locked",
      dueDate: "2024-01-19",
      lead: "“怎样做”技能--不评判、专一地做、有效地做",
      problems: [
        {
          type: "choose",
          info: "描述:确认本周您做的练习。",
          options: ["不评判", "专一地做", "有效地做"]
        },
        { type: "text", info: "请描述练习的情景及练习方法:________" },
        {
          type: "multiple",
          info: "请勾选练习这种正念技能是否影响以下任何一个方面，哪怕只有一点点。",
          options: ["减少痛苦", "减少反应", "增加联结感", "增加快乐", "增加智慧", "提升个人认可", "提升专注力", "提升体验当下的能力"]
        },
        { type: "text", info: "请描述这个技能是否让您的头脑变得更清晰。________" },
        { type: "text", info: "请描述练习的情景及练习方法。________" },
        { type: "text", info: "请描述这个技能是否让您的头脑变得更清晰。________" },
        { type: "text", info: "请描述练习的情景及练习方法。________" },
        { type: "text", info: "请列出本周全部符合智慧心念的事。________" }
      ]
    },
    {
      id: 6,
      title: "正念\"是什么\"技能2（HOW-2）",
      category: "正念",
      courseId: 3,
      status: "locked",
      dueDate: "2024-01-20",
      lead: "不评判、专一地做、有效地做的清单",
      problems: [
        {
          type: "multiple",
          info: "练习不评判:请勾选每次做的练习。",
          options: ["默默告诉自己,“我心里出现了一个评判的想法”", "计算自己想评判的次数", "以不评判的想法和陈述替代评判的想法和陈述", "注意当您心中涌出想评判时的表情、姿势及语调", "改变您想评判时的表情、姿势及语调", "非常具体、不带评判地描述您的一天", "不带评判地描述一个诱发情绪的事件", "不加评判地、详细地描述日常生活中特别重要的时刻", "想象让您生气的那个人，试着去了解他", "当你感受到批评时，练习浅笑或愿意的手势"]
        },
        { type: "text", info: "请描述练习的情景及练习方法:________" },
        {
          type: "multiple",
          info: "练习专一地做:请勾选每次做的练习。",
          options: ["泡茶或喝咖啡时保持觉察", "洗碗时保持觉察", "手洗衣物时保持觉察", "打扫房间时保持觉察", "慢条斯理地洗澡时保持觉察", "冥想时保持觉察"]
        },
        { type: "text", info: "请描述练习的情景及练习方法:________" },
        {
          type: "multiple",
          info: "练习有效地做:请勾选每次做的练习。",
          options: ["抛弃一定要做正确的事情的想法", "放下执念", "做真正有效的事"]
        },
        { type: "text", info: "请描述练习的情景及练习方法:________" },
        { type: "text", info: "请列出本周全部符合智慧心念的事。________" }
      ]
    },

    // 痛苦耐受作业
    {
      id: 7,
      title: "ACCEPT",
      category: "痛苦耐受",
      courseId: 4,
      status: "locked",
      dueDate: "2024-01-21",
      lead: "转移注意力(ACCEPTS技能)·请描述一个危机事件:并描述使用ACCEPTS技能的过程。",
      problems: [
        { type: "score", info: "危机事件痛苦程度(0-100)", range: [0, 100] },
        { type: "text", info: "诱发事件(人、事、时、地):危机状态是如何导致的?________" },
        {
          type: "multiple",
          info: "请勾选您尝试使用的技能",
          options: ["进行活动(Activities)", "贡献(Contributions)", "比较(Comparisons)", "情绪(Emotions)", "推开(Pushing away)", "想法(Thoughts)", "感觉(Sensations)"]
        },
        { type: "text", info: "可详细描述您所使用的技能:________" },
        { type: "text", info: "请描述使用技能的结果：________" },
        { type: "score", info: "请填写数字(1-5)代表使用技能的有效程度", options: ["1:无法忍受", "2:介于1-3", "3:多少有用", "4:介于3-5", "5:完全忍受"] }
      ]
    },
    {
      id: 8,
      title: "IMPROVE",
      category: "痛苦耐受",
      courseId: 5,
      status: "locked",
      dueDate: "2024-01-22",
      lead: "改善当下·请列出危机事件，(IMPROVE)技能的过程。",
      problems: [
        {
          type: "multiple",
          info: "请勾选您尝试的技能",
          options: ["想象(lmagery)", "意义(Meaning)", "祷告(Prayer)", "放松活动(Relaxation)", "一次做一件事(One thing)", "假期(Vacation)", "鼓励(Encouragement)"]
        },
        { type: "text", info: "请具体描述您尝试的技能：________" },
        { type: "text", info: "请描述使用技能的结果：________" },
        { type: "score", info: "请选择数字(1~5)代表使用技能的有效程度。", options: ["1:无法忍受", "2:介于1-3", "3:多少有用", "4:介于3-5", "5:完全忍受"] }
      ]
    },
    {
      id: 9,
      title: "TIP",
      category: "痛苦耐受",
      courseId: 6,
      status: "locked",
      dueDate: "2024-01-23",
      lead: "使用TIP技能改变身体化学状况·描述练习的每种情景,记录使用TIP技能前后情绪激发的程度及痛苦承受遮程度。描述您实际的过程。",
      problems: [
        { type: "text", info: "T(改变温度)用冷水改变脸部的温度在(Temperature)\n情境:________\n情绪激发的程度(0~100):________\n痛苦承受程度(0=完全无法忍受100=肯定可以承受)\n使用前：________\n使用后:________\n您做了什么?________" },
        { type: "text", info: "I激烈运动(Intense Exercise)\n情境:________\n情绪激发的程度(0~100):________\n痛苦承受程度(0=完全无法忍受100=肯定可以承受)\n使用前:________\n使用后:________\n您做了什么?________" },
        { type: "text", info: "P调节呼吸(Paced breathing)\n情境:________\n情绪激发的程度(0~100):________\n痛苦承受程度(0=完全无法忍受100=肯定可以承受)\n使用前:________\n使用后:________\n您做了什么?________" },
        { type: "text", info: "P配对式肌肉放松(Pairedmusce reaxation)\n情境:________\n情绪激发的程度(0~100):________\n痛苦承受程度(0=完全无法忍受100=肯定可以承受)\n使用前:________\n使用后:________\n您做了什么?________" }
      ]
    },
    {
      id: 10,
      title: "全然接纳",
      category: "痛苦耐受",
      courseId: 7,
      status: "locked",
      dueDate: "2024-01-24",
      lead: "全然接纳·思考您需要全然接纳什么",
      problems: [
        { type: "text", info: "1.1我需要接纳的是:________\n接纳的评分(0~5):________" },
        { type: "text", info: "1.2我需要接纳的是：________\n接纳的评分(0~5):________" },
        { type: "text", info: "2.1我需要接纳的是:________\n接纳的评分(0~5):________" },
        { type: "text", info: "2.2 我需要接纳的是:________\n接纳的评分(0~5):________" },
        { type: "text", info: "3、重新检视你的列表回顾以上内容，并确认其真实性，确认您是否真的需要接纳这些事情。避免使用“好”坏”或任何评判性语言。若有必要，试着不加评判地描述上述内容。________" },
        {
          type: "multiple",
          info: "5、专注于这些事实，让您的智慧心念全然接纳这些事实，并在下面勾选您做过的练习。",
          options: ["能感觉我的质疑或抗拒", "告诫自己，现实就是如此", "思考现实原因，并对其不加评判，接纳其存在", "全身心接纳", "练习相反行为", "提前应对不容易接纳的事情", "思考需要接纳的事情，同时关注身体的感觉", "允许自己有失望、悲伤或痛苦的情绪", "承认即便有苦痛，生活还是有意义的", "分析接纳与否认、拒绝的利弊"]
        },
        { type: "text", info: "5、其他做过的练习:________" },
        { type: "score", info: "6、练习全然接纳后，对您所接纳的程度评分(0~5):________" }
      ]
    },
    {
      id: 11,
      title: "自我安抚",
      category: "痛苦耐受",
      courseId: 8,
      status: "locked",
      dueDate: "2024-01-25",
      lead: "自我安抚·描述危机事件，并描述使用自我安抚技能的过程。",
      problems: [
        { type: "score", info: "危机事件1:痛苦程度(0~100)\n练习前:________\n练习后:________", range: [0, 100] },
        { type: "text", info: "2、诱发事件(人、事、时、地):危机是如何导致的?________" },
        {
          type: "multiple",
          info: "3、请勾选您尝试的技能。",
          options: ["视觉", "听觉", "嗅觉", "味觉", "触觉"]
        },
        { type: "text", info: "4、请详细描述所使用的技能:________" },
        { type: "text", info: "5、请描述使用技能的结果:________" },
        { type: "score", info: "6、请填写数字(1~5)，代表使用技能的有效程度。", options: ["1:无法忍受", "2:介于1-3", "3:多少有用", "4:介于3-5", "5:完全忍受"] }
      ]
    },

    // 情绪调节作业
    {
      id: 12,
      title: "PLEASE技能",
      category: "情绪调节",
      courseId: 9,
      status: "locked",
      dueDate: "2024-01-26",
      lead: "PLEASE技巧·我已经",
      problems: [
        { type: "choose", info: "1、治疗身体疾病?", options: ["是", "否"], followup: "如是，请填写具体内容________" },
        { type: "choose", info: "2、均衡饮食?", options: ["是", "否"], followup: "如是，请填写具体内容________" },
        { type: "choose", info: "3、远离改变情绪的物质?", options: ["是", "否"], followup: "如是，请填写具体内容________" },
        { type: "choose", info: "4、均衡睡眠?", options: ["是", "否"], followup: "如是，请填写具体内容________" },
        { type: "choose", info: "5、适当运动?", options: ["是", "否"], followup: "如是，请填写具体内容________" }
      ]
    },
    {
      id: 13,
      title: "相反行为",
      category: "情绪调节",
      courseId: 10,
      status: "locked",
      dueDate: "2024-01-27",
      lead: "用相反行为改变情绪，找出您想改变的情绪反应，或者您为之感到痛苦的情绪反应，评估这种情绪反应是否和事实符合。如果不是，请关注因情绪而来的行为冲动。然后找出与这种情绪相反的行为，并采取这个相反行为。记住，要练习完全相反的行为。描述所发生的事。",
      problems: [
        { type: "text", info: "1、情绪名称:________" },
        { type: "score", info: "2、请评价其强度(0~100)\n练习前:________\n练习后:________", range: [0, 100] },
        { type: "text", info: "3、诱发事件(人、事、时、地):是什么引发了情绪?________" },
        { type: "text", info: "4、我的情绪合理之处:________" },
        { type: "text", info: "4、我的情绪不合理之处:________" },
        { type: "choose", info: "4、我的情绪是否合理?", options: ["合理:解决问题", "不合理:继续完成此练习单"] },
        { type: "text", info: "4.1行为冲动-我想做什么或说什么?若不合理，请填写:________" },
        { type: "text", info: "4.2相反行为-我的冲动的相反行为是什么?因为处于这种情绪中，我不会去做什么?同时描述此情境下您可能会做什么及如何采取完全相反的行为。若不合理，请填写:________" },
        { type: "text", info: "4.3我做了什么?具体描述，若不合理，请填写:________" },
        { type: "text", info: "4.4我如何做:描述肢体语言、面部表情姿势、手势和想法。若不合理，请填写:________" },
        { type: "text", info: "4.5相反行为会导致什么后果(心理状态其他情绪、行为、想法、记忆、身体状态等)?若不合理，请填写:________" }
      ]
    },
    {
      id: 14,
      title: "对当下情绪保持正念",
      category: "情绪调节",
      courseId: 11,
      status: "locked",
      dueDate: "2024-01-28",
      lead: "对当下的情绪保持正念",
      problems: [
        { type: "text", info: "1、情绪名称:________" },
        { type: "score", info: "2、请评价其强度(0~100)\n练习前:________\n练习后:________", range: [0, 100] },
        { type: "text", info: "3、详细写下诱发情绪的情境:________" },
        {
          type: "multiple",
          info: "5、按以下步骤进行。",
          options: ["让一切停顿下来，只关注能感受到的情绪", "感受情绪的起起落落", "不对情绪加以评判", "注意身体的哪个部位感受到情绪最强烈", "将注意力投放在当下的身体感觉", "注意情绪的削弱时间", "提醒自己不要太苛求情绪", "自己不喜欢的情绪，可以试着练习“我愿意”技能", "想象情绪的来来去去", "察觉睡着情绪而来的行为冲动", "不要跟着情绪走", "告诫自己曾经的不同感受", "练习全然接纳自己的情绪", "尝试去爱自己的情绪"]
        },
        { type: "text", info: "6、对体验的感想与描述:________" }
      ]
    },

    // 人际效能作业
    {
      id: 15,
      title: "人际觉察",
      category: "人际效能",
      courseId: null,
      status: "locked",
      dueDate: "2024-01-29",
      lead: "追踪人际效能技能的使用，当您练习人际效能或有机会去练习时，甚至您未做任何练习，都请填写这张练习单。",
      problems: [
        { type: "text", info: "1、问题的诱发事件:谁对谁做了什么事?是什么事导致下一件事?\n情境中的“目标”(我想要达成什么结果)________\n关系议题(我想知道别人如何看待我)________\n自尊议题(我想知道我如何看待自己)________" },
        { type: "score", info: "2、在此情境下评定您的优先顺序:1(最重要)，2(次重要)，3(最不重要）\n目标________\n关系________\n自尊________" }
      ]
    },
    {
      id: 16,
      title: "维持关系（GIVE）",
      category: "人际效能",
      courseId: 12,
      status: "locked",
      dueDate: "2024-01-30",
      lead: "GIVE(维持关系)·当您练习人际效能或有机会去练习时，甚至您未做任何练习，都请填写这张练习单",
      problems: [
        {
          type: "multiple",
          info: "1、请勾选在此情境下，您说了或做了什么?请勾选您使用的技能并具体描述。",
          options: ["保持温和", "不威胁", "不攻击", "不评判", "表现出兴趣", "认可他人", "态度轻松"]
        },
        { type: "text", info: "2、描述:________" },
        { type: "text", info: "3、这次互动的效果如何?________" }
      ]
    },
    {
      id: 17,
      title: "尊重自己（FAST）",
      category: "人际效能",
      courseId: 13,
      status: "locked",
      dueDate: "2024-01-31",
      lead: "FAST(尊重自己)，当您练习人际效能或有机会去练习时，甚至您未做任何练习，都请填写这张练习单",
      problems: [
        {
          type: "multiple",
          info: "1、请勾选在此情境下，您说了或做了什么?请勾选您使用的技能并具体描述。",
          options: ["公平对待", "不过度道歉", "坚守价值观", "保持真诚"]
        },
        { type: "text", info: "2、描述:________" },
        { type: "text", info: "3、这次互动的效果如何?________" }
      ]
    },
    {
      id: 18,
      title: "如你所愿（DEAR MAN）",
      category: "人际效能",
      courseId: 14,
      status: "locked",
      dueDate: "2024-02-01",
      lead: "DEAR MAN(如你所愿)·当您练习人际效能或有机会去练习时，甚至您未做任何练习，都请填写这张练习单。",
      problems: [
        {
          type: "multiple",
          info: "1、请勾选在此情境下，您说了或做了什么?请勾选您使用的技能并具体描述。",
          options: ["描述情境", "表达感受/意见", "明确态度", "强化对方", "保持正念", "“唱片跳针”", "忽视攻击", "表现自信", "协商妥协"]
        },
        { type: "text", info: "2、描述:________" },
        { type: "text", info: "3、这次互动的效果如何?________" }
      ]
    }
  ],
    skillCards: [
      // 情绪管理-生物社会理论（3张）
      { id: 1, title: '生物社会理论基础', category: '情绪管理-生物社会理论' },
      { id: 2, title: '情绪脆弱性', category: '情绪管理-生物社会理论' },
      { id: 3, title: '无效环境', category: '情绪管理-生物社会理论' },

      // 正念（4张）
      { id: 4, title: 'HOW技能', category: '正念' },
      { id: 5, title: 'WHAT技能', category: '正念' },
      { id: 6, title: '练习观察', category: '正念' },
      { id: 7, title: '智慧心', category: '正念' },

      // 痛苦耐受（13张）
      { id: 8, title: '使用情境', category: '痛苦耐受' },
      { id: 9, title: 'ACCEPT', category: '痛苦耐受' },
      { id: 10, title: 'IMPROVE', category: '痛苦耐受' },
      { id: 11, title: 'STOP', category: '痛苦耐受' },
      { id: 12, title: 'TIP', category: '痛苦耐受' },
      { id: 13, title: '保持正念', category: '痛苦耐受' },
      { id: 14, title: '全然接纳1', category: '痛苦耐受' },
      { id: 15, title: '全然接纳2', category: '痛苦耐受' },
      { id: 16, title: '全然接纳3', category: '痛苦耐受' },
      { id: 17, title: '全然接纳4', category: '痛苦耐受' },
      { id: 18, title: '全然接纳5', category: '痛苦耐受' },
      { id: 19, title: '身体扫描', category: '痛苦耐受' },
      { id: 20, title: '自我安抚', category: '痛苦耐受' },

      // 情绪调节（3张）
      { id: 21, title: '情绪调节-PLEASE', category: '情绪调节' },
      { id: 22, title: '情绪调节-积累正面情绪', category: '情绪调节' },
      { id: 23, title: '情绪调节-相反行为', category: '情绪调节' },

      // 人际效能（5张）
      { id: 24, title: '人际效能目标', category: '人际效能' },
      { id: 25, title: 'DEARMAN1', category: '人际效能' },
      { id: 26, title: 'DEARMAN2', category: '人际效能' },
      { id: 27, title: 'FAST', category: '人际效能' },
      { id: 28, title: 'GIVE', category: '人际效能' }
    ]
  },

  onLaunch() {
    // 检查是否首次使用
    const isFirstTime = wx.getStorageSync('isFirstTime')
    if (isFirstTime === '') {
      this.globalData.isFirstTime = true
    } else {
      this.globalData.isFirstTime = false
      // 加载用户数据
      this.loadUserData()
    }
  },

  loadUserData() {
    try {
      const userInfo = wx.getStorageSync('userInfo')
      const learningProgress = wx.getStorageSync('learningProgress')

      if (userInfo) {
        this.globalData.userInfo = userInfo
      }
      if (learningProgress) {
        this.globalData.learningProgress = learningProgress
      }
    } catch (e) {
      console.error('加载用户数据失败', e)
    }
  },

  saveUserData() {
    try {
      wx.setStorageSync('userInfo', this.globalData.userInfo)
      wx.setStorageSync('learningProgress', this.globalData.learningProgress)
      wx.setStorageSync('isFirstTime', false)
    } catch (e) {
      console.error('保存用户数据失败', e)
    }
  },

  // 解锁下一个课程
  unlockNextCourse() {
    const courses = this.globalData.courses
    const completedCount = this.globalData.learningProgress.completedCourses.length

    if (completedCount < courses.length) {
      courses[completedCount].status = 'available'
    }
  },

  // 完成课程
  completeCourse(courseId) {
    const progress = this.globalData.learningProgress
    if (!progress.completedCourses.includes(courseId)) {
      progress.completedCourses.push(courseId)
      progress.totalExperience += 30

      // 解锁对应作业
      this.unlockAssignmentsByCourse(courseId)

      // 解锁下一个课程
      this.unlockNextCourse()

      this.saveUserData()
    }
  },

  // 根据课程解锁作业
  unlockAssignmentsByCourse(courseId) {
    const assignments = this.globalData.assignments
    assignments.forEach(assignment => {
      if (assignment.courseId === courseId) {
        assignment.status = 'available'
      }
    })
  }
})
