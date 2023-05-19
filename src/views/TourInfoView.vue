<template>
    <div>
        <hero-section title="전국 관광지 정보"></hero-section>
        <div class="container" style="max-width: 100% !important">
            <div class="row">
                <div class="col-md-1"></div>
                <!-- 중앙 center content end -->
                <div :class="userInfo ? 'col-md-7' : 'col-md-10'">
                    <!-- 관광지 검색 start -->
                    <form
                        class="d-flex my-3"
                        onsubmit="return false;"
                        role="search"
                    >
                        <select
                            v-model="sido"
                            @change="getGugun"
                            id="search-area"
                            class="userselect form-select me-2"
                        >
                            <option value="0">시/도 선택</option>
                        </select>
                        <select
                            v-model="gugun"
                            id="search-gugun"
                            class="userselect form-select me-2"
                        >
                            <option value="0">구/군 선택</option>
                        </select>
                        <select
                            id="search-content-id"
                            class="userselect form-select me-2"
                        >
                            <option value="0" selected>관광지 유형</option>
                            <option value="12">관광지</option>
                            <option value="14">문화시설</option>
                            <option value="15">축제공연행사</option>
                            <option value="25">여행코스</option>
                            <option value="28">레포츠</option>
                            <option value="32">숙박</option>
                            <option value="38">쇼핑</option>
                            <option value="39">음식점</option>
                        </select>
                        <b-form-input
                            id="search-keyword"
                            class="userselect form-input me-2"
                            type="search"
                            placeholder="검색어"
                            aria-label="검색어"
                        ></b-form-input>
                        <button
                            id="btn-search"
                            class="btn btn-outline-success"
                            type="button"
                            @click="searchDataByKeyword"
                        >
                            검색
                        </button>
                    </form>

                    <!-- kakao map start -->
                    <kakao-map
                        ref="map"
                        :positions="positions"
                        @map-updated="updateMap"
                    ></kakao-map>
                    <!-- kakao map end -->

                    <b-table
                        v-show="hideTable"
                        striped
                        responsive
                        :items="placesData"
                        :fields="fields"
                        :per-page="perPage"
                        :current-page="currentPage"
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
                                @click="
                                    callMoveCenter(
                                        row.item.latitude,
                                        row.item.longitude
                                    )
                                "
                            />
                        </template>
                        <template #cell(name)="row">
                            {{ row.item.title }}
                        </template>
                        <template #cell(address)="row">
                            {{ row.item.addr }}
                        </template>
                        <template #cell(actions)="row" v-if="userInfo">
                            <button
                                @click="
                                    callAddPlan(
                                        row.item.title,
                                        row.item.contentId
                                    )
                                "
                                class="btn btn-warning"
                                style="width: 80px"
                            >
                                추가
                            </button>
                        </template>
                        <template #cell(review)="row" v-if="userInfo">
                            <button
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

                    <b-pagination
                        v-show="hideTable"
                        v-model="currentPage"
                        :total-rows="placesData.length"
                        :per-page="perPage"
                        align="center"
                    ></b-pagination>

                    <!-- 관광지 검색 end -->
                    <!-- 중앙 center content end -->
                </div>
                <!-- 중앙 right content start -->
                <div id="rightContent" class="col-md-3" v-show="userInfo">
                    <div>
                        <add-planlist ref="planList"></add-planlist>
                    </div>
                </div>
                <div class="col-md-1"></div>
                <!-- 중앙 right content end -->
            </div>
            <!-- 중앙 content end -->

            <!-- Modal -->
            <b-modal id="review-modal" title="리뷰 쓰기">
                <tour-review-modal
                    :title="modalTitle"
                    ref="reviewModal"
                ></tour-review-modal>
                <template #modal-footer="{ submitReview, cancel }">
                    <b-button size="sm" variant="danger" @click="cancel()">
                        취소
                    </b-button>
                    <b-button
                        size="sm"
                        variant="success"
                        @click="submitReview"
                    >
                        등록
                    </b-button>
                </template>
            </b-modal>
        </div>
    </div>
</template>

<script>
import AddPlanlist from "@/components/tour/AddPlanlist.vue";
import KakaoMap from "@/components/tour/KakaoMap.vue";
import TourReviewModal from "@/components/tour/TourReviewModal.vue";
import HeroSection from "@/components/HeroSection.vue";
import { mapState, mapGetters } from "vuex";
import { apiInstance } from "@/api/http";

const memberStore = "memberStore";
const api = apiInstance();

export default {
    name: "TourInfoView",
    data() {
        return {
            placesData: [], // Your data array containing the place objects
            fields: [
                { key: "image", label: "대표이미지" },
                { key: "name", label: "관광지명" },
                { key: "address", label: "주소" },
                { key: "actions", label: "", sortable: false },
                { key: "review", label: "", sortable: false },
            ],
            perPage: 10, // Number of items to display per page
            currentPage: 1, // Current page number
            map: null,
            userSelection: [],
            positions: [],
            linePath: [],
            places: [],
            visited: [],
            cnt: 1,
            modalTitle: null,
            modalContendId: null,
            sido: "0",
            gugun: "0",
            hideTable: false,
        };
    },
    created() {
        this.getSido();
    },
    computed: {
        ...mapState(memberStore, ["isLogin", "userInfo"]),
        ...mapGetters(["checkUserInfo"]),
    },
    components: {
        AddPlanlist,
        KakaoMap,
        TourReviewModal,
        HeroSection,
    },
    methods: {
        submitReview() {
            const userReview = {
                content_id: this.modalContendId,
                user_review: this.$refs.reviewModal.getReview(),
            };

            console.log(userReview.user_review);

            api.post(`/place/writereview`, userReview)
                .then(() => {
                    alert("리뷰 등록 성공!!");
                    window.location.reload();
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        callAddPlan(title, contentId) {
            this.$refs.planList.addPlan(title, contentId);
        },
        setCursorPointer() {
            this.$refs.cursorImage.style.cursor = "pointer";
        },
        callMoveCenter(lat, lon) {
            const kakaoMap = this.$refs.map;
            kakaoMap.moveCenter(lat, lon);
        },
        makeOption(data) {
            let sel = document.getElementById("search-area");
            data.forEach((area) => {
                let opt = document.createElement("option");
                opt.setAttribute("value", area.sido_code);
                opt.appendChild(document.createTextNode(area.sido_name));

                sel.appendChild(opt);
            });
        },
        makeOptionGugun(data) {
            let sel = document.getElementById("search-gugun");
            sel.innerHTML = '<option value="0" selected>구/군 선택</option>';

            data.forEach((area) => {
                let opt = document.createElement("option");
                opt.setAttribute("value", area.gugun_code);
                opt.appendChild(document.createTextNode(area.gugun_name));

                sel.appendChild(opt);
            });
        },
        getSido() {
            // index page 로딩 후 전국의 시도 설정.
            api.get(`/tour/sido`)
                .then(({ data }) => {
                    this.makeOption(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        getGugun() {
            api.get(`/tour/gugun`, {
                params: { sido: this.sido },
            })
                .then(({ data }) => {
                    this.makeOptionGugun(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        searchDataByKeyword() {
            this.hideTable = true;
            this.positions = [];
            document.querySelector("table").setAttribute("style", "display: ;");

            let searchUrl = this.makeSearchUrl();

            api.get(searchUrl).then(({ data }) => {
                this.placesData = data;

                data.forEach((area) => {
                    let markerInfo = {
                        title: area.title,
                        contenttypeid: area.contentTypeId,
                        latlng: new window.kakao.maps.LatLng(
                            area.latitude,
                            area.longitude
                        ),
                    };
                    this.positions.push(markerInfo);
                });

                this.$refs.map.displayMarker(this.positions);
            });
        },
        updateMap(map) {
            this.map = map;
        },
        makeSearchUrl() {
            let areaCode = this.sido;
            let gugunCode = this.gugun;
            let contentTypeId =
                document.getElementById("search-content-id").value;
            let keyword = document.getElementById("search-keyword").value;
            let searchUrl = "/attraction/attractionlist?";

            searchUrl += "sidoCode=" + areaCode;
            searchUrl += "&gugunCode=" + gugunCode;
            searchUrl += "&contentTypeId=" + contentTypeId;
            searchUrl += "&keyword=" + keyword;
            return searchUrl;
        },
        //     // 지도에 표시할 선을 생성합니다
        //     var polyline = new window.kakao.maps.Polyline({
        //         path: this.linePath, // 선을 구성하는 좌표배열 입니다
        //         strokeWeight: 5, // 선의 두께 입니다
        //         strokeColor: "#FFAE00", // 선의 색깔입니다
        //         strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        //         strokeStyle: "solid", // 선의 스타일입니다
        //     });

        //     polyline.setMap(this.map);
        showModal(title, contentId) {
            this.modalTitle = title;
            this.modalContendId = contentId;
            this.$bvModal.show("review-modal");
        },
    },
};
</script>

<style scoped>
.userselect {
    height: 60px;
}
</style>
