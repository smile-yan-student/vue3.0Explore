import { h, onMounted, defineComponent, defineProps,reactive } from "vue";
import {
    ElInput,
    ElCheckbox,
    ElCascader,
    ElSelect,
    ElOption,
    ElForm,
} from "element-plus";
function createItem(schema: any = []) {
    const a: any = [];

    schema.forEach((item: any, index: any) => {
        a.push(h("p", [index]));
    });
    return a;
}

export default {
    setup(props:any,context:any) {
        // const test = defineProps({
        //     schema: {
        //         type: Array,
        //         default: () => [],
        //     },
        //     model: {
        //         type: Object,
        //         default: () => ({}),
        //     },
        // });
console.log(props.schema,context,'-------props-----');
        // const slot = createItem(props.schema);
        return h(ElForm, );
    },
    props:{
         schema: {
                type: Array,
                default: () => [],
            },
            model: {
                type: Object,
                default: () => ({}),
            },
    },
    slots:
        createItem()
    
};
