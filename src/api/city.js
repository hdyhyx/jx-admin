import axios from '@/libs/api.request'
import {
  format
} from 'path';
import {
  getToken
} from "@/libs/util";
const HOST = '/api'
/**
 * @param {*} token
 * @param {*} formData  数据
 * @param {*} objKey    对象的KEY
 * @returns
 * 用于市对乡镇指标管理
 */
function citylData(formData, KEY_1) {
  let data = {}
  data['tokenEntity'] = {
    value: getToken()
  }
  if (formData['list'] === undefined) {
    data[KEY_1] = {
      id: formData.id === undefined ? '' : formData.id, // id
      indexName: formData.indexName === undefined ? '' : formData.indexName, // 指标名称
      indexType: formData.indexType === undefined ? '' : formData.indexType, // 指标类型
      superiorIndexId: formData.superiorIndexId === undefined ? '' : formData.superiorIndexId, // 上级单位
      leadUnit: formData.leadUnit === undefined ? '' : formData.leadUnit, // 牵头单位
      responsibilityUnit: formData.responsibilityUnit === undefined ? '' : formData.responsibilityUnit, // 责任单位
      standardValue: formData.standardValue, // 标准值
      direction: formData.direction, // 方向
      weight: formData.weight, // 权重
      dateTime: formData.year, // 指标年份
      mainUnit: formData.mainUnit === undefined ? '' : formData.mainUnit, // 主要牵头单位
      monthTime: formData.monthTime === undefined ? '' : formData.monthTime, // 月份
      audit: formData.audit === undefined ? '' : formData.audit, // 审核状态
      score: formData.score === undefined ? '' : formData.score, // 分数
      finalScore: formData.finalScore === undefined ? '' : formData.finalScore, // 实际得分
      pageSize: formData.pageSize === undefined ? '' : formData.pageSize, // 页数
      pageNumber: formData.pageNumber === undefined ? '' : formData.pageNumber, // 页码
      indicatorsId: formData.id === undefined ? '' : formData.id, // 对应指标ID
      alternateField1: formData.alternateField1 === undefined ? '' : formData.alternateField1,
      reason: formData.reason === undefined ? '' : formData.reason, // 回退原因
      alternateField2: formData.alternateField2 === undefined ? '' : formData.alternateField2 // 考核数据月份提交Id 根据后台要求
    }
  } else {
    data['list'] = formData['list'] // excle 导入 穿给后台为LIST
  }
  console.log(data);
  return data
}
/**
 *
 * @param {*} token
 * @param {*} formData 表单
 * @param {*} KEY_1 后台所需要的KEY 责任单位、牵头单位、指标
 * @param {*} KEY_2 各乡镇
 * @returns 按照后台的规则返回Data
 * 用于县对乡镇指标管理
 */
function countyData(formData, KEY_1, KEY_2) {
  console.log(formData);
  let data = {}
  data['tokenEntity'] = {
    value: getToken()
  }
  if (formData['list'] === undefined) {
    data[KEY_1] = {
      id: formData.id === undefined ? '' : formData.id, // id
      indexName: formData.indexName, // 指标名称
      indexType: formData.indexType, // 指标类型
      leadUnit: formData.leadUnit, // 牵头单位
      superiorIndexId: formData.superiorIndexId, // 上级单位
      responsibilityUnit: formData.responsibilityUnit, // 责任单位
      score: formData.score, // 分数
      weight: formData.weight, // 招权重
      pageSize: formData.pageSize, // 显示页数
      pageNumber: formData.pageNumber, // 页码
      mainUnit: formData.mainUnit === undefined ? '' : formData.mainUnit, // 主要牵头单位
      audit: formData.audit === undefined ? '' : formData.audit, // 审核状态
      monthTime: formData.monthTime === undefined ? '' : formData.monthTime, // 月份
      dateTime: formData.dateTime, // 指标年份
      scoreType: formData.scoreType === undefined ? '' : formData.scoreType, // 分数类型
      reason: formData.reason === undefined ? '' : formData.reason // 回退原因

    }
    if (formData.indexType === '二级指标' && KEY_2 !== undefined) {
      data[KEY_2] = [{
        townName: '塘前乡',
        weight: formData['塘前乡']
      },
      {
        townName: '葛岭镇',
        weight: formData['葛岭镇']
      },
      {
        townName: '樟城镇',
        weight: formData['樟城镇']
      },
      {
        townName: '城峰镇',
        weight: formData['城峰镇']
      },
      {
        townName: '清凉镇',
        weight: formData['清凉镇']
      },
      {
        townName: '福泉镇',
        weight: formData['福泉镇']
      },
      {
        townName: '岭路乡',
        weight: formData['岭路乡']
      },
      {
        townName: '盖洋乡',
        weight: formData['盖洋乡']
      },
      {
        townName: '长庆镇',
        weight: formData['长庆镇']
      },
      {
        townName: '东洋乡',
        weight: formData['东洋乡']
      },
      {
        townName: '霞拔乡',
        weight: formData['霞拔乡']
      },
      {
        townName: '同安镇',
        weight: formData['同安镇']
      },
      {
        townName: '大洋乡',
        weight: formData['大洋乡']
      },
      {
        townName: '盘谷乡',
        weight: formData['盘谷乡']
      },
      {
        townName: '洑口乡',
        weight: formData['洑口乡']
      },
      {
        townName: '红星镇',
        weight: formData['红星镇']
      },
      {
        townName: '白云乡',
        weight: formData['白云乡']
      },
      {
        townName: '丹云乡',
        weight: formData['丹云乡']
      },
      {
        townName: '赤锡乡',
        weight: formData['赤锡乡']
      },
      {
        townName: '梧桐镇',
        weight: formData['梧桐镇']
      },
      {
        townName: '嵩口镇',
        weight: formData['嵩口镇']
      }
      ]
    }
  } else {
    data['list'] = formData['list']
  }
  console.log(data);
  return data
}
/**
 * @param {*} token
 * @param {*} formData form表单数据
 * @param {*} keyOne  后台需要相应的对象
 * @param {*} keyTwo  后台需要相应的对象
 * @returns
 */
function incentiveData(formData, keyOne, keyTwo) {
  console.log(formData)
  let data = {}
  data['tokenEntity'] = {
    value: getToken()
  }
  data[keyOne] = {
    id: formData.id,
    incentive: formData.incentive === undefined ? '' : formData.incentive,
    pointsType: formData.pointsType === undefined ? '' : formData.pointsType, // 加分类别
    recognitionUnit: formData.recognitionUnit === undefined ? '' : formData.recognitionUnit, // 表彰机关
    commendedUnit: formData.commendedUnit === undefined ? '' : formData.commendedUnit, // 被表彰机关
    audit: formData.audit === undefined ? '' : formData.audit, // 审核状态,
    dateTime: formData.dateTime === undefined ? '' : formData.dateTime, // 年份
    point: formData.point === undefined ? '' : formData.point, // 分值
    fileName: formData.fileName === undefined ? '' : formData.fileName, // 证明材料名称
    fileId: formData.fileId === undefined ? '' : formData.fileId, // 材料附件Id
    pageSize: formData.pageSize, // 显示页数
    pageNumber: formData.pageNumber, // 页码
    reason: formData.reason // 回退原因
  }
  return data
}

function newsData(formData, keyOne) {
  let data = {}
  data['tokenEntity'] = {
    value: getToken()
  }
  data[keyOne] = {
    id: formData.id,
    title: formData.title, // 新闻标题
    content: formData.content, // 新闻内容
    dateTime: formData.dateTime, // 年份
    editTime: formData.editTime, // 发布日期
    monthTime: formData.monthTime, // 月份
    url: formData.url, // 上传文件id
    pageSize: formData.pageSize, // 显示页数
    pageNumber: formData.pageNumber // 页码
  }
  return data
}

function workData(formData, keyOne) {
  let data = {}
  data['tokenEntity'] = {
    value: getToken()
  }
  if (formData['list'] === undefined) {
    data[keyOne] = {
      indicatorsId: formData.id,
      id: formData.scoreId,
      indexName: formData.indexName, // 指标名称
      cityResponUnit: formData.cityResponUnit, // 责任单位
      cooperateUnit: formData.cooperateUnit, // 配合单位
      leadUnit: formData.leadUnit, // 牵头单位
      audit: formData.audit, // 审核状态
      dateTime: formData.dateTime, // 年月
      monthTime: formData.monthTime, // 月份
      reason: formData.reason, // 回退原因
      maxPoint: formData.maxPoint, // 扣分值上限
      score: formData.score, // 扣分值
      pageSize: formData.pageSize, // 显示页数
      pageNumber: formData.pageNumber // 页码
    }
  } else {
    data['list'] = formData['list']
  }
  return data
}
// 账号管理
function userData(formData, keyOne) {
  console.log(formData)
  let data = {}
  data['tokenEntity'] = {
    value: getToken()
  }
  data[keyOne] = {
    id: formData.id,
    userName: formData.userName,
    userDepartment: formData.userDepartment,
    userPermissions: formData.userPermissions,
    userPhone: formData.userPhone,
    userPassword: formData.userPassword,
    pageSize: formData.pageSize, // 显示页数
    pageNumber: formData.pageNumber // 页码
  }
  return data
}

function userTestData(formData, keyOne) {
  console.log(formData)
  let data = {}
  data['tokenEntity'] = {
    value: getToken()
  }
  if (formData['list'] === undefined) {
    data[keyOne] = {
      id: formData.id,
      name: formData.name,
      department: formData.department,
      phone: formData.phone,
      gender: formData.gender,
      age: formData.age,
      pageSize: formData.pageSize, // 显示页数
      pageNumber: formData.pageNumber // 页码
    }
  } else {
    data['list'] = formData['list']
  }
  return data
}
// 市对县指标考核
export const cityAjax = ({
  formData,
  url,
  key
}) => {
  let data = ''
  data = citylData(formData, key);
  return axios.request({
    url: HOST + url,
    data,
    method: 'post'
  })
}
// 县对各乡镇、六抓六赛
export const countyAjax = ({
  formData,
  url,
  keyOne,
  keyTwo
}) => {
  let data = ''
  data = countyData(formData, keyOne, keyTwo)
  return axios.request({
    url: HOST + url,
    data,
    method: 'post'
  })
}
// 正向激励
export const incentiveAjax = ({
  formData,
  url,
  keyOne,
  keyTwo
}) => {
  let data = ''
  data = incentiveData(formData, keyOne, keyTwo)
  return axios.request({
    url: HOST + url,
    data,
    method: 'post'
  })
}
// 新闻动态
export const newsAjax = ({
  formData,
  url,
  keyOne
}) => {
  let data = ''
  data = newsData(formData, keyOne)
  return axios.request({
    url: HOST + url,
    data,
    method: 'post'
  })
}
// 工作督查
export const workAjax = ({
  formData,
  url,
  keyOne
}) => {
  let data = ''
  data = workData(formData, keyOne)
  return axios.request({
    url: HOST + url,
    data,
    method: 'post'
  })
}

// 用户管理
export const userAjax = ({
  formData,
  url,
  keyOne
}) => {
  let data = ''
  data = userData(formData, keyOne)
  return axios.request({
    url: HOST + url,
    data,
    method: 'post'
  })
}
// 测评对象
export const userTestAjax = ({
  formData,
  url,
  keyOne
}) => {
  let data = ''
  data = userTestData(formData, keyOne)
  return axios.request({
    url: HOST + url,
    data,
    method: 'post'
  })
}
// 删除
export const deleteAjax = ({
  formData,
  url
}) => {
  let data = formData
  return axios.request({
    url: HOST + url,
    data,
    method: 'post'
  })
}
