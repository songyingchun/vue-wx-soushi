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
                <div class="password">
                    <span class="label">密码</span>
                    <input type="password" placeholder="请输入账户密码" ref="password">
                </div>
            </div>
            <div class="submit">
                <div class="button" @click="submit">登录</div>
            </div>
            <p class="text">
                <router-link :to="'register'">
                    立即注册
                </router-link>
            </p>
            <p class="text">
                <router-link :to="'forgetPassword'">
                    忘记密码
                </router-link>
            </p>
        </div>
        <v-maskertips :tips="tips" v-show="tips"></v-maskertips>
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
            tips: ""
        }
    },
    mounted () {
        this.setFullHeight();
    },
    methods: {
        setFullHeight () {
            util.setDocumentClientHeight(".wrapper");
        },
        submit () {
            let phone = this.$refs.phone.value;
            let password = this.$refs.password.value;

            if(phone === '') {
                util.toast(util.tips.emptyPhone, this);
                return;
            };

            //手机号是否验证通过
            if(!util.regexp.phone.test(phone)) {
                util.toast(util.tips.correctPhone, this);
                return;
            }

            if(password === '') {
                util.toast(util.tips.emptyPassword, this);
                return;
            }

            if(!util.regexp.password.test(password)) {
                util.toast(util.tips.atLeastSixPhoneNumber, this);
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
                if(response.data.status.code == 0) {
                    this.data = response.data.data;
                    this.$store.commit({
                        type: "data",
                        key: "login",
                        value: response.data
                    });
                    this.$router.push({
                        path: 'index'
                    });
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
            .phone, .password {
                padding-top: 31px;
                padding-bottom: 31px;
                background-color: #fff;
                position: relative;
                display: block;
                font-size: 28px;
                line-height: 28px;
                margin-left: 20px;
                border-radius: 10px;
                .label{
                    width: 110px;
                    display: inline-block;
                }
            }
            .phone{
                border-bottom: 1px solid #ddd;
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
            margin-bottom: 15px;
        }
        .text{
            padding: 25px 0;
            font-size: 30px;
            line-height: 30px;
            text-align: center;
            a{
                color: #03A3E7;
            }
        }
    }
}
</style>