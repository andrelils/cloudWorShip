import React, { useState, useEffect, useRef } from "react";
import { CommonNavBar } from "../../components/index";
import "./index.less";
import { useHistory } from "react-router-dom";

const Hall = () => {
  const [ifPlay, setIfPlay] = useState(false);
  const [formData, setFormData] = useState({
    bg: "/imgs/bg.png",
    tx1: "/imgs/tx.svg",
    music:
      "https://demo.dj63.com//2016/串烧舞曲/20161108/[男人声线]全国语音乐热播情歌歌曲连版串烧.mp3",
    note:
      "世界头号投机分子，苏联克格重点勃培养的线人，中国人民的敌人，美利坚合众国造反派领头人，国会山最美风景线的总导演。世界头号投机分子，苏联克格勃重点培养的线人，中国人民的敌人，美利坚合众国造反派领头人，国会山最美风景线的总导演。",
  });
  const ref: any = useRef();

  useEffect(() => {
    ref.current.scrollTop = ref.current.scrollHeight;
  }, []);

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
          <div className="dm" ref={ref}>
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
          <div className="operate-group">
            <img
              src={ifPlay ? "/imgs/music.png" : "/imgs/close-music.png"}
              alt=""
              onClick={() => setIfPlay(!ifPlay)}
            />
            <img src="/imgs/music.png" alt="" />
            <img src="/imgs/music.png" alt="" />
            <img src="/imgs/music.png" alt="" />
            <img src="/imgs/music.png" alt="" />
          </div>
          {ifPlay && <audio src={formData.music} autoPlay></audio>}
        </div>
      </div>
    </div>
  );
};

export default Hall;
