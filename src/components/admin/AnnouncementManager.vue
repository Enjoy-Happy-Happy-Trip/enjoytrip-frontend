<template>
    <div>
        <hero-section title="공지사항 관리"></hero-section>
    </div>
</template>

<script>
import HeroSection from "@/components/HeroSection.vue";

export default {
    name: "AnnouncementManager",
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
