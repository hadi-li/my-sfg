import request from '@/utils/http.js'

// 获取数据
export const getlist = (currentPage, pageSize, params) => {
  return request({
    url: '/api/getlist',
    method: 'post',
    params: {
      ...params,
      currentPage,
      pageSize,
    }
  })
}

export const del = (data) => {
  return request({
    url: '/api/del',
    method: 'post',
    data
  })
}
export const addAndEdit = (data) => {
  return request({
    url: '/api/addedit',
    method: 'post',
    data
  })
}