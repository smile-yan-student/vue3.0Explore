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
} from "element-plus";
/* eslint-disable */
// @ts-nocheck
function createItem(item: any, index: any, model: any) {
    return h(ElInput, {
        key: index,
        modelValue: model[item.name],
        onInput(val: any) {
            model[item.name] = val;
        },
    });
}
function createFormItem(schema: any = [], model: any) {
    const slot: any = [];
    schema.forEach((item: any, index: any) => {
        const el = () => [
            h(ElInput, {
                key: index,
                modelValue: model[item.name],
                onInput(val: any) {
                    model[item.name] = val;
                },
            }),
        ];

        const itemEl = () =>
            h(
                ElFormItem,
                {
                    prop: item.name,
                    label: item.label,
                },
                el
            );

        const itemCol = h(ElCol, { span: 8 }, itemEl);
        slot.push(itemCol);
    });
    return slot;
}

export default {
    setup(props: any, ctx: any): any {
        const { model, rules, schema } = toRefs(props);
        let slot = createFormItem(schema.value, model.value);
        let instance = getCurrentInstance();
        watch(
            () => [...schema.value, model.value],
            () => {
                slot = createFormItem(schema.value, model.value);
                instance.ctx.$forceUpdate();
            }
        );
        return () =>
            h(
                ElForm,
                {
                    model: model.value,
                    rules: rules.value,
                    ref: "elForm",
                    inline: true,
                },
                () => h(ElRow, () => slot)
            );
    },
    props: {
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
    },
    renderTriggered(a: any, b: any) {
        console.log(a, b, "------update------");
    },
};
