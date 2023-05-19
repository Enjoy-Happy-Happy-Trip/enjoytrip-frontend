<template>
    <tr>
        <td v-text="index + 1"></td>
        <td v-text="article.plan_title" style="cursor: pointer;" @click="showPlan(article.schedule_id)"></td>
        <td v-text="article.start_date"></td>
        <td v-text="article.end_date"></td>
    </tr>
</template>

<script>
// import http from "@/api/http.js";
// import Vue from "vue";
// Vue.prototype.$EventBus = new Vue();

export default {
    name: "MySchedule",
    props: {
        article: {},
        index: Number,
    },
    methods: {
        showPlan(schedule_id) {
            this.$router.push(`/schedule/detail/${schedule_id}`);
        }
    }
};


</script>
