import { apiInstance } from "@/api/http";

const api = apiInstance();

function getAllPlans(success, fail) {
    api.get(`/plan`).then(success).catch(fail);
}

function findPlanById(planId, success, fail) {
    api.get(`/plan/${planId}`).then(success).catch(fail);
}

function deletePlanById(planId, success, fail) {
    api.put(`/plan/shared/${planId}`).then(success).catch(fail);
}

function findPlanDetailsById(planId, success, fail) {
    api.get(`/plan/detail/${planId}`).then(success).catch(fail);
}

function findUnSharedSchedulesByUserId(userId, success, fail) {
    api.get(`/plan/getmyplan/${userId}?unshared=true`).then(success).catch(fail);
}

function savePlan(plan, success, fail) {
    api.put(`/plan/${plan.plan_id}`, plan).then(success).catch(fail);
}

export { getAllPlans, deletePlanById, findPlanById, findPlanDetailsById, findUnSharedSchedulesByUserId, savePlan };
