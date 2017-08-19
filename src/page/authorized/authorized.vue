<template>
<div class="wrapper">
    <div class="container" v-show="!isSuccess && !isUnchecked">
        <div class="company">
            <span class="label">公司名</span>
            <input type="text" placeholder="名称必须与营业执照一致" v-model="companyName" ref="company">
        </div>
        <v-divider></v-divider>
        <div class="username">
            <span class="label">用户名</span>
            <input type="text" placeholder="请输入用户名" v-model="username" ref="username">
        </div>
        <div class="phone">
            <span class="label">手机号</span>
            <span class="text">{{data.mobile}}</span>
        </div>
        <div class="gender">
            <span class="label">性别</span>
            <input type="radio" value="male" name="sex" id="male" v-model="picked">
            <label for="male">男</label>
            <input type="radio" value="female" name="sex" id="female" v-model="picked">
            <label for="female">女</label>
        </div>
        <v-submit :text="'提交'" @submit="submit"></v-submit>
        <v-maskersuccess v-show="isToastSuccess"></v-maskersuccess>
        <v-maskerfail v-show="isToastFail" :failmessage="failmessage"></v-maskerfail>
    </div>
    <div class="masker-success" v-show="isSuccess">
        <div class="masker-container">
            <div class="m-box">
                <p>
                    <i class="icon"></i>
                    <span class="text">所属企业：{{data.companyName}}</span>
                </p>
            </div>
        </div>
    </div>
    <div class="masker-unchecked" v-show="isUnchecked">
        <div class="masker-container">
            <div class="m-box">
                <p>
                    <i class="icon"></i>
                    <span class="text">认证正在审核中，请耐心等哟~</span>
                </p>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    import divider from "src/components/divider/divider";
    import submit from "src/components/submit/submit";
    import maskersuccess from "src/components/maskersuccess/maskersuccess";
    import maskerfail from "src/components/maskerfail/maskerfail";
    import util from "src/common/util";
    import url from "src/config/url";
export default {
    components: {
        "v-divider": divider,
        "v-submit": submit,
        "v-maskersuccess": maskersuccess,
        "v-maskerfail": maskerfail,
    },
    data () {
        return {
            isSuccess: false,
            isUnchecked: false,
            data: {},
            picked: "",
            genderMap: {
                'male': 1,
                'female': 2
            },
            isToastSuccess: false,
            isToastFail: false,
            failmessage: "",
        }
    },
    computed: {
        companyName () {
            return this.data.companyName;
        },
        username () {
            return this.data.name;
        }
    },
    created () {
        this.getMyProfileData();
        this.initProfile();
    },
    methods: {
        initProfile() {
            let state = this.$store.state;
            if(state.isEmployVerify) {
                this.isSuccess = true;
            }
            if(state.isUnchecked) {
                this.isUnchecked = true;
            }
        },
        getMyProfileData () {
            this.$http.get(url.getMyProfile, {
                params: {}
            }).then((response) => {
                var data = response.data;
                console.log(data);
                if(data.status.code == 0) {
                    this.data = data.data;
                }
            }).catch((response) => {
                util.toast(response.message, this);
            });
        },
        submit () {
            let company = this.companyName;
            let username = this.username;
            let picked = this.picked;

            if(company == "") {
                util.toast(util.tips.emptyCompanyName, this);
                return;
            }

            if(username == "") {
                util.toast(util.tips.emptyUserName, this);
                return;
            }

            this.$http.get(url.updateMyProfile, {
                params: {
                    companyName: company,
                    name: username,
                    gender: this.genderMap[picked] || 0
                }
            }).then((response) => {
                var data = response.data;
                if(data.status.code == 0) {
                    util.toastSuccess(function () {
                        window.history.back();
                    }, this);
                }else {
                    util.toastFail(function () {}, this);
                    this.failmessage = response.message;
                }
            }).catch((response) => {
                util.toast(response.message, this);
            });
        }
    }
}
</script>

<style lang="sass" scoped>
    @import "../../style/mixin.scss";
.wrapper{
    .label{
        margin-right: 30px;
        display: inline-block;
        color: #666;
    }
    input{
        width: 570px;
    }
    .company, .username, .phone, .gender{
        padding: 31px 20px 31px 0;
        background-color: #fff;
        position: relative;
        display: block;
        font-size: 28px;
        line-height: 28px;
        margin-left: 20px;
    }
    .username, .phone{
        border-bottom: 1px solid #ddd;
    }
    .gender{
        .label{
            margin-right: 60px;
        }
        input {
            width: 22px;
            height: 22px;
            margin-right: 5px;
        }
        label{
            margin-right: 20px;
        }
    }
    .masker-success, .masker-unchecked{
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 10;
        .masker-container{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            p{
                text-align: center;
            }
            .icon {
                display: inline-block;
                width: 104px;
                height: 104px;
                margin: 0 auto;
            }
            .text{
                padding-top: 45px;
                display: block;
                font-size: 28px;
                line-height:28px;
                color: #333;
                white-space: nowrap;
            }
        }
    }
    .masker-success .icon{
        @include background("bg_3.png");
    }
    .masker-unchecked .icon{
        @include background("bg_2.png");
    }
}
</style>
