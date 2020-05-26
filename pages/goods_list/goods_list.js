import {
  request
} from "../../request/index.js"

// pages/goods_list/goods_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //tab数据
    tabs: [{
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      },
    ],
    //商品列表数据 数组
    goodsList: []

  },
  //接口要的数据
  queryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  totalPages: 1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryParams.cid = options.cid || '';
    this.queryParams.query = options.query || '';
    this.getGoods()
  },
  bindTabsItemChange(e) {
    const {
      index
    } = e.detail;
    let {
      tabs
    } = this.data;
    tabs.forEach((v, i) => {
      i === index ? v.isActive = true : v.isActive = false
    })
    this.setData({
      tabs
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  //获取商品数据
  async getGoods() {
    const result = await request({
      url: "/goods/search",
      data: this.queryParams
    })
    const total = result.data.message.total;
    this.totalPages = Math.ceil(total / this.queryParams.pagesize);
    this.setData({
      goodsList: [...this.data.goodsList, ...result.data.message.goods]
    })
  },
  onReachBottom() {
    if (this.queryParams.pagenum >= this.totalPages) {
      wx.showToast({
        title: '没有更多数据了',
      });
    } else {
      this.queryParams.pagenum++;
      this.getGoods();
    }
  },
  //下拉刷新事件
  onPullDownRefresh() {
    // 重置列表数组
    this.setData({
      goodsList: []
    });
    //重置页码值
    this.queryParams.pagenum = 1
    // 重新发起请求
    this.getGoods()
    // 关闭下拉刷新的效果
    wx.stopPullDownRefresh()
  }
})