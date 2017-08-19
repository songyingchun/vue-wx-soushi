<template>
    <div class="receive-info">
        <div class="title">
            <span>收件信息</span>
            <span>
                <router-link :to="'addAddress'">新增</router-link>
            </span>
        </div>
        <div class="address-list">
            <div class="address-item" v-for="(item ,index) in list" @click="defaultAddress(index, item.id)">
                <div class="address-item-wrapper">
                    <p v-show="item.defaulted">默认地址</p>
                    <p class="info">
                        <span class="name">{{item.name}}</span>
                        <span class="phone">{{item.mobile}}</span>
                    </p>
                    <p class="address">
                        <span>{{item.fullAddress}}</span>
                    </p>
                    <i class="icon" :class="{active: item.defaulted}"></i>
                </div>
            </div>
        </div>
        <div class="notice">
            <div class="title">
                <span class="label">
                    备&nbsp;&nbsp;&nbsp;注：
                </span>
            </div>
            <div class="textarea">
                <textarea placeholder="请输入备注" v-model="textareaValue"></textarea>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        page: String,
        default: "",
    },
    data () {
        return {
            list: this.$store.state.data[this.page].data.list,
            textareaValue: "",
            defaultAddressCurrentIndex: -1,
        }
    },
    watch: {
        textareaValue (val, oldVal) {
            this.$emit("changeTextArea", val);
        }
    },
    created () {
        this.countDefaultAddressCurrentIndex();
    },
    methods:{
        countDefaultAddressCurrentIndex () {
            for(let i = 0, l = this.list.length; i < l; i ++) {
                let item = this.list[i];
                if(item.defaulted) {
                    this.defaultAddressCurrentIndex = i;
                    break;
                }
            }
            this.$emit("defaultAddress", this.defaultAddressCurrentIndex);
        },
        defaultAddress (index, id) {
            let sortItem = {};
            for(let i = 0, l = this.list.length; i < l; i ++) {
                let item = this.list[i];
                if(i == index) {
                    item.defaulted = true;
                    this.defaultAddressCurrentIndex = index;
                    sortItem = item;
                }else if(item.defaulted){
                    item.defaulted = false;
                }
            }
//            this.list.unshift(sortItem);
//            this.list.splice(index + 1, 1);
            this.$emit("defaultAddress", this.defaultAddressCurrentIndex, id);
        }
    }
}
</script>

<style lang="sass" scoped>
    @import "../../style/mixin.scss";
    .receive-info {
        padding-left:40px;
        .title{
            padding-top: 31px;
            padding-bottom: 31px;
            background-color: #fff;
            position: relative;
            display: block;
            font-size: 28px;
            line-height: 28px;
            border-bottom: 1px solid #ddd;
            span{
                display: inline-block;
                margin-right: 30px;
                a {
                    color: #03a3e7;
                }
            }
        }
        .address-list {
            .address-item {
                padding:15px 0;
                background-color: #fff;
                border-bottom: 1px solid #ddd;
                .address-item-wrapper{
                    margin-right: 40px;
                    position: relative;
                }
                p {
                    padding:15px 0;
                    font-size: 28px;
                    line-height: 28px;
                    .name {
                        display: inline-block;
                        margin-right: 30px;
                     }
                }
                .icon{
                    position: absolute;
                    right: 0;
                    top: 50%;
                    padding-top: 0;
                    transform: translate(0, -50%);
                    width: 32px;
                    height: 32px;
                    @include background("icon_default.png");
                    &.active{
                        @include background("icon_selected.png");
                     }
                }
            }
        }
    }
    .notice{
        padding-right: 40px;
        .title {
            border: 0;
        }
        .label {
            margin-right: 30px;
            display: inline-block;
            color: #666;
        }
        .textarea{
            margin-bottom: 40px;
            textarea{
                display: block;
                height: 210px;
                background: #f8f8f8;
                border-radius: 10px;
                border: 1px solid #e1e1e1;
                width: 100%;
                padding: 15px 0 0 20px;
                resize: none;
                font-size: 26px;
                box-sizing: border-box;
            }
        }
    }
</style>
