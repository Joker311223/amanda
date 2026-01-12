/**
 * 统一的数据库管理模块
 * 集中处理所有与云数据库的交互
 * 
 * 数据结构：
 * - 一个用户对应一条数据
 * - 包含用户注册信息和学习进度
 * - 学习进度包含：课程进度、作业进度、作业填写内容
 */
class DBManager {
  constructor() {
    this.db = null;
    this.isInitialized = false;
  }

  /**
   * 初始化数据库连接
   */
  init() {
    if (!this.isInitialized) {
      this.db = wx.cloud.database();
      this.isInitialized = true;
    }
    return this.db;
  }

  /**
   * 获取数据库实例
   */
  getDB() {
    if (!this.isInitialized) {
      this.init();
    }
    return this.db;
  }

  /**
   * 创建或获取用户数据
   * 如果用户已存在，则拉取云端数据
   * 如果用户不存在，则创建新用户
   * 
   * @param {Object} userInfo - 用户信息 {name, gender, birthDate, phone, wechat}
   * @returns {Promise} 返回用户数据
   */
  async initializeUser(userInfo) {
    try {
      const db = this.getDB();
      
      // 检查用户是否已存在（通过openid）
      const existingUser = await this.getUserByOpenId();
      
      if (existingUser) {
        // 用户已存在，返回现有数据
        console.log('用户已存在，拉取云端数据:', existingUser);
        return existingUser;
      } else {
        // 创建新用户
        const newUser = await this.createUser(userInfo);
        console.log('新用户创建成功:', newUser);
        return newUser;
      }
    } catch (error) {
      console.error('初始化用户失败:', error);
      throw error;
    }
  }

  /**
   * 通过openid获取用户数据
   * 微信云数据库会自动根据当前用户的openid进行查询
   * @returns {Promise} 返回用户数据或null
   */
  async getUserByOpenId() {
    try {
      const db = this.getDB();
      // 微信云数据库会自动过滤当前用户的数据（基于_openid）
      const res = await db.collection('users').where({}).get();
      
      if (res.data && res.data.length > 0) {
        return res.data[0];
      }
      return null;
    } catch (error) {
      console.error('获取用户数据失败:', error);
      return null;
    }
  }

  /**
   * 检查用户是否已注册
   * 根据当前用户的openid查询是否存在用户记录
   * @returns {Promise} 返回用户数据或null
   */
  async checkUserRegistration() {
    try {
      const db = this.getDB();
      // 查询当前用户是否已注册
      const res = await db.collection('users').where({}).get();
      
      if (res.data && res.data.length > 0) {
        // 用户已注册，返回用户数据
        return res.data[0];
      }
      // 用户未注册
      return null;
    } catch (error) {
      console.error('检查用户注册状态失败:', error);
      return null;
    }
  }

  /**
   * 检查是否是首次使用
   * 根据当前用户的openid判断是否在云数据库中有记录
   * @returns {Promise} 返回 {isFirstTime: boolean, user: userData}
   */
  async checkIsFirstTime() {
    try {
      const db = this.getDB();
      // 查询当前用户是否已注册
      const res = await db.collection('users').where({}).get();
      
      if (res.data && res.data.length > 0) {
        // 用户已注册，不是首次使用
        return {
          isFirstTime: false,
          user: res.data[0]
        };
      }
      // 用户未注册，是首次使用
      return {
        isFirstTime: true,
        user: null
      };
    } catch (error) {
      console.error('检查首次使用状态失败:', error);
      // 出错时返回首次使用，让用户进行注册流程
      return {
        isFirstTime: true,
        user: null
      };
    }
  }

  /**
   * 创建新用户
   * @param {Object} userInfo - 用户信息
   * @returns {Promise} 返回创建的用户数据
   */
  async createUser(userInfo) {
    try {
      const db = this.getDB();
      
      const userData = {
        // 用户注册信息
        name: userInfo.name,
        gender: userInfo.gender,
        phone: userInfo.phone,
        wechat: userInfo.wechat,
        createTime: db.serverDate(),
        
        // 学习进度
        learningProgress: {
          currentWeek: 1,
          currentDay: 1,
          completedCourses: [],
          completedAssignments: [],
          totalExperience: 0,
          happinessScore: 0
        },
        
        // 课程进度详情
        courseProgress: {}, // {courseId: {status, completedAt, notes}}
        
        // 作业进度详情
        assignmentProgress: {}, // {assignmentId: {status, completedAt, answers, earnedPoints}}
        
        // 作业填写内容
        assignmentAnswers: {} // {assignmentId: {answers, problems, submitTime}}
      };
      
      const res = await db.collection('users').add({
        data: userData
      });
      
      // 保存用户ID到本地
      wx.setStorageSync('cloudUserId', res._id);
      
      // 返回完整的用户数据
      return {
        _id: res._id,
        ...userData
      };
    } catch (error) {
      console.error('创建用户失败:', error);
      throw error;
    }
  }

  /**
   * 获取用户数据
   * @param {String} userId - 用户ID
   * @returns {Promise} 返回用户数据
   */
  async getUser(userId) {
    try {
      const db = this.getDB();
      const res = await db.collection('users').doc(userId).get();
      return res.data;
    } catch (error) {
      console.error('获取用户数据失败:', error);
      throw error;
    }
  }

  /**
   * 更新用户学习进度
   * @param {String} userId - 用户ID
   * @param {Object} learningProgress - 学习进度数据
   * @returns {Promise}
   */
  async updateLearningProgress(userId, learningProgress) {
    try {
      const db = this.getDB();
      await db.collection('users').doc(userId).update({
        data: {
          learningProgress: learningProgress
        }
      });
      console.log('学习进度更新成功');
    } catch (error) {
      console.error('更新学习进度失败:', error);
      throw error;
    }
  }

  /**
   * 更新课程进度
   * @param {String} userId - 用户ID
   * @param {Number} courseId - 课程ID
   * @param {Object} courseData - 课程数据 {status, completedAt, notes}
   * @returns {Promise}
   */
  async updateCourseProgress(userId, courseId, courseData) {
    try {
      const db = this.getDB();
      const user = await this.getUser(userId);
      
      const courseProgress = user.courseProgress || {};
      courseProgress[courseId] = {
        ...courseProgress[courseId],
        ...courseData,
        updatedAt: db.serverDate()
      };
      
      await db.collection('users').doc(userId).update({
        data: {
          courseProgress: courseProgress
        }
      });
      console.log('课程进度更新成功');
    } catch (error) {
      console.error('更新课程进度失败:', error);
      throw error;
    }
  }

  /**
   * 更新作业进度和答案
   * @param {String} userId - 用户ID
   * @param {Number} assignmentId - 作业ID
   * @param {Object} assignmentData - 作业数据
   * @returns {Promise}
   */
  async updateAssignmentProgress(userId, assignmentId, assignmentData) {
    try {
      const db = this.getDB();
      const user = await this.getUser(userId);
      
      // 更新作业进度
      const assignmentProgress = user.assignmentProgress || {};
      assignmentProgress[assignmentId] = {
        ...assignmentProgress[assignmentId],
        status: 'completed',
        completedAt: db.serverDate(),
        earnedPoints: assignmentData.earnedPoints || 0
      };
      
      // 保存作业答案
      const assignmentAnswers = user.assignmentAnswers || {};
      assignmentAnswers[assignmentId] = {
        answers: assignmentData.answers || {},
        problems: assignmentData.problems || [],
        submitTime: db.serverDate(),
        earnedPoints: assignmentData.earnedPoints || 0
      };
      
      await db.collection('users').doc(userId).update({
        data: {
          assignmentProgress: assignmentProgress,
          assignmentAnswers: assignmentAnswers
        }
      });
      console.log('作业进度和答案更新成功');
    } catch (error) {
      console.error('更新作业进度失败:', error);
      throw error;
    }
  }

  /**
   * 获取用户的所有作业答案
   * @param {String} userId - 用户ID
   * @returns {Promise} 返回所有作业答案
   */
  async getAssignmentAnswers(userId) {
    try {
      const db = this.getDB();
      const user = await this.getUser(userId);
      return user.assignmentAnswers || {};
    } catch (error) {
      console.error('获取作业答案失败:', error);
      throw error;
    }
  }

  /**
   * 获取特定作业的答案
   * @param {String} userId - 用户ID
   * @param {Number} assignmentId - 作业ID
   * @returns {Promise} 返回作业答案
   */
  async getAssignmentAnswer(userId, assignmentId) {
    try {
      const db = this.getDB();
      const user = await this.getUser(userId);
      return user.assignmentAnswers?.[assignmentId] || null;
    } catch (error) {
      console.error('获取作业答案失败:', error);
      throw error;
    }
  }

  /**
   * 保存本地答案到云数据库
   * @param {String} userId - 用户ID
   * @param {Number} assignmentId - 作业ID
   * @param {Object} answers - 答案数据
   * @returns {Promise}
   */
  async saveAnswersToCloud(userId, assignmentId, answers) {
    try {
      const db = this.getDB();
      const user = await this.getUser(userId);
      
      const assignmentAnswers = user.assignmentAnswers || {};
      assignmentAnswers[assignmentId] = {
        ...assignmentAnswers[assignmentId],
        answers: answers,
        lastSavedAt: db.serverDate()
      };
      
      await db.collection('users').doc(userId).update({
        data: {
          assignmentAnswers: assignmentAnswers
        }
      });
      console.log('答案保存到云数据库成功');
    } catch (error) {
      console.error('保存答案到云数据库失败:', error);
      throw error;
    }
  }

  /**
   * 同步本地数据到云数据库
   * 用于应用启动时的数据同步
   * @param {String} userId - 用户ID
   * @param {Object} localData - 本地数据
   * @returns {Promise}
   */
  async syncLocalDataToCloud(userId, localData) {
    try {
      const db = this.getDB();
      
      // 获取云端数据
      const cloudUser = await this.getUser(userId);
      
      // 合并数据（云端数据优先）
      const mergedData = {
        learningProgress: cloudUser.learningProgress || localData.learningProgress,
        courseProgress: cloudUser.courseProgress || {},
        assignmentProgress: cloudUser.assignmentProgress || {},
        assignmentAnswers: cloudUser.assignmentAnswers || {}
      };
      
      return mergedData;
    } catch (error) {
      console.error('同步本地数据失败:', error);
      throw error;
    }
  }

  /**
   * 从云数据库拉取用户数据
   * @param {String} userId - 用户ID
   * @returns {Promise} 返回用户的完整数据
   */
  async pullUserDataFromCloud(userId) {
    try {
      const user = await this.getUser(userId);
      
      return {
        userInfo: {
          name: user.name,
          gender: user.gender,
          birthDate: user.birthDate,
          phone: user.phone,
          wechat: user.wechat
        },
        learningProgress: user.learningProgress || {
          currentWeek: 1,
          currentDay: 1,
          completedCourses: [],
          completedAssignments: [],
          totalExperience: 0,
          happinessScore: 0
        },
        courseProgress: user.courseProgress || {},
        assignmentProgress: user.assignmentProgress || {},
        assignmentAnswers: user.assignmentAnswers || {}
      };
    } catch (error) {
      console.error('从云数据库拉取数据失败:', error);
      throw error;
    }
  }

  /**
   * 批量更新学习进度
   * @param {String} userId - 用户ID
   * @param {Array} completedCourses - 已完成的课程ID列表
   * @param {Array} completedAssignments - 已完成的作业ID列表
   * @param {Number} totalExperience - 总经验值
   * @returns {Promise}
   */
  async updateBatchProgress(userId, completedCourses, completedAssignments, totalExperience) {
    try {
      const db = this.getDB();
      
      await db.collection('users').doc(userId).update({
        data: {
          'learningProgress.completedCourses': completedCourses,
          'learningProgress.completedAssignments': completedAssignments,
          'learningProgress.totalExperience': totalExperience
        }
      });
      console.log('批量更新学习进度成功');
    } catch (error) {
      console.error('批量更新学习进度失败:', error);
      throw error;
    }
  }

  /**
   * 更新快乐分
   * @param {String} userId - 用户ID
   * @param {Number} happinessScore - 快乐分
   * @returns {Promise}
   */
  async updateHappinessScore(userId, happinessScore) {
    try {
      const db = this.getDB();
      
      await db.collection('users').doc(userId).update({
        data: {
          'learningProgress.happinessScore': happinessScore
        }
      });
      console.log('快乐分更新成功');
    } catch (error) {
      console.error('更新快乐分失败:', error);
      throw error;
    }
  }

  /**
   * 清空用户数据（仅用于测试）
   * @param {String} userId - 用户ID
   * @returns {Promise}
   */
  async clearUserData(userId) {
    try {
      const db = this.getDB();
      
      await db.collection('users').doc(userId).update({
        data: {
          learningProgress: {
            currentWeek: 1,
            currentDay: 1,
            completedCourses: [],
            completedAssignments: [],
            totalExperience: 0,
            happinessScore: 0
          },
          courseProgress: {},
          assignmentProgress: {},
          assignmentAnswers: {}
        }
      });
      console.log('用户数据已清空');
    } catch (error) {
      console.error('清空用户数据失败:', error);
      throw error;
    }
  }
}

// 创建全局单例
const dbManager = new DBManager();

module.exports = dbManager;