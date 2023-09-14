// middleware/yourMiddleware.js

export default async function ({ store, redirect }) {
  if (!store.state.account?.account) {
    // Redirigez l'utilisateur vers la page de connexion
    redirect("/login");
  }
}
