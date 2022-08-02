import PassengerForm from "./PassengerForm";

export default {
    install: (vue: any) => {
        vue.use(PassengerForm);
    },
};
export function install(vue: any) {
    vue.component("PassengerForm", PassengerForm);
}
