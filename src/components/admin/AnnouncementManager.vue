<template>
    <div>
        <hero-section :title="this.$route.params.heroTitle"></hero-section>
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
                @row-clicked="showDetail"
            >
                <template #cell(No)="row">
                    {{ row.index + 1 }}
                </template>
                <template #cell(edit)="row">
                    <b-button
                        variant="transparent"
                        @click="editAnnouncement(row)"
                    >
                        <i class="fa-regular fa-pen-to-square"></i>
                    </b-button>
                </template>

                <template #cell(delete)="row">
                    <b-button
                        variant="transparent"
                        @click="deleteAnnouncement(row)"
                    >
                        <i class="fa-solid fa-trash"></i>
                    </b-button>
                </template>
            </b-table>
            <b-pagination
                v-model="currentPage"
                :total-rows="announcements.length"
                :per-page="perPage"
                align="center"
                class="my-3"
            ></b-pagination>
            <div v-show="isAdmin" class="dc-form-btn-container">
                <b-button variant="primary" @click="addAnouncement"
                    >공지사항 등록</b-button
                >
            </div>
        </b-container>
        <!-- <div>isAdmin : {{ isAdmin }}</div> -->
    </div>
</template>

<script>
import HeroSection from "@/components/HeroSection.vue";
import {
    findAllAnouncements,
    deleteAnnouncementById,
} from "@/api/announcement";

export default {
    name: "AnnouncementManager",
    components: {
        HeroSection,
    },
    computed: {
        filteredFields() {
            return this.fields.filter(
                (field) =>
                    field.key !== "No" &&
                    field.key !== "register_time" &&
                    field.key !== "hit" &&
                    field.key !== "edit" &&
                    field.key !== "delete"
            );
        },
    },
    data() {
        return {
            isAdmin: false,
            fields: [
                { key: "No", label: "No" },
                { key: "subject", label: "제목" },
                { key: "user_id", label: "아이디" },
                { key: "register_time", label: "등록일" },
                { key: "hit", label: "조회수" },
            ],
            announcements: [],
            deleteConfirm: null,
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
        this.isAdmin = this.$route.params.isAdmin;
        if (this.isAdmin) {
            this.fields.push("edit");
            this.fields.push("delete");
        }
        findAllAnouncements(
            ({ data }) => {
                this.announcements = data;
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
                this.filteredItems = this.announcements;
                return;
            }

            const filtered = this.announcements.filter((item) =>
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
        deleteAnnouncement(row) {
            console.log(row);
            this.$bvModal
                .msgBoxConfirm("Are you sure?")
                .then((value) => {
                    this.deleteConfirm = value;
                    if (this.deleteConfirm) {
                        this.requestDelete(row.item.article_no);
                        this.announcements.splice(row.index, 1);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        requestDelete(id) {
            deleteAnnouncementById(
                id,
                (response) => {
                    console.log(response);
                },
                (error) => {
                    console.log(error);
                }
            );
        },

        editAnnouncement(row) {
            this.$router.push({
                name: "AnnouncementForm",
                params: {
                    heroTitle: "공지사항 수정",
                    articleNo: row.item.article_no,
                    modify: true,
                },
            });
        },

        addAnouncement() {
            // 글 등록 페이지로 이동
            console.log("공지사항 등록");
            this.$router.push({
                name: "AnnouncementForm",
                params: {
                    heroTitle: "공지사항 등록",
                    modify: false,
                },
            });
        },

        showDetail(item) {
            console.log(item);
            this.$router.push({
                name: this.isAdmin
                    ? "AnnouncementDetailForAdmin"
                    : "AnnouncementDetail",
                params: {
                    article_no: item.article_no,
                    viewCountUpdate: !this.isAdmin,
                },
            });
        },
    },
};
</script>

<style scoped></style>
