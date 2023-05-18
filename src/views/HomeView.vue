<template>
    <div>
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
                        <div class="slides" ref="heroSlide">
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
        <div class="untree_co-section">
            <div class="container">
                <div class="row text-center justify-content-center mb-5">
                    <div class="col-lg-7">
                        <h2 class="section-title text-center">Popular Destination</h2>
                    </div>
                </div>
                <HomeCarousel></HomeCarousel>
            </div>
        </div>
    </div>
</template>

<script>
import HomeCarousel from "@/components/HomeCarousel.vue";

export default {
    name: "HomeView",
    data() {
        return {
            typedText: "",
            heroImages: [],
            activeHeroImageIndex: 0,
            timer: null,
        };
    },
    components: {
        HomeCarousel,
    },
    mounted() {
        const typed = new Typed(".typed-words", {
            strings: [" 순천.", " 서울.", " 경주.", " 부산.", " 여수.", " 제주.", " 속초."],
            typeSpeed: 80,
            backSpeed: 80,
            backDelay: 4000,
            startDelay: 1000,
            loop: true,
            showCursor: true,
        });

        const heroSlide = this.$refs.heroSlide;
        this.heroImages = heroSlide.querySelectorAll("img");
        this.heroImages[this.activeHeroImageIndex].classList.add("active");

        this.timer = setInterval(this.rotateHeroImages, 5000);
    },
    beforeRouteLeave(to, from, next) {
        clearTimeout(this.timer);
        // console.log(this.timer);
        next();
    },
    methods: {
        rotateHeroImages() {
            this.heroImages[this.activeHeroImageIndex].classList.remove("active");
            this.activeHeroImageIndex = (this.activeHeroImageIndex + 1) % this.heroImages.length;
            this.heroImages[this.activeHeroImageIndex].classList.add("active");
        },
        GoToLogin() {
            this.$router.replace("/login");
        },
    },
};
</script>
