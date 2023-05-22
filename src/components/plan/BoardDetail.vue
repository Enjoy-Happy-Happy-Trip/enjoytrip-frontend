<template>
    <div class="hello">
        <div class="hero hero-inner">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-6 mx-auto text-center">
                        <div class="intro-wrap">
                            <h1 class="mb-0">게시물 상세보기</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <table class="table table-bordered" id="user-schedule">
            <tr>
                <th>작성자</th>
                <td>{{ article.user_id }}</td>
            </tr>
            <tr>
                <th>제목</th>
                <td>{{ article.subject }}</td>
            </tr>
            <tr>
                <th>글 내용</th>
                <td>{{ article.content }}</td>
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
    name: "BoardDetail",
    components: {},
    data() {
        return {
            article: {},
        };
    },
    created() {
        let article_no = this.$route.params.article_no;

        api.get(`/board/detail/${article_no}`)
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
