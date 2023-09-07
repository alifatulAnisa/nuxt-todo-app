<script setup lang="ts">
import { useTodoStore } from '~/store/todolist';

const router = useRouter();
const user = useSupabaseUser();
const { auth } = useSupabaseAuthClient();
const isLoading = ref(false);
const cancelWatch = ref();
const todoStore = useTodoStore();

onIonViewDidEnter(() => {
  cancelWatch.value = watchEffect(() => {
    try {
      if (user.value) {
        console.log('have user...', user?.value);
        router.push('/').catch((error) => {
          console.error('Navigation error:', error);
        });
      }
    } catch (error) {
      console.error('Error in onIonViewDidEnter:', error);
    }
  });
});

onIonViewDidLeave(() => {
  cancelWatch.value();
});

const credentials = ref({
  email: '',
  password: '',
});

const login = async () => {
  try {
    const { data, error } = await auth.signInWithPassword({
      ...credentials.value,
    });
    if (error) throw error;
    if (data?.user?.id) {
      console.log(data);
      await useTodoStore().retrieveItems();
      await navigateTo('/');
    } else {
      throw new Error('User object or user ID is null or undefined');
    }
  } catch (error) {
    alert((error as any)?.message);
  }
};
</script>

<template>
  <IonPage class="bg-white">
    <IonContent>
      <section class="flex items-center justify-center mt-16">
        <div class="bg-gray-100 flex p-4 rounded-2xl shadow-lg max-w-3xl">
          <div class="md:w-1/2 px-8">
            <h2 class="auth-text">Login</h2>
            <p class="auth-sub-text">Please Login with your registered email</p>  
            <form @submit.prevent="login" class="flex flex-col gap-4 text-black">
              <input type="text" name="email" placeholder="Email" autocomplete="password" class="input-text" v-model="credentials.email">
              <input type="password" name="password" autocomplete="password" placeholder="Password" class="input-text" v-model="credentials.password">
              <button type="submit" class="btn-primary" :disabled="isLoading">Login</button>
              <p class="text-xs">Forgot Password?</p>
              <div class="auth-question">
                <p>Don't have an account?</p>
                <NuxtLink to="/auth/register">
                  <button type="submit" class="btn-option">Register</button>
                </NuxtLink>
              </div>
              <div v-if="isLoading">
                <ion-progress-bar type="indeterminate"></ion-progress-bar>
              </div>
            </form>
          </div>
          <div class="md:block hidden w-1/2 p-4 bg-blue-200 rounded-2xl">
            <img src="../../assets/img/login.svg" alt="background-form">
          </div>
        </div>
      </section>
    </IonContent>
  </IonPage>
</template>