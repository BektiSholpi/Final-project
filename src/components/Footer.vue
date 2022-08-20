<template>
  <div class="footer">
    <h2>ToDoApp</h2>
    <hr />
    <h3>© 2022 TaskApp.</h3>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";
</script>

<style scoped>
.footer {
  margin: auto;
  max-width: 100vw;
  text-align: center;
}
h2 {
  display: block;
  margin-top: 100px;
  margin-bottom: 5px;
  font-size: 35px;
}
h3 {
  display: block;
  font-size: 20px;
}
</style>
