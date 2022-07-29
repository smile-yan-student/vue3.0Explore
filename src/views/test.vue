<template>
    <!-- <test :schema="schema" ref="elform" :model="obj" :rules="rules"> </test>
    <button @click="validate">validate</button>
    <el-form
        :model="obj"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        @validate="eventValidate"
    >
        <el-form-item label="Activity name" prop="name">
            <el-input v-model="obj.name" />
        </el-form-item>
    </el-form> -->
    <el-date-picker v-model="obj.dated" type="date" placeholder="Pick a day" />
    <testForm
        ref="ruleFormRef"
        :schema="schema"
        :model="obj"
        :rules="rules"
        a="1"
        @validate="eventValidate"
    >
        <template #button> 我是button插槽 </template>
        <template #render="a">{{ a }} 我是插槽 </template>
    </testForm>
</template>
<script>
import test from "../components/test.ts";
import testForm from "../components/testForm.ts";
import { onMounted, ref, reactive, watch, getCurrentInstance } from "vue";

export default {
    components: {
        testForm,
    },

    setup() {
        const schema = reactive([
            {
                label: "待分配角色:",
                name: "name",
                type: "input",
                props: {
                    placeholder: "请输入待分配角色",
                    disabled: true,
                },

                span: 8,
                labelWidth: "100px",
            },
            {
                label: "待分配角色:",
                name: "dated",
                type: "date",
                props: {
                    placeholder: "请输入待分配角色",
                },

                span: 8,
                labelWidth: "100px",
            },
            {
                label: "待分配角色:",
                name: "number",
                type: "number",
                props: {
                    placeholder: "请输入待分配角色",
                },

                span: 8,
                labelWidth: "100px",
            },
            {
                name: "check",
                type: "checkbox",
                props: {
                    placeholder: "请输入待分配角色",
                    label: "lll",
                },

                span: 8,
                labelWidth: "100px",
            },
            {
                label: "帐户名称:",
                name: "username",
                type: "select",
                props: {
                    placeholder: "请输入帐户名称",
                    clearable: true,
                    options: [
                        {
                            label: "l",
                            value: 0,
                        },
                    ],
                },

                span: 8,
                labelWidth: "80px",
            },
            {
                label: "用户姓名:",
                name: "nickname",
                type: "input",
                props: {
                    placeholder: "请输入用户姓名",
                },

                span: 8,
                labelWidth: "80px",
            },
            {
                label: "用户姓名:",
                name: "render",
                type: "custom",
                props: {
                    placeholder: "请输入用户姓名",
                },

                span: 8,
                labelWidth: "80px",
            },
            {
                label: "用户姓名:",
                name: "render",
                type: "cascader",
                props: {
                    placeholder: "请输入用户姓名",
                    options: [
                        {
                            value: "resource",
                            label: "Resource",
                            children: [
                                {
                                    value: "axure",
                                    label: "Axure Components",
                                },
                                {
                                    value: "sketch",
                                    label: "Sketch Templates",
                                },
                                {
                                    value: "docs",
                                    label: "Design Documentation",
                                },
                            ],
                        },
                    ],
                },

                span: 8,
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
        const obj = reactive({ dated: [] });
        function testName(a) {
            console.log(a, "----change--------");
        }
        function validate() {
            // schema.pop();\
            ruleFormRef.value.$refs.elForm.validate();
            // schema[0].label = Date.now();
        }

        function eventValidate() {
            // debugger;
            console.log("------va------");
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
