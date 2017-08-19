<template>
<div class="wrapper">
    <div class="container">
        <div class="password">
            <span class="label">原密码：</span>
            <input type="password" placeholder="请输入原密码" ref="password">
        </div>
        <div class="new-password">
            <span class="label">新密码：</span>
            <input type="password" placeholder="建议输入8位以上包含数字字母符号等" ref="new-password">
        </div>
        <div class="confirm">
            <span class="label">确认密码：</span>
            <input type="password" placeholder="请再次确认" ref="confirm">
        </div>
        <v-submit :text="'确认修改'" @submit="submit"></v-submit>
        <v-maskersuccess v-show="isToastSuccess"></v-maskersuccess>
        <v-maskerfail v-show="isToastFail"></v-maskerfail>
        <v-maskertips v-show="tips" :tips="tips"></v-maskertips>
    </div>
</div>
</template>

<script>
    import submit from "src/components/submit/submit";
    import maskertips from "src/components/maskertips/maskertips";
    import maskersuccess from "src/components/maskersuccess/maskersuccess";
    import maskerfail from "src/components/maskerfail/maskerfail";
    import util from "src/common/util";
    import url from "src/config/url";
    import hex_md5 from "src/plugins/MD5";
export default {
    props: {

    },
    data () {
        return {
            text: "",
            tips: "",
            isToastSuccess: false,
            isToastFail: false,
        }
    },
    components: {
        "v-submit": submit,
        "v-maskertips": maskertips,
        "v-maskersuccess": maskersuccess,
        "v-maskerfail": maskerfail,
    },
    created () {

    },
    methods: {
        submit () {
            let password = this.$refs.password.value;
            let newPassword = this.$refs["new-password"].value;
            let confirmPassword = this.$refs.confirm.value;

            // 密码
            if(password === '') {
                util.toast(util.tips.emptyOldPassword, this);
                return;
            }

            // 密码至少6位字符
            if(password.length <  6) {
                util.toast(util.tips.atLeastSixPhoneNumber, this);
                return;
            }

            //密码是否验证通过
            if(!util.regexp.password.test(password)) {
                util.toast(util.tips.comprisePassword, this);
                return;
            }

            if(newPassword === '') {
                util.toast(util.tips.emptyNewPassword,this);
                return;
            }

            if(newPassword.length < 6) {
                util.toast(util.tips.atLeastSixPhoneNumber, this);
                return;
            }

            if(!util.regexp.password.test(newPassword)) {
                util.toast(util.tips.comprisePassword, this);
                return;
            }

            if(confirmPassword !== newPassword) {
                util.toast(util.tips.differentPassword, this);
                return;
            }

            let md5oldPassword = hex_md5(password);
            let md5newPassword = hex_md5(newPassword);

            this.isShowConfirmMasker = false;
            this.$http.get(url.changePassword, {
                params: {
                    oldPassword: md5oldPassword,
                    newPassword: md5newPassword
                }
            }).then((response) => {
                if(response.data.status.code == 0) {
                    this.data = response.data.data;
                    this.$store.commit({
                        type: "data",
                        key: "changePassword",
                        value: response.data
                    });
                    util.toastSuccess(function () {
                        this.$router.push({
                            path: 'login'
                        });
                    }, this);
                }else {
                    util.toast(response.data.status.message, this);
                }
            }).catch((response) => {
                util.toast(response.message, this);
            });
        },
    }
}
</script>

<style lang="sass" scoped>
.wrapper{
    .password,.new-password,.confirm{
        padding-top: 31px;
        padding-bottom: 31px;
        padding-right: 20px;
        background-color: #fff;
        position: relative;
        display: block;
        font-size: 28px;
        line-height: 28px;
        margin-left: 20px;
        .label{
            display: inline-block;
            color: #666;
        }
        input{
            width: 530px;
        }
    }
}
</style>
