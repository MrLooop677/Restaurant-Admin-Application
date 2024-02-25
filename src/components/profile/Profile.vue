<template>
  <div class="container">
    <navbar />
    <form @click.prevent>
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <h1>Your Profile</h1>
        </div>
      </div>
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <div class="form-floating mb-3">
            <input
              disabled
              type="text"
              class="w250 form-control"
              id="floatNameIs"
              placeholder="Your Name Is"
              v-model.trim="name"
            />
            <label for="floatNameIs">Your Name Is</label>
          </div>
        </div>
      </div>
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <div class="form-floating mb-3">
            <input
              disabled
              type="email"
              class="w250 form-control"
              id="floatEmailIs"
              placeholder="Your Email Is"
              v-model.trim="email"
            />
            <label for="floatEmailIs">Your Email Is</label>
          </div>
        </div>
      </div>
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <div class="form-floating mb-3">
            <input
              disabled
              type="password"
              class="w250 form-control"
              id="floatPassIs"
              placeholder="Your Password Is"
              v-model.trim="password"
            />
            <label for="floatPassIs">Your Password Is</label>
          </div>
        </div>
      </div>
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <button type="submit" class="w250 btn btn-primary">
            Update My Profile Info
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Navbar from "../header/Navbar.vue";
export default {
  components: { Navbar },
  name: "profile-comp",

  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  mounted() {
    this.setUserInfo();
    this.setUserData();
  },
  methods: {
    ...mapMutations(["setUserInfo"]),
    ...mapGetters(["getUserInfo"]),
    setUserData() {
      this.name = this.getUserInfo().name;
      this.email = this.getUserInfo().email;
      this.password = this.getUserInfo().password;
    },
  },
};
</script>

<style></style>
