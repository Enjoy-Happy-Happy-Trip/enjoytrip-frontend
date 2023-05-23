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

                <!-- 인증 코드 입력 -->
                <b-form-group
                    v-show="showAuthCodeInput"
                    label-cols-lg="3"
                    label="인증코드"
                    label-for="authCode"
                >
                    <b-input-group>
                        <b-form-input
                            id="authCode"
                            v-model="authCodeInput"
                            type="text"
                            @input="offValidationErrorMsg"
                        >
                        </b-form-input>
                        <b-input-group-append>
                            <b-button variant="outline-success" @click="confirmAuthCode"
                                >인증하기</b-button
                            >
                        </b-input-group-append>
                    </b-input-group>
                    <div
                        v-show="showValidationErrorMsg && !$v.authCodeInput.validAuthCode"
                        class="dc-error-msg"
                    >
                        인증코드가 올바르지 않습니다.
                    </div>
                </b-form-group>
                <div class="text-center">
                    <b-button type="submit" variant="primary">비밀번호 찾기</b-button>
                </div>
            </b-form>
        </b-container>
        <div>
            {{ this.form }}
            {{ this.authCode }}
            show : {{ this.showAuthCodeInput }}
        </div>
        <div>
            {{ this.authCode }}
            {{ this.authCodeInput }}
        </div>
    </div>
</template>

<script>
import HeroSection from "@/components/HeroSection.vue";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { sameAs } from "@/util/validator.js";
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
                email_id: "",
                email_domain: "",
            },
            failToFindUserInfo: false,
            showValidationErrorMsg: false,
            showAuthCodeInput: false,
            authCodeInput: "",
            authCode: "123456",
            domains: ["naver.com", "ssafy.com", "google.com"],
        };
    },
    validations() {
        return {
            form: {
                user_id: { required },
                email_id: { required },
                email_domain: { required },
            },
            authCodeInput: { validAuthCode: sameAs(this.authCode) },
        };
    },
    created() {},
    methods: {
        onSubmit() {
            console.log(this.$v);
            this.$v.form.$touch();
            this.showValidationErrorMsg = true;
            if (this.$v.form.$invalid) {
                return;
            }
            this.showAuthCodeInput = true;
            // confirmUserToFindPwd(
            //     this.form,
            //     (response) => {
            //         console.log(response);
            //         this.showAuthCodeInput = true;
            //         this.authCode = response.data;
            //     },
            //     (error) => {
            //         console.log(error);
            //     }
            // );
        },
        offValidationErrorMsg() {
            this.showValidationErrorMsg = false;
        },
        confirmAuthCode() {
            this.showValidationErrorMsg = true;
            this.$v.authCodeInput.$touch();
            if (this.$v.authCodeInput.$invalid) {
                return;
            }
            this.$router.push({
                name: "ResetPwd",
                params: {
                    userId: this.form.user_id,
                },
            });
        },
    },
};
</script>

<style scoped></style>
