<template>
    <div>
        <hero-section title="회원 관리"></hero-section>
        <b-container class="dc-container">
            <b-table hover :items="users" :fields="fields">
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
        </b-container>
    </div>
</template>

<script>
import HeroSection from "@/components/HeroSection.vue";
import { findAllUsers } from "@/api/member.js";

export default {
    name: "MemberManager",
    components: {
        HeroSection,
    },
    data() {
        return {
            users: [],
            fields: ["No", "user_id", "user_name", "email", "join_date", "delete"],
        };
    },
    created() {
        findAllUsers(
            ({ data }) => {
                this.users = data;
            },
            (error) => {
                console.log(error);
            }
        );
    },
    methods: {
        deleteUser(row) {
            console.log("delete!!");
            console.log(row);
        },
    },
};
</script>

<style scoped></style>
