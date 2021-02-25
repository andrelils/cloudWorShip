import React, { useState, useEffect } from "react";
import { CommonNavBar } from "../../components/index";
import "./index.less";
import {
  ImagePicker,
  Toast,
  InputItem,
  DatePicker,
  List,
  TextareaItem,
  Button,
  Modal,
} from "antd-mobile";
import moment from "moment";
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
    begin_date1: "",
    end_date1: "",
    begin_date2: "",
    end_date2: "",
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
        begin_date1: "",
        end_date1: "",
        begin_date2: "",
        end_date2: "",
        note: "",
        bg: "",
        music: "",
      });
    } else {
      setFormData({
        type: "2",
        name1: "特朗普",
        name2: "特朗普",
        begin_date1: "1111-11-15",
        end_date1: "2222-11-22",
        begin_date2: "1111-11-15",
        end_date2: "2222-11-22",
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
        <div className="radio-group">
          <div
            className={formData.type === "1" ? "active" : null}
            onClick={() => {
              setFormData({ ...formData, type: "1" });
            }}
          >
            单人堂
          </div>
          <div className="line"></div>
          <div
            className={formData.type === "2" ? "active" : null}
            onClick={() => {
              setFormData({ ...formData, type: "2" });
            }}
          >
            两人堂
          </div>
        </div>
        <div className="detail-title">
          <img src="/imgs/detail-title.png" alt="" />
          <span>基本信息</span>
        </div>
        <InputItem
          value={formData.name1}
          onChange={(e) => {
            setFormData({ ...formData, name1: e });
          }}
          placeholder="请输入逝者名字"
        >
          逝者姓名
        </InputItem>
        <DatePicker
          mode="date"
          minDate={new Date(1111, 1, 1)}
          maxDate={new Date()}
          extra={"未输入"}
          title="Select Date"
          format="YYYY-MM-DD"
          value={
            formData.begin_date1 === ""
              ? undefined
              : new Date(formData.begin_date1)
          }
          onChange={(date) =>
            setFormData({
              ...formData,
              begin_date1: moment(date).format("YYYY-MM-DD"),
            })
          }
        >
          <List.Item>出生日期</List.Item>
        </DatePicker>
        <DatePicker
          mode="date"
          minDate={new Date(1111, 1, 1)}
          maxDate={new Date()}
          extra={"未输入"}
          title="Select Date"
          format="YYYY-MM-DD"
          value={
            formData.end_date1 === ""
              ? undefined
              : new Date(formData.begin_date1)
          }
          onChange={(date) =>
            setFormData({
              ...formData,
              end_date1: moment(date).format("YYYY-MM-DD"),
            })
          }
        >
          <List.Item>逝世日期</List.Item>
        </DatePicker>
        {formData.type === "2" && (
          <>
            <InputItem
              value={formData.name2}
              onChange={(e) => {
                setFormData({ ...formData, name2: e });
              }}
              placeholder="请输入名字"
            >
              逝者姓名
            </InputItem>
            <DatePicker
              mode="date"
              minDate={new Date(1111, 1, 1)}
              maxDate={new Date()}
              extra={"未输入"}
              title="Select Date"
              format="YYYY-MM-DD"
              value={
                formData.begin_date2 === ""
                  ? undefined
                  : new Date(formData.begin_date1)
              }
              onChange={(date) =>
                setFormData({
                  ...formData,
                  begin_date2: moment(date).format("YYYY-MM-DD"),
                })
              }
            >
              <List.Item>出生日期</List.Item>
            </DatePicker>
            <DatePicker
              mode="date"
              minDate={new Date(1111, 1, 1)}
              maxDate={new Date()}
              extra={"未输入"}
              title="Select Date"
              format="YYYY-MM-DD"
              value={
                formData.end_date2 === ""
                  ? undefined
                  : new Date(formData.begin_date1)
              }
              onChange={(date) =>
                setFormData({
                  ...formData,
                  end_date2: moment(date).format("YYYY-MM-DD"),
                })
              }
            >
              <List.Item>逝世日期</List.Item>
            </DatePicker>
          </>
        )}

        <TextareaItem
          title="生平简介"
          placeholder="请输入生平简介"
          value={formData.note}
          rows={2}
          onChange={(e) => {
            setFormData({ ...formData, note: e });
          }}
        ></TextareaItem>
        <div className="detail-title" style={{ marginTop: "0.2rem" }}>
          <img src="/imgs/detail-title.png" alt="" />
          <span>祈福堂背景</span>
        </div>
        <div className="detail-bg">
          <div
            className={formData.bg === "1" ? "bg-radio active" : "bg-radio"}
            onClick={() => {
              setFormData({ ...formData, bg: "1" });
            }}
          >
            <img src="imgs/1.jpg" alt="" />
            <span>背景1</span>
          </div>
          <div
            className={formData.bg === "2" ? "bg-radio active" : "bg-radio"}
            onClick={() => {
              setFormData({ ...formData, bg: "2" });
            }}
          >
            <img src="imgs/2.jpg" alt="" />
            <span>背景2</span>
          </div>
          <div
            className={formData.bg === "3" ? "bg-radio active" : "bg-radio"}
            onClick={() => {
              setFormData({ ...formData, bg: "3" });
            }}
          >
            <img src="imgs/3.jpg" alt="" />
            <span>背景3</span>
          </div>
        </div>

        <div className="detail-title" style={{ marginTop: "0.2rem" }}>
          <img src="/imgs/detail-title.png" alt="" />
          <span>祈福堂音乐</span>
        </div>
        <div className="detail-music">
          <div className="music-group">
            <div
              className={formData.music === "1" && "active"}
              onClick={() => {
                setFormData({ ...formData, music: "1" });
              }}
            >
              <img src="/imgs/music-logo.png" alt="" />
              祭奠
            </div>
            <div
              className={formData.music === "2" && "active"}
              onClick={() => {
                setFormData({ ...formData, music: "2" });
              }}
            >
              <img src="/imgs/music-logo.png" alt="" />
              念亲恩
            </div>
            <div
              className={formData.music === "3" && "active"}
              onClick={() => {
                setFormData({ ...formData, music: "3" });
              }}
            >
              <img src="/imgs/music-logo.png" alt="" />
              妈妈我想你
            </div>
            <div
              className={formData.music === "4" && "active"}
              onClick={() => {
                setFormData({ ...formData, music: "4" });
              }}
            >
              <img src="/imgs/music-logo.png" alt="" />
              爸爸
            </div>
            <div
              className={formData.music === "5" && "active"}
              onClick={() => {
                setFormData({ ...formData, music: "5" });
              }}
            >
              <img src="/imgs/music-logo.png" alt="" />
              真的好想你
            </div>
          </div>
        </div>

        <div className="btn-footer">
          <Button
            className="btn-save"
            onClick={() => {
              Toast.success("保存成功");
              history.goBack();
            }}
          >
            保存
          </Button>
          <Button
            className="btn-del"
            onClick={() => {
              Modal.alert("是否删除", "确定删除吗？", [
                { text: "取消", onPress: () => console.log("取消") },
                {
                  text: "Ok",
                  onPress: () => {
                    Toast.success("删除成功");
                    history.goBack();
                  },
                },
              ]);
            }}
          >
            删除
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditeDetail;
