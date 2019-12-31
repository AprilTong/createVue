import axios from 'axios'
import qs from 'qs'

let baseUrl = ''

// if (process.env.NODE_ENV === 'development') {
//   baseUrl = '';
// }

class HTTP {
  constructor() {
    this.xhr = axios.create({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        timeout: 30000,
        withCredentials: true
      }
    })

    this.xhr.interceptors.request.use(
      opts => {
        opts.url = baseUrl + opts.url
        return opts
      },
      function(error) {
        return Promise.reject(error)
      }
    )

    this.xhr.interceptors.response.use(
      response => {
        return response
      },
      error => {
        return Promise.resolve(error.response)
      }
    )
  }
  request(opts) {
    return this.xhr
      .request(opts)
      .then(this.checkStatus)
      .then(this.checCode)
  }
  get(url, opts) {
    opts = opts || {}
    opts.method = 'get'
    opts.url = url

    return this.request(opts)
  }
  post(url, data, opts) {
    opts = opts || {}
    opts.method = 'post'
    opts.url = url
    opts.data = qs.stringify(data)

    return this.request(opts)
  }
  sendForm(
    url,
    data,
    { method = 'POST', enctype = 'multipart/form-data', target = '_blank' } = {}
  ) {
    const form = document.createElement('form')
    form.action = url
    form.method = method
    form.enctype = enctype
    form.target = target

    const setFiled = (key, val) => {
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = key
      input.value = val
      form.appendChild(input)
    }

    for (const key in data) {
      setFiled(key, data[key])
    }

    document.body.appendChild(form)
    form.submit()
    document.body.removeChild(form)
  }
  checkStatus(response) {
    if (response.status === 200 || response.status === 304) {
      return response
    }
    return {
      data: {
        code: 404,
        msg: response.statusText || '404 NOT FOUND',
        data: response.statusText
      }
    }
  }
  checCode(response) {
    const data = response.data
    // 未登录
    if (data.code == -2) {
      location.replace('')
    }

    return response
  }
}

export default new HTTP()
