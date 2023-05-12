<template>
    <div>
        <div class="hero">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-7">
                        <div class="intro-wrap">
                            <h1 class="mb-5">
                                <span>Let's </span>
                                <span class="d-block font-weight-bolder"
                                    >Enjoy Your Trip</span
                                >
                                In
                                <span class="typed-words"></span>
                            </h1>
                        </div>
                    </div>
                    <div class="col-lg-5">
                        <div class="slides" ref="hero-slide">
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
                        <h2 class="section-title text-center">
                            Popular Destination
                        </h2>
                    </div>
                </div>

                <div class="owl-carousel owl-3-slider" ref="slides">
                    <div class="item">
                        <a
                            class="media-thumb"
                            href="../../public/assets/resource/template_resource/images/hero-slider-1.jpg"
                            data-fancybox="gallery"
                        >
                            <div class="media-text">
                                <h3>Pragser Wildsee</h3>
                                <span class="location">Italy</span>
                            </div>
                            <img
                                src="../../public/assets/resource/template_resource/images/hero-slider-1.jpg"
                                alt="Image"
                                class="img-fluid"
                            />
                        </a>
                    </div>

                    <div class="item">
                        <a
                            class="media-thumb"
                            href="../../public/assets/resource/template_resource/images/hero-slider-2.jpg"
                            data-fancybox="gallery"
                        >
                            <div class="media-text">
                                <h3>Oia</h3>
                                <span class="location">Greece</span>
                            </div>
                            <img
                                src="../../public/assets/resource/template_resource/images/hero-slider-2.jpg"
                                alt="Image"
                                class="img-fluid"
                            />
                        </a>
                    </div>

                    <div class="item">
                        <a
                            class="media-thumb"
                            href="../../public/assets/resource/template_resource/images/hero-slider-3.jpg"
                            data-fancybox="gallery"
                        >
                            <div class="media-text">
                                <h3>Perhentian Islands</h3>
                                <span class="location">Malaysia</span>
                            </div>
                            <img
                                src="../../public/assets/resource/template_resource/images/hero-slider-3.jpg"
                                alt="Image"
                                class="img-fluid"
                            />
                        </a>
                    </div>

                    <div class="item">
                        <a
                            class="media-thumb"
                            href="../../public/assets/resource/template_resource/images/hero-slider-4.jpg"
                            data-fancybox="gallery"
                        >
                            <div class="media-text">
                                <h3>Rialto Bridge</h3>
                                <span class="location">Italy</span>
                            </div>
                            <img
                                src="../../public/assets/resource/template_resource/images/hero-slider-4.jpg"
                                alt="Image"
                                class="img-fluid"
                            />
                        </a>
                    </div>

                    <div class="item">
                        <a
                            class="media-thumb"
                            href="../../public/assets/resource/template_resource/images/hero-slider-5.jpg"
                            data-fancybox="gallery"
                        >
                            <div class="media-text">
                                <h3>San Francisco, United States</h3>
                                <span class="location">United States</span>
                            </div>
                            <img
                                src="../../public/assets/resource/template_resource/images/hero-slider-5.jpg"
                                alt="Image"
                                class="img-fluid"
                            />
                        </a>
                    </div>

                    <div class="item">
                        <a
                            class="media-thumb"
                            href="../../public/assets/resource/template_resource/images/hero-slider-1.jpg"
                            data-fancybox="gallery"
                        >
                            <div class="media-text">
                                <h3>Lake Thun</h3>
                                <span class="location">Switzerland</span>
                            </div>
                            <img
                                src="../../public/assets/resource/template_resource/images/hero-slider-1.jpg"
                                alt="Image"
                                class="img-fluid"
                            />
                        </a>
                    </div>

                    <div class="item">
                        <a
                            class="media-thumb"
                            href="../../public/assets/resource/template_resource/images/hero-slider-4.jpg"
                            data-fancybox="gallery"
                        >
                            <div class="media-text">
                                <h3>The Great Palace</h3>
                                <span class="location">U.K.</span>
                            </div>
                            <img
                                src="../../public/assets/resource/template_resource/images/hero-slider-4.jpg"
                                alt="Image"
                                class="img-fluid"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "HomeView",
    data() {
        return {
            images: [],
            timer: null,
        };
    },
    methods: {
        GoToLogin() {
            this.$router.replace("/login");
        },
    },
    mounted() {
        const slides = this.$refs.slides;

        console.log(slides);
        const images = slides.querySelectorAll("img");

        images.forEach((image, i) => {
            image.setAttribute("data-id", i + 1);
            this.images.push(image);
        });

        const typed = new Typed(".typed-words", {
            strings: [
                " 순천.",
                " 서울.",
                " 경주.",
                " 부산.",
                " 여수.",
                " 제주.",
                " 속초.",
            ],
            typeSpeed: 80,
            backSpeed: 80,
            backDelay: 4000,
            startDelay: 1000,
            loop: true,
            showCursor: true,
            preStringTyped: (arrayPos, self) => {
                arrayPos++;
                // console.log(arrayPos);
                this.images.forEach((image) =>
                    image.classList.remove("active")
                );
                this.images[arrayPos - 1].classList.add("active");
            },
        });

        const heroSlide = this.$refs["hero-slide"];
        const heroImages = heroSlide.querySelectorAll("img");

        heroImages.forEach((image, index) => {
            if (index === 0) {
                image.classList.add("active");
            } else {
                image.classList.remove("active");
            }
        });

        let imageIdx = 0;

        this.timer = setInterval(() => {
            console.log(imageIdx);
            let image = heroImages[imageIdx];

            if (image.classList.contains("active")) {
                image.classList.remove("active");
                imageIdx = (imageIdx + 1) % heroImages.length;
                heroImages[imageIdx].classList.add("active");
            }
        }, 5000);
    },
    beforeRouteLeave(to, from, next) {
        clearTimeout(this.timer);
        console.log(this.timer);
        next();
    },
};
</script>
