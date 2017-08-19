<template>
    <div class="pic-list" ref="pic-list" :class="{'show-pic': src}">
        <ul class="pic-wrapper">
            <li class="pic-item" v-for="(item, index) in list" :key="item.id" ref="pic-item">
                <router-link :to="{path: 'galleryDetail', query: {id: item.id}}">
                    <div class="box">
                        <img class="big-pic" :src="item.assistantImageList[item.currentIndex].assistantImageUrl" alt="">
                        <div class="small-pic-item-wrapper" ref="smallPicItemWrapper">
                            <div class="small-pic-item" :class="{active: item.currentIndex === index_imageUrlList }"
                                 v-for="(item_imageUrlList, index_imageUrlList) in item.assistantImageList"
                                 v-if="index_imageUrlList <= 3"
                                 @click.stop.prevent="selectSmallPic(index_imageUrlList, index, $event)"
                                 :key="item_imageUrlList.id">
                                <img class="small-pic" :src="item_imageUrlList.assistantImageUrl" alt="">
                            </div>
                        </div>
                        <p class="text">{{item.chineseName}}</p>
                        <v-circliful :similarity="item.similarity" v-show="src && index == 0"></v-circliful>
                    </div>
                </router-link>
            </li>
            <v-loadingbar :loading-status="loadingStatus" ref="loading-bar"></v-loadingbar>
        </ul>
    </div>

</template>

<script>
    import IScroll from "src/plugins/iscroll-probe";
    import loadingbar from "src/components/loadingbar/loadingbar";
    import circliful from "src/components/circliful/circliful";
    export default {
        props: {
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
            flag: {
                type: Boolean,
                default: false,
            }
        },
        data () {
            return {
                loading: false,
                scroll: {},
                loadingStatus: {
                    loading: true,
                    loaded: false,
                },
                list: []
            }
        },
        beforeCreate() {

        },
        created () {
            this.initList();
            this.initSearchPic();
        },
        mounted () {
            this.$nextTick(()=> {
                this.initScroll();
            });
        },
        methods: {
            initList () {
                let dataList = this.$store.state.data[this.page];
                let list = [];

                for(let i = 0, l = dataList.length; i < l; i++) {
                    list = list.concat(dataList[i].data.list);
                }

                for(let i = 0, l = dataList[dataList.length - 1].data.list.length; i < l; i++) {
                    let item = dataList[dataList.length - 1].data.list[i];
                    item.currentIndex = 0;
                    item.assistantImageList = [{assistantImageUrl: item.standardImage}, ...item.assistantImageList];
                }

                this.list = list;
            },
            initScroll () {
                let picList = this.$refs["pic-list"];
                let scroll = new IScroll(picList, {
                    bounceTime: 500,
                    mouseWheel: true,
                    scrollbars: true,
                    fadeScrollbars: true,
                    probeType: 3,
                    click:true
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
                                self.scroll.scrollTo(0, -self.$refs["pic-item"][0].clientHeight * (Math.ceil(self.$refs["pic-item"].length / 2)) + self.scroll.wrapperHeight - 20, 500);
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
            selectSmallPic(index_imageUrlList, index) {
                this.list[index].currentIndex = index_imageUrlList
            },
            initSearchPic () {
                let list = this.list;
                this.$emit("text", list[0].chineseName);
            },
        },
        components: {
            "v-loadingbar": loadingbar,
            "v-circliful": circliful,
        }
    }
</script>

<style lang="sass" scoped>
    @import "../../style/mixin.scss";
    .pic-list {
        background: #f8f8f8;
        position: absolute;
        top: 190px;
        bottom: 0px;
        width: 100%;
        overflow: hidden;
        &.show-pic{
            top: 430px;
         }
        .pic-wrapper {
            overflow: hidden;
            padding: 0 10px;
            .pic-item {
                padding: 20px 10px 0px;
                box-sizing: border-box;
                width: 50%;
                float: left;
                .box {
                    width: 100%;
                    background: #fff;
                    position: relative;
                    box-shadow: 0px 1px 5px rgba(0, 0, 0, .1);
                    .big-pic {
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
                            &.active img {
                                border: 1px solid #FF8989;
                            }
                        }
                    }
                    .text {
                        font-size: 26px;
                        padding: 20px 10px 20px;
                    }
                }
            }
        }
    }
</style>
