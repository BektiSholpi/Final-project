import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: null,
  }),
  actions: {
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: false });
      this.tasks = tasks;
      return this.tasks;
    },
    // New code
    async addTask(title, description) {
      console.log(useUserStore().user.id);
      const { data, error } = await supabase.from("tasks").insert([
        {
          user_id: useUserStore().user.id,
          title: title,
          is_complete: false,
          description: description,
        },
      ]);
    },
    // Delete Task function from supabase
    async deleteTask(id) {
      const { data, error } = await supabase
        .from("tasks")
        .delete()
        .match({ id: id });
    },
    // Funcion para editar
    async editTask(title, description, id) {
      const { data, error } = await supabase
        .from("tasks")
        .update({ title: title, description: description })
        .match({ id: id });
    },
    // funcion para completarTarea
    async toggleDone(bool, id) {
      const { data, error } = await supabase
        .from("tasks")
        .update({ is_complete: bool })
        .match({ id: id });
    },
  },
});
