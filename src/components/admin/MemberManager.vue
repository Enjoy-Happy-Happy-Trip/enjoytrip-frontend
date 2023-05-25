<template>
    <div>
        <hero-section title="회원 관리"></hero-section>
        <b-container class="dc-container">
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
            >
                <template #cell(No)="row">
                    {{ row.index + 1 }}
                </template>
                <template #cell(email)="row">
                    {{ row.item.email_id }}@{{ row.item.email_domain }}
                </template>
                <template #cell(delete)="row">
                    <b-button variant="transparent" @click="deleteUser(row)">
                        <i class="fa-solid fa-user-minus"></i>
                    </b-button>
                </template>
            </b-table>
            <b-pagination
                v-model="currentPage"
                :total-rows="users.length"
                :per-page="perPage"
                align="center"
                class="my-3"
            ></b-pagination>
        </b-container>
    </div>
</template>

<script>
import HeroSection from "@/components/HeroSection.vue";
import { findAllUsers, deleteUserById } from "@/api/member.js";

export default {
    name: "MemberManager",
    components: {
        HeroSection,
    },
    computed: {
        filteredFields() {
            return this.fields.filter(
                (field) =>
                    field.key !== "No" &&
                    field.key !== "join_date" &&
                    field.key !== "delete"
            );
        },
    },
    data() {
        return {
            users: [],
            fields: [
                { key: "No", label: "No"},
                { key: "user_id", label: "아이디"},
                { key: "user_name", label: "이름"},
                { key: "email", label: "이메일"},
                { key: "join_date", label: "가입일", sortable: true},
                { key: "delete", label: "탈퇴"},
            ],
            article_index: 1,
            perPage: 10, // Number of items per page
            currentPage: 1, // Current page
            totalRows: 0, // Total number of rows
            sortBy: "", // Sort column
            sortDesc: false, // Sort order (ascending or descending)
            filteredItems: [],
            searchQuery: "",
            selectedField: "",
        };
    },
    created() {
        findAllUsers(
            ({ data }) => {
                this.users = data;
                this.filteredItems = data;
            },
            (error) => {
                console.log(error);
            }
        );
    },
    methods: {
        searchKeyword() {
            if (!this.selectedField || !this.searchQuery) {
                this.filteredItems = this.users;
                return;
            }

            const filtered = this.users.filter((item) =>
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
        resetSearchQuery() {
            this.searchQuery = "";
        },
        deleteUser(row) {
            this.$bvModal
                .msgBoxConfirm(`${row.item.user_id} 사용자를 삭제하시겠습니까?`)
                .then((value) => {
                    this.deleteConfirm = value;
                    if (this.deleteConfirm) {
                        this.requestDelete(row.item.user_id);
                        this.users.splice(row.index, 1);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        requestDelete(id) {
            deleteUserById(
                id,
                (response) => {},
                (error) => {
                    console.log(error);
                }
            );
        },
    },
};
</script>

<style scoped></style>
