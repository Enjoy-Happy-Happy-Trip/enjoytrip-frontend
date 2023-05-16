<template>
    <div id="map" ref="map"></div>
</template>

<script>
import http from "@/api/http";

export default {
    name: "KakaoMap",
    props: {
        positions: [],
    },
    data() {
        return {
            map: null,
            markers: [],
        };
    },
    mounted() {
        if (window.kakao && window.kakao.maps) {
            this.loadMap();
        } else {
            this.loadScript();
        }

        this.$emit("map-updated", this.map);
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
        displayMarker(positions) {
            // 마커 이미지의 이미지 주소입니다
            // var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
            var bounds = new window.kakao.maps.LatLngBounds();

            if (this.markers != null) {
                for (let i = 0; i < this.markers.length; i++) {
                    this.markers[i].setMap(null);
                }
            }

            for (let i = 0; i < positions.length; i++) {
                // 마커를 생성합니다
                let marker = new window.kakao.maps.Marker({
                    map: this.map, // 마커를 표시할 지도
                    position: positions[i].latlng, // 마커를 표시할 위치
                    title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                    text: "marker",
                });

                this.markers.push(marker);
                bounds.extend(positions[i].latlng);
            }

            // 생성된 마커들의 위치를 기준으로 맵을 움직입니다.
            this.map.setBounds(bounds);
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
                "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=a064e831e69034e8ae072ff565553863&libraries=services,clusterer,drawing";
            script.onload = () => window.kakao.maps.load(this.loadMap);

            document.head.appendChild(script);
        },
        loadMap() {
            let myLocation = new window.kakao.maps.LatLng(33.450701, 126.570667);

            // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
            if (navigator.geolocation) {
                // GeoLocation을 이용해서 접속 위치를 얻어옵니다
                navigator.geolocation.getCurrentPosition(
                    function (position) {
                        var lat = position.coords.latitude, // 위도
                            lon = position.coords.longitude; // 경도

                        myLocation = new window.kakao.maps.LatLng(lat, lon);

                        const container = document.getElementById("map");
                        const options = {
                            center: myLocation,
                            level: 3,
                        };

                        this.map = new window.kakao.maps.Map(container, options);

                        // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
                        var zoomControl = new window.kakao.maps.ZoomControl();
                        this.map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

                        if (this.markers.length > 0) {
                            this.displayMarker(this.positions);
                        }
                    }.bind(this)
                );
            } else {
                const container = document.getElementById("map");
                const options = {
                    center: myLocation,
                    level: 3,
                };

                this.map = new window.kakao.maps.Map(container, options);

                if (this.markers.length > 0) {
                    this.displayMarker(this.positions);
                }
            }
        },
    },
};
</script>

<style scoped>
#map {
    width: 100%;
    height: 500px;
    z-index: 1;
}
</style>
