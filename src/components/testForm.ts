import {
    h,
    onMounted,
    defineComponent,
    defineProps,
    reactive,
    ref,
    toRefs,
    toRef,
    isProxy,
    watch,
    getCurrentInstance,
} from "vue";
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
    dateEquals,
} from "element-plus";
interface Dict {
    [type: string]: HTMLElement;
}
const dict = {
    input: ElInput,
    select: ElSelect,
    cascader: ElCascader,
    number: ElInputNumber,
    checkbox: ElCheckbox,
    date: ElDatePicker,
};
/* eslint-disable */
function createItem(item: any, index: any, model: any) {
    if (item.type == "select") {
        let slots: any = [];
        item.props.options.forEach((item: any, index: any) => {
            let slot = h(ElOption, {
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
                    onChange(val: any) {
                        model[item.name] = val;
                    },
                    ...item?.props,
                    "onUpdate:modelValue"(val: any) {
                        console.log(val, "------------");
                    },
                },
                () => slots
            );
    } else {
        return () =>
            h(
                // @ts-ignore
                dict[item.type],
                {
                    key: index,
                    modelValue: model[item.name],
                    value: model[item.name],
                    onInput(val: any) {
                        console.log(val, "------input------");
                        // typeof val == "object" || (model[item.name] = val);
                        model[item.name] = val;
                    },
                    onChange(val: any) {
                        console.log(val, "-------cahneg-----");
                        model[item.name] = val;
                    },
                    "onUpdate:modelValue"(val: any) {
                        model[item.name] = val;
                        console.log(val, "------------");
                    },
                    ...item?.props,
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

        const elFormItemElement = () =>
            h(
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
                ? ctx.slots[item.name] && ctx.slots[item.name]()
                : elFormItemElement
        );
        slot.push(itemCol);
    });
    return slot;
}

export default {
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
                        () => [slots, ctx.slots?.button && ctx.slots?.button()]
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
