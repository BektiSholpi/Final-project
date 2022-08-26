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
            Pending
          </button>
          <button
            v-if="taskData.is_complete"
            @click.prevent="toggleTask"
            class="uncomplete"
          >
            Done
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
  margin: auto;
  display: flex;
  flex: wrap;
}

.item-container {
  width: 70%;
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
.uncomplete {
  background-color: #f07167;
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
  background-color: #f28729;
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
    margin-left: 10px;
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
    width: 60%;
  }
}
</style>
