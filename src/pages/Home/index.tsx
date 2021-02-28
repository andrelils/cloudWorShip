import React, { useEffect } from "react";
import "./index.less";
import { CommonNavBar } from "../../components/index";
import { useHistory } from "react-router-dom";
import { initCode } from "../../service/index";

const Home = (): React.ReactElement => {
  const history = useHistory();

  useEffect(() => {
    initCode().then((res: any) => {
      sessionStorage.setItem("cloud_token", "o7UIL40VlE6XJqNDlwcRhb3afCOk");
      sessionStorage.setItem("login_flag", "1");
    });
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
