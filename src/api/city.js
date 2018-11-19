import axios from '@/libs/api.request'

/**
 * @param {*} token
 * @param {*} formData  数据
 * @param {*} objKey    对象的KEY
 * @returns
 * 用于市对乡镇指标管理
 */
function citylData (token, formData, KEY_1) {
  console.log(formData)
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
      monthTime: formData.monthTime, // 月份
      audit: formData.audit, // 审核状态
      score: formData.score, // 分数
      finalScore: formData.finalScore, // 实际得分
      pageSize: formData.pageSize, // 页数
      pageNumber: formData.pageNumber // 页码

    }
  } else {
    data['list'] = formData['list'] // excle 导入 穿给后台为LIST
  }
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
function countyData (token, formData, KEY_1, KEY_2) {
  let data = {}
  data['tokenEntity'] = {
    value: token
  }
  data[KEY_1] = {
    id: formData.id === undefined ? '' : formData.id,
    indexName: formData.indexName,
    indexType: formData.indexType,
    leadUnit: formData.leadUnit,
    superiorIndexId: formData.superiorIndexId,
    responsibilityUnit: formData.responsibilityUnit,
    score: formData.score,
    weight: formData.weight,
    pageSize: formData.pageSize,
    pageNumber: formData.pageNumber

  }
  if (formData.indexType === '二级指标' && KEY_2 !== undefined) {
    data[KEY_2] = {
      tangQ: formData.tangQ, // 塘前
      geL: formData.geL, // 葛岭
      zhangC: formData.zhangC, // 樟城
      chengF: formData.chengF, // 城峰
      qingL: formData.qingL, // 清凉
      fuQ: formData.fuQ, // 福泉
      lingL: formData.lingL, // 岭路
      chiX: formData.chiX, // 赤锡
      wuT: formData.wuT, // 梧桐
      songK: formData.songK, // 嵩口
      fuK: formData.fuK, // 伏口
      gaiY: formData.gaiY, // 盖洋
      changQ: formData.changQ, // 长庆
      dongY: formData.dongY, // 东洋
      xiaB: formData.xiaB, // 霞拔
      tongA: formData.tongA, // 同安
      daY: formData.danY, // 大洋
      panG: formData.panG, // 盘谷
      hongX: formData.hongX, // 红星
      baiY: formData.baiY, // 白云
      danY: formData.danY // 丹云
    }
  }
  return data
}
// 获取
export const getIndexList = ({
  token,
  formData,
  url,
  inspectionType // 考类类型 ： county 县对各乡镇指标考核
}) => {
  let data = ''
  console.log(url);
  console.log(formData)
  // county县对各乡镇            区别传来的数据是市对县的 还是县对各乡镇的
  if (inspectionType === 'county') {
    const KEY_1 = 'townIndicatorsFilter'
    data = countyData(token, formData, KEY_1)
  } else {
    const KEY_1 = 'countryIndicatorsFilter'
    data = citylData(token, formData, KEY_1);
  }
  return axios.request({
    url: url,
    data,
    method: 'post'
  })
}
// 添加
export const AddIndex = ({
  token,
  formData,
  url,
  inspectionType
}) => {
  console.log(formData);
  let data = ''
  if (inspectionType === 'county') {
    const KEY_1 = 'townIndicatorsEntity' // 牵头，责任单位，指标名KEY
    const KEY_2 = 'townDTO' // 各乡镇的KEY
    data = countyData(token, formData, KEY_1, KEY_2)
  } else {
    const KEY_1 = 'countryIndicatorsEntity'
    data = citylData(token, formData, KEY_1);
  }

  return axios.request({
    url: url,
    data,
    method: 'post'
  })
}
// 修改
export const updateIndex = ({
  token,
  formData,
  url,
  inspectionType
}) => {
  let data = ''
  if (inspectionType === 'county') {
    const KEY_1 = 'townIndicatorsEntity' // 牵头，责任单位，指标名KEY
    const KEY_2 = 'townDTO' // 各乡镇的KEY
    data = countyData(token, formData, KEY_1, KEY_2)
  } else {
    const KEY_1 = 'countryIndicatorsEntity'

    data = citylData(token, formData, KEY_1);
  }
  return axios.request({
    url: url,
    data,
    method: 'post'
  })
}
// 删除指标
export const removeIndex = ({
  token,
  formData,
  url,
  inspectionType
}) => {
  let data = ''
  if (inspectionType === 'county') {
    const KEY_1 = 'townIndicatorsEntity'
    data = {
      tokenEntity: {
        value: token
      },
      [KEY_1]: {
        id: formData.id
      }
    }
  } else {
    const KEY_1 = 'countryIndicatorsEntity'
    data = {
      tokenEntity: {
        value: token
      },
      [KEY_1]: {
        id: formData.id
      }
    }
  }
  //  const data = dealData(token, formData, objKey);
  console.log(data);
  return axios.request({
    url: url,
    data,
    method: 'post'
  })
}
