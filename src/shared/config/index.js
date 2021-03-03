// 默认配置文件
let defaultConfig = {
  //登录请求的基础地址
  loginURL: "",
  // 其他请求的基础地址
  baseURL: "",
  // 图片地址
  imgBaseUrl: "http://222.191.22.229:6080/wx/public/resource/image/",
  //音乐地址
  musicBaseUrl: "http://222.191.22.229:6080/wx/public/resource/music/",
  //所有路由前缀
  routeBasePath: "",
  // SZ -- 上证  common--普通用户名密码登录
  loginType: "common",
  //获取公墓列表接口
  // getCemeteryList: "https://www.fastmock.site/mock/7f0cf10b888d227e74f3c408413b8cd5/mobile/api/cemetery/anon/cemetery/cemeteryList",
  getCemeteryList: "https://testapi.internetofcity.cn/api/cemetery/anon/cemetery/list",
  // 是否展示navBar
  ifShowNavBar: false,
  // 分享的地址
  shareURL: 'pages/youth/home/index/index.html',
  //分享的title
  shareTitle: "测试云祭扫分享",
  //分享的content
  shareContent: "测试云祭扫分享",
  //轮询时间
  loopTime: 1000,
  // 登录页面返回主页的链接(上证)
  backHomeURL: "",
  //是否测试
  ifText: false,
  //appId
  appId: 'B400556199781376X'
};
if (window.YWConfig) {
  for (var key in defaultConfig) {
    if (window.YWConfig[key]) {
      defaultConfig[key] = window.YWConfig[key];
    }
  }
}
defaultConfig.ls = window.ls
// 获取存储配置
export const commonConfig = defaultConfig;
