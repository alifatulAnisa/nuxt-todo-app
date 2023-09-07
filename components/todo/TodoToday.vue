<script setup lang="ts">
const props = defineProps([
  'todo',
  'toggleCompleted',
  'retrievedItems',
  'updateStatus',
]);
</script>

<template>
<div class="bg-blue-50 py-2 shadow relative w-full flex items-center justify-center rounded">
  <div class="bg-blue-50 w-full flex items-center rounded text-black" :class="{ 'line-through': todo.completed }">
    <input
      type="checkbox"
      class="w-4 h-4 mr-4 ml-4 text-gray-500 bg-blue-50 rounded"
      :checked="todo.completed"
      @change="toggleCompleted(todo.id)"
    />
    <input
      type="text"
      class="w-1/2 ml-2 bg-transparent focus:outline-none no-underline text-black"
      v-model="todo.todo_name"
    />
  </div>
  <div class="flex items-center justify-center md:mt-0">
    <ion-list class="mr-2 h-10">
      <ion-item class="bottom-2/4">
        <ion-select class="" aria-label="Status" interface="action-sheet" placeholder="Select status" v-model="todo.status" @ionChange="updateStatus(todo.id, todo.status)">
          <ion-select-option class="" value="Not Started">Not started</ion-select-option>
          <ion-select-option value="In Progress">In Progress</ion-select-option>
        </ion-select>
      </ion-item>
    </ion-list>
  </div>
</div>
</template>