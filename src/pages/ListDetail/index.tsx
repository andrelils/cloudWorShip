import React, { useState, useEffect } from "react";
import { CommonNavBar } from "../../components/index";
import "./index.less";
import { useHistory, useParams } from "react-router-dom";
import { getList } from "../../service/index";
import { commonConfig } from "../../shared/config/index";
import { Toast } from "antd-mobile";

const ListDetail = (): React.ReactElement => {
  const history = useHistory();
  const { id } = useParams();
  const [list, setList] = useState([]);
  const [ifDouble, setIfDouble] = useState(false);

  const share = () => {
    let h5 = {
      title: commonConfig.shareTitle,
      content: commonConfig.shareContent,
      shareUrl: `https://cdn.internetofcity.cn/app/openWeapp/open-weapp.html?path=${encodeURIComponent(
        commonConfig.shareURL
      )}`,
      icon: 'https://super-app-01.oss-cn-north-2-gov-1.aliyuncs.com/lx/images/jiayuan/jiayuan_share.jpg',
    }
    let type = "1"
    let shareObj = h5
    commonConfig.ls.share(
      {
        type,
        ...shareObj
      },
      function (res) {
        if (res.code === 200) {
          Toast.success('分享成功', 2)
          console.log(res);
        } else {
          Toast.fail('分享失败', 2)
          console.log(res)
        }
      }
    );
  }

  useEffect(() => {
    getList(id).then((res: any) => {
      let data = [];
      data = res.data.items.map((item: any) => {
        // 双人堂
        if (item.name.split(",").length > 1) {
          return {
            id: item.id,
            name: item.name.trim().split(",")[0],
            name2: item.name.trim().split(",")[1],
            life: item.life.trim().split(",")[0],
            life2: item.life.trim().split(",")[1],
            birthday: item.birthday.trim().split(",")[0],
            birthday2: item.birthday.trim().split(",")[1],
            goneday: item.goneday.trim().split(",")[0],
            goneday2: item.goneday.trim().split(",")[1],
            photo: `${commonConfig.imgBaseUrl + item.photo.trim().split(",")[0]
              }`,
            photo2: `${commonConfig.imgBaseUrl + item.photo.trim().split(",")[1]
              }`,
          };
        } else {
          setIfDouble(false)
          return { ...item, photo: `${commonConfig.imgBaseUrl + item.photo}` };
        }
      });
      setList(data);
    });
  }, []);
  return (
    <div className="page-list-detail">
      <CommonNavBar title="云祭扫"></CommonNavBar>
      <div className="list-top">
        <img src="/imgs/list-bg.jpg" alt="" />
        <div className="list-btn-all">
          <img
            className="list-btn"
            src="/imgs/add.png"
            alt=""
            onClick={() => {
              history.push(`/editeDetail?cemeteryCode=${id}`);
            }}
          ></img>
          <span>祈福堂</span>
        </div>
      </div>
      <div className="list-container">
        {list.map((item, index) => {
          if (ifDouble) {
            return (
              <div className="container-item" key={item + "_" + index}>
                <div className="item-top">
                  <div className="item-pic">
                    <img src={item.photo} alt="" />
                  </div>
                  <div className="top-detail">
                    <div className="detail-name">
                      <span>{item.name}</span>
                      <div className="item-edit">
                        <img alt="" src="/imgs/edit.png" />
                      </div>
                    </div>
                    <span className="item-date">
                      {item.birthday}—{item.goneday}
                    </span>
                    <span className="item-node">生平简介：{item.life}</span>
                  </div>
                </div>
                <div className="item-line"></div>
                <div className="item-top">
                  <div className="item-pic">
                    <img src={item.photo2} alt="" />
                  </div>
                  <div className="top-detail">
                    <div className="detail-name">
                      <span>{item.name2}</span>
                    </div>
                    <span className="item-date">
                      {item.birthday2}—{item.goneday2}
                    </span>
                    <span className="item-node">生平简介：{item.life2}</span>
                  </div>
                </div>
                <div className="item-footer">
                  <div
                    className="item-shared"
                    onClick={() => {
                      history.push(
                        `/editeDetail?id=${item.id}&cemeteryCode=${id}`
                      );
                    }}
                  >
                    编辑祈福堂
                  </div>
                  <div className="footer-line"></div>
                  <div
                    className="item-enter"
                    onClick={() => {
                      history.push(`/hall/${id}`);
                    }}
                  >
                    进入祈福堂
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <div className="container-item" key={item + "_" + index}>
                <div className="item-top">
                  <div className="item-pic">
                    <img src={item.photo} alt="" />
                  </div>
                  <div className="top-detail">
                    <div className="detail-name">
                      <span>{item.name}</span>
                      <div className="item-edit" onClick={() => share()}>
                        <img alt="" src="/imgs/edit.png" />
                      </div>
                    </div>
                    <span className="item-date">
                      {item.birthday}—{item.goneday}
                    </span>
                    <span className="item-node">生平简介：{item.life}</span>
                  </div>
                </div>
                <div className="item-footer">
                  <div
                    className="item-shared"
                    onClick={() => {
                      history.push(
                        `/editeDetail?id=${item.id}&cemeteryCode=${id}`
                      );
                    }}
                  >
                    编辑祈福堂
                  </div>
                  <div className="footer-line"></div>
                  <div
                    className="item-enter"
                    onClick={() => {
                      history.push(`/hall/${item.id}`);
                    }}
                  >
                    进入祈福堂
                  </div>
                </div>
              </div>
            );
          }
        })}
        {list.length == 0 && (
          <div className="empty">
            <img src="/imgs/empty.png" alt="" />
            <span>请先创建祈福堂</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListDetail;
