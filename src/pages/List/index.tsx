import React, { useState } from "react";
import { CommonNavBar } from "../../components/index";
import "./index.less";
import { useHistory } from "react-router-dom";

const List = (): React.ReactElement => {
  const history = useHistory();
  const [list, setList] = useState([
    {
      id: "1",
      name: "青城公墓",
      img_src: "/imgs/u54.svg",
    },
    {
      id: "2",
      name: "青城公墓",
      img_src: "/imgs/u54.svg",
    },
    {
      id: "3",
      name: "青城公墓",
      img_src: "/imgs/u54.svg",
    },
    {
      id: "3",
      name: "青城公墓",
      img_src: "/imgs/u54.svg",
    },
  ]);
  return (
    <div className="page-list">
      <CommonNavBar title="云祭扫"></CommonNavBar>
      <div className="list-top">
        <img src="/imgs/list-bg.jpg" alt="" />
      </div>
      <div className="list-container">
        {list.map((item, index) => {
          return (
            <div
              className="container-item"
              key={item + "_" + index}
              onClick={() => {
                history.push(`/listDetail/${item.id}`);
              }}
            >
              <div className="item-img">
                <img src={item.img_src} alt="" />
              </div>
              <div className="item-text">{item.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
