import Home from "../pages/Home/index";
import List from "../pages/List/index";
import ListDetail from "../pages/ListDetail/index";
import EditeDetail from "../pages/EditeDetail/index";
import Hall from "../pages/Hall/index";
import { commonConfig } from "../shared/config/";

let routes = [
  {
    name: "首页",
    text: "首页",
    path: commonConfig.routeBasePath + "/home",
    component: Home,
  },
  {
    name: "列表页",
    text: "列表页",
    path: commonConfig.routeBasePath + "/list",
    component: List,
  },
  {
    name: "列表详情页",
    text: "列表详情页",
    path: commonConfig.routeBasePath + "/listDetail/:id",
    component: ListDetail,
  },
  {
    name: "编辑详情页",
    text: "编辑详情页",
    path: commonConfig.routeBasePath + "/editeDetail",
    component: EditeDetail,
  },
  {
    name: "祈福堂",
    text: "祈福堂",
    path: commonConfig.routeBasePath + "/hall/:id",
    component: Hall,
  },
];

export default routes;
