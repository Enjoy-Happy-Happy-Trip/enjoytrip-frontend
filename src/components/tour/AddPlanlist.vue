<template>
    <div>
        <div
            class="planList d-flex align-items-center justify-content-center alert alert-primary mt-3 text-center fw-bold"
        >
            여행 계획
        </div>
        <b-form-input
            class="form-input me-2"
            type="text"
            placeholder="여행 이름을 정해주세요"
            id="planTitle"
            v-model="planTitle"
        >
        </b-form-input>
        <form class="d-flex my-3" onsubmit="return false;">
            <b-input-group>
                <b-form-input
                    class="form-input me-2"
                    type="date"
                    id="start_date"
                    name="start_date"
                    v-model="startDate"
                    :min="minStartDate"
                ></b-form-input>
                <b-form-input
                    class="form-input"
                    type="date"
                    id="end_date"
                    name="end_date"
                    v-model="endDate"
                    :min="minEndDate"
                ></b-form-input>
            </b-input-group>
            <div id="planListDetail"></div>
        </form>
        <div id="addedPlan">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col" style="width: 15%">번호</th>
                        <th scope="col" style="width: 70%">여행지 이름</th>
                        <th scope="col" style="width: 15%">삭제</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(plan, index) in plans" :key="index">
                        <td style="text-align: center; justify-content: center">
                            {{ index + 1 }}
                        </td>
                        <td>{{ plan }}</td>
                        <td>
                            <img
                                :src="require('@/assets/trashbin.jpg')"
                                width="30"
                                height="30"
                                @click="deletePlan(index)"
                                style="cursor: pointer"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="text-right mt-3">
            <button
                v-if="modify"
                class="btn btn-outline-success"
                id="modifyPlan"
                @click="modifySchedule"
            >
                계획 수정
            </button>
            <button
                v-else
                class="btn btn-outline-success"
                id="savePlan"
                @click="savePlan"
            >
                계획 저장
            </button>
            <button
                class="btn btn-outline-danger"
                id="resetPlan"
                @click="resetPlan"
            >
                초기화
            </button>
        </div>
    </div>
</template>

<script>
import { apiInstance } from "@/api/http";
import { mapState, mapGetters } from "vuex";
import { findScheduleById, modifyScheduleById } from "@/api/plan.js";

const memberStore = "memberStore";
const api = apiInstance();

export default {
    name: "AddPlanlist",
    props: {
        scheduleId: String,
    },
    data() {
        return {
            planTitle: "",
            startDate: "",
            endDate: "",
            plans: [],
            contentIds: [],
            minStartDate: "",
            modify: false,
            hasPlanListModified: false,
        };
    },
    created() {
        if (this.scheduleId) {
            this.modify = true;
            findScheduleById(
                this.scheduleId,
                ({ data }) => {
                    this.planTitle = data.schedule_title;
                    this.startDate = data.start_date;
                    this.endDate = data.end_date;
                    this.plans = data.attractions.map(
                        (attraction) => attraction.title
                    );
                    this.contentIds = data.attractions.map(
                        (attraction) => attraction.contentId
                    );
                },
                (error) => {
                    console.log(error);
                }
            );
        }
    },
    computed: {
        ...mapState(memberStore, ["isLogin", "userInfo"]),
        ...mapGetters(["checkUserInfo"]),

        minEndDate() {
            if (this.startDate) {
                const minEndDate = new Date(this.startDate);
                return minEndDate.toISOString().split("T")[0];
            }

            const today = new Date();
            return today.toISOString().split("T")[0];
        },
    },
    mounted() {
        // const today = new Date();
        // const year = today.getFullYear();
        // const month = String(today.getMonth() + 1).padStart(2, "0");
        // const day = String(today.getDate()).padStart(2, "0");
        // this.minStartDate = `${year}-${month}-${day}`;
    },
    methods: {
        deletePlan(idx) {
            this.plans.splice(idx, 1);
            this.contentIds.splice(idx, 1);
            this.hasPlanListModified = true; // modify 기능을 위함
        },
        resetPlan() {
            this.plans = [];
            this.contentIds = [];
        },
        addPlan(placeTitle, contentId) {
            if (this.plans.length < 10) {
                for (let i = 0; i < this.plans.length; i++) {
                    if (placeTitle === this.plans[i]) {
                        alert("이미 추가된 장소입니다");
                        return;
                    }
                }
                this.hasPlanListModified = true; // modify 기능을 위함
                this.plans.push(placeTitle);
                this.contentIds.push(contentId);
            } else {
                alert("더이상 추가할 수 없습니다");
            }
        },
        savePlan() {
            if (!this.userInfo) {
                alert("로그인 필요!!");
                this.$router.push({ name: "LoginView" });
                return;
            }

            if (this.planTitle === "") {
                alert("여행 이름을 정해주세요");
                return;
            }
            if (this.startDate === "") {
                alert("여행 출발일을 정해주세요");
                return;
            }
            if (this.endDate === "") {
                alert("여행 종료일을 정해주세요");
                return;
            }

            const param = {
                plan: this.plans,
                content_ids: this.contentIds,
                user_id: this.userInfo.user_id,
                planTitle: this.planTitle,
                startDate: this.startDate,
                endDate: this.endDate,
            };

            api.post(`/tour/saveplan`, param)
                .then(() => {
                    alert("여행 계획 저장 완료!");
                    this.$router.push({ name: "HomeView" });
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        modifySchedule() {
            const schedule = {
                schedule_id: this.scheduleId,
                user_id: this.userInfo.user_id,
                schedule_title: this.planTitle,
                start_date: this.startDate,
                end_date: this.endDate,
                attractions: this.contentIds.map((id) => {
                    return {
                        contentId: id,
                    };
                }),
            };
            modifyScheduleById(
                this.scheduleId,
                schedule,
                this.hasPlanListModified,
                (response) => {
                    this.$router.push({ name: "HomeView" });
                },
                (error) => {
                    console.log(error);
                }
            );
        },
    },
};
</script>

<style>
.planList {
    height: 60px;
}
.text-right {
    text-align: right;
}
.text-right.mt-3 button {
    margin-left: 10px;
}
</style>
