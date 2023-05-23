<template>
    <div>
        <hero-section title="Admin Page"></hero-section>
    </div>
</template>

<script>
import HeroSection from "@/components/HeroSection.vue";

export default {
    name: "AdminView",
    components: {
        HeroSection,
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
