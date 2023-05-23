<template>
    <div>
        <b-table
            hover
            responsive
            :items="articles"
            :fields="modifiedFields"
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
            <template #cell()="row">
                <b-button
                    v-if="option === 0"
                    variant="danger"
                    @click="deleteSchedule(row.item.plan_id)"
                    >삭제</b-button
                >
                <b-button
                    v-if="option === 1"
                    variant="info"
                    @click="showModal(row.item.plan_id)"
                    >공유</b-button
                >
            </template>
        </b-table>
        <b-pagination
            v-model="currentPage"
            :total-rows="articles.length"
            :per-page="perPage"
            align="center"
            class="my-3"
        ></b-pagination>

        <b-modal id="share-modal" title="여행 계획 공유하기">
                <schedule-share-modal :planId="modalPlanId" ref="shareModal"></schedule-share-modal>
                <template #modal-footer="{ cancel }">
                    <b-button size="sm" variant="danger" @click="cancel()">
                        취소
                    </b-button>
                    <b-button size="sm" variant="success" @click="shareSchedule">
                        등록
                    </b-button>
                </template>
            </b-modal>
    </div>
</template>

<script>
import { apiInstance } from "@/api/http";
import ScheduleShareModal from '@/components/schedule/ScheduleShareModal.vue';
import { savePlan } from "@/api/plan.js";
import { mapState } from "vuex";

const api = apiInstance();

export default {
    name: "MySchedule",
    components: {
        ScheduleShareModal,
    },
    props: {
        articles: [],
        option: Number,
    },
    computed: {
        ...mapState("memberStore", ["userInfo"]),
        modifiedFields() {
            if (this.option === 0) {
                return this.fields.concat({
                    key: "delete_button",
                    label: "삭제",
                });
            } else if (this.option === 1) {
                return this.fields.concat({
                    key: "share_button",
                    label: "공유",
                });
            } else {
                return this.fields;
            }
        },
    },
    data() {
        return {
            fields: [
                { key: "index", label: "No" },
                { key: "schedule_title", label: "제목" },
                { key: "start_date", label: "시작일", sortable: true },
                { key: "end_date", label: "종료일", sortable: true },
            ], // Table column labels
            article_index: 1,
            perPage: 10, // Number of items per page
            currentPage: 1, // Current page
            totalRows: 0, // Total number of rows
            sortBy: "", // Sort column
            sortDesc: false, // Sort order (ascending or descending)
            modalPlanId: 0,
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
        deleteSchedule(plan_id) {
            api.delete(`/plan/${plan_id}`)
                .then(() => {
                    window.location.reload();
                    alert("일정 삭제 성공!!");
                })
                .catch((error) => console.log(error));
        },
        showModal(plan_id) {
            this.modalPlanId = plan_id;
            this.$bvModal.show("share-modal");
        },
        shareSchedule() {
            const mySchedule = {
                plan_id: this.modalPlanId,
                plan_title: this.$refs.shareModal.getPlanTitle(),
                plan_desc: this.$refs.shareModal.getPlanDesc(),
                user_id: this.userInfo.user_id,
            };

            savePlan(
                mySchedule,
                (response) => {
                    this.$router.push({ name: "planList" });
                },
                (error) => {
                    console.log(error);
                }
            );
        }
    },
};
</script>

<style></style>
