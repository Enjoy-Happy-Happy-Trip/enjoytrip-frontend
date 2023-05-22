<template>
    <div>
        <hero-section title="내 여행 계획"></hero-section>

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
                                <my-schedule :articles="articles"></my-schedule>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MySchedule from "./MySchedule.vue";
import HeroSection from "@/components/HeroSection.vue";
import { apiInstance } from "@/api/http";
import { mapState, mapGetters } from "vuex";

const api = apiInstance();
const memberStore = "memberStore";

export default {
    name: "ScheduleList",
    components: {
        MySchedule,
        HeroSection,
    },
    computed: {
        ...mapState(memberStore, ["isLogin", "userInfo"]),
        ...mapGetters(["checkUserInfo"]),
    },
    data() {
        return {
            articles: [],
        };
    },
    created() {
        this.planList(this.userInfo.user_id);
    },
    methods: {
        planList(user_id) {
            api.get(`/plan/getmyplan/${user_id}`)
                .then(({ data }) => {
                    this.articles = data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
};
</script>
