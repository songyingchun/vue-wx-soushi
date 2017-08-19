<template>
    <div class="masker-guider">
        <div class="masker-show" @click="hideGuiderMasker"></div>
        <div class="masker-container">
            <div class="m-box">
                <div class="box-wrapper">
                    <div class="th">
                        <div class="title">
                            专业导购员一对一服务
                        </div>
                        <div class="tb">
                            <div class="name">长按二维码添加导购员微信</div>
                            <div class="pic">
                                <img src="./icon/ewm.png" alt="">
                            </div>
                            <p class="text">人工导购热线：0766-8520999</p>
                        </div>
                    </div>
                </div>
                <div class="close" @click="hideGuiderMasker">
                    <i class="icon"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        hideGuiderMasker() {
            this.$emit('hide-guider-masker');
        }
    }
}
</script>

<style lang="sass" scoped>
    @import "../../style/mixin.scss";
.masker-guider{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    .masker-show{
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 10;
        background: rgba(0, 0, 0, 0.65);
    }
    .masker-container{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        z-index: 11;
        .box-wrapper{
            background: #fff;
            border-radius: 10px;
            width: 540px;
            .th .title{
                padding: 45px 0;
                font-size: 30px;
                text-align: center;
                border-bottom: 1px solid #e1e1e1;
            }
            .tb{
                padding: 40px 25px;
                .name{
                    font-size: 26px;
                    line-height: 26px;
                    margin-bottom: 40px;
                    text-align: center;
                }
                .pic{
                    width: 380px;
                    height: 380px;
                    margin: 0 auto 40px auto;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .text{
                    font-size: 26px;
                    color: #666;
                    text-align: center;
                }
            }
        }
        .close{
            width: 100%;
            height: 166px;
            position: relative;
            .icon {
                @include background("icon_gb.png")
                width: 102px;
                height: 102px;
                margin: 0 auto;
                display: block;
                position: relative;
                top: 64px;
            }
        }
    }
}
</style>