<template>
    <hero-section title="여행 계획 공유하기"></hero-section>
</template>

<script>
import HeroSection from "@/components/HeroSection.vue";
import { findUnSharedSchedulesByUserId } from "@/api/plan.js";
import { mapState } from "vuex";

export default {
    name: "PlanShare",
    components: {
        HeroSection,
    },
    data() {
        return {
            message: "",
            schedules: [],
        };
    },
    computed: {
        ...mapState("memberStore", ["userInfo"]),
    },
    created() {
        console.log(this.userInfo.user_id);
        findUnSharedSchedulesByUserId(
            this.userInfo.user_id,
            ({ data }) => {
                console.log(data);
            },
            (error) => {
                console.log(error);
            }
        );
    },
    methods: {},
};
</script>

<style scoped></style>
