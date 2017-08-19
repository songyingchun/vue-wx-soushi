<template>
<div class="wrapper">
    <div class="container">
        <div class="m-bg">
            <div class="pic">
                <img src="./icon/bg_1.png" alt="">
            </div>
            <p class="text">以图搜图 · 轻松找货</p>
            <div class="submit">
                <div class="button">
                    <i class="icon"></i>
                    <span class="text">上传图片</span>
                    <input type="file" class="file" id="fileInput" @change="upload($event)" accept="image/jpeg,image/png,image/jpg">
                </div>
            </div>
        </div>
        <v-maskertips :tips="tips" v-show="tips"></v-maskertips>
    </div>
</div>
</template>

<script>
    import maskertips from "src/components/maskertips/maskertips";
    import compressImg from "src/plugins/processImg";
    import util from "src/common/util";
    import url from "src/config/url";
export default {
    components: {
        "v-maskertips": maskertips,
    },
    data () {
        return {
            page: "photo",
            tips: "",
        }
    },
    methods: {
        upload (ev) {
            let self = this;
            this.tips = util.tips.uploading;
            compressImg(960, function(resizeData, src){
                let $form_data = '';
                //重新赋值
                $form_data = new FormData();
                $form_data.append("searchImage", resizeData);
                $form_data.append("pageSize", 8);
                self.$http.get(url.searchPrev, {
                    params: $form_data,
                }).then((response)=>{
                    self.$store.commit({
                        type: "data",
                        key: self.page,
                        value: response.data
                    })
                    if(response.data.status.code == 0) {
                        self.tips = "";
                        this.$router.push({
                            path: "gallery",
                            query: {
                                prevId: response.data.data.prevId
                            }
                        })
                    }else {
                        util.toast(response.message, self);
                    }
                }).catch((response)=> {
                    console.log(response);
                    util.toast(response.message, self);
                });
            }, ev.target);
        }
    }
}
</script>

<style lang="sass" scoped>
    @import "../../style/mixin.scss";
    .wrapper{
        height: 100%;
        .container{
            height: 100%;
            .m-bg{
                height: 100%;
                .pic{
                    text-align: center;
                    padding-top: 135px;
                    margin-bottom: 145px;
                    img{
                        width: 502px;
                        height: 489px;
                    }
                }
                p.text {
                    color: #7a756f;
                    font-size: 52px;
                    line-height: 62px;
                    text-align: center;
                    margin-bottom: 115px;
                }
                .submit {
                    padding: 20px;
                    .button {
                        background: #03A3E7;
                        color: #fff;
                        position: relative;
                        vertical-align: top;
                        text-align: center;
                        cursor: pointer;
                        display: block;
                        line-height: 30px;
                        padding: 28px 0;
                        font-size: 30px;
                        border-radius: 40px;
                        .icon{
                            display: inline-block;
                            width: 30px;
                            height: 30px;
                            @include background("icon_add.png");
                            position: relative;
                            background-size: 100%;
                            vertical-align: bottom;
                        }
                        .text{
                            background: transparent;
                            border: 0;
                            color: #fff;
                            font-size: 30px;
                            display: inline-block;
                            line-height: 33px;
                        }
                        .file{
                            display: block;
                            width: 100%;
                            height: 100%;
                            opacity: 0;
                            position: absolute;
                            top: 0;
                        }
                    }
                }
            }
        }
    }
</style>
