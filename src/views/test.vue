<template>
    <test :schema="schema" ref="elform" :model="obj" :rules="rules"> </test>
    <button @click="validate">validate</button>
    <el-form
        ref="ruleFormRef"
        :model="obj"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        @validate="eventValidate"
    >
        <el-form-item label="Activity name" prop="name">
            <el-input v-model="obj.name" />
        </el-form-item>
    </el-form>
    <testForm :schema="schema" :model="obj" :rules="rules"></testForm>
</template>
<script>
import test from "../components/test.ts";
import testForm from "../components/testForm.ts";
import { onMounted, ref, reactive, watch, getCurrentInstance } from "vue";
export default {
    components: {
        test,
        testForm,
    },
    setup() {
        const schema = reactive([
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
        ]);
        const elform = ref(null);
        const ruleFormRef = ref(null);
        const rules = {
            name: [
                {
                    required: true,
                    message: "age is required",
                    trigger: "blur",
                },
            ],
        };
        let instance = getCurrentInstance();
        watch(
            () => [...schema],
            () => {
                // console.log("-----update-------");
                instance.ctx.$forceUpdate();
            }
        );
        const obj = reactive({});
        function testName(a) {
            console.log(a, "----change--------");
        }
        function validate() {
            schema.pop();
            schema[0].label = Date.now();
        }

        function eventValidate() {
            // debugger;
        }
        return {
            schema,
            obj,
            testName,
            elform,
            validate,
            rules,
            ruleFormRef,
            eventValidate,
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
