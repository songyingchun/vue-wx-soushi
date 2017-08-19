<template>
<div class="propose-price">
    <span class="label">参考价：</span>
    <div class="price" :class="{'showPrice': isShowPrice}">
        <i class="icon-rmb"></i>
        <div class="price-wrapper">
            <div class="stars-wrapper" v-show="!islogin">
                <i class="star-item"></i>
                <i class="icon-ym2"></i>
                <span class="see">会员可见</span>
            </div>
            <div class="text-wrapper" v-show="islogin">
                <span class="text">
                    2000
                </span>
                <i class="icon-ym2"></i>
            </div>
        </div>
    </div>
</div>
</template>

<script>
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
    }
</script>

<style lang="sass" scoped>
    @import "../../style/mixin.scss";
.propose-price{
    position: fixed;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    background: #fff;
    bottom: 0px;
    padding: 0px 23px;
    box-shadow: 0px 1px 5px rgba(0, 0, 0, .1), 0px -1px 5px rgba(0, 0, 0, .1);
    height: 80px;
    line-height: 80px;
    .price {
        display: flex;
        flex: 1;
        .icon-rmb{
            @include background("icon_rmb.png");
            width: 26px;
            height: 26px;
            display: inline-block;
            position: relative;
            margin-right: 7px;
            margin-top: 29px;
        }
        .price-wrapper {
            flex: 1;
            .stars-wrapper{
                .star-item{
                    @include background("icon_mm.png");
                    width: 89px;
                    height: 24px;
                    display: inline-block;
                    position: relative;
                    top: 2px;
                }
                .icon-ym2 {
                    @include background("icon_ypf.png");
                    width: 54px;
                    height: 22px;
                    margin-left: 8px;
                    display: inline-block;
                }
                .see {
                    color: #666;
                    font-size: 26px;
                    margin-right: 20px;
                }
                .register{
                    color: #03A3E7;
                    font-size: 26px;
                }
            }
            .text-wrapper{
                position: relative;
                overflow: hidden;
                .text{
                    color: #fd5400;
                    font-size: 44px;
                    font-weight: bold;
                }
                .icon-ym2 {
                    position: relative;
                    top: 2px;
                    width: 54px;
                    height: 22px;
                    @include background("icon_ypf.png");
                    margin-left: 8px;
                    display: inline-block;
                }
            }
        }
    }
}
</style>
