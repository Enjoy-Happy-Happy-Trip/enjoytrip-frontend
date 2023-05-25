<template>
    <div>
        <hero-section title="공유 게시판"></hero-section>
        <b-container class="dc-container">
            <!-- 검색 및 글쓰기 버튼이 들어갈 box -->
            <div>
                <b-button
                    v-show="this.userInfo && this.userInfo.user_id !== 'admin'"
                    class="button mb-3"
                    variant="outline-primary"
                    @click="gotoPlanShare"
                    >계획 공유하기</b-button
                >
            </div>
            <b-input-group class="mb-3">
                <b-form-select v-model="selectedField">
                    <option value="" disabled selected >검색 조건</option>
                    <option
                        v-for="field in filteredFields"
                        :key="field.key"
                        :value="field.key"
                    >
                        {{ field.label }}
                    </option>
                </b-form-select>
                <b-form-input
                    v-model="searchQuery"
                    placeholder="Search"
                    @keyup.enter="searchKeyword"
                ></b-form-input>
                <b-input-group-append>
                    <b-button @click="searchKeyword">검색</b-button>
                </b-input-group-append>
            </b-input-group>
            <b-table
                hover
                responsive
                :items="filteredItems"
                :fields="fields"
                :per-page="perPage"
                :current-page="currentPage"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                @filtered="onFiltered"
                @row-clicked="showDetail"
            ></b-table>
            <b-pagination
                v-model="currentPage"
                :total-rows="plans.length"
                :per-page="perPage"
                align="center"
                class="my-3"
            ></b-pagination>
        </b-container>
    </div>
</template>

<script>
import HeroSection from "@/components/HeroSection.vue";
import { mapState, mapGetters } from "vuex";
import { getAllPlans } from "@/api/plan.js";

const memberStore = "memberStore";

export default {
    name: "PlanList",
    components: {
        HeroSection,
    },
    data() {
        return {
            searchQuery: "",
            selectedField: "",
            message: "",
            fields: [
                { key: "planNo", label: "No" },
                { key: "user_id", label: "작성자" },
                { key: "plan_title", label: "계획 제목" },
            ],
            plans: [],
            article_index: 1,
            perPage: 10,
            currentPage: 1,
            totalRows: 0,
            sortBy: "",
            sortDesc: false,
            filteredItems: [],
        };
    },
    computed: {
        ...mapState(memberStore, ["isLogin", "userInfo"]),
        ...mapGetters(["checkUserInfo"]),
        filteredFields() {
            return this.fields.filter(
                (field) =>
                    field.key !== "planNo"
            );
        },
    },
    created() {
        getAllPlans(
            ({ data }) => {
                this.plans = data;
                this.filteredItems = data;
                this.addPlanNo(1); // 이후에 페이지마다 시작번호를 다르게 한다.
            },
            (error) => {
                console.log(error);
            }
        );
    },
    methods: {
        resetSearchQuery() {
            this.searchQuery = "";
        },
        addPlanNo(startNo) {
            for (let plan of this.plans) {
                plan.planNo = startNo++;
            }
        },
        showDetail(item) {
            this.$router.push(`/plan/detail/${item.plan_id}`);
        },
        gotoPlanShare() {
            this.$router.push(`/plan/share`);
        },
        searchKeyword() {
            if (!this.selectedField || !this.searchQuery) {
                this.filteredItems = this.plans;
                return;
            }

            const filtered = this.plans.filter((item) =>
                String(item[this.selectedField])
                    .toLowerCase()
                    .includes(this.searchQuery.toLowerCase())
            );

            this.filteredItems = filtered;
        },
        onFiltered(filteredItems) {
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        },
    },
};
</script>

<style scoped></style>
