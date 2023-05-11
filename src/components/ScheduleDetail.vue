<template>
    <table id="user-schedule">
        <tr>
            <th>번호</th>
            <td>{{ article.schedule_id }}</td>
        </tr>
        <tr>
            <th>작성자</th>
            <td>{{ article.user_id }}</td>
        </tr>
        <tr>
            <th>제목</th>
            <td>{{ article.plan_title }}</td>
        </tr>
        <tr>
            <th>시작일</th>
            <td>{{ article.start_date }}</td>
        </tr>
        <tr>
            <th>종료일</th>
            <td>{{ article.start_date }}</td>
        </tr>
    </table>
</template>

<script>
import http from "@/api/http.js";
// import Vue from "vue";
// Vue.prototype.$EventBus = new Vue();

export default {
    name: "ScheduleDetail",
    data() {
        return {
            article: {},
        };
    },
    created() {
        let schedule_id = this.$route.params.schedule_id;

        http.get(`/plan/detail/${schedule_id}`)
            .then(({ data }) => {
                console.log(data);
                this.article = data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
};
</script>
