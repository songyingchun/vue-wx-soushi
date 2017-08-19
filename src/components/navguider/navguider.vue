<template>
    <div class="nav-guider">
        <div class="guider" @click="showGuiderMasker">
            <i class="icon"></i>
            联系导购员
        </div>
        <div class="send" @click="checkLogin">
            样板寄送
        </div>
    </div>
</template>

<script>
    import util from "src/common/util";
export default {
    methods: {
        showGuiderMasker () {
            this.$emit("show-guider-masker");
        },
        checkLogin () {
            util.checkLogin("gallerySend");
        }
    }
}
</script>

<style lang="sass" scoped>
    @import "../../style/mixin.scss";
    .nav-guider{
        display: flex;
        bottom: 0;
        width: 100%;
        position: fixed;
        .guider, .send{
            background-color: #fff;
            position: relative;
            display: inline-block;
            vertical-align: top;
            text-align: center;
            text-overflow: ellipsis;
            cursor: pointer;
            height: 80px;
            line-height: 80px;
            font-size: 28px;
        }
        .guider{
            border-top: 1px solid #e1e1e1;
            color: #666;
            flex: 1;
            .icon {
                @include background("icon_service.png");
                display: inline-block;
                margin-right: 5px;
                width: 34px;
                height: 34px;
                position: relative;
                top: 4px;
            }
        }
        .send {
            flex: 2;
            background: #ff6d6e;
            color: #fff;
        }
    }
</style>