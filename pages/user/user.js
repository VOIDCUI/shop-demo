import {
  showToast
} from "../../utils/asyncWx.js"

// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户信息
    userInfo: {},
    // 收藏商品的数量
    collectNum: 0
  },

  onShow() {
    //获取缓存中的 用户信息
    let userInfo = wx.getStorageSync('userInfo');
    this.setData({
      userInfo
    });
    //获取 缓存中的 收藏商品数组
    let collect = wx.getStorageSync("collect");
    // 将缓存中的商品数量设置到 data中
    this.setData({
      collectNum: collect.length
    });
  },

  // 提示用户 功能还没有实现
  commonToast() {
    showToast({
      title: "该功能还没有实现！"
    });
  }

})