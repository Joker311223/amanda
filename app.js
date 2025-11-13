App({
  globalData: {
    userInfo: null,
    isFirstTime: true,
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
        "id": 1,
        "title": "正念-概览",
        "category": "正念",
        "courseId": 1,
        "experience": 20,
        "status": "locked",
        "dueDate": "2024-01-15",
        "lead": "正念核心技能的练习·描述在什么情况下您决定练习正念技能。",
        "problems": [
            {
                "type": "text",
                "info": "1. 情境(人、事、时、地)：",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "multiple",
                "info": "2. 您所使用的技能（可多选）：",
                "options": [
                    "智慧心念",
                    "观察",
                    "描述",
                    "参与",
                    "不评判",
                    "专一地做",
                    "有效地做"
                ]
            },
            {
                "type": "text",
                "info": "3. 您使用的过程：",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "text",
                "info": "4. 使用技能的经验：",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "multiple",
                "info": "5. 练习这种正念技能是否影响以下方面（可多选）：",
                "options": [
                    "减少痛苦",
                    "减少反应",
                    "增加联结感",
                    "增加快乐",
                    "增加智慧",
                    "提升个人认可",
                    "提升专注力",
                    "提升体验当下的能力"
                ]
            }
        ]
    },
    {
        "id": 2,
        "title": "正念-智慧心",
        "category": "正念",
        "courseId": 1,
        "experience": 20,
        "status": "locked",
        "dueDate": "2024-01-16",
        "lead": "练习智慧心念",
        "problems": [
            {
                "type": "multiple",
                "info": "1. 智慧心念的练习（每次做完勾选，可多选）：",
                "options": [
                    "专注于自己的呼吸，将注意力放在身体中央",
                    "将自己想象成湖中的石头",
                    "想象自己跟随内在的回旋梯往下走",
                    "吸气与呼气会有暂停，将自己置于其中",
                    "吸进“智慧”，吐出“心念”",
                    "吸气时问智慧心念一个问题，呼气时仔细倾听其回答",
                    "自问“这是智慧心念吗?”"
                ]
            },
            {
                "type": "text",
                "info": "2. 练习智慧心念的情境及练习过程：",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "choose",
                "info": "3. 这个练习协助您进入智慧心念的有效程度（1-5分）：",
                "options": [
                    "1分：没有效果，我一分钟都坚持不下去，分心或放弃了",
                    "2分：介于1至3之间的程度",
                    "3分：有一点效果，我能够练习智慧心念，并且有点进入状态",
                    "4分：介于3至5之间的程度",
                    "5分：很有效，我进入智慧心念的中心，可以自如地做需要做的事"
                ]
            },
            {
                "type": "text",
                "info": "4. 本周全部符合智慧心念的事：",
                "placeholder": "请在此输入内容"
            }
        ]
    },
    {
        "id": 3,
        "title": "正念-是什么1",
        "category": "正念",
        "courseId": 2,
        "experience": 20,
        "status": "locked",
        "dueDate": "2024-01-17",
        "lead": "“是什么”技能--观察、描述、参与",
        "problems": [
            {
                "type": "multiple",
                "info": "1. 本周的练习（可多选）：",
                "options": [
                    "观察",
                    "描述",
                    "参与"
                ]
            },
            {
                "type": "text",
                "info": "2. 练习的情境及练习方法：",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "multiple",
                "info": "3. 练习这种正念技能是否影响以下方面（可多选）：",
                "options": [
                    "减少痛苦",
                    "减少反应",
                    "增加联结感",
                    "增加快乐",
                    "增加智慧",
                    "提升个人认可",
                    "提升专注力",
                    "提升体验当下的能力"
                ]
            },
            {
                "type": "text",
                "info": "4. 这个技能是否让您变得头脑更清晰：",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "text",
                "info": "5. 本周全部符合智慧心念的事：",
                "placeholder": "请在此输入内容"
            }
        ]
    },
    {
        "id": 4,
        "title": "正念-是什么2",
        "category": "正念",
        "courseId": 2,
        "experience": 20,
        "status": "locked",
        "dueDate": "2024-01-18",
        "lead": "观察、描述、参与的清单·记录您练习的技能",
        "problems": [
            {
                "type": "multiple",
                "info": "1. 练习观察（每次做完勾选，可多选）：",
                "options": [
                    "您所看到的：用视觉观察，但不总盯着眼前的一切（比如教室的光线、同学的表情）",
                    "声音：周遭的声音（比如下课铃声、同学的笑声），某人的声音和语调、音乐",
                    "周围的气味：食物的味道（比如食堂的饭菜香），香皂，走路时周遭的空气",
                    "食物的味道和吃的动作（比如吃饭时感受饭菜的口感）",
                    "想做某事的冲动：趁着冲动冲浪，注意想逃避作业时的冲动，注意冲动停留在身体的哪个部位",
                    "身体感受：身体扫描，走路的感觉，身体碰触某物（比如握笔的触感）",
                    "心里来来去去的想法：想象心如河流，想象心如传送带",
                    "呼吸：注意胃部的活动，气息从鼻孔进出的感觉",
                    "通过扩展察觉：对整个身体，对周遭的空间，拥抱一棵树",
                    "打开您的心：注意产生的每种感觉，不执着，让它们流走"
                ]
            },
            {
                "type": "multiple",
                "info": "2. 练习描述（每次做完勾选，可多选）：",
                "options": [
                    "身体之外，眼之所及（比如“天空是蓝色的，云朵是柔软的”）",
                    "心中的想法、感受和身体感觉（比如“我现在有点紧张，手心出汗”）",
                    "您的呼吸（比如“吸气时肚子鼓起，呼气时肚子收缩”）",
                    "随着音乐起舞",
                    "跟随音乐唱歌",
                    "洗澡时唱歌",
                    "边看电视边载歌载舞",
                    "起床时，还未洗漱就唱歌或跳舞",
                    "去有唱诗班的教堂，加入歌唱",
                    "和朋友唱卡拉OK，或在卡拉OK店唱歌",
                    "将注意力全部集中在他人分享的内容中（比如听同学讲趣事、听老师讲课）",
                    "专注于正在做的事情，包括跑步、骑车、溜冰、走路",
                    "做一项运动（比如篮球、跳绳），并投入其中",
                    "把自己变成呼吸的计数器，数“1”时变成“2”、数“2”时变成“2”，以此类推",
                    "反复以慢速说出某个字（比如“静”），将自己变成那个字",
                    "投入班级活动、社团活动或学习，忘记其他"
                ]
            },
            {
                "type": "text",
                "info": "3. 本周全部符合智慧心念的事：",
                "placeholder": "请在此输入内容"
            }
        ]
    },
    {
        "id": 5,
        "title": "正念-怎样做1",
        "category": "正念",
        "courseId": 3,
        "experience": 20,
        "status": "locked",
        "dueDate": "2024-01-19",
        "lead": "“怎样做”技能--不评判、专一地做、有效地做",
        "problems": [
            {
                "type": "choose",
                "info": "1. 本周您做的练习（可多选）：",
                "options": [
                    "不评判",
                    "专一地做",
                    "有效地做"
                ]
            },
            {
                "type": "text",
                "info": "2. 练习“不评判”的情景及方法：",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "multiple",
                "info": "3. 练习“不评判”是否影响以下方面（可多选）：",
                "options": [
                    "减少痛苦",
                    "减少反应",
                    "增加联结感",
                    "增加快乐",
                    "增加智慧",
                    "提升个人认可",
                    "提升专注力",
                    "提升体验当下的能力"
                ]
            },
            {
                "type": "text",
                "info": "4. “不评判”技能是否让您的头脑变得更清晰：",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "text",
                "info": "5. 练习“专一地做”的情景及方法：",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "text",
                "info": "6. “专一地做”技能是否让您的头脑变得更清晰：",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "text",
                "info": "7. 练习“有效地做”的情景及方法：",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "text",
                "info": "8. 本周全部符合智慧心念的事：",
                "placeholder": "请在此输入内容"
            }
        ]
    },
    {
        "id": 6,
        "title": "正念-怎样做2",
        "category": "正念",
        "courseId": 3,
        "experience": 20,
        "status": "locked",
        "dueDate": "2024-01-20",
        "lead": "不评判、专一地做、有效地做的清单",
        "problems": [
            {
                "type": "multiple",
                "info": "1. 练习不评判（每次做完勾选，可多选）：",
                "options": [
                    "默默告诉自己，“我心里出现了一个评判的想法”（比如“他做得真差”）",
                    "计算自己想评判的次数",
                    "以不评判的想法和陈述替代评判的想法和陈述",
                    "注意当您心中涌出想评判时的表情、姿势及语调",
                    "改变您想评判时的表情、姿势及语调",
                    "非常具体、不带评判地描述您的一天",
                    "不带评判地描述一个诱发情绪的事件",
                    "不加评判地、详细地描述日常生活中特别重要的时刻",
                    "想象让您生气的那个人，试着去了解他",
                    "当你感受到批评时，练习浅笑或愿意的手势"
                ]
            },
            {
                "type": "text",
                "info": "2. 练习不评判的情景及方法：",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "multiple",
                "info": "3. 练习专一地做（每次做完勾选，可多选）：",
                "options": [
                    "泡茶或喝咖啡时保持觉察",
                    "洗碗时保持觉察",
                    "手洗衣物（比如袜子、围巾）时保持觉察",
                    "打扫房间时保持觉察",
                    "慢条斯理地洗澡时保持觉察",
                    "冥想时保持觉察"
                ]
            },
            {
                "type": "text",
                "info": "4. 练习专一地做的情景及方法：",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "multiple",
                "info": "4. 练习有效地做（每次做完勾选，可多选）：",
                "options": [
                    "抛弃一定要做正确的事情的想法",
                    "放下执念",
                    "做真正有效的事"
                ]
            },
            {
                "type": "text",
                "info": "5. 练习有效地做的情景及方法：",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "text",
                "info": "6. 本周全部符合智慧心念的事：",
                "placeholder": "请在此输入内容"
            }
        ]
    },
    {
        "id": 7,
        "title": "痛苦忍受-Accept",
        "category": "痛苦耐受",
        "courseId": 4,
        "experience": 20,
        "status": "locked",
        "dueDate": "2024-01-21",
        "lead": "转移注意力(ACCEPTS技能)·请描述一个危机事件:并描述使用ACCEPTS技能的过程。",
        "problems": [
            {
                "type": "score",
                "info": "1. 危机事件痛苦程度（0-100分）：",
                "range": [
                    0,
                    100
                ]
            },
            {
                "type": "text",
                "info": "2. 诱发事件(人、事、时、地)：危机状态是如何导致的？",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "multiple",
                "info": "3. 您尝试使用的技能（可多选）：",
                "options": [
                    "进行活动(Activities)（比如听音乐、画画、打球）",
                    "贡献(Contributions)（比如帮同学讲题、做班级卫生）",
                    "比较(Comparisons)（比如想想比自己更不容易的人）",
                    "情绪(Emotions)（比如听欢快的歌让自己开心）",
                    "推开(Pushing away)（比如暂时不想这件烦心事）",
                    "想法(Thoughts)（比如告诉自己“别人的嘲笑不重要，做好自己就好”）",
                    "感觉(Sensations)（比如吃喜欢的零食、抱毛绒玩具）"
                ]
            },
            {
                "type": "text",
                "info": "4. 所使用技能的详细描述：",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "text",
                "info": "5. 使用技能的结果：",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "choose",
                "info": "6. 使用技能的有效程度（1-5分）：",
                "options": [
                    "1分：我不能忍受这种情况了，一分钟都无法忍受",
                    "2分：介于1至3之间",
                    "3分：多少可以应对当下情况，练习是有用的",
                    "4分：介于3至5之间",
                    "5分：我可以使用技能忍受，痛苦并抗拒行为冲动"
                ]
            }
        ]
    },
    {
        "id": 8,
        "title": "痛苦忍受-IMPROVE",
        "category": "痛苦耐受",
        "courseId": 5,
        "experience": 20,
        "status": "locked",
        "dueDate": "2024-01-22",
        "lead": "改善当下·请列出危机事件，(IMPROVE)技能的过程。",
        "problems": [
            {
                "type": "multiple",
                "info": "请勾选您尝试的技能",
                "options": [
                    "想象(Imagery)（比如想象自己在喜欢的海边、草原）",
                    "意义(Meaning)（比如想想这件事能让自己成长）",
                    "祷告(Prayer)",
                    "放松活动(Relaxation)（比如深呼吸、拉伸、听舒缓的音乐）",
                    "一次做一件事(One thing)（比如先做好眼前的作业，不被痛苦情绪影响）",
                    "假期(Vacation)（比如周末和家人去公园、郊外散心）",
                    "鼓励(Encouragement)（比如自己鼓励自己“我能挺过去”）"
                ]
            },
            {
                "type": "text",
                "info": "请具体描述您尝试的技能：",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "text",
                "info": "请描述使用技能的结果：",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "choose",
                "info": "请选择数字(1~5)代表使用技能的有效程度。",
                "options": [
                    "1:无法忍受",
                    "2:介于1-3",
                    "3:多少有用",
                    "4:介于3-5",
                    "5:完全忍受"
                ]
            }
        ]
    },
    {
        "id": 9,
        "title": "痛苦忍受-TIP",
        "category": "痛苦耐受",
        "courseId": 6,
        "experience": 20,
        "status": "locked",
        "dueDate": "2024-01-23",
        "lead": "使用TIP技能改变身体化学状况·描述练习的每种情景,记录使用TIP技能前后情绪激发的程度及痛苦承受遮程度。描述您实际的过程。",
        "problems": [
            {
                "type": "text",
                "info": "技能T(改变温度)：用冷水改变脸部的温度(Temperature)\n情境:",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "score",
                "info": "2. 情绪激发的程度(0=完全无法忍受，100=肯定可以承受)：",
                "range": [
                    0,
                    100
                ]
            },
            {
                "type": "score",
                "info": "3. 痛苦承受程度(0=完全无法忍受100=肯定可以承受)\n使用技能前痛苦承受程度：",
                "range": [
                    0,
                    100
                ]
            },
            {
                "type": "score",
                "info": "使用技能后痛苦承受程度：",
                "range": [
                    0,
                    100
                ]
            },
            {
                "type": "text",
                "info": "4. 您做了什么？",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "text",
                "info": "技能I(激烈运动)：Intense Exercise\n情境:",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "score",
                "info": "2. 情绪激发的程度(0=完全无法忍受，100=肯定可以承受)：",
                "range": [
                    0,
                    100
                ]
            },
            {
                "type": "score",
                "info": "3. 痛苦承受程度(0=完全无法忍受100=肯定可以承受)\n使用技能前痛苦承受程度：",
                "range": [
                    0,
                    100
                ]
            },
            {
                "type": "score",
                "info": "使用技能后痛苦承受程度：",
                "range": [
                    0,
                    100
                ]
            },
            {
                "type": "text",
                "info": "4. 您做了什么？",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "text",
                "info": "技能P(调节呼吸)：Paced breathing\n情境:",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "score",
                "info": "2. 情绪激发的程度(0=完全无法忍受，100=肯定可以承受)：",
                "range": [
                    0,
                    100
                ]
            },
            {
                "type": "score",
                "info": "3. 痛苦承受程度(0=完全无法忍受100=肯定可以承受)\n使用技能前痛苦承受程度：",
                "range": [
                    0,
                    100
                ]
            },
            {
                "type": "score",
                "info": "使用技能后痛苦承受程度：",
                "range": [
                    0,
                    100
                ]
            },
            {
                "type": "text",
                "info": "4. 您做了什么？",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "text",
                "info": "技能P(配对式肌肉放松)：Paired muscle relaxation\n情境:",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "score",
                "info": "2. 情绪激发的程度(0=完全无法忍受，100=肯定可以承受)：",
                "range": [
                    0,
                    100
                ]
            },
            {
                "type": "score",
                "info": "3. 痛苦承受程度(0=完全无法忍受100=肯定可以承受)\n使用技能前痛苦承受程度：",
                "range": [
                    0,
                    100
                ]
            },
            {
                "type": "score",
                "info": "使用技能后痛苦承受程度：",
                "range": [
                    0,
                    100
                ]
            },
            {
                "type": "text",
                "info": "4. 您做了什么？",
                "placeholder": "请在此输入内容"
            }
        ]
    },
    {
        "id": 10,
        "title": "痛苦忍受-全然接纳",
        "category": "痛苦耐受",
        "courseId": 7,
        "experience": 20,
        "status": "locked",
        "dueDate": "2024-01-24",
        "lead": "全然接纳·思考您需要全然接纳什么",
        "problems": [
            {
                "type": "text",
                "info": "1. 生活中需要全然接纳的非常重要的两件事（0=完全不接纳，5=完全接纳）\n1.1 我需要接纳的是：",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "score",
                "info": "接纳的评分(0~5)：",
                "range": [
                    0,
                    5
                ]
            },
            {
                "type": "text",
                "info": "1.2 我需要接纳的是：",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "score",
                "info": "接纳的评分(0~5)：",
                "range": [
                    0,
                    5
                ]
            },
            {
                "type": "text",
                "info": "2. 不是很重要但也不容易接纳的两件事（0=完全不接纳，5=完全接纳）\n2.1 我需要接纳的是：",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "score",
                "info": "接纳的评分(0~5)：",
                "range": [
                    0,
                    5
                ]
            },
            {
                "type": "text",
                "info": "2.2 我需要接纳的是：",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "score",
                "info": "接纳的评分(0~5)：",
                "range": [
                    0,
                    5
                ]
            },
            {
                "type": "text",
                "info": "3. 重新检视列表：确认上述内容的真实性，是否真的需要接纳这些事情，避免评判性语言，若有必要，不加评判地描述：",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "multiple",
                "info": "4. 全然接纳练习（从“重要”和“不重要”列表各挑1条练习，勾选做过的练习，可多选）：",
                "options": [
                    "能感觉我的质疑或抗拒",
                    "告诫自己，现实就是如此",
                    "思考现实原因，并对其不加评判，接纳其存在",
                    "全身心接纳",
                    "练习相反行为",
                    "提前应对不容易接纳的事情",
                    "思考需要接纳的事情，同时关注身体的感觉",
                    "允许自己有失望、悲伤或痛苦的情绪",
                    "承认即便有苦痛，生活还是有意义的",
                    "分析接纳与否认、拒绝的利弊"
                ]
            },
            {
                "type": "text",
                "info": "5. 其他做过的练习：",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "score",
                "info": "6. 练习后接纳程度评分(0~5)：",
                "range": [
                    0,
                    5
                ]
            }
        ]
    },
    {
        "id": 11,
        "title": "痛苦忍受-自我安抚",
        "category": "痛苦耐受",
        "courseId": 8,
        "experience": 20,
        "status": "locked",
        "dueDate": "2024-01-25",
        "lead": "自我安抚·描述危机事件，并描述使用自我安抚技能的过程。",
        "problems": [
            {
                "type": "text",
                "info": "1.危机事件1：",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "score",
                "info": "痛苦程度(0=完全无法忍受，100=完全可以承受)\n练习前痛苦承受程度：",
                "range": [
                    0,
                    100
                ]
            },
            {
                "type": "score",
                "info": "练习后痛苦承受程度：",
                "range": [
                    0,
                    100
                ]
            },
            {
                "type": "text",
                "info": "2. 诱发事件(人、事、时、地)，危机是如何导致的？",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "multiple",
                "info": "3. 您尝试的技能（可多选）：",
                "options": [
                    "视觉",
                    "听觉",
                    "嗅觉",
                    "味觉",
                    "触觉"
                ]
            },
            {
                "type": "text",
                "info": "4. 所使用技能的详细描述：",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "text",
                "info": "5. 使用技能的结果：",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "choose",
                "info": "6. 使用技能的有效程度（1-5分）：",
                "options": [
                    "1分：我不能忍受这种情况了，一分钟都受不了",
                    "2分：介于1至3之间的程度",
                    "3分：多少可以适应点，练习是有用的",
                    "4分：介于3至5之间的程度",
                    "5分：我可以使用技能忍受，并抗拒发脾气、摔东西的冲动"
                ]
            }
        ]
    },
    {
        "id": 12,
        "title": "情绪-PLEASE技巧",
        "category": "情绪调节",
        "courseId": 9,
        "experience": 20,
        "status": "locked",
        "dueDate": "2024-01-26",
        "lead": "PLEASE技巧·我已经",
        "problems": [
            {
                "type": "choose",
                "info": "1. 治疗身体疾病？",
                "options": [
                    "是",
                    "否"
                ],
                "followup": "如是，请填写具体内容",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "choose",
                "info": "2. 均衡饮食？",
                "options": [
                    "是",
                    "否"
                ],
                "followup": "如是，请填写具体内容",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "choose",
                "info": "3. 远离改变情绪的物质？",
                "options": [
                    "是",
                    "否"
                ],
                "followup": "如是，请填写具体内容",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "choose",
                "info": "4. 均衡睡眠？",
                "options": [
                    "是",
                    "否"
                ],
                "followup": "如是，请填写具体内容",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "choose",
                "info": "5. 适当运动？",
                "options": [
                    "是",
                    "否"
                ],
                "followup": "如是，请填写具体内容",
                "placeholder": "请在此输入内容"
            }
        ]
    },
    {
        "id": 13,
        "title": "情绪调节-相反行为",
        "category": "情绪调节",
        "courseId": 10,
        "experience": 20,
        "status": "locked",
        "dueDate": "2024-01-27",
        "lead": "用相反行为改变情绪，找出您想改变的情绪反应，评估是否与事实符合，若不符合，采取相反行为并描述",
        "problems": [
            {
                "type": "text",
                "info": "1. 情绪名称：",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "score",
                "info": "2. 情绪强度(0~100)\n练习前：",
                "range": [
                    0,
                    100
                ]
            },
            {
                "type": "score",
                "info": "练习后：",
                "range": [
                    0,
                    100
                ]
            },
            {
                "type": "text",
                "info": "3. 诱发事件(人、事、时、地)：是什么引发了情绪？",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "text",
                "info": "4. 情绪合理性分析\n- 我的情绪合理之处：",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "text",
                "info": "4. 情绪不合理之处：",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "choose",
                "info": "4. 我的情绪是否合理？",
                "options": [
                    "合理:解决问题",
                    "不合理:继续完成此练习单"
                ]
            },
            {
                "type": "text",
                "info": "5. 行为冲动与相反行为（情绪不合理时填写）\n4.1 行为冲动：我想做什么或说什么？",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "text",
                "info": "4.2 相反行为：我的冲动的相反行为是什么？",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "text",
                "info": "4.3 我做了什么？具体描述：",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "text",
                "info": "4.4 我如何做：描述肢体语言、面部表情、姿势、手势和想法：",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "text",
                "info": "4.5 相反行为的后果（心理状态、其他情绪、行为、想法、记忆、身体状态等）：",
                "placeholder": "请在此输入内容"
            }
        ]
    },
    {
        "id": 14,
        "title": "情绪调节-对当下保持正念",
        "category": "情绪调节",
        "courseId": 11,
        "experience": 20,
        "status": "locked",
        "dueDate": "2024-01-28",
        "lead": "对当下的情绪保持正念",
        "problems": [
            {
                "type": "text",
                "info": "1. 情绪名称：",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "score",
                "info": "2. 情绪强度(0~100)\n练习前：",
                "range": [
                    0,
                    100
                ]
            },
            {
                "type": "score",
                "info": "练习后：",
                "range": [
                    0,
                    100
                ]
            },
            {
                "type": "text",
                "info": "3. 诱发情绪的详细情境：",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "multiple",
                "info": "4. 练习步骤（可多选）：",
                "options": [
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
                    "尝试去爱自己的情绪"
                ]
            },
            {
                "type": "text",
                "info": "5. 对体验的感想与描述：",
                "placeholder": "请在此输入内容"
            }
        ]
    },
    {
        "id": 15,
        "title": "人际-概览问卷",
        "category": "人际效能",
        "courseId": 12,
        "experience": 20,
        "status": "locked",
        "dueDate": "2024-01-29",
        "lead": "追踪人际效能技能的使用，当你练习人际效能或有机会去练习时，甚至你未做任何练习，都请填写这张练习单。",
        "problems": [
            {
                "type": "text",
                "info": "1. 问题的诱发事件：谁对谁做了什么事？是什么事导致下一件事？\n情境中的“目标”(我想要达成什么结果)：",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "text",
                "info": "关系议题：我想知道别人如何看待我？",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "text",
                "info": "自尊议题：我想知道我如何看待自己？",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "score",
                "info": "2. 在此情境下评定您的优先顺序：1(最重要)，2(次重要)，3(最不重要）\n目标：",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "score",
                "info": "关系：",
                "range": [
                    1,
                    3
                ]
            },
            {
                "type": "score",
                "info": "自尊：",
                "range": [
                    1,
                    3
                ]
            }
        ]
    },
    {
        "id": 16,
        "title": "人际-维持关系（GIVE）",
        "category": "人际效能",
        "courseId": 12,
        "experience": 20,
        "status": "locked",
        "dueDate": "2024-01-30",
        "lead": "GIVE(维持关系)·当你练习人际效能或有机会去练习时，甚至你未做任何练习，都请填写这张练习单",
        "problems": [
            {
                "type": "multiple",
                "info": "1、请勾选在此情境下，你说了或做了什么？请勾选你使用的技能并具体描述。",
                "options": [
                    "保持温和",
                    "不威胁",
                    "不攻击",
                    "不评判",
                    "表现出兴趣（比如认真听同学分享趣事）",
                    "认可他人（比如赞美同学的优点）",
                    "态度轻松"
                ]
            },
            {
                "type": "text",
                "info": "2、描述：",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "text",
                "info": "3、这次互动的效果如何？",
                "placeholder": "请在此输入内容"
            }
        ]
    },
    {
        "id": 17,
        "title": "人际-尊重自己（FAST）",
        "category": "人际效能",
        "courseId": 12,
        "experience": 20,
        "status": "locked",
        "dueDate": "2024-01-31",
        "lead": "FAST(尊重自己)，当你练习人际效能或有机会去练习时，甚至你未做任何练习，都请填写这张练习单",
        "problems": [
            {
                "type": "multiple",
                "info": "1、请勾选在此情境下，你说了或做了什么？请勾选你使用的技能并具体描述。",
                "options": [
                    "公平对待（比如和同学分工合作时，不推诿责任）",
                    "不过度道歉（比如不是自己的错，不随便说“对不起”）",
                    "坚守价值观（比如不跟着同学作弊、欺负他人）",
                    "保持真诚（比如如实告诉同学自己的想法）"
                ]
            },
            {
                "type": "text",
                "info": "2、描述：",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "text",
                "info": "3、这次互动的效果如何？",
                "placeholder": "请在此输入内容"
            }
        ]
    },
    {
        "id": 18,
        "title": "人际-如你所愿（DEAR MAN）",
        "category": "人际效能",
        "courseId": 12,
        "experience": 20,
        "status": "locked",
        "dueDate": "2024-02-01",
        "lead": "DEAR MAN(如你所愿)·当你练习人际效能或有机会去练习时，甚至你未做任何练习，都请填写这张练习单。",
        "problems": [
            {
                "type": "multiple",
                "info": "1、请勾选在此情境下，你说了或做了什么？请勾选你使用的技能并具体描述。",
                "options": [
                    "描述情境",
                    "表达感受/意见",
                    "明确态度",
                    "强化对方",
                    "保持正念",
                    "“唱片跳针”",
                    "忽视攻击",
                    "表现自信",
                    "协商妥协"
                ]
            },
            {
                "type": "text",
                "info": "2、描述：",
                "placeholder": "请在此输入内容"
            },
            {
                "type": "text",
                "info": "3、这次互动的效果如何？",
                "placeholder": "请在此输入内容"
            }
        ]
    }
  ],
    skillCards: [
      // 人际效能（5张）
      { id: 1, title: "DEARMAN1", category: "人际效能" },
      { id: 2, title: "DEARMAN2", category: "人际效能" },
      { id: 3, title: "FAST", category: "人际效能" },
      { id: 4, title: "GIVE", category: "人际效能" },
      { id: 5, title: "总概", category: "人际效能" },

      // 情绪管理（3张）
      { id: 6, title: "生物社会技能3", category: "情绪管理" },
      { id: 7, title: "生物社会理论1", category: "情绪管理" },
      { id: 8, title: "生物社会理论2", category: "情绪管理" },

      // 情绪调节（3张）
      { id: 9, title: "PLEASE", category: "情绪调节" },
      { id: 10, title: "相反行为", category: "情绪调节" },
      { id: 11, title: "积累正面情绪", category: "情绪调节" },

      // 正念（4张）
      { id: 12, title: "HOW技能", category: "正念" },
      { id: 13, title: "WHAT技能", category: "正念" },
      { id: 14, title: "智慧心", category: "正念" },
      { id: 15, title: "练习观察", category: "正念" },

      // 痛苦耐受（13张）
      { id: 16, title: "IMPROVE", category: "痛苦耐受" },
      { id: 17, title: "STOP", category: "痛苦耐受" },
      { id: 18, title: "TIP", category: "痛苦耐受" },
      { id: 19, title: "保持正念", category: "痛苦耐受" },
      { id: 20, title: "全然接纳1", category: "痛苦耐受" },
      { id: 21, title: "全然接纳2", category: "痛苦耐受" },
      { id: 22, title: "全然接纳3", category: "痛苦耐受" },
      { id: 23, title: "全然接纳4", category: "痛苦耐受" },
      { id: 24, title: "全然接纳5", category: "痛苦耐受" },
      { id: 25, title: "总概", category: "痛苦耐受" },
      { id: 26, title: "自我安抚", category: "痛苦耐受" },
      { id: 27, title: "身体扫描", category: "痛苦耐受" },
      { id: 28, title: "转移注意力", category: "痛苦耐受" },
    ],
  },

  onLaunch() {
    // 检查是否首次使用
    const isFirstTime = wx.getStorageSync("isFirstTime");
    if (isFirstTime === "") {
      this.globalData.isFirstTime = true;
    } else {
      this.globalData.isFirstTime = false;
      // 加载用户数据
      this.loadUserData();
    }
  },

  loadUserData() {
    try {
      const userInfo = wx.getStorageSync("userInfo");
      const learningProgress = wx.getStorageSync("learningProgress");

      if (userInfo) {
        this.globalData.userInfo = userInfo;
      }
      if (learningProgress) {
        this.globalData.learningProgress = learningProgress;
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
        if (
          !learningProgress.completedAssignments.includes(
            assignment.id
          )
        ) {
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
