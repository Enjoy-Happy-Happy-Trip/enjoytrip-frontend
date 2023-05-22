<template>
    <div>
        <div class="hero hero-inner">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-6 mx-auto text-center">
                        <div class="intro-wrap">
                            <h1 class="mb-0">핫플레이스 TOP100</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container mt-4">
            <div class="row">
                <div
                    class="col-12 col-md-6 col-lg-4 col-xl-3"
                    v-for="(hotplace, index) in hotplaces"
                    :key="index"
                >
                    <div class="hotplace-card">
                        <div class="hotplace-image">
                            <img :src="hotplace.firstImage ? hotplace.firstImage : require('@/assets/No_image_available.png')" />
                        </div>
                        <div class="hotplace-details" style="min-height: 200px; max-height:300px">
                            <h4>{{ hotplace.title }}</h4>
                            <p>{{ hotplace.addr }}</p>
                            <p class="review-count">추천수 : {{ hotplace.review_count }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { apiInstance } from "@/api/http";

const api = apiInstance();

export default {
    name: "HotPlaceList",
    data() {
        return {
            hotplaces: [],
        };
    },
    created() {
        api.get(`/place/hotplace`)
            .then(({ data }) => {
                this.hotplaces = data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
};
</script>

<style>
.hotplace-card {
    margin-bottom: 20px;
    border: 3px solid #cbeaff;
    padding: 10px;
    position: relative;
}

.hotplace-image img {
    width: 100%;
    height: 200px;
}

.hotplace-details {
    margin-top: 10px;
}

.review-count {
  position: absolute;
  bottom: 5px;
  right: 5px;
  background-color: #fff;
  padding: 5px;
}

</style>
