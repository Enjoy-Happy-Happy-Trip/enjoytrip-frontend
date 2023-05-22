<template>
    <div>
        <hero-section title="여행 계획 공유하기"></hero-section>

        <b-container class="dc-container">
            <b-form @submit.prevent="onSubmit">
                <!-- 공유할 여행 계획 select -->
                <b-form-group
                    label-cols-lg="3"
                    label="공유할 여행 계획"
                    label-for="schedule-select"
                >
                    <b-form-select
                        id="schedule-select"
                        v-model="planForm.plan_id"
                        :options="schedules"
                        @input="offValidationErrorMsg"
                    >
                        <template #first>
                            <b-form-select-option :value="null" disabled
                                >-- Please select an option
                                --</b-form-select-option
                            >
                        </template>
                    </b-form-select>
                    <div
                        v-show="
                            showValidationErrorMsg &&
                            !this.$v.planForm.plan_id.required
                        "
                        class="dc-error-msg"
                    >
                        여행 계획을 골라주세요.
                    </div>
                </b-form-group>

                <!-- 등록할 plan title -->
                <b-form-group
                    label-cols-lg="3"
                    label="Plan Title"
                    label-for="plan-title"
                >
                    <b-form-input
                        v-model="planForm.plan_title"
                        id="plan-title"
                        type="text"
                        @input="offValidationErrorMsg"
                    ></b-form-input>
                    <div
                        v-show="
                            showValidationErrorMsg &&
                            !this.$v.planForm.plan_title.required
                        "
                        class="dc-error-msg"
                    >
                        여행 이름을 입력해주세요.
                    </div>
                </b-form-group>

                <!-- 등록할 plan description -->
                <b-form-group
                    label-cols-lg="3"
                    label="Plan Description"
                    label-for="plan-description"
                >
                    <b-form-textarea
                        id="plan-description"
                        v-model="planForm.plan_desc"
                        rows="3"
                        max-rows="6"
                        @input="offValidationErrorMsg"
                    ></b-form-textarea>
                    <div
                        v-show="
                            showValidationErrorMsg &&
                            !this.$v.planForm.plan_desc.required
                        "
                        class="dc-error-msg"
                    >
                        여행에 대한 설명을 적어주세요.
                    </div>
                </b-form-group>
                <div class="text-center">
                    <b-button type="submit" variant="primary"
                        >공유하기</b-button
                    >
                </div>
            </b-form>
        </b-container>

        <!-- <div>
            {{ planForm }}
        </div> -->
    </div>
</template>

<script>
import HeroSection from "@/components/HeroSection.vue";
import { findUnSharedSchedulesByUserId } from "@/api/plan.js";
import { mapState } from "vuex";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { savePlan } from "@/api/plan.js";

export default {
    mixins: [validationMixin],
    name: "PlanShare",
    components: {
        HeroSection,
    },
    data() {
        return {
            selected: null,
            schedules: [],
            planForm: {
                plan_id: null,
                plan_title: "",
                plan_desc: "",
            },
            showValidationErrorMsg: false,
        };
    },
    validations() {
        return {
            planForm: {
                plan_id: { required },
                plan_title: { required },
                plan_desc: { required },
            },
        };
    },
    computed: {
        ...mapState("memberStore", ["userInfo"]),
    },
    created() {
        findUnSharedSchedulesByUserId(
            this.userInfo.user_id,
            ({ data }) => {
                this.schedules = this.makeScheduleList(data);
            },
            (error) => {
                console.log(error);
            }
        );
    },
    methods: {
        makeScheduleList(data) {
            const schedules = [];
            for (let schedule of data) {
                const plan = {};
                plan.value = schedule.plan_id;
                plan.text = schedule.schedule_title;
                schedules.push(plan);
            }
            return schedules;
        },
        onSubmit() {
            this.$v.$touch();
            this.showValidationErrorMsg = true;
            if (this.$v.$invalid) {
                return;
            }
            this.planForm.user_id = this.userInfo.user_id;
            savePlan(
                this.planForm,
                (response) => {
                    this.$router.push({ name: "planList" });
                },
                (error) => {
                    console.log(error);
                }
            );
        },
        offValidationErrorMsg() {
            this.showValidationErrorMsg = false;
        },
    },
};
</script>

<style scoped></style>
