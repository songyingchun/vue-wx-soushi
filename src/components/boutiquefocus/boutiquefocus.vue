<template>
    <div class="focus">
        <div class="swiper-container" ref="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item, index) in imageUrlList" @click="showMakserSwiper(index)">
                    <img :src="item" alt="">
                </div>
            </div>
            <div class="text-area"></div>
            <span class="text">
                {{swiper.activeIndex + 1}}/<i>{{swiper.imagesLoaded}}</i>
            </span>
        </div>
    </div>
</template>

<script>
    import Swiper from "src/plugins/swiper";
export default {
    props: {
        imageUrlList: {
            type: Array,
            default: []
        },
        flag: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            swiper: {},
            currentIndex: 0,
        }
    },
    components: {

    },
    created () {

    },
    mounted () {
        this.initSwiper();
    },
    methods: {
        initSwiper () {
            let self = this;
            let swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                paginationClickable: true,
                onSlideChangeEnd: function (swiper) {

                }
            });
            this.swiper = swiper;
        },
        showMakserSwiper (index) {
            this.$emit("show-masker-swiper", index);
        }
    }
}
</script>

<style lang="sass">
.focus {
    .swiper-container {
        width: 100%;
        height: 100%;
        .swiper-slide {
            font-size: 18px;
            display: flex;
            img {
                width: 100%;
                height: 564px;
            }
        }
        .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
            background: #fff;
        }
        .swiper-pagination-bullet-active {
            background: #fff;
            width: 20px;
            border-radius: 5px;
        }
        .text-area {
            width: 200px;
            height: 200px;
            bottom: -110px;
            right: -100px;
            z-index: 10;
            transform: rotate(-40deg);
            position: absolute;
            opacity: 0.4;
            background: linear-gradient(#fff, #000);
        }
        .text {
            position: absolute;
            right: 20px;
            bottom: 20px;
            z-index: 10;
            font-size: 30px;
            color: #fff;
            i {
                font-size: 26px;
            }
        }
    }
}
</style>
