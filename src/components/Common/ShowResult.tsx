import React from "react";
import { Result } from "antd-mobile";
import "./showResult.less";
import { commonConfig } from "../../shared/config/index";

export interface ShowResultProps {
  type: "empty" | "404";
}

const showResultConfiguration = [
  {
    type: "empty",
    imgSrc: commonConfig.staticBaseURL + "/image/empty.svg",
    text: "暂无数据",
  },
  {
    type: "404",
    imgSrc: commonConfig.staticBaseURL + "/image/404.svg",
    text: "404！",
  },
];

const ShowResult = (props: ShowResultProps) => {
  let target = showResultConfiguration.find(
    (c) => c.type === props.type ?? "empty"
  ) as any;
  if (!target) {
    target = showResultConfiguration[0];
  }
  const myImg = (src: any) => (
    <img src={src} style={{ width: "100px", height: "auto" }} alt="" />
  );

  return <Result img={myImg(target.imgSrc)} title={target.text} />;
};

export default ShowResult;
