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
                            >HaoHao Trip <span class="text-primary"></span
                        ></a>
                    </router-link>
                    <ul
                        class="js-clone-nav d-none d-lg-inline-block text-left site-menu float-right"
                    >
                        <!-- 공통 로그인이 되어 있을 때 : 닉네임 메시지 -->
                        <!-- <li v-if="userInfo">
                            <a>{{ userInfo.user_name }}({{ userInfo.user_id }})님 환영합니다</a>
                        </li> -->

                        <!-- 공통 : HotPlace, TourInfo -->
                        <li>
                            <router-link
                                :to="{
                                    name: 'Announcements',
                                    params: announcementParams.user,
                                }"
                                >공지사항</router-link
                            >
                        </li>
                        <li>
                            <router-link to="/tourinfo">TourInfo</router-link>
                        </li>
                        <li>
                            <router-link to="/hotplace">HotPlace</router-link>
                        </li>

                        <!-- 로그인이 안되어 있을 때 : SignIn-->
                        <li v-if="!userInfo">
                            <router-link to="/authentication/login">Sign In</router-link>
                        </li>

                        <!-- 일반 사용자 로그인이 되어 있을 때 : My Schedule-->
                        <li v-if="userInfo">
                            <router-link to="/plan"> Plans </router-link>
                        </li>

                        <li v-if="userInfo && userInfo.user_id !== 'admin'">
                            <router-link to="/schedule"> My Schedule </router-link>
                        </li>

                        <li v-if="userInfo">
                            <router-link to="/review">Reviews</router-link>
                        </li>
                        <!-- 공통 로그인이 되어 있을 때 (마지막): 로그아웃 -->
                        <li v-if="userInfo">
                            <div id="admin-menu" class="dropdown">
                                <button
                                    class="btn dropdown-toggle navbar-btn bg-transparent"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <a style="color: rgba(255, 255, 255, 0.7)"
                                        >{{ userInfo.user_name }}({{ userInfo.user_id }})님</a
                                    >
                                </button>
                                <ul class="dropdown-menu">
                                    <li>
                                        <router-link
                                            :to="{
                                                name: 'AnnouncementManager',
                                                params: announcementParams.admin,
                                            }"
                                            >내 정보 수정</router-link
                                        >
                                    </li>
                                    <li>
                                        <router-link to="/signout">Sign out</router-link>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <!-- 관리자 로그인이 되어 있을 때 : admin page-->
                        <li v-if="userInfo && userInfo.user_id === 'admin'">
                            <div id="admin-menu" class="dropdown">
                                <button
                                    class="btn dropdown-toggle navbar-btn bg-transparent"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <a style="color: white">Admin Page</a>
                                </button>
                                <ul class="dropdown-menu">
                                    <li>
                                        <router-link
                                            :to="{
                                                name: 'AnnouncementManager',
                                                params: announcementParams.admin,
                                            }"
                                            >공지사항 관리</router-link
                                        >
                                    </li>
                                    <li>
                                        <router-link to="/admin/memberManager"
                                            >회원 관리</router-link
                                        >
                                    </li>
                                </ul>
                            </div>
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
import { mapState, mapGetters, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
    name: "NavBar",
    components: {},
    data() {
        return {
            announcementParams: {
                user: {
                    isAdmin: false,
                    heroTitle: "공지사항",
                },
                admin: {
                    isAdmin: true,
                    heroTitle: "공지사항 관리",
                },
            },
        };
    },
    computed: {
        ...mapState(memberStore, ["isLogin", "userInfo"]),
        ...mapGetters(["checkUserInfo"]),
    },
    created() {},
    methods: {
        ...mapActions(memberStore, ["userLogout"]),
    },
};
</script>

<style scoped>
.navbar-btn {
    font-size: 14px;
    padding: 10px 15px;
    display: inline-block;
    text-decoration: none !important;
    color: rgba(255, 255, 255, 0.7) !important;
}

#admin-menu a {
    color: black;
}

#admin-menu > button {
    color: rgba(255, 255, 255, 0.7);
}

.dropdown-menu > li {
    margin: 0.5rem auto;
    font-size: 0.9em;
    text-align: center;
}
</style>
