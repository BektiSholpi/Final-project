<template>
  <div class="section">
    <nav class="navbar">
      <div class="nav">
        <h1 class="text-3xl font-bold tracking-normal sm:text-3xl lg:text-3xl">
          ToDoApp
        </h1>
      </div>
      <div class="div">
        <h2 class="h_2">Hello, {{ name[0] }}</h2>
        <button class="nav-btn" @click="signOut">Log Out</button>
      </div>
      <!-- <PersonalRouter :route="route" :buttonText="buttonText" /> -->
    </nav>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";
//constant to save a variable that will hold the use router method

// constant to save a variable that will get the user from store with a computed function imported from vue
const userStore = useUserStore();
// constant that calls user email from the useUSerStore
const email = userStore.user.email;
// constant that saves the user email and cleans out the @client from the user
const name = email.split("@");
// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
const redirect = useRouter();

const signOut = async () => {
  try {
    await useUserStore().signOut();

    redirect.push({ path: "/auth/login" });
  } catch (error) {
    errorMsg.value = error.message;

    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
};
</script>

<style scoped>
.section {
  background-color: white;
}
.navbar {
  display: flex;
  justify-content: space-between;
  width: 100vw;
}

.nav {
  display: flex;
}
h1 {
  margin-top: 15px;
  font-size: 30px;
  margin-left: 10px;
}
.h_2 {
  margin-top: 25px;

  margin-right: 10px;
  color: dimgray;
  font-size: 18px;
}
.div {
  display: flex;
}
.nav-btn {
  background-color: #36755f;
  border-radius: 5px;
  width: 100px;
  margin-right: 25px;
  margin-top: 15px;
  height: 40px;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}

@media only screen and (max-width: 747px) {
  .h_2 {
    display: none;
  }
}
</style>
