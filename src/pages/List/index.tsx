import React, { useState, useEffect } from "react";
import { CommonNavBar } from "../../components/index";
import "./index.less";
import { useHistory } from "react-router-dom";
import { getCemeteryList } from "../../service/index";

const List = (): React.ReactElement => {
  const history = useHistory();
  const [list, setList] = useState([]);

  useEffect(() => {
    getCemeteryList().then((res: any) => {
      setList(res.data.data);
    });
  }, []);
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
                history.push(`/listDetail/${item.cemeteryCode}`);
              }}
            >
              <div className="item-img">
                <img src={item.cemeteryPic} alt="" />
              </div>
              <div className="item-text">{item.cemeteryName}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
