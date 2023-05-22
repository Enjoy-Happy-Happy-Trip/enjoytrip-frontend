import { apiInstance } from "@/api/http";

const api = apiInstance();

async function login(user, success, fail) {
    await api.post(`/member/login`, JSON.stringify(user)).then(success).catch(fail);
}

async function findById(user_id, success, fail) {
    api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
    await api.get(`/member/info/${user_id}`).then(success).catch(fail);
}

async function tokenRegeneration(user, success, fail) {
    api.defaults.headers["refresh-token"] = sessionStorage.getItem("refresh-token"); //axios header에 refresh-token 셋팅
    await api.post(`/member/refresh`, user).then(success).catch(fail);
}

async function logout(user_id, success, fail) {
    await api.get(`/member/logout/${user_id}`).then(success).catch(fail);
}

async function register(registerForm, success, fail) {
    await api.post(`/member`, registerForm).then(success).catch(fail);
}

async function confirmUserToFindPwd(findForm, success, fail) {
    await api.post(`/member/findPwd`, findForm).then(success).catch(fail);
}

export { login, findById, tokenRegeneration, logout, register, confirmUserToFindPwd };
