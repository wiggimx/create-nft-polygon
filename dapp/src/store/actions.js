import { ethers } from "ethers";
import Fight from "../utils/cryptolucha.json";

export default {
  async connect({ commit, dispatch }, connect) {
    console.log(process.env)
    try {
      const { ethereum } = window;
      if (!ethereum) {
        commit("setError", "Metamask not installed!");
        return;
      }
      if (!(await dispatch("checkIfConnected")) && connect) {
        await dispatch("requestAccess");
      }
      await dispatch("checkNetwork")
    } catch (error) {
      console.log(error);
      commit("setError", "Account request refused.");
    }
  },
  async checkIfConnected({ commit }) {
    const { ethereum } = window;
    const accounts = await ethereum.request({ method: "eth_accounts" });
    if (accounts.length !== 0) {
      commit("setAccount", accounts[0]);
      return 1;
    } else {
      return 0;
    }
  },
  async switchNetwork() {
    const { ethereum } = window;
    try {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: process.env.VUE_APP_HEX_CHAIN_ID}],
      });
      return 1;
    } catch (switchError) {
      await ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: process.env.VUE_APP_HEX_CHAIN_ID,
            chainName: process.env.VUE_APP_CHAIN_NAME,
            nativeCurrency: {
              name: "MATIC",
              symbol: "MATIC", // 2-6 characters long
              decimals: 18,
            },
            rpcUrls: [process.env.VUE_APP_RPC_URL],
            blockExplorerUrls:[process.env.VUE_APP_BLOCK_EXPLORERS]
          },
        ],
      });
      return 0;
    }
  },
  async checkNetwork({ commit, dispatch }) {
    const { ethereum } = window;
    let chainId = await ethereum.request({ method: "eth_chainId" });
    const polygonChainId = process.env.VUE_APP_HEX_CHAIN_ID;
    if (chainId !== polygonChainId) {
      if (!(await dispatch("switchNetwork"))) {
        commit(
          "setError",
          "You are not connected to the Polygon Test Network!"
        );
      }
    }
  },
  async requestAccess({ commit }) {
    const { ethereum } = window;
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    commit("setAccount", accounts[0]);
  },
  async getContract({ state }) {
    try {
      const { ethereum } = window;
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(
        state.contract_address,
        Fight.abi,
        signer
      );
      return connectedContract;
    } catch (error) {
      console.log(error);
      console.log("connected contract not found");
      return null;
    }
  },
  async getMaxSupply({dispatch,commit}){
    try{
      const connectedContract = await dispatch("getContract");
      const supplyTxn = await connectedContract.MAX_SUPPLY();
      console.log(supplyTxn.toNumber())
      commit("setMaxSupply",supplyTxn.toNumber())
    }catch (error) {
      console.log(error);
    }
  },
  async getTokensByOwner({dispatch,commit,state}){
    try{
      const connectedContract = await dispatch("getContract");
      const charactersTxn = await connectedContract.getTokensByOwner(state.account);
      const tokensIds = charactersTxn.map(( id )=> id.toNumber())
      console.log(tokensIds)
      commit("setFigthers",tokensIds)
    }catch (error) {
      console.log(error);
    }
  },
  async getIFPS({dispatch,commit}){
    try{
      const connectedContract = await dispatch("getContract");
      const ifpsTxn = await connectedContract.baseTokenURI();
      console.log(ifpsTxn)
      commit("setIFPS",ifpsTxn)
    }catch (error) {
      console.log(error);
    }
  },
  async mint({dispatch,commit}){
    try{

      commit("setMint")
      const connectedContract = await dispatch("getContract");
      const options = {value: ethers.utils.parseEther(".1")}
      const ifpsTxn =await connectedContract.mintNFTs(1,options);
      console.log(ifpsTxn)
      commit("setMint")
    }catch (error) {
      commit("setMint")
      console.log(error);
    }
  },
}
