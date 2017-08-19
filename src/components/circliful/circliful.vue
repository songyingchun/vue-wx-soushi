<template>
    <div class="canvas circliful"
         data-dimension="60"
         data-width="1"
         data-fontsize="12"
         data-fgcolor="#ffd5cf"
         data-bgcolor="#a72e23"
         data-fill="#fff"
         ref="circliful">
        <span class="circle-text">{{similarityPercent}}</span>
        <span class="circle-info-half"></span>
        <canvas />
    </div>
</template>

<script>
    import $ from "jquery";
    import "src/plugins/circliful";
export default {
    props: {
        similarity: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            similarityPercent: "",
        }
    },
    computed: {

    },
    mounted () {
        this.addPercent();
        this.init();
    },
    methods: {
        init () {
            $(this.$refs.circliful).circliful();
        },
        addPercent () {
            this.similarityPercent = this.similarity + "%";
            $(this.$refs.circliful).data("data-text", this.similarityPercent);
            $(this.$refs.circliful).data("data-percent", this.similarityPercent);
        }
    }
}
</script>

<style lang="sass">
.circliful{
    width: 60px!important;
    height: 60px;
    position: absolute;
    right: 10px;
    bottom: 5px;
    .circle-text, .circle-info-half {
        width: 100%;
        position: absolute;
        text-align: center;
        display: inline-block;
        color: #a72e23;
        z-index: 1;
    }
    .circle-text {
        line-height: 60px;
        font-size: 12px;
    }
    .circle-info-half {
        line-height: 75px;
    }
    canvas{
        width: 60px;
        height: 60px;
        position: absolute;
        top: 0;
    }
}
</style>
