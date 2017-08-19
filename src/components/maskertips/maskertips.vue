<template>
<div class="masker-tips">
    <div class="masker-container">
        <div class="m-box">
            <p>
                <span>{{tips}}</span>
            </p>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        tips:{
            type: String,
            default: ""
        }
    }
}
</script>

<style lang="sass" scoped>
.masker-tips{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    .masker-container{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 11;
        .m-box{
            padding: 20px 30px;
            border-radius: 10px;
            color: #fff;
            font-size: 28px;
            background: rgba(0, 0, 0, 0.65);
            p{
                white-space: nowrap;
                padding: 10px 0;
                text-align: center
            }
        }
    }
}
</style>