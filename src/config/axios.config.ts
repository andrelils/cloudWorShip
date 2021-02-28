import axios from "axios";
import { Toast } from "antd-mobile";
import { TOAST_DURATION } from "../shared/consts/index";
import { commonConfig } from "../shared/config/index";
function ajax(config: any) {
  return new Promise((resolve, reject) => {
    axios({
      method: config.method,
      url: config.url,
      params: config.params ? config.params : null,
      data: config.data ? config.data : null,
      headers: sessionStorage.getItem("cloud_token")
        ? { "LX-OPENID": sessionStorage.getItem("cloud_token") }
        : null,
      baseURL: commonConfig.baseURL,
    })
      .then((res) => {
        if (res.data.status === 1) {
          resolve(res.data);
        } else {
          Toast.fail(res.data.msg, TOAST_DURATION);
        }
      })
      .catch((err) => {
        let response: any = err.response;
        if (response) {
          switch (response.status) {
            case 401:
              Toast.fail(response.data.error, TOAST_DURATION);
              break;
            case 500:
              Toast.fail(response.data.error, TOAST_DURATION);
              break;
            case 504:
              Toast.fail(response.data.error, TOAST_DURATION);
              break;
            default:
              Toast.fail(response.data.error, TOAST_DURATION);
              break;
          }
        } else {
          Toast.fail("请求超时", TOAST_DURATION);
        }
        return reject(err);
      });
  });
}

export default ajax;
