const urlset = "https://api.cxming.com"

function cpost(url, data) {
  return new Promise(function(resolve, reject) {
    wx: wx.showLoading({
      title: '处理中',
      mask: true,
    })
    wx: wx.request({
      url: urlset + url,
      data: data,
      header: {},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        // console.log(res.data)
        wx: wx.hideLoading()
        var status = res.data.status
        if (status[0] == 1) {
          resolve(res.data)
        } else {
          reject(res.data)
        }
      },
      fail: function(res) {
        wx: wx.hideLoading()
        wx: wx.showModal({
          title: '提示',
          content: '网络连接失败，请连接网络后重启小程序',
          showCancel: false,
        })
      },
      complete: function(res) {},
    })
  })
}

function base64decode(str) {
  var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
  var c1, c2, c3, c4;
  var i, len, out;
  len = str.length;
  i = 0;
  out = "";
  while (i < len) {

    do {
      c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
    } while (i < len && c1 == -1);
    if (c1 == -1)
      break;

    do {
      c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
    } while (i < len && c2 == -1);
    if (c2 == -1)
      break;
    out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

    do {
      c3 = str.charCodeAt(i++) & 0xff;
      if (c3 == 61)
        return out;
      c3 = base64DecodeChars[c3];
    } while (i < len && c3 == -1);
    if (c3 == -1)
      break;
    out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

    do {
      c4 = str.charCodeAt(i++) & 0xff;
      if (c4 == 61)
        return out;
      c4 = base64DecodeChars[c4];
    } while (i < len && c4 == -1);
    if (c4 == -1)
      break;
    out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
  }
  return out;
}

function cscan() {
  return new Promise(function(resolve, reject) {
    wx: wx.scanCode({
      onlyFromCamera: true,
      scanType: ['qrCode'],
      success: function(res) {
        try {
          var result = JSON.parse(res.result)
          result = base64decode(result.data)
          resolve(result)
        } catch (e) {
          wx: wx.showToast({
            title: '二维码有误！',
            icon: 'none',
            mask: true,
          })
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  })
}

module.exports = {
  cpost: cpost,
  cscan: cscan
}