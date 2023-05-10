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
                            @submit.prevent="submitForm"
                            data-aos="fade-up"
                            data-aos-delay="200"
                        >
                            <div class="row justify-content-center">
                                <div class="col-6">
                                    <div class="form-group">
                                        <label class="text-black" for="user_id">ID</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="user_id"
                                            v-model="id"
                                        />
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="form-group">
                                        <label class="text-black" for="user_password"
                                            >Password</label
                                        >
                                        <input
                                            type="password"
                                            class="form-control"
                                            id="user_password"
                                            v-model="password"
                                        />
                                    </div>
                                </div>
                                <p class="login-error-msg">{{ this.loginErrorMsg }}</p>

                                <!-- 버튼을 누르면 input에 있는 데이터들이 back으로 가 로그인 요청을 하고 로그인이 된다면 home vue로 가야 함 -->
                                <button type="submit" class="btn btn-primary btn-lg btn-block">
                                    Sign In
                                </button>
                                <a :href="this.$backUrl('/member/findpassword.jsp')"
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
import { URL_BACKEND as URL } from "./constant/url";
import axios from "axios";

export default {
    name: "LoginView",
    data() {
        return {
            message: "",
            url: URL,
            id: "",
            password: "",
            loginErrorMsg: "",
        };
    },
    created() {},
    methods: {
        submitForm() {
            axios({
                method: "POST",
                url: this.$backUrl("/member/loginaf"),
                data: {
                    user_id: this.id,
                    user_password: this.password,
                },
            })
                .then((response) => {
                    this.login(response.data);
                    this.$router.replace("/");
                })
                .catch((error) => {
                    if (error.response.status === 401) {
                        console.log("잘못된 ID 또는 password를 입력하셨습니다.");
                        this.loginErrorMsg = "잘못된 ID 또는 password를 입력하셨습니다.";
                    }
                });
        },
        login(user) {
            this.$store.commit("LOGIN", user);
        },
    },
};
</script>

<style scoped>
.login-error-msg {
    color: red;
}
</style>
