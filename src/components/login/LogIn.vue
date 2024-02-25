<template>
  <form @submit.prevent="submitForm">
    <h1>Log In</h1>
    <div class="row g-3 align-items-center">
      <div class="col-auto mx-auto d-block">
        <input
          type="text"
          class="form-control"
          placeholder="Enter Your Name"
          v-model.trim="$v.name.$model"
        />
        <div class="text-danger" v-if="$v.name.$dirty && !$v.name.required">
          Name is required
        </div>
        <div class="text-danger" v-if="$v.name.$dirty && !$v.name.minLength">
          Name must have at least {{ $v.name.$params.minLength.min }} letters.
        </div>
      </div>
    </div>
    <br />
    <div class="row g-3 align-items-center">
      <div class="col-auto mx-auto d-block">
        <input
          type="email"
          class="form-control"
          placeholder="Enter Your Email"
          v-model.trim="$v.email.$model"
        />
      </div>
      <span class="error-feedback mt-2 text-danger" v-if="$v.email.$error">
        Email is required
      </span>
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
        <br />

        <div class="error-feedback mt-2 text-danger" v-if="emailNotFound">
          {{ emailNotFound }}
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import { required, email, minLength } from "vuelidate/lib/validators";
import { logInUser } from "@/services/api/auth";

export default {
  name: "log-in",
  data() {
    return {
      name: "",
      email: "",
      emailNotFound: "",
    };
  },
  mounted() {
    const user = localStorage.getItem("userInfo");
    if (user) {
      this.redirectPage("/");
    }
  },
  validations: {
    name: { required, minLength: minLength(4) },

    email: { required, email },
  },
  methods: {
    ...mapActions(["redirectPage"]),
    ...mapMutations(["setUserInfo"]),

    async submitForm() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        console.log("Form submitted successfully");
        try {
          const data = await logInUser(`name=${this.name}&email=${this.email}`);
          console.log(data);
          if (data?.status === 200 && data?.data?.length) {
            localStorage.setItem("userInfo", JSON.stringify(data?.data[0]));
            this.setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
            this.name = "";
            this.email = "";
            this.password = "";
            this.repeatPassword = "";
            this.$router.push({ path: "/" });
          } else {
            this.emailNotFound = "email not found";
          }
        } catch (error) {
          console.error("Error creating user:", error);
          throw error;
        }
      } else {
        console.log("Form submission failed");
      }
    },
  },
};
</script>

<style></style>
