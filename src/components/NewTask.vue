<template>
  <div class="section">
    <div class="body">
      <h1>Add a new Task</h1>
      <h2>
        Organize your work and your life, finally. Focus, get organized, and
        stay calm with ToDoApp
      </h2>
      <div class="error" v-if="showError">{{ errorMsg }}</div>
      <div class="input">
        <input
          class="task-input"
          type="text"
          placeholder="  Add a Task Title"
          v-model="taskName"
        />
      </div>

      <div class="input">
        <input
          class="task-input"
          type="text"
          placeholder="  Add a Task Description"
          v-model="taskDescription"
        />
      </div>
      <button @click="addSup" class="task-btn">Add</button>
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
import { useTaskStore } from "../stores/task";
// constant to save a variable that define the custom event that will be emitted to the homeView
const emit = defineEmits(["addToTask"]);
// constant to save a variable that holds the value of the title input field of the new task
const taskName = ref("");

// constant to save a variable that holds the value of the description input field of the new task
const taskDescription = ref("");
// constant to save a variable that holds an initial false boolean value for the errorMessage container that is conditionally displayed depending if the input field is empty
const showError = ref(false);
// const constant to save a variable that holds the value of the error message
const errorMsg = ref(null);
// arrow function to call the form holding the task title and task description that uses a conditional to first checks if the task title is empty, if true the error message is displayed through the errorMessage container and sets a timeOut method that hides the error after some time. Else, its emmits a custom event to the home view with the task title and task description; clears the task title and task description input fields.
function addSup() {
  if (taskName.value.length === 0 || taskDescription.value.length === 0) {
    showError.value = true;
    errorMsg.value = "You must fill both fields";
    setTimeout(() => {
      showError.value = false;
    }, 5000);
  }
  const newtask = {
    title: taskName.value,
    description: taskDescription.value,
  };

  emit("addToTask", newtask);
  taskName.value = "";
  taskDescription.value = "";
}
</script>

<style scoped>
.body {
  text-align: center;
  margin: auto;
  max-width: 747px;
}
h1 {
  display: block;
  margin-top: 50px;
  font-size: 45px;
}
h2 {
  display: block;
  font-size: 20px;
}
.error {
  color: red;
}

.task-input {
  border-radius: 5px;
  border: 1px solid #4caf50;
  margin-bottom: 20px;
  width: 100%;
  padding: 10px 0;
}
.task-btn {
  background-color: #4caf50;
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
</style>
