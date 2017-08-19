<template>
<div class="wrapper">
    <div class="container">
        <div class="pic-text">
            <div class="pic">
                <img src="./icon/logo_1.png" alt="">
            </div>
            <p class="text">
                让石材交易变得简单
            </p>
        </div>
        <div class="content">
            <div class="table-list">
                <div class="password">
                    <span class="label">设置密码</span>
                    <input type="password" placeholder="建议输入8位以上字符" ref="password">
                </div>
                <div class="confirm-password">
                    <span class="label">确认密码</span>
                    <input type="password" placeholder="请再次确认密码" ref="confirm-password">
                </div>
            </div>
            <div class="submit">
                <div class="button" @click="submit">完成</div>
            </div>
            <v-maskertips v-show="tips" :tips="tips"></v-maskertips>
            <v-maskersuccess v-show="isToastSuccess"></v-maskersuccess>
            <v-maskerfail v-show="isToastFail" :text="failText"></v-maskerfail>
        </div>
    </div>
</div>
</template>

<script>
    import maskertips from "src/components/maskertips/maskertips";
    import maskersuccess from "src/components/maskersuccess/maskersuccess";
    import maskerfail from "src/components/maskerfail/maskerfail";
    import util from "src/common/util";
    import url from "src/config/url";
    import hex_md5 from "src/plugins/MD5";
    export default {
        components: {
            "v-maskertips": maskertips,
            "v-maskersuccess": maskersuccess,
            "v-maskerfail": maskerfail,
        },
        data () {
            return {
                tips: "",
                isToastSuccess: false,
                isToastFail: false,
                failText: ""
            }
        },
        mounted () {
            this.setFullHeight();
        },
        methods: {
            setFullHeight () {
                util.setDocumentClientHeight(".wrapper");
            },
            setTime (val) {
                if (this.countdown == 0) {
                    val.removeAttribute("disabled");
                    val.value="获取验证码";
                    this.countdown = 60;
                    clearInterval(this.timer);
                } else {
                    val.setAttribute("disabled", true);
                    val.value = this.countdown +"s重新发送";
                    this.countdown--;
                }
            },
            submit () {
                let password = this.$refs.password.value;
                let confirmPassword = this.$refs["confirm-password"].value;

                // 密码
                if(password === '') {
                    util.toast(util.tips.emptyPassword, this);
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

                if(confirmPassword !== password) {
                    util.toast(util.tips.differentPassword, this);
                    return;
                }

                let md5Password = hex_md5(password);

                this.$http.get(url.resetPassword, {
                    params: {
                        password: md5Password
                    }
                }).then((response) => {
                    let data = response.data;
                    if(response.data.status.code === 0) {
                        this.data = response.data.data;
                        this.$store.commit({
                            type: "data",
                            key: "resetPassword",
                            value: response.data
                        });
                        util.toastSuccess(()=>{
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
            }
        }
    }
</script>

<style lang="sass" scoped>
    @import "../../style/mixin.scss";
    .wrapper{
        background: #f9f9f9;
        .pic-text{
            .pic{
                padding-top: 108px;
                text-align:center;
                img{
                    width: 170px;
                    height: 170px;
                }
            }
            .text{
                text-align: center;
                color: #666;
                padding-top: 30px;
                padding-bottom: 30px;
                font-size: 22px;
                line-height: 22px;
            }
        }
        .content{
            padding: 25px 75px;
            .table-list{
                border: 1px solid #ddd;
                border-radius: 10px;
                margin-bottom: 30px;
                .password, .confirm-password {
                    padding-top: 31px;
                    padding-bottom: 31px;
                    background-color: #fff;
                    position: relative;
                    display: block;
                    font-size: 28px;
                    line-height: 28px;
                    margin-left: 20px;

                    .label{
                        width: 130px;
                        display: inline-block;
                    }
                    input[type=input] {
                        width: 400px;
                    }
                }
                .password{
                    border-bottom: 1px solid #ddd;
                    border-top-right-radius: 20px;
                }
                .confirm-password{
                    border-bottom-right-radius: 20px;
                }
            }
            .button {
                background: #03A3E7;
                color: #fff;
                font-size: 30px;
                border-radius: 10px;
                line-height: 30px;
                padding: 28px 0;
                text-align: center;
                margin-bottom: 30px;
            }
        }
    }
</style>
