// pages/home/home.js
const cweb = require('../../utils/cweb.js')
var openId = ""
// var newres = {
//   "teamId": "12345",
//   "groupName": "culTran",
//   "status": "1000",
//   "humCare": "3",
//   "culTran": "3",
//   "resp": "3"
// }
var newres = {}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // urllist: ['https://i.loli.net/2019/10/20/7Uxp5CVKBh4HZTy.jpg', 'https://i.loli.net/2019/10/20/KHqxZeAoRBv94I7.jpg', 'https://i.loli.net/2019/10/20/n1GI4ONoAMXZ9JQ.jpg'],
    track: [{
      'name': '人文关怀',
      'mark': 'humCare'
    }, {
      'name': '文化传播',
      'mark': 'culTran'
    }, {
      'name': '责任担当',
      'mark': 'resp'
    }],
    trackname: {
      'humCare': '人文关怀',
      'culTran': "文化传播",
      "resp": "责任担当"
    },
    // state: {
    //   "teamId": "12345",
    //   "groupName": "humCare",
    //   "status": "1000",
    //   "humCare": "3",
    //   "culTran": "3",
    //   "resp": "3"
    // },
    state: {},
    modalpic: "",
    modalshow: false,
    modalshowpre: false
  },

  bindrank: function() {
    wx: wx.navigateTo({
      url: '/pages/question/question',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  bindlottery: function(e) {
    var formid = e.detail.formId
    var that = this
    // console.log(openId, formid)
    // return 0
    cweb.cpost('/V2.0/lottery', {
      'openId': openId,
      'formId': formid
    }).then(function(res) {
      wx: wx.showModal({
        title: '提示',
        content: '您已成功参与抽奖，请查看微信通知领奖',
        showCancel: false,
      })
    }).catch(function(res) {
      if (res.status == '5002') {
        wx: wx.showModal({
          title: '提示',
          content: '您已参与过抽奖，不要重复抽奖哦',
          showCancel: false,
        })
      }
      else {
        wx: wx.showModal({
          title: '提示',
          content: '请求失败，错误代码：' + res.status,
          showCancel: false,
        })
      }
    })
  },

  bindvote: function(e) {
    var formid = e.detail.formId
    // console.log(formid)
    // 此处插入扫码及POST请求，获得newres
    var that = this
    // return 0
    cweb.cscan().then(function(res) {
      cweb.cpost('/V2.0/vote', {
        'openId': openId,
        'teamId': res,
        'formId': formid
      }).then(function(res) {
        wx: wx.showLoading({
          title: '加载中',
          mask: true,
        })
        newres = res
        var state = JSON.parse(JSON.stringify(newres))
        state[newres.groupName] = newres[newres.groupName] - 1
        that.setData({
          state: state,
          modalshowpre: true,
          modalpic: newres.groupName + (newres[newres.groupName] - 1)
        })
      }).catch(function(res) {
        if (res.status == 3000) {
          wx: wx.showModal({
            title: '提示',
            content: '已投过此队伍',
            showCancel: false,
          })
        }
        else if (res.status == 3001) {
          wx: wx.showModal({
            title: '提示',
            content: '当前赛道投票已满',
            showCancel: false,
          })
        }
        else {
          wx: wx.showModal({
            title: '提示',
            content: '未知错误，错误代码：' + res.status,
            showCancel: false,
          })
        }
      })
    })

  },

  modalpicload: function() {
    wx: wx.hideLoading()
    this.setData({
      modalshow: true
    })
  },

  hideModal: function() {
    this.setData({
      modalshow: false,
      modalshowpre: false,
    })
    var that = this;
    that.setData({
      animation: newres.groupName + (newres[newres.groupName] - 1)
    })
    // console.log(this.data.animation)
    setTimeout(function() {
      that.setData({
        animation: "",
        state: newres
      })
      if (that.data.state.humCare * 1 + that.data.state.culTran * 1 + that.data.state.resp * 1 == 9) {
        that.setData({
          animation: "scale",
        })
        setTimeout(function() {
          that.setData({
            animation: "",
          })
        }, 500)
      }
    }, 500)
  },

  imgload: function(e) {
    var img = e.currentTarget.dataset.img
    this.setData({
      ['track' + img]: true
    })
    // console.log(this.data[img])
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    wx.login({
      success: res => {
        // console.log(res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // return 0
        cweb.cpost('/V2.0/registerUser', {
          "code": res.code
        }).then(function(res) {
          openId = res.openId
          that.setData({
            state: res
          })
        }).catch(function(res) {
          if (res.status[0] == 4) {
            wx: wx.showModal({
              title: '提示',
              content: '注册失败，错误代码：' + res.status,
              showCancel: false,
            })
          }
          else {
            wx: wx.showModal({
              title: '提示',
              content: '未知错误，错误代码：' + res.status,
              showCancel: false,
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})