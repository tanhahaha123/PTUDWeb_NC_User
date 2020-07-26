import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'

Vue.use(Vuex)

import axios from 'axios';

export default new Vuex.Store({
  state: {
    //tables cho TransactionHistory
    receiveHisTable:[],
    tranferHisTable:[],
    loanHisTable:[],
    //tables,info cho AccountsList
    accountsList:[],
    userPaymentNumber:'', //chi co 1
    userSavingNumbers:[],
    userPaymentDetail:[],
    userSavingDetail:[],
    //search query
    tranferQuery:'',
    receiveQuery:'',
    loanQuery:''
  },
  getters:{
    tranferFilter(state) {
      if (state.tranferQuery.length === 0) {
        return state.tranferHisTable;
      }

      const lcQuery = state.tranferQuery.toLocaleLowerCase();
      return state.tranferHisTable.filter(
        t => t.ThongTinNguoiGui.toLocaleLowerCase().includes(lcQuery)
      );
    },
    receiveFilter(state) {
      if (state.receiveQuery.length === 0) {
        return state.receiveHisTable;
      }

      const lcQuery = state.receiveQuery.toLocaleLowerCase();
      return state.receiveHisTable.filter(
        t => t.ThongTinNguoiGui.toLocaleLowerCase().includes(lcQuery)
      );
    },
    loanFilter(state) {
      if (state.loanQuery.length === 0) {
        return state.loanHisTable;
      }

      const lcQuery = state.loanQuery.toLocaleLowerCase();
      return state.loanHisTable.filter(
        t => t.SoTaiKhoanNguoiGui.toLocaleLowerCase().includes(lcQuery)
      );
    }
  },
  mutations: {
    GET_RECEIVE_HISTORY(state, payload){
      for(const i in payload){
        payload[i].NgayGiaoDich=moment(payload[i].NgayGiaoDich, 'YYYY-MM-DD').format('DD/MM/YYYY');
      }
      state.receiveHisTable=payload;
    },
    GET_TRANFER_HISTORY(state, payload){
      for(const i in payload){
        payload[i].NgayGiaoDich=moment(payload[i].NgayGiaoDich, 'YYYY-MM-DD').format('DD/MM/YYYY');
      }
      state.tranferHisTable=payload;
      // state.tranferHisTable=payload.map(t=>{
      //   t.NgayGiaoDich=moment(t.NgayGiaoDich, 'YYYY-MM-DD').format('DD/MM/YYYY');
      // });
      
    },
    GET_LOAN_HISTORY(state, payload){
      for(const i in payload){
        payload[i].NgayGiaoDich=moment(payload[i].NgayGiaoDich, 'YYYY-MM-DD').format('DD/MM/YYYY');
      }
      state.loanHisTable=payload;
    },
    UPDATE_TRANFER_QUERY(state, payload) {
      state.tranferQuery = payload;
    },
    UPDATE_RECEIVE_QUERY(state, payload) {
      state.receiveQuery = payload;
    },
    UPDATE_LOAN_QUERY(state, payload) {
      state.loanQuery= payload;
    },
    GET_ACCOUNTS_LIST(state, payload){
      state.accountsList=payload;
    },
    GET_USER_PAYMENT_NUMBER(state){
      const type='thanh toán';
      for(const i in state.accountsList){
        if(state.accountsList[i].LoaiTaiKhoan==type)
        state.userPaymentNumber=state.accountsList[i].SoTaiKhoan;
      }
    },
    GET_USER_SAVING_NUMBERS(state){
      const type='tiết kiệm';
      state.userSavingNumbers=[];
      for(const i in state.accountsList){
        if(state.accountsList[i].LoaiTaiKhoan==type)
        state.userSavingNumbers.push(state.accountsList[i].SoTaiKhoan);
      }
      //state.userSavingNumber=stk;
    },
    GET_USER_PAYMENT_DETAIL(state,payload){
      state.userPaymentDetail=payload;
    },
    GET_USER_SAVING_DETAIL(state,payload){
      for(const i in payload){
        payload[i].stt=parseInt(i)+1;
        payload[i].NgayGui=moment(payload[i].NgayGui, 'YYYY-MM-DD').format('DD/MM/YYYY');
      }
      state.userSavingDetail=payload;
    },
  },
  actions: {
    //lay lich su nhan tien
    async getReceiveHis(ctx){
      const userSTK='258258258';
      const respone=await axios.get('http://localhost:3000/api/internal/transaction/ReceiveTransaction/'+userSTK);
      ctx.commit('GET_RECEIVE_HISTORY',Object.values(respone.data));
    },
    //lay lich su chuyen khoan
    async getTranferHis(ctx){
      const respone=await axios.get('http://localhost:3000/api/internal/transaction/TranferTransaction/258258258');
      ctx.commit('GET_TRANFER_HISTORY',Object.values(respone.data));
    },
    //lay lich su nhac no
    async getLoanHis(ctx){
      const respone=await axios.get('http://localhost:3000/api/internal/transaction/LoanTransaction/258258258');
      ctx.commit('GET_LOAN_HISTORY',Object.values(respone.data));
    },
     //lay chuoi tim kiem lich su chuyen khoan
     updateTranferQuery(ctx, term) {
      ctx.commit('UPDATE_TRANFER_QUERY', term);
    },
    //lay chuoi tim kiem lich su nhan tien
    updateReceiveQuery(ctx, term) {
      ctx.commit('UPDATE_RECEIVE_QUERY', term);
    },
    //lay chuoi tim kiem lich su nhac no
    updateLoanQuery(ctx, term) {
      ctx.commit('UPDATE_LOAN_QUERY', term);
    },
    //lay danh sach tk + stk thanh toan + stk tiet kiem
    async getAccountsList(ctx){
      const respone=await axios.get('http://localhost:3000/api/internal/accountbank/UserAccountsList/2');
      ctx.commit('GET_ACCOUNTS_LIST',Object.values(respone.data));
      ctx.commit('GET_USER_PAYMENT_NUMBER');
      ctx.commit('GET_USER_SAVING_NUMBERS');
    },
    //lay thong tin stk thanh toan
    async getUserPaymentDetail(ctx, stkThanhToan){
      console.log(stkThanhToan);
      const respone=await axios.get('http://localhost:3000/api/internal/paymentaccount/detail/'+stkThanhToan);
      ctx.commit('GET_USER_PAYMENT_DETAIL',Object.values(respone.data));
    },
    //lay thong tin cac stk tiet kiem
    async getUserSavingDetail(ctx, stkTietKiem){
      const result=[];
      for(const stktk of stkTietKiem){
        const respone=await axios.get('http://localhost:3000/api/internal/savingaccount/detail/'+stktk);
        result.push(Object.values(respone.data)[0]);
      }
      console.log(result);
      ctx.commit('GET_USER_SAVING_DETAIL',result);
    },
  },
  modules: {
  }
})
