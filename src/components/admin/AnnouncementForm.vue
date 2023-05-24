<template>
    <div>
        <hero-section title="공지사항 수정"></hero-section>
        <b-container class="dc-container">
            <b-form @submit.prevent="onSubmit">
                <b-row>
                    <b-col cols="3">articleNo</b-col>
                    <b-col>{{ form.article_no }}</b-col>
                </b-row>

                <!-- 제목 -->
                <b-form-group label-cols-lg="3" label="subject" label-for="subject">
                    <b-form-input
                        id="subject"
                        v-model="form.subject"
                        type="text"
                        @input="offValidationErrorMsg"
                    >
                    </b-form-input>
                    <div
                        v-show="showValidationErrorMsg && !this.$v.form.subject.required"
                        class="dc-error-msg"
                    >
                        제목을 입력해주세요.
                    </div>
                </b-form-group>

                <!-- 내용 -->
                <!-- 등록할 plan description -->
                <b-form-group label-cols-lg="3" label="content" label-for="content">
                    <b-form-textarea
                        id="content"
                        v-model="form.content"
                        rows="3"
                        max-rows="10"
                        @input="offValidationErrorMsg"
                    ></b-form-textarea>
                    <div
                        v-show="showValidationErrorMsg && !this.$v.form.content.required"
                        class="dc-error-msg"
                    >
                        여행에 대한 설명을 적어주세요.
                    </div>
                </b-form-group>
                <div class="dc-form-btn-container">
                    <b-button type="submit" variant="primary" class="mx-2">수정하기</b-button>
                    <b-button variant="danger" @click="modifyCancel" class="mx-2">취소</b-button>
                </div>
            </b-form>
        </b-container>

        <div>수정할 공지사항 번호 : {{ form.article_no }}</div>
        <div>{{ this.form }}</div>
    </div>
</template>

<script>
import HeroSection from "@/components/HeroSection.vue";
import { findAnnoncementById } from "@/api/announcement.js";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { modifyAnnouncementById } from "@/api/announcement.js";

export default {
    mixins: [validationMixin],
    name: "AnnouncementForm",
    components: {
        HeroSection,
    },
    data() {
        return {
            form: {
                article_no: null,
                subject: "",
                content: "",
            },
            showValidationErrorMsg: false,
        };
    },
    validations() {
        return {
            form: {
                subject: { required },
                content: { required },
            },
        };
    },
    created() {
        this.form.article_no = this.$route.params.articleNo;
        findAnnoncementById(
            this.form.article_no,
            ({ data }) => {
                this.form.subject = data.subject;
                this.form.content = data.content;
            },
            (error) => {
                console.log("modify announcement error!");
                console.log(error);
            }
        );
    },
    methods: {
        onSubmit() {
            this.showValidationErrorMsg = true;
            this.$v.$touch();
            if (this.$v.$invalid) {
                console.log("Fail Validations!");
                return;
            }
            console.log("Pass Validations!");

            modifyAnnouncementById(
                this.form,
                (response) => {
                    console.log(response);
                    this.$router.push({ name: "AnnouncementManager" });
                },
                (error) => {
                    console.log(error);
                }
            );
        },
        modifyCancel() {
            this.$router.push({ name: "AnnouncementManager" });
        },
        offValidationErrorMsg() {
            this.showValidationErrorMsg = false;
        },
    },
};
</script>

<style scoped></style>
