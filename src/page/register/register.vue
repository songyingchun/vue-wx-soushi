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
                <div class="company">
                    <span class="label">公司名称</span>
                    <input type="text" placeholder="请输入公司名称" ref="company">
                </div>
                <div class="name">
                    <span class="label">姓名</span>
                    <input type="text" placeholder="请输入姓名" ref="name">
                </div>
                <div class="phone">
                    <span class="label">手机号</span>
                    <input type="text" placeholder="请输入手机号" ref="phone">
                </div>
                <div class="check">
                    <span class="label">验证码</span>
                    <input type="text" class="check-input" placeholder="请输入验证码" ref="check">
                    <input type="button" class="check-button" value="获取验证码" ref="get" @click="sendRegCode">
                </div>
                <div class="password">
                    <span class="label">密码</span>
                    <input type="password" placeholder="请输入6位以上字符" ref="password">
                </div>
                <div class="confirm-password">
                    <span class="label">确认密码</span>
                    <input type="password" placeholder="请确认密码" ref="confirm-password">
                </div>
            </div>
            <div class="submit">
                <div class="button" @click="submit">注册</div>
            </div>
            <div class="read" :class="{active: isRead}" @click="read">
                <i class="icon"></i>
                <p class="text">
                    我已阅读并同意
                    <span>《搜石网用户注册协议》</span>
                </p>
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
    import hex_md5 from "src/plugins/MD5";
    export default {
        components: {
            "v-maskertips": maskertips,
        },
        data () {
            return {
                tips: "",
                isRead: true,
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
            sendRegCode () {
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

                this.$http.get(url.sendRegCode, {
                    params: {
                        mobile: phone
                    }
                }).then((response) => {
                    let data = response.data;
                    let router = this.$store.state.router;
                    if(response.data.status.code == 0) {
                        this.data = response.data.data;
                        this.$store.commit({
                            type: "data",
                            key: "sendRegCode",
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
                let company = this.$refs.company.value;
                let name = this.$refs.name.value;
                let phone = this.$refs.phone.value;
                let check = this.$refs.check.value;
                let password = this.$refs.password.value;
                let confirmPassword = this.$refs["confirm-password"].value;

                // 请阅读《搜石网用户注册协议》
                if(!this.isRead) {
                    util.toast(util.tips.readProtocol, this);
                    return;
                };

                // 公司名
                if(company === '') {
                    util.toast(util.tips.emptyCompanyName, this);
                    return;
                }

                // 姓名
                if(name === '') {
                    util.toast(util.tips.emptyName, this);
                    return;
                }

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

                this.$http.get(url.login, {
                    params: {
                        password: md5Password,
                        mobile: phone
                    }
                }).then((response) => {
                    let data = response.data;
                    let router = this.$store.state.router;
                    if(response.data.status.code == 0) {
                        this.data = response.data.data;
                        this.$store.commit({
                            type: "data",
                            key: "register",
                            value: response.data
                        });
                        router.push({
                            path: 'login'
                        });
                    }else {
                        util.toast(response.data.status.message, this);
                    }
                }).catch((response) => {
                    util.toast(response.message, this);
                });
            },
            read () {
                this.isRead = !this.isRead;
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
                .company, .name, .phone, .check, .password, .confirm-password {
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
                .company,.name,.phone,.check,.password{
                    border-bottom: 1px solid #ddd;
                }
                .company{
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
            .read{
                text-align: center;
                font-size: 28px;
                line-height: 28px;
                display: flex;
                .icon{
                    @include background("icon_default.png");
                    display: inline-block;
                    width: 24px;
                    height: 24px;
                    position: relative;
                    top: 4px;
                }
                &.active .icon{
                    @include background("icon_selected.png");
                 }
                .text{
                     color: #666;
                     span{
                         color: #03A3E7;
                     }
                 }
            }
        }
    }
</style>
