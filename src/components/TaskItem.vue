<template>
  <div class="section">
    <div class="item-todo">
      <div class="item-image"></div>

      <div class="item-container">
        <div class="text-1xl font-bold tracking-normal sm:text-1xl lg:text-1xl">
          <h2>
            {{ taskData.title }}
          </h2>
        </div>

        <div class="item-description">
          <p>
            {{ taskData.description }}
          </p>
        </div>

        <div class="buttons">
          <button
            v-if="!taskData.is_complete"
            @click.prevent="toggleTask"
            class="complete"
          >
            Done
          </button>
          <button
            v-if="taskData.is_complete"
            @click.prevent="toggleTask"
            class="uncomplete"
          >
            pending
          </button>
          <button class="edit-btn" @click="handleForm">Edit</button>

          <button @click.prevent="deleteTask" class="delete-btn">Delete</button>
        </div>
        <form class="change-name" v-if="editForm" @submit.prevent="editTask">
          <div class="add-task-form">
            <div class="input-field-inpud">
              <input
                type="text"
                placeholder="  Change Title"
                v-model="name"
                class="input-one"
              />
              <input
                type="text"
                placeholder="  Change Description"
                v-model="description"
                class="input-two"
              />
            </div>

            <div class="btn-change">
              <button type="submit">Change</button>
            </div>
          </div>
        </form>
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

<style>
.section {
  /* max-width: 1100px; */
  margin: auto;
  display: flex;
  flex: wrap;
}
/* f */
.item-container {
  width: 80%;
  padding: 30px;
  background-color: aliceblue;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 50px;
  margin-bottom: 40px;
  border: 1px solid #36755f;
  border-radius: 10px;
}
.item-title {
  margin-bottom: 30px;
}
.item-description {
  margin-bottom: 30px;
}

.buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}
.delete-btn {
  background-color: #36755f;
  border-radius: 5px;
  width: 60px;
  height: 30px;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 10px;
}
.complete {
  background-color: #f28729;
  border-radius: 5px;
  width: 60px;
  height: 30px;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 10px;
}
.uncomplete {
  background-color: red;
  border-radius: 5px;
  width: 60px;
  height: 30px;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 10px;
}
.edit-btn {
  background-color: #f07167;
  margin: 0 15px;
  border-radius: 5px;
  width: 60px;
  height: 30px;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 10px;
}
.input-field-inpud {
  margin-bottom: 15px;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 5px;
}
.input-one {
  border-radius: 5px;
  border: 1px solid #36755f;
  margin-bottom: 10px;
  width: 100%;
  padding: 10px 0;
}
.input-two {
  border-radius: 5px;
  border: 1px solid #36755f;
  width: 100%;
  padding: 10px 0;
}
.btn-change {
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
@media only screen and (max-width: 747px) {
  .container {
    margin-left: 30px;
    margin-right: 30px;
  }
  .item-todo {
    width: 100%;
    margin-left: 0px;
    margin-right: 0px;
  }
  .task-input {
    margin: 0 18px 0 15px;
  }
  .task-btn {
    margin: 0 18px 0 15px;
  }
  .item-container {
    margin-left: 50px;
  }
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
