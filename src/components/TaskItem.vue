<template>
  <div class="container">
    <div class="task-container">
      <div>
        <h2 class="task-title">{{ taskData.title }}</h2>
        <p class="task-descr">{{ taskData.description }}</p>
      </div>

      <div class="todo-button">
        <!--  <div
          :class="
            task.is_complete ? 'todo-change-state' : 'todo-change-state-not'
          "
          @click="toggleTask(task.id, index)"
        ></div> -->
        <button @click.prevent="deleteTask">delete task</button>
        <button v-if="!taskData.is_complete" @click.prevent="toggleTask">
          Complete Task
        </button>
        <button v-if="taskData.is_complete" @click.prevent="toggleTask">
          Uncomplete Task
        </button>
        <button @click="handleForm">Edit</button>
      </div>

      <form v-if="editForm" @submit.prevent="editTask">
        <div class="add-task-form">
          <div class="input-field">
            <input
              class="inpud-field-input"
              type="text"
              placeholder="change name"
              v-model="name"
            />

            <input
              type="text"
              placeholder="change description"
              v-model="description"
            />
          </div>
          <button type="submit">Change</button>
        </div>
      </form>

      <hr />
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

const emit = defineEmits([
  "toggle-reminder-child",
  "delete-task-child",
  "change-name-child",
]);

const props = defineProps(["taskData"]);

const name = ref("");
const description = ref("");

const deleteTask = () => {
  emit("delete-task-child", props.taskData);
};

const toggleTask = () => {
  emit("toggle-reminder-child", props.taskData);
};

const changeName = ref(false);
const editForm = ref(false);

const handleForm = () => {
  editForm.value = !editForm.value;

  console.log(editForm.value);
};

const changeNameValue = () => {
  changeName.value = !changeName.value;
};

const editTask = () => {
  const taskObjectToEdit = {
    oldTask: props.taskData,
    newName: name.value,
    newDescription: description.value,
  };
  emit("change-name-child", taskObjectToEdit);

  name.value = "";
  description.value = "";
};
</script>

<style scoped>
button {
  border: 1px solid black;
}
.task-item {
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
