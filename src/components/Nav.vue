<template>
  <div>
    <nav class="navbar">
      <div class="nav">
        <img
          class="nav-img"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPrhsMiE_mVmwsurTkXjt8-XZEr-_ne1RXF6ySjHanEpB3LWC_FvCtC-VhCqpsHeQl1J8&usqp=CAU"
          alt=""
        />
        <h1>ToDoApp</h1>
      </div>
      <h2 class="h_2">Hello, {{ name[0] }}</h2>
      <button class="nav-btn" @click="signOut">Log Out</button>
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
.navbar {
  display: flex;
  justify-content: space-between;
  width: 100vw;
}
.nav-img {
  width: 50px;
}
.nav {
  display: flex;
}
.h_2 {
  margin-left: 30em;
  color: dimgray;
}
.nav-btn {
  background-color: #4caf50;
  border-radius: 5px;
  width: 100px;
  margin-right: 15px;
  margin-top: 15px;
  height: 40px;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
</style>
