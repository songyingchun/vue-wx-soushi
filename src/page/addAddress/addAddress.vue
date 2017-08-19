<template>
    <div class="wrapper">
        <div class="container">
            <div class="name">
                <span class="label">联系人：</span>
                <input type="text" placeholder="请输入姓名" ref="name-input">
            </div>
            <div class="phone">
                <span class="label">电&nbsp;&nbsp;&nbsp;话：</span>
                <input type="text" placeholder="请输入电话" ref="phone-input">
            </div>
            <div class="address">
                <span class="label">地&nbsp;&nbsp;&nbsp;址：</span>
                <v-selectarea @province="getProvince" @city="getCity" @zone="getZone"></v-selectarea>
            </div>
            <div class="street">
                <span class="label">街&nbsp;&nbsp;&nbsp;道：</span>
                <input type="text" placeholder="请输入街道" ref="street-input">
            </div>
            <v-divider></v-divider>
            <div class="default">
                <span class="default-address" :class="{active: isDefaultAddress}" @click="defaultAddress">
                    <i class="icon"></i>
                    默认地址
                </span>
            </div>
        </div>
        <v-submit :text="'保存'" @submit="submit"></v-submit>
        <v-maskersuccess v-show="isToastSuccess"></v-maskersuccess>
        <v-maskertips v-show="tips" :tips="tips"></v-maskertips>
    </div>
</template>

<script>
    import selectarea from "src/components/selectarea/selectarea";
    import divider from "src/components/divider/divider";
    import maskertips from "src/components/maskertips/maskertips";
    import maskersuccess from "src/components/maskersuccess/maskersuccess";
    import submit from "src/components/submit/submit";
    import util from "src/common/util";
    import url from "src/config/url";

export default {
    components: {
        "v-selectarea": selectarea,
        "v-divider": divider,
        "v-submit": submit,
        "v-maskertips": maskertips,
        "v-maskersuccess": maskersuccess,
    },
    data () {
        return {
            isDefaultAddress: false,
            province: "",
            city: "",
            zone: "",
            isToastSuccess: false,
            tips: ""
        }
    },
    created () {
        this.init();
    },
    mounted () {

    },
    methods: {
        init() {

        },
        defaultAddress() {
            this.isDefaultAddress = !this.isDefaultAddress;
        },
        getProvince (address) {
            this.province = address.province;
        },
        getCity (address) {
            this.province = address.province;
            this.city = address.city;
        },
        getZone (address) {
            this.province = address.province;
            this.city = address.city;
            this.zone = address.zone;
        },
        submit () {
            let name = this.$refs["name-input"].value;
            let phone = this.$refs["phone-input"].value;
            let province = this.province;
            let city = this.city;
            let zone = this.zone;
            let street = this.$refs["street-input"].value;
            let defaulted = this.isDefaultAddress;

            if(name === '') {
                util.toast(util.tips.emptyContact, this);
                return;
            }

            if(phone === '') {
                util.toast(util.tips.emptyPhone, this);
                return;
            }

            if(!util.regexp.phone.test(phone)) {
                util.toast(util.tips.correctPhone, this);
                return;
            }

            if(province === '省份') {
                util.toast(util.tips.selectProvince, this);
                return;
            }

            if(city === '地级市') {
                util.toast(util.tips.selectCity, this);
                return;
            }

            if(zone === '县、区') {
                zone = '';
            }

            if(defaulted) {
                defaulted = 1;
            }else {
                defaulted = 0;
            }

            this.$http.get(url.addDelivery, {
                params: {
                    name: name,
                    mobile: phone,
                    provinceName: province,
                    cityName: city,
                    countyName: zone,
                    address: street,
                    defaulted: defaulted
                }
            }).then((response) => {
                let parse = util.getUrlDetail(window.location.href);
                let path = "";
                function getPath(parse) {
                    if(parse.parse) {
                        parse = parse.parse;
                        getPath(parse);
                    }else {
                        path = parse.match[12];
                    }
                }
                getPath(parse);
                if(response.data.status.code == 0) {
                    this.data = response.data.data;
                    this.$store.commit({
                        type: "data",
                        key: "addDelivery",
                        value: response.data
                    });
                    util.toastSuccess(()=>{
                        this.$router.push({
                            path: path
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
        .label{
            display: inline-block;
            color: #666;
        }
        .name,.phone,.address,.street,.default{
            padding: 31px 20px 31px 0;
            margin-left: 20px;
            background-color: #fff;
            position: relative;
            display: block;
            font-size: 28px;
            line-height: 28px;
            input{
                width: 570px;
            }
        }
        .name,.phone,.address{
            border-bottom: 1px solid #ddd;
        }
        .address{
            display: flex;
        }
        .default{
            .default-address{
                .icon{
                    @include background("icon_default.png");
                    display: inline-block;
                    width: 32px;
                    height: 32px;
                    vertical-align: middle;
                }
                &.active .icon{
                    @include background("icon_selected.png");
                 }
            }
        }
    }
</style>
