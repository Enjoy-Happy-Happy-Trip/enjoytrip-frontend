import { apiInstance } from "@/api/http";

const api = apiInstance();

function findAllAnouncements(success, fail) {
    api.get(`/announcement`).then(success).catch(fail);
}

function deleteAnnouncementById(id, success, fail) {
    api.delete(`/announcement/${id}`).then(success).catch(fail);
}

export { findAllAnouncements, deleteAnnouncementById };
