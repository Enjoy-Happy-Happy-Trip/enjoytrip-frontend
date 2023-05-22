import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import Login from "@/components/authentication/Login.vue";
import FindPwd from "@/components/authentication/FindPwd.vue";
import ResetPwd from "@/components/authentication/ResetPwd.vue"
import RegisterMember from "@/components/authentication/Register.vue";
import MyScheduleView from "@/views/MyScheduleView.vue";
import ScheduleDetail from "@/components/schedule/ScheduleDetail.vue";
import ScheduleList from "@/components/schedule/ScheduleList.vue";
import ReviewView from "@/views/ReviewView.vue";
import HotPlaceView from "@/views/HotPlaceView.vue";
import ReviewList from "@/components/review/ReviewList.vue";
import ReviewDetail from "@/components/review/ReviewDetail.vue";
import TourInfoView from "@/views/TourInfoView.vue";
import PlanBoardView from "@/views/PlanBoardView.vue";
import PlanList from "@/components/plan/PlanList.vue";
import PlanDetail from "@/components/plan/PlanDetail.vue";
import PlanShare from "@/components/plan/PlanShare.vue";
import HotPlaceList from "@/components/hotplace/HotPlaceList.vue";

import store from "@/store";

Vue.use(VueRouter);

const onlyAuthUser = async (to, from, next) => {
    const checkUserInfo = store.getters["memberStore/checkUserInfo"];
    const checkToken = store.getters["memberStore/checkToken"];
    let token = sessionStorage.getItem("access-token");

    if (checkUserInfo != null && token) {
        await store.dispatch("memberStore/getUserInfo", token);
    }
    if (!checkToken || checkUserInfo === null) {
        alert("로그인이 필요한 페이지입니다!!");
        // next({ name: "login" });
        router.push({ name: "LoginView" });
    } else {
        next();
    }
};

const routes = [
    {
        path: "/",
        name: "HomeView",
        component: HomeView,
    },
    {
        path: "/authentication",
        name: "LoginView",
        component: LoginView,
        children: [
            {
                path: "login",
                name: "Login",
                component: Login,
            },
            {
                path: "/register",
                name: "RegisterMember",
                component: RegisterMember,
            },
            {
                path: "/findPwd",
                name: "FindPwd",
                component: FindPwd,
            },
            {
                path: "resetPwd",
                name: "ResetPwd",
                component: ResetPwd,
            },
        ],
    },
    {
        path: "/plan",
        name: "PlanBoardView",
        component: PlanBoardView,
        redirect: "/plan/list",
        children: [
            {
                path: "list",
                name: "planList",
                beforeEnter: onlyAuthUser,
                component: PlanList,
            },
            {
                path: "detail/:planId",
                name: "planDetail",
                beforeEnter: onlyAuthUser,
                component: PlanDetail,
            },
            {
                path: "share",
                name: "planShare",
                beforeEnter: onlyAuthUser,
                component: PlanShare,
            },
        ],
    },
    {
        path: "/hotplace",
        name: "HotPlaceView",
        component: HotPlaceView,
        redirect: "/hotplace/list",
        children: [
            {
                path: "list",
                name: "hotPlaceList",
                component: HotPlaceList,
            },
        ],
    },
    {
        path: "/tourinfo",
        name: "TourInfoView",
        component: TourInfoView,
    },
    {
        path: "/login",
        name: "LoginView",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ "../views/LoginView.vue"),
    },
    {
        path: "/schedule",
        name: "schedule",
        component: MyScheduleView,
        redirect: "/schedule/list",
        children: [
            {
                path: "list",
                name: "scheduleList",
                beforeEnter: onlyAuthUser,
                component: ScheduleList,
            },
            {
                path: "detail/:schedule_id",
                name: "scheduleDetail",
                beforeEnter: onlyAuthUser,
                component: ScheduleDetail,
            },
        ],
    },
    {
        path: "/review",
        name: "review",
        component: ReviewView,
        redirect: "/review/list",
        children: [
            {
                path: "list",
                name: "reviewList",
                beforeEnter: onlyAuthUser,
                component: ReviewList,
            },
            {
                path: "detail/:review_id",
                name: "reviewDetail",
                beforeEnter: onlyAuthUser,
                component: ReviewDetail,
            },
        ],
    },
];

const router = new VueRouter({
    routes,
});

export default router;
