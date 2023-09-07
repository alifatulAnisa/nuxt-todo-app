export const useUtils = () => {
  const supabase = useSupabaseClient();

  const error = ref(null);
  const router = useRouter();

  async function logout() {
    try {
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) {
        console.log(signOutError.message);
      } else {
        await router.push('/auth/login');
        console.log('Logout');
      }
    } catch (err) {
      console.log(err);
      
    }
  }

  return { logout, error };
}