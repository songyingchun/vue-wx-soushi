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
                    </div>
                </div>
                <div class="select-detail">
                    <div class="select-detail-wrapper">
                        <div class="list" v-if="selectControlStatus[0]">
                            <span class="item" :class="{active: selectItemStatus[0] == 0}" @click="selectItem(0, 0, $event)">全部</span>
                            <span class="item" :class="{active: selectItemStatus[0] == 1}" @click="selectItem(1, 0, $event)">花岗岩</span>
                            <span class="item" :class="{active: selectItemStatus[0] == 2}" @click="selectItem(2, 0, $event)">大理石</span>
                            <span class="item" :class="{active: selectItemStatus[0] == 3}" @click="selectItem(3, 0, $event)">石灰石</span>
                            <span class="item" :class="{active: selectItemStatus[0] == 4}" @click="selectItem(4, 0, $event)">板岩石</span>
                            <span class="item" :class="{active: selectItemStatus[0] == 5}" @click="selectItem(5, 0, $event)">人造石</span>
                            <span class="item" :class="{active: selectItemStatus[0] == 6}" @click="selectItem(6, 0, $event)">石英石</span>
                            <span class="item" :class="{active: selectItemStatus[0] == 7}" @click="selectItem(7, 0, $event)">其他</span>
                        </div>
                        <div class="list" v-if="selectControlStatus[1]">
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
                        <div class="list" v-if="selectControlStatus[2]">
                            <span class="item" :class="{active: selectItemStatus[2] == 0}" @click="selectItem(0, 2, $event)">全部</span>
                            <span class="item" :class="{active: selectItemStatus[2] == -1}" @click="selectItem(-1, 2, $event)">进口</span>
                            <span class="item" :class="{active: selectItemStatus[2] == 1}" @click="selectItem(1, 2, $event)">国产</span>
                        </div>
                    </div>
                </div>
            </div>
            <v-showsearchpic :src="src" :text="text" v-show="src"></v-showsearchpic>
            <v-divider></v-divider>
            <v-gallerypiclist :time="time" :page="page" :src="src" @get-data="getData" @text="getText" v-if="flag" :search-pic="src"></v-gallerypiclist>
            <v-loadingbar :loadingStatus="loadingStatus" ref="loading-bar" v-show="loadingStatus.show"></v-loadingbar>
        </div>
    </div>
</template>

<script>
    import search from "src/components/search/search";
    import gallerypiclist from "src/components/gallerypiclist/gallerypiclist";
    import loadingbar from "src/components/loadingbar/loadingbar";
    import circliful from "src/components/circliful/circliful";
    import showsearchpic from "src/components/showsearchpic/showsearchpic";
    import divider from "src/components/divider/divider";
    import url from "src/config/url";
    import util from "src/common/util";
export default {
    components: {
        "v-search": search,
        "v-gallerypiclist": gallerypiclist,
        "v-loadingbar": loadingbar,
        "v-showsearchpic": showsearchpic,
        "v-divider": divider,
    },
    data () {
        return {
            page: "gallery",
            selectControlStatus: [false, false, false],
            selectItemStatus: [0, 0, 0],
            selectTextStatus: ["类别", "颜色", "产地"],
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
            time: 3,
            prevId: "",
            loadPrevIdOnce: false,
            text: ""
        }
    },
    created () {
        this.getPrevId();
        this.loadingStatus.show = true;
        if(this.prevId) {
            this.getData({
                pageSize:8,
                pageCurrent:1,
                prevId: this.prevId
            });
        }else {
            this.getData();
        }
    },
    mounted () {

    },
    methods: {
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
            this.getData({
                kind: this.selectItemStatus[0],
                color: this.selectItemStatus[1],
                country: this.selectItemStatus[2]
            }, {
                clean: true
            });
        },
        selectText (parentIndex, ev) {
            var arr = ["类别", "颜色", "产地"];
            var text = ev.target.innerText;
            if(text == "全部") {
                text = arr[parentIndex];
            }
            this.selectTextStatus[parentIndex] = text;
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
        handleData (data) {
            return data || {
                pageSize:8,
                pageCurrent:1
            }
        },
        getData(data, options) {
            let initLoad = false;
            let condition = false;
            let searchPic = false;
            let photoSearchPic = false;
            let pullDown = false;

            if(data === undefined) {
                initLoad = true;
            }

            if(data && data.append) {
                searchPic = true;
            }

            if(options && options.clean) {
                condition = true;
                if(searchPic) {
                    condition = false;
                }
            }

            if(this.prevId && !this.loadPrevIdOnce) {
                photoSearchPic = true;
            }

            if(data && data.pullDown) {
                pullDown = true;
            }

            if(initLoad || condition || searchPic || photoSearchPic) {
                this.loadingStatus.show = true;
            }

            this.$http.get(url.gallery, {
                params: data || this.handleData()
            }).then((response) => {
                if(response.data.data.list.length === 0) {
                    this.isNoData = true;
                }else {
                    this.flag = false;
                    if(condition || searchPic) {
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

                    if(photoSearchPic) {
                        this.src = response.data.data.searchImageUrl;
                    }

                    if(condition){
                        this.src = "";
                    }

                    if(initLoad || condition || searchPic || photoSearchPic) {
                        this.$nextTick(()=>{
                            setTimeout(()=>{
                                this.loadingStatus.show = false;
                                this.flag = true;
                            }, util.loadPicListTime);
                        });
                    }else if(pullDown){
                        this.$nextTick(()=>{
                            this.flag = true;
                        });
                    }
                }
            }).catch((response) => {
                this.isNoResult = true;
            });
        },
        getSearchData (data) {
            this.hideMasker();
            this.getData(Object.assign({}, data, {
                kind: this.selectItemStatus[0],
                color: this.selectItemStatus[1],
                country: this.selectItemStatus[2]
            }),{
                clean: true
            });
        },
        getUploadPicData (data, src) {
            console.log(data);
            this.hideMasker();
            this.src = src;
            this.getData(data, {
                clean: true
            });
        },
        getPrevId () {
            let prevId = util.parseUrl(window.location.href).prevId;
            if(prevId) {
                this.prevId = prevId;
            }
        },
        getText (text) {
            this.text = text;
        }
    }
}
</script>

<style lang="sass" scoped>
    @import "../../style/mixin.scss";
    html, body {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
.selectMenu {
    background-color: #fff;
    position: relative;
    z-index: 2;
    .select-control-wrapper {
        position: relative;
        z-index: 99;
        background: #fff;
        display: flex;
        padding:0 60px;
        .select-item {
            flex: 1;
            padding-top: 21px;
            padding-bottom: 21px;
            background-color: #fff;
            position: relative;
            font-size: 28px;
            color: #666;
            &.active {
                .text {
                    color: #03A3E7;
                }
                .icon {
                    @include background("icon_pull_1.png");
                }
             }
            .icon-text{
                padding: 10px;
                margin-left: -10px;
            }
            &:nth-child(2) {
                text-align: center;
             }
            &:nth-child(3) {
                text-align: right;
             }
            .icon {
                 @include background("icon_pull.png");
                 width: 18px;
                 height: 12px;
                 display: inline-block;
             }
        }
    }
    .select-detail-wrapper {
        position: relative;
        z-index: 99;
        background: #fff;
        .list {
            border-top: 1px solid #ebebeb;
            overflow: hidden;
            padding: 15px 10px 15px 60px;
            .item {
                float: left;
                width: 20%;
                display: inline-block;
                font-size: 28px;
                line-height: 64px;
                height: 64px;
                &.active {
                     color: #03A3E7;
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
