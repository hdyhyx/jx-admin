import {
  login,
  logout,
  getUserInfo
} from '@/api/user'
import {
  setToken,
  getToken
} from '@/libs/util'

export default {
  state: {
    userName: '',
    userId: '',
    avatorImgPath: '',
    token: getToken(),
    access: '',
    hasGetInfo: false,
    department: '',
    role: '',
    emailWarning: '',
    departmentList: [],
    warnIndex: []
  },
  mutations: {
    // 获取用户预警
    setwarnIndex(state, warnIndex) {
      state.warnIndex = warnIndex
    },
    // 获取部门
    setDepartmentList(state, departmentList) {
      state.departmentList = departmentList
    },
    // 察访督查预警
    setEmailWarning(state, emailWarning) {
      state.emailWarning = emailWarning
    },
    // 权限
    setRole(state, role) {
      state.role = role
    },
    // 所在部门
    setDepartment(state, department) {
      state.department = department
    },
    // 头像
    setAvator(state, avatorPath) {
      state.avatorImgPath = avatorPath
    },
    // 用户Id
    setUserId(state, id) {
      state.userId = id
    },
    // 用户名
    setUserName(state, name) {
      state.userName = name
    },
    // 用户权限
    setAccess(state, access) {
      state.access = access
    },
    // token
    setToken(state, token) {
      state.token = token
      setToken(token)
    },
    // 哈希值
    setHasGetInfo(state, status) {
      state.hasGetInfo = status
    }
  },
  actions: {
    // 登录
    handleLogin({
      commit
    }, {
      userName,
      password
    }) {
      userName = userName.trim()
      return new Promise((resolve, reject) => {
        login({
          userName,
          password
        }).then(res => {
          if (!res) {
            // resolve(res.data);
            return
          }
          const data = res.data
          if (data.code === "200") {
            commit('setToken', data.message)
          }
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut({
      state,
      commit
    }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('setToken', '')
          commit('setAccess', [])
          resolve()
        }).catch(err => {
          reject(err)
        })
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        // commit('setToken', '')
        // commit('setAccess', [])
        // resolve()
      })
    },
    // 获取用户相关信息
    getUserInfo({
      state,
      commit
    }) {
      return new Promise((resolve, reject) => {
        try {
          getUserInfo(state.token).then(res => {
            const data = res.data.results
            console.log(data)
            // commit('setAvator', data.avator)
            commit('setwarnIndex', data.warn)
            commit('setUserName', data.name)
            commit('setUserId', data.user_id)
            commit('setAccess', data.access)
            commit('setHasGetInfo', true)
            commit('setDepartment', data.department)
            commit('setRole', data.role)
            commit('setEmailWarning', data.emailWarning)
            commit('setDepartmentList', data.departmentList)
            resolve(data)
          }).catch(err => {
            reject(err)
          })
        } catch (error) {
          reject(error)
        }
      })
    }
  }
}
