import axios from '@/libs/api.request'
import {
  format
} from 'path';
import {
  getToken,
  URL
} from "@/libs/util";

// 以防命名冲突
const HOST = URL

function noEntryData(formData, keyOne) {
  console.log(formData)
  let data = {}
  data['tokenEntity'] = {
    value: getToken()
  }
  data['endTime'] = formData.endTime
  data['warnType'] = formData.warnType
  data[keyOne] = formData.list
  return data
}

function warnData(formData, keyOne) {
  let data = {}
  data['tokenEntity'] = {
    value: getToken()
  }
  data[keyOne] = {
    unit: formData.leadUnit,
    indexName: formData.indexName,
    warnType: formData.warnType,
    pageSize: formData.pageSize,
    pageNumber: formData.pageNumber
  }
  return data
}
// 设置预警
export const noEntryAjax = ({
  formData,
  url,
  keyOne
}) => {
  let data = ''
  data = noEntryData(formData, keyOne);
  return axios.request({
    url: HOST + url,
    data,
    method: 'post'
  })
}
// 查询预警
export const getWarnAjax = ({
  formData,
  url,
  keyOne
}) => {
  let data = ''
  data = warnData(formData, keyOne);
  return axios.request({
    url: HOST + url,
    data,
    method: 'post'
  })
}
