<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
  layout: "sidemenu"
});
const user = useSupabaseUser()
onMounted(() => {
  watchEffect(() => {
    if (!user.value) {
      navigateTo('auth/login')
    }
  })
})
</script>

<template>
  <IonPage>
    <IonContent class="" id="main-content">
      <TodoList />
    </IonContent>
  </IonPage>
</template>


