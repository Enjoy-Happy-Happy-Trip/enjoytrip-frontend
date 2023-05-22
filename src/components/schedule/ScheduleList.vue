<template>
    <div>
        <hero-section title="내 여행 계획"></hero-section>

        <div class="untree_co-section">
            <div class="container my-5">
                <div class="row justify-content-center">
                    <div class="col-sm-10">
                        <div class="row mb-5">
                            <div class="table-responsive" style="width: 100%">
                                <b-button-group class="button mb-3">
                                    <b-button
                                        v-if="selectedOption === 0"
                                        @click="planList"
                                        variant="primary"
                                    >
                                        예정된 일정
                                    </b-button>
                                    <b-button
                                        v-else
                                        @click="planList"
                                        variant="success"
                                    >
                                        완료된 일정
                                    </b-button>
                                </b-button-group>
                                <my-schedule :articles="articles"></my-schedule>
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
            articles: [],
            selectedOption: 1,
        };
    },
    created() {
        this.planList();
    },
    methods: {
        planList() {
            if(this.selectedOption === 0) {
                this.selectedOption = 1;
            } else {
                this.selectedOption = 0;
            }

            api.get(`/plan/getplans/${this.userInfo.user_id}?time=${this.selectedOption}`)
                .then(({ data }) => {
                    this.articles = data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
};
</script>
