import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ele from "element-plus";
import "element-plus/dist/index.css";
import "./style/index.less";

const app = createApp(App).use(store).use(router).use(ele);
app.mount("#app");
