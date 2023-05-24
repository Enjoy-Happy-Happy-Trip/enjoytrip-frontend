<template>
    <div class="hello">
        <hero-section title="상세 계획"></hero-section>

        <div class="itinerary mt-2">
            <div class="itinerary-section">
                <div class="itinerary-item">
                    <div class="itinerary-label">작성자</div>
                    <div class="itinerary-value">{{ article.user_id }}</div>
                </div>
                <div class="itinerary-item">
                    <div class="itinerary-label">제목</div>
                    <div class="itinerary-value">
                        {{ article.schedule_title }}
                    </div>
                </div>
                <div class="itinerary-item">
                    <div class="itinerary-label">시작일</div>
                    <div class="itinerary-value">{{ article.start_date }}</div>
                </div>
                <div class="itinerary-item">
                    <div class="itinerary-label">종료일</div>
                    <div class="itinerary-value">{{ article.end_date }}</div>
                </div>
            </div>
        </div>

        <div class="contents">
            <div class="centered">
                <div class="row" style="margin: 0">
                    <div class="kakaoMap col-md-7 mt-3" id="focusMap">
                        <kakao-map
                            ref="map"
                            :attractions="attractions"
                        ></kakao-map>
                    </div>

                    <div
                        class="table-container col-md-5 mt-3"
                        style="padding: 0"
                    >
                        <b-table
                            no-border-collapse
                            sticky-header="700px"
                            hover
                            responsive
                            :items="attractions"
                            :fields="fields"
                            @row-clicked="callMoveCenter"
                        >
                            <template #cell(image)="row">
                                <img
                                    :src="
                                        row.item.firstImage
                                            ? row.item.firstImage
                                            : require('@/assets/No_image_available.png')
                                    "
                                    ref="cursorImage"
                                    width="100px"
                                    height="100px"
                                    style="cursor: pointer"
                                />
                            </template>
                            <template #cell(index)="row">
                                {{ row.index + 1 }}
                            </template>
                            <template #cell(name)="row">
                                {{ row.item.title }}
                            </template>
                            <template #cell(address)="row">
                                {{ row.item.addr }}
                            </template>
                            <template #cell(review)="row">
                                <button
                                    v-if="article.end_date < today"
                                    @click="
                                        showModal(
                                            row.item.title,
                                            row.item.contentId
                                        )
                                    "
                                    class="btn btn-warning scrollto"
                                    style="width: 120px"
                                >
                                    Review 쓰기
                                </button>
                            </template>
                        </b-table>
                    </div>
                </div>
            </div>
        </div>

        <b-modal id="review-modal" title="리뷰 쓰기">
            <tour-review-modal
                :title="modalTitle"
                ref="reviewModal"
            ></tour-review-modal>
            <template #modal-footer="{ cancel }">
                <b-button size="sm" variant="danger" @click="cancel()">
                    취소
                </b-button>
                <b-button size="sm" variant="success" @click="submitReview">
                    등록
                </b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
import HeroSection from "@/components/HeroSection.vue";
import { apiInstance } from "@/api/http";
import KakaoMap from "@/components/tour/KakaoMap.vue";
import TourReviewModal from "@/components/tour/TourReviewModal.vue";
import { mapState } from "vuex";

const api = apiInstance();

export default {
    name: "ScheduleDetail",
    components: {
        HeroSection,
        KakaoMap,
        TourReviewModal,
    },
    data() {
        return {
            article: {},
            attractions: [],
            fields: [
                { key: "index", label: "No" },
                { key: "image", label: "대표이미지" },
                { key: "name", label: "관광지명" },
                { key: "address", label: "주소" },
                { key: "review", label: "", sortable: false },
            ],
            modalTitle: null,
            modalContentId: null,
            today: new Date().toISOString().split("T")[0],
        };
    },
    computed: {
        ...mapState("memberStore", ["userInfo"]),
    },
    created() {
        let schedule_id = this.$route.params.schedule_id;
        api.get(`/plan/mydetail/${schedule_id}`)
            .then(({ data }) => {
                this.article = data;
                this.attractions = data.attractions;

                if (window.kakao && window.kakao.maps) {
                    this.$refs.map.displayMarker(
                        this.$refs.map.convertMarker(this.attractions)
                    );
                    this.$refs.map.displayLine(
                        this.$refs.map.convertLine(this.attractions)
                    );
                }
            })
            .catch((error) => {
                console.log(error);
            });
    },
    methods: {
        submitReview() {
            const userReview = {
                content_id: this.modalContentId,
                user_review: this.$refs.reviewModal.getReview(),
                user_id: this.userInfo.user_id,
            };

            api.post(`/place/writereview`, userReview)
                .then(() => {
                    alert("리뷰 등록 성공!!");
                    window.location.reload();
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        callMoveCenter(item) {
            const kakaoMap = this.$refs.map;
            kakaoMap.moveCenter(item.latitude, item.longitude);
        },
        showModal(title, contentId) {
            this.modalTitle = title;
            this.modalContentId = contentId;
            this.$bvModal.show("review-modal");
        },
    },
};
</script>

<style>
.itinerary {
    display: flex;
    justify-content: center;
    align-items: center;
}

.itinerary-section {
    display: flex;
    width: 80%;
    text-align: center;
    border: 2px solid #000000;
}

.itinerary-item {
    width: 25%;
    text-align: center;
    margin-bottom: 15px;
}

.itinerary-label {
    font-weight: bold;
    margin-top: 15px;
}

.itinerary-value {
    margin-top: 15px;
}

.contents {
    display: flex;
    justify-content: center;
    align-items: center;
}

.centered {
    width: 80%;
    text-align: center;
}

#focusMap {
    padding: 0;
}

.b-table-sticky-header::-webkit-scrollbar {
    width: 10px;
}

.b-table-sticky-header::-webkit-scrollbar-track {
    background: transparent;
}

.b-table-sticky-header::-webkit-scrollbar-thumb {
    background: #3838389d;
    border-radius: 45px;
}

.b-table-sticky-header::-webkit-scrollbar-thumb:hover {
    background: #303030;
}
</style>
