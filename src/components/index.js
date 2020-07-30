/* eslint-disable prettier/prettier */

import Vue from "vue"
// Cards
import ChartCard from "./Cards/ChartCard.vue";
import NavTabsCard from "./Cards/NavTabsCard.vue";
import StatsCard from "./Cards/StatsCard.vue";
import LoginCard from "./Cards/LoginCard.vue";

// Tables
import NavTabsTable from "./Tables/NavTabsTable.vue";
import OrderedTable from "./Tables/OrderedTable.vue";
import SimpleTable from "./Tables/SimpleTable.vue";
import TranferHistoryTable from "./Tables/TranferHistoryTable.vue";
import LoanHistoryTable from "./Tables/LoanHistoryTable.vue";
import ReceiveHistoryTable from "./Tables/ReceiveHistoryTable.vue";
import PaymentAccountsTable from "./Tables/PaymentAccountsTable.vue";
import SavingAccountsTable from "./Tables/SavingAccountsTable.vue";
import DebtReminderTable from "./Tables/DebtReminderTable.vue";
//Đăng ký component Danh Sách Tài Khoản
import Info from './DanhSachTaiKhoan/InfoBox.vue';
import AnimateNumber from './DanhSachTaiKhoan/AnimateNumber.vue';
import TKThanhToanTable from './DanhSachTaiKhoan/TKThanhToanTable.vue';
import TKTietKiemTable from './DanhSachTaiKhoan/TKTietKiemTable.vue';

//Đăng ký component Danh Sách Thụ Hưởng
import DanhSachThuHuongTable from './DanhSachThuHuong/DanhSachThuHuongTable.vue';

//Đăng ký component Chuyển Khoản
import ChuyenKhoanCungNganHang from './ChuyenKhoan/ChuyenKhoanCungNganHang.vue';
import ChuyenKhoanKhacNganHang from './ChuyenKhoan/ChuyenKhoanKhacNganHang.vue';

Vue.component( 'basix-counter', AnimateNumber )
Vue.component( 'tk-thanh-toan-table', TKThanhToanTable )
Vue.component( 'tk-tiet-kiem-table', TKTietKiemTable )

//Danh Sách Thụ Hưởng
Vue.component( 'danh-sach-thu-huong-table', DanhSachThuHuongTable )

//Chuyển Khoản
Vue.component( 'chuyen-khoan-cung-ngan-hang', ChuyenKhoanCungNganHang )
Vue.component( 'chuyen-khoan-khac-ngan-hang', ChuyenKhoanKhacNganHang )


// export {
//   ChartCard,
//   NavTabsCard,
//   StatsCard,
//   NavTabsTable,
//   OrderedTable,
//   SimpleTable,
//   LoginCard,
  
//   //component cho TransactionHisotry
//   TranferHistoryTable,
//   LoanHistoryTable,
//   ReceiveHistoryTable,
  
//   //component cho AccountList
//   PaymentAccountsTable,
//   SavingAccountsTable,

//   //component for DebtReminder
//   DebtReminderTable
// };


export {
  ChartCard,
  NavTabsCard,
  StatsCard,
  NavTabsTable,
  OrderedTable,
  SimpleTable,

  //component cho TransactionHisotry
  TranferHistoryTable,
  LoanHistoryTable,
  ReceiveHistoryTable,
  
  //component cho AccountList
  PaymentAccountsTable,
  SavingAccountsTable,

  //component Danh Sách Tài Khoản
  TKThanhToanTable,
  TKTietKiemTable,
  AnimateNumber,
  Info,

  //component Danh Sách Thụ Hưởng
  DanhSachThuHuongTable,

  //component Chuyển Khoản
  ChuyenKhoanCungNganHang,
  ChuyenKhoanKhacNganHang,

    //component for DebtReminder
  DebtReminderTable,
  LoginCard,
};