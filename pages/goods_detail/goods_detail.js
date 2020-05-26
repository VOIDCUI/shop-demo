import {
  request
} from "../../request/index.js"

// pages/goods_detail/goods_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail: {},
    isCollect: false
  },
  goodsInfo: {},
  goods_id: '',
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      goods_id
    } = options;
    this.getGoodsdetail(goods_id);
  },
  async getGoodsdetail(goods_id) {
    const result = await request({
      url: "/goods/detail",
      data: {
        goods_id
      }
    });
    this.goodsInfo = result.data.message;
    let goodsDetail = {
      pics: result.data.message.pics,
      // iphone 部分手机 不识别 webp格式图片
      // 最好找到后台 让他进行修改
      // 临时自己改 确保后台存在 1.webp =》 1.jpg 
      goods_introduce: result.data.message.goods_introduce.replace(/\.webp/g, '.jpg'),
      goods_price: result.data.message.goods_price,
      goods_name: result.data.message.goods_name
    }
    //1、获取缓存中的商品收藏
    let collect = wx.getStorageSync('collect') || [];
    //2、判断当前商品是否被收藏
    let isCollect = collect.some((item) => item.goods_id === this.goodsInfo.goods_id);
    this.setData({
      goodsDetail,
      isCollect
    })
  },
  handlePreviewImage(e) {
    let url = e.currentTarget.dataset.url;
    let urls = this.data.goodsDetail.pics.map((item) => item.pics_mid);
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  //点击添加到购物车
  handleCartAdd() {
    //1、获取缓存中的购物车 数组
    let cart = wx.getStorageSync('cart') || []; //如果是第一次获取 则cart就是个空字符串 加[] 是为了将空字符串转换成数组
    // 2、判断商品对象是否存在购物车数组中
    let index = cart.findIndex((item) => item.goods_id === this.goodsInfo.goods_id);
    if (index === -1) {
      // 3、如果不存在，则第一次添加
      this.goodsInfo.num = 1;
      //添加一个商品的选中状态 
      this.goodsInfo.checked = true;
      cart.push(this.goodsInfo);
    } else {
      // 4、已经存在购物车数据 执行 num++
      cart[index].num++
    }
    // 5、把购物车重新添加回缓存中
    wx.setStorageSync('cart', cart);
    //6、弹框提示
    wx.showToast({
      title: '添加成功',
      mask: true,
    });
  },

  // 点击商品收藏
  handleCollect() {
    let isCollect = false;
    //1、获取缓存中的商品收藏数组
    let collect = wx.getStorageSync("collect") || [];
    //2、判断该商品是否被收藏过
    let index = collect.findIndex((item) => item.goods_id === this.goodsInfo.goods_id);
    // 3、当 index !== -1 时， 表示已经收藏过
    if (index !== -1) {
      // 4、表示 能找到 已经收藏过
      collect.splice(index, 1); //将它从数组中移出
      isCollect = false
      // 弹框提示
      wx.showToast({
        title: '取消收藏成功！',
        icon: "success"
      });
    } else {
      // 5、表示 没有收藏过
      collect.push(this.goodsInfo); //将当前商品 添加到 商品收藏数组中
      isCollect = true
      // 弹框提示
      wx.showToast({
        title: "收藏成功！",
        icon: "success"
      })
    }
    // 6、将修改后的 数组存入 到缓存中
    wx.setStorageSync("collect", collect);
    // 修改data 中的数据
    this.setData({
      isCollect
    });
    console.log(index)
  },
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