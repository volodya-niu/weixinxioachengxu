// pages/search/search.js
const http3=require('../../utils/util.js').http3;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },
  //请求数据
  search(event){
    let that=this;
    this.setData({
      val:event.detail.value
    });
    http3(event.detail.value).then(res=>{
      this.setData({
        list: res.subjects
      })
    });
    if(!this.data.val){
      this.setData({
        list:[]
      })
    }
  },
  //请求数据
  enterDetail(event) {
    //console.log(event.currentTarget.dataset.id);
    let id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/movieDetail/movieDetail?id=${id}`,
    })
  },
  del(){
    this.setData({
      val:'',
      list:[]
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

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