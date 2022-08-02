import { h, toRefs, watch, getCurrentInstance } from "vue";
import {
    ElInput,
    ElCheckbox,
    ElCascader,
    ElSelect,
    ElOption,
    ElForm,
    ElFormItem,
    ElRow,
    ElCol,
    ElInputNumber,
    ElDatePicker,
    ElTimePicker,
    ElTimeSelect,
    ElRadio,
    ElRadioGroup,
    ElCheckboxGroup,
} from "element-plus";
const dict = {
    "el-input": ElInput,
    "el-select": ElSelect,
    "el-cascader": ElCascader,
    "el-input-number": ElInputNumber,
    "el-checkbox": ElCheckbox,
    "el-date-picker": ElDatePicker,
    "el-time-picker": ElTimePicker,
    "el-time-select": ElTimeSelect,
    "el-radio": ElRadio,
    "el-radio-group": ElRadioGroup,
    "el-checkbox-group": ElCheckboxGroup,
    "el-option": ElOption,
};

/* eslint-disable */
function createItem(item: any, index: any, model: any) {
    let component: Array<string>;
    let type = item.type;
    switch (type) {
        case "el-checkbox-group":
            component = ["el-checkbox-group", "el-checkbox"];
            break;
        case "el-radio-group":
            component = ["el-radio-group", "el-radio"];
            break;
        case "el-select":
            component = ["el-select", "el-option"];
            break;
        default:
            component = [type];
    }
    if (component.length > 1) {
        let slots: any = [];
        item.props.options.forEach((item: any, index: any) => {
            // @ts-ignore
            let slot = h(dict[component[1]], {
                key: index,
                label: item.label,
                value: item.value,
            });
            slots.push(slot);
        });
        return () =>
            h(
                // @ts-ignore
                dict[item.type],
                {
                    key: index,
                    modelValue: model[item.name],
                    "onUpdate:modelValue"(val: any) {
                        model[item.name] = val;
                    },
                },
                () => slots
            );
    } else {
        return () =>
            h(
                // @ts-ignore
                dict[component[0]],
                {
                    key: index,
                    modelValue: model[item.name],
                    "onUpdate:modelValue"(val: any) {
                        model[item.name] = val;
                    },
                    ...item?.props,
                    props: {
                        expandTrigger: "click",
                    },
                }
            );
    }
}

function createFormItem(
    schema: any = [],
    model: any,
    inline: Boolean,
    ctx: any
) {
    const slot: any = [];
    schema.forEach((item: any, index: any) => {
        const el = createItem(item, index, model);
        const elFormItemElement = h(
            ElFormItem,
            {
                prop: item.name,
                label: item.label,
                ...item,
            },
            el
        );
        const itemCol = h(
            ElCol,
            { span: inline ? item.span || 8 : 24 },
            item.type == "custom"
                ? () => ctx.slots[item.name] && ctx.slots[item.name]()
                : () => elFormItemElement
        );
        slot.push(itemCol);
    });
    return slot;
}

const PassengerForm = {
    setup(props: any, ctx: any): any {
        const { model, rules, schema, gutter, justify, align, tag, inline } =
            toRefs(props);
        let instance = getCurrentInstance();
        let slots = createFormItem(
            schema.value,
            model.value,
            inline.value,
            ctx
        );
        // schema 改变手动刷新页面
        watch(
            () => [...schema.value],
            () => {
                slots = createFormItem(
                    schema.value,
                    model.value,
                    inline.value,
                    ctx
                );
                // @ts-ignore
                instance?.ctx.$forceUpdate();
            }
        );
        return () =>
            h(
                ElForm,
                {
                    model: model.value,
                    rules: rules.value,
                    ref: "elForm",
                    inline: inline.value,
                    ...ctx.attrs,
                },
                () =>
                    h(
                        ElRow,
                        {
                            gutter: gutter.value,
                            justify: justify.value,
                            align: align.value,
                            tag: tag.value,
                        },
                        () => [
                            ...slots,
                            ctx.slots?.button && ctx.slots?.button(),
                        ]
                    )
            );
    },
    props: {
        // el-form 其余未指定属性通过attrs传入
        schema: {
            type: Array,
            default: () => {
                return [];
            },
        },
        model: {
            type: Object,
            default: () => ({}),
        },
        rules: {
            type: Object,
            default: () => ({}),
        },
        inline: {
            type: Boolean,
            default: true,
        },
        // el-row 属性
        gutter: {
            type: Number,
            default: 20,
        },
        justify: {
            type: String,
            default: "start",
        },
        align: {
            type: String,
            default: "top",
        },
        tag: {
            type: String,
            default: "div",
        },
    },
};
export default PassengerForm;
export { PassengerForm };
