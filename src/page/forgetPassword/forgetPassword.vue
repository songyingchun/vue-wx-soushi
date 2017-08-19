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
                <div class="phone">
                    <span class="label">手机号</span>
                    <input type="text" placeholder="请输入手机号" ref="phone">
                </div>
                <div class="check">
                    <span class="label">验证码</span>
                    <input type="text" class="check-input" placeholder="请输入验证码" ref="check">
                    <input type="button" class="check-button" value="获取验证码" ref="get" @click="resetPasswordPre">
                </div>
            </div>
            <div class="submit">
                <div class="button" @click="submit">下一步</div>
            </div>
            <v-maskertips v-show="tips" :tips="tips"></v-maskertips>
        </div>
    </div>
</div>
</template>

<script>
    import maskertips from "src/components/maskertips/maskertips";
    import util from "src/common/util";
    import url from "src/config/url";
    export default {
        components: {
            "v-maskertips": maskertips,
        },
        data () {
            return {
                tips: "",
                countdown: 60,
                timer: null
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
                if (this.countdown === 0) {
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
            resetPasswordPre () {
                let phone = this.$refs.phone.value;

                if(phone === '') {
                    util.toast(util.tips.emptyPhone, this);
                    return;
                }

                //手机号是否验证通过
                if(!util.regexp.phone.test(phone)) {
                    util.toast(util.tips.correctPhone, this);
                    return;
                }

                this.$http.get(url.resetPasswordPre, {
                    params: {
                        mobile: phone
                    }
                }).then((response) => {
                    let data = response.data;
                    if(response.data.status.code === 0) {
                        this.data = response.data.data;
                        this.$store.commit({
                            type: "data",
                            key: "resetPasswordPre",
                            value: response.data
                        });

                        this.setTime(this.$refs.get);
                        this.timer = setInterval(()=>{
                            this.setTime(this.$refs.get);
                        },1000);

                    }else {
                        util.toast(response.data.status.message, this);
                    }
                }).catch((response) => {
                    util.toast(response.message, this);
                });
            },
            submit () {
                let phone = this.$refs.phone.value;
                let check = this.$refs.check.value;

                // 手机号
                if(phone === '') {
                    util.toast(util.tips.emptyPhone, this);
                    return;
                }

                //手机号是否验证通过
                if(!util.regexp.phone.test(phone)) {
                    util.toast(util.tips.correctPhone, this);
                    return;
                }

                // 验证码
                if(check === '') {
                    util.toast(util.tips.emptyCode, this);
                    return;
                }

                this.$http.get(url.resetPasswordPre, {
                    params: {
                        mobile: phone,
                        code: check
                    }
                }).then((response) => {
                    let data = response.data;
                    if(response.data.status.code === 0) {
                        this.data = response.data.data;
                        this.$store.commit({
                            type: "data",
                            key: "resetPasswordPre",
                            value: response.data
                        });
                        this.$router.push({
                            path: 'findPassword'
                        });
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
                padding-top: 168px;
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
                .phone, .check {
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
                .phone{
                    border-bottom: 1px solid #ddd;
                    border-top-right-radius: 20px;
                }
                .check {
                    padding-right: 20px;
                    .check-input{
                        width: 200px;
                    }
                    .check-button{
                        color: #03A3E7;
                        float: right;
                        background: none;
                    }
                    .check-button[disabled]{
                        color: #666;
                    }
                }
                .check{
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
