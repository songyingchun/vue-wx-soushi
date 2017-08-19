<template>
    <div class="loading-bar" :class="{loading: loadingStatus.loading && !loadingStatus.loaded, loaded: loadingStatus.loaded && !loadingStatus.loading}">
        <i class="loading-icon"></i>
        <span class="text">{{text}}</span>
    </div>
</template>

<script>
export default {
    props: {
        loadingStatus: {
            type: Object,
            default: {}
        }
    },
    data () {
        return {

        }
    },
    computed: {
        text () {
            if(this.loadingStatus.loaded) {
                return "没有更多";
            }
            return "加载中..."
        }
    },
    methods: {

    }
}
</script>

<style lang="sass" scoped>
    .loading-bar {
        width: 100%;
        height: 80px;
        line-height: 80px;
        float: left;
        text-align: center;
        font-size: 20px;
    .loading-icon, .text{
        opacity: 0;
    }
    &.loaded .loading-icon {
        display: none;
     }
    &.loading .loading-icon{
         display: inline-block;
         height: 15px;
         width: 15px;
         border-radius: 100%;
         margin: 6px;
         border: 2px solid #666;
         border-bottom-color: transparent;
         vertical-align: middle;
         -webkit-animation: rotate 0.75s linear infinite;
         animation: rotate 0.75s linear infinite;
     }
    &.loading .loading-icon, .text{
         opacity: 1;
     }
    }
    @-webkit-keyframes rotate {
        0% {
            -webkit-transform: rotate(0deg);
        }
        50% {
            -webkit-transform: rotate(180deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
        }
    }
    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(180deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
