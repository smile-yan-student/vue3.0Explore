<template>
    <el-collapse v-model="expand">
        <el-collapse-item title="用Schema生成表单" name="1">
            <PassengerForm
                ref="ruleFormRef"
                :schema="schema"
                :model="obj"
                :rules="rules"
                class="prForm"
            >
                <template #button>我是button插槽 </template>
                <template #render="a">{{ a }} 我是插槽 </template>
            </PassengerForm>
        </el-collapse-item>
    </el-collapse>
</template>
<script>
import { ref, reactive } from "vue";

export default {
    name: "PASSENGER_FORM",
    setup() {
        const schema = reactive([
            {
                label: "输入框:",
                name: "input",
                type: "el-input",
                props: {
                    placeholder: "输入框",
                    disabled: false,
                },
                span: 8,
                labelWidth: "100px",
            },
            {
                label: "时间下拉框:",
                name: "timeselect",
                type: "el-time-select",
                props: {
                    placeholder: "时间选择器",
                },
                span: 8,
                labelWidth: "100px",
            },
            {
                label: "单选:",
                name: "radio",
                type: "el-radio",
                props: {
                    placeholder: "单选",
                },
                span: 8,
                labelWidth: "100px",
            },
            {
                label: "时间选择器:",
                name: "time",
                type: "el-time-picker",
                props: {
                    placeholder: "时间选择器",
                    "arrow-control": true,
                },
                span: 8,
                labelWidth: "100px",
            },
            {
                label: "日期选择器:",
                name: "dated",
                type: "el-date-picker",
                props: {
                    placeholder: "日期选择器",
                },
                labelWidth: "100px",
            },
            {
                label: "数字输入框:",
                name: "number",
                type: "el-input-number",
                props: {
                    placeholder: "数字输入框",
                },
                span: 8,
                labelWidth: "100px",
            },
            {
                name: "多选",
                type: "el-checkbox",
                props: {
                    placeholder: "多选",
                    label: "lll",
                },
                span: 8,
                labelWidth: "100px",
            },
            {
                label: "下拉选择:",
                name: "username",
                type: "el-select",
                props: {
                    placeholder: "下拉选择",
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
                label: "定制:",
                name: "render",
                type: "custom",
                span: 8,
            },
            {
                label: "级联选择:",
                name: "render",
                type: "el-cascader",
                props: {
                    expandTrigger: "click",
                    placeholder: "级联选择",
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
            {
                label: "单选群:",
                name: "radio",
                type: "el-radio-group",
                props: {
                    placeholder: "单选群",
                    options: [
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
                            label: "docs Templates",
                        },
                    ],
                },

                span: 8,
                labelWidth: "80px",
            },
            {
                label: "多选群:",
                name: "chexbox",
                type: "el-checkbox-group",
                props: {
                    placeholder: "多选群",
                    options: [
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
                            label: "docs Templates",
                        },

                        {
                            value: "docs",
                            label: "docs Templates",
                        },

                        {
                            value: "sketch",
                            label: "Sketch Templates",
                        },
                        {
                            value: "axure",
                            label: "Axure Components",
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
        const obj = reactive({ dated: [] });
        const expand = ref(["1"]);
        const options = [
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
        ];
        return {
            schema,
            obj,
            elform,
            rules,
            ruleFormRef,
            options,
            expand,
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
