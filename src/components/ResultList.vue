<template>
    <tr @click="moveCenter(place.latitude, place.longitude)">
        <td class="content-id" style="display: none">{{ place.contentId }}</td>
        <td><img :src="place.firstImage" width="100px" /></td>
        <td>{{ place.title }}</td>
        <td>{{ place.addr }}</td>
        <td>
            <button :id="index" class="add-btn btn btn-warning">추가</button>
        </td>
        <td>
            <button class="review-btn btn btn-warning scrollto">
                Reivew 쓰기
            </button>
        </td>
    </tr>
</template>

<script>
export default {
    name: "ResultList",
    data() {
        return {
            linePath: [],
        };
    },
    props: {
        place: {},
        index: Number,
    },
    methods: {
        moveCenter(latitude, longitude) {
            this.$emit("move-center", latitude, longitude);
        }
    },
};
</script>
