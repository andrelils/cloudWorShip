import Home from "../pages/Home/index";
import List from "../pages/List/index";
import ListDetail from "../pages/ListDetail/index";
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
];

export default routes;
