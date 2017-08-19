<template>
<div class="select-list">
    <div class="select-item">
        <select v-model="province" @change="selectCity">
            <option value="省份">省份</option>
            <option v-for="(item, index) in options.province" :value="item">{{item}}</option>
        </select>
    </div>
    <div class="select-item">
        <select v-model="city" @change="selectZone">
            <option value="地级市">地级市</option>
            <option v-for="(item, index) in options.city" :value="item.name">{{item.name}}</option>
        </select>
    </div>
    <div class="select-item">
        <select v-model="zone">
            <option value="县、区">县、区</option>
            <option v-for="(item, index) in options.zone" :value="item.name">{{item.name}}</option>
        </select>
    </div>
</div>
</template>

<script>
    import selectArea from "src/common/selectArea";
export default {
    props: {

    },
    data () {
        let getDelivery = this.$store.state.data.getDelivery
        let detail = {};
        if(getDelivery) {
            detail = getDelivery.data.detail;
        }
        return {
            selectArea: selectArea,
            province: detail.provinceName || "省份",
            city: detail.cityName || "地级市",
            zone: detail.countyName || "县、区",
            options: {
                province: [],
                city: [],
                zone: [],
            }
        }
    },
    created () {
        this.selectProvince();
    },
    mounted () {

    },
    methods: {
        selectProvince() {
            console.log("selectProvince");
            this.selectArea.forEach((item, index)=>{
                this.options.province.push(item.name);
            });
            this.$emit("province", {
                province: this.province
            });
            this.selectCity({
                city: this.city,
                zone: this.zone
            });
        },
        selectCity(address) {
            this.selectArea.forEach((item, index)=>{
                if(this.province == "省份") {
                    this.city = "地级市";
                    this.options.city = [];
                }else if(item.name == this.province) {
                    this.options.city = item.sub;
                    this.city = address.city || item.sub[0].name;
                    this.selectZone({
                        zone: this.zone
                    });
                    return false;
                }
            });
            this.$emit("city", {
                province: this.province,
                city: this.city,
            });
        },
        selectZone (address) {
            console.log(this.province);
            console.log(this.city);
            console.log(this.zone);
            this.selectArea.forEach((item, index)=>{
                if(this.city == "地级市") {
                    this.zone = "县、区";
                    this.options.zone = [];
                }else if(item.name == this.province) {
                    this.options.city.forEach((city_item, city_index)=>{
                        if(city_item.name == this.city) {
                            if(!city_item.sub) {
                                this.zone = "县、区";
                                this.options.zone = [];
                            }else {
                                this.options.zone = city_item.sub;
                                this.zone = address.zone || city_item.sub[0].name;
                            }
                            return false;
                        }
                    });
                    return false;
                }
            });
            this.$emit("zone", {
                province: this.province,
                city: this.city,
                zone: this.zone,
            });
        }
    }
}
</script>

<style lang="sass" scoped>
.select-list{
    display: flex;
    width: 550px;
    margin-left: 30px;
    .select-item{
        flex: 1;
    }
}
</style>
