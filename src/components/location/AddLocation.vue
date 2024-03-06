<template>
  <div>
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-primary mx-2"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
    >
      Add Location
    </button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add Location</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleSubmit">
              <div class="row g-3 align-items-center">
                <div class="col-auto mx-auto d-block">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Your Name"
                    v-model.trim="$v.name.$model"
                  />
                </div>
                <div
                  class="text-danger text-center m-auto"
                  v-if="$v.name.$dirty && !$v.name.required"
                >
                  Name is required
                </div>
                <div
                  class="text-danger text-center m-auto"
                  v-if="$v.name.$dirty && !$v.name.minLength"
                >
                  Name must have at least
                  {{ $v.name.$params.minLength.min }} letters.
                </div>
              </div>

              <br />
              <div class="row g-3 align-items-center">
                <div class="col-auto mx-auto d-block">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Your Phone"
                    v-model.trim="$v.phone.$model"
                  />
                </div>
                <span
                  class="error-feedback mt-2 text-danger text-center m-auto"
                  v-if="$v.phone.$dirty && !$v.phone.required"
                >
                  phone is required
                </span>

                <span
                  class="error-feedback mt-2 text-danger text-center m-auto"
                  v-if="$v.phone.$dirty && !$v.phone.validatePhone"
                >
                  phone must contain on 11 numner
                </span>
              </div>
              <br />

              <div class="row g-3 align-items-center">
                <div class="col-auto mx-auto d-block">
                  <input
                    type="text"
                    name="address"
                    class="form-control"
                    placeholder="Enter Your address"
                    v-model.trim="$v.address.$model"
                  />
                </div>
                <div
                  class="text-danger text-center m-auto"
                  v-if="$v.address.$dirty && !$v.address.required"
                >
                  Address is required
                </div>
              </div>
              <div class="modal-footer mt-2">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" class="btn btn-primary">Add Now</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addLocation } from "@/services/api/add-location";
import { required, minLength } from "vuelidate/lib/validators";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "addLocation",
  data() {
    return {
      name: "",
      phone: "",
      address: "",
      userId: "",
    };
  },
  validations: {
    name: { required, minLength: minLength(4) },
    phone: {
      required,
      validatePhone() {
        return this.validatePhoneNumber;
      },
    },
    address: { required },
  },
  mounted() {
    if (this.getUserInfo) {
      this.userId = this.getUserInfo().id;
    } else {
      this.redirectPage("/signup");
    }
  },
  methods: {
    ...mapActions(["redirectPage"]),
    ...mapGetters(["getUserInfo"]),
    async handleSubmit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("Form submitted faild");
      } else {
        try {
          console.log("submit form");
          await addLocation({
            name: this.name,
            address: this.address,
            phone: this.phone,
            userId: this.userId,
          });
          this.name = "";
          this.address = "";
          this.phone = "";
          this.$v.$reset();
        } catch (error) {
          console.error("Error creating user:", error);
          throw error;
        }
      }
    },
  },
  computed: {
    validatePhoneNumber() {
      // Regular expression to match a phone number pattern
      const phonePattern = /^[0-9]{11}$/;
      return phonePattern.test(this.phone);
    },
  },
};
</script>

<style></style>
