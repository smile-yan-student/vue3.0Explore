import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ele from "element-plus";
import "element-plus/dist/index.css";
import "./style/index.less";
import { install } from "./components/index";

const app = createApp(App).use(store).use(router).use(ele).use(install);
app.mount("#app");
