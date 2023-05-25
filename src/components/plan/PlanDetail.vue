<template>
    <div>
        <hero-section title="여행 계획 상세 보기"></hero-section>
        <div class="itinerary mt-3">
            <b-row class="itinerary-section">
                <b-col cols="2" class="itinerary-item">
                    <div class="itinerary-label">작성자</div>
                    <div class="itinerary-value">{{ plan.user_id }}</div>
                </b-col>
                <b-col cols="3" class="itinerary-item">
                    <div class="itinerary-label">제목</div>
                    <div class="itinerary-value">
                        {{ plan.plan_title }}
                    </div>
                </b-col>
                <b-col class="itinerary-desc">
                    <div class="itinerary-label">설명</div>
                    <div class="itinerary-value">{{ plan.plan_desc }}</div>
                </b-col>
                <b-col cols="2" class="itinerary-item">
                    <div class="itinerary-label">Scrap</div>
                    <div class="itinerary-value">
                        <b-button
                            @click="showScrapModal"
                            class="scrap-btn"
                            variant="transparent"
                            ><i class="fa-regular fa-calendar-plus fa-2xl"></i
                        ></b-button>
                    </div>
                </b-col>
            </b-row>
        </div>

        <div class="contents">
            <div class="centered">
                <div class="row" style="margin: 0">
                    <div class="kakaoMap col-md-7 mt-3" id="focusMap">
                        <kakao-map
                            ref="map"
                            :attractions="attractions"
                        ></kakao-map>
                    </div>

                    <div
                        class="table-container col-md-5 mt-3"
                        style="padding: 0"
                    >
                        <b-table
                            no-border-collapse
                            sticky-header="700px"
                            hover
                            responsive
                            :items="attractions"
                            :fields="fields"
                            @row-clicked="callMoveCenter"
                        >
                            <template #cell(image)="row">
                                <img
                                    :src="
                                        row.item.firstImage
                                            ? row.item.firstImage
                                            : require('@/assets/No_image_available.png')
                                    "
                                    ref="cursorImage"
                                    width="100px"
                                    height="100px"
                                    style="cursor: pointer"
                                />
                            </template>
                            <template #cell(index)="row">
                                {{ row.index + 1 }}
                            </template>
                            <template #cell(name)="row">
                                {{ row.item.title }}
                            </template>
                            <template #cell(address)="row">
                                {{ row.item.addr }}
                            </template>
                        </b-table>
                    </div>
                </div>
            </div>
        </div>

        <b-modal id="scrap-modal" centered>
            <template #modal-title> Scrap Plan </template>

            <!-- schedule form -->
            <b-form>
                <!-- 등록할 schedule title -->
                <b-form-group
                    label-cols-lg="3"
                    label="Schedule Title"
                    label-for="schedule-title"
                >
                    <b-form-input
                        v-model="scheduleForm.schedule_title"
                        id="schedule-title"
                        type="text"
                        @input="offValidationErrorMsg"
                    ></b-form-input>
                    <div
                        v-show="
                            showValidationErrorMsg &&
                            !this.$v.scheduleForm.schedule_title.required
                        "
                        class="dc-error-msg"
                    >
                        여행 이름을 입력해주세요.
                    </div>
                </b-form-group>
                <b-form-group
                    label-cols-lg="3"
                    label="Start date"
                    label-for="start-date"
                >
                    <b-form-datepicker
                        id="start-date"
                        v-model="scheduleForm.start_date"
                        placeholder="Choose a date"
                        @shown="offValidationErrorMsg"
                    ></b-form-datepicker>
                    <div
                        v-show="
                            showValidationErrorMsg &&
                            !this.$v.scheduleForm.start_date.required
                        "
                        class="dc-error-msg"
                    >
                        시작 날짜를 설정해주세요.
                    </div>
                </b-form-group>
                <b-form-group
                    label-cols-lg="3"
                    label="End date"
                    label-for="end-date"
                >
                    <b-form-datepicker
                        id="end-date"
                        v-model="scheduleForm.end_date"
                        placeholder="Choose a date"
                        @shown="offValidationErrorMsg"
                    ></b-form-datepicker>
                    <div
                        v-show="
                            showValidationErrorMsg &&
                            !this.$v.scheduleForm.end_date.required
                        "
                        class="dc-error-msg"
                    >
                        마지막 날짜를 설정해주세요.
                    </div>
                    <div
                        v-show="
                            showValidationErrorMsg &&
                            !this.$v.scheduleForm.end_date.after
                        "
                        class="dc-error-msg"
                    >
                        마지막 날짜는 시작 날짜 이후로 설정해주세요.
                    </div>
                </b-form-group>
            </b-form>

            <template #modal-footer="{ cancel }">
                <b-button size="sm" variant="success" @click="scrap">
                    OK
                </b-button>
                <b-button size="sm" variant="danger" @click="cancel()">
                    Cancel
                </b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
import HeroSection from "@/components/HeroSection.vue";
import KakaoMap from "@/components/tour/KakaoMap.vue";
import { mapState, mapGetters } from "vuex";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { afterTime } from "@/util/validator.js";
import { scrapPlan } from "@/api/plan.js";

const memberStore = "memberStore";

import {
    deletePlanById,
    findPlanById,
    findPlanDetailsById,
} from "@/api/plan.js";

export default {
    mixins: [validationMixin],
    name: "PlanDetail",
    components: {
        HeroSection,
        KakaoMap,
    },
    computed: {
        ...mapState(memberStore, ["isLogin", "userInfo"]),
        ...mapGetters(["checkUserInfo"]),
    },
    data() {
        return {
            message: "",
            fields: [
                { key: "index", label: "No" },
                { key: "image", label: "대표이미지" },
                { key: "name", label: "관광지명" },
                { key: "address", label: "주소" },
            ],
            plan: {},
            attractions: [],
            scheduleForm: {
                schedule_title: "",
                plan_id: null,
                start_date: "",
                end_date: "",
            },
            showValidationErrorMsg: false,
        };
    },
    validations() {
        return {
            scheduleForm: {
                schedule_title: { required },
                start_date: { required },
                end_date: {
                    required,
                    after: afterTime(this.scheduleForm.start_date),
                },
            },
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

                if (window.kakao && window.kakao.maps) {
                    this.$refs.map.displayMarker(
                        this.$refs.map.convertMarker(this.attractions)
                    );
                    this.$refs.map.displayLine(
                        this.$refs.map.convertLine(this.attractions)
                    );
                }
            },
            (error) => {
                console.log(error);
            }
        );
    },
    methods: {
        callMoveCenter(item) {
            const kakaoMap = this.$refs.map;
            kakaoMap.moveCenter(item.latitude, item.longitude);
        },
        deletePlan() {
            deletePlanById(
                this.plan.plan_id,
                () => {
                    alert("계획 삭제 성공!!");
                    this.$router.push(`/plan`);
                },
                (error) => {
                    console.log(error);
                }
            );
        },
        showScrapModal() {
            this.$bvModal.show("scrap-modal");
        },
        offValidationErrorMsg() {
            this.showValidationErrorMsg = false;
        },
        scrap() {
            this.showValidationErrorMsg = true;
            this.$v.scheduleForm.$touch();
            console.log(this.$v);
            if (this.$v.scheduleForm.$invalid) {
                return;
            }
            this.scheduleForm.plan_id = this.plan.plan_id;
            this.scheduleForm.user_id = this.userInfo.user_id;
            scrapPlan(
                this.scheduleForm,
                (response) => {
                    console.log(response);
                    this.$router.push(`/schedule`);
                },
                (error) => {
                    console.log(error);
                }
            );
        },
    },
};
</script>

<style scoped>
.itinerary {
    display: flex;
    justify-content: center;
    align-items: center;
}

.itinerary-section {
    display: flex;
    width: 80%;
    text-align: center;
    border: 2px solid #000000;
}

.itinerary-item {
    width: 25%;
    text-align: center;
    margin-bottom: 15px;
}

.itinerary-desc {
    width: 50%;
    text-align: center;
    margin-bottom: 15px;
}

.itinerary-label {
    font-weight: bold;
    margin-top: 15px;
}

.itinerary-value {
    margin-top: 15px;
}

.contents {
    display: flex;
    justify-content: center;
    align-items: center;
}

.centered {
    width: 80%;
    text-align: center;
}

.scrap-btn :hover {
    color: rgb(62, 62, 254);
}
</style>
