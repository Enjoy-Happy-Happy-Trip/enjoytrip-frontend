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

        <nav class="site-nav" style="background-color: #6998ab">
            <div class="container">
                <div class="site-navigation">
                    <router-link to="/">
                        <a href="#none" class="logo m-0"
                            >Enjoy Trip <span class="text-primary"></span
                        ></a>
                    </router-link>
                    <ul
                        class="js-clone-nav d-none d-lg-inline-block text-left site-menu float-right"
                    >
                        <!-- 공통 로그인이 되어 있을 때 : 닉네임 메시지 -->
                        <li v-if="userInfo">
                            <a>{{ userInfo.user_name }}({{ userInfo.user_id }})님 환영합니다</a>
                        </li>

                        <!-- 공통 : Board, TourInfo -->
                        <li>
                            <router-link to="/tourinfo">TourInfo</router-link>
                        </li>
                        <li>
                            <router-link to="/hotplace">HotPlace</router-link>
                        </li>                        

                        <!-- 로그인이 안되어 있을 때 : SignIn-->
                        <li v-if="!userInfo">
                            <router-link to="/authentication/login">Sign In</router-link>
                            <!-- <a href="/login">Sign In</a> -->
                        </li>

                        <!-- 일반 사용자 로그인이 되어 있을 때 : MyPlans, Reviews-->
                        <li v-if="userInfo && userInfo.user_id !== 'admin'">
                            <router-link to="/plan">
                                <a>Plans</a>
                            </router-link>
                        </li>
                        
                        <li v-if="userInfo && userInfo.user_id !== 'admin'">
                            <router-link to="/schedule">
                                <a>My Schedule</a>
                            </router-link>
                        </li>

                        <li v-if="userInfo && userInfo.user_id !== 'admin'">
                            <router-link to="/review">Reviews</router-link>
                            <!-- <a href="${root}/reviews.html">Reviews</a> -->
                        </li>

                        <!-- 관리자 로그인이 되어 있을 때 : admin page-->
                        <li v-if="userInfo && userInfo.user_id === 'admin'">
                            <a href="${root}/member/memberlist">Admin Page</a>
                        </li>

                        <!-- 공통 로그인이 되어 있을 때 (마지막): 로그아웃 -->
                        <li v-if="userInfo">
                            <!-- <a @click.prevent="signout" :href="this.$backUrl('/member/signout')"
                                >Sign Out</a
                            > -->
                            <a @click.prevent="onClickLogout" href="#none">Sign Out</a>
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
import { mapState, mapGetters, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
    name: "NavBar",
    components: {},
    data() {
        return {
            message: "",
        };
    },
    computed: {
        ...mapState(memberStore, ["isLogin", "userInfo"]),
        ...mapGetters(["checkUserInfo"]),
    },
    created() {},
    methods: {
        ...mapActions(memberStore, ["userLogout"]),
        // ...mapMutations(memberStore, ["SET_IS_LOGIN", "SET_USER_INFO"]),
        onClickLogout() {
            // this.SET_IS_LOGIN(false);
            // this.SET_USER_INFO(null);
            // sessionStorage.removeItem("access-token");
            // if (this.$route.path != "/") this.$router.push({ name: "main" });
            //vuex actions에서 userLogout 실행(Backend에 저장 된 리프레시 토큰 없애기
            //+ satate에 isLogin, userInfo 정보 변경)
            // this.$store.dispatch("userLogout", this.userInfo.userid);
            this.userLogout(this.userInfo.userid);
            sessionStorage.removeItem("access-token"); //저장된 토큰 없애기
            sessionStorage.removeItem("refresh-token"); //저장된 토큰 없애기
            if (this.$route.path != "/") this.$router.push({ name: "HomeView" });
        },
    },
};
</script>

<style scoped></style>
