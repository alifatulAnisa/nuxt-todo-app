<script setup lang="ts">
import { useUtils } from '../composable/useUtils';

const { logout } = useUtils()
const user = useSupabaseUser();
const isLoading = ref(false)
</script>

<template>
  <IonPage>
    <IonHeader class="bg-white">
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton></IonMenuButton>
        </IonButtons>
        <IonTitle class="text-black">Todo App</IonTitle>
        <div v-if="isLoading">
          <ion-progress-bar type="indeterminate"></ion-progress-bar>
        </div>
      </IonToolbar>
    </IonHeader>
    <IonMenu side="start" content-id="main-content">
      <IonContent class="ion-padding">
        <div class="px-2">
          <div class="flex justify-center items-center">
            <img src="../assets/img/profile.png" alt="profile" class="w-1/2">
          </div>
          <div class="items-center">
            <label for="" class="mr-2">Welcome,</label>
            <IonTitle class="text-black font-bold p-0">{{ user?.user_metadata.user_name }}</IonTitle><br>
          </div>
          <NuxtLink to="/forms/formtodonew">
            <IonButton color="dark" class="side-menu">
              Add New Task
            </IonButton>
          </NuxtLink>
          <NuxtLink to="/">
            <IonButton color="dark" class="side-menu">
              <a href="" class="text-white">Tasks</a>
            </IonButton>
          </NuxtLink>
        </div>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <div class="flex items-end">
            <button class="px-4" @click="logout">Logout user</button>
          </div>
        </IonToolbar>
      </IonFooter>
    </IonMenu>
    <IonContent class="" id="main-content">
      <slot />
    </IonContent>
  </IonPage>
</template>