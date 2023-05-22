<template>
    <div>
        <b-input-group class="mb-3">
            <b-form-select v-model="selectedField">
                <option value="" disabled selected>검색 조건</option>
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
            @row-clicked="showReview"
        >
            <template #cell(index)="row">{{
                (currentPage - 1) * 10 + row.index + 1
            }}</template>
            <template #cell(user_id)="row">
                {{ row.item.user_id }}
            </template>
            <template #cell(title)="row">
                {{ row.item.title }}
            </template>
            <template #cell(user_review)="row">
                {{ row.item.user_review }}
            </template>
            <template #cell(register_time)="row">
                {{ row.item.register_time | showRegTime }}
            </template>
        </b-table>
        <b-pagination
            v-model="currentPage"
            :total-rows="articles.length"
            :per-page="perPage"
            align="center"
            class="my-3"
        ></b-pagination>
    </div>
</template>

<script>
import { apiInstance } from "@/api/http";

const api = apiInstance();

export default {
    name: "ReviewArticle",
    data() {
        return {
            articles: [],
            searchQuery: "",
            selectedField: "",
            fields: [
                { key: "index", label: "No" },
                { key: "user_id", label: "작성자" },
                { key: "title", label: "장소 이름" },
                { key: "user_review", label: "리뷰 내용" },
                { key: "register_time", label: "등록일", sortable: true },
            ],
            article_index: 1,
            perPage: 10,
            currentPage: 1,
            totalRows: 0,
            sortBy: "",
            sortDesc: false,
            filteredItems: [],
        };
    },
    created() {
        api.get(`/place/reviewlist`)
            .then(({ data }) => {
                this.articles = data;
                this.filteredItems = this.articles;
            })
            .catch((error) => {
                console.log(error);
            });      
    },
    computed: {
        filteredFields() {
            return this.fields.filter(
                (field) =>
                    field.key !== "index" && field.key !== "register_time"
            );
        },
    },
    methods: {
        showReview(item) {
            this.$router.push(`/review/detail/${item.review_id}`);
        },
        searchKeyword() {
            if (!this.selectedField || !this.searchQuery) {
                this.filteredItems = this.articles;
                return;
            }

            const filtered = this.articles.filter((item) =>
                String(item[this.selectedField])
                    .toLowerCase()
                    .includes(this.searchQuery.toLowerCase())
            );

            this.filteredItems = filtered;
        },
    },
    filters: {
        showRegTime(val) {
            return (val + "").substring(0, 10) + "";
        },
    },
};
</script>
