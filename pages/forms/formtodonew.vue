<script setup lang="ts">
import { useTodoStore } from '~/store/todolist';

definePageMeta({
  middleware: ['auth'],
  layout: "sidemenu"
});

const todoStore = useTodoStore();
const user = useSupabaseUser();

const todonew = ref({
  taskName: '',
  startDate: new Date(),
  dueDate: new Date(),
})

const showDatePicker = ref(false)
const showDatePickerDue = ref(false)
const handleStartDateChange = (event: CustomEvent) => {
  todonew.value.startDate = event.detail.value;
  showDatePicker.value = false;
  console.log(todonew.value.startDate);
}
const handleDueDateChange =(event: CustomEvent) => {
  todonew.value.dueDate = event.detail.value
  showDatePickerDue.value = false
}

const addNewItem = async () => {
  const newItem = {
    todo_name: todonew.value.taskName,
    start_date: todonew.value.startDate,
    due_date: todonew.value.dueDate,
    user_id: user.value?.id, 
  };
  await todoStore.addItem(newItem);
};

onMounted(async () => {
  await todoStore.retrieveItems();
});
</script>

<template>
  <IonPage class="">
    <IonContent class="ion-padding">
      <ion-card class="rounded-md py-4 bg-gray-200 w-full md:w-1/2 mx-auto">
        <ion-card-header>
          <ion-card-title class="font-bold">Add New Task</ion-card-title>
          <ion-card-subtitle>Fill in the form to add a new task</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <form class="mt-4 mb-4 items-center justify-center max-w-md mx-auto md:max-w-2xl" @submit.prevent>
            <div class="mb-4 input-container">
              <label for="" class="label-form">Task Name</label><br>
              <input fill="outline" placeholder="Enter text" class="input-text min-w-full" v-model="todonew.taskName" />
              <span class="icon-date"></span>
            </div>
            <div class="mb-4">
              <label for="" class="label-form">Start Date</label><br>
              <input
                type="text"
                fill="outline"
                placeholder="Enter due date"
                class="input-text min-w-full"
                v-model="todonew.startDate"
                @click="showDatePicker = true"
                readonly
              />
              <span class="icon-date" @click="showDatePicker = true"></span>
              <ion-datetime
                v-if="showDatePicker"
                presentation="date"
                :model="todonew.startDate"
                :show-default-buttons="true"
                @ionCancel="showDatePicker = false"
                @ionDone="showDatePicker = false"
                @ionChange="handleStartDateChange"
              ></ion-datetime>
            </div>
            <div class="mb-4">
              <label for="" class="label-form">Due Date</label><br>
              <input
                type="text"
                fill="outline"
                placeholder="Enter due date"
                class="input-text min-w-full"
                v-model="todonew.dueDate"
                @click="showDatePickerDue = true"
                readonly
              />
              <span class="icon-date" @click="showDatePickerDue = true"></span>
              <ion-datetime
                v-if="showDatePickerDue"
                presentation="date"
                :model="todonew.dueDate"
                :show-default-buttons="true"
                @ionCancel="showDatePickerDue = false"
                @ionDone="showDatePickerDue = false"
                @ionChange="handleDueDateChange"
              ></ion-datetime>
            </div>
            <div class="flex justify-end">
              <button type="submit" class="btn-primary h-10 mt-4" @click="addNewItem">Create Task</button>
            </div>
          </form>
        </ion-card-content>
      </ion-card>
    </IonContent>
  </IonPage>
</template>