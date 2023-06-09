<template>
    <div>
        <hero-section :title="routedParams.heroTitle"></hero-section>
        <b-container class="dc-container">
            <b-form @submit.prevent="onSubmit">
                <!-- 아이디 입력 -->
                <b-form-group label-cols-lg="3" label="ID" label-for="userID">
                    <b-input-group>
                        <b-form-input
                            id="userID"
                            v-model="form.user_id"
                            type="text"
                            :disabled="routedParams.modify"
                            @input="offIdValidationErrorMsg"
                        >
                        </b-form-input>
                        <template v-if="!routedParams.modify" #append>
                            <b-button @click="checkNewId" variant="success"
                                >Check</b-button
                            >
                        </template>
                    </b-input-group>
                    <div
                        v-show="
                            !routedParams.modify &&
                            (showValidationErrorMsg ||
                                showDuplicateCheckInfo) &&
                            !this.$v.form.user_id.required
                        "
                        class="dc-error-msg"
                    >
                        아이디를 입력해주세요.
                    </div>
                    <div
                        v-show="
                            showDuplicateCheckInfo &&
                            this.$v.form.user_id.required
                        "
                        :class="isUniqueId ? 'dc-success-msg' : 'dc-error-msg'"
                    >
                        {{
                            isUniqueId
                                ? "사용 가능한 ID 입니다."
                                : "사용할 수 없는 ID입니다."
                        }}
                    </div>
                </b-form-group>

                <!-- 이름 입력 -->
                <b-form-group
                    label-cols-lg="3"
                    label="Name"
                    label-for="userName"
                >
                    <b-form-input
                        id="userName"
                        v-model="form.user_name"
                        type="text"
                        @input="offValidationErrorMsg"
                    >
                    </b-form-input>
                    <div
                        v-show="
                            showValidationErrorMsg &&
                            !this.$v.form.user_name.required
                        "
                        class="dc-error-msg"
                    >
                        이름을 입력해주세요.
                    </div>
                </b-form-group>

                <!-- 이메일 입력 -->
                <b-form-group
                    label-cols-lg="3"
                    label="Email"
                    label-for="userEmail"
                >
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
                        v-show="
                            showValidationErrorMsg &&
                            !this.$v.form.email_id.required
                        "
                        class="dc-error-msg"
                    >
                        이메일 아이디를 입력해주세요.
                    </div>
                    <div
                        v-show="
                            showValidationErrorMsg &&
                            !this.$v.form.email_domain.required
                        "
                        class="dc-error-msg"
                    >
                        도메인을 골라주세요.
                    </div>
                </b-form-group>

                <!-- 비밀번호 입력 -->
                <b-form-group
                    label-cols-lg="3"
                    label="Password"
                    label-for="userPassword"
                >
                    <b-form-input
                        id="userPassword"
                        v-model="form.user_password"
                        type="password"
                        @input="offValidationErrorMsg"
                    >
                    </b-form-input>
                    <div
                        v-show="
                            showValidationErrorMsg &&
                            !this.$v.form.user_password.required
                        "
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
                        v-show="
                            showValidationErrorMsg &&
                            !this.$v.confirm_password.required
                        "
                        class="dc-error-msg"
                    >
                        비밀번호를 확인해주세요.
                    </div>
                    <div
                        v-show="
                            showValidationErrorMsg &&
                            !this.$v.confirm_password.sameAsPassword
                        "
                        class="dc-error-msg"
                    >
                        입력한 비밀번호와 같지 않습니다. 확인 후 다시
                        입력해주세요.
                    </div>
                </b-form-group>
                <div v-show="!routedParams.modify" class="text-center">
                    <b-button type="submit" variant="primary"
                        >Register</b-button
                    >
                </div>
                <div v-show="routedParams.modify" class="text-center">
                    <b-button @click="modifyMyInfo" variant="primary"
                        >수정하기</b-button
                    >
                </div>
            </b-form>
        </b-container>
    </div>
</template>

<script>
import HeroSection from "@/components/HeroSection.vue";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { sameAs } from "@/util/validator.js";
import {
    findByIdWithoutToken,
    register,
    checkDuplicateId,
    updateUserById,
} from "@/api/member.js";
import { mapState } from "vuex";

export default {
    mixins: [validationMixin],
    name: "RegisterMember",
    components: {
        HeroSection,
    },
    data() {
        return {
            routedParams: {
                heroTitle: "",
                modify: false,
            },
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
            showDuplicateCheckInfo: false,
            isUniqueId: false,
        };
    },
    computed: {
        ...mapState("memberStore", ["userInfo"]),
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
                sameAsPassword: sameAs(
                    this.form.user_password,
                    this.user_password
                ),
            },
        };
    },
    created() {
        // console.log(this.userInfo);
        this.routedParams.modify = this.$route.params.modify;
        this.routedParams.heroTitle = this.$route.params.heroTitle;
        // console.log(this.modify);
        if (this.routedParams.modify) {
            findByIdWithoutToken(
                this.userInfo.user_id,
                ({ data }) => {
                    // console.log(data);
                    this.form.user_id = data.user_id;
                    this.form.user_name = data.user_name;
                    this.form.email_id = data.email_id;
                    this.form.email_domain = data.email_domain;

                    this.isUniqueId = true;
                },
                (error) => {
                    console.log(error);
                }
            );
        }
    },
    methods: {
        onSubmit() {
            this.$v.$touch();
            this.$v.confirm_password.$touch();
            this.showValidationErrorMsg = true;
            if (this.$v.$invalid) {
                return;
            }
            if (!this.isUniqueId) {
                alert("ID 중복 검사를 통과해 주세요!");
                return;
            }
            register(
                this.form,
                (response) => {
                    alert("회원이 되신걸 진심으로 환영합니다!");
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
        offIdValidationErrorMsg() {
            this.isUniqueId = false; // id 변화 감지하면 중복검사 여부 false
            this.offValidationErrorMsg();
            this.showDuplicateCheckInfo = false;
        },
        checkNewId() {
            this.showDuplicateCheckInfo = true;
            if (this.$v.form.user_id.$invalid) {
                return;
            }
            checkDuplicateId(
                this.form.user_id,
                ({ data }) => {
                    this.isUniqueId = data;
                },
                (error) => {
                    console.log(error);
                }
            );
        },
        modifyMyInfo() {
            this.showValidationErrorMsg = true;
            this.$v.form.$touch();
            this.$v.confirm_password.$touch();
            if (this.$v.form.$invalid || this.$v.confirm_password.$invalid) {
                return;
            }
            // alert("success validation!");
            updateUserById(
                this.form,
                (response) => {
                    console.log(response);
                    this.$store.commit(
                        "memberStore/SET_USER_NAME",
                        this.form.user_name
                    );
                    this.$store.commit(
                        "memberStore/SET_USER_EMAIL",
                        this.form.email_id,
                        this.form.email_domain
                    );
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

<style scoped></style>
