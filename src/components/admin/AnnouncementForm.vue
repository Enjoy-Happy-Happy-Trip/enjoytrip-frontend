<template>
    <div>
        <hero-section :title="heroTitle"></hero-section>
        <b-container class="dc-container">
            <b-form @submit.prevent="onSubmit">
                <b-row v-show="modify">
                    <b-col cols="3">articleNo</b-col>
                    <b-col>{{ form.article_no }}</b-col>
                </b-row>

                <!-- 제목 -->
                <b-form-group
                    label-cols-lg="3"
                    label="subject"
                    label-for="subject"
                >
                    <b-form-input
                        id="subject"
                        v-model="form.subject"
                        type="text"
                        @input="offValidationErrorMsg"
                    >
                    </b-form-input>
                    <div
                        v-show="
                            showValidationErrorMsg &&
                            !this.$v.form.subject.required
                        "
                        class="dc-error-msg"
                    >
                        제목을 입력해주세요.
                    </div>
                </b-form-group>

                <!-- 내용 -->
                <!-- 등록할 plan description -->
                <b-form-group
                    label-cols-lg="3"
                    label="content"
                    label-for="content"
                >
                    <b-form-textarea
                        id="content"
                        v-model="form.content"
                        rows="3"
                        max-rows="10"
                        @input="offValidationErrorMsg"
                    ></b-form-textarea>
                    <div
                        v-show="
                            showValidationErrorMsg &&
                            !this.$v.form.content.required
                        "
                        class="dc-error-msg"
                    >
                        여행에 대한 설명을 적어주세요.
                    </div>
                </b-form-group>
                <div class="dc-form-btn-container">
                    <b-button type="submit" variant="primary" class="mx-2">{{
                        modify ? "수정하기" : "등록하기"
                    }}</b-button>
                    <b-button
                        variant="danger"
                        @click="modifyCancel"
                        class="mx-2"
                        >취소</b-button
                    >
                </div>
            </b-form>
        </b-container>
    </div>
</template>

<script>
import HeroSection from "@/components/HeroSection.vue";
import { findAnnouncementById } from "@/api/announcement.js";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { addAnnouncement, modifyAnnouncementById } from "@/api/announcement.js";
import { mapState } from "vuex";

export default {
    mixins: [validationMixin],
    name: "AnnouncementForm",
    components: {
        HeroSection,
    },
    data() {
        return {
            heroTitle: "",
            modify: false,
            form: {
                article_no: null,
                subject: "",
                content: "",
            },
            showValidationErrorMsg: false,
            announcementManagerRoutingInfo: {
                name: "AnnouncementManager",
                params: {
                    isAdmin: true,
                    heroTitle: "공지사항 관리",
                },
            },
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
    computed: {
        ...mapState("memberStore", ["userInfo"]),
    },
    created() {
        this.heroTitle = this.$route.params.heroTitle;
        this.form.article_no = this.$route.params.articleNo;
        this.modify = this.$route.params.modify;

        if (this.modify) {
            findAnnouncementById(
                this.form.article_no,
                !this.modify,
                ({ data }) => {
                    this.form.subject = data.subject;
                    this.form.content = data.content;
                },
                (error) => {
                    console.log(error);
                }
            );
        }
    },
    methods: {
        onSubmit() {
            this.showValidationErrorMsg = true;
            this.$v.$touch();
            if (this.$v.$invalid) {
                return;
            }

            if (this.modify) {
                // 공지사항 수정 페이지라면
                modifyAnnouncementById(
                    this.form,
                    (response) => {
                        this.$router.push(this.announcementManagerRoutingInfo);
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            } else {
                // 공지사항 등록 페이지라면
                this.form["user_id"] = this.userInfo.user_id;
                addAnnouncement(
                    this.form,
                    (response) => {
                        this.$router.push(this.announcementManagerRoutingInfo);
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            }
        },
        modifyCancel() {
            this.$router.push(this.announcementManagerRoutingInfo);
        },
        offValidationErrorMsg() {
            this.showValidationErrorMsg = false;
        },
    },
};
</script>

<style scoped></style>
