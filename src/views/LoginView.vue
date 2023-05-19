<template>
    <div>
        <div class="hero hero-inner">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-6 mx-auto text-center">
                        <div class="intro-wrap">
                            <h1 class="mb-0">Sign In And Get Started!</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="untree_co-section">
            <div class="container">
                <div class="row justify-content-center">
                    <div>
                        <form
                            class="signin-form"
                            data-aos="fade-up"
                            data-aos-delay="200"
                        >
                            <div class="row justify-content-center">
                                <div class="col-6">
                                    <div class="form-group">
                                        <label class="text-black" for="user_id"
                                            >ID</label
                                        >
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="user_id"
                                            v-model="user.user_id"
                                        />
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="form-group">
                                        <label
                                            class="text-black"
                                            for="user_password"
                                            >Password</label
                                        >
                                        <input
                                            type="password"
                                            class="form-control"
                                            id="user_password"
                                            v-model="user.user_password"
                                            @keyup.enter="confirm"
                                        />
                                    </div>
                                </div>
                                <p class="login-error-msg">
                                    {{ this.loginErrorMsg }}
                                </p>

                                <!-- 버튼을 누르면 input에 있는 데이터들이 back으로 가 로그인 요청을 하고 로그인이 된다면 home vue로 가야 함 -->
                                <button
                                    type="button"
                                    @click="confirm"
                                    class="btn btn-primary btn-lg btn-block"
                                >
                                    Sign In
                                </button>
                                <a
                                    :href="
                                        this.$backUrl(
                                            '/member/findpassword.jsp'
                                        )
                                    "
                                    >Forgot password?</a
                                >
                            </div>
                        </form>
                        <div class="row justify-content-center">
                            <p class="text-black mt-5">Not a member yet?</p>
                            <button
                                type="button"
                                class="btn btn-primary btn-lg btn-block"
                                onclick="location.href='${root}/member?action=registry'"
                            >
                                Register
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import http from "@/api/http";
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
    name: "LoginView",
    data() {
        return {
            user: {
                user_id: null,
                user_password: null,
            },
            loginErrorMsg: "",
        };
    },
    computed: {
        ...mapState(memberStore, ["isLogin", "isLoginError", "userInfo"]),
    },
    methods: {
        ...mapActions(memberStore, ["userConfirm", "getUserInfo"]),

        async confirm() {
            await this.userConfirm(this.user);
            let token = sessionStorage.getItem("access-token");
            if(this.isLogin) {
                await this.getUserInfo(token);
                this.$router.push({name: "HomeView"});
            } else {
                console.log(
                            "잘못된 ID 또는 password를 입력하셨습니다."
                        );
                        this.loginErrorMsg =
                            "잘못된 ID 또는 password를 입력하셨습니다.";
            }
        },
    },
};
</script>

<style scoped>
.login-error-msg {
    color: red;
}
</style>
