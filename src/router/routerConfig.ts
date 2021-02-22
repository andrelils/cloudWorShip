import Home from "../pages/Home/index";
import { commonConfig } from "../shared/config/";

let routes = [
  {
    name: "首页",
    text: "首页",
    path: commonConfig.routeBasePath + "/home",
    component: Home,
  },
];

export default routes;
