App({
  globalData: {
    userInfo: null,
    isFirstTime: true,
    debugMode: false, // debug模式标志
    learningProgress: {
      currentWeek: 1,
      currentDay: 1,
      completedCourses: [],
      completedAssignments: [],
      totalExperience: 0,
      happinessScore: 0, // 快乐分
    },
    courses: [
      // 正念技能
      {
        id: 1,
        title: "正念-智慧心",
        category: "正念",
        duration: "03:12",
        status: "available",
        experience: 35,
        icon: "/images/kechenghuigu-icon1.svg",
        asssignIds: [2, 1],
        position: "0%",
        url: "https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/辩证行为疗法/视频-正念/正念-智慧心.mp4",
      },
      {
        id: 2,
        title: '正念"怎样做"技能',
        category: "正念",
        duration: "03:37",
        status: "locked",
        experience: 35,
        icon: "/images/kechenghuigu-icon2.svg",
        asssignIds: [4, 3],
        position: "40%",
        url: "https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/辩证行为疗法/视频-正念/正念-怎样做.mp4",
      },
      {
        id: 3,
        title: '正念"是什么"技能',
        category: "正念",
        duration: "04:05",
        status: "locked",
        experience: 35,
        icon: "/images/kechenghuigu-icon3.svg",
        asssignIds: [6, 5],
        position: "15%",
        url: "https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/辩证行为疗法/视频-正念/正念-是什么.mp4",
      },

      // 痛苦耐受技能
      {
        id: 4,
        title: "痛苦耐受-ACCEPT技能",
        category: "痛苦耐受",
        duration: "05:56",
        status: "locked",
        experience: 35,
        icon: "/images/kechenghuigu-icon4.svg",
        asssignIds: [7],
        position: "10%",
        url: "https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/辩证行为疗法/视频-痛苦耐受/痛苦忍受-转移注意力.mp4",
      },
      {
        id: 5,
        title: "痛苦耐受-IMPROVE技能",
        category: "痛苦耐受",
        duration: "05:51",
        status: "locked",
        experience: 35,
        icon: "/images/kechenghuigu-icon5.svg",
        asssignIds: [8],
        position: "40%",
        url: "https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/辩证行为疗法/视频-痛苦耐受/痛苦忍受-改善当下.mp4",
      },
      {
        id: 6,
        title: "痛苦耐受-TIP技能",
        category: "痛苦耐受",
        duration: "05:28",
        status: "locked",
        experience: 35,
        icon: "/images/kechenghuigu-icon6.svg",
        asssignIds: [9],
        position: "60%",
        url: "https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/辩证行为疗法/视频-痛苦耐受/痛苦忍受-TIP.mp4",
      },
      {
        id: 7,
        title: "痛苦耐受-全然接纳",
        category: "痛苦耐受",
        duration: "02:50",
        status: "locked",
        experience: 35,
        icon: "/images/kechenghuigu-icon7.svg",
        asssignIds: [10],
        position: "50%",
        url: "https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/辩证行为疗法/视频-痛苦耐受/痛苦忍受-全然接纳.mp4",
      },
      {
        id: 8,
        title: "痛苦耐受-自我安抚",
        category: "痛苦耐受",
        duration: "03:15",
        status: "locked",
        experience: 35,
        icon: "/images/kechenghuigu-icon8.svg",
        asssignIds: [11],
        position: "30%",
        url: "https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/辩证行为疗法/视频-痛苦耐受/痛苦忍受-自我安抚.mp4",
      },

      // 情绪调节技能
      {
        id: 9,
        title: "情绪调节-PLEASE技能",
        category: "情绪调节",
        duration: "03:48",
        status: "locked",
        experience: 35,
        icon: "/images/kechenghuigu-icon9.svg",
        asssignIds: [12],
        position: "10%",
        url: "https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/辩证行为疗法/视频-情绪调节/情绪调节-PLEASE.mp4",
      },
      {
        id: 10,
        title: "情绪调节-相反行为",
        category: "情绪调节",
        duration: "03:36",
        status: "locked",
        experience: 35,
        icon: "/images/kechenghuigu-icon10.svg",
        asssignIds: [13],
        position: "35%",
        url: "https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/辩证行为疗法/视频-情绪调节/情绪调节-相反行为.mp4",
      },
      {
        id: 11,
        title: "情绪调节-对当下情绪保持正念",
        category: "情绪调节",
        duration: "03:46",
        status: "locked",
        experience: 35,
        icon: "/images/kechenghuigu-icon11.svg",
        asssignIds: [14],
        position: "60%",
        url: "https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/辩证行为疗法/视频-情绪调节/情绪调节-当下正念.mp4",
      },

      // 人际效能技能
      {
        id: 12,
        title: "人际效能-维持关系GIVE",
        category: "人际效能",
        duration: "03:39",
        status: "locked",
        experience: 35,
        icon: "/images/kechenghuigu-icon12.svg",
        asssignIds: [16, 15],
        position: "40%",
        url: "https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/辩证行为疗法/视频-人际效能/人际效能-维持关系.mp4",
      },
      {
        id: 13,
        title: "人际效能-尊重自己FAST",
        category: "人际效能",
        duration: "03:37",
        status: "locked",
        experience: 35,
        icon: "/images/kechenghuigu-icon13.svg",
        asssignIds: [17],
        position: "25%",
        url: "https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/辩证行为疗法/视频-人际效能/人际效能-尊重自己.mp4",
      },
      {
        id: 14,
        title: "人际效能-如你所愿DEAR MAN",
        category: "人际效能",
        duration: "05:57",
        status: "locked",
        experience: 35,
        icon: "/images/kechenghuigu-icon14.svg",
        asssignIds: [18],
        position: "60%",
        url: "https://yinjiacheng2025.oss-cn-shanghai.aliyuncs.com/辩证行为疗法/视频-人际效能/人际效能-如你所愿.mp4",
      },
    ],
    assignments: [
      {
        id: 1,
        title: "正念-概览",
        category: "正念",
        courseId: 1,
        experience: 20,
        status: "locked",
        dueDate: "2024-01-15",
        lead: "正念核心技能的练习·描述在什么情况下你决定练习正念技能。",
        problems: [
          {
            type: "text",
            info: "1. 情境(人、事、时、地)（提示：请详细描述练习的背景，比如“考试前紧张时”“和同学闹矛盾后”）",
            placeholder: "请在此输入内容",
          },
          {
            type: "multiple",
            info: "2. 你使用的技能（可多选）：",
            options: [
              "智慧心念",
              "观察描述",
              "参与",
              "不评判",
              "专一地做",
              "有效地做",
            ],
          },
          {
            type: "text",
            info: "3. 你使用的过程（提示：请描述练习的具体步骤，比如“课间10分钟，坐在座位上专注呼吸”）",
            placeholder: "请在此输入内容",
          },
          {
            type: "text",
            info: "4. 使用技能的经验（提示：分享练习中的感受与发现，比如“专注时不那么焦虑了”）",
            placeholder: "请在此输入内容",
          },
          {
            type: "multiple",
            info: "5. 练习这种正念技能是否影响以下方面（可多选）",
            options: [
              "减少痛苦",
              "减少反应",
              "增加联结感",
              "增加快乐",
              "增加智慧",
              "提升个人认可",
              "提升专注力",
              "提升体验当下的能力",
            ],
          },
        ],
      },
      {
        id: 2,
        title: "正念-智慧心",
        category: "正念",
        courseId: 1,
        experience: 20,
        status: "locked",
        dueDate: "2024-01-16",
        lead: "练习智慧心念",
        problems: [
          {
            type: "multiple",
            info: "1. 智慧心念的练习（每次做完勾选，可多选）",
            options: [
              "专注于自己的呼吸，将注意力放在身体中央",
              "将自己想象成湖中的石头",
              "想象自己跟随内在的回旋梯往下走",
              "吸气与呼气会有暂停，将自己置于其中",
              "吸进“智慧”，吐出“心念”",
              "吸气时问智慧心念一个问题，呼气时仔细倾听其回答",
              "自问“这是智慧心念吗?”",
            ],
          },
          {
            type: "text",
            info: "2. 练习智慧心念的情境及练习过程（提示：描述练习背景与操作步骤，比如“晚自习前烦躁时，在操场边做呼吸练习”）",
            placeholder: "请在此输入内容",
          },
          {
            type: "choose",
            info: "3. 这个练习协助你进入智慧心念的有效程度（单选）",
            options: [
              "1分：没有效果，我一分钟都坚持不下去，分心或放弃了",
              "2分：介于1至3之间的程度",
              "3分：有一点效果，我能够练习智慧心念，并且有点进入状态",
              "4分：介于3至5之间的程度",
              "5分：很有效，我进入智慧心念的中心，可以自如地做需要做的事",
            ],
          },
          {
            type: "text",
            info: "4. 本周全部符合智慧心念的事（提示：列举本周践行智慧心念的具体事例，比如“和朋友吵架后，没有冲动反驳，而是冷静沟通”）",
            placeholder: "请在此输入内容",
          },
        ],
      },
      {
        id: 3,
        title: "正念-是什么1",
        category: "正念",
        courseId: 2,
        experience: 20,
        status: "locked",
        dueDate: "2024-01-17",
        lead: "“是什么”技能—观察、描述、参与",
        problems: [
          {
            type: "multiple",
            info: "1. 本周的练习（可多选）",
            options: ["观察", "描述", "参与"],
          },
          {
            type: "text",
            info: "2. 练习的情境及练习方法（提示：分别描述每种练习的背景与操作，比如“观察：上课前观察教室的绿植；参与：认真加入班级小组讨论”）",
            placeholder: "请在此输入内容",
          },
          {
            type: "multiple",
            info: "3. 练习这种正念技能是否影响以下方面（可多选）",
            options: [
              "减少痛苦",
              "减少反应",
              "增加联结感",
              "增加快乐",
              "增加智慧",
              "提升个人认可",
              "提升专注力",
              "提升体验当下的能力",
            ],
          },
          {
            type: "text",
            info: "4. 这个技能是否让你变得头脑更清晰（提示：分享具体感受与变化，比如“上课走神变少了，能跟上老师的思路”）",
            placeholder: "请在此输入内容",
          },
          {
            type: "text",
            info: "5. 本周全部符合智慧心念的事（提示：列举本周相关践行事例，比如“跑步时专注感受脚步落地的感觉，不胡思乱想”）",
            placeholder: "请在此输入内容",
          },
        ],
      },
      {
        id: 4,
        title: "正念-是什么2",
        category: "正念",
        courseId: 2,
        experience: 20,
        status: "locked",
        dueDate: "2024-01-18",
        lead: "观察、描述、参与的清单，记录你练习的技能",
        problems: [
          {
            type: "multiple",
            info: "1. 练习观察（每次做完勾选，可多选）",
            options: [
              "你所看到的：用视觉观察，但不总盯着眼前的一切",
              "声音：周遭的声音，某人的声音和语调、音乐",
              "周围的气味：食物的味道，香皂，走路时周遭的空气",
              "食物的味道和吃的动作",
              "想做某事的冲动：趁着冲动冲浪，注意想逃避作业时的冲动，注意冲动停留在身体的哪个部位",
              "身体感受：身体扫描，走路的感觉，身体碰触某物（比如握笔的触感）",
              "心里来来去去的想法：想象心如河流，想象心如传送带",
              "呼吸：注意胃部的活动，气息从鼻孔进出的感觉",
              "通过扩展察觉：对整个身体，对周遭的空间，拥抱一棵树",
              "打开你的心：注意产生的每种感觉，不执着，让它们流走",
            ],
          },
          {
            type: "multiple",
            info: "2. 练习描述（每次做完勾选，可多选）",
            options: [
              "身体之外，眼之所及",
              "心中的想法、感受和身体感觉",
              "你的呼吸",
              "随着音乐起舞",
              "跟随音乐唱歌",
              "洗澡时唱歌",
              "边看电视边载歌载舞",
              "起床时，还未洗漱就唱歌或跳舞",
              "去有唱诗班的教堂，加入歌唱",
              "和朋友唱卡拉OK，或在卡拉OK店唱歌",
              "将注意力全部集中在他人分享的内容中",
              "专注于正在做的事情，包括跑步、骑车、溜冰、走路",
              "做一项运动，并投入其中",
              "把自己变成呼吸的计数器，数“1”时变成“2”、数“2”时变成“3”，以此类推",
              "反复以慢速说出某个字，将自己变成那个字",
              "投入班级活动、社团活动或学习，忘记其他",
            ],
          },
          {
            type: "text",
            info: "3. 本周全部符合智慧心念的事（提示：列举本周践行相关技能的具体事例，比如“画画时专注观察物体的形状和颜色，不被外界打扰”）",
            placeholder: "请在此输入内容",
          },
        ],
      },
      {
        id: 5,
        title: "正念-怎样做1",
        category: "正念",
        courseId: 3,
        experience: 20,
        status: "locked",
        dueDate: "2024-01-19",
        lead: "“怎样做”技能—不评判、专一地做、有效地做",
        problems: [
          {
            type: "multiple",
            info: "1. 本周你做的练习（可多选）",
            options: ["不评判", "专一地做", "有效地做"],
          },
          {
            type: "text",
            info: "2. 练习“不评判”的情景及方法（提示：描述练习背景与具体操作，比如“看到同学穿的衣服和自己不一样，不觉得不好看，而是告诉自己‘每个人喜好不同’”）",
            placeholder: "请在此输入内容",
          },
          {
            type: "multiple",
            info: "3. 练习“不评判”是否影响以下方面（可多选）",
            options: [
              "减少痛苦",
              "减少反应",
              "增加联结感",
              "增加快乐",
              "增加智慧",
              "提升个人认可",
              "提升专注力",
              "提升体验当下的能力",
            ],
          },
          {
            type: "text",
            info: "4. “不评判”技能是否让你的头脑变得更清晰（提示：分享具体感受，比如“不再随便评价别人后，自己的心情也更平和了”）",
            placeholder: "请在此输入内容",
          },
          {
            type: "text",
            info: "5. 练习“专一地做”的情景及方法（提示：描述练习背景与具体操作，比如“写作业时关掉手机，专注于题目，不边写边玩”）",
            placeholder: "请在此输入内容",
          },
          {
            type: "text",
            info: "6. “专一地做”技能是否让你的头脑变得更清晰（提示：分享具体感受，比如“专注写作业时，做题速度变快了，正确率也提高了”）",
            placeholder: "请在此输入内容",
          },
          {
            type: "text",
            info: "7. 练习“有效地做”的情景及方法（提示：描述练习背景与具体操作，比如“先完成作业再玩游戏，合理安排学习和娱乐时间”）",
            placeholder: "请在此输入内容",
          },
          {
            type: "text",
            info: "8. 本周全部符合智慧心念的事（提示：列举本周践行相关技能的事例，比如“小组合作时，不挑剔同学的想法，而是一起讨论最优方案”）",
            placeholder: "请在此输入内容",
          },
        ],
      },
      {
        id: 6,
        title: "正念-怎样做2",
        category: "正念",
        courseId: 3,
        experience: 20,
        status: "locked",
        dueDate: "2024-01-20",
        lead: "不评判、专一地做、有效地做的清单",
        problems: [
          {
            type: "multiple",
            info: "1. 练习不评判（每次做完勾选，可多选）",
            options: [
              "默默告诉自己，“我心里出现了一个评判的想法”",
              "计算自己想评判的次数",
              "以不评判的想法和陈述替代评判的想法和陈述",
              "注意当你心中涌出想评判时的表情、姿势及语调",
              "改变你想评判时的表情、姿势及语调",
              "非常具体、不带评判地描述你的一天",
              "不带评判地描述一个诱发情绪的事件",
              "不加评判地、详细地描述日常生活中特别重要的时刻",
              "想象让你生气的那个人，试着去了解他",
              "当你感受到批评时，练习浅笑或愿意的手势",
            ],
          },
          {
            type: "text",
            info: "2. 练习不评判的情景及方法（提示：结合勾选的练习描述，比如“看到同学回答问题出错，想笑他时，告诉自己‘谁都有犯错的时候’，然后安静听老师讲解”）",
            placeholder: "请在此输入内容",
          },
          {
            type: "multiple",
            info: "3. 练习专一地做（每次做完勾选，可多选）",
            options: [
              "泡茶或冲奶茶时保持觉察",
              "洗碗时保持觉察",
              "手洗衣物时保持觉察",
              "打扫房间时保持觉察",
              "慢条斯理地洗澡时保持觉察",
              "冥想时保持觉察",
            ],
          },
          {
            type: "text",
            info: "4. 练习专一地做的情景及方法（提示：结合勾选的练习描述，比如“打扫书桌时，专注于整理书本、擦拭桌面，不边打扫边看手机”）",
            placeholder: "请在此输入内容",
          },
          {
            type: "multiple",
            info: "5. 练习有效地做（每次做完勾选，可多选）",
            options: [
              "抛弃一定要做正确的事情的想法",
              "放下执念",
              "做真正有效的事",
            ],
          },
          {
            type: "text",
            info: "6. 练习有效地做的情景及方法（提示: 结合勾选的练习描述，比如“准备期中考试时，先列出自己的薄弱知识点，针对性复习，而不是盲目刷题”）",
            placeholder: "请在此输入内容",
          },
          {
            type: "text",
            info: "7. 本周全部符合智慧心念的事（提示：列举本周践行事例，比如“运动会跑步时，专注于自己的节奏，不纠结于是否能拿名次，享受过程”）",
            placeholder: "请在此输入内容",
          },
        ],
      },
      {
        id: 7,
        title: "痛苦忍受-ACCEPT技能",
        category: "痛苦耐受",
        courseId: 4,
        experience: 20,
        status: "locked",
        dueDate: "2024-01-21",
        lead: "转移注意力(ACCEPTS技能)·请描述一个让你感到痛苦的事件，并描述使用ACCEPTS技能的过程",
        problems: [
          {
            type: "score",
            info: "1. 危机事件痛苦程度（0=完全无法忍受，100=完全可以承受）",
            range: [0, 100],
          },
          {
            type: "text",
            info: "2. 诱发事件(人、事、时、地)：痛苦状态是如何导致的？（提示：详细描述事件背景与发展，比如“周三下午体育课，被同学嘲笑身材不好，心里特别难受，忍不住想哭”）",
            placeholder: "请在此输入内容",
          },
          {
            type: "multiple",
            info: "3. 你尝试使用的技能（可多选）",
            options: [
              "进行活动(Activities)（比如听音乐、画画、打球）",
              "贡献(Contributions)（比如帮同学讲题、做班级卫生）",
              "比较(Comparisons)（比如想想比自己更不容易的人）",
              "情绪(Emotions)（比如听欢快的歌让自己开心）",
              "推开(Pushing away)（比如暂时不想这件烦心事）",
              "想法(Thoughts)（比如告诉自己“别人的嘲笑不重要，做好自己就好”）",
              "感觉(Sensations)（比如吃喜欢的零食、抱毛绒玩具）",
            ],
          },
          {
            type: "text",
            info: "4. 所使用技能的详细描述（提示：描述每种技能的具体使用方式，比如“进行活动：体育课结束后，和好朋友去操场打了20分钟羽毛球；想法：不断告诉自己‘每个人都有自己的优点，我的跑步很快呀’”）",
            placeholder: "请在此输入内容",
          },
          {
            type: "text",
            info: "5. 使用技能的结果（提示：分享技能使用后的变化与感受，比如“打羽毛球后出汗了，心情轻松了很多，不再一直想着被嘲笑的事，也不那么难过了”）",
            placeholder: "请在此输入内容",
          },
          {
            type: "choose",
            info: "6. 使用技能的有效程度（单选）",
            options: [
              "1分：我不能忍受这种情况了，一分钟都无法忍受",
              "2分：介于1至3之间",
              "3分：多少可以应对当下情况，练习是有用的",
              "4分：介于3至5之间",
              "5分：我可以使用技能忍受痛苦，并控制住想发脾气或哭泣的冲动",
            ],
          },
        ],
      },
      {
        id: 8,
        title: "痛苦忍受-IMPROVE技能",
        category: "痛苦耐受",
        courseId: 5,
        experience: 20,
        status: "locked",
        dueDate: "2024-01-22",
        lead: "改善当下·请列出让你痛苦的事件及(IMPROVE)技能的使用过程。",
        problems: [
          {
            type: "multiple",
            info: "你尝试的技能（可多选）",
            options: [
              "想象(Imagery)（比如想象自己在喜欢的海边、草原）",
              "意义(Meaning)（比如想想这件事能让自己成长）",
              "祷告(Prayer)",
              "放松活动(Relaxation)（比如深呼吸、拉伸、听舒缓的音乐）",
              "一次做一件事(One thing)（比如先做好眼前的作业，不被痛苦情绪影响）",
              "假期(Vacation)（比如周末和家人去公园、郊外散心）",
              "鼓励(Encouragement)",
            ],
          },
          {
            type: "text",
            info: "尝试技能的具体描述（提示：详细描述每种技能的使用场景与操作，比如“放松活动：和妈妈吵架后，回到房间做了10次深呼吸，跟着音乐拉伸肩膀；鼓励：对着镜子告诉自己‘妈妈是为我好，我可以好好和她沟通，不用生气’”）",
            placeholder: "请在此输入内容",
          },
          {
            type: "text",
            info: "使用技能的结果（提示：分享技能使用后的变化与感受，比如“放松后情绪平静了，后来和妈妈好好聊了聊，妈妈也理解了我的想法，我们和好了”）",
            placeholder: "请在此输入内容",
          },
          {
            type: "choose",
            info: "使用技能的有效程度（单选）",
            options: [
              "1分：我不能忍受这种情况了，一分钟都无法忍受",
              "2分：介于1至3之间的程度",
              "3分：多少可以应对当下的情况，练习是有用的",
              "4分：介于3至5之间的程度",
              "5分：我可以使用技能忍受痛苦，并控制住冲动行为",
            ],
          },
        ],
      },
      {
        id: 9,
        title: "痛苦忍受-TIP技能",
        category: "痛苦耐受",
        courseId: 6,
        experience: 20,
        status: "locked",
        dueDate: "2024-01-23",
        lead: "使用TIP技能改变身体化学状况。描述练习的每种情景，记录使用TIP技能前后情绪激发的程度及痛苦承受程度，描述实际过程。",
        problems: [
          {
            type: "text",
            info: "技能T(改变温度)：用冷水改变脸部的温度(Temperature)\n情境:（提示：请描述练习时的人、事、时、地，比如“考试前紧张到发抖，在洗手间进行练习”）",
            placeholder: "请在此输入内容",
          },
          {
            type: "score",
            info: "2. 情绪激发的程度（0~100）",
            range: [0, 100],
          },
          {
            type: "score",
            info: "3. 痛苦承受程度(0=完全无法忍受100=肯定可以承受)，使用技能前痛苦承受程度",
            range: [0, 100],
          },
          {
            type: "score",
            info: "痛苦承受程度(0=完全无法忍受100=肯定可以承受)，使用技能后痛苦承受程度",
            range: [0, 100],
          },
          {
            type: "text",
            info: "4. 你做了什么？（提示：请详细描述练习的具体操作，比如“用冷水轻轻拍打脸颊30秒，感受脸部的清凉感”）",
            placeholder: "请在此输入内容",
          },
          {
            type: "text",
            info: "技能I(激烈运动)：Intense Exercise\n情境:（提示：请描述练习时的人、事、时、地，比如“和好朋友闹矛盾后心情烦躁，放学后在小区操场练习”）",
            placeholder: "请在此输入内容",
          },
          {
            type: "score",
            info: "2. 情绪激发的程度(0~100)",
            range: [0, 100],
          },
          {
            type: "score",
            info: "3. 痛苦承受程度(0=完全无法忍受100=肯定可以承受)，使用技能前痛苦承受程度",
            range: [0, 100],
          },
          {
            type: "score",
            info: "痛苦承受程度(0=完全无法忍受100=肯定可以承受)，使用技能后痛苦承受程度",
            range: [0, 100],
          },
          {
            type: "text",
            info: "4. 你做了什么？（提示：请详细描述练习的具体操作，比如“快速跑步5分钟，中途冲刺3次，感受心跳加速和出汗的感觉”）",
            placeholder: "请在此输入内容",
          },
          {
            type: "text",
            info: "技能P(调节呼吸)：Paced breathing\n情境:（提示：请描述练习时的人、事、时、地，比如“晚自习写作业遇到难题，焦虑得睡不着，躺在床上练习”）",
            placeholder: "请在此输入内容",
          },
          {
            type: "score",
            info: "2. 情绪激发的程度(0~100)",
            range: [0, 100],
          },
          {
            type: "score",
            info: "3. 痛苦承受程度(0=完全无法忍受100=肯定可以承受)，使用技能前痛苦承受程度",
            range: [0, 100],
          },
          {
            type: "score",
            info: "痛苦承受程度(0=完全无法忍受100=肯定可以承受)，使用技能后痛苦承受程度",
            range: [0, 100],
          },
          {
            type: "text",
            info: "4. 你做了什么？（提示：请详细描述练习的具体操作，比如“用鼻子吸气4秒，屏住呼吸2秒，用嘴巴慢慢呼气6秒，重复10次”）",
            placeholder: "请在此输入内容",
          },
          {
            type: "text",
            info: "技能P(配对式肌肉放松)：Paired muscle relaxation\n情境:（提示：请描述练习时的人、事、时、地，比如“演讲比赛前紧张到肌肉僵硬，在后台等候时练习”）",
            placeholder: "请在此输入内容",
          },
          {
            type: "score",
            info: "2. 情绪激发的程度(0~100)",
            range: [0, 100],
          },
          {
            type: "score",
            info: "3. 痛苦承受程度(0=完全无法忍受100=肯定可以承受)，使用技能前痛苦承受程度",
            range: [0, 100],
          },
          {
            type: "score",
            info: "痛苦承受程度(0=完全无法忍受100=肯定可以承受)，使用技能后痛苦承受程度",
            range: [0, 100],
          },
          {
            type: "text",
            info: "4. 你做了什么？（提示：请详细描述练习的具体操作，比如“先绷紧双手肌肉5秒，感受紧绷感，再放松10秒；接着绷紧肩膀肌肉5秒，再放松10秒，依次放松手臂、腿部、面部肌肉”）",
            placeholder: "请在此输入内容",
          },
        ],
      },
      {
        id: 10,
        title: "痛苦忍受-全然接纳",
        category: "痛苦耐受",
        courseId: 7,
        experience: 20,
        status: "locked",
        dueDate: "2024-01-24",
        lead: "全然接纳·思考你需要全然接纳什么。",
        problems: [
          {
            type: "text",
            info: "1. 重要且需接纳的事，我需要接纳的是（提示：请具体描述第一件重要的事，比如“我数学成绩一直不好，很难快速提高”）",
            placeholder: "请在此输入内容",
          },
          {
            type: "choose",
            info: "对应接纳评分（0=完全不接纳，5=完全接纳）（单选）",
            options: ["1分", "2分", "3分", "4分", "5分"],
          },
          {
            type: "text",
            info: "2.重要且需接纳的事， 我需要接纳的是（提示：请具体描述第二件重要的事，比如“我有时候会忍不住和父母吵架，不是完美的孩子”）",
            placeholder: "请在此输入内容",
          },
          {
            type: "choose",
            info: "对应接纳评分（0=完全不接纳，5=完全接纳）（单选）",
            options: ["1分", "2分", "3分", "4分", "5分"],
          },
          {
            type: "text",
            info: "5. 不重要且需接纳的事，我需要接纳的是（提示：请具体描述第一件事，比如“我的个子比同班同学矮”）",
            placeholder: "请在此输入内容",
          },
          {
            type: "choose",
            info: "对应接纳评分（0=完全不接纳，5=完全接纳）（单选）",
            options: ["1分", "2分", "3分", "4分", "5分"],
          },
          {
            type: "text",
            info: "6.不重要且需接纳的事，我需要接纳的是（提示：请具体描述第二件事，比如“有时候会被同学起外号”）",
            placeholder: "请在此输入内容",
          },
          {
            type: "choose",
            info: "对应接纳评分（0=完全不接纳，5=完全接纳）（单选）",
            options: ["1分", "2分", "3分", "4分", "5分"],
          },
          {
            type: "text",
            info: "9. 重新检视列表：确认上述内容的真实性，是否真的需要接纳这些事情，避免评判性语言，若有必要，不加评判地描述",
            placeholder: "请在此输入内容",
          },
          {
            type: "multiple",
            info: "10. 全然接纳练习（从“重要”和“不重要”列表各挑1条练习，可多选）",
            options: [
              "能感觉我的质疑或抗拒",
              "告诫自己，现实就是如此",
              "思考现实原因，并对其不加评判，接纳其存在",
              "全身心接纳",
              "练习相反行为（比如不逃避数学作业，主动请教老师）",
              "提前应对不容易接纳的事情（比如提前做好被同学开玩笑的心理准备）",
              "思考需要接纳的事情，同时关注身体的感觉",
              "允许自己有失望、悲伤或痛苦的情绪",
              "承认即便有苦痛，生活还是有意义的（比如虽然数学不好，但我画画很厉害）",
              "分析接纳与否认、拒绝的利弊",
            ],
          },
          {
            type: "text",
            info: "11. 其他做过的练习（提示：上述选项未涵盖时补充，比如“每天睡前告诉自己‘我接纳自己的所有样子’”）",
            placeholder: "请在此输入内容",
          },
          {
            type: "choose",
            info: "12. 练习后接纳程度评分（0=完全不接纳，5=完全接纳）（单选）",
            options: ["1分", "2分", "3分", "4分", "5分"],
          },
        ],
      },
      {
        id: 11,
        title: "痛苦忍受-自我安抚",
        category: "痛苦耐受",
        courseId: 8,
        experience: 20,
        status: "locked",
        dueDate: "2024-01-25",
        lead: "自我安抚·描述让你痛苦的危机事件，并描述使用自我安抚技能的过程。",
        problems: [
          {
            type: "text",
            info: "1.危机事件（提示：简要概括危机事件，比如“期中考试排名退步20名，被父母批评”）",
            placeholder: "请在此输入内容",
          },
          {
            type: "score",
            info: "痛苦程度(0=完全无法忍受，100=完全可以承受)，练习前痛苦承受程度",
            range: [0, 100],
          },
          {
            type: "score",
            info: "痛苦程度(0=完全无法忍受，100=完全可以承受)，练习后痛苦承受程度",
            range: [0, 100],
          },
          {
            type: "text",
            info: "2. 诱发事件(人、事、时、地)，危机是如何导致的？（提示：详细描述事件背景与发展，比如“上周期中考试，我因为考前熬夜玩手机没复习好，数学和英语都考砸了，总分排名比上次退步20名，回家后被爸妈严厉批评，说我不认真学习，我心里又委屈又难过”）",
            placeholder: "请在此输入内容",
          },
          {
            type: "multiple",
            info: "3. 你尝试的技能（可多选）",
            options: ["视觉", "听觉", "嗅觉", "味觉", "触觉"],
          },
          {
            type: "text",
            info: "4. 所使用技能的详细描述（提示：描述每种技能的具体使用方式，比如“听觉：戴上耳机听了30分钟喜欢的轻音乐；味觉：吃了一包巧克力饼干，喝了一杯热奶茶；触觉：抱着家里的毛绒熊坐在沙发上”）",
            placeholder: "请在此输入内容",
          },
          {
            type: "text",
            info: "5. 使用技能的结果（提示：分享技能使用后的变化与感受，比如“听音乐和吃零食后，心里的委屈慢慢缓解了，不再一直哭，后来和爸妈好好沟通，约定以后考前不熬夜，认真复习”）",
            placeholder: "请在此输入内容",
          },
          {
            type: "choose",
            info: "6. 使用技能的有效程度（单选）",
            options: [
              "1分：我不能忍受这种情况了，一分钟都受不了",
              "2分：介于1至3之间的程度",
              "3分：多少可以适应点，练习是有用的",
              "4分：介于3至5之间的程度",
              "5分：我可以使用技能忍受，并抗拒发脾气、摔东西的冲动",
            ],
          },
        ],
      },
      {
        id: 12,
        title: "情绪-PLEASE技巧",
        category: "情绪调节",
        courseId: 9,
        experience: 20,
        status: "locked",
        dueDate: "2024-01-26",
        lead: "PLEASE技巧·我已经做到了这些健康习惯吗？",
        problems: [
          {
            type: "choose",
            info: "1. 治疗身体疾病？",
            options: ["是", "否"],
            followup: "如是，请填写具体内容",
            placeholder:
              "请在此输入内容，比如“我有过敏性鼻炎，每天按时喷鼻炎药，避免接触花粉”",
          },
          {
            type: "choose",
            info: "2. 均衡饮食？",
            options: ["是", "否"],
            followup: "如是，请填写具体内容",
            placeholder:
              "请在此输入内容，比如“每天吃早餐，不挑食，多吃蔬菜和水果，少吃油炸食品和辣条”",
          },
          {
            type: "choose",
            info: "3. 远离改变情绪的物质？",
            options: ["是", "否"],
            followup: "如是，请填写具体内容",
            placeholder:
              "请在此输入内容，比如“不喝酒精饮料，不接触烟草，拒绝同学递来的不健康零食”",
          },
          {
            type: "choose",
            info: "4. 均衡睡眠？",
            options: ["是", "否"],
            followup: "如是，请填写具体内容",
            placeholder:
              "请在此输入内容，比如“每天晚上10点睡觉，早上7点起床，保证9小时睡眠，不熬夜玩手机”",
          },
          {
            type: "choose",
            info: "5. 适当运动？",
            options: ["是", "否"],
            followup: "如是，请填写具体内容",
            placeholder:
              "请在此输入内容，比如“每周上3节体育课，放学后和同学打2次篮球，每次30分钟”",
          },
        ],
      },
      {
        id: 13,
        title: "情绪调节-相反行为",
        category: "情绪调节",
        courseId: 10,
        experience: 20,
        status: "locked",
        dueDate: "2024-01-27",
        lead: "用相反行为改变情绪，找出你想改变的情绪反应，评估是否与事实符合，若不符合，采取相反行为并描述",
        problems: [
          {
            type: "text",
            info: "1. 情绪名称（提示：例如“愤怒”“焦虑”“悲伤”“嫉妒”，请明确填写想改变的情绪）",
            placeholder: "请在此输入内容",
          },
          {
            type: "score",
            info: "2. 情绪强度(0~100)，练习前情绪强度",
            range: [0, 100],
          },
          {
            type: "score",
            info: "情绪强度(0~100)，练习后情绪强度",
            range: [0, 100],
          },
          {
            type: "text",
            info: "3. 诱发事件描述（提示：详细说明引发情绪的人、事、时、地，如“周三课间，同桌不小心把我的笔记本弄脏了，我特别愤怒”，支持多行输入）",
            placeholder: "请在此输入内容",
          },
          {
            type: "text",
            info: "4. 我的情绪合理之处（比如“笔记本是我用来记错题的，弄脏后不好用了，生气是正常的”）",
            placeholder: "请在此输入内容",
          },
          {
            type: "text",
            info: "4. 我的情绪不合理之处（比如“同桌是不小心的，我没必要发那么大的火，还说了不好听的话”）",
            placeholder: "请在此输入内容",
          },
          {
            type: "choose",
            info: "4. 我的情绪是否合理？",
            options: ["合理：解决问题", "不合理：继续完成此练习单"],
          },
          {
            type: "text",
            info: "5. 行为冲动：我想做什么或说什么？（如“想把同桌的书也弄脏，还想骂他”）",
            placeholder: "请在此输入内容",
          },
          {
            type: "text",
            info: "8. 相反行为：我的冲动的相反行为是什么？（如“不发脾气，平静地告诉同桌没关系，一起想办法清理笔记本”）",
            placeholder: "请在此输入内容",
          },
          {
            type: "text",
            info: "9. 具体行动描述：我做了什么？（详细说明实际执行的行为，比如“我深吸一口气，对同桌说‘没关系，你不是故意的’，然后我们一起用纸巾擦拭笔记本上的污渍”）",
            placeholder: "请在此输入内容",
          },
          {
            type: "text",
            info: "10. 执行细节：描述肢体语言、面部表情、姿势、手势和想法（如“我坐直身体，脸上没有皱眉，双手放在桌子上，心里告诉自己‘发脾气解决不了问题，要友善沟通’”）",
            placeholder: "请在此输入内容",
          },
          {
            type: "text",
            info: "11. 行为后果反馈：相反行为的后果（心理状态、其他情绪、行为、想法、记忆、身体状态等）（如“心理上不那么愤怒了，同桌也向我道歉，我们的关系没有变差，后来笔记本的污渍也清理干净了，我还学会了冷静处理问题”）",
            placeholder: "请在此输入内容",
          },
        ],
      },
      {
        id: 14,
        title: "情绪调节-对当下保持正念",
        category: "情绪调节",
        courseId: 11,
        experience: 20,
        status: "locked",
        dueDate: "2024-01-28",
        lead: "对当下的情绪保持正念",
        problems: [
          {
            type: "text",
            info: "1. 情绪名称（提示：例如“愤怒”“焦虑”“悲伤”“紧张”）",
            placeholder: "请在此输入内容",
          },
          {
            type: "score",
            info: "2. 情绪强度(0~100)，练习前情绪强度",
            range: [0, 100],
          },
          {
            type: "score",
            info: "情绪强度(0~100)，练习后情绪强度",
            range: [0, 100],
          },
          {
            type: "text",
            info: "3. 诱发情绪的详细情境（提示：详细描述事件背景与感受，比如“周五要进行英语演讲比赛，我从早上起床就开始紧张，担心自己忘词、发音不准，上课都无法集中注意力”）",
            placeholder: "请在此输入内容",
          },
          {
            type: "multiple",
            info: "4. 练习步骤（可多选）",
            options: [
              "让一切停顿下来，只关注能感受到的情绪",
              "感受情绪的起起落落",
              "不对情绪加以评判",
              "注意身体的哪个部位感受到情绪最强烈（比如手心出汗、心跳加速）",
              "将注意力投放在当下的身体感觉",
              "注意情绪的削弱时间",
              "提醒自己不要太苛求情绪",
              "自己不喜欢的情绪，试着练习“我愿意”技能",
              "想象情绪的来来去去",
              "察觉随着情绪而来的行为冲动（比如想逃避比赛）",
              "不要跟着情绪走",
              "告诫自己曾经的不同感受（比如“上次上台发言后，发现其实没那么可怕”）",
              "练习全然接纳自己的情绪",
              "尝试去爱自己的情绪",
            ],
          },
          {
            type: "text",
            info: "5. 对体验的感想与描述：",
            placeholder: "请在此输入内容",
          },
        ],
      },
      {
        id: 15,
        title: "人际效能-概览",
        category: "人际效能",
        courseId: 12,
        experience: 20,
        status: "locked",
        dueDate: "2024-01-29",
        lead: "追踪人际效能技能的使用，当你练习人际效能或有机会去练习时，甚至你未做任何练习，都请填写这张练习单。",
        problems: [
          {
            type: "text",
            info: "1. 情境中的“目标”：我想要达成什么结果？（示例：和同学协商换值日时间；向老师申请重新讲解没听懂的知识点；让朋友理解我的想法）",
            placeholder: "请在此输入内容",
          },
          {
            type: "text",
            info: "关系议题：我想知道别人如何看待我？（示例：希望同学觉得我靠谱、愿意合作；不想让老师觉得我偷懒、不认真；希望朋友觉得我真诚、值得信任）",
            placeholder: "请在此输入内容",
          },
          {
            type: "text",
            info: "自尊议题：我想知道我如何看待自己？（示例：希望自己做到诚实守信不敷衍；希望自己能勇敢表达想法不胆怯；希望自己能尊重他人也尊重自己）",
            placeholder: "请在此输入内容",
          },
          {
            type: "choose",
            info: "2. 在此情境下评定你的优先顺序：\n目标",
            options: ["最重要", "次重要", "最不重要"],
          },
          {
            type: "choose",
            info: "在此情境下评定你的优先顺序：\n关系",
            options: ["最重要", "次重要", "最不重要"],
          },
          {
            type: "choose",
            info: "在此情境下评定你的优先顺序：\n自尊",
            options: ["最重要", "次重要", "最不重要"],
          },
        ],
      },
      {
        id: 16,
        title: "人际效能-维持关系（GIVE）",
        category: "人际效能",
        courseId: 12,
        experience: 20,
        status: "locked",
        dueDate: "2024-01-30",
        lead: "GIVE(维持关系)·当你练习人际效能或有机会去练习时，甚至你未做任何练习，都请填写这张练习单",
        problems: [
          {
            type: "multiple",
            info: "1、请勾选在此情境下，你说了或做了什么？请勾选你使用的技能并具体描述。",
            options: [
              "保持温和",
              "不威胁",
              "不攻击",
              "不评判",
              "表现出兴趣（比如认真听同学分享趣事）",
              "认可他人（比如赞美同学的优点）",
              "态度轻松",
            ],
          },
          {
            type: "text",
            info: "2、描述：",
            placeholder:
              "请在此输入内容，比如“同学和我分享他的游戏经历，我勾选了‘表现出兴趣’和‘认可他人’，具体做了：认真听他讲，时不时点头回应，还说‘你这个操作好厉害，我都不会’",
          },
          {
            type: "text",
            info: "3、这次互动的效果如何？",
            placeholder:
              "请在此输入内容，比如“同学看到我认真听他分享，说得更开心了，我们的关系变得更亲近了，我也觉得和他聊天很愉快”",
          },
        ],
      },
      {
        id: 17,
        title: "人际效能-尊重自己（FAST）",
        category: "人际效能",
        courseId: 12,
        experience: 20,
        status: "locked",
        dueDate: "2024-01-31",
        lead: "FAST(尊重自己)，当你练习人际效能或有机会去练习时，甚至你未做任何练习，都请填写这张练习单",
        problems: [
          {
            type: "multiple",
            info: "1、请勾选在此情境下，你说了或做了什么？请勾选你使用的技能并具体描述。",
            options: [
              "公平对待（比如和同学分工合作时，不推诿责任）",
              "不过度道歉（比如不是自己的错，不随便说“对不起”）",
              "坚守价值观（比如不跟着同学作弊、欺负他人）",
              "保持真诚（比如如实告诉同学自己的想法）",
            ],
          },
          {
            type: "text",
            info: "2、描述：",
            placeholder:
              "请在此输入内容，比如“考试时同桌想抄我的答案，我勾选了‘坚守价值观’和‘保持真诚’，具体做了：轻声告诉同桌‘作弊是不对的，我不能帮你，考完后我可以给你讲这道题’",
          },
          {
            type: "text",
            info: "3、这次互动的效果如何？",
            placeholder:
              "请在此输入内容，比如“虽然同桌一开始有点不高兴，但后来也理解了我的想法，考完后我真的帮他讲解了题目，我们的关系没有受到影响，我也为自己坚守原则感到开心”",
          },
        ],
      },
      {
        id: 18,
        title: "人际效能-如你所愿（DEAR MAN）",
        category: "人际效能",
        courseId: 18,
        experience: 20,
        status: "locked",
        dueDate: "2024-02-01",
        lead: "DEAR MAN(如你所愿)·当你练习人际效能或有机会去练习时，甚至你未做任何练习，都请填写这张练习单。",
        problems: [
          {
            type: "multiple",
            info: "1、请勾选在此情境下，你说了或做了什么？请勾选你使用的技能并具体描述。",
            options: [
              "描述情境",
              "表达感受/意见",
              "明确态度",
              "强化对方",
              "保持正念",
              "“唱片跳针”",
              "忽视攻击",
              "表现自信",
              "协商妥协",
            ],
          },
          {
            type: "text",
            info: "2、描述（提示：结合勾选的技能，详细描述互动中的具体言行，比如“我想让同学把借我的漫画书还给我，勾选了‘描述情境’‘表达感受/意见’‘明确态度’和‘协商妥协’，具体做了：找到同学后，我看着他的眼睛说‘上周你借了我的《XX漫画》，我现在有点着急，因为我还想再看一遍，希望你能这周还给我；如果你还没看完，我们也可以约定周末之前还我’”）",
            placeholder: "请在此输入内容",
          },
          {
            type: "text",
            info: "3、这次互动的效果如何？（提示：分享目标达成情况、对方反应及自身满意度，比如“同学听后说他已经看完了，当天就把漫画书还给了我，我的目标达成了，而且我们沟通得很愉快，没有产生矛盾，我对这次互动很满意”）",
            placeholder: "请在此输入内容",
          },
        ],
      },
    ],
    skillCards: [
      // 1-情绪管理（3张）
      { id: 1, title: "生物社会理论1", category: "情绪管理" },
      { id: 2, title: "生物社会理论2", category: "情绪管理" },
      { id: 3, title: "生物社会技能3", category: "情绪管理" },

      // 2-正念（4张）
      { id: 4, title: "智慧心", category: "正念" },
      { id: 5, title: "WHAT技能", category: "正念" },
      { id: 6, title: "HOW技能", category: "正念" },
      { id: 7, title: "练习观察", category: "正念" },

      // 3-痛苦耐受（13张）
      { id: 8, title: "总概", category: "痛苦耐受" },
      { id: 9, title: "ACCEPT", category: "痛苦耐受" },
      { id: 10, title: "IMPROVE", category: "痛苦耐受" },
      { id: 11, title: "STOP", category: "痛苦耐受" },
      { id: 12, title: "TIP", category: "痛苦耐受" },
      { id: 13, title: "保持正念", category: "痛苦耐受" },
      { id: 14, title: "全然接纳1", category: "痛苦耐受" },
      { id: 15, title: "全然接纳2", category: "痛苦耐受" },
      { id: 16, title: "全然接纳3", category: "痛苦耐受" },
      { id: 17, title: "全然接纳4", category: "痛苦耐受" },
      { id: 18, title: "全然接纳5", category: "痛苦耐受" },
      { id: 19, title: "身体扫描", category: "痛苦耐受" },
      { id: 20, title: "自我安抚", category: "痛苦耐受" },

      // 4-情绪调节（3张）
      { id: 21, title: "PLEASE", category: "情绪调节" },
      { id: 22, title: "相反行为", category: "情绪调节" },
      { id: 23, title: "积累正面情绪", category: "情绪调节" },

      // 5-人际效能（5张）
      { id: 24, title: "总概", category: "人际效能" },
      { id: 25, title: "FAST", category: "人际效能" },
      { id: 26, title: "GIVE", category: "人际效能" },
      { id: 27, title: "DEARMAN1", category: "人际效能" },
      { id: 28, title: "DEARMAN2", category: "人际效能" },
    ],
  },

  onLaunch(options) {
    wx.cloud.init({
      env: "cloud1-6gnh2toe07d2c577", // 替换为你的环境ID
    });

    // 检查跳链参数中是否包含 debug=true
    if (options && (options.debug === 'true'|| options.query.debug)) {
      this.globalData.debugMode = true;
    }

    // 检查是否首次使用
    // 先从本地缓存检查
    const localIsFirstTime = wx.getStorageSync("isFirstTime");
    console.log('yjc=>localIsFirstTime', localIsFirstTime);
    
    if (localIsFirstTime === "") {
      // 本地缓存中没有标记，需要从云数据库检查
      this.checkFirstTimeFromCloud();
    } else {
      // 本地缓存中有标记
      this.globalData.isFirstTime = false;
      // 加载用户数据（包括从云数据库拉取）
      this.loadUserData();
    }
  },

  /**
   * 从云数据库检查是否首次使用
   * 根据 openId 判断用户是否已在云数据库中注册
   * @returns {Promise} 返回检查结果
   */
  checkFirstTimeFromCloud() {
    return new Promise((resolve, reject) => {
      try {
        const dbManager = require('./utils/db-manager');
        
        dbManager.checkIsFirstTime().then(result => {
          if (result.isFirstTime) {
            // 首次使用
            console.log('首次使用，需要进行注册流程');
            this.globalData.isFirstTime = true;
            this.globalData.hasSeenGuide = false;
            this.globalData.noMoreGuide = false;
            // 标记本地缓存，下次启动时直接使用本地标记
            wx.setStorageSync("isFirstTime", true);
            resolve({ isFirstTime: true });
          } else {
            // 用户已注册，不是首次使用
            console.log('用户已注册，从云数据库恢复数据');
            this.globalData.isFirstTime = false;
            
            // 保存 cloudUserId 到本地
            wx.setStorageSync('cloudUserId', result.user._id);
            
            // 标记本地缓存
            wx.setStorageSync("isFirstTime", false);
            
            // 加载用户数据
            this.loadUserData();
            resolve({ isFirstTime: false });
          }
        }).catch(error => {
          console.error('检查首次使用状态失败:', error);
          // 出错时，假设是首次使用，让用户进行注册流程
          this.globalData.isFirstTime = true;
          this.globalData.hasSeenGuide = false;
          this.globalData.noMoreGuide = false;
          wx.setStorageSync("isFirstTime", true);
          reject(error);
        });
      } catch (e) {
        console.error('检查首次使用失败', e);
        // 出错时，假设是首次使用
        this.globalData.isFirstTime = true;
        this.globalData.hasSeenGuide = false;
        this.globalData.noMoreGuide = false;
        wx.setStorageSync("isFirstTime", true);
        reject(e);
      }
    });
  },

  loadUserData() {
    try {
      const dbManager = require('./utils/db-manager');
      const cloudUserId = wx.getStorageSync("cloudUserId");
      
      // 先从本地加载数据
      const userInfo = wx.getStorageSync("userInfo");
      const learningProgress = wx.getStorageSync("learningProgress");
      const hasSeenGuide = wx.getStorageSync("hasSeenGuide");
      const noMoreGuide = wx.getStorageSync("noMoreGuide");

      if (userInfo) {
        this.globalData.userInfo = userInfo;
      }
      if (learningProgress) {
        this.globalData.learningProgress = learningProgress;
      }
      if (hasSeenGuide) {
        this.globalData.hasSeenGuide = hasSeenGuide;
      }
      if (noMoreGuide) {
        this.globalData.noMoreGuide = noMoreGuide;
      }

      console.log('yjc=>loadUserData', );
      // 如果有cloudUserId，则从云数据库拉取最新数据
      if (cloudUserId) {
        dbManager.pullUserDataFromCloud(cloudUserId).then(cloudData => {
          // 更新全局数据为云端数据
          if (cloudData.userInfo) {
            this.globalData.userInfo = cloudData.userInfo;
          }
          if (cloudData.learningProgress) {
            this.globalData.learningProgress = cloudData.learningProgress;
          }
          // 保存到本地
          this.saveUserData();
          console.log('云数据库数据拉取成功');
        }).catch(error => {
          console.error('从云数据库拉取数据失败，使用本地数据:', error);
        });
      } else if (!userInfo) {
        // 如果没有本地缓存且没有cloudUserId，则检查用户是否在云数据库中已注册
        // 这种情况通常发生在用户清除本地存储或首次登录时
        dbManager.checkUserRegistration().then(registeredUser => {
          if (registeredUser) {
            // 用户已在云数据库中注册，拉取云端数据
            console.log('用户已注册，从云数据库拉取数据');
            
            // 保存cloudUserId到本地
            wx.setStorageSync('cloudUserId', registeredUser._id);
            
            // 更新全局数据
            this.globalData.userInfo = {
              name: registeredUser.name,
              gender: registeredUser.gender,
              birthDate: registeredUser.birthDate,
              phone: registeredUser.phone,
              wechat: registeredUser.wechat
            };
            
            this.globalData.learningProgress = registeredUser.learningProgress || {
              currentWeek: 1,
              currentDay: 1,
              completedCourses: [],
              completedAssignments: [],
              totalExperience: 0,
              happinessScore: 0
            };
            
            // 保存到本地
            this.saveUserData();
            console.log('用户数据从云数据库恢复成功');
          } else {
            // 用户未注册，这是首次使用
            console.log('用户未注册，需要进行注册流程');
            this.globalData.isFirstTime = true;
          }
        }).catch(error => {
          console.error('检查用户注册状态失败:', error);
          // 检查失败时，保持现有状态
        });
      }
    } catch (e) {
      console.error("加载用户数据失败", e);
    }
  },

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
  },

  // 解锁下一个课程
  unlockNextCourse() {
    const courses = this.globalData.courses;
    const completedCount =
      this.globalData.learningProgress.completedCourses.length;

    if (completedCount < courses.length) {
      courses[completedCount].status = "available";
    }
  },

  // 完成课程
  completeCourse(courseId) {
    console.log("yjc=>courseId", courseId);
    const progress = this.globalData.learningProgress;
    if (!progress.completedCourses.includes(courseId)) {
      progress.completedCourses.push(courseId);
      progress.totalExperience += 30;
    }
    // 解锁对应作业
    this.unlockAssignmentsByCourse(courseId);
    // 解锁下一个课程
    this.unlockNextCourse();
    this.saveUserData();
  },

  // 根据课程解锁作业
  unlockAssignmentsByCourse(courseId) {
    const assignments = this.globalData.assignments;
    assignments.forEach((assignment) => {
      console.log("yjc=>assignment", assignment);
      if (assignment.courseId === courseId) {
        assignment.status = "available";
      }
    });
    console.log("yjc=>assignments", assignments);
  },

  finishWork(workId, earnedPoints) {
    console.log("yjc=>workId", workId, "earnedPoints", earnedPoints);
    const assignments = this.globalData.assignments;
    const learningProgress = this.globalData.learningProgress;
    assignments.forEach((assignment) => {
      if (assignment.id == workId) {
        assignment.status = "completed";
        if (!learningProgress.completedAssignments.includes(assignment.id)) {
          learningProgress.completedAssignments.push(assignment.id);
          // 使用传入的earnedPoints，如果没有则使用assignment.experience，最后才用默认值30
          const points = earnedPoints || assignment.experience || 30;
          learningProgress.totalExperience += points;
          this.saveUserData();
        }
      }
    });
  },
});
