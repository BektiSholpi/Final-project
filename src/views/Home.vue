<template>
  <div>
    <Nav />
    <NewTask @addToTask="addSup" />
    <div class="sholpi">
      <TaskItem
        v-for="task in setTask.tasks"
        :key="task.id"
        :taskData="task"
        @delete-task-child="deleteTaskParent"
        @toggle-reminder-child="toggleTaskParent"
        @change-name-child="changeNameParent"
      />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Nav from "../components/Nav.vue";
import NewTask from "../components/NewTask.vue";
import Footer from "../components/Footer.vue";
import TaskItem from "../components/TaskItem.vue";
import { useTaskStore } from "../stores/task";

const setTask = useTaskStore();

onMounted(() => {
  setTask.fetchTasks();
});

//funccion para "add" tareas en supabase TIENE QUE SER ASYNCRONICA
const addSup = async (task) => {
  await setTask.addTask(task.title, task.description);
  setTask.fetchTasks();
};

//funccion para borrar tarea de supabase
const deleteTaskParent = async (task) => {
  await setTask.deleteTask(task.id);
  setTask.fetchTasks();
};
//funccion para completar tarea
const toggleTaskParent = async (task) => {
  const taskStatus = !task.is_complete;
  const taskId = task.id;
  await setTask.toggleDone(taskStatus, taskId);
  setTask.fetchTasks();
};
//funccion para cambiar tarea
async function changeNameParent(task) {
  const newTitle = task.newName;
  const newDescription = task.newDescription;
  const id = task.oldTask.id;

  await setTask.editTask(newTitle, newDescription, id);
  setTask.fetchTasks();
}
</script>

<style>
* {
  font-family: "Poppins", sans-serif;
}
.sholpi {
  display: flex;
  justify-content: space-around;
  flex: wrap;
}
@media only screen and (max-width: 747px) {
  .sholpi {
    display: flex;
    flex-direction: column;
  }
}
</style>
