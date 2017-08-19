<template>
    <div class="price" :class="{'showPrice': isShowPrice}">
        <i class="icon-rmb"></i>
        <div class="price-wrapper">
            <div class="stars-wrapper" v-show="!islogin">
                <i class="star-item"></i>
                <i class="icon-ym2"></i>
                <span class="s-text" @click.stop.prevent="checkLogin('')">
                    <i class="icon-ask"></i>
                    价格
                </span>
            </div>
            <div class="text-wrapper" v-show="islogin">
                <span class="s-text">
                    2000
                </span>
                <i class="icon-ym2"></i>
            </div>
        </div>
    </div>
</template>

<script>
    import util from "src/common/util";
export default {
    data () {
        return {

        }
    },
    created () {
        this.islogin = this.$store.state.islogin;
        this.isShowPrice = this.$store.state.isShowPrice;
        this.isEmployVerify = this.$store.state.isEmployVerify;
    },
    methods: {
        checkLogin (path) {
            util.checkLogin(path, this);
        }
    }
}
</script>

<style lang="sass" scoped>
    @import "../../style/mixin.scss";
    .price {
        padding-left: 10px;
        overflow: hidden;
        padding-bottom: 20px;
        &.showPrice{
            .icon-rmb {
                margin-top: 9px;
            }
            .price-wrapper .text-wrapper .icon-ym2{
                margin-top: 15px;
            }
        }
        .icon-rmb {
            @include background("icon_rmb.png");
            width: 24px;
            height: 24px;
            vertical-align: bottom;
            float: left;
            margin-right: 7px;
            margin-top: 3px;
        }
        .price-wrapper {
            float: left;
            width: 293px;
            .stars-wrapper, .text-wrapper {
                position: relative;
                overflow: hidden;
                &.active {
                     display: block;
                 }
            }
            .stars-wrapper {
                .star-item {
                    @include background("icon_mm.png");
                    width: 89px;
                    height: 24px;
                    float: left;
                    margin-top: 2px;
                }
                .icon-ym2{
                    @include background("icon_ypf.png");
                    width: 46px;
                    height: 20px;
                    float: left;
                    margin-left: 8px;
                    margin-top: 5px;
                }
                .s-text {
                    float: right;
                    font-size: 24px;
                    color: #666;
                    text-decoration: underline;
                    .icon-ask{
                        @include background("icon_wh.png");
                        width: 24px;
                        height: 24px;
                        float: right;
                        margin-left: 10px;
                    }
                }
            }
            .text-wrapper {
                .s-text {
                    font-size: 36px;
                    color: #fc5302;
                    float: left;
                    margin-top: 2px;
                    font-weight: bold;
                }
                .icon-ym2 {
                    @include background("icon_ypf.png");
                    width: 46px;
                    height: 20px;
                    float: left;
                    margin-left: 8px;
                    margin-top: 5px;
                }
            }
        }
    }
</style>
