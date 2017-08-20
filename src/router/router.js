/**
 * Created by songyingchun on 2017/7/25 0025.
 */
import index from "src/page/index/index";
import gallery from "src/page/gallery/gallery";
import boutique from "src/page/boutique/boutique";
import boutiqueDetail from "src/page/boutiqueDetail/boutiqueDetail";
import search from "src/page/search/search";
import searchDetail from "src/page/searchDetail/searchDetail";
import send from "src/page/send/send";
import personal from "src/page/personal/personal";
import galleryDetail from "src/page/galleryDetail/galleryDetail";
import gallerySend from "src/page/gallerySend/gallerySend";
import photo from "src/page/photo/photo";
import authorized from "src/page/authorized/authorized";

// 个人中心
import addAddress from "src/page/addAddress/addAddress";
import manageAddress from "src/page/manageAddress/manageAddress";
import editorAddress from "src/page/editorAddress/editorAddress";
import modifyPassword from "src/page/modifyPassword/modifyPassword";

//登录注册
import login from "src/page/login/login";
import register from "src/page/register/register";
import forgetPassword from "src/page/forgetPassword/forgetPassword";
import findPassword from "src/page/findPassword/findPassword";

import Vue from "vue";
import VueRouter from "vue-router";
import util from "src/common/util";

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [{
        path: "/",
        component: index,
        meta: {
            title: "搜石商城"
        }
    },{
        path: "/index",
        component: index,
        meta: {
            title: "搜石商城"
        }
    },{
        path: "/gallery",
        component:gallery ,
        meta: {
            title: "石材图库"
        }
    },{
        path: "/boutique",
        component: boutique,
        meta: {
            title: "精品商城"
        }
    },{
        path: "/boutiqueDetail",
        component: boutiqueDetail,
        meta: {
            title: "精品商城详情页"
        }
    },{
        path: "/search",
        component: search,
        meta: {
            title: "搜现货"
        }
    },{
        path: "/searchDetail",
        component: searchDetail,
        meta: {
            title: "搜现货详情页"
        }
    },{
        path: "/send",
        component: send,
        meta: {
            title: "样板寄送"
        }
    },{
        path: "/personal",
        component: personal,
        meta: {
            title: "个人中心"
        }
    },{
        path: "/galleryDetail",
        component: galleryDetail,
        meta: {
            title: "石材图库详情页"
        }
    },{
        path: "/gallerySend",
        component: gallerySend,
        meta: {
            title: "石材图库样板寄送"
        }
    },{
        path: "/photo",
        component: photo,
        meta:{
            title:" 拍照找石"
        }
    },{
        path: "/addAddress",
        component: addAddress,
        meta: {
            title: "新增收货地址"
        }
    },{
        path: "/login",
        component: login,
        meta: {
            title: "登录-搜石网"
        }
    },{
        path: "/authorized",
        component: authorized,
        meta: {
            title: "个人认证"
        }
    },{
        path: "/manageAddress",
        component: manageAddress,
        meta: {
            title: "管理收货地址"
        }
    },{
        path: "/editorAddress",
        component: editorAddress,
        meta: {
            title: "编辑收货地址"
        }
    },{
        path: "/modifyPassword",
        component: modifyPassword,
        meta: {
            title: "修改密码"
        }
    },{
        path: "/register",
        component: register,
        meta: {
            title: "注册帐号"
        }
    },{
        path: "/forgetPassword",
        component: forgetPassword,
        meta: {
            title: "手机证验"
        }
    },{
        path: "/findPassword",
        component: findPassword,
        meta: {
            title: "找回密码"
        }
    }]
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    util.getMyProfileData();
    next();
});

export default router;