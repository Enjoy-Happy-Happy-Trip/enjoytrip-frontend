<template>
    <div>
        <hero-section title="비밀번호 찾기"></hero-section>
        <b-container class="dc-container">
            <b-form @submit.prevent="onSubmit">
                <!-- 아이디 입력 -->
                <b-form-group label-cols-lg="3" label="ID" label-for="userID">
                    <b-form-input
                        id="userID"
                        v-model="form.user_id"
                        type="text"
                        @input="offValidationErrorMsg"
                    >
                    </b-form-input>
                    <div
                        v-show="showValidationErrorMsg && !this.$v.form.user_id.required"
                        class="dc-error-msg"
                    >
                        아이디를 입력해주세요.
                    </div>
                </b-form-group>

                <!-- 이름 입력 -->
                <b-form-group label-cols-lg="3" label="Name" label-for="userName">
                    <b-form-input
                        id="userName"
                        v-model="form.user_name"
                        type="text"
                        @input="offValidationErrorMsg"
                    >
                    </b-form-input>
                    <div
                        v-show="showValidationErrorMsg && !this.$v.form.user_name.required"
                        class="dc-error-msg"
                    >
                        이름을 입력해주세요.
                    </div>
                </b-form-group>

                <!-- 이메일 입력 -->
                <b-form-group label-cols-lg="3" label="Email" label-for="userEmail">
                    <b-row>
                        <b-col>
                            <b-form-input
                                id="userEmail"
                                v-model="form.email_id"
                                type="text"
                                @input="offValidationErrorMsg"
                            >
                            </b-form-input>
                        </b-col>
                        <b-col>
                            <b-input-group prepend="@">
                                <b-form-select
                                    v-model="form.email_domain"
                                    :options="domains"
                                    @input="offValidationErrorMsg"
                                >
                                </b-form-select>
                            </b-input-group>
                        </b-col>
                    </b-row>

                    <div
                        v-show="showValidationErrorMsg && !this.$v.form.email_id.required"
                        class="dc-error-msg"
                    >
                        이메일 아이디를 입력해주세요.
                    </div>
                    <div
                        v-show="showValidationErrorMsg && !this.$v.form.email_domain.required"
                        class="dc-error-msg"
                    >
                        도메인을 골라주세요.
                    </div>
                </b-form-group>
                <div v-show="failToFindUserInfo" class="dc-error-msg">
                    입력한 정보에 맞는 회원 정보가 없습니다.
                </div>
                <div class="text-center">
                    <b-button type="submit" variant="primary">비밀번호 찾기</b-button>
                </div>
            </b-form>
        </b-container>
    </div>
</template>

<script>
import HeroSection from "@/components/HeroSection.vue";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { confirmUserToFindPwd } from "@/api/member.js";

export default {
    mixins: [validationMixin],
    name: "FindPwd",
    components: {
        HeroSection,
    },
    data() {
        return {
            form: {
                user_id: "",
                user_name: "",
                email_id: "",
                email_domain: "",
            },
            failToFindUserInfo: false,
            showValidationErrorMsg: false,
        };
    },
    validations() {
        return {
            form: {
                user_id: { required },
                user_name: { required },
                email_id: { required },
                email_domain: { required },
            },
        };
    },
    created() {},
    methods: {
        onSubmit() {
            this.$v.$touch();
            this.$v.confirm_password.$touch();
            this.showValidationErrorMsg = true;
            if (this.$v.$invalid) {
                return;
            }
            confirmUserToFindPwd(
                this.form,
                (response) => {
                    console.log(response);
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
