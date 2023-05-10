<template>
    <div id="app">
        <nav-view></nav-view>
        <router-view />
    </div>
</template>
<script>
import NavView from "@/components/nav.vue";

export default{
  name: "App",
  components : {
    NavView,
  },
}
</script>
<style></style>
