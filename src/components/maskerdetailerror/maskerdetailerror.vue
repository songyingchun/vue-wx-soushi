<template>
    <div class="masker-error">
        <div class="masker-container">
            <div class="m-box">
                <i class="icon"></i>
                <span class="text">暂无数据</span>
                <a href="javascript:window.history.go(-1)" class="button">返回上一页</a>
            </div>
        </div>
    </div>
</template>

<script>

</script>

<style lang="sass" scoped>
    @import "../../style/mixin.scss";
.masker-error{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    background: #fff;
    .masker-container {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        z-index: 11;
        .m-box {
            text-align: center;
            .icon{
                @include background("no-data.png");
                display: inline-block;
                width: 650px;
                height: 588px;
                margin-bottom: 35px;
            }
            .text{
                display: block;
                padding: 15px 0;
                font-size: 30px;
                text-align: center;
                color: #666;
                margin-bottom: 35px;
            }
            .button {
                padding: 20px 90px;
                border: 1px solid #ddd;
                border-radius: 10px;
                background: #f8f8f8;
                font-size: 26px;
                color: #000;
            }
        }
    }
}
</style>