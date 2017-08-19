<template>
    <div class="wrapper">
        <div class="container">
            <div class="upload">
                <div class="upload-wrapper">
                    <div class="pic" v-show="src">
                        <img :src="src" alt="">
                        <div class="close" @click="closeUpload"></div>
                    </div>
                    <div class="upload-area" v-show="!src">
                        <img src="./icon/icon_photos.png" width="100%" height="100%" alt="">
                        <input type="file" id="fileInput" @change="upload($event)" class="file" accept="image/jpeg,image/png,image/jpg">
                    </div>
                </div>
            </div>
            <div class="send">
                <div class="send-info">
                    <div class="name">
                        <span class="label">品&nbsp;&nbsp;&nbsp;种：</span>
                        <input type="text" placeholder="请输入品种" ref="name-input">
                    </div>
                    <div class="format">
                        <span class="label">规&nbsp;&nbsp;&nbsp;格：</span>
                        <div class="format-list">
                            <div class="format-item">
                                100×100
                            </div>
                            <div class="format-item">
                                150×150
                            </div>
                            <div class="format-item">
                                200×200
                            </div>
                        </div>
                    </div>
                    <div class="number">
                        <span class="label">数&nbsp;&nbsp;&nbsp;量：</span>
                        <v-count :num="1" @change="change"></v-count>
                    </div>
                    <div class="custom">
                        <span class="label">定&nbsp;&nbsp;&nbsp;制：</span>
                        <div class="custom-list">
                            <div class="custom-item">
                                <input type="text" placeholder="300" ref="width">
                            </div>
                            <span class="text">×</span>
                            <div class="custom-item">
                                <input type="text" placeholder="300" ref="length">
                            </div>
                        </div>
                        <v-count :num="2" @change="change"></v-count>
                    </div>
                </div>
                <v-divider></v-divider>
                <v-receiveinfo :page="page" v-if="flag" @changeTextArea="changeTextArea" @defaultAddress="defaultAddress"></v-receiveinfo>
                <v-maskertips :tips="tips" v-show="tips"></v-maskertips>
                <v-maskersuccess v-show="isToastSuccess" :text="'我们将尽快与您联系'"></v-maskersuccess>
                <v-maskerfail v-show="isToastFail" :failmessage="failmessage"></v-maskerfail>
                <v-submit :text="'提交'" @submit="submit" v-if="flag"></v-submit>
            </div>
        </div>
    </div>
</template>

<script>
    import divider from "src/components/divider/divider";
    import receiveinfo from "src/components/receiveinfo/receiveinfo";
    import submit from "src/components/submit/submit";
    import maskertips from "src/components/maskertips/maskertips";
    import count from "src/components/count/count";
    import maskersuccess from "src/components/maskersuccess/maskersuccess";
    import maskerfail from "src/components/maskerfail/maskerfail";
    import compressImg from "src/plugins/processImg";
    import url from "src/config/url";
    import util from "src/common/util";
export default{
    data () {
        return {
            page: "send",
            flag: false,
            tips: "",
            src: "",
            counter1: "",
            counter2: "",
            textareaValue: "",
            defaultAddressCurrentIndex: -1,
            deliveryId: "",
            isToastSuccess: false,
            isToastFail: false,
            failmessage: "",
        }
    },
    components: {
        "v-divider": divider,
        "v-receiveinfo": receiveinfo,
        "v-submit": submit,
        "v-maskertips": maskertips,
        "v-count": count,
        "v-maskersuccess": maskersuccess,
        "v-maskerfail": maskerfail,
    },
    created() {

    },
    mounted () {
        this.getData();
    },
    methods: {
        handleData () {
            return {};
        },
        getData() {
            this.$http.get(url[this.page], {
                params: this.handleData()
            }).then((response) => {
                if(response.data.status.code == 0) {
                    this.$store.commit({
                        type: "data",
                        key: this.page,
                        value: response.data
                    });
                    this.$nextTick(()=> {
                        this.flag = true;
                    });
                }
            }).catch((response) => {
                this.isNoResult = true;
            });
        },
        upload (ev) {
            let self = this;
            this.tips = "上传中...";
            compressImg(960, function(resizeData, src){
                let $form_data = '';
                //重新赋值
                $form_data = new FormData();
                $form_data.append("searchImage", resizeData);
                $form_data.append("pageSize", 8);

                self.src = src;
                self.tips = "";
            }, ev.target);
        },
        closeUpload () {
            this.src = "";
        },
        change(index, counter) {
            this["counter" + index] = counter;
        },
        submit () {
            let image = this.src;
            let stoneName = this.$refs["name-input"].value;
            let remark = this.textareaValue;
            let deliveryId = this.id;
            let counter1 = this.counter1;
            let counter2 = this.counter2;
            let list = [];
            if(!image && !stoneName) {
                util.toast(util.tips.uploadPicOrWriteTemplate, this);
                return;
            }

            if(this.defaultAddressCurrentIndex < 0) {
                util.toast(util.tips.chooseAddress, this);
                return;
            }

            if(!counter1 && !counter2) {
                util.toast(util.tips.templateNumber, this);
                return;
            }

            if(counter1 > -1) {
                list.push({
                    amount: counter1,
                    length: 150,
                    width: 150
                });
            }

            if(counter2 > -1) {
                list.push({
                    amount: counter1,
                    length: this.$refs.length.value,
                    width: this.$refs.width.value
                });
            }

            this.$http.get(url.delivery, {
                params: JSON.stringify({
                    deliveryId: deliveryId,
                    image: image,
                    list: list,
                    remark: remark,
                    stoneName: stoneName
                })
            }).then((response) => {
                if(response.data.status.code == 0) {
                    util.toastSuccess(function () {}, this);
                }else {
                    util.toastFail(function () {}, this);
                    this.failmessage = response.message;
                }
            }).catch((response) => {
                util.toast(util.tips.errorConnect);
            });
        },
        changeTextArea (value) {
            console.log(value);
            this.textareaValue = value;
        },
        defaultAddress (index, id) {
            this.defaultAddressCurrentIndex = index;
            this.id = id;
        }
    }
}
</script>

<style lang="sass" scoped>
    @import "../../style/mixin.scss";
    .upload {
        .upload-wrapper{
            background: #f7f7f7;
            height: 560px;
            position: relative;
            .pic {
                height: 100%;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .close{
                @include background("icon_delete.png");
                width: 54px;
                height: 54px;
                position: absolute;
                right: 20px;
                bottom: 20px;
            }
            .upload-area {
                width: 246px;
                position: absolute;
                left: 50%;
                top: 50%;
                height: 246px;
                transform: translate(-50%, -50%);
                .file {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                }
            }
        }
    }
    .send-info {
        padding:0 40px;
        .label{
            display: inline-block;
            color: #666;
            line-height: 66px;
            font-size: 28px;
        }
        .name {
            padding-top: 31px;
            padding-bottom: 31px;
            background-color: #fff;
            position: relative;
            display: block;
            font-size: 28px;
            line-height: 28px;
            border-bottom:1px solid #ddd;
            margin-bottom: 20px;
            input{
                border: 0;
                font-size: 100%;
            }
            .label {
                line-height: 28px;
            }
        }
        .format {
            display: flex;
            margin-bottom: 30px;
            .format-list{
                display: flex;
                flex: 1;
                margin-right: -25px;
                .format-item{
                    border: 1px solid #999999;
                    border-radius: 5px;
                    font-size: 28px;
                    line-height: 28px;
                    text-align: center;
                    color: #999;
                    padding: 17px 10px;
                    margin-right: 25px;
                    flex: 1;
                }
            }
        }
        .number {
            display: flex;
            margin-bottom: 30px;
        }
        .custom {
            display: flex;
            margin-bottom: 30px;
            .custom-list{
                margin-right: 75px;
                width: 286px;
                display: flex;
                .text{
                    line-height: 64px;
                    width: 40px;
                    text-align: center;
                }
                .custom-item{
                    width: 123px;
                }
                .custom-item input{
                    border: 1px solid #999999;
                    border-radius: 5px;
                    font-size: 28px;
                    line-height: 28px;
                    text-align: center;
                    height: 62px;
                    width: 100%;
                }
            }
        }
    }
    ::-webkit-input-placeholder{
        color: #999;
    }
</style>
