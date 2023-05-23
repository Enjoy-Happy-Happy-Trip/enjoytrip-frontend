<template>
    <div class="hello">
        <div class="hero hero-inner">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-6 mx-auto text-center">
                        <div class="intro-wrap">
                            <h1 class="mb-0">상세 계획</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="itinerary ml-3 mt-2">
            <div class="itinerary-item">
                <div class="itinerary-label">작성자</div>
                <div class="itinerary-value">{{ article.user_id }}</div>
            </div>
            <div class="itinerary-item">
                <div class="itinerary-label">제목</div>
                <div class="itinerary-value">{{ article.schedule_title }}</div>
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

        <div class="kakaoMap mt-3 ml-3">
            <kakao-map ref="map" :attractions="attractions"></kakao-map>
        </div>

        <table class="ml-3 mt-2">
            <thead>
                <td colspan="2" style="text-align: center; font-size: x-large">
                    장소
                </td>
            </thead>
            <tbody>
                <template v-for="attraction in attractions">
                    <schedule-attraction
                        :attraction="attraction"
                        :key="attraction.contentId"
                    >
                    </schedule-attraction>
                </template>
            </tbody>
        </table>
    </div>
</template>

<script>
import { apiInstance } from "@/api/http";
import ScheduleAttraction from "@/components/schedule/ScheduleAttraction.vue";
import KakaoMap from "@/components/tour/KakaoMap.vue";

const api = apiInstance();

export default {
    name: "ScheduleDetail",
    components: {
        ScheduleAttraction,
        KakaoMap,
    },
    data() {
        return {
            article: {},
            attractions: [],
        };
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
};
</script>

<style>
.itinerary {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
}

.itinerary-item {
    display: flex;
    gap: 10px;
}

.itinerary-label {
    width: 100px;
    font-weight: bold;
}

.itinerary-value {
    flex: 1;
}

.kakaoMap {
    width: 60%;
    align-content: center;
    justify-content: center;
}
</style>
