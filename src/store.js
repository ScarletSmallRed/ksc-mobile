import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
       checkedAreaName:null
  },
  actions: {
        store_checkedAreaName:({commit},payload)=>{
          commit('store_checkedAreaName',payload)
        }
  },
  mutations: {
        store_checkedAreaName:(state,payload)=>{
          state.checkedAreaName=payload
        }
  },
  getters: {
         get_checkedAreaName:(state)=>{
           return state.checkedAreaName
         }
  }
});

export default store;
