<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide">
                <img src="./icon/banner_01.jpg" alt="">
            </div>
            <div class="swiper-slide">
                <img src="./icon/banner_02.jpg" alt="">
            </div>
            <div class="swiper-slide">
                <img src="./icon/banner_03.jpg" alt="">
            </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
    </div>
</template>

<script>
export default {
    mounted () {
        this.initSwiper();
    },
    methods: {
        initSwiper () {
            const swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                paginationClickable: true,
//                    loop: true,
//                    autoplay: 2000,
//                    speed: 1000
            });
        },
    }
}
</script>

<style lang="sass" scoped>
.swiper-container {
    width: 100%;
    height: 100%;
    .swiper-slide {
        font-size: 18px;
        display: flex;
        height: 328px;
        img {
            width: 100%;
        }
    }
}
</style>
<style>
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
</style>
