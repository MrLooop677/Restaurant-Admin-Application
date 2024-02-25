<template>
  <ul id="nav">
    <router-link
      tag="li"
      :to="{ path: '/', params: { pageTitle: 'Home Page' } }"
      exact
    >
      <a>Home</a>
    </router-link>
    <a href="#" @click="logOut">Logout</a>
  </ul>
</template>

<script>
import { mapActions, mapMutations } from "vuex";

export default {
  name: "Navbar-comp",
  methods: {
    ...mapActions(["redirectPage"]),
    ...mapMutations(["setUserInfo"]),

    logOut() {
      localStorage.clear();
      this.setUserInfo(null);
      this.redirectPage("log-in");
    },
  },
};
</script>

<style lang="scss" scoped>
$fontColor: darkcyan;
$navColor: #525a5a;
ul {
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  margin-bottom: 50px;
  a {
    text-decoration: none;
    font-weight: bold;
    color: $fontColor;
    padding: 10px;
  }
}
a.router-link-exact-active a,
ul a a:hover {
  color: $navColor;
  box-shadow: 2px 2px 4px 0px $navColor;
}
</style>
