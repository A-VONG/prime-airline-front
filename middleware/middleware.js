// middleware/yourMiddleware.js

export default async function ({ store, redirect }) {
  if (!store.state?.account?.accountData) {
    //Pas de persitance Refacto
    // Redirigez l'utilisateur vers la page de connexion
    redirect("/login");
  }
}
