<template>
    <div class="home">
        <h1>this is home page</h1>
        <h1 v-if="this.$store.state.isLoggedIn" @click="GoToLogin">
            안녕하세요 {{ this.$store.state.user.user_name }} 님
        </h1>
        <button v-else @click="GoToLogin">go to login</button>
    </div>
</template>

<script>
// @ is an alias to /src

export default {
    name: "HomeView",
    components: {},
    methods: {
        GoToLogin() {
            this.$router.push("/login");
        },
    },
};
</script>
