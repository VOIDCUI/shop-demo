let requestTimes = 0;

export const request = (params) => {
    let header = {};
    if (params.url.includes("/my/")) {
        header["Authorization"] = wx.getStorageSync("token");
    }
    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise((resolve, reject) => {
        // 发起请求          
        wx.showLoading({
            title: '拼了老命加载中',
        });
        requestTimes++;
        wx.request({
            ...params,
            header,
            url: baseUrl + params.url,
            success: (res) => {
                //成功的回调
                resolve(res)
            },
            fail: (err) => {
                //失败的回调
                reject(err)
            },
            complete() {
                if (!--requestTimes) {
                    wx.hideLoading();
                }
            }
        })
    })
}