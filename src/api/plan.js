import { apiInstance } from "@/api/http";

const api = apiInstance();

function getAllPlans(success, fail) {
    api.get(`/plan`).then(success).catch(fail);
}

function findPlanById(planId, success, fail) {
    api.get(`/plan/${planId}`).then(success).catch(fail);
}

function findPlanDetailsById(planId, success, fail) {
    api.get(`/plan/detail/${planId}`).then(success).catch(fail);
}

export { getAllPlans, findPlanById, findPlanDetailsById };
