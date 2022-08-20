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
      <button class="nav-btn" @click="logOut">Log Out</button>
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
const route = "/";
const buttonText = "Home";
// constant to save a variable that will get the user from store with a computed function imported from vue

// constant that calls user email from the useUSerStore

// constant that saves the user email and cleans out the @client from the user

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
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
.nav-btn {
  background-color: #4caf50;
  border-radius: 5px;
  width: 100px;
  margin-right: 15px;
  height: 40px;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
</style>
