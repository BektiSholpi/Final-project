<template>
  <div class="container">
    <div class="task-item">
      <div class="task-image">
        <img class="icon-img" src="#" alt="icono" />
      </div>
      <div class="task-container">
        <div v-for="(task, index) in taskData" :key="index">
          <h2 class="task-title">{{ task.title }}</h2>
          <p class="task-descr">{{ task.description }}</p>
        </div>

        <div class="task-btn">
          <div class="task-change-descr"></div>

          <div class="task-change-title"></div>

          <div class="task-delete"></div>
        </div>
      </div>
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

// const emit = defineEmits([
//   ENTER-EMITS-HERE
// ])
const props = defineProps({ taskData: Array });
// const props = defineProps(["ENTER-PROP-HERE"]);
</script>

<style scoped>
.task-item {
  background-color: #4caf50;
  margin-top: 40px;
  height: 200px;
  position: relative;
  width: 34%;
}

.icon-img {
  width: 50px;
  position: absolute;
  height: 50px;
  border-radius: 50%;
  left: 50%;
  top: -15%;
  transform: translate(-50%, 0);
}
.task-container {
  padding: 30px;
  text-align: center;
}
.task-change-descr {
  width: 30px;
  height: 30px;
  background-color: white;
}
.task-change-title {
  width: 30px;
  height: 30px;
  background-color: white;
}
.task-delete {
  width: 30px;
  height: 30px;
  background-color: white;
}
.task-btn {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.task-title {
  margin-bottom: 30px;
}
.task-descr {
  margin-bottom: 40px;
}
.container {
  max-width: 1100px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
}
</style>

<!-- 
**Hints**
1. ref() or reactive() can be used here to store the following, think if you want to store them either individually or like an object, up to you.
2. Data properties need here are the following: a boolean to store a false**Important variable, a string to store an error, a string to store the value of the task that the user can edit, an initial false boolean to hide the inputFIeld used to edit the new task detail or details[this is in reference of the task title and the task description].
3. Store the custom emit events that will be used to call the functions of the homeView for editing, deleting and toggling the status[completed, not complted] of the taskItem.
4. Function to handle the error with the data properties used to control the error and the the boolean controlling the boolean empty variable.
5. Function to handle the edit dialogue where the inputField is displayed and the string used to store the value of the inputField will be used here to save the value as a prop on this function.
6. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be send via the prop to the parent component. This function can control the toggle completion of the task on the homeview.
7. Function to edit the task information that you decided that the user can edit. This function's body takes in a conditional that first checks if the value of the task [either title and description or just title] is empty which if true it runs the function used to handle the error on hint4. Else, the conditional sets the first mentioned boolean data property on hint2 back to its inital boolean value to hide the error message and repeat the same for the data property mentioned 4th on hint2; a constant that stores an object that holds the oldValue from the prop item and the value of the task coming from the data property mentioned 3rd on hint2; a custom event emit() that takes 2 parameters a name for the custom event and the value from the object used on this part of the conditional and lastly this part of the conditional sets the value of input field to an empty string to clear it from the ui. 
8. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be send via the prop to the parent component. This function can control the removal of  the task on the homeview.
-->
