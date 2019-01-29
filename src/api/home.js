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

function homeData(formData, keyOne) {
  let data = {}
  data['tokenEntity'] = {
    value: getToken()
  }
  data[keyOne] = {
    dateTime: formData.dateTime,
    monthTime: formData.monthTime,
    value: formData.value
  }
  return data
}

// 首页图标
export const homeAjax = ({
  formData,
  url,
  keyOne
}) => {
  let data = ''
  data = homeData(formData, keyOne);
  return axios.request({
    url: HOST + url,
    data,
    method: 'post'
  })
}
