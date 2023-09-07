export default defineNuxtRouteMiddleware(async (to) => {
  const { auth } = useSupabaseAuthClient();
  const user = await auth.getUser();

  if (!user) {
    return navigateTo('/auth/login');
  }
})
