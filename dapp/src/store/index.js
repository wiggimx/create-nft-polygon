import Vue from "vue";
import Vuex from "vuex";

import actions from "./actions"

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    account:null,
    error:null,
    mining:false,
    ifps:null,
    figthers:[],
    maxSupply:0,
    contract_address:"0x0A729330496b7578b8cAc4C6dd87e2FDDa1F12Cf"
  },
  actions,
  getters:{
    account:(state)=> state.account,
    figthers:(state)=> state.figthers,
    ifps:(state)=> state.ifps,
    mint:(state)=> state.mining,
  },
  mutations:{
    setMint(state) {
      state.mining = !state.mining;
    },
    setAccount(state, account) {
      state.account = account;
    },
    setIFPS(state, ifps) {
      state.ifps = ifps;
    },
    setMaxSupply(state, maxSupply) {
      state.maxSupply = maxSupply;
    },
    setFigthers(state, figthers) {
      state.figthers = figthers;
    },
    setError(state, error) {
      state.error = error;
    },
  },
})
