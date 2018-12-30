// pages/movieMore/movieMore.js
const http = require('../../utils/util.js').http;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    num: 10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      msg: options.msg
    });
    this.getData(this.data.num);

  },

  //请求数据
  getData(num) {
    let that = this;
    http(this.data.msg, num).then(res => {
      if (!res.subjects.length) {
        wx.showToast({
          title: "已经到底部了------"
        })
        return;
      }
      that.setData({
        list: res.subjects
      });

    });

  },
  //请求数据
  //下拉刷新
  fn() {
    this.setData({
      num: this.data.num + 10
    });
    this.getData(this.data.num);
  },
  enterDetail(event) {
    //console.log(event.currentTarget.dataset.id);
     let id=event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/movieDetail/movieDetail?id=${id}`,
    })
  },
  //下拉刷新
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})