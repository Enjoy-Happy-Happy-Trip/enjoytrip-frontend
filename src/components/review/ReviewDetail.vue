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
        <b-container class="dc-container">
            <div class="review-container">
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
                <div class="button-container">
                    <b-button v-show="this.userInfo.user_id === article.user_id"
                        class="delButton"
                        variant="danger"
                        @click="deleteReview()"
                        >삭제</b-button
                    >
                </div>
            </div>
        </b-container>
    </div>
</template>

<script>
import { apiInstance } from "@/api/http";
import { mapState, mapGetters } from "vuex";

const memberStore = "memberStore";
const api = apiInstance();

export default {
    name: "ReviewDetail",
    components: {},
    computed: {
        ...mapState(memberStore, ["isLogin", "userInfo"]),
        ...mapGetters(["checkUserInfo"]),
    },
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
    methods: {
        deleteReview() {
            api.delete(`/place/${this.article.review_id}/${this.article.content_id}`)
                .then(() => {
                    alert("리뷰 삭제 완료!!");
                    this.$router.push(`/review`);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }
};
</script>

<style>
.review-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
}

.button-container {
  margin-top: auto;
  align-self: flex-end;
  position: sticky;
  bottom: 20px;
  z-index: 1;
}

.delButton {
  margin-left: auto;
}
</style>
