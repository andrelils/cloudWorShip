import React, { useState } from "react";
import { CommonNavBar } from "../../components/index";
import "./index.less";
import { useHistory } from "react-router-dom";

const ListDetail = (): React.ReactElement => {
  const history = useHistory();
  const [list, setList] = useState([
    {
      id: "1",
      name: "青城公墓",
      begin_date: "1946-44-44",
      end_date: "2020-11-11",
      node:
        "世界头号投机分子，苏联克格勃重点培养的线人，中国人民的敌人，美利坚合众国造反派领头人，国会山最美风景线的总导演",
      img_src: "/imgs/u54.svg",
    },
    {
      id: "1",
      name: "青城公墓",
      begin_date: "1946-44-44",
      end_date: "2020-11-11",
      node:
        "世界头号投机分子，苏联克格勃重点培养的线人，中国人民的敌人，美利坚合众国造反派领头人，国会山最美风景线的总导演",
      img_src: "/imgs/u54.svg",
    },
  ]);
  return (
    <div className="page-list-detail">
      <CommonNavBar title="云祭扫"></CommonNavBar>
      <div className="list-top">
        <img src="/imgs/list-bg.jpg" alt="" />
        <div className="list-btn">
          <div className="add-icon">+</div>
          <span>祈福堂</span>
        </div>
      </div>
      <div className="list-container">
        {list.map((item, index) => {
          return (
            <div className="container-item" key={item + "_" + index}>
              <div className="item-top">
                <div className="item-img">
                  <img src={item.img_src} alt="" />
                </div>
                <div className="top-detail">
                  <div className="detail-name">
                    <span>{item.name}</span>
                    <div className="item-edit">
                      <img alt="" src="/imgs/edit.png" />
                    </div>
                  </div>
                  <span>出生日期：{item.begin_date}</span>
                  <span>逝世日期：{item.end_date}</span>
                  <span>生平简介：{item.node}</span>
                </div>
              </div>
              <div className="item-footer">
                <div className="item-shared">分享祈福堂</div>
                <div className="item-enter">进入祈福堂</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListDetail;
