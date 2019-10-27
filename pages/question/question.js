// pages/question/question.js
const cweb = require('../../utils/cweb.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // question: "党的各级代表大会代表在代表大会闭会期间，除履行党员的监督责任和享有党员的监督权利外，按照有关规定对（　）进行监督，反映所在选举单位党员的意见和建议。",
    // option: ['党委、政府', '党委、政府领导班子和成员', '其选举产生的党的委员会、纪律检查委员会及其成员'],
    // optionA: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    trackname: {
      'humCare': '人文关怀',
      'culTran': "文化传播",
      "resp": "责任担当"
    },
    response: {
      "status": "1004",
      "humCare": {
        "126457": "50",
        "126456": "50",
        "126455": "50",
        "126454": "50",
        "126453": "50",
        "126452": "50",
        "126451": "50",
        "124578": "37"
      },
      "culTran": {
        "215427": "32",
        "215426": "32",
        "215425": "32",
        "215424": "32",
        "215423": "32",
        "215422": "32",
        "215421": "32",
        "154785": "21"
      },
      "resp": {
        "145687": "65",
        "145686": "65",
        "145685": "65",
        "145684": "65",
        "145683": "65",
        "145682": "65",
        "145681": "65",
        "457844": "24"
      },
      "personCount": "80"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    cweb.cpost('/V2.0/countVotes', {}).then(function(res) {
      // console.log('chj', res)
      that.setData({
        response: res
      })
    }).catch(function(res) {
      wx: wx.showModal({
        title: '提示',
        content: '请求失败，错误代码：' + res.status,
        showCancel: false,
      })
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
  // onShareAppMessage: function() {

  // }
})