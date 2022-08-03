import axios from "axios";

const instance = axios.create({
    baseURL: "/application",
});
export default instance;
