<template>
    <!-- 모달 창을 위한 HTML 코드 START-->
    <div>
        <div class="modal-background"></div>
        <div class="modal-content">
            <div id="modal-content-id" class="hidden"></div>
            <h2 id="modal-content-title"></h2>
            <div class="modal-body">
                <div class="mb-3">
                    <div id="modal-content-id" style="display: none"></div>
                    <div id="modal-content-title"></div>
                    <input
                        type="text"
                        class="form-control"
                        placeholder="일정 제목을 정해주세요"
                        v-model="plan_title"
                    />
                    <b-form-textarea
                        type="text"
                        class="plandesc mt-3"
                        id=""
                        placeholder="여행 일정에 대한 설명을 적어주세요"
                        v-model="plan_desc"
                    ></b-form-textarea>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            plan_title: "",
            plan_desc: "",
        };
    },
    created() {},
    methods: {
        getPlanTitle() {
            return this.plan_title;
        },
        getPlanDesc() {
            return this.plan_desc;
        },
    },
};
</script>

<style scoped>
.plandesc {
    height: 150px;
}
</style>
