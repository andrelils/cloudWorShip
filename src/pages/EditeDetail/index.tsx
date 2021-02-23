import React, { useState } from "react";
import { CommonNavBar } from "../../components/index";
import "./index.less";
import { ImagePicker, Toast } from "antd-mobile";
import "antd/lib/upload/style/css";
import { useHistory } from "react-router-dom";

const EditeDetail = (): React.ReactElement => {
  const [fileList, setFileList] = useState([]);

  const onChange = (files, type, index) => {
    setFileList(files);
  };

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

  return (
    <div className="edite-detail">
      <CommonNavBar title="云祭扫"></CommonNavBar>
      <div className="list-top">
        <img src="/imgs/list-bg.jpg" alt="" />
        <div className="top-head">
          <ImagePicker
            className="head-upload"
            files={fileList}
            onChange={onChange}
            onImageClick={(index, fs) => console.log(index, fs)}
            selectable={fileList.length < 2}
          />
        </div>
      </div>
    </div>
  );
};

export default EditeDetail;
