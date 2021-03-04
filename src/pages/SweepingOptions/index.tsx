import React, { useState } from "react";
import { CommonNavBar } from "../../components/index";
import "./index.less";
import { useHistory } from "react-router-dom";
import { Toast } from "antd-mobile";

const SweepingOptions = (): React.ReactElement => {
  const [num, setNum] = useState<string>("1,736,458");
  const hitory = useHistory();
  return (
    <div className="sweeping-options">
      <CommonNavBar title="云祭扫"></CommonNavBar>
      <img src="/imgs/logo.png" alt="" />
      <div
        className="qy-btn btn"
        onClick={() => {
          hitory.push("/list");
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

export default SweepingOptions;
