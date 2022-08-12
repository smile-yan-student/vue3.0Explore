<template>
    <el-menu default-active="2" class="el-menu_Passenger" router>
        <el-menu-item index="/home">
            <template #title>Home</template>
        </el-menu-item>
        <el-menu-item index="/test">
            <template #title>Test</template>
        </el-menu-item>
        <el-menu-item index="/scaner">
            <template #title>Scaner</template>
        </el-menu-item>
        <el-menu-item index="/charts">
            <template #title>Charts</template>
        </el-menu-item>
    </el-menu>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "SiderBar",
    components: {},
});
</script>
<style scoped>
.el-menu_Passenger {
  width: 200px;
  height: 100%;
  border-right: 1px solid rgb(232, 228, 250);
}
</style>
