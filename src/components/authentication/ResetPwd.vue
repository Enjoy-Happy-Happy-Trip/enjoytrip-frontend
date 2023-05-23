<template>
    <div>
        <hero-section title="비밀번호 변경하기"></hero-section>
        <b-container class="dc-container">
            <b-form @submit.prevent="onSubmit">
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
                    <b-button type="submit" variant="primary">비밀전호 재설정</b-button>
                </div>
            </b-form>
        </b-container>
        <div>재설정 할 아이디 : {{ form.user_id }}</div>
    </div>
</template>

<script>
import HeroSection from "@/components/HeroSection.vue";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { sameAs } from "@/util/validator.js";
import { resetUserPwd } from "@/api/member.js";

export default {
    mixins: [validationMixin],
    name: "ResetPwd",
    components: {
        HeroSection,
    },
    data() {
        return {
            user_id: "",
            form: {
                user_id: "",
                user_password: "",
            },
            confirm_password: "",
            showValidationErrorMsg: false,
        };
    },
    validations() {
        return {
            form: {
                user_password: { required },
            },
            confirm_password: { required, sameAsPassword: sameAs(this.form.user_password) },
        };
    },
    created() {
        this.form.user_id = this.$route.params.userId;
    },
    mounted() {},

    methods: {
        onSubmit() {
            this.$v.$touch();
            this.showValidationErrorMsg = true;
            if (this.$v.$invalid) {
                return;
            }
            resetUserPwd(
                this.form,
                (response) => {
                    console.log(response);
                    this.$router.push({ name: "Login" });
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
