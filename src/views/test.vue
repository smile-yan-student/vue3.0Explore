<template>
    <!-- <div class="parent">
        <div class="child" v-for="(item, index) in a" :key="index"></div>
    </div> -->
    <!-- <prForm :schema="schema" :model="obj"></prForm> -->
    <el-input v-model="test" placeholder="Please input" />
    <test :schema="schema"> </test>

    <el-select @change="testName">
        <el-option label="item.label" value="item.value" />
    </el-select>
</template>
<script>
// import prForm from "../components/prForm.ts";
import test from "../components/test.ts";
// import { h } from "vue";
// import { ElInput } from "element-plus";
// const el = h(ElInput, { model: 1, value: 1 });
export default {
    components: {
        // prForm,
        test,
    },
    setup() {
        const a = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
        const schema = [
            {
                label: "待分配角色:",
                name: "name",
                comp: "el-input",
                props: {
                    placeholder: "请输入待分配角色",
                    disabled: true,
                },

                span: 6,
                labelWidth: "90px",
            },
            {
                label: "帐户名称:",
                name: "username",
                comp: "el-input",
                props: {
                    placeholder: "请输入帐户名称",
                },

                span: 6,
                labelWidth: "80px",
            },
            {
                label: "用户姓名:",
                name: "nickname",
                comp: "el-input",
                props: {
                    placeholder: "请输入用户姓名",
                },

                span: 6,
                labelWidth: "80px",
            },
        ];
        const obj = {};
        const test = 0;
        function testName() {
            console.log("----cahnge--------");
        }
        return {
            a,
            schema,
            obj,
            test,
            testName,
        };
    },
};
</script>
<style>
.parent {
  display: flex;
  flex-wrap: wrap;
  align-content: stretch;
  width: 100%;
  border: 1px solid black;
  border-right: none;
  border-bottom: none;
}
.child {
  align-content: stretch;
  flex-basis: 100px;
  flex-grow: 1;
  /* flex-shrink: 1; */
  width: 100px;
  height: 100px;
  margin-top: -1px;
  margin-left: -1px;
  /* border-top: 1px black solid;
  border-left: 1px black solid; */
  border: 1px solid black;
}
</style>
