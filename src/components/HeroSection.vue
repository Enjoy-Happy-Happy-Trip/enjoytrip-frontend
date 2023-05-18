<template>
    <div class="hero hero-inner">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6 mx-auto text-center">
                    <div class="intro-wrap">
                        <h1 class="mb-0">{{ title }}</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "HeroSection",
    components: {},
    props: {
        title: String,
    },
    data() {
        return {
            message: "",
        };
    },
    created() {},
    methods: {},
};
</script>

<style scoped></style>
