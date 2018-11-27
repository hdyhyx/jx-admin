import axios from '@/libs/api.request'
import {
  format
} from 'path';

/**
 * @param {*} token
 * @param {*} formData  数据
 * @param {*} objKey    对象的KEY
 * @returns
 * 用于市对乡镇指标管理
 */
function citylData(token, formData, KEY_1) {
  console.log(formData);
  let data = {}
  data['tokenEntity'] = {
    value: token
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
function countyData(token, formData, KEY_1, KEY_2) {
  console.log(formData);
  let data = {}
  data['tokenEntity'] = {
    value: token
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
// 市对县指标考核
export const cityAjax = ({
  token,
  formData,
  url,
  key
}) => {
  let data = ''
  data = citylData(token, formData, key);
  return axios.request({
    url: url,
    data,
    method: 'post'
  })
}
// 修改
export const countyAjax = ({
  token,
  formData,
  url,
  keyOne,
  keyTwo
}) => {
  let data = ''
  data = countyData(token, formData, keyOne, keyTwo)
  return axios.request({
    url: url,
    data,
    method: 'post'
  })
}
