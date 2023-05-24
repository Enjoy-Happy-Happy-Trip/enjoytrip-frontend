import { apiInstance } from "@/api/http";

const api = apiInstance();

function findAllAnouncements(success, fail) {
    api.get(`/announcement`).then(success).catch(fail);
}

function deleteAnnouncementById(id, success, fail) {
    api.delete(`/announcement/${id}`).then(success).catch(fail);
}

function findAnnoncementById(id, viewCountUpdate, success, fail) {
    api.get(`/announcement/${id}?viewcount=${viewCountUpdate}`).then(success).catch(fail);
}

function modifyAnnouncementById(form, success, fail) {
    api.put(`/announcement/${form.article_no}`, form).then(success).catch(fail);
}

function addAnnouncement(form, success, fail) {
    api.post(`/announcement`, form).then(success).catch(fail);
}

export {
    findAllAnouncements,
    deleteAnnouncementById,
    findAnnoncementById,
    modifyAnnouncementById,
    addAnnouncement,
};
