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

function measurementData(formData, keyOne, keyTwo) {
  console.log(formData)
  let data = {}
  data['tokenEntity'] = {
    value: getToken()
  }
  data[keyOne] = {
    id: formData.id === undefined ? '' : formData.id,
    name: formData.name === undefined ? '' : formData.name,
    type: formData.type === undefined ? '' : formData.type,
    testObj: formData.testObj === undefined ? '' : formData.testObj.join('、'),
    totalScore: formData.totalScore === undefined ? '' : formData.totalScore,
    startTime: formData.startTime === undefined ? '' : formData.startTime,
    endTime: formData.endTime === undefined ? '' : formData.endTime,
    status: formData.status === undefined ? '' : formData.status,
    pageSize: formData.pageSize === undefined ? '' : formData.pageSize,
    pageNumber: formData.pageNumber === undefined ? '' : formData.pageNumber
  }
  if (formData['list'] !== undefined) {
    data[keyTwo] = formData.list
  }
  return data
}

function answerData(formData, keyOne, keyTwo, keyThree) {
  let data = {}
  data['tokenEntity'] = {
    value: getToken()
  }
  data[keyOne] = {
    id: formData.id === undefined ? '' : formData.id,
    name: formData.name === undefined ? '' : formData.name,
    type: formData.type === undefined ? '' : formData.type,
    testObj: RegTestObj(formData.testObj),
    totalScore: formData.totalScore === undefined ? '' : formData.totalScore,
    startTime: formData.startTime === undefined ? '' : formData.startTime,
    endTime: formData.endTime === undefined ? '' : formData.endTime,
    status: formData.status === undefined ? '' : formData.status,
    pageSize: formData.pageSize === undefined ? '' : formData.pageSize,
    pageNumber: formData.pageNumber === undefined ? '' : formData.pageNumber
  }

  data[keyTwo] = formData.list
  data[keyThree] = {
    phone: formData.phone
  }

  return data
}

function RegTestObj(obj) {
  if (obj === undefined) {
    return ''
  } else if (obj === '') {
    return ''
  } else {
    if (obj.length > 1) {
      return Obj.join('、')
    } else {
      return obj[0]
    }
  }
}

function questionnaireData(formData, keyOne, keyTwo) {
  console.log(formData)
  let data = {}
  data[keyOne] = {
    phone: formData.phone,
    id: formData.id
  }
  data[keyTwo] = {
    phone: formData.phone
  }
  return data
}
// 绩效察访核验工作
export const measurementAjax = ({
  formData,
  url,
  keyOne,
  keyTwo
}) => {
  let data = ''
  data = measurementData(formData, keyOne, keyTwo);
  return axios.request({
    url: HOST + url,
    data,
    method: 'post'
  })
}

// 试卷提交
export const answerAjax = ({
  formData,
  url,
  keyOne,
  keyTwo,
  keyThree
}) => {
  let data = ''
  data = answerData(formData, keyOne, keyTwo, keyThree);
  return axios.request({
    url: HOST + url,
    data,
    method: 'post'
  })
}

export const questionnaireAjax = ({
  formData,
  url,
  keyOne,
  keyTwo
}) => {
  let data = ''
  data = questionnaireData(formData, keyOne, keyTwo);
  return axios.request({
    url: HOST + url,
    data,
    method: 'post'
  })
}
