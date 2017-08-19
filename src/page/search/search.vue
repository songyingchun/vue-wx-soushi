<template>
    <div class="wrapper">
        <div class="container">
            <div class="masker masker-black" @click="hideMasker()" v-show="isShowMasker"></div>
            <div class="masker masker-error" v-if="isNoResult">
                <div class="no-result">
                    <i class="icon">
                        <img src="./icon/no-result.png" alt="">
                    </i>
                    <span class="text">搜索不到相关结果</span>
                </div>
            </div>
            <div class="masker masker-error" v-if="isNoData">
                <div class="no-data">
                    <i class="icon">
                        <img src="./icon/no-data.png" alt="">
                    </i>
                    <span class="text">暂无数据</span>
                </div>
            </div>
            <v-search @get-search-data="getSearchData" @upload-pic="getUploadPicData"></v-search>
            <div class="selectMenu">
                <div class="select-control">
                    <div class="select-control-wrapper">
                        <div class="select-item" :class="{active: selectControlStatus[0]}">
                            <div class="icon-text" @click="selectControl(0, $event)">
                                <span class="text">{{selectTextStatus[0]}}</span>
                                <i class="icon"></i>
                            </div>
                        </div>
                        <div class="select-item" :class="{active: selectControlStatus[1]}">
                            <div class="icon-text" @click="selectControl(1, $event)">
                                <span class="text">{{selectTextStatus[1]}}</span>
                                <i class="icon"></i>
                            </div>
                        </div>
                        <div class="select-item" :class="{active: selectControlStatus[2]}">
                            <div class="icon-text" @click="selectControl(2, $event)">
                                <span class="text">{{selectTextStatus[2]}}</span>
                                <i class="icon"></i>
                            </div>
                        </div>
                        <div class="select-item" :class="{active: selectControlStatus[3]}">
                            <div class="icon-text" @click="selectControl(3, $event)">
                                <span class="text">{{selectTextStatus[3]}}</span>
                                <i class="icon"></i>
                            </div>
                        </div>
                        <div class="select-item" :class="{active: selectControlStatus[4]}">
                            <div class="icon-text" @click="selectControl(4, $event)">
                                <span class="text">{{selectTextStatus[4]}}</span>
                                <i class="icon"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="select-detail" v-show="isShowMasker">
                    <div class="select-detail-wrapper">
                        <div class="list type-list" v-show="selectControlStatus[0]">
                            <span class="item" :class="{active: selectItemStatus[0] == 0}" @click="selectItem(0, 0, $event)">全部</span>
                            <span class="item" :class="{active: selectItemStatus[0] == 1}" @click="selectItem(1, 0, $event)">花岗岩</span>
                            <span class="item" :class="{active: selectItemStatus[0] == 2}" @click="selectItem(2, 0, $event)">大理石</span>
                            <span class="item" :class="{active: selectItemStatus[0] == 3}" @click="selectItem(3, 0, $event)">石灰石</span>
                            <span class="item" :class="{active: selectItemStatus[0] == 4}" @click="selectItem(4, 0, $event)">板岩石</span>
                            <span class="item" :class="{active: selectItemStatus[0] == 5}" @click="selectItem(5, 0, $event)">人造石</span>
                            <span class="item" :class="{active: selectItemStatus[0] == 6}" @click="selectItem(6, 0, $event)">石英石</span>
                            <span class="item" :class="{active: selectItemStatus[0] == 7}" @click="selectItem(7, 0, $event)">其他</span>
                        </div>
                        <div class="list color-list" v-show="selectControlStatus[1]">
                            <span class="item" :class="{active: selectItemStatus[1] == 0}" @click="selectItem(0, 1, $event)">全部</span>
                            <span class="item" :class="{active: selectItemStatus[1] == 1}" @click="selectItem(1, 1, $event)">红色</span>
                            <span class="item" :class="{active: selectItemStatus[1] == 2}" @click="selectItem(2, 1, $event)">白色</span>
                            <span class="item" :class="{active: selectItemStatus[1] == 7}" @click="selectItem(7, 1, $event)">黄色</span>
                            <span class="item" :class="{active: selectItemStatus[1] == 8}" @click="selectItem(8, 1, $event)">黑色</span>
                            <span class="item" :class="{active: selectItemStatus[1] == 5}" @click="selectItem(5, 1, $event)">灰色</span>
                            <span class="item" :class="{active: selectItemStatus[1] == 4}" @click="selectItem(4, 1, $event)">绿色</span>
                            <span class="item" :class="{active: selectItemStatus[1] == 6}" @click="selectItem(6, 1, $event)">棕色</span>
                            <span class="item" :class="{active: selectItemStatus[1] == 3}" @click="selectItem(3, 1, $event)">蓝色</span>
                            <span class="item" :class="{active: selectItemStatus[1] == 9}" @click="selectItem(9, 1, $event)">其他</span>
                        </div>
                        <div class="list grade-list" v-show="selectControlStatus[2]">
                            <span class="item" :class="{active: selectItemStatus[2] == 0}" @click="selectItem(0, 2, $event)">全部</span>
                            <span class="item" :class="{active: selectItemStatus[2] == 1}" @click="selectItem(1, 2, $event)">A级</span>
                            <span class="item" :class="{active: selectItemStatus[2] == 2}" @click="selectItem(2, 2, $event)">B级</span>
                            <span class="item" :class="{active: selectItemStatus[2] == 3}" @click="selectItem(3, 2, $event)">C级</span>
                            <span class="item"></span>
                            <span class="item"></span>
                        </div>
                        <div class="list format-list" v-show="selectControlStatus[3]">
                            <span class="all">全部</span>
                            <div class="self">
                                <span class="s-text">自定义：</span>
                                <input class="input" type="text" placeholder="长" ref="length">
                                <i class="add-rotate">+</i>
                                <input class="input" type="text" placeholder="宽" ref="width">
                                <i class="add-rotate">+</i>
                                <input class="input" type="text" placeholder="厚" ref="thickness">mm
                                <span class="finish" @click="selectFormat">完成</span>
                            </div>
                        </div>
                        <div class="list price-list" v-show="selectControlStatus[4]">
                            <span class="all">全部</span>
                            <div class="self">
                                <span class="s-text">自定义：</span>
                                <input class="input" type="text" placeholder="200" ref="minPrice">
                                <i class="min">一</i>
                                <input class="input input-max-price" type="text" placeholder="400" ref="maxPrice">
                                <i class="icon-ypfm"></i>
                                <span class="finish" @click="selectPrice">完成</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <v-showsearchpic :src="src" :text="text" v-show="src"></v-showsearchpic>
            <v-divider></v-divider>
            <v-piclist :time="time" :page="page" @get-data="getData" @text="getText" v-if="flag" :src="src" :search-pic="src"></v-piclist>
            <v-loadingbar :loadingStatus="loadingStatus" ref="loading-bar" v-show="loadingStatus.show"></v-loadingbar>
        </div>
    </div>
</template>

<script>
    import search from "src/components/search/search";
    import piclist from "src/components/piclist/piclist";
    import loadingbar from "src/components/loadingbar/loadingbar";
    import showsearchpic from "src/components/showsearchpic/showsearchpic";
    import divider from "src/components/divider/divider";
    import url from "src/config/url";
    import util from "src/common/util";

export default {
    components: {
        "v-search": search,
        "v-piclist": piclist,
        "v-loadingbar": loadingbar,
        "v-showsearchpic": showsearchpic,
        "v-divider": divider,
    },
    data () {
        return {
            selectControlStatus: [false, false, false, false, false],
            selectItemStatus: ["", 0, 0],
            formatStatus: {
                length: 0,
                width: 0,
                thickness: 0
            },
            priceStatus: {
                minPrice: 0,
                maxPrice: 0
            },
            selectTextStatus: ["类别", "颜色", "等级", "规格", "价格"],
            isShowMasker: false,
            flag: false,
            isNoData: false,
            isNoResult: false,
            loadingStatus: {
                loading: true,
                loaded: false,
                show: false,
            },
            src: "",
            page: "search",
            time: 3,
            text: ""
        }
    },
    created () {
        console.log("created");
        this.loadingStatus.show = true;
    },
    mounted () {
        console.log("mounted");
        this.$nextTick(()=> {
            this.getData();
        });
    },
    methods:{
        selectControl (index, ev) {
            let selectControlStatus = this.selectControlStatus;
            for(let i = 0, l = selectControlStatus.length; i < l; i++) {
                if(index === i) {
                    this.$set(selectControlStatus, i, !selectControlStatus[i]);
                }else {
                    this.$set(selectControlStatus, i, false);
                }
            }
            // 弹窗
            for(let i = 0, l = selectControlStatus.length; i < l; i++) {
                if(selectControlStatus[i]) {
                    this.isShowMasker = true;
                    break;
                }else {
                    this.isShowMasker = false;
                }
            }
        },
        selectItem (index, parentIndex, ev) {
            this.$set(this.selectItemStatus, parentIndex, index);
            this.selectControl(parentIndex, ev);
            this.selectText(parentIndex, ev);
            this.getData(this.handleData(), {
                clean: true
            });
            this.hideMasker();
        },
        selectText (parentIndex, ev) {
            var arr = ["类别", "颜色", "等级", "规格", "价格"];
            var text = ev.target.innerText;
            if(text == "全部") {
                text = arr[parentIndex];
            }
            this.selectTextStatus[parentIndex] = text;
        },
        selectFormat () {
            this.getData(this.handleData(),{
                clean: true
            });
            this.hideMasker();
        },
        selectPrice () {
            this.getData(this.handleData(),{
                clean: true
            });
            this.hideMasker();
        },
        showMasker () {
            this.isShowMasker = true;
        },
        hideMasker() {
            this.isShowMasker = false;
            for(let i = 0, l = this.selectControlStatus.length; i < l; i++) {
                this.selectControlStatus[i] = false;
            }
        },
        handleData () {
            return {
                kind: 0,
                color: this.selectItemStatus[1],
                variety: this.selectItemStatus[0],
                maxLength: this.$refs.length.value * 1.2 || 0,
                minLength: this.$refs.length.value * 0.8 || 0,
                maxWidth: this.$refs.width.value * 1.2 || 0,
                minWidth: this.$refs.width.value * 0.8 || 0,
                thickness: this.$refs.thickness.value || 0,
                maxPrice: this.$refs.maxPrice.value * 1.2 || 0,
                minPrice: this.$refs.minPrice.value * 0.8 || 0,
                grade: this.selectItemStatus[2],
                pageSize: 8,
                pageCurrent: 1,
                orderBy: 0
            }
        },
        getData(data, options) {
            let self = this;
            if(!data || options && options.clean) {
                this.loadingStatus.show = true;
            }
            this.$http.get(url.boutique, {
                params: data || this.handleData()
            }).then((response) => {
                if(response.data.data.list.length == 0) {
                    this.isNoData = true;
                }else {
                    this.flag = false;
                    if(options && options.clean) {
                        this.$store.commit({
                            type: "cleanDataList",
                            key: this.page,
                        });
                    }
                    this.$store.commit({
                        type: "dataList",
                        key: this.page,
                        value: response.data
                    });

                    if(!data || options && options.clean) {
                        this.$nextTick(()=>{
                            setTimeout(()=>{
                                this.loadingStatus.show = false;
                                this.flag = true;
                            }, util.loadPicListTime);
                        });
                    }else {
                        this.$nextTick(()=>{
                            this.flag = true;
                        });
                    }
                }
            }).catch((response) => {
                console.log('fail');
                this.isNoResult = true;
            });
        },
        getSearchData (data) {
            this.hideMasker();
            this.getData(Object.assign({}, this.handleData(), data), {
                clean: true
            });
        },
        getUploadPicData (data, src) {
            this.hideMasker();
            this.src = src;
            this.getData(data,{
                clean: true
            });
        },
        getText (text) {
            this.text = text;
        }
    }
}
</script>

<style lang="sass" scoped>
    @import "../../style/mixin.scss";
    .selectMenu {
        background-color: #fff;
        position: relative;
        z-index: 2;
        .select-control-wrapper {
            position: relative;
            z-index: 99;
            background: #fff;
            padding:0 27px;
            margin-right: -104px;
            overflow: hidden;
            .select-item {
                padding-top: 21px;
                padding-bottom: 21px;
                background-color: #fff;
                position: relative;
                font-size: 28px;
                color: #666;
                width: 154px;
                float: left;
                box-sizing: border-box;
                &.active {
                    .text {
                        color: #03A3E7;
                    }
                    .icon {
                        @include background("icon_pull_1.png");
                    }
                }
                .icon-text{
                    padding: 10px 0 10px 10px;
                    margin-left: -10px;
                }
                .icon{
                    @include background("icon_pull.png");
                    width: 18px;
                    height: 12px;
                    display: inline-block;
                }
            }
        }
        .select-detail {
            font-size: 26px;
            padding: 15px 0 75px 27px;
            position: relative;
            z-index: 99;
            background: #fff;
            border-top: 1px solid #ebebeb;
            .select-detail-wrapper {
                position: relative;
                z-index: 3;
                background: #fff;
                .list {
                    &.color-list, &.type-list, &.grade-list {
                         margin-right: -154px;
                        overflow: hidden;
                     }
                    &.color-list .item{
                         width: 154px;
                     }
                    &.type-list .item,&.grade-list .item {
                          width: 154px;
                      }
                    .item {
                        display: inline-block;
                        font-size: 28px;
                        line-height: 64px;
                        height: 64px;
                        float: left;
                        &.active {
                             color: #03a3e7;
                         }
                    }
                    .all{
                        display: inline-block;
                        width: 154px;
                        font-size: 28px;
                        line-height: 64px;
                        height: 64px;
                    }
                    .self{
                        line-height: 63px;
                        .input {
                            width: 120px;
                            border: 0;
                            border-bottom: 1px solid #cdcdcd;
                            text-align: center;
                            padding: 10px 0;
                            border-radius: 0;
                            font-size:100%;
                        }
                        .add-rotate {
                            display: inline-block;
                            transform: rotate(-45deg);
                            -webkit-transform: rotate(45deg);
                            font-size: 24px;
                        }
                        .finish{
                            font-size: 28px;
                            color: #03A3E7;
                            padding: 14px 20px;
                            line-height: 28px;
                            float: right;
                            margin-right: 10px;
                            margin-top: 5px;
                        }
                    }
                    &.price-list .icon-ypfm{
                         @include background("icon_ypf.png");
                         width: 76px;
                         height: 33px;
                         position: relative;
                         display: inline-block;
                         top: 7px;
                     }
                }
            }
        }
    }
    .masker{
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        }
        .masker-black {
            background: rgba(0, 0, 0, 0.65);
        }
        .masker-error {
            background: #fff;
            .no-data, .no-result {
                padding-top: 230px;
                text-align: center;
            .text {
                display: block;
                padding: 15px 0;
                font-size: 30px;
                text-align: center;
                color: #666;
            }
        }
    }
</style>
