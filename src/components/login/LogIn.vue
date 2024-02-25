<template>
  <form @submit.prevent>
    <h1>Log In</h1>

    <div class="row g-3 align-items-center">
      <div class="col-auto mx-auto d-block">
        <input
          type="email"
          class="form-control"
          placeholder="Enter Your Email"
          v-model="email"
        />
      </div>
    </div>
    <br />

    <div class="row g-3 align-items-center">
      <div class="col-auto mx-auto d-block">
        <input
          type="password"
          class="form-control"
          placeholder="Enter Your Password"
          v-model="password"
        />
      </div>
    </div>
    <br />

    <div class="row g-3 align-items-center">
      <div class="col-auto mx-auto d-block">
        <button type="submit" class="btn btn-primary">Log In</button>
        &nbsp;&nbsp;&nbsp;
        <button
          type="button"
          class="btn btn-secondary"
          @click="redirectPage('sign-up')"
        >
          Sign Up
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "log-in",
  data: function () {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["redirectPage"]),
  },
};
</script>

<style></style>
