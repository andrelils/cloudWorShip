import React from "react";
import "./commonList.less";

const CommonList = (props: any) => {
  const { title } = props;
  return (
    <div className="list-wrap">
      <div className="list-title">{title}：</div>
      <div className="list-content">{props.children ?? ""}</div>
    </div>
  );
};

export default CommonList;
