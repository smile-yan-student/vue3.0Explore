<template>
    <el-container>
        <el-aside width="200px">
            <sider-bar />
        </el-aside>
        <el-container>
            <el-header>{{ title }}</el-header>
            <el-main>
                <router-view />
            </el-main>
            <el-footer>
                <i class="iconfont icon-police_officer_male"></i>
            </el-footer>
        </el-container>
    </el-container>
</template>

<script>
import SiderBar from "./SiderBar.vue";
import axios from "../api/index";
import { ref } from "vue";
export default {
    components: {
        SiderBar,
    },
    setup() {
        let title = ref("");
        axios.get("/title").then((res) => {
            title.value = res.data.data.title;
        });

        // axios
        //     .get("/updatetitle", {
        //         params: {
        //             title: "Never say Never!",
        //         },
        //     })
        //     .then((res) => {
        //         console.log(res, "------------");
        //     });
        return {
            title,
        };
    },
};
</script>
