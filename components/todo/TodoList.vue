<script setup lang="ts">
const currentDate = ref('')

function getCurrentDate() {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date().toLocaleDateString(undefined, options);
  currentDate.value = date;
}

onMounted(getCurrentDate)
</script>

<template>
  <IonPage>
    <IonContent>
      <div class="ion-padding">
        <div class="">
          <div class="text-xs">
            <label class="ml-3">{{ currentDate }}</label>  
          </div>
          <div class="">
            <TodoItem class="mt-8" />
          </div>
        </div>
      </div>
    </IonContent>
  </IonPage>
</template>