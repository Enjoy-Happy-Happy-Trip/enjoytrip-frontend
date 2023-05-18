import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "@/views/HomeView.vue";
import MyScheduleView from '@/views/MyScheduleView.vue'
import ReviewView from '@/views/ReviewView.vue'
import TourInfoView from '@/views/TourInfoView.vue'
import BoardView from '@/views/BoardView.vue'
import ScheduleDetail from '@/components/schedule/ScheduleDetail.vue'
import ScheduleList from '@/components/schedule/ScheduleList.vue'
import ReviewList from '@/components/review/ReviewList.vue'
import ReviewDetail from '@/components/review/ReviewDetail.vue'
import BoardList from '@/components/plan/BoardList.vue'
import boardDetail from '@/components/plan/BoardDetail.vue'

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "HomeView",
        component: HomeView,
    },
    {
        path: "/board",
        name: "BoardView",
        component: BoardView,
        redirect: "/board/list",
        children: [
            {
                path: 'list',
                name: 'boardList',
                component: BoardList,
            },
            {
                path: 'detail/:article_no',
                name: 'boardDetail',
                component: boardDetail,
            },
        ]
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
