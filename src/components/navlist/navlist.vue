<template>
    <div class="nav-list">
        <div class="nav-item">
            <router-link to="/gallery">
                <i class="icon gallery"></i>
                <span class="text">石材图库</span>
            </router-link>
        </div>
        <div class="nav-item">
            <router-link to="/boutique">
                <i class="icon boutique"></i>
                <span class="text">精品商城</span>
            </router-link>
        </div>
        <div class="nav-item">
            <router-link to="/search">
            <i class="icon search"></i>
            <span class="text">搜现货</span>
            </router-link>
        </div>
        <div class="nav-item" @click="checkLogin('send')">
            <i class="icon send"></i>
            <span class="text">样板寄送</span>
        </div>
        <div class="nav-item">
            <a href="http://www.soushi88.com/index.php?s=/Supply/wx">
                <i class="icon photograph"></i>
                <span class="text">免费找货</span>
            </a>
        </div>
    </div>
</template>

<script>
    import util from "src/common/util";
export default {
    methods: {
        checkLogin (path) {
            util.checkLogin(path, this);
        }
    }
}
</script>

<style lang="sass" scoped>
    .nav-list {
        display: flex;
        text-align: center;
        padding: 34px 20px 24px 20px;
        .nav-item {
            flex: 1;
            .icon {
                width: 100px;
                height: 100px;
                display: inline-block;
                &.gallery {
                     background:url("./icon/icon_gallery.png") no-repeat;
                     background-size: 100% 100%;
                 }
                &.boutique {
                     background:url("./icon/icon_boutique.png") no-repeat;
                     background-size: 100% 100%;
                 }
                &.search {
                     background:url("./icon/icon_search.png") no-repeat;
                     background-size: 100% 100%;
                 }
                &.send {
                     background:url("./icon/icon_Send.png") no-repeat;
                     background-size: 100% 100%;
                 }
                &.photograph {
                     background:url("./icon/icon_photograph.png") no-repeat;
                     background-size: 100% 100%;
                 }
            }
            .text {
                font-size: 24px;
                line-height: 24px;
                color: #666;
                display: block;
                padding: 10px 0;
            }
        }
    }
</style>
