/**
 * Created by songyingchun on 2017/8/14 0014.
 */
import * as types from "./mutation-type";

export default {
    [types.LOGIN] (state) {
        state.islogin = true;
    },
    [types.SHOW_PRICE] (state) {
        state.isShowPrice = true;
    },
    [types.EMPLOY_VERIFY] (state) {
        state.isEmployVerify = true;
    },
    [types.UNCHECKED] (state) {
        state.isUnchecked = true;
    },
    [types.DATA] (state, payload) {
        state.data[payload.key] = payload.value;
    },
    [types.DATA_LIST] (state, payload) {
        if(!state.data[payload.key]) {
            state.data[payload.key] = [];
        }
        state.data[payload.key].push(payload.value);
    },
    [types.CLEAN_DATA_LIST] (state, payload) {
        state.data[payload.key] = [];
    }
};