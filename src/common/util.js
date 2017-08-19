/**
 * Created by songyingchun on 2017/7/25 0025.
 */
import Vue from "vue";
import VueResource from "vue-resource";
import store from "src/store/index";
import url from "src/config/url";
Vue.use(VueResource);

const util = {
    // 方法extend将参数defaults和参数opt合并，并且支持多个参数合并。如果最后一个参数为布尔true，支持深度拷贝。参数defaults为默认对象, 参数opt是被合并对象。
    extend: function (target, src) {
        let args = Array.prototype.slice.call(arguments);
        let len = args.length;
        let deep = null;
        let applyParam = [target];

        if (len === 1) {
            return target;
        }
        // 如果最后的参数是布尔值，则从参数数组args中删除。设置为数组applyParam的第三个元素
        if (typeof (deep = args[len - 1]) === "boolean") {
            args.pop();
            applyParam[2] = deep;
        }
        // 参数数组args删除目标对象，此时args中剩下只有源对象(被合并的对象)，获取源对象的个数
        args.shift();
        len = args.length;

        if (len > 1) {       // 如果源对象个数大于1, 遍历args，将源对象设置为数组applyParam的第二个元素，再次调用this.extend(target, src, deep);
            for (let i = 0; i < len; i++) {
                applyParam[1] = args[i];
                this.extend.apply(null, applyParam);
            }
        } else {
            for (let key in src) {           // 遍历源对象src, 检测它的自定义属性key。如果deep为true，表示支持拷贝对象最底层的属性值，并且key值为对象，调用this.extend(target, src, deep)方法。否则将源对象属性/值深度拷贝到目标对象上。
                if (src.hasOwnProperty(key)) {
                    if (deep === true && Object.prototype.toString.call(src[key]) === "[object Object]") {
                        this.extend(target, src[key], true);
                    } else {
                        target[key] = src[key];
                    }
                }
            }
        }
        return target;
    },

    parseUrl: function (url) {
        if (url.indexOf("?") > -1) {
            url = url.substr(url.indexOf("?") + 1);
        }

        if (!url) {
            return {};
        }

        let item = [], prop = {};
        if(url.indexOf("url") > -1) {
            let indexUrl = url.indexOf("url");
            prop.url = url.substr(indexUrl + 4);
            url = url.substr(0, indexUrl);
        }

        let list = url.split(/&/);
        for (let i = 0, l = list.length; i < l && list[i]; i++) {
            let index = list[i].indexOf("=");
            item[0] = list[i].substr(0, index);
            item[1] = list[i].substr(index + 1);
            prop[item[0]] = item[1];
        }

        return prop;
    },

    parseUrlToLoaction: function (url) {
        let location = {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            port: "",
            protocol: "",
            search: "",
            match: null,
        };
        let urlRegexp = /^(https?):\/\/(([^:]+?)(?:\:(\d+)+?))(?:(\/[^?#\/=]+|\/)(\?([^\/]+))?)\/?(#(?:(\/[^?#\/=]+|\/)(\?(.+(\/.+)))?))?/;
        if(url.indexOf("http") < 0) {
            if(url.indexOf(":\/\/") > 0) {
                url = "http" + url;
            }else {
                url = "http://" + url;
            }
        }
        let match = url.match(urlRegexp);
        if(match) {
            location.hash = match[8] || "";
            location.host = match[2] || "";
            location.hostname = match[3] || "";
            location.href = match.input || "";
            location.origin = match[1] + "//" + match[2] || "";
            location.pathname = match[5] || "";
            location.port = match[4] || "";
            location.protocol = match[1] || "";
            location.search = match[6] || "";
            location.match = match;
        }
        return location;
    },

    getUrlDetail: function (url) {
        url = decodeURIComponent(url);
        let parse = {};
        let location = this.parseUrlToLoaction(url);
        if(!location.match) {
            return {};
        }

        let search = location.match[10];

        if(!search) {
            return {};
        }

        let parseObj = this.parseUrl(search);
        parse = this.extend(parse, parseObj, location);

        function getParseUrl(parseChild, parent) {
            if(parent.url) {
                let location2 = util.parseUrlToLoaction(parent.url);
                if(!location2.match) {
                    return;
                }
                let search2 = location2.match[10];
                if(search2) {
                    let parseObj2 = util.parseUrl(search2);
                    parseChild = util.extend(parseChild, parseObj2, location2);
                    parent.parse = parseChild;
                    getParseUrl({}, parseChild);
                }
            }
        }
        getParseUrl({}, parse);

        return parse;
    },

    getUrlParam: function (url, key) {
        return this.parseUrl(url)[key];
    },

    setUrlParams: function (url, key, value) {
        let hasSymbol = false;
        let origin = url;
        let prop = {};
        let symbol = "?";

        hasSymbol = ~url.indexOf("?");

        if (hasSymbol) {
            url = url.match(/(.+?)\?/)[1];
        }

        if (typeof key === "string") {
            prop[key] = value;
        }

        if (typeof key === "object") {
            prop = key;
        }

        if (Object.prototype.toString.call(prop) === "[object Object]") {

            target = this.parseUrl(origin);

            prop = this.extend(target, prop);

            for (var i in prop) {
                if (prop.hasOwnProperty(i)) {
                    hasSymbol = ~url.indexOf("?");

                    if (hasSymbol) {
                        symbol = "&";
                    }

                    url += symbol + i + "=" + prop[i];
                }
            }
        }

        return url;
    },

    checkUrlParam: function (str) {
        return window.location.href.indexOf(str) > -1;
    },

    checkConnect: function () {
        let connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection || {type: "unknown"};
        let type_text = ["unknown", "ethernet", "wifi", "2g", "3g", "4g", "none"];

        if (typeof(connection.type) === "number") {
            connection.type_text = type_text[connection.type];
        } else {
            connection.type_text = connection.type;
        }
        if (typeof(connection.bandwidth) === "number") {
            if (connection.bandwidth > 10) {
                connection.type = "wifi";
            } else if (connection.bandwidth > 2) {
                connection.type = "3g";
            } else if (connection.bandwidth > 0) {
                connection.type = "2g";
            } else if (connection.bandwidth === 0) {
                connection.type = "none";
            } else {
                connection.type = "unknown";
            }
        }
        return connection.type;
    },

    regexp: {
        phone: /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/,
        password: /^[a-zA-Z0-9_]{6,15}$/,
        company: /^[\u4e00-\u9fa5]{1,19}$/,
    },

    setCookie: function (name,value) {
        let Days = 30;
        let exp = new Date();
        exp.setTime(exp.getTime() + Days*24*60*60*1000);
        document.cookie = name + "="+ value + ";expires=" + exp.toGMTString();
    },

    getCookie: function (name) {
        let arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg)) {
            return arr[2];
        }else {
            return null;
        }
    },

    clearCookie: function (name) {
        this.setCookie(name, "", -1);
    },

    loadDataTime: 750,

    loadPicListTime: 250,

    timeout: 10000,

    tips: {
        readProtocol: "请阅读《搜石网用户注册协议》",
        loginSuccess: "登录成功",
        submitSuccess: "提交成功",
        submitFail: "提交失败",
        emptyUserName: "请输入用户名",
        emptyContact: "请输入联系人",
        emptyPhone: "请输入手机号",
        emptyPassword: "请输入密码",
        emptyCode: "请输入验证码",
        emptyCompanyName: "请输入公司名",
        emptyName: "请输入姓名",
        emptyStreet: "请输入街道",
        emptyOldPassword: "请输入原密码",
        emptyNewPassword: "请输入新密码",
        correctPhone: "请输入正确的手机号",
        atLeastSixPhoneNumber: "密码至少6位字符",
        comprisePassword: "密码由字母，数字，下划线组成",
        differentPassword: "两次输入密码不一致",
        errorPhoneOrUserName: "用户名或密码错误",
        errorConnect: "网络或者服务出错，请稍后再试",
        loadingFail: "没有网络，加载失败",
        unLoginUser: "请先登录",
        deleteSuccess: "删除成功",
        selectProvince: "请选择省份",
        selectCity: "请选择地级市",
        please: "功能暂未开放，敬请期待",
        templateNumber: "请填写样板数量",
        uploadPicOrWriteTemplate: "请上传图片或填写品种",
        chooseAddress: "请选择收货地址",
        uploading: "上传中..."
    },

    toast (tips, context) {
        context.tips = tips;
        setTimeout(()=>{
            context.tips = "";
        }, this.loadDataTime);
    },

    toastSuccess (callback, context) {
        context.isToastSuccess = true;
        setTimeout(()=>{
            callback();
            context.isToastSuccess = false;
        }, this.loadDataTime);
    },

    toastFail (callback, context) {
        context.isToastFail = true;
        setTimeout(()=>{
            callback();
            context.isToastFail = false;
        }, this.loadDataTime);
    },

    checkLogin (path = "login", vue) {
        const islogin = store.state.islogin;
        if(!islogin) {
            path = "login";
        }
        vue.$router.push({
            path: path
        });
    },

    setDocumentClientHeight (selectors) {
        let doc = window.document;
        let docW = (doc.documentElement || doc.body).clientWidth;
        let docH = (doc.documentElement || doc.body).clientHeight;
        let els = document.querySelectorAll(selectors);

        for(let i = 0, l = els.length; i < l; i++) {
            let item = els[i];
            item.style.width = docW + "px";
            item.style.height = docH + "px";
        }
    },

    getMyProfileData () {
        Vue.http.get(url.getMyProfile, {
            params: {}
        }).then((response) => {
            var data = response.data;
            if(data.status.code == 0) {
                store.commit("login");
                store.commit("showPrice");
                if(data.data.employVerify == 2 || data.data.employVerify == 5) {
                    store.commit("employVerify");
                }
                if(data.data.employVerify == 1) {
                    store.commit("unchecked");
                }
            }
            store.commit({
                type: "data",
                key: "getMyProfile",
                value: response.data
            });
        }).catch((response) => {
            util.toast(response.message, this);
        });
    },
};
export default util;
