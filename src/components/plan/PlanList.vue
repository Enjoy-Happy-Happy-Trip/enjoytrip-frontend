<template>
    <div>
        <hero-section title="여행 계획 게시판"></hero-section>
        
    </div>
</template>

<script>
import HeroSection from "@/components/HeroSection.vue";

export default {
    name: "PlanList",
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
