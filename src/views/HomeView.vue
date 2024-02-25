<template>
  <div class="home">
    <navbar />
    <p class="text-end">
      Welcome {{ userInfo.name }}
      <router-link :to="{ path: '/Profile' }">
        <button class="btn btn-info" type="button">Profile</button>
      </router-link>
    </p>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapGetters } from "vuex";
import Navbar from "@/components/header/Navbar.vue";

export default {
  name: "HomeView",
  components: {
    Navbar,
  },

  mounted() {
    const user = localStorage.getItem("userInfo");
    if (!user) {
      this.redirectPage("/sign-up");
    }
  },
  methods: {
    ...mapActions(["redirectPage"]),
    ...mapGetters(["getUserInfo"]),
  },
  computed: {
    userInfo() {
      return this.getUserInfo();
    },
  },
};
</script>
