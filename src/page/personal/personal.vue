<template>
    <div class="wrapper">
        <div class="container">
            <div class="personal-panel">
                <div class="pic">
                    <img src="./icon/none.png" alt="">
                </div>
                <p class="text">{{data.name}}</p>
            </div>
            <div class="person-options">
                <router-link :to="{path: 'authorized'}">
                    <div class="company icon-nextpage">
                        <span class="label">企业认证</span>
                        <span class="name">{{data.companyName}}</span>
                        <i class="authorized" v-if="data.employVerify == 2">认证</i>
                        <i class="unauthorized" v-if="data.employVerify != 2">未认证</i>
                    </div>
                </router-link>
                <v-divider></v-divider>
                <div class="price icon-showprice" :class="{active: isShowPrice}" @click="showPrice">
                    {{isShowPrice ? '显示' : '隐藏'}}产品价格
                </div>
                <router-link :to="'manageAddress'">
                    <div class="address icon-nextpage">
                        收货地址
                    </div>
                </router-link>
                <router-link :to="'modifyPassword'">
                    <div class="password icon-nextpage">
                        修改密码
                    </div>
                </router-link>
            </div>
            <div class="submit">
                <div class="button" @click="logout">退出登录</div>
            </div>
            <v-maskerconfirm v-show="isShowConfirmMasker" :text="'是否退出登录?'" @cancel="cancel" @confirm="confirm"></v-maskerconfirm>
        </div>
        <v-footer :index="4"></v-footer>
    </div>
</template>

<script>
    import divider from "src/components/divider/divider";
    import footer from "src/components/footer/footer";
    import maskerconfirm from "src/components/maskerconfirm/maskerconfirm";
    import util from "src/common/util";
    import url from "src/config/url";
    export default {
        props: {

        },
        components: {
            "v-divider": divider,
            "v-footer": footer,
            "v-maskerconfirm": maskerconfirm,
        },
        data () {
            return {
                data: {},
                page: "personal",
                genderMap: {
                    0: 'src/page/personal/icon/none.png',
                    1: 'src/page/personal/icon/man.png',
                    2: 'src/page/personal/icon/lady.png'
                },
                isShowPrice: false,
                isShowConfirmMasker: false,
            };
        },
        created () {
            this.pageShow();
            this.getData();
        },
        mounted () {
            console.log("mounted");
            util.setDocumentClientHeight(".wrapper");
        },
        methods: {
            pageShow () {
                window.onpageshow = function(event) {
                    if (event.persisted) {
                        window.location.reload()
                    }
                };
            },
            handleData () {
                return {}
            },
            getData() {
                this.$http.get(url.getMyProfile, {
                    params: this.handleData()
                }).then((response) => {
                    console.log("getData");
                    if(response.data.status.code == 0) {
                        this.data = response.data.data;
                        this.$store.commit({
                            type: "data",
                            key: this.page,
                            value: response.data
                        });
                    }else {
                        util.toast(response.data.status.message, this);
                    }
                }).catch((response) => {
                    util.toast(response.message, this);
                });
            },
            showPrice() {
                this.$http.get(url.setShowPrice, {
                    params: {
                        showPrice: this.isShowMasker ? 1 : 0
                    }
                }).then((response) => {
                    if(response.data.status.code == 0) {
                        this.isShowPrice = !this.isShowPrice;
                    }else {
                        util.toast(response.data.status.message, this);
                    }
                }).catch((response) => {
                    util.toast(response.message, this);
                });
            },
            logout () {
                this.isShowConfirmMasker = true;
            },
            cancel () {
                this.isShowConfirmMasker = false;
            },
            confirm () {
                this.isShowConfirmMasker = false;
                this.$http.get(url.logout, {
                    params: {}
                }).then((response) => {
                    if(response.data.status.code == 0) {
                        this.data = response.data.data;
                        this.$store.commit({
                            type: "data",
                            key: "logout",
                            value: response.data
                        });
                        this.$router.push({
                            path: 'login'
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
        .personal-panel{
            width: 100%;
            height: 435px;
            @include background('Bitmap.jpg');
            .pic{
                padding-top: 75px;
                text-align: center;
                width: 160px;
                margin: 0 auto;
                img{
                    width: 160px;
                    height: 160px;
                }
            }
            .text{
                text-align: center;
                color: #fff;
                font-size: 36px;
                line-height: 36px;
                padding-top: 30px;
            }
        }
        .person-options{
            background: #fff;
            margin-bottom: 50px;
            .icon-nextpage:after{
                content: '';
                -webkit-font-smoothing: antialiased;
                font-smoothing: antialiased;
                position: absolute;
                top: 50%;
                right: 20px;
                display: block;
                margin-top: -14px;
                width: 14px;
                height: 27px;
                @include background("icon_nextpage.png");
            }
            .company  {
                padding:36px 0 36px 20px;
                position: relative;
                font-size: 28px;
                line-height: 28px;
                i{
                    font-size: 20px;
                    padding: 7px 14px;
                    border-radius: 5px;
                    margin: -7px 5px 0;
                    vertical-align: top;
                    color: #fff;
                }
                .authorized{
                    background: #feb13b;
                }
                .unauthorized{
                    background: #d2d2d2;
                }
            }
            .price, .address, .password {
                padding-top: 31px;
                padding-bottom: 31px;
                background-color: #fff;
                position: relative;
                font-size: 28px;
                line-height: 28px;
                margin-left: 20px;
            }
            .price{
                border-bottom: 1px solid #ddd;
                &.icon-showprice:after{
                     content: '';
                     position: absolute;
                     top: 50%;
                     right: 20px;
                     margin-top: -16px;
                     width: 32px;
                     height: 32px;
                     @include background("icon_default.png");
                 }
                &.active.icon-showprice:after{
                    @include background("icon_selected_1.png");
                 }
            }
            .address {
                border-bottom: 1px solid #ddd;
            }
        }
        .submit {
            padding: 0 25px;
            .button {
                background-color: #fff;
                text-align: center;
                color: #03A3E7;
                font-size: 30px;
                border-radius: 10px;
                line-height: 30px;
                padding: 28px 0;
            }
        }
    }

</style>
