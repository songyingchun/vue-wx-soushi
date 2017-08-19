/**
 * Created by songyingchun on 2017/7/19.
 */
import Vue from "vue";
import App from "./App.vue";
import VueResource from "vue-resource";
import store from "src/store/index";
import router from "src/config/router";

import rem from "./config/flexible";
import ResetCss from "./style/reset.css";
import CommonCss from "./style/common.scss";

Vue.use(VueResource);

export const app = new Vue({
    el: "#app",
    store,
    render: x => x(App),
    router: router
});