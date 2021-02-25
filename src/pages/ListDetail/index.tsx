import React, { useState } from "react";
import { CommonNavBar } from "../../components/index";
import "./index.less";
import { useHistory } from "react-router-dom";

const ListDetail = (): React.ReactElement => {
  const history = useHistory();
  const [list, setList] = useState([
    {
      id: "1",
      name: "唐纳德·特朗普",
      begin_date: "1946年12月22日",
      end_date: "2020年11月11月",
      node:
        "世界头号投机分子，苏联克格勃重点培养的线人，中国人民的敌人，美利坚合众国造反派领头人，国会山最美风景线的总导演",
      img_src: "/imgs/1.jpg",
    },
    {
      id: "1",
      name: "唐纳德·特朗普",
      begin_date: "1946年12月22日",
      end_date: "2020年11月11月",
      node:
        "世界头号投机分子，苏联克格勃重点培养的线人，中国人民的敌人，美利坚合众国造反派领头人，国会山最美风景线的总导演",
      img_src: "/imgs/1.jpg",
    },
  ]);
  return (
    <div className="page-list-detail">
      <CommonNavBar title="云祭扫"></CommonNavBar>
      <div className="list-top">
        <img src="/imgs/list-bg.jpg" alt="" />
        <div className="list-btn-all">
          <img
            className="list-btn"
            src="/imgs/add.png"
            alt=""
            onClick={() => {
              history.push("/editeDetail");
            }}
          ></img>
          <span>祈福堂</span>
        </div>
      </div>
      <div className="list-container">
        {list.map((item, index) => {
          return (
            <div className="container-item" key={item + "_" + index}>
              <div className="item-top">
                <div className="item-pic">
                  <img src={item.img_src} alt="" />
                </div>
                <div className="top-detail">
                  <div className="detail-name">
                    <span>{item.name}</span>
                    <div className="item-edit">
                      <img alt="" src="/imgs/edit.png" />
                    </div>
                  </div>
                  <span className="item-date">
                    {item.begin_date}—{item.end_date}
                  </span>
                  <span className="item-node">生平简介：{item.node}</span>
                </div>
              </div>
              <div className="item-footer">
                <div
                  className="item-shared"
                  onClick={() => {
                    history.push(`/editeDetail?id=${item.id}`);
                  }}
                >
                  编辑祈福堂
                </div>
                <div className="footer-line"></div>
                <div
                  className="item-enter"
                  onClick={() => {
                    history.push(`/hall/${item.id}`);
                  }}
                >
                  进入祈福堂
                </div>
              </div>
            </div>
          );
        })}
        {list.length == 0 && (
          <div className="empty">
            <img src="/imgs/empty.png" alt="" />
            <span>请先创建祈福堂</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListDetail;
