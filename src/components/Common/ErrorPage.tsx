import React from "react";
import { Link } from "react-router-dom";
import ShowResult, { ShowResultProps } from "./ShowResult";
import CommonNavBar from "./CommonNavBar";
import "./commonStyles.less";
import { commonConfig } from "../../shared/config/index";

interface ErrorPageProps {
  title: string;
}

const ErrorPage = (props: ErrorPageProps & ShowResultProps) => {
  const { type, title } = props;

  const getNavBarConfigByType = () => {
    switch (type) {
      case "404":
        return {
          leftContent: [
            <Link key={Math.random()} to={commonConfig.routeBasePath + "/home"}>
              首页
            </Link>,
          ],
        };
    }
  };

  return (
    <div className="errorPageWrap">
      <CommonNavBar title={title} {...getNavBarConfigByType()} />
      <ShowResult type={type} />
    </div>
  );
};

export default ErrorPage;
