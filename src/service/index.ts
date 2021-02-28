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
    url:
      "https://www.fastmock.site/mock/7f0cf10b888d227e74f3c408413b8cd5/mobile/api/cemetery/anon/cemetery/cemeteryList",
    method: "post",
  });
};

export const uploadImg = async (formData) => {
  return axios({
    url: "/wx/public/resource/upload",
    method: "post",
    data: formData,
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
