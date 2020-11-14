import Vue from 'vue';
import VueRouter from 'vue-router';
import StatisticsList from "@/pages/StatisticsList";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'StatisticsList',
        component: StatisticsList
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})


export default router
