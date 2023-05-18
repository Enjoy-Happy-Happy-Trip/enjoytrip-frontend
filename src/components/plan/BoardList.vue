<template>
    <div>
        <div class="hero hero-inner">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-6 mx-auto text-center">
                        <div class="intro-wrap">
                            <h1 class="mb-0">자유 게시판</h1>
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
                                        <option value="subject">제목</option>
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
                                            <th>아이디</th>
                                            <th>제목</th>
                                            <th>등록일</th>
                                        </tr>
                                        <template
                                            v-for="(article, index) in articles"
                                        >
                                            <board-article
                                                :article="article"
                                                :index="index"
                                                :key="article.article_no"
                                            ></board-article>
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
import BoardArticle from '@/components/plan/BoardArticle.vue';
import { apiInstance } from '@/api/http';

const api = apiInstance();

export default {
    name: "BoardList",
    components: {
        BoardArticle,
    },
    data() {
        return {
            articles: [],
        };
    },
    created() {
        this.boardList();
    },
    methods: {
        boardList() {
            api.get(`/board/boardlist`)
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