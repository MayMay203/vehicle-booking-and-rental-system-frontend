import axios from 'axios'

const httpRequest = axios.create({
  baseURL: 'http://localhost:8080/api',
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

export const DELETE = async (path, options = {}) => {
  const response = await httpRequest.delete(path, options)
  return response.data
}

export const getMessage = (error) => {
  return error.response.data.error
}
