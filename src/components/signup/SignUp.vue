<template>
  <form @submit.prevent="submitForm">
    <div class="row g-3 align-items-center">
      <h1>Sign Up</h1>
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
        <span
          class="error-feedback mt-2 text-danger"
          v-if="$v.email.$dirty && !$v.email.required"
        >
          email is required
        </span>
      </div>
    </div>
    <br />

    <div class="row g-3 align-items-center">
      <div class="col-auto mx-auto d-block">
        <input
          type="password"
          name="password"
          class="form-control"
          placeholder="Enter Your Password"
          v-model.trim="$v.password.$model"
        />
        <span
          class="error-feedback mt-2 text-danger"
          v-if="$v.password.$dirty && !$v.password.required"
        >
          password is required
        </span>
        <span
          class="error-feedback mt-2 text-danger"
          v-if="$v.password.$dirty && !$v.password.minLength"
        >
          password must be at least 4 characters long
        </span>
        <span
          class="error-feedback mt-2 text-danger"
          v-if="$v.password.$dirty && !$v.password.specialChars"
        >
          Password must contain at least one special character
        </span>
      </div>
    </div>
    <br />
    <div class="row g-3 align-items-center">
      <div class="col-auto mx-auto d-block">
        <input
          type="password"
          class="form-control"
          placeholder="Confirm Your Password"
          v-model.trim="$v.repeatPassword.$model"
        />
        <div
          class="text-danger"
          v-if="$v.repeatPassword.$dirty && !passwordsMatch()"
        >
          Passwords must be identical.
        </div>
      </div>
    </div>

    <br />
    <div class="row g-3 align-items-center">
      <div class="col-auto mx-auto d-block">
        <button type="submit" class="btn btn-primary">Sign Up</button>
        &nbsp;&nbsp;&nbsp;
        <button
          type="button"
          class="btn btn-secondary"
          @click="redirectPage('log-in')"
        >
          Log In
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import { required, email, minLength } from "vuelidate/lib/validators";
import { createNewUser } from "@/services/api/auth";
export default {
  name: "sign-up",
  data: function () {
    return {
      name: "",
      email: "",
      password: "",
    };
  },

  validations: {
    name: { required, minLength: minLength(4) },
    email: { required, email },
    password: {
      required,
      minLength: minLength(4),
      specialChars(value) {
        return this.passwordContainsSpecialChar(value);
      },
    },
    repeatPassword: "",
  },
  mounted() {
    const user = localStorage.getItem("userInfo");
    if (user) {
      this.redirectPage("/");
    }
  },
  methods: {
    ...mapActions(["redirectPage"]),
    ...mapMutations(["setUserInfo"]),
    passwordsMatch() {
      return this.$v.password.$model === this.$v.repeatPassword.$model;
    },
    async submitForm() {
      // this.formSubmitted = true;
      this.$v.$touch();
      if (this.$v.$invalid || !this.passwordsMatch()) {
        console.log("Form submitted faild");
      } else {
        try {
          const data = await createNewUser({
            name: this.name,
            email: this.email,
            password: this.password,
          });
          console.log(data);
          if (data?.status === 201 || data?.status === 200) {
            localStorage.setItem("userInfo", JSON.stringify(data?.data));
            this.setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
            this.name = "";
            this.email = "";
            this.password = "";
            this.repeatPassword = "";
            this.$router.push({ path: "/" });
          }
        } catch (error) {
          console.error("Error creating user:", error);
          throw error;
        }
        // do your submit logic here
      }
    },
  },
  computed: {
    passwordContainsSpecialChar() {
      // Custom validation rule to check if the password contains at least one special character
      const specialChars = /[!@#$%^&*(),.?":{}|<>]/;
      return (value) => specialChars.test(value);
    },
  },
};
</script>

<style></style>
