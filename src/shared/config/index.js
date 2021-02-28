// 默认配置文件
let defaultConfig = {
  //登录请求的基础地址
  loginURL: "",
  // 其他请求的基础地址
  baseURL: "",
  // 图片地址
  imgBaseUrl: "http://222.191.22.229:6080/wx/public/resource/image/",
  //所有路由前缀
  routeBasePath: "",
  // SZ -- 上证  common--普通用户名密码登录
  loginType: "common",
  // 登录页面返回主页的链接(上证)
  backHomeURL: "",
};

if (window.YWConfig) {
  for (var key in defaultConfig) {
    if (window.YWConfig[key]) {
      defaultConfig[key] = window.YWConfig[key];
    }
  }
}
// 获取存储配置
export const commonConfig = defaultConfig;
