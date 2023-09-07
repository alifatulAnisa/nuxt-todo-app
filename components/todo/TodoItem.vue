<script setup>
import { useTodoStore } from '~/store/todolist';

const isLoading = ref(false)
const todoStore = useTodoStore();
const retrievedItems = ref([]);
const dataLoaded = ref(false);

onMounted(async () => {
  isLoading.value = true;
  try {
    await retrieveItems();
    dataLoaded.value = true;
  } catch (error) {
    console.error('Error retrieving items:', error);
  } finally {
    isLoading.value = false;
    dataLoaded.value = true;
  }
});

async function retrieveItems() {
  await todoStore.retrieveItems();
  retrievedItems.value = todoStore.items;
}

async function toggleCompleted(itemId) {
  const todo = retrievedItems.value.find((item) => item.id === itemId);
  if (todo) {
    const updatedCompleted = !todo.completed;
    todo.completed = updatedCompleted;
    if (updatedCompleted) {
      todo.status = 'Completed';
    } else {
      todo.status = 'In Progress';
    }
    const updatedData = {
      completed: updatedCompleted,
      status: todo.status,
    };
    await todoStore.updateItem(itemId, updatedData);
  }
}

async function deleteItem(itemId) {
  await todoStore.deleteItem(itemId);
  retrievedItems.value = retrievedItems.value.filter((item) => item.id !== itemId);
}

watch(retrievedItems, (newItems) => {
  newItems.sort((a, b) => {
    const aDate = new Date(a.due_date).setHours(0, 0, 0, 0);
    const bDate = new Date(b.due_date).setHours(0, 0, 0, 0);

    if (aDate == currentDate) return -1; 
    if (bDate == currentDate) return 1;
    if (aDate == tomorrowDate) return -1;
    if (bDate == tomorrowDate) return 1;
    if (a.completed && !b.completed) return 1; 
    if (!a.completed && b.completed) return -1;

    return aDate - bDate; 
  });
});

const currentDate = new Date().setHours(0, 0, 0, 0);

const tomorrowDate = new Date();
tomorrowDate.setDate(tomorrowDate.getDate() + 1);
tomorrowDate.setHours(0, 0, 0, 0);

const todayItems = computed(() => {
  return retrievedItems.value.filter(
    (item) => new Date(item.due_date).setHours(0, 0, 0, 0) === currentDate
  );
});

const tomorrowItems = computed(() => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  return retrievedItems.value.filter(
    (item) => new Date(item.due_date).setHours(0, 0, 0, 0) === tomorrow.getTime()
  );
});

const otherItems = computed(() => {
  return retrievedItems.value.filter(
    (item) =>
      new Date(item.due_date).setHours(0, 0, 0, 0) !== currentDate &&
      new Date(item.due_date).setHours(0, 0, 0, 0) !== tomorrowDate.getTime()
  );
});

const completedItems = computed(() => {
  return retrievedItems.value.filter((item) => item.completed);
});

const getToday = () => {
  if (todayItems.value.length > 0) {
    return 'Today';
  } else {
    return '';
  }
}

const getTomorrow = () => {
  if (tomorrowItems.value.length > 0) {
    return 'Tomorrow';
  } else {
    return '';
  }
}

const getOther = () => {
  if (otherItems.value.length > 0) {
    return 'Other tasks'
  } else {
    return ''
  }
}

const getCompleted = () => {
  if (completedItems.value.length > 0) {
    return 'Completed'
  } else {
    return ''
  }
}

async function updateStatus(itemId, status) {
  console.log('updateStatus called:', itemId, status);
  const todo = retrievedItems.value.find((item) => item.id === itemId);
  if (todo) {
    todo.status = status;
    const updatedData = {
      status: status,
    };
    await todoStore.updateItem(itemId, updatedData);
  }
}
</script>

<template>
  <IonPage>
    <IonContent class="ion-padding">
      <div class="items-center justify-center">
        <div v-if="isLoading || !dataLoaded">
          <ion-progress-bar type="indeterminate"></ion-progress-bar>
        </div>
        <div v-else class="flex justify-between items-center">
          <NuxtLink to="/forms/formtodonew">
            <button class="rounded-3xl w-32 bg-blue-500 px-4 py-3 mb-4 text-white ml-auto" id="open-modal" expand="block">Add New</button>
          </NuxtLink>
        </div>
        <!-- Render the items due today -->
        <p class="font-bold text-lg mb-2" v-if="getToday() === 'Today'">{{ getToday() }}</p>
        <div v-for="todo in todayItems" :key="todo.id" class="flex flex-col md:flex-row items-center justify-between mb-4">
          <TodoToday :todo="todo" :toggleCompleted="toggleCompleted" :retrievedItems="retrievedItems" :updateStatus="updateStatus" />
        </div>
        <!-- Render the items due tomorrow -->
        <p class="font-bold text-lg mb-2" v-if="getTomorrow() === 'Tomorrow'">{{ getTomorrow() }}</p>
        <div v-for="todo in tomorrowItems" :key="todo.id" class="flex flex-col md:flex-row items-center justify-between mb-4">
          <TodoTomorrow :todo="todo" :toggleCompleted="toggleCompleted" :retrievedItems="retrievedItems" :updateStatus="updateStatus" />
        </div>
        <!-- Render the items not due today or tomorrow -->
        <p class="font-bold text-lg mb-2" v-if="getOther() !== ''">{{ getOther() }}</p>
        <div v-for="todo in otherItems" :key="todo.id" class="flex flex-col md:flex-row items-center justify-between mb-4">
          <TodoOthers :todo="todo" :toggleCompleted="toggleCompleted" :retrievedItems="retrievedItems" :updateStatus="updateStatus" />
        </div>
        <!-- Render completed items -->
        <p class="font-bold text-lg mb-2" v-if="getCompleted() !== ''">{{ getCompleted() }}</p>
        <div v-for="todo in completedItems" :key="todo.id" class="flex flex-col md:flex-row items-center justify-between mb-4">
          <TodoCompleted :todo="todo" :toggleCompleted="toggleCompleted" :retrievedItems="retrievedItems" :deleteItem="deleteItem" />
        </div>
      </div>
    </IonContent>
  </IonPage>
</template>