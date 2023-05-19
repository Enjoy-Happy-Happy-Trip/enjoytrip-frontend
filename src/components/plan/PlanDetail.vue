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
                        <b-table striped hover :items="attractions" :fields="fields">
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
                console.log(data);
                this.plan = data;
            },
            (error) => {
                console.log(error);
            }
        );

        findPlanDetailsById(
            planId,
            ({ data }) => {
                console.log(data);
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
.dc-container {
    margin: 5% auto;
}

.user {
    text-align: right;
}

.contents {
    display: flex;
}

table.b-table thead th.w10 {
    width: 10%;
}
table.b-table thead th.w20 {
    width: 20%;
}
table.b-table thead th.w30 {
    width: 30%;
}
table.b-table thead th.w40 {
    width: 40%;
}
table.b-table thead th.w50 {
    width: 50%;
}
table.b-table thead th.w60 {
    width: 60%;
}
table.b-table thead th.w70 {
    width: 70%;
}
table.b-table thead th.w80 {
    width: 80%;
}
table.b-table thead th.w90 {
    width: 90%;
}
table.b-table thead th.w15 {
    width: 15%;
}
table.b-table thead th.w25 {
    width: 25%;
}
table.b-table thead th.w35 {
    width: 35%;
}
table.b-table thead th.w45 {
    width: 45%;
}
table.b-table thead th.w55 {
    width: 55%;
}
table.b-table thead th.w65 {
    width: 65%;
}
table.b-table thead th.w75 {
    width: 75%;
}
table.b-table thead th.w85 {
    width: 85%;
}
table.b-table thead th.w95 {
    width: 95%;
}
</style>
