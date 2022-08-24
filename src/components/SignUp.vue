<template>
  <div class="containerUp">
    <div class="headingUp">
      <div class="header">
        <a href="/auth/#" class="logo"
          ><img
            class="logo"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdzUe7jo1D940bjNuAz97lIMFhtASJRuiYCQ&usqp=CAU"
        /></a>
        <h1 class="title">Log in to ToDo App</h1>
        <h2 class="text">Start Organizing your tasks today!</h2>
      </div>
      <p v-show="errorMsg" class="error-msg">{{ errorMsg }}</p>

      <form @submit.prevent="signUp">
        <div class="form-input"></div>
        <label class="input-label" for="email">Email</label>
        <input
          type="text"
          class="input-input"
          v-model="email"
          placeholder="  Email"
          id="email"
          required
        />
        <br />
        <label input-label for="password">Password</label>
        <input
          type="password"
          class="input-input"
          v-model="password"
          placeholder="  ********"
          id="password"
          required
        />
        <br />
        <label class="input-label" for="password">Confirm password</label>
        <input
          type="password"
          class="input-input"
          v-model="confirmPassword"
          placeholder="  ********"
          id="confirmPassword"
          required
        />

        <button class="btn">Sign In</button>

        <p>
          Have an account?
          <PersonalRouter :route="route" :buttonText="buttonText" />
        </p>
      </form>
    </div>

    <div class="img">
      <img
        class="signin-img"
        src="https://media.gettyimages.com/photos/shot-of-an-unrecognisable-businesswoman-using-a-laptop-while-working-picture-id1343152987?s=2048x2048"
        alt=""
      />
    </div>
  </div>
</template>
<script setup>
import PersonalRouter from "./PersonalRouter.vue";
import { ref, computed } from "vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";
// Route Variables
const route = "/auth/login";
const buttonText = "Log In";
// Input Fields
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
// Error Message
const errorMsg = ref("");
// Show hide password variable
const passwordFieldType = computed(() =>
  hidePassword.value ? "password" : "text"
);
// Show hide confrimPassword variable
const hidePassword = ref(true);
// Router to push user once SignedUp to Log In
const redirect = useRouter();
// Arrow function to SignUp user to supaBase with a timeOut() method for showing the error
const signUp = async () => {
  if (password.value === confirmPassword.value) {
    try {
      // calls the user store and send the users info to backend to logIn
      await useUserStore().signUp(email.value, password.value);
      // redirects user to the homeView
      redirect.push({ path: "/auth/login" });
    } catch (error) {
      // displays error message
      errorMsg.value = error.message;
      // hides error message
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
    return;
  }
  errorMsg.value = "Password not the same";
};
</script>
<style>
.containerUp {
  display: flex;
  justify-content: space-between;
  width: 100vw;
}
.headingUp {
  margin: auto;
  max-width: 747px;
}
.header {
  text-align: center;
}
.logo {
  width: 70px;
}

.signin-img {
  object-fit: cover;
  width: 50vw;
  height: 100vh;
}

.error-msg {
  color: red;
}
.input-label {
  display: block;
  margin-bottom: 10px;
  font-weight: 500;
}
.input-input {
  border-radius: 5px;
  border: 1px solid #36755f;
  margin-bottom: 20px;
  width: 100%;
  padding: 10px 0;
}
.btn {
  background-color: #36755f;
  border-radius: 5px;
  width: 100%;
  border: none;
  color: white;
  padding: 10px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}

.form {
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
}

.button {
  background-color: #36755f; /* Green */
  border: none;
  color: white;
  padding: 10px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
</style>
