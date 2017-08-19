<template>
    <div class="masker-swiper">
        <div class="masker-show" @click="hideMaskerSwiper"></div>
        <div class="masker-container">
            <div class="m-box">
                <div class="page">
                    <div class="slider" id="slider">
                        <ul>
                            <li v-for="(item, index) in imageList">
                                <div class="pinch-zoom">
                                    <img :src="item" alt="">
                                </div>
                            </li>
                        </ul>
                        <div class="text">
                            {{mySwipe.index + 1}}/<i>{{mySwipe.length}}</i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swipe from "src/plugins/swipe";
import RTP from "src/plugins/pinchzoom";
import util from "src/common/util";
import $ from "jquery";
export default {
    props: {
        assistantImageList: {
            type: Array,
            default: []
        },
        imageUrlList: {
            type: Array,
            default: []
        },
        index: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            mySwipe: {},
            imageList: []
        }
    },
    created () {
        this.fixImageList();
    },
    mounted () {
        this.initSwiper();
        this.initPinchZoom();
    },
    destroyed () {

    },
    methods: {
        initSwiper () {
            const mySwipe = new Swipe(document.getElementById('slider'), {
                speed: 400,
                callback: function (index) {}
            });
            this.mySwipe = mySwipe;
            this.mySwipe.slide(this.index);
        },
        initPinchZoom () {
            $("pinch-zoom").each( function (){
                new RTP.PinchZoom($(this), {});
            });
        },
        hideMaskerSwiper () {
            this.$emit("hide-masker-swiper");
        },
        fixImageList () {
            if(this.assistantImageList.length) {
                for(var i = 0, l = this.assistantImageList.length; i < l; i++) {
                    this.$set(this.imageList, i, this.assistantImageList[i].assistantImageUrl);
                }
            }

            if(this.imageUrlList.length) {
                for(var i = 0, l = this.imageUrlList.length; i < l; i++) {
                    this.$set(this.imageList, i, this.imageUrlList[i]);
                }
            }
        }
    }
}
</script>

<style lang="sass" scoped>
.masker-swiper {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    .masker-show {
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
        z-index: 11;
        li, img{
            width: 750px;
            height: 562.5px
        }
    }
    .page {
        width: 750px;
        position: relative;
    }
    .text{
        text-align: center;
        color: #fff;
        font-size: 34px;
        line-height: 54px;
        margin-top: 17px;
    }
}
</style>