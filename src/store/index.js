import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isLoggedIn: false,
        user: null,
    },
    getters: {},
    mutations: {
        LOGIN(state, user) {
            state.isLoggedIn = true;
            state.user = user;
        },
        LOGOUT(state) {
            state.isLoggedIn = false;
            state.user = null;
        },
    },
    actions: {},
    modules: {},
});
