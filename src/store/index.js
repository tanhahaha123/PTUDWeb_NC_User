/* eslint-disable prettier/prettier */
import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';
import { router } from "../routes/routes";
import { alert } from './alert.module';
import { account } from './account.module';
Vue.use(Vuex);

import axios from 'axios';
const axiosApiInstance = axios.create();

// Request
axiosApiInstance.interceptors.request.use(
  async config => {
    let a= JSON.parse(localStorage.getItem("user"));
    console.log("Request: ",a);
    //const keys = JSON.parse(value)
    if(a){
      config.headers = { 
        "x-access-token": a.response.accessToken
      }
    }
    return config;
  },
  error => {
    Promise.reject(error)
});

// Response
axiosApiInstance.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const originalRequest = error.config;
  //console.log("originalRequest: ", originalRequest);
  if (error.response.status === 401 && !originalRequest._retry) {
    //console.log("Here");
    originalRequest._retry = true;
    const payload = {
      "AccessToken": JSON.parse(localStorage.getItem("user")).response.accessToken,
      "RefreshToken": JSON.parse(localStorage.getItem("user")).response.refreshToken
    }
    let response;
    try {
      response = await axios.post('https://bank25.herokuapp.com/api/auth/refresh-token',payload);
    }
    catch(e){
      localStorage.removeItem("user");
      router.push("login");
      // console.log("Log: ", e.response);
    }
    
    // console.log("AccessToken: ", accessToken);
    // if(response.data.err){
    //   // this.$store.dispatch()
    //   router.push("login");
    // }else{
    //   // commit('ADD_DEBT_REMINDER_SUCCESS',respone.data);
    //   // router.push("debtReminder");
    // }        
    // const localStore = JSON.parse(localStorage.getItem("user"));
    // localStore.response.accessToken = accessToken.data;
    // //console.log("localStore: ", localStore.response);
    // localStorage.setItem("user", JSON.stringify(localStore));  
    //axios.defaults.headers.common['x-access-token'] = accessToken.data;
    
    return axiosApiInstance(originalRequest);
  }
  return Promise.reject(error);
});


export default new Vuex.Store({
  modules:{
    alert,
    account
  },
  state: {
    idTaiKhoanKhachHang: null, //============LẤY TỪ TOKEN========== 
    //tables cho TransactionHistory
    receiveHisTable: [],
    tranferHisTable: [],
    loanHisTable: [],

    //tables,info cho AccountsList
    accountsList:[],
    userPaymentNumber:'', //chi co 1
    userSavingNumbers:[],
    userPaymentDetail:[],
    userSavingDetail:[],
    //search query
    tranferQuery:'',
    receiveQuery:'',
    loanQuery:'',

    // userId: null, //ID của người dùng sau khi đăng nhập
    ThongTinKhachHang: {
      "TenKhachHang": null,
      "GioiTinh": null,
      "NgaySinh": null,
      "SoCMND": null,
      "DiaChi": null,
      "SoDienThoai": null,
      "Email": null,
      "NgheNghiep": null
    },
    DanhSachNguoiThuHuong: [],
    DanhSachNguoiThuHuongChuyenKhoanInternal: [],
    DanhSachNguoiThuHuongChuyenKhoanExternal: [],
    errDoiMatKhau: null,
    displayDoiMatKhauThanhCong: false,
    displayDoiMatKhauThatBai: false,
    DanhSachTaiKhoanThanhToan: [],
    selectedTaiKhoanThanhToan: null,
    DanhSachTaiKhoanThanhToanInternal: [],
    DanhSachTaiKhoanThanhToanExternal: [],
    SoDuTaiKhoanThanhToanInternal: null,
    SoDuTaiKhoanThanhToanExternal: null,
    SoDuTaiKhoanThanhToanInternalSauGiaoDich: null,
    SoDuTaiKhoanThanhToanExternalSauGiaoDich: null,
    LoadingSoDuInternal: false,
    LoadingSoDuExternal: false,
    LoadingTimKiemInternal: false,
    LoadingTimKiemExternal: false,
    LoadingGiaoDichInternal: false,
    LoadingGiaoDichExternal: false,
    TenTaiKhoanNguoiHuongInternal: null,
    TenTaiKhoanNguoiHuongExternal: null,
    LoadingTenTaiKhoanNguoiHuongInternal: false,
    LoadingTenTaiKhoanNguoiHuongExternal: false,
    displayChuyenKhoanInternalThanhCong: false,
    displayChuyenKhoanExternalThanhCong: false,
    errChuyenKhoanInternal: null,
    errChuyenKhoanExternal: null,
    DanhSachTenNganHangExternal: null,
    
    //query:''

    //tables cho DebtReminder
    status: {},
    debtReminderTable: [],
    selectedMessage: null,
    accountTable: [],
  },
  getters: {
    tranferFilter(state) {
      if (state.tranferQuery.length === 0) {
        return state.tranferHisTable;
      }

      const lcQuery = state.tranferQuery.toLocaleLowerCase();
      return state.tranferHisTable.filter(t =>
        t.ThongTinNguoiGui.toLocaleLowerCase().includes(lcQuery)
      );
    },
    receiveFilter(state) {
      if (state.receiveQuery.length === 0) {
        return state.receiveHisTable;
      }

      const lcQuery = state.receiveQuery.toLocaleLowerCase();
      return state.receiveHisTable.filter(t =>
        t.ThongTinNguoiGui.toLocaleLowerCase().includes(lcQuery)
      );
    },
    loanFilter(state) {
      if (state.loanQuery.length === 0) {
        return state.loanHisTable;
      }

      const lcQuery = state.loanQuery.toLocaleLowerCase();
      return state.loanHisTable.filter(t =>
        t.SoTaiKhoanNguoiGui.toLocaleLowerCase().includes(lcQuery)
      );
    },

    dateThongTinKhachHang(state){
      let date = moment(state.ThongTinKhachHang.NgaySinh).utc().format('YYYY-MM-DD')
      return date;
    },
    themsttDanhSachNguoiThuHuong(state){
      let ds = JSON.parse(JSON.stringify(state.DanhSachNguoiThuHuong));
      ds.forEach((ite,idx)=>{
        ite.STT = idx + 1;
      });
      return ds;
    }
  },
  mutations: {
    SET_ID_TAI_KHOAN_KHACH_HANG(state,payload){
      state.idTaiKhoanKhachHang = payload;
    },
    GET_RECEIVE_HISTORY(state, payload) {
      for (const i in payload) {
        payload[i].NgayGiaoDich = moment(
          payload[i].NgayGiaoDich,
          "YYYY-MM-DD"
        ).format("DD/MM/YYYY");
      }
      state.receiveHisTable = payload;
    },
    GET_TRANFER_HISTORY(state, payload) {
      for (const i in payload) {
        payload[i].NgayGiaoDich = moment(
          payload[i].NgayGiaoDich,
          "YYYY-MM-DD"
        ).format("DD/MM/YYYY");
      }
      state.tranferHisTable = payload;
      // state.tranferHisTable=payload.map(t=>{
      //   t.NgayGiaoDich=moment(t.NgayGiaoDich, 'YYYY-MM-DD').format('DD/MM/YYYY');
      // });
    },
    GET_LOAN_HISTORY(state, payload) {
      for (const i in payload) {
        payload[i].NgayGiaoDich = moment(
          payload[i].NgayGiaoDich,
          "YYYY-MM-DD"
        ).format("DD/MM/YYYY");
      }
      state.loanHisTable = payload;
    },
    UPDATE_TRANFER_QUERY(state, payload) {
      state.tranferQuery = payload;
    },
    UPDATE_RECEIVE_QUERY(state, payload) {
      state.receiveQuery = payload;
    },
    UPDATE_LOAN_QUERY(state, payload) {
      state.loanQuery = payload;
    },
    GET_ACCOUNTS_LIST(state, payload) {
      state.accountsList = payload;
    },
    GET_USER_PAYMENT_NUMBER(state) {
      const type = "thanh toán";
      for (const i in state.accountsList) {
        if (state.accountsList[i].LoaiTaiKhoan == type)
          state.userPaymentNumber = state.accountsList[i].SoTaiKhoan;
      }
    },
    GET_USER_SAVING_NUMBERS(state) {
      const type = "tiết kiệm";
      state.userSavingNumbers = [];
      for (const i in state.accountsList) {
        if (state.accountsList[i].LoaiTaiKhoan == type)
          state.userSavingNumbers.push(state.accountsList[i].SoTaiKhoan);
      }
      //state.userSavingNumber=stk;
    },
    GET_USER_PAYMENT_DETAIL(state, payload) {
      state.userPaymentDetail = payload;
    },
    GET_USER_SAVING_DETAIL(state,payload){
      for(const i in payload){
        payload[i].stt=parseInt(i)+1;
        payload[i].NgayGui=moment(payload[i].NgayGui, 'YYYY-MM-DD').format('DD/MM/YYYY');
      }
      state.userSavingDetail=payload;
    },


    // SET_USER_ID(state,payload){
    //   state.userId = payload;
    // },
    SET_THONG_TIN_KHACH_HANG(state,payload){
      state.ThongTinKhachHang = payload;
    },
    SET_DANH_SACH_NGUOI_THU_HUONG(state,payload){
      state.DanhSachNguoiThuHuong = payload;
    },
    SET_SELECTED_TAI_KHOAN_THANH_TOAN(state,payload){
      state.selectedTaiKhoanThanhToan = payload;
    },
    SET_DANH_SACH_NGUOI_THU_HUONG_CHUYEN_KHOAN_INTERNAL(state,payload){
      state.DanhSachNguoiThuHuongChuyenKhoanInternal = payload;
    },
    SET_DANH_SACH_NGUOI_THU_HUONG_CHUYEN_KHOAN_EXTERNAL(state,payload){
      state.DanhSachNguoiThuHuongChuyenKhoanExternal = payload;
    },
    UPDATE_DANH_SACH_NGUOI_THU_HUONG(state,payload){
      let idx = parseInt(payload.STT)-1;
      state.DanhSachNguoiThuHuong[idx].TenGoiNho = payload.TenGoiNho;
      state.DanhSachNguoiThuHuong[idx].SoTaiKhoanNguoiNhan = payload.SoTaiKhoanNguoiNhan;
      state.DanhSachNguoiThuHuong[idx].TenNganHang = payload.TenNganHang;
    },
    DELETE_DANH_SACH_NGUOI_THU_HUONG(state,payload){
      let arr = state.DanhSachNguoiThuHuong.filter(function(el) { return el.SoTaiKhoanNguoiNhan != payload; });
      state.DanhSachNguoiThuHuong = JSON.parse(JSON.stringify(arr));
    },
    SET_ERR_DOI_MAT_KHAU(state,payload){
      state.errDoiMatKhau = payload;
    },
    SET_DOI_MAT_KHAU_THANH_CONG(state,payload){
      state.displayDoiMatKhauThanhCong = payload;
    },
    SET_DOI_MAT_KHAU_THAT_BAI(state,payload){
      state.displayDoiMatKhauThatBai = payload;
    },
    SET_DANH_SACH_TAI_KHOAN_THANH_TOAN(state,payload){
      state.DanhSachTaiKhoanThanhToan = payload;
    },
    SET_DANH_SACH_TAI_KHOAN_THANH_TOAN_INTERNAL(state,payload){
      state.DanhSachTaiKhoanThanhToanInternal = payload;
    },
    SET_DANH_SACH_TAI_KHOAN_THANH_TOAN_EXTERNAL(state,payload){
      state.DanhSachTaiKhoanThanhToanExternal = payload;
    },
    SET_SO_DU_TAI_KHOAN_THANH_TOAN_INTERNAL(state,payload){
      state.SoDuTaiKhoanThanhToanInternal = payload;
    },
    SET_SO_DU_TAI_KHOAN_THANH_TOAN_EXTERNAL(state,payload){
      state.SoDuTaiKhoanThanhToanExternal = payload;
    },
    SET_SO_DU_TAI_KHOAN_THANH_TOAN_INTERNAL_SAU_GIAO_DICH(state,payload){
      state.SoDuTaiKhoanThanhToanInternalSauGiaoDich = payload;
    },
    SET_SO_DU_TAI_KHOAN_THANH_TOAN_EXTERNAL_SAU_GIAO_DICH(state,payload){
      state.SoDuTaiKhoanThanhToanExternalSauGiaoDich = payload;
    },
    SET_LOADING_SO_DU_INTERNAL(state,payload){
      state.LoadingSoDuInternal = payload;
    },
    SET_LOADING_SO_DU_EXTERNAL(state,payload){
      state.LoadingSoDuExternal = payload;
    },
    SET_LOADING_TIM_KIEM_INTERNAL(state,payload){
      state.LoadingTimKiemInternal = payload;
    },
    SET_LOADING_TIM_KIEM_EXTERNAL(state,payload){
      state.LoadingTimKiemExternal = payload;
    },
    SET_LOADING_GIAO_DICH_INTERNAL(state,payload){
      state.LoadingGiaoDichInternal = payload;
    },
    SET_LOADING_GIAO_DICH_EXTERNAL(state,payload){
      state.LoadingGiaoDichExternal = payload;
    },
    SET_TEN_TAI_KHOAN_NGUOI_HUONG_INTERNAL(state,payload){
      state.TenTaiKhoanNguoiHuongInternal = payload;
    },
    SET_TEN_TAI_KHOAN_NGUOI_HUONG_EXTERNAL(state,payload){
      state.TenTaiKhoanNguoiHuongExternal = payload;
    },
    SET_LOADING_TEN_TAI_KHOAN_NGUOI_HUONG_INTERNAL(state,payload){
      state.LoadingTenTaiKhoanNguoiHuongInternal = payload;
    },
    SET_LOADING_TEN_TAI_KHOAN_NGUOI_HUONG_EXTERNAL(state,payload){
      state.LoadingTenTaiKhoanNguoiHuongExternal = payload;
    },
    SET_ERR_CHUYEN_KHOAN_INTERNAL(state,payload){
      state.errChuyenKhoanInternal = payload;
    },
    SET_ERR_CHUYEN_KHOAN_EXTERNAL(state,payload){
      state.errChuyenKhoanExternal = payload;
    },
    SET_CHUYEN_KHOAN_INTERNAL_THANH_CONG(state,payload){
      state.displayChuyenKhoanInternalThanhCong = payload;
    },
    SET_CHUYEN_KHOAN_EXTERNAL_THANH_CONG(state,payload){
      state.displayChuyenKhoanExternalThanhCong = payload;
    },
    SET_DANH_SACH_TEN_NGAN_HANG_EXTERNAL(state,payload){
      state.DanhSachTenNganHangExternal = payload;
    },

    GET_DEBT_REMINDER_REQUEST(state, payload){
      
      // for(const i in payload.source){
      //   payload[i].NgayGiaoDich=moment(payload[i].NgayGiaoDich, 'YYYY-MM-DD').format('DD/MM/YYYY');
      // }
      //console.log("GET_DEBT_REMINDER_SUCCESS");
      state.status = { getDebtRemindering: true}
    },
    GET_DEBT_REMINDER_SUCCESS(state, payload){
      
      // for(const i in payload.source){
      //   payload[i].NgayGiaoDich=moment(payload[i].NgayGiaoDich, 'YYYY-MM-DD').format('DD/MM/YYYY');
      // }
      console.log("GET_DEBT_REMINDER_SUCCESS");
      console.log(payload.source);
      state.status = { getDebtReminderSuccess: true}
      state.debtReminderTable=payload;
    },
    REMOVE_DEBT_REMINDER(state, payload){
      // for(const i in payload.source){
      //   payload[i].NgayGiaoDich=moment(payload[i].NgayGiaoDich, 'YYYY-MM-DD').format('DD/MM/YYYY');
      // }
      //console.log(payload.source);
      // console.log(payload);
      state.debtReminderTable=payload;
    },
    GET_ACCOUNT_INFO_REQUEST(state, payload){
      state.status = { getAccountInfoing: true}
    },
    GET_ACCOUNT_INFO_SUCCESS(state, payload){
      state.status = { getAccountInfoed: true}
      state.accountTable= payload;
    },
    GET_ACCOUNT_INFO_FAILED(state, payload){
      state.status = { getAccountInfoFailed: true}
      state.accountTable= payload.err;
    },
    ADD_DEBT_REMINDER_REQUEST(state, payload){
      state.status = { addDebtRemindering: true}
    },
    ADD_DEBT_REMINDER_SUCCESS(state, payload){
      state.status = { addDebtRemindered: true}
      //state.accountTable= payload;
    },
    ADD_DEBT_REMINDER_FAILED(state, payload){
      state.status = { addDebtReminderFailed: true}
      //state.accountTable= payload.err;
    },

  },
  actions: {
    //lay lich su nhan tien
    async getReceiveHis(ctx) {
      const user = JSON.parse(localStorage.getItem("user"));
      const respone = await axiosApiInstance.get(
        "https://bank25.herokuapp.com/api/internal/transaction/ReceiveTransaction/" +
          user.SourceAccountNumber
      );
      console.log(user.SourceAccountNumber);
      ctx.commit("GET_RECEIVE_HISTORY", Object.values(respone.data));
    },
    //lay lich su chuyen khoan
    async getTranferHis(ctx) {
      const user = JSON.parse(localStorage.getItem("user"));
      const respone = await axiosApiInstance.get(
        "https://bank25.herokuapp.com/api/internal/transaction/TranferTransaction/"+ user.SourceAccountNumber
      );
      ctx.commit("GET_TRANFER_HISTORY", Object.values(respone.data));
    },
    //lay lich su nhac no
    async getLoanHis(ctx) {
      const user = JSON.parse(localStorage.getItem("user"));
      const respone = await axiosApiInstance.get(
        "https://bank25.herokuapp.com/api/internal/transaction/LoanTransaction/"+ user.SourceAccountNumber
      );
      ctx.commit("GET_LOAN_HISTORY", Object.values(respone.data));
    },
    //lay chuoi tim kiem lich su chuyen khoan
    updateTranferQuery(ctx, term) {
      ctx.commit("UPDATE_TRANFER_QUERY", term);
    },
    //lay chuoi tim kiem lich su nhan tien
    updateReceiveQuery(ctx, term) {
      ctx.commit("UPDATE_RECEIVE_QUERY", term);
    },
    //lay chuoi tim kiem lich su nhac no
    updateLoanQuery(ctx, term) {
      ctx.commit("UPDATE_LOAN_QUERY", term);
    },
    //lay danh sach tk + stk thanh toan + stk tiet kiem
    async getAccountsList(ctx) {
      const user = JSON.parse(localStorage.getItem("user"));
      const detail = await axiosApiInstance.get(
        "https://bank25.herokuapp.com/api/internal/accountbank/detail/" + user.SourceAccountNumber
      );
      console.log(">>>>>>>>>>>>>>>>"+detail.data[0].idTaiKhoanKhachHang);

      const respone = await axiosApiInstance.get(
        "https://bank25.herokuapp.com/api/internal/accountbank/UserAccountsList/"+detail.data[0].idTaiKhoanKhachHang
      );
      ctx.commit("GET_ACCOUNTS_LIST", Object.values(respone.data));
      ctx.commit("GET_USER_PAYMENT_NUMBER");
      ctx.commit("GET_USER_SAVING_NUMBERS");
    },
    //lay thong tin stk thanh toan
    async getUserPaymentDetail(ctx, stkThanhToan) {
      console.log(stkThanhToan);
      const respone = await axiosApiInstance.get(
        "https://bank25.herokuapp.com/api/internal/paymentaccount/detail/" +
          stkThanhToan
      );
      ctx.commit("GET_USER_PAYMENT_DETAIL", Object.values(respone.data));
    },
    //lay thong tin cac stk tiet kiem
    async getUserSavingDetail(ctx, stkTietKiem) {
      const result = [];
      for (const stktk of stkTietKiem) {
        const respone = await axiosApiInstance.get(
          "https://bank25.herokuapp.com/api/internal/savingaccount/detail/" + stktk
        );
        result.push(Object.values(respone.data)[0]);
      }
      console.log(result);
      ctx.commit('GET_USER_SAVING_DETAIL',result);
    },


    // getAndsetuserId(ctx, token){//Lấy userId
    //   ctx.commit('SET_USER_ID',1);
    // },
    async getThongTinKhachHang(ctx){//Lấy thông tin khách hàng
      let res = await axios({
        method: 'get',
        url: 'https://bank25.herokuapp.com/api/internal/account-customer/my-account-customer/info',
        params: {
          "idTaiKhoanKhachHang": ctx.state.idTaiKhoanKhachHang
        }
      });
      ctx.commit('SET_THONG_TIN_KHACH_HANG',res.data);
    },
    async getFirstDanhSachNguoiThuHuong(ctx){//Lấy danh sách người thụ hưởng 
      let res1 = await axios({
        method: 'get',
        url: 'https://bank25.herokuapp.com/api/internal/account-customer/my-account-customer/payment-account',
        params: {
          "idTaiKhoanKhachHang": ctx.state.idTaiKhoanKhachHang
        }
      });
      ctx.commit('SET_SELECTED_TAI_KHOAN_THANH_TOAN',res1.data[0].SoTaiKhoan);
      ctx.commit('SET_DANH_SACH_TAI_KHOAN_THANH_TOAN',res1.data);
      let res2 = await axios({
        method: 'get',
        url: 'https://bank25.herokuapp.com/api/internal/account-bank/my-account-number/receiver-info',
        params: {
          "MyAccountNumber": res1.data[0].SoTaiKhoan
        }
      });
      ctx.commit('SET_DANH_SACH_NGUOI_THU_HUONG',res2.data);
    },
    async getDanhSachNguoiThuHuong(ctx,STK){//Lấy danh sách người thụ hưởng 
      let res = await axios({
        method: 'get',
        url: 'https://bank25.herokuapp.com/api/internal/account-bank/my-account-number/receiver-info',
        params: {
          "MyAccountNumber": STK
        }
      });
      ctx.commit('SET_DANH_SACH_NGUOI_THU_HUONG',res.data);
    },
    setSelectedTaiKhoanThanhToan(ctx,STK){//Lấy danh sách người thụ hưởng 
      ctx.commit('SET_SELECTED_TAI_KHOAN_THANH_TOAN',STK);
    },
    async getDanhSachNguoiThuHuongChuyenKhoanInternal(ctx,STK){//Lấy danh sách người thụ hưởng 
      ctx.commit('SET_DANH_SACH_NGUOI_THU_HUONG_CHUYEN_KHOAN_INTERNAL',null);
      let res2 = await axios({
        method: 'get',
        url: 'https://bank25.herokuapp.com/api/internal/account-bank/my-account-number/receiver-info',
        params: {
          "MyAccountNumber": STK
        }
      });
      await new Promise(resolve => setTimeout(resolve, 2000));
      ctx.commit('SET_DANH_SACH_NGUOI_THU_HUONG_CHUYEN_KHOAN_INTERNAL',res2.data);
      ctx.commit('SET_LOADING_TIM_KIEM_INTERNAL',false);
    },
    async getDanhSachNguoiThuHuongChuyenKhoanExternal(ctx,STK){//Lấy danh sách người thụ hưởng 
      ctx.commit('SET_DANH_SACH_NGUOI_THU_HUONG_CHUYEN_KHOAN_EXTERNAL',null);
      let res2 = await axios({
        method: 'get',
        url: 'https://bank25.herokuapp.com/api/internal/account-bank/my-account-number/receiver-info',
        params: {
          "MyAccountNumber": STK
        }
      });
      await new Promise(resolve => setTimeout(resolve, 1000));
      ctx.commit('SET_DANH_SACH_NGUOI_THU_HUONG_CHUYEN_KHOAN_EXTERNAL',res2.data);
      ctx.commit('SET_LOADING_TIM_KIEM_EXTERNAL',false);
    },
    async updateDanhSachNguoiThuHuong(ctx, payload){//Xóa người thụ hưởng
      let res1 = await axios({
        method: 'get',
        url: 'https://bank25.herokuapp.com/api/internal/account-customer/my-account-customer/payment-account',
        params: {
          "idTaiKhoanKhachHang": ctx.state.idTaiKhoanKhachHang
        }
      });
      let res2 = await axios({
        method: 'patch',
        url: 'https://bank25.herokuapp.com/api/internal/account-bank/my-account-number/receiver-info',
        // headers: {}, 
        data: {
          "MyAccountNumber": payload.SoTaiKhoan,
          "TenGoiNho": payload.TenGoiNho,
          "SoTaiKhoanNguoiNhan": payload.SoTaiKhoanNguoiNhan,
          "TenNganHang": payload.TenNganHang
        }
      });
      ctx.commit('UPDATE_DANH_SACH_NGUOI_THU_HUONG',payload);
    },
    async deleteDanhSachNguoiThuHuong(ctx, SoTaiKhoanNguoiNhan){//Xóa người thụ hưởng
      let res1 = await axios({
        method: 'get',
        url: 'https://bank25.herokuapp.com/api/internal/account-customer/my-account-customer/payment-account',
        params: {
          "idTaiKhoanKhachHang": ctx.state.idTaiKhoanKhachHang
        }
      });
      let res2 = await axios({
        method: 'delete',
        url: 'https://bank25.herokuapp.com/api/internal/account-bank/my-account-number/receiver-info',
        // headers: {}, 
        data: {
          "MyAccountNumber": ctx.state.selectedTaiKhoanThanhToan,
          "SoTaiKhoanNguoiNhan": SoTaiKhoanNguoiNhan
        }
      });
      ctx.commit('DELETE_DANH_SACH_NGUOI_THU_HUONG',SoTaiKhoanNguoiNhan);
    },
    async changeMatKhau(ctx, payload){//Đổi mật khẩu
      let res1 = await axios({
        method: 'get',
        url: 'https://bank25.herokuapp.com/api/internal/account-customer/my-account-customer/user-name',
        params: {
          "idTaiKhoanKhachHang": ctx.state.idTaiKhoanKhachHang
        }
      });
      let res2;
      try {
        res2 = await axios({
        method: 'post',
        url: 'https://bank25.herokuapp.com/api/auth/change-password',
        // headers: {}, 
        data: {
          "TenDangNhap":res1.data.TenDangNhap,
          "MatKhauCu":payload.MatKhauCu,
          "MatKhauMoi":payload.MatKhauMoi,
          "XacNhanMatKhau":payload.XacNhanMatKhau
        }
      });
      }catch(err){
        ctx.commit('SET_ERR_DOI_MAT_KHAU',err.response.data.err);
        ctx.commit('SET_DOI_MAT_KHAU_THAT_BAI',true);
        return;
      }
      ctx.commit('SET_DOI_MAT_KHAU_THANH_CONG',true);
    },
    setDoiMatKhauThanhCong(ctx,payload){
      ctx.commit('SET_DOI_MAT_KHAU_THANH_CONG',payload);
    },
    setDoiMatKhauThatBai(ctx,payload){
      ctx.commit('SET_DOI_MAT_KHAU_THAT_BAI',payload);
    },
    async getDanhSachTaiKhoanThanhToanInternal(ctx){//Lấy danh sách tài khoản thanh toán
      ctx.commit('SET_SO_DU_TAI_KHOAN_THANH_TOAN_INTERNAL',null);
      ctx.commit('SET_SO_DU_TAI_KHOAN_THANH_TOAN_INTERNAL_SAU_GIAO_DICH',null);
      ctx.commit('SET_TEN_TAI_KHOAN_NGUOI_HUONG_INTERNAL',null);
      let res = await axios({
        method: 'get',
        url: 'https://bank25.herokuapp.com/api/internal/account-customer/my-account-customer/payment-account',
        params: {
          "idTaiKhoanKhachHang": ctx.state.idTaiKhoanKhachHang
        }
      });
      ctx.commit('SET_DANH_SACH_TAI_KHOAN_THANH_TOAN_INTERNAL',res.data);
    },
    async getDanhSachTaiKhoanThanhToanExternal(ctx){//Lấy danh sách tài khoản thanh toán
      ctx.commit('SET_SO_DU_TAI_KHOAN_THANH_TOAN_EXTERNAL',null);
      ctx.commit('SET_SO_DU_TAI_KHOAN_THANH_TOAN_EXTERNAL_SAU_GIAO_DICH',null);
      ctx.commit('SET_TEN_TAI_KHOAN_NGUOI_HUONG_EXTERNAL',null);
      let res = await axios({
        method: 'get',
        url: 'https://bank25.herokuapp.com/api/internal/account-customer/my-account-customer/payment-account',
        params: {
          "idTaiKhoanKhachHang": ctx.state.idTaiKhoanKhachHang
        }
      });
      ctx.commit('SET_DANH_SACH_TAI_KHOAN_THANH_TOAN_EXTERNAL',res.data);
    },
    async getSoDuTaiKhoanThanhToanInternal(ctx,MyAccountNumber){//Lấy số dư tài khoản thanh toán
      ctx.commit('SET_SO_DU_TAI_KHOAN_THANH_TOAN_INTERNAL',null);
      let res = await axios({
        method: 'get',
        url: 'https://bank25.herokuapp.com/api/internal/account-bank/my-account-number/get-payment-balance',
        params: {
          "MyAccountNumber": MyAccountNumber
        }
      });
      await new Promise(resolve => setTimeout(resolve, 2000));
      ctx.commit('SET_SO_DU_TAI_KHOAN_THANH_TOAN_INTERNAL',res.data.SoDu);
      ctx.commit('SET_LOADING_SO_DU_INTERNAL',false);
    },
    async getSoDuTaiKhoanThanhToanExternal(ctx,MyAccountNumber){//Lấy số dư tài khoản thanh toán
      ctx.commit('SET_SO_DU_TAI_KHOAN_THANH_TOAN_EXTERNAL',null);
      let res = await axios({
        method: 'get',
        url: 'https://bank25.herokuapp.com/api/internal/account-bank/my-account-number/get-payment-balance',
        params: {
          "MyAccountNumber": MyAccountNumber
        }
      });
      await new Promise(resolve => setTimeout(resolve, 1000));
      ctx.commit('SET_SO_DU_TAI_KHOAN_THANH_TOAN_EXTERNAL',res.data.SoDu);
      ctx.commit('SET_LOADING_SO_DU_EXTERNAL',false);
    },
    setLoadingSoDuInternal(ctx,Value){
      ctx.commit('SET_LOADING_SO_DU_INTERNAL',Value);
    },
    setLoadingTimKiemInternal(ctx,Value){
      ctx.commit('SET_LOADING_TIM_KIEM_INTERNAL',Value);
    },
    setLoadingTimKiemExternal(ctx,Value){
      ctx.commit('SET_LOADING_TIM_KIEM_EXTERNAL',Value);
    },
    setLoadingSoDuExternal(ctx,Value){
      ctx.commit('SET_LOADING_SO_DU_EXTERNAL',Value);
    },
    setLoadingGiaoDichInternal(ctx,Value){
      ctx.commit('SET_LOADING_GIAO_DICH_INTERNAL',Value);
    },
    setLoadingGiaoDichExternal(ctx,Value){
      ctx.commit('SET_LOADING_GIAO_DICH_EXTERNAL',Value);
    },
    setLoadingTenTaiKhoanNguoiHuongInternal(ctx,Value){
      ctx.commit('SET_LOADING_TEN_TAI_KHOAN_NGUOI_HUONG_INTERNAL',Value);
    },
    setLoadingTenTaiKhoanNguoiHuongExternal(ctx,Value){
      ctx.commit('SET_LOADING_TEN_TAI_KHOAN_NGUOI_HUONG_EXTERNAL',Value);
    },
    async getTenTaiKhoanNguoiHuongInternal(ctx,MyAccountNumber){//Lấy tên người thụ hưởng 
      ctx.commit('SET_TEN_TAI_KHOAN_NGUOI_HUONG_INTERNAL',"Chờ trong giây lát...đang tải tên người sở hữu");
      let res;
      try {
        res = await axios({
          method: 'get',
          url: 'https://bank25.herokuapp.com/api/internal/account-bank/my-account-number/get-fullname',
          params: {
            "MyAccountNumber": MyAccountNumber
          }
        });
      }catch(err){
        await new Promise(resolve => setTimeout(resolve, 2000));
        ctx.commit('SET_TEN_TAI_KHOAN_NGUOI_HUONG_INTERNAL',null);
        ctx.commit('SET_LOADING_TEN_TAI_KHOAN_NGUOI_HUONG_INTERNAL',false);
        return;
      }
      await new Promise(resolve => setTimeout(resolve, 2000));
      ctx.commit('SET_TEN_TAI_KHOAN_NGUOI_HUONG_INTERNAL',res.data.TenKhachHang);
      ctx.commit('SET_LOADING_TEN_TAI_KHOAN_NGUOI_HUONG_INTERNAL',false);
    },
    resetTenTaiKhoanNguoiHuongInternal(ctx){
      ctx.commit('SET_TEN_TAI_KHOAN_NGUOI_HUONG_INTERNAL',null);
    },
    resetTenTaiKhoanNguoiHuongExternal(ctx){
      ctx.commit('SET_TEN_TAI_KHOAN_NGUOI_HUONG_EXTERNAL',null);
    },
    async getTenTaiKhoanNguoiHuongExternal(ctx,payload){//Lấy tên người thụ hưởng 
      ctx.commit('SET_TEN_TAI_KHOAN_NGUOI_HUONG_EXTERNAL',"Chờ trong giây lát...đang tải tên người sở hữu");
      let res;
      try {
        res = await axios({
          method: 'get',
          url: 'https://bank25.herokuapp.com/api/external/account-bank/destination-account',
          params: {
            "DestinationBankName": payload.DestinationBankName,
            "DestinationAccountNumber": payload.DestinationAccountNumber
          }
        });
      }catch(err){
        ctx.commit('SET_TEN_TAI_KHOAN_NGUOI_HUONG_EXTERNAL',null);
        ctx.commit('SET_LOADING_TEN_TAI_KHOAN_NGUOI_HUONG_EXTERNAL',false);
        return;
      }
      ctx.commit('SET_TEN_TAI_KHOAN_NGUOI_HUONG_EXTERNAL',res.data.TenKhachHang);
      ctx.commit('SET_LOADING_TEN_TAI_KHOAN_NGUOI_HUONG_EXTERNAL',false);
    },
    async getOTPInternal(ctx,payload){//Lấy mã OTP
      let res = await axios({
        method: 'get',
        url: 'https://bank25.herokuapp.com/api/internal/account-bank/my-account-number/internal-transfer',
        params: payload
      });
    },
    async getOTPExternal(ctx,payload){//Lấy mã OTP
      let res = await axios({
        method: 'get',
        url: 'https://bank25.herokuapp.com/api/internal/account-bank/my-account-number/external-transfer',
        params: payload
      });
    },
    async thuchienGiaoDichInternal(ctx,payload){//Thực hiện giao dịch
      ctx.commit('SET_ERR_CHUYEN_KHOAN_INTERNAL',null);
      try {
        let res = await axios({
          method: 'post',
          url: 'https://bank25.herokuapp.com/api/internal/account-bank/my-account-number/internal-transfer',
          data: payload
        });
      }catch(err){
        ctx.commit('SET_LOADING_GIAO_DICH_INTERNAL',false);
        ctx.commit('SET_ERR_CHUYEN_KHOAN_INTERNAL',err.response.data.err);
        ctx.commit('SET_CHUYEN_KHOAN_INTERNAL_THANH_CONG',false);
        return;
      }

      let res2 = await axios({
        method: 'get',
        url: 'https://bank25.herokuapp.com/api/internal/account-bank/my-account-number/get-payment-balance',
        params: {
          "MyAccountNumber": payload.MyAccountNumber
        }
      });
      ctx.commit('SET_SO_DU_TAI_KHOAN_THANH_TOAN_INTERNAL_SAU_GIAO_DICH',res2.data.SoDu);
      ctx.commit('SET_LOADING_GIAO_DICH_INTERNAL',false);
      ctx.commit('SET_CHUYEN_KHOAN_INTERNAL_THANH_CONG',true);
    },
    async thuchienGiaoDichExternal(ctx,payload){//Thực hiện giao dịch
      ctx.commit('SET_ERR_CHUYEN_KHOAN_EXTERNAL',null);
      try {
        let res = await axios({
          method: 'post',
          url: 'https://bank25.herokuapp.com/api/internal/account-bank/my-account-number/external-transfer',
          data: payload
        });
      }catch(err){
        ctx.commit('SET_LOADING_GIAO_DICH_EXTERNAL',false);
        ctx.commit('SET_ERR_CHUYEN_KHOAN_EXTERNAL',err.response.data.err);
        ctx.commit('SET_CHUYEN_KHOAN_EXTERNAL_THANH_CONG',false);
        return;
      }

      let res2 = await axios({
        method: 'get',
        url: 'https://bank25.herokuapp.com/api/internal/account-bank/my-account-number/get-payment-balance',
        params: {
          "MyAccountNumber": payload.MyAccountNumber
        }
      });
      ctx.commit('SET_SO_DU_TAI_KHOAN_THANH_TOAN_EXTERNAL_SAU_GIAO_DICH',res2.data.SoDu);
      ctx.commit('SET_LOADING_GIAO_DICH_EXTERNAL',false);
      ctx.commit('SET_CHUYEN_KHOAN_EXTERNAL_THANH_CONG',true);
    },
    async getDanhSachTenNganHangExternal(ctx){
      let res = await axios({
        method: 'get',
        url: 'https://bank25.herokuapp.com/api/internal/account-customer/my-account-customer/get-bank-partner',
        params: {
          "idTaiKhoanKhachHang": ctx.state.idTaiKhoanKhachHang
        }
      });
      ctx.commit('SET_DANH_SACH_TEN_NGAN_HANG_EXTERNAL',res.data);
    },
    async saveThongTinNguoiHuongInternal(ctx,payload){
      let res = await axios({
        method: 'post',
        url: 'https://bank25.herokuapp.com/api/internal/account-bank/my-account-number/receiver-info',
        data: payload
      });
    },
    async saveThongTinNguoiHuongExternal(ctx,payload){
      let res = await axios({
        method: 'post',
        url: 'https://bank25.herokuapp.com/api/internal/account-bank/my-account-number/receiver-info',
        data: payload
      });
    },
    resetDanhSachNguoiThuHuongChuyenKhoan(ctx){
      ctx.commit('SET_DANH_SACH_NGUOI_THU_HUONG_CHUYEN_KHOAN_INTERNAL',null);
      ctx.commit('SET_DANH_SACH_NGUOI_THU_HUONG_CHUYEN_KHOAN_EXTERNAL',null);
    },

    // lấy thông tin ghi nợ của khách hàng
    async getDebtReminder(ctx){
      // let a= JSON.parse(localStorage.getItem("user"));
      // console.log(a);
      // const reqHeaders = {
      //   'headers': {
      //     "x-access-token": a.response.accessToken
      //   }
      // }
      ctx.commit("GET_DEBT_REMINDER_REQUEST");
      const userSTK='258258258';
      const respone=await axiosApiInstance.get('https://bank25.herokuapp.com/api/internal/debt-reminder/'+userSTK);
      console.log("respone: ",respone);
      if(respone.data.err){
        //ctx.commit('GET_DEBT_REMINDER_FAILED',respone.data);
      }else{
        ctx.commit('GET_DEBT_REMINDER_SUCCESS',respone.data);
        //ctx.dispatch("alert/error", "123", { root: true });
      }
    },
    // Hủy một dòng nhắc nợ bất kì
    async removeDebtReminder(ctx, {item, message}){
      console.log("removeDebtReminder");
      const payload={
        idGiaoDichNhacNo: item.idGiaoDichNhacNo,
        NoiDung: message,
        stk: item.SoTaiKhoanNguoiNhan
      };
      console.log("removeDebtReminder");
      const respone=await axiosApiInstance.put('https://bank25.herokuapp.com/api/internal/debt-reminder/', JSON.parse(payload));
      console.log("removeDebtReminder");
      ctx.commit('REMOVE_DEBT_REMINDER',respone.data);
    },
    // Lấy danh sách tài khoản
    async getAccountInfo({commit}, account){
      commit("GET_ACCOUNT_INFO_REQUEST");
      const respone=await axiosApiInstance.get('https://bank25.herokuapp.com/api/internal/debt-reminder/detail-info/' +account);
      if(respone.data.err){
        commit('GET_ACCOUNT_INFO_FAILED',respone.data);
      }else{
        commit('GET_ACCOUNT_INFO_SUCCESS',respone.data);
      }
      
    },

    // Thêm vào DB thẻ ghi nợ
    async addDebtReminder({commit}, payload){

      //Nội dung sẽ gởi
      const body = {
        "SourceAccountNumber":258258258,
        "DestinationAccountNumber": parseInt(payload.DestinationAccountNumber),
        "Amount": parseInt(payload.Amount), 
        "Message": payload.Message,
      }
      // console.log(body);
      commit("ADD_DEBT_REMINDER_REQUEST");
      const respone=await axiosApiInstance.post('https://bank25.herokuapp.com/api/internal/debt-reminder/', body);
      if(respone.data.err){
        commit('ADD_DEBT_REMINDER_FAILED',respone.data);
      }else{
        commit('ADD_DEBT_REMINDER_SUCCESS',respone.data);
        router.push("debtReminder");
      }
    },
  }
});

