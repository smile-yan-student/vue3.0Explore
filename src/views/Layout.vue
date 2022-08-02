<template>
    <el-container>
        <el-aside width="200px">
            <sider-bar />
        </el-aside>
        <el-container>
            <el-header>山不让尘，川不辞盈</el-header>
            <el-main>
                <router-view />
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import SiderBar from "./SiderBar.vue";
export default {
    components: {
        SiderBar,
    },
};
</script>
