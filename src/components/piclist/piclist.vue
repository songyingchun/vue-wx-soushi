<template>
    <div class="pic-list" :class="[page,{'show-pic': src}]" ref="pic-list">
        <ul class="pic-wrapper">
            <li class="pic-item" v-for="(item, index) in list" :key="item.id" ref="pic-item">
                <router-link :to="{path: linkPage, query: {blockId: item.idString, companyId: item.companyId}}">
                    <div class="box">
                        <img class="big-pic" :src="item.imageUrlList[item.currentIndex]" alt="">
                        <div class="small-pic-item-wrapper" ref="smallPicItemWrapper">
                            <div class="small-pic-item" :class="{active: item.currentIndex === index_imageUrlList }" v-for="(item_imageUrlList, index_imageUrlList) in item.imageUrlList" v-if="index_imageUrlList <= 3" @click.stop.prevent="selectSmallPic(index_imageUrlList, index, $event)"  :key="item_imageUrlList.id">
                                <img class="small-pic" :src="item_imageUrlList" alt="">
                            </div>
                        </div>
                        <p class="text">{{item.variety}}-{{item.gradeName}}</p>
                        <v-price></v-price>
                        <v-circliful :similarity="item.similarity" v-show="src && index == 0 && islogin"></v-circliful>
                    </div>
                </router-link>
            </li>
            <v-loadingbar :loadingStatus="loadingStatus" ref="loading-bar"></v-loadingbar>
        </ul>
    </div>
</template>

<script>
    import price from "src/components/price/price";
    import showsearchpic from "src/components/showsearchpic/showsearchpic";
    import circliful from "src/components/circliful/circliful";
    import IScroll from "src/plugins/iscroll-probe";
    import loadingbar from "src/components/loadingbar/loadingbar";

export default {
    props:{
        src: {
            type: String,
            default: ""
        },
        page: {
            type: String,
            default: ""
        },
        time: {
            type: Number,
            default: 1
        },
        bar: {
            type: String,
            default: ""
        }
    },
    data () {
        return {
            scroll: {},
            loadingStatus: {
                loading: true,
                loaded: false,
            },
            text: "",
            isShowBar: false,
            linkPageMap: {
                "index": "boutiqueDetail",
                "boutique": "boutiqueDetail",
                "bouttiqueDetail": "boutiqueDetail",
                "search": "searchDetail",
                "searchDetail": "searchDetail",
            },
            barHeight: 0,
            list: [],
            islogin: this.$store.state.islogin
        }
    },
    created () {
        console.log("created");
        this.initList();
        this.initSearchPic();
    },
    mounted () {
        console.log("mounted");
        this.$nextTick(()=> {
            this.initScroll();
        });
    },
    destroyed() {
        console.log("destroyed");
    },
    computed: {
        linkPage () {
            return this.linkPageMap[this.page];
        },
    },
    methods: {
        initList () {
            let dataList = this.$store.state.data[this.page];
            let list = [];
            let listStr = "list";
            if(this.page === "boutiqueDetail" || this.page === "searchDetail") {
                listStr = "similar";
            }

            for(let i = 0, l = dataList.length; i < l; i++) {
                list = list.concat(dataList[i].data[listStr]);
            }

            for(let i = 0, l = dataList[dataList.length - 1].data[listStr].length; i < l; i++) {
                let item = dataList[dataList.length - 1].data[listStr][i];
                item.currentIndex = 0;
            }

            this.list = list;
        },
        initScroll () {
            this.getBarHeight();
            let picList = this.$refs["pic-list"];
            let scroll = new IScroll(picList, {
                bounceTime: 500,
                mouseWheel: true,
                scrollbars: true,
                fadeScrollbars: true,
                probeType: 3,
                click: true
            });
            let self = this;
            scroll.on("scrollEnd", function () {
                if(this.y <= this.maxScrollY) {
                    let length = self.$store.state.data[self.page].length;
                    if(self.time === 1 || length === self.time){
                        self.$set(self.loadingStatus, "loading", false);
                        self.$set(self.loadingStatus, "loaded", true);
                    }
                    setTimeout(()=>{
                        if(self.time === 1 || length === self.time) {
                            self.scroll.refresh();
                            console.log(self.barHeight);
                            self.scroll.scrollTo(0, -self.$refs["pic-item"][0].clientHeight * (Math.ceil(self.$refs["pic-item"].length / 2)) + self.scroll.wrapperHeight - self.barHeight, 500);
                        }else{
                            self.reloadData();
                        }
                        setTimeout(()=>{
                            self.$set(self.loadingStatus, "loading", true);
                            self.$set(self.loadingStatus, "loaded", false);
                        }, 500);
                    }, 300);
                }
            });

            scroll.on("scroll", function (pos) {
                if(this.y <= this.maxScrollY) {
                    self.$set(self.loadingStatus, "loading", true);
                }
            });

            this.scroll = scroll;

            let length = this.$store.state.data[this.page].length;
            if(length > 1 && length <= this.time) {
                this.scroll.refresh();
                this.scroll.scrollTo(0, -this.$refs["pic-item"][0].clientHeight * (Math.ceil(this.$refs["pic-item"].length / 2) - 4) + this.scroll.wrapperHeight  - this.$refs["loading-bar"].$el.clientHeight);
            }
        },
        reloadData () {
            this.$emit("get-data", {
                pullDown: true
            });
        },
        selectSmallPic(index_imageUrlList, index, ev) {
            this.list[index].currentIndex = index_imageUrlList;
        },
        getBarHeight () {
            console.log(this.bar);
            if(this.bar) {
                this.barHeight = document.querySelector("." + this.bar).clientHeight + 10;
            }
        },
        initSearchPic () {
            let list = this.list;
            this.$emit("text", list[0].variety);
        },
    },
    components: {
        "v-price": price,
        "v-loadingbar": loadingbar,
        "v-showsearchpic": showsearchpic,
        "v-circliful": circliful,
    }
}
</script>

<style lang="sass" scoped>
        .pic-list{
            background: #f8f8f8;
            position: absolute;
            bottom: 0;
            width: 100%;
            overflow: hidden;
            &.index {
                 top: 625px;
                .pic-wrapper {
                    padding-bottom: 95px;
                }
             }
            &.boutique,&.search {
                top: 190px;
             }
            &.boutiqueDetail, &.searchDetail {
                top: 0px;
                height: 782px;
                .pic-wrapper{
                    padding-bottom: 80px;
                }
            }
            &.show-pic{
                 top: 430px;
             }
        }
        .pic-wrapper{
            overflow: hidden;
            padding: 0 10px;
            .pic-item{
                padding: 20px 10px 0;
                box-sizing: border-box;
                width: 50%;
                float: left;
                .box{
                    width: 100%;
                    background: #fff;
                    position: relative;
                    box-shadow: 0px 1px 5px rgba(0, 0, 0, .1);
                    .big-pic{
                        width: 100%;
                        height: 260px;
                    }
                    .small-pic-item-wrapper {
                        padding: 10px 5px 0;
                        overflow: hidden;
                        .small-pic-item {
                            padding: 0px 5px;
                            box-sizing: border-box;
                            float: left;
                            width: 25%;
                            img {
                                width: 73px;
                                height: 55px;
                            }
                            &.active img{
                                 border: 1px solid #FF8989;
                             }
                        }
                    }
                    .text{
                        font-size: 26px;
                        padding: 20px 10px 20px;
                    }
                }
            }
        }
</style>
