<template>
    <div class="container" style="max-width: 100% !important">
        <div style="height: 70px"></div>
        <div class="alert alert-primary mt-3 text-center fw-bold" role="alert">
            전국 관광지 정보
        </div>
        <div class="row">
            <div class="col-md-2"></div>
            <!-- 중앙 center content end -->
            <div class="col-md-6">
                <!-- 관광지 검색 start -->
                <form class="d-flex my-3" onsubmit="return false;" role="search">
                    <select id="search-area" class="form-select me-2">
                        <option value="0" selected>검색 할 지역 선택</option>
                    </select>
                    <select id="search-content-id" class="form-select me-2">
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
                    <input
                        id="search-keyword"
                        class="form-control me-2"
                        type="search"
                        placeholder="검색어"
                        aria-label="검색어"
                    />
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
                <kakao-map ref="map" :positions="positions" @map-updated="updateMap"></kakao-map>
                <!-- kakao map end -->
                <div class="row">
                    <table class="table table-striped" style="display: none">
                        <thead>
                            <tr>
                                <th>대표이미지</th>
                                <th>관광지명</th>
                                <th>주소</th>
                                <th></th>
                                <th>Review 쓰기</th>
                            </tr>
                        </thead>
                        <tbody id="trip-list">
                            <result-list
                                v-for="(place, index) in placesData"
                                :place="place"
                                :key="place.contentId"
                                :index="index"
                                @move-center="moveCenter"
                                @show-modal="showModal"
                            >
                            </result-list>
                        </tbody>
                    </table>
                </div>
                <!-- 관광지 검색 end -->
                <!-- 중앙 center content end -->
            </div>
            <!-- 중앙 right content start -->
            <div id="rightContent" class="col-md-4">
                <button
                    id="btn-plan"
                    class="d-flex my-3 btn btn-outline-danger"
                    @click="createPlanList"
                >
                    새 계획 만들기
                </button>
                <div v-if="this.planListFlag">
                    <add-planlist></add-planlist>
                </div>
            </div>
            <!-- 중앙 right content end -->
        </div>
        <!-- 중앙 content end -->

        <!-- Modal -->
        <b-modal id="review-modal" title="리뷰 쓰기">
            <tour-review-modal :title="modalTitle"></tour-review-modal>
        </b-modal>
    </div>
</template>

<script>
import AddPlanlist from "@/components/AddPlanlist.vue";
import KakaoMap from "@/components/KakaoMap.vue";
import ResultList from "@/components/ResultList.vue";
import TourReviewModal from "@/components/TourReviewModal.vue";
import { apiInstance } from '@/api/http';

const api = apiInstance();

export default {
    name: "TourInfoView",
    data() {
        return {
            planListFlag: false,
            map: null,
            placesData: Object,
            userSelection: [],
            positions: [],
            markers: [],
            linePath: [],
            places: [],
            visited: [],
            cnt: 1,
            modalTitle: null,
        };
    },
    components: {
        AddPlanlist,
        KakaoMap,
        ResultList,
        TourReviewModal,
    },
    methods: {
        moveCenter(latitude, longitude) {
            this.map.setCenter(new window.kakao.maps.LatLng(latitude, longitude));
        },
        createPlanList() {
            this.planListFlag = true;
        },
        updatePositions(newPositions) {
            this.positions = newPositions;
        },
        searchDataByKeyword() {
            this.positions = [];
            document.querySelector("table").setAttribute("style", "display: ;");

            console.log(this.positions);

            let searchUrl = this.makeSearchUrl();

            api.get(searchUrl).then(({ data }) => {
                this.placesData = data;

                data.forEach((area) => {
                    let markerInfo = {
                        title: area.title,
                        contenttypeid: area.contentTypeId,
                        latlng: new window.kakao.maps.LatLng(area.latitude, area.longitude),
                    };
                    this.positions.push(markerInfo);
                });

                this.$refs.map.displayMarker(this.positions);

                // this.makeList(data);
            });
        },
        updateMap(map) {
            this.map = map;
        },
        makeSearchUrl() {
            let areaCode = document.getElementById("search-area").value;
            let contentTypeId = document.getElementById("search-content-id").value;
            let keyword = document.getElementById("search-keyword").value;
            let searchUrl = "/attraction/attractionlist?";

            searchUrl += "sidoCode=" + areaCode;
            searchUrl += "&contentTypeId=" + contentTypeId;
            searchUrl += "&keyword=" + keyword;
            return searchUrl;
        },
        makeList(data) {
            var count = 0;

            document.querySelector("table").setAttribute("style", "display: ;");
            let tripList = ``;

            this.markers = [];
            this.positions = [];
            this.linePath = [];

            data.forEach((area) => {
                tripList += `
            <tr @click="moveCenter(${area.latitude}, ${area.longitude});">
				<td class="content-id" style="display:none">${area.contentId}</td>
              <td><img src="${area.firstImage}" width="100px"></td>
              <td id="areaTitle${count}">${area.title}</td>
              <td>${area.addr}</td>
              <td><button id=${count++} class="add-btn btn btn-warning">추가</button></td>
			  <td><b-button v-b-modal.review-modal class="btn btn-warning">Reivew 쓰기</b-button></td>
            </tr>
          `;
            });

            document.getElementById("trip-list").innerHTML = tripList;

            // 지도에 표시할 선을 생성합니다
            var polyline = new window.kakao.maps.Polyline({
                path: this.linePath, // 선을 구성하는 좌표배열 입니다
                strokeWeight: 5, // 선의 두께 입니다
                strokeColor: "#FFAE00", // 선의 색깔입니다
                strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                strokeStyle: "solid", // 선의 스타일입니다
            });

            polyline.setMap(this.map);

            var userSelection = document.getElementsByClassName("add-btn");

            var planListDetail = document.getElementById("planListDetail");

            var visited = [];

            for (let i = 0; i < userSelection.length; i++) {
                visited.push(0);
            }

            for (let i = 0; i < userSelection.length; i++) {
                userSelection[i].addEventListener(
                    "click",
                    function () {
                        if (visited[i] == 0) {
                            visited[i] = 1;

                            let areaTitle = document.getElementById("areaTitle" + i).innerHTML;

                            this.places.push(areaTitle);

                            let content = "";
                            content += this.cnt++;
                            content += ". ";
                            content += areaTitle;
                            content += "<br>";

                            planListDetail.innerHTML += content;
                            console.log(areaTitle);
                        }
                    }.bind(this)
                );
            }
        },
        showModal(title) {
            this.modalTitle = title;
            this.$bvModal.show("review-modal");
        },
    },
};
</script>

<style scoped></style>
