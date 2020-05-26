// pages/category/category.js
import {
  request
} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧菜单数据 数组
    leftMenuList: [],
    // 右侧菜单数据 数组
    rightContentList: [],
    // 被点击的右侧菜单
    currentIndex: 0,
    // 右侧菜单置顶
    scrollTop: 0
  },
  Cates: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 判断是否有缓存数据，有则调用无则请求
    const Cates = wx.getStorageSync("cates");
    if (!Cates) {
      this.getCates();
    } else {
      if (Date.now() - Cates.time > 1000 * 100) {
        this.getCates();
      } else {
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(v => v.cat_name)
        let rightContentList = this.Cates[0].children
        this.setData({
          leftMenuList,
          rightContentList
        })
      }
    }

  },

  async getCates() {
    const result = await request({
      url: "/categories"
    })
    this.Cates = result.data.message;
    wx.setStorageSync("cates", {
      time: Date.now(),
      data: this.Cates
    })
    let leftMenuList = this.Cates.map(v => v.cat_name)
    let rightContentList = this.Cates[0].children
    this.setData({
      leftMenuList,
      rightContentList
    })
  }
,
handleItemTap(e) {
  let {
    index
  } = e.currentTarget.dataset;
  let rightContentList = this.Cates[index].children
  this.setData({
    currentIndex: index,
    rightContentList,
    scrollTop: 0
  })
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