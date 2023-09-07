<script setup lang="ts">
 const credentials = reactive({
    user_name: '',
    email: '',
    password: '',
  });
const supabase = useSupabaseClient();
const router = useRouter()
async function createAccount() {
  try {
    const { user_name, email, password } = credentials;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          user_name,
          email,
        },
      },
    });
    if (error) {
      console.error(error);
    } else {
      alert('Please confirm your signup before login by click on the link sent to your email.')
      await router.push('/auth/login')
      console.log(data);      
    }
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <IonPage class="bg-white">
    <IonContent>
      <section class="flex items-center justify-center mt-16">
        <div class="bg-gray-100 flex p-4 rounded-2xl shadow-lg max-w-3xl">
          <div class="md:w-1/2 px-8">
            <h2 class="auth-text">Register New Account</h2>
            <p class="auth-sub-text">Please fill in your details to continue login</p>
            <form @submit.prevent="createAccount" class="flex flex-col gap-4">
              <input type="text" name="email" placeholder="Email" class="input-text" v-model="credentials.email">
              <input type="text" name="name" placeholder="Name" class="input-text" v-model="credentials.user_name">
              <input type="password" placeholder="Password" class="input-text" v-model="credentials.password">
              <button type="submit" class="btn-primary">Register</button>
              <div class="auth-question">
                <p>Already have account?</p>
                <NuxtLink to="/auth/login">
                  <button class="btn-option">Login</button>
                </NuxtLink>
              </div>
            </form>
          </div>
          <div class="md:block hidden w-1/2 p-4 bg-blue-200 rounded-2xl">
            <img src="../../assets/img/login.svg" alt="login-background">
          </div>
        </div>
      </section>
    </IonContent>
  </IonPage>
</template>