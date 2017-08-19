<template>
    <div class="show-search-pic">
        <div class="pic">
            <img :src="src" alt="">
        </div>
        <div class="text">
            识别度最高位为：
            <span>{{text}}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        src: {
            type: String,
            default: ""
        },
        text: {
            type: String,
            default: ""
        }
    }
}
</script>

<style lang="sass" scoped>
.show-search-pic{
    padding: 20px;
    overflow: hidden;
    position: relative;
    z-index: 11;
    background: #fff;
    .pic{
        float: left;
        img {
            width: 270px;
            height: 200px;
        }
    }
    .text {
        float: left;
        color: #787878;
        font-size: 26px;
        margin-left: 26px;
        line-height: 36px;
        margin-top: 15px;
    }
}
</style>
