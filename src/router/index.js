import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "@/views/HomeView.vue";
import MyScheduleView from '@/views/MyScheduleView.vue'
import ScheduleDetail from '@/components/ScheduleDetail.vue'
import ScheduleList from '@/components/ScheduleList.vue'
import ReviewView from '@/views/ReviewView.vue'
import ReviewList from '@/components/ReviewList.vue'
import ReviewDetail from '@/components/ReviewDetail.vue'

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "HomeView",
        component: HomeView,
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
        path: "/plan",
        name: "plan",
        component: MyScheduleView,
        redirect: "/plan/list",
        children: [
            {
                path: 'list',
                name: 'scheduleList',
                component: ScheduleList,
            },
            {
                path: 'detail/:schedule_id',
                name: 'scheduleDetail',
                component: ScheduleDetail,
            },
        ]
    },
    {
        path: "/review",
        name: "review",
        component: ReviewView,
        redirect: "/review/list",
        children: [
            {
                path: 'list',
                name: 'reviewList',
                component: ReviewList,
            },
            {
                path: 'detail/:review_id',
                name: 'reviewDetail',
                component: ReviewDetail,
            },
        ]
    },
];

const router = new VueRouter({
    routes,
});

export default router;
