<script setup lang="ts">
import { modalController } from '@ionic/vue';
import { useTodoStore } from '~/store/todolist';

const cancel = () => {
  modalController.dismiss()
}
const confirm = () => {
  modalController.dismiss()
}

const todoStore = useTodoStore();
const user = useSupabaseUser();

const todonew = ref({
  taskName: '',
  startDate: new Date(),
  dueDate: new Date(),
})

const showDatePickerStart = ref(false)
const showDatePickerDue = ref(false)

const datePickerDoneStart = (event: CustomEvent) => {
  const selectedDate = new Date(event.detail.value);
  todonew.value.startDate = selectedDate;
  showDatePickerStart.value = false;
  console.log(todonew.value.startDate);
}
const datePickerDoneDue = (event: CustomEvent) => {
  const selectedDate = new Date(event.detail.value);
  todonew.value.dueDate = selectedDate;
  showDatePickerDue.value = false;
}

const cancelDatePickerStart = () => {
  showDatePickerStart.value = false
}
const cancelDatePickerDue = () => {
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
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button @click="cancel()">Cancel</ion-button>
      </ion-buttons>
      <ion-buttons slot="end">
        <ion-button :strong="true" @click="confirm()">Confirm</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
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
          class="input-text min-w-full"
          v-model="todonew.startDate"
          @click="showDatePickerStart = true"
          readonly
        />
        <ion-datetime
          v-if="showDatePickerStart"
          presentation="date"
          :model="todonew.startDate.toISOString().substring(0, 10)"
          :show-default-buttons="true"
          @ionChange="datePickerDoneStart($event)"
        >
          <ion-buttons slot="buttons">
            <ion-button color="danger" @click="cancelDatePickerStart">Cancel</ion-button>
            <ion-button color="primary" @click="datePickerDoneStart($event)">Done</ion-button>
          </ion-buttons>
        </ion-datetime>
      </div>
      <div class="mb-4">
        <label for="" class="label-form">Due Date</label><br>
        <input
          type="text"
          fill="outline"
          class="input-text min-w-full"
          v-model="todonew.dueDate"
          @click="showDatePickerDue = true"
        />
        <ion-datetime
          v-if="showDatePickerDue"
          presentation="date"
          :model="todonew.dueDate.toISOString().substring(0, 10)"
          :show-default-buttons="true"
          @ionChange="datePickerDoneDue($event)"
        >
          <ion-buttons slot="buttons">
            <ion-button color="danger" @click="cancelDatePickerDue">Cancel</ion-button>
            <ion-button color="primary" @click="datePickerDoneDue($event)">Done</ion-button>
          </ion-buttons>
        </ion-datetime>
      </div>
      <div class="flex justify-end">
        <button type="submit" class="btn-primary h-10 mt-4" @click="addNewItem">Create Task</button>
      </div>
    </form>
  </ion-content>
</template>