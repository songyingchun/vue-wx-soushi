<template>
<div class="masker-confirm">
    <div class="masker-show" @click="cancel"></div>
    <div class="masker-container">
        <div class="m-box">
            <div class="title">{{text}}</div>
            <div class="content">
                <span class="cancel" @click="cancel">取消</span>
                <span class="confirm" @click="confirm">确认</span>
            </div>
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
    },
    methods: {
        cancel () {
            this.$emit("cancel");
        },
        confirm () {
            this.$emit("confirm");
        }
    }
}
</script>

<style lang="sass" scoped>
.masker-confirm{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    .masker-show{
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.65);
    }
    .masker-container{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        .m-box{
            border-radius: 10px;
            background: #fff;
            width: 580px;
            .title, .cancel, .confirm{
                font-size: 30px;
                text-align: center;
                display: block;
                line-height: 30px;
            }
            .title{
                color: #666;
                padding: 60px;
                border-bottom: 1px solid #ddd;
            }
            .content{
                display: flex;
                .cancel,.confirm{
                    padding: 30px;
                    flex: 1;
                }
                .cancel {
                    border-right: 1px solid #ddd;
                    color: #03A3E7;
                }
            }
        }
    }
}
</style>
