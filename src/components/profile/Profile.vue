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
              :disabled="disableInp"
              type="text"
              class="w250 form-control"
              id="floatNameIs"
              placeholder="Your Name Is"
              v-model.trim="$v.name.$model"
            />
            <label for="floatNameIs">Your Name Is</label>
          </div>
          <div class="text-danger" v-if="$v.name.$dirty && !$v.name.required">
            Name is required
          </div>
          <div class="text-danger" v-if="$v.name.$dirty && !$v.name.minLength">
            Name must have at least {{ $v.name.$params.minLength.min }} letters.
          </div>
        </div>
      </div>
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <div class="form-floating mb-3">
            <input
              :disabled="disableInp"
              type="email"
              class="w250 form-control"
              id="floatEmailIs"
              placeholder="Your Email Is"
              v-model.trim="$v.email.$model"
            />

            <label for="floatEmailIs">Your Email Is</label>
          </div>
          <span
            class="error-feedback mt-2 text-danger"
            v-if="$v.email.$dirty && !$v.email.required"
          >
            email is required
          </span>
        </div>
      </div>
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <div class="form-floating mb-3">
            <input
              :disabled="disableInp"
              type="password"
              class="w250 form-control"
              id="floatPassIs"
              placeholder="Your Password Is"
              v-model.trim="$v.password.$model"
            />
            <label for="floatPassIs">Your Password Is</label>
          </div>
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
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <button
            type="submit"
            @click="updateProfileData()"
            class="w250 btn btn-primary"
          >
            Update My Profile Info
          </button>
          <button
            type="button"
            @click="toggleEnableInput"
            class="w250 btn btn-primary m-1"
          >
            Edit Profile Info
          </button>
        </div>
      </div>
    </form>
    <div
      class="error-feedback mt-2"
      :class="{ 'text-danger': emailNotFound }"
      v-if="emailNotFound"
    >
      {{ emailNotFound }}
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import Navbar from "../header/Navbar.vue";
import { updateProfile } from "@/services/api/profile";
import { required, email, minLength } from "vuelidate/lib/validators";

export default {
  components: { Navbar },
  name: "profile-comp",

  data() {
    return {
      name: "",
      email: "",
      password: "",
      id: "",
      disableInp: true,
      emailNotFound: "",
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
  },
  mounted() {
    this.setUserInfo();
    this.setUserData();
    if (!this.getUserInfo().name) {
      this.redirectPage("/sign-up");
    }
  },
  methods: {
    ...mapMutations(["setUserInfo"]),
    ...mapGetters(["getUserInfo"]),
    ...mapActions(["redirectPage"]),

    setUserData() {
      this.name = this.getUserInfo().name;
      this.email = this.getUserInfo().email;
      this.password = this.getUserInfo().password;
      this.id = this.getUserInfo().id;
    },
    toggleEnableInput() {
      this.disableInp = !this.disableInp;
    },
    async updateProfileData() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("Form submitted faild");
      } else {
        try {
          const response = await updateProfile({
            id: this.id,
            email: this.email,
            password: this.password,
            name: this.name,
          });
          if (response.status == 200) {
            localStorage.setItem("userInfo", JSON.stringify(response?.data));
          } else {
            this.emailNotFound = "not updated";
          }
        } catch (error) {
          console.error("Error creating user:", error);
          throw error;
        }
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
