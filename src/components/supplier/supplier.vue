<template>
    <div class="pic-text-list">
        <div class="pic-text-item" v-for="(item, index) in supplier">
            <div class="pic">
                <img :src="item.image" alt="">
            </div>
            <div class="text-wrapper">
                <span class="title">{{item.companyName}}</span>
                <span class="name">联系人：{{item.contact}}</span>
                <span class="phone">手&nbsp;&nbsp;&nbsp;机：{{item.mobile}}</span>
                <span class="address">
                    <i class="label">地&nbsp;&nbsp;&nbsp;址：</i>
                    <i class="text">{{item.address}}</i>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        page: String,
        default: ""
    },
    data () {
        return {
            supplier: []
        }
    },
    created () {
        this.getSupplier();
    },
    computed: {

    },
    methods: {
        getSupplier () {
            let supplier = [];
            console.log("supplier");
            if(this.page == "boutiqueDetail" || this.page == "searchDetail") {
//                console.log(this.$store.state.data[this.page]);
                this.supplier = [this.$store.state.data[this.page][0].data.company];
            }else {
                this.supplier = this.$store.state.data[this.page].data.supplier;
            }
        }
    }
}
</script>

<style lang="sass" scoped>
.pic-text-list {
    .pic-text-item{
        overflow: hidden;
        margin-top: 30px;
        display: flex;
        .pic{
            width: 280px;
        }
        .text-wrapper{
            flex: 1;
            margin-left: 30px;
            span{
                display: block;
                font-size: 22px;
                line-height: 42px;
            }
            .title{
                font-size: 28px;
            }
            .address{
                display: flex;
                .label{
                    width: 85px;
                }
                .text{
                    flex: 1;
                }
            }
        }
    }
}
</style>
