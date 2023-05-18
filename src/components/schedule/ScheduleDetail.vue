<template>
    <div class="hello">
        <div class="hero hero-inner">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-6 mx-auto text-center">
                        <div class="intro-wrap">
                            <h1 class="mb-0">상세 계획</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <table class="table table-bordered" id="user-schedule">
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
        <table style="margin-top: 40px;">
            <thead>
                <td colspan="2" style="text-align: center; font-size: x-large;">장소</td>
            </thead>
            <tbody>
                <template v-for="(attraction, index) in attractions" >
                    <schedule-attraction
                        :attraction = "attraction"
                        :index = "index"
                        :key = "attraction.contentId"
                    >
                    </schedule-attraction>
                </template>
            </tbody>
        </table>
    </div>
</template>

<script>
import { apiInstance } from '@/api/http';
import ScheduleAttraction from '@/components/schedule/ScheduleAttraction.vue';

const api = apiInstance();

// import Vue from "vue";
// Vue.prototype.$EventBus = new Vue();

export default {
    name: "ScheduleDetail",
    components: {
        ScheduleAttraction,
    },
    data() {
        return {
            article: {},
            attractions: {},
        };
    },
    created() {
        let schedule_id = this.$route.params.schedule_id;

        api.get(`/plan/detail/${schedule_id}`)
            .then(({ data }) => {
                console.log(data);
                this.article = data;
                this.attractions = data.attractions;
            })
            .catch((error) => {
                console.log(error);
            });
    },
};
</script>

<style>
</style>
