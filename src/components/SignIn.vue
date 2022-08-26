<template>
  <div class="containerIn">
    <div class="headingIn">
      <div class="header">
        <i class="fa-solid fa-list-check"></i>

        <h1 class="text-3xl font-bold tracking-normal sm:text-3xl lg:text-3xl">
          Log in to ToDo App
        </h1>
        <h2 class="text">Start Organizing your tasks today!</h2>
      </div>
      <p v-show="errorMsg" class="error-msg">{{ errorMsg }}</p>
      <form @submit.prevent="signIn" class="w-56 md:w-96">
        <div class="form-input">
          <label class="input-label" for="email">Email</label>
          <input
            type="text"
            class="input-input"
            v-model="email"
            placeholder="email@gmail.com"
            required
          />
        </div>
        <div class="form-input">
          <label class="input-label" for="password">Password</label>
          <input
            type="password"
            class="input-input"
            v-model="password"
            placeholder="*********"
            required
          />
        </div>

        <button class="btn">Sign In</button>
        <p>
          Don’t have an account?
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
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

const route = "/auth/sign-up";
const buttonText = "Sign Up!";

const email = ref("");
const password = ref("");

const errorMsg = ref("");

const passwordFieldType = computed(() =>
  hidePassword.value ? "password" : "text"
);
const hidePassword = ref(true);

const redirect = useRouter();

const signIn = async () => {
  try {
    await useUserStore().signIn(email.value, password.value);

    redirect.push({ path: "/" });
  } catch (error) {
    errorMsg.value = `Error: ${error.message}`;

    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
};
</script>

<style>
.containerIn {
  display: flex;
  justify-content: space-between;
  width: 100vw;
  height: 100vh;
  background-color: aliceblue;
}
.headingIn {
  margin: auto;
  max-width: 747px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.header {
  text-align: center;
}

i {
  font-size: 40px;
  margin-bottom: 25px;
}

.title {
  margin-top: 5px;
}

.signin-img {
  object-fit: cover;
  width: 750px;
  height: 100%;
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
  height: 50px;
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
.form-input {
  align-items: center;
  padding-left: -15px;
}

.button {
  background-color: #36755f;
  border: none;
  color: white;
  padding: 10px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}

@media only screen and (max-width: 747px) {
  .signin-img {
    display: none;
  }
}
</style>
