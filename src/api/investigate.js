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

function investigateData(formData, keyOne) {
  console.log(formData)
  let data = {}
  data['tokenEntity'] = {
    value: getToken()
  }
  data[keyOne] = {
    id: formData.id,
    title: formData.title, // 标题
    content: formData.content, // 具体内容
    endTime: formData.endTime, // 截止日期
    audit: formData.audit, // 审核状态
    file: formData.file, // 文件Id
    status: formData.status, // 状态
    gmtCreate: formData.gmt_create, // 日期
    addressee: formData.addressee, // 收件人
    pageSize: formData.pageSize, // 显示页数
    pageNumber: formData.pageNumber, // 页码
    mailId: formData.mailId, // 邮件ID
    serialNumber: formData.serialNumber,
    correlationId: formData.correlationId,
    point: formData.point // 分数
  }
  return data
}

// 绩效察访核验工作
export const investigateAjax = ({
  formData,
  url,
  keyOne
}) => {
  let data = ''
  data = investigateData(formData, keyOne);
  return axios.request({
    url: HOST + url,
    data,
    method: 'post'
  })
}

export const loadAjax = ({
  formData,
  url,
  keyOne
}) => {
  let data = ''
  data = investigateData(formData, keyOne);
  return axios.request({
    url: HOST + url,
    data,
    method: 'post'
  })
}
