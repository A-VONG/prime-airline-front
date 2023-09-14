export const state = () => ({
  account: null, // Initialisez l'username à null
});

export const mutations = {
  setAccount(state, account) {
    state.account = account;
  },
};
