<template>
    <div>
        <hero-section title="내 여행 계획"></hero-section>

        <div class="untree_co-section">
            <div class="container my-5">
                <div class="row justify-content-center">
                    <div class="col-sm-10">
                        <div class="row mb-5">
                            <div class="table-responsive" style="width: 100%">
                                <my-schedule></my-schedule>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MySchedule from "./MySchedule.vue";
import HeroSection from "@/components/HeroSection.vue";
import { apiInstance } from "@/api/http";
import { mapState, mapGetters } from "vuex";

const api = apiInstance();
const memberStore = "memberStore";

export default {
    name: "ScheduleList",
    components: {
        MySchedule,
        HeroSection,
    },
    computed: {
        ...mapState(memberStore, ["isLogin", "userInfo"]),
        ...mapGetters(["checkUserInfo"]),
    },
    data() {
        return {
        };
    },
    created() {
    },
    methods: {
    },
};
</script>
