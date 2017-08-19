<template>
    <div class="nav-footer" ref="footer">
        <div class="nav-footer-list">
            <div class="nav-item" :class="{active: item.isActive}" v-for="(item, item_index) in navObj" :key="item.id">
                <div v-if="item_index == 2" class="photo-wrapper">
                    <router-link :to="{path: item.name}">
                        <i class="icon" :class="item.name"></i>
                        <span class="text">{{item.text}}</span>
                    </router-link>
                </div>
                <div v-else-if="item_index == 4" @click.stop.prevent="checkLogin('personal')">
                    <i class="icon" :class="item.name"></i>
                    <span class="text">{{item.text}}</span>
                </div>
                <router-link v-else :to="{path: item.name}">
                    <i class="icon" :class="item.name"></i>
                    <span class="text">{{item.text}}</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from "vue";
    import util from "src/common/util";
export default {
    props: {
        index: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            navObj: [{
                name: "index",
                text: "首页",
            },{
                name: "boutique",
                text: "精品",
            },{
                name: "photo",
                text: "拍照找石",
            },{
                name: "search",
                text: "现货",
            },{
                name: "personal",
                text: "我的",
            }]
        }
    },

    created () {
        this.$nextTick(()=>{
            this.isActive();
        });
    },

    computed: {

    },

    methods: {
        isActive () {
            this.navObj.forEach((item, index)=> {
                if(this.index === index) {
                    this.$set(item, 'isActive', true);
                }
            }, this);
        },
        checkLogin (path) {
            util.checkLogin(path, this);
        }
    }
}
</script>

<style lang="sass">
    @import "../../style/mixin.scss";
    .nav-footer {
        position: fixed;
        height: 95px;
        width: 100%;
        background: #fff;
        bottom: 0;
        text-align: center;
        border-top: 1px solid #e5e5e5;
        .nav-footer-list {
            display: flex;
            height: 100%;
            .nav-item{
                flex: 1;
                text-align: center;
                position: relative;
                &.active{
                    .text {
                        color: #03A3E7;
                    }
                }
                .icon {
                    display: inline-block;
                    width: 44px;
                    height: 44px;
                    margin-top: 12px;
                }
                .text{
                    display: block;
                    font-size: 20px;
                }
                .index {
                     @include background("icon_home.png");
                 }
                &.active .index {
                    @include background("icon_home_1.png");
                 }
                .boutique {
                    @include background("icon_boutique.png");
                }
                &.active .boutique {
                    @include background("icon_boutique_1.png");
                 }
                .photo-wrapper {
                    position: absolute;
                    left: 50%;
                    bottom: -60px;
                    transform: translate(-50%, -50%);
                    -webkit-transform: translate(-50%, -50%);
                    @include background("bg_home.png");
                    height: 121px;
                    width: 112px;
                    .photo{
                        width: 51px;
                        height: 51px;
                        display: inline-block;
                        margin-top: 25px;
                        margin-bottom: 10px;
                        @include background("icon_photograph.png");
                    }
                 }
                .search {
                    @include background("icon_search.png");
                }
                &.active .search {
                     @include background("icon_search_1.png");
                 }
                .personal {
                    @include background("icon_me.png");
                }
                &.active .personal {
                    @include background("icon_me_1.png");
                 }
                &:nth-child(3) {
                    flex: 1.5;
                 }
            }
        }
    }
</style>
