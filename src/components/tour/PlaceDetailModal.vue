<template>
    <div>
        <div class="modal-background"></div>
        <div class="modal-content">
            <div id="modal-content-id" class="hidden"></div>
            <h2 id="modal-content-title"></h2>
            <div class="modal-body">
                <div class="mb-3">
                    <div id="modal-content-id" style="display: none"></div>
                    <div id="modal-content-title"></div>
                    <b-card
                        class="attraction-card"
                        :img-src="
                            attraction.firstImage
                                ? attraction.firstImage
                                : require('@/assets/No_image_available.png')
                        "
                        img-top
                        tag="article"
                    >
                        <b-card-text>
                            <h1>{{ attraction.title }}</h1>
                            <h4>{{ attraction.addr }}</h4>
                            <p>{{ attraction.overview }}</p>
                        </b-card-text>
                    </b-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { apiInstance } from '@/api/http';

const api = apiInstance();

export default {
    name: "PlaceDetailModal",
    components: {},
    props: {
        contentId: Number,
    },
    data() {
        return {
            attraction: {},
        };
    },
    created() {
        api.get(`attraction/${this.contentId}`)
            .then(({data}) => {
                this.attraction = data;
            })
            .catch((error) => {
                console.log(error);
            })
    },
    methods: {},
};
</script>

<style>
.modal-dialog {
    min-width: 50%;
}
</style>
