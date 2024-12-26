import axios from 'axios'

const httpRequestV2 = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
})

export const get = async (url, options = {}) => {
  const response = await httpRequestV2.get(url, options)
  return response.data
}

export const post = async (url, body = {}, options = {}) => {
  const response = await httpRequestV2.post(url, body, options)
  return response.data
}

export const put = async (url, body = {}, options = {}) => {
  const response = await httpRequestV2.put(url, body, options)
  return response.data
}
export const patch = async (url, body = {}, options = {}) => {
  const response = await httpRequestV2.patch(url, body, options)
  return response.data
}


export const DELETE = async (path, options = {}, body = {}) => {
  const response = await httpRequestV2.delete(path, {
    ...options,
    data: body,
  })
  return response.data
}

export const getMessage = (error) => {
  return error.response.data.error
}
