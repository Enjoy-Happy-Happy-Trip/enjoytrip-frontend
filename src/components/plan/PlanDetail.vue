<template>
    <div>
        <hero-section title="여행 계획 상세 보기"></hero-section>
        <div class="itinerary mt-3">
            <div class="itinerary-section">
                <div class="itinerary-item">
                    <div class="itinerary-label">작성자</div>
                    <div class="itinerary-value">{{ plan.user_id }}</div>
                </div>
                <div class="itinerary-item">
                    <div class="itinerary-label">제목</div>
                    <div class="itinerary-value">
                        {{ plan.plan_title }}
                    </div>
                </div>
                <div class="itinerary-desc">
                    <div class="itinerary-label">설명</div>
                    <div class="itinerary-value">{{ plan.plan_desc }}</div>
                </div>
                <b-button
                    v-show="
                        this.userInfo.user_id === plan.user_id ||
                        this.userInfo.user_id === 'admin'
                    "
                    class="delButton mt-2 mb-2 me-3"
                    variant="danger"
                    @click="deletePlan()"
                    >삭제</b-button
                >
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
                        </b-table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HeroSection from "@/components/HeroSection.vue";
import KakaoMap from "@/components/tour/KakaoMap.vue";
import { mapState, mapGetters } from "vuex";

const memberStore = "memberStore";

import {
    deletePlanById,
    findPlanById,
    findPlanDetailsById,
} from "@/api/plan.js";

export default {
    name: "PlanDetail",
    components: {
        HeroSection,
        KakaoMap,
    },
    computed: {
        ...mapState(memberStore, ["isLogin", "userInfo"]),
        ...mapGetters(["checkUserInfo"]),
    },
    data() {
        return {
            message: "",
            fields: [
                { key: "index", label: "No" },
                { key: "image", label: "대표이미지" },
                { key: "name", label: "관광지명" },
                { key: "address", label: "주소" },
            ],
            plan: {},
            attractions: [],
        };
    },
    created() {
        let planId = this.$route.params.planId;

        findPlanById(
            planId,
            ({ data }) => {
                this.plan = data;
            },
            (error) => {
                console.log(error);
            }
        );

        findPlanDetailsById(
            planId,
            ({ data }) => {
                this.attractions = data;

                if (window.kakao && window.kakao.maps) {
                    this.$refs.map.displayMarker(
                        this.$refs.map.convertMarker(this.attractions)
                    );
                    this.$refs.map.displayLine(
                        this.$refs.map.convertLine(this.attractions)
                    );
                }
            },
            (error) => {
                console.log(error);
            }
        );
    },
    methods: {
        callMoveCenter(item) {
            const kakaoMap = this.$refs.map;
            kakaoMap.moveCenter(item.latitude, item.longitude);
        },
        deletePlan() {
            deletePlanById(
                this.plan.plan_id,
                () => {
                    alert("계획 삭제 성공!!");
                    this.$router.push(`/plan`);
                },
                (error) => {
                    console.log(error);
                }
            );
        },
    },
};
</script>

<style scoped>
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

.itinerary-desc {
    width: 50%;
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
</style>
