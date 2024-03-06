<template>
  <div class="home">
    <navbar />
    <p class="text-end">
      Welcome {{ userName }}
      <router-link :to="{ path: '/Profile' }">
        <button class="btn btn-info" type="button">Profile</button>
      </router-link>
    </p>
    <AddLocation />
    <br />
    <user-location :listOfLocations="listOfLocations" />
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapGetters, mapMutations } from "vuex";
import Navbar from "@/components/header/Navbar.vue";
import AddLocation from "@/components/location/AddLocation.vue";
import { getLocation } from "@/services/api/add-location";
import UserLocation from "@/components/user-location/UserLocation.vue";

export default {
  name: "HomeView",
  components: {
    Navbar,
    AddLocation,
    UserLocation,
  },
  data() {
    return {
      listOfLocations: [],
    };
  },
  mounted() {
    this.setUserInfo();

    this.getAllLocations();
  },
  methods: {
    ...mapActions(["redirectPage"]),
    ...mapMutations(["setUserInfo"]),
    ...mapGetters(["getUserInfo"]),
    userInfo() {
      return this.getUserInfo();
    },
    async getAllLocations() {
      try {
        const allLocations = await getLocation(this.getUserInfo()?.id);
        this.listOfLocations = [...allLocations.data];
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  computed: {
    // ...mapGetters(["getUserInfo"]),
    userName() {
      const userInfo = this.getUserInfo().name;
      if (userInfo) {
        return userInfo;
      } else {
        this.redirectPage("/sign-up");
        return ""; // or any default value you want
      }
    },
  },
};
</script>
