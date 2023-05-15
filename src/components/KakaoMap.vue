<template>
    <div id="map"></div>
</template>

<script>
import http from "@/api/http";

export default {
    name: "KakaoMap",
    data() {
        return {
            map: null,
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
    },
};
</script>

<style scoped>
#map {
    width: 100%;
    height: 500px;
}
</style>
