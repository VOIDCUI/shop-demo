// pages/auth/auth.js
import {
  request
} from "../../request/index.js"
import {
  login,
  showToast
} from "../../utils/asyncWx.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  //获取用户信息
  async handlegetUserInfo(e) {
    // console.log(e)
    // 获取用户信息
    let {
      encryptedData,
      rawData,
      iv,
      signature
    } = e.detail;
    //获取小程序登录成功之后的 code
    const {
      code
    } = await login();
    console.log(code)
    let loginParams = {
      encryptedData,
      rawData,
      iv,
      signature,
      code
    }
    // console.log(loginParams);
    // 发送请求 获取用户 token
    // let token = await request({url:'/users/wxlogin',data:loginParams,method:'POST'});
    // console.log(token)
    // 弹框提示
    showToast({
      title: '亲 钱包不够钱就请不要来捣乱喔！'
    });
    // 返回到上一级页面
    setTimeout(() => {
      wx.navigateBack({
        delta: 1
      })
    }, 1500);
  },
})