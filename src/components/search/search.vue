<template>
    <div class="search">
        <i class="icon-search"></i>
        <input type="text" class="input keyword" placeholder="输入关键词搜索" ref="keyword">
        <i class="icon-photo">
            <input type="file" id="fileInput" class="file" @change="upload($event)" accept="image/jpeg,image/png,image/jpg">
        </i>
        <span class="search-button" @click="search($event)">搜索</span>
    </div>
</template>

<script>
import compressImg from "src/plugins/processImg";

export default {
    methods: {
        search () {
            this.$emit("get-search-data", {
                searchKeyWord: this.$refs.keyword.value
            });
        },
        upload (ev) {
            let self = this;
            compressImg(960, function(resizeData, src){
                let $form_data = '';
                //重新赋值
                $form_data = new FormData();
                $form_data.append("searchImage", resizeData);
                $form_data.append("pageSize", 8);
                self.$emit("upload-pic", $form_data, src);
            }, ev.target);
        }
    }
}
</script>

<style lang="sass" scoped>
    @import "../../style/mixin.scss";
.search {
    display: flex;
    padding: 25px 15px 15px 25px;
    border-bottom: 1px solid #ddd;
    background: #fff;
    position: relative;
    z-index: 1;
    .icon-search{
        height: 56px;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        background: #03A3E7;
        position: relative;
        flex: 60px;
        &:before {
             content: '';
             @include background("icon_photograph_1.png");
             position: absolute;
             width: 31px;
             height: 29px;
             left: 14px;
             top: 14px;
         }
    }
    .keyword {
        border: 0;
        background: #f8f8f8;
        font-size: 26px;
        padding: 12px 0 12px 10px;
        flex: 456px;
    }
    .icon-photo {
        background: #f8f8f8;
        width: 84px;
        height: 56px;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        position: relative;
        flex: 84px;
        &:before {
             content: '';
             @include background("icon_photograph_2.png");
             position: absolute;
             width: 41px;
             height: 34px;
             top: 12px;
             left: 21px;
         }
        .file {
             display: block;
             width: 100%;
             height: 100%;
             opacity: 0;
         }
    }
    .search-button{
        font-size: 28px;
        color: #03A3E7;
        padding: 14px 20px;
        line-height: 28px;
    }
}
</style>
