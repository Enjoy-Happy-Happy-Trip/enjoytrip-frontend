<template>
    <div>
        <hero-section :title="heroSectionTitle"></hero-section>
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
                            @keyup.enter="searchDataByKeyword"
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
                    <kakao-map ref="map" :positions="positions"></kakao-map>
                    <!-- kakao map end -->

                    <b-table
                        hover
                        v-show="hideTable"
                        responsive
                        :items="placesData"
                        :fields="fields"
                        @row-clicked="callMoveCenter"
                    >
                        <template #cell(index)="row">
                            {{ row.index + 1 }}
                        </template>
                        <!-- <template #cell(image)="row">
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
                        </template> -->
                        <template #cell(name)="row">
                            {{ row.item.title }}
                        </template>
                        <template #cell(address)="row">
                            {{ row.item.addr }}
                        </template>
                        <template #cell(detail)="row">
                            <button
                                @click="showDetailModal(row.item.contentId)"
                                class="btn btn-warning"
                                style="width: 90px"
                            >
                                상세보기
                            </button>
                        </template>
                        <template #cell(actions)="row" v-if="userInfo">
                            <button
                                @click="callAddPlan(row.item)"
                                class="btn btn-warning"
                                style="width: 60px"
                            >
                                추가
                            </button>
                        </template>
                    </b-table>

                    <b-pagination
                        v-show="hideTable"
                        v-model="pageNavInfo.currentPage"
                        :total-rows="pageNavInfo.totalCount"
                        :per-page="pageNavInfo.countPerPage"
                        hide-ellipsis
                        @change="changePage"
                        align="center"
                    ></b-pagination>

                    <!-- 관광지 검색 end -->
                    <!-- 중앙 center content end -->
                </div>
                <!-- 중앙 right content start -->
                <div id="rightContent" class="col-md-3" v-show="userInfo">
                    <div>
                        <add-planlist
                            :scheduleId="scheduleId"
                            ref="planList"
                        ></add-planlist>
                    </div>
                </div>
                <div class="col-md-1"></div>
                <!-- 중앙 right content end -->
            </div>
            <!-- 중앙 content end -->

            <!-- Modal -->
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
    </div>
</template>

<script>
import AddPlanlist from "@/components/tour/AddPlanlist.vue";
import KakaoMap from "@/components/tour/KakaoMap.vue";
import HeroSection from "@/components/HeroSection.vue";
import PlaceDetailModal from "@/components/tour/PlaceDetailModal.vue";
import { mapState, mapGetters } from "vuex";
import { apiInstance } from "@/api/http";

const memberStore = "memberStore";
const api = apiInstance();

export default {
    name: "TourInfoView",
    data() {
        return {
            heroSectionTitle: "전국 관광지 정보",
            placesData: [], // Your data array containing the place objects
            fields: [
                // { key: "image", label: "대표이미지" },
                { key: "index", label: "No" },
                { key: "name", label: "관광지명" },
                { key: "address", label: "주소" },
                { key: "detail", label: "" },
                { key: "actions", label: "", sortable: false },
            ],
            pageNavInfo: {
                currentPage: 1,
                startPage: -1,
                totalCount: -1,
                totalPageCount: -1,
                naviSize: 5,
                countPerPage: 10,
                hasPrevNav: false,
                hasNextNav: false,
            },
            map: null,
            userSelection: [],
            positions: [],
            linePath: [],
            places: [],
            visited: [],
            cnt: 1,
            modalContentId: null,
            sido: "0",
            gugun: "0",
            hideTable: false,
            // 여행계획을 수정할 때만 null이 아님
            modify: null,
            scheduleId: null,
        };
    },
    created() {
        this.getSido();
        // route의 params가 있다면 여행 계획 수정으로 들어온것
        // from ScheduleDetail
        this.modify = this.$route.params.modify;
        if (this.modify) {
            this.heroSectionTitle = "여행 계획 수정하기";
            this.scheduleId = this.$route.params.scheduleId;
        }
    },
    computed: {
        ...mapState(memberStore, ["isLogin", "userInfo"]),
        ...mapGetters(["checkUserInfo"]),
    },
    components: {
        AddPlanlist,
        KakaoMap,
        HeroSection,
        PlaceDetailModal,
    },
    methods: {
        showDetailModal(contentId) {
            this.modalContentId = contentId;
            this.$bvModal.show("detail-modal");
        },
        callAddPlan(item) {
            this.callMoveCenter(item);
            this.$refs.planList.addPlan(item.title, item.contentId);
        },
        setCursorPointer() {
            this.$refs.cursorImage.style.cursor = "pointer";
        },
        callMoveCenter(item) {
            const kakaoMap = this.$refs.map;
            kakaoMap.moveCenter(item.latitude, item.longitude);
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
            if (this.sido === "0") {
                alert("시/도 선택은 필수입니다!!");
                return;
            }

            this.hideTable = true;
            this.pageNavInfo.currentPage = 1;
            this.changePage(this.pageNavInfo.currentPage);
        },
        makeSearchUrl(page) {
            let areaCode = this.sido;
            let gugunCode = this.gugun;
            let contentTypeId =
                document.getElementById("search-content-id").value;
            let keyword = document.getElementById("search-keyword").value;
            let searchUrl = "/attraction/?";

            searchUrl += "sidoCode=" + areaCode;
            searchUrl += "&gugunCode=" + gugunCode;
            searchUrl += "&contentTypeId=" + contentTypeId;
            searchUrl += "&keyword=" + keyword;
            searchUrl += "&pageNo=" + page;
            return searchUrl;
        },
        changePage(page) {
            let searchUrl = this.makeSearchUrl(page);

            this.positions = [];
            api.get(searchUrl).then(({ data }) => {
                data.attractionList.forEach((area) => {
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

                if (this.positions.length > 0) {
                    this.hideTable = true;
                    this.placesData = data.attractionList;
                    this.pageNavInfo = data.pageNav;
                    this.$refs.map.displayMarker(this.positions);
                } else {
                    alert("검색하신 데이터가 존재하지 않습니다");
                }
            });
        },
    },
};
</script>

<style scoped>
.userselect {
    height: 60px;
}
</style>
