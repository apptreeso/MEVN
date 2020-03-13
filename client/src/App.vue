<template>
  <div id="app">
    <Navbar />
    <br /><br />
    <div class="container">
      <Errors v-if="error" :msg="error" />
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Errors from "@/components/Errors";
import { mapGetters } from "vuex";

export default {
  components: {
    Navbar,
    Errors
  },
  computed: {
    ...mapGetters(["error"])
  }
};
</script>

<style>
.card {
  border-radius: 0px;
}
.btn {
  border-radius: 0px;
}
</style>
