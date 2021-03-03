import moment from 'moment';
import ajax from "../config/axios.config";
import axios from "axios";
import { commonConfig } from "../shared/config/index";

// 详情页面获取配置信息接口
export const initCode = async () => {
  return ajax({
    url: "/wx/lx/initCode",
    method: "get",
  });
};

export const getList = async (cemeteryCodel: string) => {
  return ajax({
    url: "/wx/public/jibai/list",
    method: "get",
    params: {
      gravetype: cemeteryCodel,
    },
  });
};

export const getCemeteryList = async () => {
  return axios({
    url: commonConfig.getCemeteryList,
    method: "post",
  });
};

export const uploadImg = async (formData) => {
  return axios({
    url: "/wx/public/resource/upload",
    method: "post",
    data: formData,
    baseURL: commonConfig.baseURL,
  });
};

// 删除接口
export const deleteCemetery = async (id) => {
  return ajax({
    url: `/wx/public/jibai/delete/${id}`,
    method: "get",
  });
};

// 创建、编辑接口
export const saveCemetery = async (formData: any) => {
  return ajax({
    url: `/wx/public/jibai/save`,
    method: "post",
    data: formData,
  });
};

export const getCemeteryDetail = (id) => {
  return ajax({
    url: `/wx/public/jibai/view/${id}`,
    method: "get",
  });
};

export const getSayList = (id) => {
  return ajax({
    url: `/wx/public/jibai/sayList/${id}`,
    method: "get",
  });
};

export const sendSay = (id, type, name, content) => {
  return ajax({
    url: `/wx/public/jibai/say`,
    headers: sessionStorage.getItem("cloud_token")
      ? { "LX-OPENID": sessionStorage.getItem("cloud_token") }
      : null,
    method: "post",
    data: {
      id: id,
      type: type,
      name: name,
      content: content,
    },
  });
};

// 获取背景图片列表
export const getImgsList = () => {
  return ajax({
    url: '/wx/public/back/images',
    method: "get"
  })
}
// 获取背景音乐列表
export const getMusicsList = () => {
  return ajax({
    url: '/wx/public/back/musics',
    method: "get"
  })
}

//获取背景图片资源或背景音乐资源ID
export const getPicOrMusic = (id) => {
  return ajax({
    url: `/wx/public/back/res/${id}`,
    method: "get"
  })
}

// //获取认证授权码  获取authCode  2.2
// export const getRZCode = async (cipherText) => {
//   return axios({
//     url: commonConfig.getRZCode,
//     method: 'post',
//     data: {
//       appId: commonConfig.appId,
//       timestamp: moment().unix(),
//       randomSeries: Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 9)),
//       cipherText: cipherText
//     }
//   })
// }

// //获取平台访问令牌 accessToken  refreshToken  2.3
// export const getFWCode = async (authCode) => {
//   return axios({
//     url: commonConfig.getFWCode,
//     method: 'post',
//     data: {
//       appId: commonConfig.appId,
//       authCode: authCode
//     }
//   })
// }

// //校验平台访问令牌  2.6
// export const checkFWCode = async (accessToken) => {
//   return axios({
//     url: commonConfig.checkFWCode,
//     method: 'post',
//     data: {
//       appId: commonConfig.appId,
//       accessToken: accessToken
//     }
//   })
// }

// //刷新平台访问令牌  2.7
// export const refreshFWCode = async (refreshToken) => {
//   return axios({
//     url: commonConfig.refreshFWCode,
//     method: 'post',
//     data: {
//       appId: commonConfig.appId,
//       refreshToken: refreshToken
//     }
//   })
// }

// //获取⽤户访问令牌  userAccessToken
// export const getUserCode = async (accessToken, requestCode) => {
//   return axios({
//     url: commonConfig.getUserCode,
//     method: 'post',
//     data: {
//       appId: commonConfig.appId,
//       accessToken: accessToken,
//       requestCode: requestCode
//     }
//   })
// }

// // 获取⽤户基本信息
// export const getUserMessage = async (userAccessToken) => {
//   return axios({
//     url: commonConfig.getUserMessage,
//     method: 'post',
//     data: {
//       appId: commonConfig.appId,
//       userAccessToken: userAccessToken,
//     }
//   })
// }

export const getUserInfo = (requestCode) => {
  return axios({
    url: commonConfig.backHomeURL + `/wx/lx/getUserInfo?requestCode=${requestCode}`,
    method: "get",
  })
}