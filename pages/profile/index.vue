<script setup lang="ts">
import { useTodoStore } from '@/store/todolist';

definePageMeta({
  middleware: ['auth'],
  layout: "sidemenu"
});

const user = useSupabaseUser()
const todoStore = useTodoStore();

const profile = ref({
  email: '',
  username: '',
})
</script>

<template>
  <IonPage class="">
    <IonContent class="ion-padding">
      <div class="text-center">
        <div class="flex justify-center items-center">
          <img src="../../assets/img/profile.png" alt="profile" class="w-1/3">
        </div>
        <IonTitle class="text-black font-bold p-0">{{ user?.user_metadata.user_name }}</IonTitle><br>
      </div>
      <div v-if="user">
        <ion-card color="light" class="rounded-lg">
          <ion-card-header>
            <ion-card-subtitle class="font-bold">Email</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content class="text-slate-500">
            <ion-input v-model="email" type="email">{{ user?.email }}</ion-input>
          </ion-card-content>
        </ion-card>
        <ion-card color="light" class="rounded-lg">
          <ion-card-header>
            <ion-card-subtitle class="font-bold">Username</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content class="text-slate-500">
            <ion-input v-model="username" type="text">{{ user?.user_metadata.user_name }}</ion-input>
          </ion-card-content>
        </ion-card>
        <ion-button @click="updateProfile">Update</ion-button>
      </div>
    </IonContent>
  </IonPage>
</template>