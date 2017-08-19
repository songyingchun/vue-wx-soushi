<template>
    <div class="wrapper">
        <div class="container">
            <div class="address-list">
                <div v-for="(item, index) in data.list">
                    <div class="address-item" >
                        <div class="address-info">
                            <div class="name-phone">
                                <span class="name">{{item.name}}</span>
                                <span class="phone">{{item.mobile}}</span>
                            </div>
                            <div class="address">
                                <span>{{item.fullAddress}}</span>
                            </div>
                        </div>
                        <div class="address-editor">
                        <span class="icon-wrapper" :class="{active: item.defaulted}">
                            <i class="icon"></i>
                             默认地址
                        </span>
                        <span class="editor" @click="editorAddress(item.id)">
                            <i class="icon"></i>
                            编辑
                        </span>
                        <span class="delete" @click="deleteAddress(item.id)">
                            <i class="icon"></i>
                            删除
                        </span>
                        </div>
                    </div>
                    <v-divider></v-divider>
                </div>
            </div>
        </div>
        <router-link :to="'addAddress'">
            <v-submit :text="'添加新地址'" v-if="flag" @submit="submit"></v-submit>
        </router-link>
        <v-maskerconfirm v-show="isShowConfirmMasker" :text="'是否确认删除收货地址'" @cancel="cancel" @confirm="confirm"></v-maskerconfirm>
        <v-maskertips v-show="tips" :tips="tips"></v-maskertips>
    </div>
</template>

<script>
    import divider from "src/components/divider/divider";
    import submit from "src/components/submit/submit";
    import maskerconfirm from "src/components/maskerconfirm/maskerconfirm";
    import maskertips from "src/components/maskertips/maskertips";
    import util from "src/common/util";
    import url from "src/config/url";
export default {
    components: {
        "v-divider": divider,
        "v-submit": submit,
        "v-maskerconfirm": maskerconfirm,
        "v-maskertips": maskertips,
    },
    data () {
        return {
            flag: false,
            data: {},
            isShowConfirmMasker: false,
            id: 0,
            tips: "",
        }
    },
    created () {
        this.getData();
    },
    mounted () {

    },
    methods: {
        getData () {
            this.$http.get(url.getMyDelivery, {
                params: {}
            }).then((response) => {
                console.log(response);
                if(response.data.status.code == 0) {
                    this.flag = true;
                    this.data = response.data.data;
                    this.$store.commit({
                        type: "data",
                        key: "getMyDelivery",
                        value: response.data
                    });
                }else {
                    util.toast(response.data.status.message, this);
                }
            }).catch((response) => {
                util.toast(response.message, this);
            });
        },
        editorAddress (id) {
            this.$router.push({
                path: 'editorAddress',
                query: {
                    id: id,
                    url: window.location.href
                }
            })
        },
        deleteAddress(id) {
            this.isShowConfirmMasker = true;
            this.id = id;
        },
        cancel () {
            this.isShowConfirmMasker = false;
        },
        confirm () {
            console.log(this.id);
            this.isShowConfirmMasker = false;
            this.$http.get(url.deleteDelivery, {
                params: {
                    id: this.id
                }
            }).then((response) => {
                if(response.data.status.code == 0) {
                    this.data = response.data.data;
                    this.$store.commit({
                        type: "data",
                        key: "deleteDelivery",
                        value: response.data
                    });
                    util.toast(util.tips.deleteSuccess, this);
                }else {
                    util.toast(response.data.status.message, this);
                }
            }).catch((response) => {
                util.toast(response.message, this);
            });
        },
        submit() {
            this.$router.push({
                path: 'addAddress',
                query: {
                    url: window.location.href
                }
            });
        }
    }
}
</script>

<style lang="sass" scoped>
    @import "../../style/mixin.scss";
    .address-list{
        .address-item{
            padding-left: 20px;
            padding-top: 31px;
            padding-bottom: 31px;
            background-color: #fff;
            position: relative;
            display: block;
            font-size: 28px;
            line-height: 28px;
            .address-info {
                padding-bottom: 15px;
                border-bottom: 1px solid #ddd;
                .name-phone, .address{
                    padding: 15px 0;
                }
            }
            .address-editor {
                overflow: hidden;
                padding-top: 23px;
                line-height: 28px;
                padding-right: 20px;
                .icon{
                    display: inline-block;
                    width: 32px;
                    height: 32px;
                    vertical-align: middle;
                }
                .icon-wrapper{
                    float: left;
                    .icon{
                        @include background("icon_default.png");
                    }
                    &.active .icon{
                        @include background("icon_selected.png");
                     }
                }
                .editor, .delete{
                    float: right;
                    font-size: 28px;
                    line-height: 28px;
                }
                .editor{
                    .icon{
                        @include background("icon_edit.png");
                    }
                }
                .delete{
                    margin-right: 40px;
                    .icon{
                        @include background("icon_delete.png");
                    }
                }
            }
        }
    }
</style>
