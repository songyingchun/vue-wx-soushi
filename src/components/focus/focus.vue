<template>
    <div class="focus">
        <div class="swiper-container" ref="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item, index) in imageList" @click="showMakserSwiper(index)">
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
        assistantImageList: {
            type: Array,
            default: []
        },
        imageUrlList: {
            type: Array,
            default: []
        }
    },
    data () {
        return {
            swiper: {},
            currentIndex: 0,
            imageList: []
        }
    },
    components: {

    },
    created () {
        this.fixImageList();
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
                    let index = swiper.activeIndex;
                    let total = swiper;
//                    $(".count").html(index + 1 + '/' + '<i>' + swiper.imagesLoaded + '</i>');
//                    $(".count span").text(index + 1);
                }
            });
            this.swiper = swiper;
        },
        showMakserSwiper (index) {
            this.$emit("show-masker-swiper", index);
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
