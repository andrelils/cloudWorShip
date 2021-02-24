import React, { useState, useEffect } from "react";
import { CommonNavBar } from "../../components/index";
import "./index.less";
import {
  ImagePicker,
  Toast,
  InputItem,
  List,
  TextareaItem,
  Button,
} from "antd-mobile";
import { Radio } from "antd";
import "antd/lib/upload/style/css";
import { useHistory } from "react-router-dom";

function getQuery(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg); //从?之后开始匹配如getQuery(courseid)返回一个数组["courseid=8","","8","&",index:0,input:"courseid=8"]
  if (r != null) return unescape(r[2]);
  return null;
}

const EditeDetail = (): React.ReactElement => {
  const [fileList, setFileList] = useState([]);
  const [formData, setFormData] = useState({
    type: "1",
    name1: "",
    name2: "",
    note: "",
    bg: "",
    music: "",
  });

  const onChange = (files, type, index) => {
    setFileList(files);
  };
  const history = useHistory();

  const upload = () => {
    // var formData = new FormData();
    // formData.append("file", e.target.files[0]);
    // formData.append("processInstanceId", instanceId);
    // formData.append("fileCategory", "added");
    // uploadFile(formData)
    //   .then((res: any) => {
    //     if (res.data.code === 0) {
    //       Toast.success("上传成功", TOAST_DURATION);
    //       initList();
    //     } else {
    //       Toast.success("上传失败", TOAST_DURATION);
    //     }
    //   })
    //   .catch((err) => {
    //     let response: any = err.response;
    //     Toast.fail(response.data.error, TOAST_DURATION);
    //   });
  };

  useEffect(() => {
    if (getQuery("id") === null) {
      setFormData({
        type: "1",
        name1: "",
        name2: "",
        note: "",
        bg: "",
        music: "",
      });
    } else {
      setFormData({
        type: "2",
        name1: "特朗普",
        name2: "特朗普",
        note: "这就是模拟的简介",
        bg: "1",
        music: "1",
      });
      setFileList([
        {
          url: "https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg",
          id: "2121",
        },
        {
          url: "https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg",
          id: "2121",
        },
      ]);
    }
  }, []);

  return (
    <div className="edite-detail">
      <CommonNavBar title="云祭扫"></CommonNavBar>
      <div className="list-top">
        <img src="/imgs/edit-top.jpg" alt="" />
        <div className="top-head">
          <ImagePicker
            className={
              fileList.length === 0
                ? "head-upload head-one"
                : formData.type === "1"
                ? "head-upload head-one"
                : "head-upload"
            }
            files={fileList}
            onChange={onChange}
            onImageClick={(index, fs) => console.log(index, fs)}
            selectable={
              formData.type === "1" ? fileList.length < 1 : fileList.length < 2
            }
          />
        </div>
      </div>
      <div className="detail-container">
        <Radio.Group
          value={formData.type}
          onChange={(e) => {
            setFormData({ ...formData, type: e.target.value });
          }}
        >
          <Radio value="1">单人堂</Radio>
          <Radio value="2">两人堂</Radio>
        </Radio.Group>

        <div className="name-group">
          <img src="imgs/people.png" alt="" />
          <div className="name-input">
            <InputItem
              value={formData.name1}
              onChange={(e) => {
                setFormData({ ...formData, name1: e });
              }}
              placeholder="请输入名字"
            ></InputItem>
            {formData.type === "2" && (
              <InputItem
                value={formData.name2}
                onChange={(e) => {
                  setFormData({ ...formData, name2: e });
                }}
                placeholder="请输入名字"
              ></InputItem>
            )}
          </div>
        </div>

        <div className="detail-node name-group">
          <img src="imgs/node.png" alt="" />
          <TextareaItem
            placeholder="请输入简介"
            value={formData.note}
            rows={2}
            onChange={(e) => {
              setFormData({ ...formData, note: e });
            }}
          ></TextareaItem>
        </div>

        <div className="detail-bg">
          <span className="bg-title">祈福堂背景</span>
          <Radio.Group
            value={formData.bg}
            onChange={(e) => {
              setFormData({ ...formData, bg: e.target.value });
            }}
          >
            <div className="bg-radio">
              <img src="imgs/bg.png" alt="" />
              <Radio value="1">墓园</Radio>
            </div>
            <div className="bg-radio">
              <img src="imgs/bg.png" alt="" />
              <Radio value="2">墓园</Radio>
            </div>
            <div className="bg-radio">
              <img src="imgs/bg.png" alt="" />
              <Radio value="3">墓园</Radio>
            </div>
          </Radio.Group>
        </div>

        <div className="detail-music">
          <span className="music-title">祈福堂音乐</span>
          <div className="music-group">
            <div
              className={formData.music === "1" && "active"}
              onClick={() => {
                setFormData({ ...formData, music: "1" });
              }}
            >
              祭奠
            </div>
            <div
              className={formData.music === "2" && "active"}
              onClick={() => {
                setFormData({ ...formData, music: "2" });
              }}
            >
              念亲恩
            </div>
            <div
              className={formData.music === "3" && "active"}
              onClick={() => {
                setFormData({ ...formData, music: "3" });
              }}
            >
              妈妈我想你
            </div>
            <div
              className={formData.music === "4" && "active"}
              onClick={() => {
                setFormData({ ...formData, music: "4" });
              }}
            >
              爸爸
            </div>
            <div
              className={formData.music === "5" && "active"}
              onClick={() => {
                setFormData({ ...formData, music: "5" });
              }}
            >
              真的好想你
            </div>
          </div>
        </div>

        <div className="btn-footer">
          <Button
            className="btn-del"
            onClick={() => {
              Toast.success("删除成功");
              history.goBack();
            }}
          >
            删除
          </Button>
          <Button
            className="btn-save"
            onClick={() => {
              Toast.success("保存成功");
              history.goBack();
            }}
          >
            保存
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditeDetail;
