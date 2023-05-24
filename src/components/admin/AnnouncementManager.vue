<template>
    <div>
        <hero-section title="공지사항 관리"></hero-section>
        <b-container class="dc-container">
            <b-table hover :items="announcements" :fields="fields">
                <template #cell(delete)="row">
                    <b-button
                        variant="transparent"
                        @click="deleteAnnouncement(row)"
                        class="delete-btn"
                    >
                        <img :src="require('@/assets/trashbin.jpg')" />
                    </b-button>
                </template>
            </b-table>
        </b-container>
    </div>
</template>

<script>
import HeroSection from "@/components/HeroSection.vue";
import { findAllAnouncements, deleteAnnouncementById } from "@/api/announcement";

export default {
    name: "AnnouncementManager",
    components: {
        HeroSection,
    },
    data() {
        return {
            fields: ["article_no", "subject", "user_id", "register_time", "hit", "delete"],
            announcements: [],
            deleteConfirm: null,
        };
    },
    created() {
        findAllAnouncements(
            ({ data }) => {
                console.log(data);
                this.announcements = data;
            },
            (error) => {
                console.log(error);
            }
        );
    },
    methods: {
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
    },
};
</script>

<style scoped>
.delete-btn {
    border: none;
}

.delete-btn img {
    width: 30px;
    height: 30px;
    cursor: pointer;
}
</style>
