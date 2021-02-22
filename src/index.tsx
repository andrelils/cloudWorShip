import React from "react";
import ReactDOM from "react-dom";
import RouterMap from "./router/index";
import reportWebVitals from "./reportWebVitals";

// 全局 CSS 引入
import "./styles/index.less";

ReactDOM.render(<RouterMap />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
