const http = require('../../utils/util.js').http;
Component({
  properties: {
    cate: {
      type: String,
      value: "in_theaters"
    },
    count: {
      type: Number,
      value: 3
    },
    title: {
      type: String,
      value: "正在热映"
    }
  },

  data: {
    movie: []
  }, // 私有数据，可用于模版渲染
  ready() {
    let that = this;
    http(this.properties.cate, this.properties.count).then((res) => {
      that.setData({
        movie: res.subjects
      });
      console.log(this.data.movie);
    });
  },
  methods: {
    enterMore(event) {
      let msg = event.currentTarget.dataset.msg;
      wx: wx.navigateTo({
        url: `/pages/movieMore/movieMore?msg=${msg}`
      })

    },
    enterDetail(event) {
      //console.log(event.currentTarget.dataset.id);
      let id = event.currentTarget.dataset.id;
      wx.navigateTo({
        url: `/pages/movieDetail/movieDetail?id=${id}`,
      })
    },
  }

})