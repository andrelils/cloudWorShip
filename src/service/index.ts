import ajax from "../config/axios.config";
import axios from "axios";
import { commonConfig } from "../shared/config/index";

// 详情页面获取配置信息接口
export const getConfig = async () => {
  return ajax({
    url: "/api/auth/bootstrap/itsc-ticket-center",
    method: "get",
  });
};
