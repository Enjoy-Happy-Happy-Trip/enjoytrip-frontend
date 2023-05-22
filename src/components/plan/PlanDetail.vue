<template>
    <div>
        <hero-section title="여행 계획 상세 보기"></hero-section>
        <b-container class="dc-container">
            <h1 class="font-weight-bold">{{ plan.plan_title }}</h1>
            <hr />
            <p class="user">작성자 : {{ plan.user_id }}</p>
            <hr />
            <b-container>
                <b-row>
                    <b-col>
                        <!-- 1. attraction list -->
                        <b-table responsive hover :items="attractions" :fields="fields">
                            <template #cell(index)="data">
                                {{ data.index + 1 }}
                            </template>
                        </b-table>
                    </b-col>

                    <b-col>
                        <!-- 2. description -->
                        <div class="rounded border p-2">
                            <h3>description</h3>
                            <p>{{ plan.plan_desc }}</p>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
        </b-container>
    </div>
</template>

<script>
import HeroSection from "@/components/HeroSection.vue";
import { findPlanById, findPlanDetailsById } from "@/api/plan.js";

export default {
    name: "PlanDetail",
    components: {
        HeroSection,
    },
    data() {
        return {
            message: "",
            fields: [
                { key: "index", label: "No.", thClass: "w10" },
                {
                    key: "title",
                    label: "관광지 목록",
                    class: "text-center",
                    thClass: "w90",
                },
            ],
            plan: null,
            attractions: [],
        };
    },
    created() {
        let planId = this.$route.params.planId;

        findPlanById(
            planId,
            ({ data }) => {
                this.plan = data;
            },
            (error) => {
                console.log(error);
            }
        );

        findPlanDetailsById(
            planId,
            ({ data }) => {
                this.attractions = data;
            },
            (error) => {
                console.log(error);
            }
        );
    },
    methods: {},
};
</script>

<style scoped>
.user {
    text-align: right;
}

.contents {
    display: flex;
}
</style>
