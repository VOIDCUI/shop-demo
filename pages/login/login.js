// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  handleGetUserUnfo(e) {
    // 获取用户信息
    let  {userInfo} = e.detail;
    //将获取到的用户信息保存到 缓存中
    wx.setStorageSync('userInfo', userInfo);
    //返回上一页
    wx.navigateBack({//返回
        delta: 1
      })
}
})