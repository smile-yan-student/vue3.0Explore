import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ele from "element-plus"
import 'element-plus/dist/index.css'

const app=createApp(App).use(store).use(router).use(ele)
console.log(app,'------app------');

app.mount('#app')

