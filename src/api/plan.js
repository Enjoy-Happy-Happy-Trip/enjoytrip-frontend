import { apiInstance } from "@/api/http";

const api = apiInstance();

function planList(success, fail) {
    api.get(`/plan`).then(success).catch(fail);
}
