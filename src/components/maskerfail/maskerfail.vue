<template>
<div class="masker-fail">
    <div class="masker-container">
        <div class="m-box">
            <p class="fail">
                <i class="icon"></i>
                <span class="text">提交失败</span>
            </p>
            <p v-show="text">
                {{text}}
            </p>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: ""
        }
    }
}
</script>

<style lang="sass">
    @import "../../style/mixin.scss";
.masker-fail{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    .masker-container {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 11;
        .m-box{
            padding: 40px 80px;
            border-radius: 30px;
            color: #fff;
            font-size: 28px;
            background: rgba(0, 0, 0, 0.65);
            p{
                white-space: nowrap;
                padding: 10px 0;
                text-align: center;
                .icon{
                    display: inline-block;
                    width: 43px;
                    height: 43px;
                    @include background("icon_fail.png");
                    margin-right: 10px;
                    vertical-align: middle;
                }
            }
        }
    }
}
</style>
