<template>
  <div class="containerUp">
    <div class="headingUp">
      <div class="header">
        <i class="fa-solid fa-list-check"></i>
        <h1
          class="text-3xl font-bold tracking-normal sm:text-3xl lg:text-3xl text-center"
        >
          Log in to ToDo App
        </h1>
        <h2 class="text">Start Organizing your tasks today!</h2>
      </div>
      <p v-show="errorMsg" class="error-msg">{{ errorMsg }}</p>

      <form @submit.prevent="signUp" class="w-56 md:w-96">
        <div class="form-input">
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
        </div>

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

const route = "/auth/login";
const buttonText = "Log In";

const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const errorMsg = ref("");

const passwordFieldType = computed(() =>
  hidePassword.value ? "password" : "text"
);

const hidePassword = ref(true);
const redirect = useRouter();

const signUp = async () => {
  if (password.value === confirmPassword.value) {
    try {
      await useUserStore().signUp(email.value, password.value);

      redirect.push({ path: "/auth/login" });
    } catch (error) {
      errorMsg.value = error.message;
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
    return;
  }
  errorMsg.value = "Password not the same";
  setTimeout(() => {
    errorMsg.value = null;
  }, 5000);
};
</script>
<style>
.containerUp {
  display: flex;
  justify-content: space-between;
  width: 100vw;
  background-color: aliceblue;
  height: 100vh;
}
.headingUp {
  margin: auto;
  max-width: 747px;
}
.header {
  text-align: center;
}
.text {
  margin-top: 10px;
  margin-bottom: 15px;
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
@media only screen and (max-width: 747px) {
  i {
    margin-top: 30px;
  }
}
</style>
