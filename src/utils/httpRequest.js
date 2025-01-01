import axios from 'axios'

const httpRequest = axios.create({
  baseURL: 'http://150.95.110.230:8080/api',
  withCredentials: true,
})

export const get = async (url, options = {}) => {
  const response = await httpRequest.get(url, options)
  return response.data
}

export const post = async (url, body = {}, options = {}) => {
  const response = await httpRequest.post(url, body, options)
  return response.data
}

export const put = async (url, body = {}, options = {}) => {
  const response = await httpRequest.put(url, body, options)
  return response.data
}

export const patch = async (url, body = {}, options = {}) => {
  const response = await httpRequest.patch(url, body, options)
  return response.data
}

export const DELETE = async (path, options = {}, body = {}) => {
  const response = await httpRequest.delete(path, {
    ...options,
    data: body,
  })
  return response.data
}

export const getMessage = (error) => {
  return error.response.data.error
}
