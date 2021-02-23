import React, { useState } from "react";
import { CommonNavBar } from "../../components/index";
import "./index.less";
import { useHistory } from "react-router-dom";

const Hall = () => {
  const [formData, setFormData] = useState({
    bg: "/imgs/bg.png",
    tx1: "/imgs/tx.svg",
    note:
      "世界头号投机分子，苏联克格重点勃培养的线人，中国人民的敌人，美利坚合众国造反派领头人，国会山最美风景线的总导演。世界头号投机分子，苏联克格勃重点培养的线人，中国人民的敌人，美利坚合众国造反派领头人，国会山最美风景线的总导演。",
  });

  return (
    <div className="page-hall ">
      <CommonNavBar title="祈福堂"></CommonNavBar>
      <div className="hall-container">
        <div className="hall-bg">
          <img src={formData.bg} alt="" />
          <div className="tx-group">
            <img src={formData.tx1} alt="" />
            <img src={formData.tx1} alt="" />
          </div>
          <div className="dm">
            <div className="dm-item">张三丰：一路走好</div>
            <div className="dm-item">
              张三丰：
              <img src="/imgs/hua.png" alt="" />
              <img src="/imgs/hua.png" alt="" />
              <img src="/imgs/hua.png" alt="" />
            </div>
            <div className="dm-item">张维维：一路走好吧您呢</div>
            <div className="dm-item">
              张三丰：
              <img src="/imgs/hua.png" alt="" />
              <img src="/imgs/hua.png" alt="" />
              <img src="/imgs/hua.png" alt="" />
            </div>
            <div className="dm-item">
              张三丰：
              <img src="/imgs/hua.png" alt="" />
              <img src="/imgs/hua.png" alt="" />
              <img src="/imgs/hua.png" alt="" />
            </div>
            <div className="dm-item">
              张三丰：
              <img src="/imgs/hua.png" alt="" />
              <img src="/imgs/hua.png" alt="" />
              <img src="/imgs/hua.png" alt="" />
            </div>
          </div>
        </div>
        <div className="hall-footer">
          <span>
            生平简介：<br></br>
            {formData.note}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Hall;
