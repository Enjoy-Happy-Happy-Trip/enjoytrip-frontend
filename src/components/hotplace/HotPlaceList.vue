<template>
    <div>
        <div class="hero hero-inner">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-6 mx-auto text-center">
                        <div class="intro-wrap">
                            <h1 class="mb-0">핫플레이스 TOP100</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container mt-4">
            <div class="row">
                <div
                    class="col-12 col-md-6 col-lg-4 col-xl-3"
                    v-for="(hotplace, index) in hotplaces"
                    :key="index"
                >
                    <div class="hotplace-card">
                        <div class="hotplace-image">
                            <img
                                :src="
                                    hotplace.firstImage
                                        ? hotplace.firstImage
                                        : require('@/assets/No_image_available.png')
                                "
                            />
                        </div>
                        <div
                            class="hotplace-details"
                            style="min-height: 200px; max-height: 300px"
                        >
                            <h4>{{ hotplace.title }}</h4>
                            <p>{{ hotplace.addr }}</p>
                            <p class="review-count">
                                추천수 : {{ hotplace.review_count }}
                            </p>
                            <b-button
                                variant="info"
                                class="btn-bottom-left"
                                @click="showModal(hotplace.contentId)"
                                >상세보기</b-button
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <b-modal id="detail-modal" title="장소 상세 정보">
            <place-detail-modal
                :contentId="modalContentId"
                ref="detailModal"
            ></place-detail-modal>
            <template #modal-footer="{ cancel }">
                <b-button size="sm" variant="info" @click="cancel()">
                    확인
                </b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
import { apiInstance } from "@/api/http";
import PlaceDetailModal from "@/components/tour/PlaceDetailModal.vue";

const api = apiInstance();

export default {
    name: "HotPlaceList",
    components: {
        PlaceDetailModal,
    },
    data() {
        return {
            hotplaces: [],
            modalContentId: 0,
        };
    },
    created() {
        api.get(`/place/hotplace`)
            .then(({ data }) => {
                this.hotplaces = data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    methods: {
        showModal(contentId) {
            this.modalContentId = contentId;
            this.$bvModal.show("detail-modal");
        },
    },
};
</script>

<style>
.hotplace-card {
    margin-bottom: 20px;
    border: 3px solid #cbeaff;
    padding: 10px;
    position: relative;
}

.hotplace-image img {
    width: 100%;
    height: 200px;
}

.hotplace-details {
    margin-top: 10px;
}

.review-count {
    position: absolute;
    bottom: 5px;
    right: 5px;
    background-color: #fff;
    padding: 5px;
}

.btn-bottom-left {
    position: absolute;
    bottom: 10px;
    left: 10px;
}

</style>
