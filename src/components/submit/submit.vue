<template>
    <div class="submit" ref="submit">
        <div class="button" @click.stop.prevent="submit">{{text}}</div>
    </div>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: ""
        },
        flag: {
            type: Boolean,
            default: false,
        }
    },
    mounted () {
        this.submitFixed();
    },
    methods: {
        submit() {
            this.$emit("submit");
        },
        submitFixed: function () {
            if(parseInt(window.getComputedStyle(document.querySelector(".wrapper"), null).height) > document.documentElement.clientHeight) {
                this.$refs.submit.classList.remove("fixed");
            }else {
                this.$refs.submit.classList.add("fixed");
            }
        },
    }
}
</script>

<style lang="sass" scoped>
    .fixed{
        position: fixed;
        bottom: 0;
    }
    .submit {
        width: 100%;
        .button {
            font-size: 30px;
            border-radius: 10px;
            display: block;
            line-height: 30px;
            padding: 28px 0;
            background: #03A3E7;
            color: #fff;
            text-align: center;
            margin: 20px;
        }
    }

</style>
