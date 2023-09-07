<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton default-href="/"></IonBackButton>
        </IonButtons>
        <IonTitle>About Page</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
    </IonContent>
  </IonPage>
</template>