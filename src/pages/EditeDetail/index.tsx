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
import {
  getCemeteryDetail,
  uploadImg,
  deleteCemetery,
  saveCemetery,
  getImgsList,
  getMusicsList
} from "../../service/index";
import { commonConfig } from "../../shared/config/index";

export const getQuery = (name) => {
  var reg = new RegExp("(^|&)?" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg); //从?之后开始匹配如getQuery(courseid)返回一个数组["courseid=8","","8","&",index:0,input:"courseid=8"]
  if (r != null) return unescape(r[2]);
  return null;
};

const EditeDetail = (): React.ReactElement => {
  const [fileList, setFileList] = useState([]);
  const [imgsList, setImgsList] = useState([])
  const [musicList, setMusicList] = useState([])
  const [formData, setFormData] = useState<Record<string, any>>({
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

  const onChange = (files, type, index) => {
    if (type === "remove") {
      setFileList(files);
    } else {
      upload(files[files.length - 1].file);
    }
  };
  const history = useHistory();

  const upload = (file) => {
    var formData = new FormData();
    formData.append("file", file);
    uploadImg(formData).then((res: any) => {
      let list = [...fileList];
      list.push({ url: commonConfig.imgBaseUrl + res.data.data.resId, id: res.data.data.resId });
      setFileList(list);
    });
  };

  const getImgMusicList = () => {
    getImgsList().then((res: any) => {
      setImgsList(res.data.items)
    })
    getMusicsList().then((res: any) => {
      setMusicList(res.data.items)
    })
  }

  const checkData = (): boolean => {
    if (formData.type === "2") {
      if (formData.name === "" || formData.name2 === "") {
        Toast.fail("请填写逝者姓名", 2);
        return false;
      }
      if (formData.birthday === "" || formData.birthday2 === "") {
        Toast.fail("请填写祭拜对象出生日期", 2);
        return false;
      }
      if (formData.goneday === "" || formData.goneday2 === "") {
        Toast.fail("请填写祭拜对象逝世日期", 2);
        return false;
      }
      if (formData.life === "") {
        Toast.fail("请填写祭拜对象生平", 2);
        return false;
      }
      if (formData.back === "") {
        Toast.fail("请选择背景图片", 2);
        return false;
      }
      if (formData.music === "") {
        Toast.fail("请选择背景音乐", 2);
        return false;
      }
      if (fileList.length < 2) {
        Toast.fail("请上传头像", 2);
        return false;
      }
    } else {
      if (formData.name === "") {
        Toast.fail("请填写逝者姓名", 2);
        return false;
      }
      if (formData.birthday === "") {
        Toast.fail("请填写祭拜对象出生日期", 2);
        return false;
      }
      if (formData.goneday === "") {
        Toast.fail("请填写祭拜对象逝世日期", 2);
        return false;
      }
      if (formData.life === "") {
        Toast.fail("请填写祭拜对象生平", 2);
        return false;
      }
      if (formData.back === "") {
        Toast.fail("请选择背景图片", 2);
        return false;
      }
      if (formData.music === "") {
        Toast.fail("请选择背景音乐", 2);
        return false;
      }
      if (fileList.length < 1) {
        Toast.fail("请上传头像", 2);
        return false;
      }
    }
    return true;
  };



  useEffect(() => {
    getImgMusicList()
    if (getQuery("id") === null) {
      setFormData({
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
    } else {
      getCemeteryDetail(getQuery("id")).then((res: any) => {
        let data: any = {};
        let item = res.data.item
        // 双人堂
        if (item.name.split(",").length > 1) {
          data = {
            type: "2",
            name: item.name.trim().split(",")[0],
            name2: item.name.trim().split(",")[1],
            life: item.life,
            birthday: item.birthday.trim().split(",")[0],
            birthday2: item.birthday.trim().split(",")[1],
            goneday: item.goneday.trim().split(",")[0],
            goneday2: item.goneday.trim().split(",")[1],
            photo1: `${commonConfig.imgBaseUrl + item.photo.trim().split(",")[0]
              }`,
            photo2: `${commonConfig.imgBaseUrl + item.photo.trim().split(",")[1]
              }`,
            back: item.back,
            music: item.music,
          };
          setFileList([{ url: data.photo1, id: item.photo.trim().split(",")[0] }, { url: data.photo2, id: item.photo.trim().split(",")[1] }]);
        } else {
          data = {
            ...item,
            type: "1",
            photo: `${commonConfig.imgBaseUrl + item.photo}`,
          };
          setFileList([{ url: data.photo, id: item.photo }]);
        }
        setFormData(data);
      });
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
            className={formData.type === "1" ? "active" : ""}
            onClick={() => {
              setFormData({ ...formData, type: "1" });
            }}
          >
            单人堂
          </div>
          <div className="line"></div>
          <div
            className={formData.type === "2" ? "active" : ""}
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
          value={formData.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e });
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
            formData.birthday === "" ? undefined : new Date(formData.birthday)
          }
          onChange={(date) =>
            setFormData({
              ...formData,
              birthday: moment(date).format("YYYY-MM-DD"),
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
            formData.goneday === "" ? undefined : new Date(formData.goneday)
          }
          onChange={(date) =>
            setFormData({
              ...formData,
              goneday: moment(date).format("YYYY-MM-DD"),
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
                formData.birthday2 === "" || formData.birthday2 === undefined
                  ? undefined
                  : new Date(formData.birthday2)
              }
              onChange={(date) =>
                setFormData({
                  ...formData,
                  birthday2: moment(date).format("YYYY-MM-DD"),
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
                formData.goneday2 === "" || formData.goneday2 === undefined
                  ? undefined
                  : new Date(formData.goneday2)
              }
              onChange={(date) =>
                setFormData({
                  ...formData,
                  goneday2: moment(date).format("YYYY-MM-DD"),
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
          value={formData.life}
          rows={2}
          onChange={(e) => {
            setFormData({ ...formData, life: e });
          }}
        ></TextareaItem>
        <div className="detail-title" style={{ marginTop: "0.2rem" }}>
          <img src="/imgs/detail-title.png" alt="" />
          <span>祈福堂背景</span>
        </div>
        <div className="detail-bg">
          {
            imgsList.map((item) => {
              return (
                <div
                  key={Math.random()}
                  className={formData.back === item.id ? "bg-radio active" : "bg-radio"}
                  onClick={() => {
                    setFormData({ ...formData, back: item.id });
                  }}
                >
                  <img src={commonConfig.imgBaseUrl + item.miniResId} alt="" />
                  <span>{item.code}</span>
                </div>
              )
            })
          }
        </div>

        <div className="detail-title" style={{ marginTop: "0.2rem" }}>
          <img src="/imgs/detail-title.png" alt="" />
          <span>祈福堂音乐</span>
        </div>
        <div className="detail-music">
          <div className="music-group">
            {
              musicList.map((item) => {
                return <div
                  key={Math.random()}
                  className={formData.music === item.id ? "active" : ""}
                  onClick={() => {
                    setFormData({ ...formData, music: item.id });
                  }}
                >
                  <img src="/imgs/music-logo.png" alt="" />
                  {item.code}
                </div>
              })
            }
          </div>
        </div>

        <div className="btn-footer">
          <Button
            className="btn-save"
            onClick={() => {
              if (checkData()) {
                let newData: any = {
                  gravetype: getQuery("cemeteryCode"),
                  type: formData.type,
                  name: formData.type === "1" ? formData.name : [formData.name, formData.name2].join(",").trim(),
                  birthday: formData.type === "1" ? formData.birthday : [formData.birthday, formData.birthday2]
                    .join(",")
                    .trim(),
                  goneday: formData.type === "1" ? formData.goneday : [formData.goneday, formData.goneday2]
                    .join(",")
                    .trim(),
                  life: formData.life,
                  back: formData.back,
                  music: formData.music,
                  photo: formData.type === "1" ? fileList[0].id : [fileList[0].id, fileList[1].id].join(",").trim()
                };
                if (getQuery("id") !== null) {
                  newData.id = getQuery("id");
                }
                saveCemetery(newData).then(() => {
                  Toast.success("保存成功");
                  history.goBack();
                });
              }
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
                    deleteCemetery(getQuery("id")).then((res: any) => {
                      Toast.success("删除成功");
                      history.goBack();
                    });
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
