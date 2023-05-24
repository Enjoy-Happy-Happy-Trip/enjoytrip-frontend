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
    await api.post(`/member/resetPwd`, findForm).then(success).catch(fail);
}

async function resetUserPwd(resetForm, success, fail) {
    await api.put(`/member/${resetForm.user_id}`, resetForm).then(success).catch(fail);
}

async function findAllUsers(success, fail) {
    await api.get(`/member`).then(success).catch(fail);
}

async function deleteUserById(id, success, fail) {
    await api.delete(`/member/${id}`).then(success).catch(fail);
}

export {
    login,
    findById,
    tokenRegeneration,
    logout,
    register,
    confirmUserToFindPwd,
    resetUserPwd,
    findAllUsers,
    deleteUserById,
};
