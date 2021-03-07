import React, { useEffect } from "react";
import "../SweepingOptions/index.less";
import { CommonNavBar } from "../../components/index";
import { useHistory } from "react-router-dom";
import { initCode, getUserInfo } from "../../service/index";
import { commonConfig } from '../../shared/config/index'
import { Toast } from "antd-mobile";

const Home = () => {
  const history = useHistory();

  useEffect(() => {
    let requestCode = ""
    let ls = commonConfig.ls
    initCode().then((res: any) => {
      ls.config({
        appId: commonConfig.appId,
        initCode: res.data.initCode
      })
      //成功回调
      ls.ready(function () {
        //⾃定义逻辑，如：
        //1.调⽤ JSSDK ⾥提供的交互⽅法
        //2.如需获取⽤户信息，需要在此处调⽤ ls.userAuth(Objectobject)⽅法和后续操作。
        ls.userAuth({ appId: commonConfig.appId }, function (res: any) {
          if (res.code === 200) {
            requestCode = res.data.requestCode;
            getUserInfo(requestCode).then((res: any) => {
              sessionStorage.setItem("cloud_token", res.data.data.openId)
              sessionStorage.setItem("nickname", res.data.data.nickname)
              sessionStorage.setItem("login_flag", "1");
            });
          } else {
            Toast.fail('测试apk不提供实名认证服务，请申请测试账号调试', 2)
          }
        });
      });
      //失败回调
      ls.error(function (res) {
        //错误处理
        Toast.fail(res, 2)
      });
    });
    // 测试
    if (commonConfig.ifText) {
      sessionStorage.setItem("cloud_token", "o7UIL40VlE6XJqNDlwcRhb3afCOk")
      sessionStorage.setItem("login_flag", "1");
    }
  }, []);

  return (
    <div className="sweeping-options">
      <CommonNavBar title="云祭扫"></CommonNavBar>
      <img src="/imgs/logo.png" alt="" />
      <div
        className="qy-btn btn"
        onClick={() => {
          history.push("/list");
        }}
      >
        亲友祭扫
      </div>
      <div className="common-btn btn" onClick={() => Toast.fail("敬请期待！")}>
        公共祭扫
      </div>
      {/* <div className="float-num">{num}人参与祭扫</div> */}
    </div>
  );
};

export default Home;
