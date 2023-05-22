<template>
    <div>
        <b-table
            hover
            responsive
            :items="articles"
            :fields="fields"
            :per-page="perPage"
            :current-page="currentPage"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            @filtered="onFiltered"
            @row-clicked="showPlan"
        >
            <template #cell(index)="row">{{
                (currentPage - 1) * 10 + row.index + 1
            }}</template>
            <template #cell(schedule_title)="row">
                {{ row.item.schedule_title }}
            </template>
            <template #cell(start_date)="row">
                {{ row.item.start_date }}
            </template>
            <template #cell(end_date)="row">
                {{ row.item.end_date }}
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
export default {
    name: "MySchedule",
    props: {
        articles: [],
    },
    data() {
        return {
            fields: [
                "index",
                { key: "index", label: "번호" },
                { key: "schedule_title", label: "제목", sortable: true },
                { key: "start_date", label: "시작일", sortable: true },
                { key: "end_date", label: "종료일", sortable: true },
            ], // Table column labels
            article_index: 1,
            perPage: 10, // Number of items per page
            currentPage: 1, // Current page
            totalRows: 0, // Total number of rows
            sortBy: "", // Sort column
            sortDesc: false, // Sort order (ascending or descending)
        };
    },
    methods: {
        showPlan(item) {
            this.$router.push(`/schedule/detail/${item.schedule_id}`);
        },
        onFiltered(filteredItems) {
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        },
    },
};
</script>
