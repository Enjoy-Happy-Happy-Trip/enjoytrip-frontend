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
                <form
                    class="d-flex my-3"
                    onsubmit="return false;"
                    role="search"
                >
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
                <div id="map"></div>
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
                        <tbody id="trip-list"></tbody>
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

        <!-- 모달 창을 위한 HTML 코드 START-->
        <div id="review-modal" class="hidden custom-modal">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div id="modal-content-id" class="hidden"></div>
                <h2 id="modal-content-title"></h2>
                <div class="modal-body">
                    <div class="mb-3">
                        <div id="modal-content-id" style="display: none"></div>
                        <div id="modal-content-title"></div>
                        <label for="loginid" class="form-label"
                            >리뷰 쓰기</label
                        >
                        <input
                            type="text"
                            class="form-control"
                            id="review"
                            placeholder="간단한 리뷰를 써주세요"
                        />
                    </div>
                </div>
                <div>
                    <button id="review-submit-btn" class="btn btn-primary">
                        리뷰 등록
                    </button>
                    <button id="modal-close" class="btn btn-danger">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AddPlanlist from "@/components/AddPlanlist.vue";
import http from "@/api/http";

export default {
    name: "TourInfoView",
    data() {
        return {
            planListFlag: false,
            map: null,
            userSelection: [],
            markers: [],
            positions: [],
            linePath: [],
            places: [],
            visited: [],
            cnt: 1,
        };
    },
    mounted() {
        if (window.kakao && window.kakao.maps) {
            this.loadMap();
        } else {
            this.loadScript();
        }
    },
    created() {
        this.getApisData();
    },
    components: {
        AddPlanlist,
    },
    methods: {
        /*
        공지사항
        롤 부여
        여행 계획 -> 순서 변경
        후기 작성
        */
        getApisData() {
            // index page 로딩 후 전국의 시도 설정.
            let areaUrl =
                "https://apis.data.go.kr/B551011/KorService1/areaCode1?serviceKey=" +
                this.$store.state.serviceKey +
                "&numOfRows=20&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json";

            http.get(areaUrl)
                .then(({ data }) => this.makeOption(data))
                .catch((error) => {
                    console.log(error);
                });
        },
        moveCenter(lat, lng) {
            this.map.setCenter(new window.kakao.maps.LatLng(lat, lng));
        },
        makeOption(data) {
            let areas = data.response.body.items.item;
            // console.log(areas);
            let sel = document.getElementById("search-area");
            areas.forEach((area) => {
                let opt = document.createElement("option");
                opt.setAttribute("value", area.code);
                opt.appendChild(document.createTextNode(area.name));

                sel.appendChild(opt);
            });
        },
        loadScript() {
            const script = document.createElement("script");
            script.src =
                "//dapi.kakao.com/v2/maps/sdk.js?appkey=a064e831e69034e8ae072ff565553863&libraries=services,clusterer,drawing&autoload=false";
            script.onload = () => window.kakao.maps.load(this.loadMap);

            document.head.appendChild(script);
        },
        loadMap() {
            const container = document.getElementById("map");
            const options = {
                center: new window.kakao.maps.LatLng(33.450701, 126.570667),
                level: 3,
            };

            this.map = new window.kakao.maps.Map(container, options);
            var locPosition = null;

            // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
            if (navigator.geolocation) {
                // GeoLocation을 이용해서 접속 위치를 얻어옵니다
                navigator.geolocation.getCurrentPosition(function (position) {
                    var lat = position.coords.latitude, // 위도
                        lon = position.coords.longitude; // 경도

                    locPosition = new window.kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다            this.map.setCenter(locPosition);
                    alert(locPosition);

                    this.map.setCenter(locPosition);
                });
            }
        },
        createPlanList() {
            this.planListFlag = true;
        },
        searchDataByKeyword() {
            let searchUrl = this.makeSearchUrl();

            http.get(searchUrl).then(({ data }) => {
                this.makeList(data);
            });
        },
        displayMarker() {
            // 마커 이미지의 이미지 주소입니다
            // var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
            var bounds = new window.kakao.maps.LatLngBounds();

            for (var i = 0; i < this.positions.length; i++) {
                // 마커를 생성합니다
                let marker = new window.kakao.maps.Marker({
                    map: this.map, // 마커를 표시할 지도
                    position: this.positions[i].latlng, // 마커를 표시할 위치
                    title: this.positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                    text: "marker",
                });

                this.markers.push(marker);
                bounds.extend(this.positions[i].latlng);
            }

            // 생성된 마커들의 위치를 기준으로 맵을 움직입니다.
            this.map.setBounds(bounds);
        },
        makeSearchUrl() {
            let areaCode = document.getElementById("search-area").value;
            let contentTypeId =
                document.getElementById("search-content-id").value;
            let keyword = document.getElementById("search-keyword").value;
            let searchUrl = "/attraction/attractionlist?";

            searchUrl += "sidoCode=" + areaCode;
            searchUrl += "&contentTypeId=" + contentTypeId;
            searchUrl += "&keyword=" + keyword;
            return searchUrl;
        },
        displayModal() {
            const modal = document.querySelector("#review-modal");
            modal.classList.toggle("hidden");
        },
        makeList(data) {
            var count = 0;

            document.querySelector("table").setAttribute("style", "display: ;");
            let tripList = ``;
            if (this.markers != null) {
                for (let i = 0; i < this.markers.length; i++) {
                    this.markers[i].setMap(null);
                }
            }

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
			  <td><button class="review-btn btn btn-warning scrollto">Reivew 쓰기</button></td>
            </tr>
          `;

                let markerInfo = {
                    title: area.title,
                    contenttypeid: area.contentTypeId,
                    latlng: new window.kakao.maps.LatLng(
                        area.latitude,
                        area.longitude
                    ),
                };
                //<button id="btn-select" class="btn btn-outline-success" type="button">선택</button>
                this.positions.push(markerInfo);
            });
            
            document.getElementById("trip-list").innerHTML = tripList;
            this.displayMarker();

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
                userSelection[i].addEventListener("click", function () {
                    if (visited[i] == 0) {
                        visited[i] = 1;

                        let areaTitle = document.getElementById(
                            "areaTitle" + i
                        ).innerHTML;

                        this.places.push(areaTitle);

                        let content = "";
                        content += this.cnt++;
                        content += ". ";
                        content += areaTitle;
                        content += "<br>";

                        planListDetail.innerHTML += content;
                        console.log(areaTitle);
                    }
                });
            }
        },
    },
};
</script>

<style scoped>
#map {
    width: 100%;
    height: 500px;
}
</style>
