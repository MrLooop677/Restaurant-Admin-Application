<template>
  <div>
    <br />
    <div class="text-center">
      <router-link :to="{ path: '/' }">
        <button class="btn btn-info">Visit Home Page</button>
      </router-link>
    </div>
    <br />
    <img
      src="https://internetdevels.com/sites/default/files/public/blog_preview/404_page_cover.jpg"
      class="rounded mx-auto d-block h400"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "error-page",
  mounted() {
    this.setUserInfo();
    if (!this.getUserInfo().name) {
      this.redirectPage("/sign-up");
    }
  },
  methods: {
    ...mapMutations(["setUserInfo"]),
    ...mapGetters(["getUserInfo"]),
    ...mapActions(["redirectPage"]),
  },
};
</script>

<style>
.h400 {
  height: 400px;
}
</style>
