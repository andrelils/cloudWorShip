import React, { useEffect } from "react";
import "./index.less";
import { CommonNavBar } from "../../components/index";
import { useHistory } from "react-router-dom";
import { initCode } from "../../service/index";
import { commonConfig } from '../../shared/config/index'

const Home = () => {
  const history = useHistory();

  useEffect(() => {
    let ls = commonConfig.ls
    initCode().then((res: any) => {
      ls.config({
        debug: true, //开发时建议把调试模式开启
        appId: commonConfig.appId,
        initCode: res.data.initCode
      })
      //成功回调
      ls.ready(function () {
        //⾃定义逻辑，如：
        //1.调⽤ JSSDK ⾥提供的交互⽅法
        //2.如需获取⽤户信息，需要在此处调⽤ ls.userAuth(Objectobject)⽅法和后续操作。
        ls.userAuth({ appId: commonConfig.appId }, function (res) {
          if (res.code === 200) {
            sessionStorage.setItem("cloud_token", res.data.requestCode);
            sessionStorage.setItem("login_flag", "1");
          }
        });

      });
      //失败回调
      ls.error(function (res) {
        //错误处理
      });
    });
    // 测试
    if (commonConfig.ifText) {
      sessionStorage.setItem("cloud_token", "o7UIL40VlE6XJqNDlwcRhb3afCOk")
    }
  }, []);

  return (
    <div className="page-home">
      <CommonNavBar title="祭扫预约"></CommonNavBar>
      <div className="home-top">
        <img src="/imgs/home-bg.jpg" alt="" />
        <span>清明</span>
      </div>
      <div className="home-container">
        <div className="container-item">
          <div className="item-icon">
            <img src="/imgs/home-1.png" alt="" />
          </div>
          <div className="item-container">
            <div className="item-title">扫墓预约</div>
            <div className="item-memo">可进行扫墓预约事项</div>
          </div>
        </div>
        <div
          className="container-item"
          onClick={() => {
            history.push("/sweepingOptions");
          }}
        >
          <div className="item-icon">
            <img src="/imgs/home-2.png" alt="" />
          </div>
          <div className="item-container">
            <div className="item-title">云祭扫</div>
            <div className="item-memo">可进行亲友祈福</div>
          </div>
        </div>
        <div className="container-item">
          <div className="item-icon">
            <img src="/imgs/home-3.png" alt="" />
          </div>
          <div className="item-container">
            <div className="item-title">代为祭扫</div>
            <div className="item-memo">可进行代为祭扫预约</div>
          </div>
        </div>
        <div className="container-item">
          <div className="item-icon">
            <img src="/imgs/home-4.png" alt="" />
          </div>
          <div className="item-container">
            <div className="item-title">我的预约</div>
            <div className="item-memo">可查询申请的预约事项</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
