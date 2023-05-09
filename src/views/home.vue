<template>
    <div>
        <nav-view></nav-view>
        <div class="hero">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-7">
                        <div class="intro-wrap">
                            <h1 class="mb-5">
                                <span>Let's </span>
                                <span class="d-block font-weight-bolder">Enjoy Your Trip</span>
                                In
                                <span class="typed-words"></span>
                            </h1>
                        </div>
                    </div>
                    <div class="col-lg-5">
                        <div class="slides">
                            <img
                                src="../../public/assets/resource/template_resource/images/hero-slider-1.jpg"
                                alt="Image"
                                class="img-fluid active"
                            />
                            <img
                                src="../../public/assets/resource/template_resource/images/hero-slider-2.jpg"
                                alt="Image"
                                class="img-fluid"
                            />
                            <img
                                src="../../public/assets/resource/template_resource/images/hero-slider-3.jpg"
                                alt="Image"
                                class="img-fluid"
                            />
                            <img
                                src="../../public/assets/resource/template_resource/images/hero-slider-4.jpg"
                                alt="Image"
                                class="img-fluid"
                            />
                            <img
                                src="../../public/assets/resource/template_resource/images/hero-slider-5.jpg"
                                alt="Image"
                                class="img-fluid"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <h1>this is home page</h1>
        <h1 v-if="this.$store.state.isLoggedIn" @click="GoToLogin">
            안녕하세요 {{ this.$store.state.user.user_name }} 님
        </h1>
        <button v-else @click="GoToLogin">go to login</button>
    </div>
</template>

<script>
import NavView from "@/components/nav.vue";

export default {
    name: "HomeView",
    components: {
        NavView,
    },
    methods: {
        GoToLogin() {
            this.$router.replace("/login");
        },
    },
};
</script>
