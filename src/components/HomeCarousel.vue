<template>
    <carousel
        :autoplay="true"
        :autoplaySpeed="4000"
        :nav="false"
        :dots="false"
        :loop="true"
        class="marginTop50"
    >
        <img
            class="body-slide"
            v-for="img in imgs"
            :key="img"
            :src="
                require(`../../public/assets/resource/template_resource/images/hero-slider-${img}`)
            "
        />
    </carousel>
</template>

<script>
import carousel from "vue-owl-carousel";

export default {
    name: "HomeCarousel",
    components: {
        carousel,
    },
    data() {
        return {
            message: "",
            imgs: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"],
        };
    },
    created() {},
    methods: {},
};
</script>

<style scoped>
.body-slide {
    padding: 0 10px;
    border-radius: 20px;
}
</style>
