<template>
    <div>
        <hero-section title="여행 계획 게시판"></hero-section>
        <b-container class="dc-container">
            <!-- 검색 및 글쓰기 버튼이 들어갈 box -->
            <div>
                <b-button class="button mb-3" variant="outline-primary" @click="gotoPlanShare">계획 공유하기</b-button>
            </div>
            <b-table
                hover
                responsive
                :items="plans"
                :fields="fields"
                @row-clicked="showDetail"
            ></b-table>
        </b-container>
    </div>
</template>

<script>
import HeroSection from "@/components/HeroSection.vue";
import { getAllPlans } from "@/api/plan.js";

export default {
    name: "PlanList",
    components: {
        HeroSection,
    },
    data() {
        return {
            message: "",
            fields: ["planNo", "user_id", "plan_title"],
            plans: [],
        };
    },
    created() {
        getAllPlans(
            ({ data }) => {
                this.plans = data;
                this.addPlanNo(1); // 이후에 페이지마다 시작번호를 다르게 한다.
            },
            (error) => {
                console.log(error);
            }
        );
    },
    methods: {
        addPlanNo(startNo) {
            for (let plan of this.plans) {
                plan.planNo = startNo++;
            }
        },
        showDetail(item) {
            this.$router.push(`/plan/detail/${item.plan_id}`);
        },
        gotoPlanShare() {
            this.$router.push(`/plan/share`);
        },
    },
};
</script>

<style scoped></style>
