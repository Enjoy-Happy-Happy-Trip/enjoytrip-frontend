<template>
    <div id="map" ref="map"></div>
</template>

<script>
export default {
    name: "KakaoMap",
    props: {
        positions: [],
        attractions: [],
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

        this.$emit("mountComplete");
    },
    methods: {
        /*
			공지사항
			롤 부여
			여행 계획 -> 순서 변경
			후기 작성
			*/
        convertMarker(positions) {
            let markers = [];

            positions.forEach((area) => {
                let markerInfo = {
                    title: area.title,
                    contenttypeid: area.contentTypeId,
                    latlng: new window.kakao.maps.LatLng(
                        area.latitude,
                        area.longitude
                    ),
                };
                markers.push(markerInfo);
            });

            return markers;
        },
        convertLine(positions) {
            let linePath = [];

            positions.forEach((area) => {
                linePath.push(
                    new window.kakao.maps.LatLng(area.latitude, area.longitude)
                );
            });

            return linePath;
        },
        displayLine(linePath) {
            // 지도에 표시할 선을 생성합니다
            var polyline = new window.kakao.maps.Polyline({
                path: linePath, // 선을 구성하는 좌표배열 입니다
                strokeWeight: 10, // 선의 두께 입니다
                strokeColor: "#FF9800", // 선의 색깔입니다
                strokeOpacity: 0.9, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                strokeStyle: "solid", // 선의 스타일입니다
            });

            polyline.setMap(this.map);
        },
        displayMarker(positions) {
            // 마커 이미지의 이미지 주소입니다
            var imageSrc =
                    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png",
                imageSize = new kakao.maps.Size(36, 37); // 마커 이미지의 크기
                
                
            var bounds = new window.kakao.maps.LatLngBounds();

            if (this.markers != null) {
                for (let i = 0; i < this.markers.length; i++) {
                    this.markers[i].setMap(null);
                }
            }

            for (let i = 0; i < positions.length; i++) {
                var imgOptions = {
                    spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
                    spriteOrigin: new kakao.maps.Point(0, i * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
                    offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
                };

                var markerImage = new kakao.maps.MarkerImage(
                    imageSrc,
                    imageSize,
                    imgOptions
                );

                let marker = new window.kakao.maps.Marker({
                    image: markerImage,
                    map: this.map, // 마커를 표시할 지도
                    position: positions[i].latlng, // 마커를 표시할 위치
                    title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                });

                this.markers.push(marker);
                bounds.extend(positions[i].latlng);
            }

            // 생성된 마커들의 위치를 기준으로 맵을 움직입니다.
            this.map.setBounds(bounds);
        },
        moveCenter(lat, lng) {
            this.map.setCenter(new window.kakao.maps.LatLng(lat, lng));
            this.map.setLevel(4);
        },
        loadScript() {
            const script = document.createElement("script");
            script.src =
                "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=a064e831e69034e8ae072ff565553863&libraries=services,clusterer,drawing";
            script.onload = () => window.kakao.maps.load(this.loadMap);

            document.head.appendChild(script);
        },
        loadMap() {
            let myLocation = new window.kakao.maps.LatLng(
                36.2094351238961,
                127.804966782346
            );

            const container = document.getElementById("map");
            const options = {
                center: myLocation,
                level: 13,
            };

            this.map = new window.kakao.maps.Map(container, options);

            // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
            var zoomControl = new window.kakao.maps.ZoomControl();
            this.map.addControl(
                zoomControl,
                window.kakao.maps.ControlPosition.RIGHT
            );

            if (this.markers.length > 0) {
                this.displayMarker(this.positions);
            }

            if (this.attractions) {
                this.displayMarker(this.convertMarker(this.attractions));
                this.displayLine(this.convertLine(this.attractions));
            }
        },
    },
};
</script>

<style scoped>
#map {
    width: 100%;
    height: 700px;
    z-index: 1;
}
</style>
