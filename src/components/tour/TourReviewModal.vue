<template>
    <!-- 모달 창을 위한 HTML 코드 START-->
    <div>
        <h3>관광지 : {{ title }}</h3>
        <div class="modal-background"></div>
        <div class="modal-content">
            <div id="modal-content-id" class="hidden"></div>
            <h2 id="modal-content-title"></h2>
            <div class="modal-body">
                <div class="mb-3">
                    <div id="modal-content-id" style="display: none"></div>
                    <div id="modal-content-title"></div>
                    <label for="loginid" class="form-label">리뷰 쓰기</label>
                    <input
                        type="text"
                        class="form-control"
                        id=""
                        placeholder="간단한 리뷰를 써주세요"
                        v-model="reviewText"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    props: {
        title: String,
    },
    data() {
        return {
            reviewText: "",
        };
    },
    created() {},
    methods: {
        getReview() {
            return this.reviewText;
        }
    },
};
</script>

<style scoped>
/* #review-modal {
    z-index: 2;
}

.custom-modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.modal-background {
    background-color: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100%;
    position: absolute;
}

.modal-content {
    text-align: center;
    position: relative;
    background-color: white;
    border-radius: 10px;
    top: 0;
    padding: 10px 25px;
    width: 80%;
}

.hidden {
    display: none;
} */
</style>
