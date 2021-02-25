import React, { useState, useEffect, useRef } from "react";
import { CommonNavBar } from "../../components/index";
import "./index.less";
import { Modal, Stepper, Toast } from "antd-mobile";
import { useHistory } from "react-router-dom";

const Hall = () => {
  const [ifPlay, setIfPlay] = useState(false);
  const [modalFormData, setModalFormData] = useState({
    visible: false,
    type: "",
    send_num: 1,
  });
  const [formData, setFormData] = useState({
    bg: "/imgs/hall-bg.png",
    tx1: "/imgs/tx1.png",
    tx2: "/imgs/tx2.png",
    music:
      "https://demo.dj63.com//2016/串烧舞曲/20161108/[男人声线]全国语音乐热播情歌歌曲连版串烧.mp3",
    note:
      "世界头号投机分子，苏联克格重点勃培养的线人，中国人民的敌人，美利坚合众国造反派领头人，国会山最美风景线的总导演。世界头号投机分子，苏联克格勃重点培养的线人，中国人民的敌人，美利坚合众国造反派领头人，国会山最美风景线的总导演。",
  });
  const ref: any = useRef();

  return (
    <div className="page-hall ">
      <CommonNavBar title="祈福堂"></CommonNavBar>
      <div className="hall-container">
        <div className="dm">
          <div className="dm-item">
            <div className="hall-note">
              <div className="lw-title">
                <span>随风飘散</span>
                <span className="lw-name">香烛</span>
              </div>
              <div className="lw-num">
                <img src="/imgs/lw-lazhu.png" alt="" />
                <span className="num">x 2</span>
              </div>
            </div>
          </div>
          <div className="dm-item">
            <div className="hall-note">
              <span className="note-title">随风飘散：</span>
              走好，逝者安息~~
            </div>
          </div>
          <div className="dm-item">
            <div className="hall-note">
              <span className="note-title">随风飘散：</span>
              不要牵挂我们，逝者安息，阿门~
            </div>
          </div>
        </div>
        <div className="hall-bg">
          <img src={formData.bg} alt="" />
          <div className="tx-group">
            <img src={formData.tx1} alt="" />
            <img src={formData.tx2} alt="" />
          </div>
        </div>
        <div className="hall-footer">
          <div className="hall-note">
            <span className="note-title">生平简介：</span>
            {formData.note}
          </div>
          <div className="operate-group">
            <div className="input-dm">
              <input placeholder="发送祝福" />
            </div>
            <div
              className="img-body"
              onClick={() => {
                setModalFormData({
                  ...modalFormData,
                  visible: true,
                  type: "/imgs/hua.png",
                });
              }}
            >
              <img src="/imgs/hua.png" alt="" />
            </div>
            <div
              className="img-body"
              onClick={() => {
                setModalFormData({
                  ...modalFormData,
                  visible: true,
                  type: "/imgs/lazhu.png",
                });
              }}
            >
              <img src="/imgs/lazhu.png" alt="" />
            </div>
            <div
              className="img-body"
              onClick={() => {
                setModalFormData({
                  ...modalFormData,
                  visible: true,
                  type: "/imgs/xl.png",
                });
              }}
            >
              <img src="/imgs/xl.png" alt="" />
            </div>
            <div className="img-body" onClick={() => setIfPlay(!ifPlay)}>
              <img
                src={ifPlay ? "/imgs/music.png" : "/imgs/close-music.png"}
                alt=""
              />
            </div>
          </div>
          {ifPlay && <audio src={formData.music} autoPlay></audio>}
          <Modal
            className="lw-modal"
            popup
            visible={modalFormData.visible}
            animationType="slide-up"
          >
            <div className="lw-container">
              <div className="lw-img">
                <img src={modalFormData.type} alt="" />
              </div>
              <div className="send-num">
                <Stepper
                  showNumber
                  min={1}
                  max={5}
                  value={modalFormData.send_num}
                  onChange={(e) =>
                    setModalFormData({ ...modalFormData, send_num: e })
                  }
                ></Stepper>
              </div>
              <span className="message">*最多发送5份</span>
            </div>
            <div className="modal-footer">
              <div
                className="send"
                onClick={() => {
                  Toast.success("发送成功", 1);
                  setModalFormData({
                    ...modalFormData,
                    visible: false,
                    send_num: 1,
                  });
                }}
              >
                发送
              </div>
              <div
                className="cancel"
                onClick={() =>
                  setModalFormData({
                    ...modalFormData,
                    visible: false,
                    send_num: 1,
                  })
                }
              >
                取消
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Hall;
