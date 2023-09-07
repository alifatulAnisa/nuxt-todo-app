<script setup>
const props = defineProps([
  'todo',
  'toggleCompleted',
  'retrievedItems',
  'deleteItem',
]);

const emits = defineEmits(['delete']);
const showAlert = ref(false);

const alertButtons = [
  {
    text: 'Cancel',
    role: 'cancel',
  },
  {
    text: 'Delete',
    role: 'confirm',
    handler: () => {
      confirmDelete(props.todo.id);
    },
  },
];

const deleteItem = () => {
  showAlert.value = true;
}

function confirmDelete(itemId) {
  showAlert.value = false;
  props.deleteItem(props.todo.id)
  emits('delete', itemId); // Emit the custom event with the deleted item's ID
  console.log('delete');
}

function setResult(event) {
  if (event.detail.role === 'cancel') {
    // User canceled the deletion
    console.log('Deletion canceled');
  }
}
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
    <button id="present-alert" class="mr-2 p-2 rounded bg-red-500 text-white" @click="() => deleteItem(todo.id)">
      Delete
    </button>
    <ion-alert
      trigger="present-alert"
      header="Are you sure to delete?"
      :buttons="alertButtons"
      @didDismiss="setResult"
    ></ion-alert>
  </div>
</template>
