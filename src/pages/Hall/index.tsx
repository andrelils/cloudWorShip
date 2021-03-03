import React, { useState, useEffect, useRef } from "react";
import { CommonNavBar } from "../../components/index";
import "./index.less";
import { Modal, Stepper, Toast } from "antd-mobile";
import { useHistory, useParams } from "react-router-dom";
import { getCemeteryDetail, getSayList, sendSay, getPicOrMusic } from "../../service/index";
import { commonConfig } from "../../shared/config/index";
let ifLoop = true

const Hall = () => {
  const [ifPlay, setIfPlay] = useState(false);
  const { id } = useParams();
  const [nickName, setNickName] = useState<string>("")
  const [modalFormData, setModalFormData] = useState({
    visible: false,
    type: "",
    lwType: 0,
    send_num: 1,
  });
  const [sayList, setSayList] = useState<any[]>([]);
  const [formData, setFormData] = useState<any>({
    type: "1",
    name: "",
    name2: "",
    birthday: "",
    goneday: "",
    birthday2: "",
    goneday2: "",
    life: "",
    back: "",
    music: "",
  });

  const getDMList = (type) => {
    getSayList(id).then((res: any) => {
      setSayList(res.data.items);
      if (ifLoop && type === "1") {
        setTimeout(() => {
          getDMList("1")
        }, commonConfig.loopTime)
      }
    });
  };

  useEffect(() => {
    setNickName(sessionStorage.getItem("nickName"))
    ifLoop = true
    getCemeteryDetail(id).then((res: any) => {
      let data: any = {};
      if (res.data.item.type === "2") {
        Promise.all([
          getPicOrMusic(res.data.item.back), getPicOrMusic(res.data.item.music)
        ]).then((val: any[]) => {
          data = {
            type: "2",
            name: res.data.item.name.trim().split(",")[0],
            name2: res.data.item.name.trim().split(",")[1],
            life: res.data.item.life,
            birthday: res.data.item.birthday.trim().split(",")[0],
            birthday2: res.data.item.birthday.trim().split(",")[1],
            goneday: res.data.item.goneday.trim().split(",")[0],
            goneday2: res.data.item.goneday.trim().split(",")[1],
            photo: `${commonConfig.imgBaseUrl + res.data.item.photo.trim().split(",")[0]
              }`,
            photo2: `${commonConfig.imgBaseUrl + res.data.item.photo.trim().split(",")[1]
              }`,
            back: commonConfig.imgBaseUrl + val[0].data.resId,
            music: commonConfig.musicBaseUrl + val[1].data.resId,
          };
          setFormData(data);
        })
      } else {
        Promise.all([
          getPicOrMusic(res.data.item.back), getPicOrMusic(res.data.item.music)
        ]).then((val: any[]) => {
          data = {
            ...res.data.item,
            back: commonConfig.imgBaseUrl + val[0].data.resId,
            music: commonConfig.musicBaseUrl + val[1].data.resId,
            photo: commonConfig.imgBaseUrl + res.data.item.photo,
          }
          setFormData(data);
        })
      }
    });
    getDMList("1");
    return () => {
      ifLoop = false
    }
  }, []);

  return (
    <div className="page-hall ">
      <CommonNavBar title="祈福堂"></CommonNavBar>
      <div className="hall-container">
        <div className="dm">
          {sayList.map((item: any) => {
            // 留言
            if (item.type === 0) {
              return (
                <div className="dm-item" key={item.id}>
                  <div className="hall-note">
                    <span className="note-title">{item.name}：</span>
                    <span style={{ flex: 1 }}>{item.content}</span>
                  </div>
                </div>
              );
              //花圈
            } else if (item.type === 1) {
              return (
                <div className="dm-item" key={item.id}>
                  <div className="hall-note">
                    <div className="lw-title">
                      <span>{item.name}</span>
                      <span className="lw-name">花圈</span>
                    </div>
                    <div className="lw-num">
                      <img src="/imgs/lw-hua.png" alt="" />
                      <span className="num">x{item.content}</span>
                    </div>
                  </div>
                </div>
              );
              //蜡烛
            } else if (item.type === 2) {
              return (
                <div className="dm-item" key={item.id}>
                  <div className="hall-note">
                    <div className="lw-title">
                      <span>{item.name}</span>
                      <span className="lw-name">蜡烛</span>
                    </div>
                    <div className="lw-num">
                      <img src="/imgs/lw-lazhu.png" alt="" />
                      <span className="num">x{item.content}</span>
                    </div>
                  </div>
                </div>
              );
              //上香
            } else if (item.type === 3) {
              return (
                <div className="dm-item" key={item.id}>
                  <div className="hall-note">
                    <div className="lw-title">
                      <span>{item.name}</span>
                      <span className="lw-name">上香</span>
                    </div>
                    <div className="lw-num">
                      <img src="/imgs/lw-xl.png" alt="" />
                      <span className="num">x{item.content}</span>
                    </div>
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
        <div className="hall-bg">
          <img src={formData.back} alt="" />
          <div className="tx-group">
            <div className="tx-img">
              <img className="tx-bg" src="/imgs/xiangkuang.png" alt="" />
              <img className="tx-pic" src={formData.photo} alt="" />
              <div className="tx-name">{formData.name}</div>
            </div>
            {
              formData.type === "2" && <div className="tx-img">
                <img className="tx-bg" src="/imgs/xiangkuang.png" alt="" />
                <img className="tx-pic" src={formData.photo2} alt="" />
                <div className="tx-name">{formData.name2}</div>
              </div>
            }

          </div>
        </div>
        <div className="hall-footer">
          <div className="hall-note">
            <span className="note-title">生平简介：</span>
            {formData.life}
          </div>
          <div className="operate-group">
            <div className="input-dm">
              <input
                placeholder="发送祝福"
                onKeyDown={(e: any) => {
                  if (e.key === "Enter") {
                    sendSay(id, 0, nickName, e.target.value).then(() => {
                      e.target.value = "";
                      Toast.success("发送成功", 1);
                      getDMList("0");
                    });
                  }
                }}
              />
            </div>
            <div
              className="img-body"
              onClick={() => {
                setModalFormData({
                  ...modalFormData,
                  visible: true,
                  lwType: 1,
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
                  lwType: 2,
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
                  lwType: 3,
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
          {ifPlay && <audio loop src={formData.music} autoPlay></audio>}
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
                  sendSay(id, modalFormData.lwType, nickName, modalFormData.send_num).then(() => {
                    Toast.success("发送成功", 1);
                    getDMList("0");
                    setModalFormData({
                      ...modalFormData,
                      visible: false,
                      send_num: 1,
                    });
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
