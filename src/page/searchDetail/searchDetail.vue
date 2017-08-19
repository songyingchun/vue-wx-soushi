<template>
    <div class="wrapper">
        <div class="container">
            <v-focus :assistantImageList="[]" :imageUrlList="detail.imageUrlList" @show-masker-swiper="showMaskerSwiper" v-if="flag"></v-focus>
            <div class="info-wrapper">
                <p class="name">{{detail.variety}}-{{detail.gradeName}}</p>
                <p class="iden">{{detail.blockNo}}</p>
                <p class="format">规格：{{detail.length}} * {{detail.width}} * {{detail.thickness}}mm</p>
                <p class="number">{{number}}</p>
                <p class="sail">销售方式：{{detail.saleMethodName}}</p>
            </div>
            <v-divider></v-divider>
            <div class="productor">
                <div class="productor-control control-list">
                    <span class="control-item" :class="{active: controlItemCurrentIndex == 0}" @click="controlItemIndex(0)">详细码单</span>
                    <span class="control-item" :class="{active: controlItemCurrentIndex == 1}" @click="controlItemIndex(1)">同种板材</span>
                    <span class="control-item" :class="{active: controlItemCurrentIndex == 2}" @click="controlItemIndex(2)">供应商</span>
                </div>
                <div class="productor-content content-list">
                    <div class="content-item bundle" v-show="controlItemCurrentIndex == 0">
                        <div class="bundle-control">
                            <div class="swiper-container2">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide" :class="{'swiper-slide-active': packetCurrentIndex == index}" v-for="(item, index) in detail.packetInfos" v-text="index + 1 + '扎'" @click="packetIndex(index)"></div>
                                </div>
                            </div>
                        </div>
                        <div class="bundle-wrapper">
                            <div class="bundle-list">
                                <div class="bundle-item" v-for="(item, index) in detail.packetInfos" v-show="packetCurrentIndex == index">
                                    <div class="title-amount">
                                        <span class="total-bundle" v-text="detail.blockNo + '-' + item.packetNo"></span>
                                        <span class="total-number" v-text="'小计：' + item.packetSliceNum + '件'"></span>
                                        <span class="total-square">
                                            <em v-text="'共计：' + item.packetTotalArea"></em>
                                            <i class="icon-m2"></i>
                                        </span>
                                    </div>
                                    <div class="title-slice">
                                        <span class="slice-no">件号</span>
                                        <span class="slice-length">长mm</span>
                                        <span class="slice-width">宽mm</span>
                                        <span class="slice-thickness">厚mm</span>
                                        <span class="slice-lost-area">
                                            扣角<i class="icon-m2"></i>
                                        </span>
                                        <span class="slice-area">
                                            面积<i class="icon-m2"></i>
                                        </span>
                                    </div>
                                    <div class="data-list">
                                        <div class="data-item" v-for="(item, index) in item.slicesInfo">
                                            <span class="slice-no-data" v-text="item.sliceNo"></span>
                                            <span class="slice-length-data" v-text="item.sliceLength"></span>
                                            <span class="slice-width-data" v-text="item.sliceWidth"></span>
                                            <span class="slice-thickness-data" v-text="item.sliceThickness"></span>
                                            <span class="slice-lost-data" v-text="item.totalLostAngleArea || '- -'"></span>
                                            <span class="slice-area-data" v-text="item.sliceArea"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="content-item slab" v-show="controlItemCurrentIndex == 1">
                        <v-piclist :page="page" :bar="bar" :time="time" @get-data="getData" v-if="piclistFlag"></v-piclist>
                        <v-loadingbar :loadingStatus="loadingStatus" ref="loading-bar" v-show="loadingStatus.show"></v-loadingbar>
                    </div>
                    <div class="content-item supplier" v-show="controlItemCurrentIndex == 2">
                        <v-supplier :page="page" v-if="flag"></v-supplier>
                    </div>
                </div>
            </div>
            <v-maskerswiper :assistantImageList="[]" :imageUrlList="detail.imageUrlList" :isShowMaskerSwiper="isShowMaskerSwiper" @hide-masker-swiper="hideMaskerSwiper" :index="index" v-if="isShowMaskerSwiper"></v-maskerswiper>
            <v-proposeprice></v-proposeprice>
        </div>
    </div>
</template>

<script>
    import focus from "src/components/focus/focus";
    import divider from "src/components/divider/divider";
    import maskerguider from "src/components/maskerguider/maskerguider";
    import maskerdetailerror from "src/components/maskerdetailerror/maskerdetailerror";
    import maskerswiper from "src/components/maskerswiper/maskerswiper";
    import piclist from "src/components/piclist/piclist";
    import supplier from "src/components/supplier/supplier";
    import proposeprice from "src/components/proposeprice/proposeprice";
    import loadingbar from "src/components/loadingbar/loadingbar";
    import url from "src/config/url";
    import util from "src/common/util";
export default {
    props: {

    },
    data () {
        return {
            boutiqueDetailData: {},
            detail: {},
            flag: false,
            isShowGuiderMasker: false,
            isShowDetailErrorMasker: false,
            isShowMaskerSwiper: false,
            index: 0,
            controlItemCurrentIndex: 0,
            packetCurrentIndex: 0,
            picListData: {},
            src: "",
            searchPic: false,
            page: "searchDetail",
            time: 1,
            bar: "propose-price",
            loadingStatus: {
                loading: true,
                loaded: false,
                show: false,
            },
            piclistFlag: false
        }
    },
    components: {
        "v-focus": focus,
        "v-divider": divider,
        "v-maskerguider": maskerguider,
        "v-maskerdetailerror": maskerdetailerror,
        "v-maskerswiper": maskerswiper,
        "v-piclist": piclist,
        "v-supplier": supplier,
        "v-proposeprice": proposeprice,
        "v-loadingbar": loadingbar,
    },
    computed: {
        number () {
            console.log("computed-number");
            if(this.detail && this.detail.packetInfos) {
                let slicesInfos = 0;
                if(this.detail && this.detail.packetInfos) {
                    for(let i = 0; i < this.detail.packetInfos.length; i++) {
                        slicesInfos += this.detail.packetInfos[i].slicesInfo.length;
                    }
                    return "数量：" + this.detail.packetInfos.length + "扎 / " + slicesInfos + '件 / ' + this.detail.area;
                }
            }
            return "";
        }
    },
    created () {
        this.initBundleControlSwiper();
        this.loadingStatus.show = true;
    },
    beforeUpdate () {
        console.log("beforeUpdata");
    },
    updated () {
        console.log("updated");
    },
    mounted () {
        console.log("mounted");
        this.getData();
    },
    beforeDestroy () {
        console.log("beforeDestroy");
    },
    destroyed () {
        console.log("destroyed");
    },
    methods: {
        title () {
            document.title = this.detail.variety;
        },
        handleData () {
            return {
                stoneLibId: util.parseUrl(window.location.href).id
            }
        },
        getData () {
            console.log("getData");
            this.$http.get(url[this.page], {
                params: this.handleData()
            }).then((response) => {
                if(response.data.status.code == 0) {
                    this.searchDetailData = response.data;
                    console.log("boutiqueDetailData");
                    this.$store.commit({
                        type: "dataList",
                        key: this.page,
                        value: response.data
                    });
                    this.detail = this.searchDetailData.data.detail;
                    this.initBundleControlSwiper();
                    this.title();
                    this.flag = true;
                }else {
                    this.isShowDetailErrorMasker = true;
                }
            }).catch((response) => {
                this.isShowDetailErrorMasker = true;
            });
        },
        hideGuiderMasker () {
            this.isShowGuiderMasker = false;
        },
        showGuiderMasker () {
            this.isShowGuiderMasker = true;
        },
        showMaskerSwiper (index) {
            this.index = index;
            this.isShowMaskerSwiper = true;
        },
        hideMaskerSwiper () {
            this.isShowMaskerSwiper = false;
        },
        controlItemIndex (index) {
            this.controlItemCurrentIndex = index;
            if(index === 1) {
                setTimeout(()=>{
                    this.piclistFlag = true;
                    this.loadingStatus.show = false;
                }, util.loadPicListTime);
            }
        },
        initBundleControlSwiper () {
            let swiper2 = new Swiper('.swiper-container2', {
                slidesPerView: 'auto',
                grabCursor: true
            });
        },
        packetIndex (index) {
            this.packetCurrentIndex = index;
        }
    }
}
</script>

<style lang="sass" scoped>
    @import "../../style/mixin.scss";
.info-wrapper {
    padding: 26px;
    p{
        font-size: 26px;
        padding: 16px 0;
        line-height: 26px;
    }
    .name {
        font-size: 32px;
        font-weight: bold;
        line-height: 32px;
    }
}
.productor{
    padding-bottom: 100px;
    .control-list {
        padding: 0 20px;
        border-bottom: 2px solid #f2f2f2;
        .control-item{
            font-size: 30px;
            color: #666;
            display: inline-block;
            padding: 28px 0px 28px 0;
            margin-right: 40px;
            &.active{
                 color: #03A3E7;
                 border-bottom: 2px solid #03A3E7;
                 margin-bottom: -1px;
             }
        }
    }
    .content-list {
        .content-item {
            position: relative;
        }
    }
}

.bundle-control {
    .swiper-container2 {
        width: 100%;
        position: relative;
        overflow: hidden;
        background: #f8f8f8;
        .swiper-slide {
            text-align: center;
            font-size: 30px;
            line-height: 30px;
            width: 116px;
            margin: 25px 0;
            border-right: 1px solid #999;
            &.swiper-slide-active {
                 color: #03A3E7;
             }
            &:last-child {
                  border-right: 0;
              }
        }
    }
}
.bundle-wrapper {
    .icon-m2 {
        @include background("icon_m2.png");
        width: 28px;
        height: 25px;
        display: inline-block;
        position: relative;
        top: 2px;
    }
    .bundle-list{
        .bundle-item{
            .title-amount {
                display: flex;
                padding: 0px 10px 0px 26px;
                background: #e2f3fa;
                .total-bundle, .total-number, .total-square{
                    padding: 26px 0;
                    font-size: 28px;
                    line-height: 28px;
                    color: #666;
                    width: 230px;
                }
                .total-square {
                    flex: 1;
                    text-align: right;
                }
            }

            .title-slice{
                display: flex;
                background: #f9f9f9;
                span{
                    flex: 1;
                    padding: 27px 0;
                    font-size: 28px;
                    line-height: 28px;
                    color: #666;
                    text-align: center;
                }
            }
            .data-list {
                .data-item {
                    display: flex;
                    span{
                        flex: 1;
                        padding: 26px 0;
                        font-size: 28px;
                        line-height: 28px;
                        text-align: center;
                    }
                }
            }
        }
    }
}
</style>