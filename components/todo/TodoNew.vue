<script setup>
import { useTodoStore } from '~/store/todolist';

const todoStore = useTodoStore();
const user = useSupabaseUser();

const newItems = reactive({
  itemName: '',
});

const addNewItem = async () => {
  const newItem = { todo_name: newItems.itemName };
  await todoStore.addItem(newItem, user.value?.id);
  newItems.itemName = ''; 
};

onMounted(async () => {
  await todoStore.retrieveItems();
});
</script>

<template>
  <div>
    <form class="flex items-center mb-4 w-full" @submit.prevent>
      <input type="text" placeholder="Add new task" class="bg-blue-50 p-3 rounded mt-4 md:mt-8 w-full md:w-full lg:w-full xl:w-full text-black" v-model="newItems.itemName">
      <div class="pl-2 pt-4 md:pt-8">
        <button class="bg-green-500 text-white p-4 rounded" @click="addNewItem">Add</button>
      </div>
    </form>
  </div>
</template>
