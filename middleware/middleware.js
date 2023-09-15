// middleware/yourMiddleware.js

export default async function ({ store, redirect }) {
  if (!store.state?.account?.accountData) {
    // Redirigez l'utilisateur vers la page de connexion
    redirect("/login");
  }
}
