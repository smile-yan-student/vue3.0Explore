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
} from "vue";
import {
    ElInput,
    ElCheckbox,
    ElCascader,
    ElSelect,
    ElOption,
    ElForm,
    ElFormItem,
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
        const el = h(ElInput, {
            key: index,
            modelValue: model[item.name],
            onInput(val: any) {
                model[item.name] = val;
            },
        });
        // const el = createItem(item, index, model);

        const itemEl = h(
            ElFormItem,
            {
                prop: item.name,
                label: item.label,
            },
            () => [el]
        );
        slot.push(itemEl);
    });
    return slot;
}

export default {
    render(): any {
        // @ts-ignore
        const { schema, model, rules } = this;
        const slot = createFormItem(schema, model);
        return h(
            ElForm,
            {
                model: model,
                rules: rules,
                ref: "elForm",
                inline: true,
            },
            () => slot
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
};
