export const state = () => ({
  accountData: null,
});

export const mutations = {
  setAccount(state, accountData) {
    state.accountData = accountData; //state
    localStorage.setItem("accountData", JSON.stringify(accountData)); //local
  },
};
