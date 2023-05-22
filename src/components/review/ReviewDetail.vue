<template>
    <div class="hello">
        <div class="hero hero-inner">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-6 mx-auto text-center">
                        <div class="intro-wrap">
                            <h1 class="mb-0">상세 리뷰</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <table class="table table-bordered" id="user-schedule">
            <tr>
                <th>리뷰번호</th>
                <td>{{ article.review_id }}</td>
            </tr>
            <tr>
                <th>작성자</th>
                <td>{{ article.user_id }}</td>
            </tr>
            <tr>
                <th>장소 이름</th>
                <td>{{ article.title }}</td>
            </tr>
            <tr>
                <th>리뷰 내용</th>
                <td>{{ article.user_review }}</td>
            </tr>
            <tr>
                <th>등록일</th>
                <td>{{ article.register_time }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
import { apiInstance } from '@/api/http';

const api = apiInstance();

// import Vue from "vue";
// Vue.prototype.$EventBus = new Vue();

export default {
    name: "ReviewDetail",
    components: {},
    data() {
        return {
            article: {},
        };
    },
    created() {
        let review_id = this.$route.params.review_id;

        api.get(`/place/detail/${review_id}`)
            .then(({ data }) => {
                this.article = data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
};
</script>

<style></style>
