<template>
    <div>
        <hero-section title="공지사항 상세보기"></hero-section>
        <b-container class="dc-container">
            <p class="text-start thinner">No. {{ announcement.article_no }}</p>
            <h1>{{ announcement.subject }}</h1>
            <hr />
            <b-row class="thinner">
                <b-col class="text-start">작성자 : {{ announcement.user_id }}</b-col>
                <b-col class="text-end">{{ announcement.register_time }}</b-col>
            </b-row>
            <p class="text-end thinner">조회수 : {{ announcement.hit }}</p>
            <hr />
            <!-- 공지사항 내용 -->
            <p class="content">
                {{ announcement.content }}
            </p>
            <!-- <div>detail article no : {{ article_no }}</div> -->
        </b-container>
    </div>
</template>

<script>
import HeroSection from "@/components/HeroSection.vue";
import { findAnnoncementById } from "@/api/announcement.js";

export default {
    name: "AnnouncementDetail",
    components: {
        HeroSection,
    },
    data() {
        return {
            article_no: null,
            announcement: {},
            viewCountUpdate: false,
        };
    },
    created() {
        this.article_no = this.$route.params.article_no;
        findAnnoncementById(
            this.article_no,
            this.viewCountUpdate,
            ({ data }) => {
                this.announcement = data;
            },
            (error) => {
                console.log(error);
            }
        );
    },
    methods: {},
};
</script>

<style scoped>
.thinner {
    font-size: 0.9em;
}
.content {
    font-size: 1.5em;
}
</style>
