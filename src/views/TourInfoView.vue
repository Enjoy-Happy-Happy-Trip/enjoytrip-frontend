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
                    >
                        검색
                    </button>
                </form>

                <!-- kakao map start -->
                <div
                    id="map"
                    class="mt-3"
                    style="width: 100%; height: 500px"
                ></div>
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
                >
                    새 계획 만들기
                </button>
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
export default {
    name: "TourInfoView",
};
</script>



