// pages/articleDetail/articleDetail.js
const data = require("../../data/posts-data.js");
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    article: {},
    url: "/images/music/music-start.png",
    collection: false,
  },

  //播放音乐
  playMusic() {
    let that = this;
    if (!app.globalData.musicState.playing) {
      wx.playBackgroundAudio({
        dataUrl: that.data.article.music.url,
        title: that.data.article.music.title,
        coverImgUrl: that.data.article.music.coverImg,
        success() {
          that.setData({
            url: "/images/music/music-stop.png"
          });
          app.globalData.musicState.playing = true;
          app.globalData.musicState.id = that.data.article.postId;
        }
      })
    } else {
      wx.pauseBackgroundAudio();
      that.setData({
        url: "/images/music/music-start.png"
      });
      app.globalData.musicState.playing = false;
      app.globalData.musicState.id = -1;
    }
  },
  //播放音乐

  //收藏功能
  getCollection() {
    let that = this;
    let list = [];
    let id = this.data.article.postId;//当前文章id
    wx.getStorage({
      key: "articleList",
      success(res) {
        
        list = res.data;
        console.log(res.data);
        if (!res.data.length){
          wx.setStorage({
            key:"articleList",
            data:[]
          })
        }
        
        let state = list.includes(id);//es6中判断字符串是否包含
        if (state) {
          //已经收藏状态
          that.setData({
            collection: true
          });
        } else {
          //没有收藏的状态
          that.setData({
            collection: false
          });
        }
      }
    })

  },
  collection() {//点击实现收藏
    let that = this;
    if (this.data.collection) {
      //已经收藏过了，点击应该取消收藏
      //已知数组中某个元素的值，如何删除这个元素
      let arr=[];
      wx.getStorage({
        key: "articleList",
        success(res) {
          arr=res.data;
          console.log(res.data);
          let index=arr.indexOf(that.data.article.postId);
          arr.splice(index,1);
          wx.setStorage({
            key:"articleList",
            data: arr,
            success(){
              wx.showToast({
                title:"取消收藏了",
                icon:"loading"
              })
              that.setData({
                collection:false
              });
            }
          })
        }})
     
    } else {
      //没有收藏，点击应该收藏
      let arr = [];
      
      wx.getStorage({
        key: "articleList",
        success(res) {
          arr = res.data;
          console.log(arr);
          arr.push(that.data.article.postId);
          wx.setStorage(
            {
              key: "articleList",
              data: arr,
              success() {
                wx.showToast({
                  title: "成功收藏了",
                  icon: "success"
                })
                that.setData({
                  collection: true
                });
              }
            }
          )
        }
      })

      //收藏之前先把他取出来，已经存的保留

    }
  },

  //收藏功能

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      article: data.postList[options.id]
    });


    if (app.globalData.musicState.playing && app.globalData.musicState.id == options.id) {
      this.setData({
        url: "/images/music/music-stop.png"
      })
    } else {
      this.setData({
        url: "/images/music/music-start.png"
      })
    }

    //页面打开读取本地缓存判断是否有当前文章
    this.getCollection();

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