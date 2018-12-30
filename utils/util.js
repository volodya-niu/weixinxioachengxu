const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//封装一个请求数据函数
const http = function (cate, count) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: "https://douban.uieee.com/v2/movie/" + cate + "?count=" + count,
      header: { 'content-type': 'application/xml' },
      success(res) {
        resolve(res.data);
      },
      fail() {
        reject();
      }
    })
  })
}

const http2 = function (id) {
  return new Promise((resolve, reject) => {
    //数据请求
    wx.request({
      url: "https://douban.uieee.com/v2/movie/subject/" +id, 
      header: { 'content-type': 'application/xml' },
      success(res) {
        resolve(res.data);
      },
      fail() {
        reject();
      }
    })
  });
}
const http3 = function (wd) {
  return new Promise((resolve, reject) => {
    //数据请求
    wx.request({
      url: "https://douban.uieee.com/v2/movie/search?tag=" + wd,
      header: { 'content-type': 'application/xml' },
      success(res) {
        resolve(res.data);
      },
      fail() {
        reject();
      }
    })
  });
}
module.exports = {
  formatTime: formatTime,
  http: http,
  http2:http2,
  http3:http3
}
