<template>
    <tr>
        <td v-text="index + 1"></td>
        <td
            v-text="article.title"
            style="cursor: pointer"
            @click="showReview(article.review_id)"
        ></td>
        <td v-text="article.user_review"></td>
        <td>{{ article.register_time | showRegTime }}</td>
    </tr>
</template>

<script>
// import http from "@/api/http.js";
// import Vue from "vue";
// Vue.prototype.$EventBus = new Vue();

export default {
    name: "ReviewArticle",
    props: {
        article: {},
        index: Number,
    },
    methods: {
        showReview(review_id) {
            this.$router.push(`/review/detail/${review_id}`);
        },
    },
    filters: {
        showRegTime(val) {
            return (val+"").substring(0, 10) + "";
        },
    },
};
</script>
