<template>
    <div>
        <hero-section title="회원 가입"></hero-section>
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

                <!-- 비밀번호 입력 -->
                <b-form-group label-cols-lg="3" label="Password" label-for="userPassword">
                    <b-form-input
                        id="userPassword"
                        v-model="form.user_password"
                        type="password"
                        @input="offValidationErrorMsg"
                    >
                    </b-form-input>
                    <div
                        v-show="showValidationErrorMsg && !this.$v.form.user_password.required"
                        class="dc-error-msg"
                    >
                        비밀번호를 입력해주세요.
                    </div>
                </b-form-group>

                <!-- 비밀번호 확인 -->
                <b-form-group
                    label-cols-lg="3"
                    label="Confirm Password"
                    label-for="confirmPassword"
                >
                    <b-form-input
                        id="confirmPassword"
                        v-model="confirm_password"
                        type="password"
                        @input="offValidationErrorMsg"
                    >
                    </b-form-input>
                    <div
                        v-show="showValidationErrorMsg && !this.$v.confirm_password.required"
                        class="dc-error-msg"
                    >
                        비밀번호를 확인해주세요.
                    </div>
                    <div
                        v-show="showValidationErrorMsg && !this.$v.confirm_password.sameAsPassword"
                        class="dc-error-msg"
                    >
                        입력한 비밀번호와 같지 않습니다. 확인 후 다시 입력해주세요.
                    </div>
                </b-form-group>
                <div class="text-center">
                    <b-button type="submit" variant="primary">Register!</b-button>
                </div>
            </b-form>
        </b-container>

        <div>
            {{ form }}
            confirm : {{ confirm_password }}
        </div>
    </div>
</template>

<script>
import HeroSection from "@/components/HeroSection.vue";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { sameAs } from "@/util/validator.js";

export default {
    mixins: [validationMixin],
    name: "RegisterView",
    components: {
        HeroSection,
    },
    data() {
        return {
            message: "",
            form: {
                user_id: "",
                user_name: "",
                user_password: "",
                email_id: "",
                email_domain: "",
            },
            confirm_password: "",
            domains: ["naver.com", "ssafy.com", "google.com"],
            showValidationErrorMsg: false,
        };
    },
    validations() {
        return {
            form: {
                user_id: { required },
                user_name: { required },
                user_password: { required },
                email_id: { required },
                email_domain: { required },
            },
            confirm_password: {
                required,
                sameAsPassword: sameAs(this.form.user_password, this.user_password),
            },
        };
    },
    created() {},
    methods: {
        onSubmit() {
            this.$v.$touch();
            this.$v.confirm_password.$touch();
            this.showValidationErrorMsg = true;
            console.log(this.$v);
            if (this.$v.$invalid) {
                return;
            }
            console.log(this.form);
        },
        offValidationErrorMsg() {
            this.showValidationErrorMsg = false;
        },
    },
};
</script>

<style scoped></style>
