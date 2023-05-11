import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "@/views/HomeView.vue";
import MyScheduleView from '@/views/MyScheduleView.vue'
import ScheduleDetail from '@/components/ScheduleDetail.vue'
import ScheduleList from '@/components/ScheduleList.vue'

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
                name: 'list',
                component: ScheduleList,
            },
            {
                path: 'detail/:schedule_id',
                name: 'detail',
                component: ScheduleDetail,
            },
        ]
    },
];

const router = new VueRouter({
    routes,
});

export default router;
