<template>
    <div>
        <div class="hero hero-inner">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-6 mx-auto text-center">
                        <div class="intro-wrap">
                            <h1 class="mb-0">리뷰 게시판</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="untree_co-section">
            <div class="container my-5">
                <div class="row justify-content-center">
                    <div class="col-sm-10">
                        <div class="row mb-5">
                            <div class="table-responsive" style="width: 100%">
                                <h1>글목록</h1>

                                <form
                                    class="d-flex"
                                    id="form-search"
                                    action="${root}/board"
                                    method="post"
                                >
                                    <input
                                        type="hidden"
                                        name="action"
                                        value="filter"
                                    />
                                    <select
                                        name="key"
                                        id="key"
                                        class="form-select form-select-sm ms-5 me-1 w-50"
                                        aria-label="검색조건"
                                    >
                                        <option selected>검색조건</option>
                                        <option value="subject">장소</option>
                                        <option value="user_id">작성자</option>
                                        <option value="content">글내용</option>
                                    </select>
                                    <div class="input-group input-group-sm">
                                        <input
                                            type="text"
                                            name="word"
                                            id="word"
                                            class="form-control"
                                            placeholder="검색어..."
                                        />
                                        <input type="submit" value="검색" />
                                    </div>
                                </form>
                                <br />

                                <table
                                    class="table table-bordered"
                                    id="myPlanList"
                                >
                                    <tbody>
                                        <col width="10%" />
                                        <col width="50%" />
                                        <col width="20%" />
                                        <col width="20%" />
                                        <tr>
                                            <th>번호</th>
                                            <th>장소 이름</th>
                                            <th>리뷰 내용</th>
                                            <th>등록일</th>
                                        </tr>
                                        <template
                                            v-for="(article, index) in articles"
                                        >
                                            <review-article
                                                :article="article"
                                                :index="index"
                                                :key="article.review_id"
                                            ></review-article>
                                        </template>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ReviewArticle from '@/components/ReviewArticle.vue';
import http from '@/api/http';

export default {
    name: "ReviewList",
    components: {
        ReviewArticle,
    },
    data() {
        return {
            articles: [],
        };
    },
    created() {
        this.reviewList();
    },
    methods: {
        reviewList() {
            http.get(`/place/reviewlist`)
                .then(({ data }) => {
                    console.log(data);
                    this.articles = data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
};
</script>