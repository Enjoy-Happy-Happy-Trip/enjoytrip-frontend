<template>
    <div id="app">
        <nav-bar></nav-bar>
        <router-view />
        <footer-section></footer-section>
    </div>
</template>
<script>
import NavBar from "@/components/NavBar.vue";
import FooterSection from "./components/FooterSection.vue";

export default {
    name: "App",
    components: {
        NavBar,
        FooterSection,
    },
};
</script>
<style></style>
