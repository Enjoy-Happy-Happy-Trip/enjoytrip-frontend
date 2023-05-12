<template>
    <div>
        <!-- mobile navigation bar -->
        <div class="site-mobile-menu site-navbar-target">
            <div class="site-mobile-menu-header">
                <div class="site-mobile-menu-close">
                    <span class="icofont-close js-menu-toggle"></span>
                </div>
            </div>
            <div class="site-mobile-menu-body"></div>
        </div>

        <nav class="site-nav">
            <div class="container">
                <div class="site-navigation">
                    <a href="/" class="logo m-0">Enjoy Trip <span class="text-primary"></span></a>
                    <ul
                        class="js-clone-nav d-none d-lg-inline-block text-left site-menu float-right"
                    >
                         <!-- 공통 로그인이 되어 있을 때 : 닉네임 메시지 -->
                         <li v-if="this.$store.state.isLoggedIn">
                            <a>{{ this.$store.state.user.user_name }}님 안녕하세요</a>
                        </li>

                        <!-- 공통 : Board, TourInfo -->
                        <li><a href="${root}/board/boardlist">Board</a></li>
                        <li><a href="${root}/tourinfo.html">TourInfo</a></li>

                        <!-- 로그인이 안되어 있을 때 : SignIn-->
                        <li v-if="!this.$store.state.isLoggedIn">
                            <router-link to="/login">Sign In</router-link>
                            <!-- <a href="/login">Sign In</a> -->
                        </li>

                        <!-- 일반 사용자 로그인이 되어 있을 때 : MyPlans, Reviews-->
                        <li
                            v-if="
                                this.$store.state.isLoggedIn &&
                                this.$store.state.user.user_id !== 'admin'
                            "
                        >
                            <router-link to="/plan">
                                <a>My Schedule</a>
                            </router-link>
                        </li>
                        <li
                            v-if="
                                this.$store.state.isLoggedIn &&
                                this.$store.state.user.user_id !== 'admin'
                            "
                        >
                            <a href="${root}/reviews.html">Reviews</a>
                        </li>

                        <!-- 관리자 로그인이 되어 있을 때 : admin page-->
                        <li
                            v-if="
                                this.$store.state.isLoggedIn &&
                                this.$store.state.user.user_id === 'admin'
                            "
                        >
                            <a href="${root}/member/memberlist">Admin Page</a>
                        </li>

                        <!-- 공통 로그인이 되어 있을 때 (마지막): 로그아웃 -->
                        <li v-if="this.$store.state.isLoggedIn">
                            <!-- <a @click.prevent="signout" :href="this.$backUrl('/member/signout')"
                                >Sign Out</a
                            > -->
                            <a @click.prevent="signout" href="#none">Sign Out</a>
                        </li>
                    </ul>

                    <a
                        href="#"
                        class="burger ml-auto float-right site-menu-toggle js-menu-toggle d-inline-block d-lg-none light"
                        data-toggle="collapse"
                        data-target="#main-navbar"
                    >
                        <span></span>
                    </a>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
// import axios from "axios";

export default {
    name: "NavBar",
    components: {},
    data() {
        return {
            message: "",
        };
    },
    created() {},
    methods: {
        signout() {
            this.$store.commit("LOGOUT");
            this.$router.replace("/");
            // axios.get(this.$backUrl("/member/signout")).then((response) => {
            //     console.log(response);
            //     this.$route.replace("/");
            // });
        },
    },
};
</script>

<style scoped></style>
