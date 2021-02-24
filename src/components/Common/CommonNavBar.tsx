import React, { useState, useRef, useEffect } from "react";
import { Icon, NavBar, WhiteSpace, SearchBar } from "antd-mobile";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./commonNavBar.less";

interface CommonNavBarProps {
  title: string;
  rightContent?: React.ReactNode;
  leftContent?: React.ReactNode;
  mode?: "light" | "dark";
  children?: any;
  search?: boolean;
  onSearch?: (value: any) => void;
  onBack?: () => void;
  q?: string;
}

const CommonNavBar = (props: CommonNavBarProps) => {
  const history = useHistory();
  const searchRef = useRef(null);

  const {
    title = "IT 服务中心",
    mode = "light",
    onBack,
    leftContent = [
      <div
        style={{ display: "flex", alignItems: "center" }}
        onClick={() => {
          console.log(1);
          history.goBack();
          onBack && onBack();
        }}
        key={Math.random()}
      >
        <Icon color="black" type="left" key={Math.random()} />
      </div>,
    ],
    rightContent = [],
    search = false,
    children,
    onSearch,
    q = "",
  } = props;

  const [searching, setSearching] = useState(!!q);

  const handleSearch = () => {
    setSearching(true);
  };

  const onCancel = () => {
    setSearching(false);
  };

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  });

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {searching ? (
        <SearchBar
          defaultValue={q}
          placeholder="请输入编号、名称、人员、类型进行搜索"
          ref={searchRef}
          onSubmit={onSearch}
          onCancel={onCancel}
          cancelText={"取消"}
          maxLength={100}
        />
      ) : (
        <NavBar
          className="home-bar"
          mode={mode}
          leftContent={leftContent}
          rightContent={
            search
              ? [
                  <Icon
                    key={Math.random()}
                    type="search"
                    onClick={handleSearch}
                  />,
                ]
              : rightContent
          }
        >
          {children ? children : title}
        </NavBar>
      )}
    </>
  );
};

export default CommonNavBar;
