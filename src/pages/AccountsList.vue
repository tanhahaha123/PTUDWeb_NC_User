<template>
  <div class="content">
    <div class="md-layout">
      <template v-if="zShow">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
        key="4"
      >
        <info
          ref="childInfo1"
          icon="icon-lg pe-7f-1"
          bgclass="my-background-color-1"
          symbol="▩"
          :counter="DanhSachTaiKhoanThanhToanChiTiet.length+DanhSachTaiKhoanTietKiemChiTiet.length"
          title="Tổng số tài khoản"
        >
        </info>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
        key="5"
      >
        <info
          ref="childInfo2"
          icon="icon-lg pe-7f-2"
          bgclass="my-background-color-2"
          symbol="▨"
          :counter="DanhSachTaiKhoanThanhToanChiTiet.length"
          title="Tài khoản thanh toán"
        >
        </info>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
        key="6"
      >
        <info
          ref="childInfo3"
          icon="icon-lg pe-7f-3"
          bgclass="my-background-color-3"
          symbol="▧"
          :counter="DanhSachTaiKhoanTietKiemChiTiet.length"
          title="Tài khoản tiết kiệm"
        >
        </info>
      </div>
      </template>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
        <md-card style="margin: 50px 0;">
          <md-card-header data-background-color="red">
            <h5 class="title">Danh sách TK thanh toán</h5>
            <p class="category">sử dụng thanh toán các chi tiêu của bạn</p>
          </md-card-header>
          <md-card-content>
            <payment-accounts-table
              :userPaymentDetail="DanhSachTaiKhoanThanhToanChiTiet"
            ></payment-accounts-table>
          </md-card-content>
        </md-card>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-66"
      >
        <md-card style="margin: 50px 0;">
          <md-card-header data-background-color="green">
            <h5 class="title">Danh sách tài khoản tiết kiệm</h5>
            <p class="category">
              tài khoản tiết kiệm dùng để sinh lãi từ ngân hàng chúng tôi
            </p>
          </md-card-header>
          <md-card-content>
            <saving-accounts-table
              :userSavingDetail="DanhSachTaiKhoanTietKiemChiTiet"
            ></saving-accounts-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
// import { PaymentAccountsTable, SavingAccountsTable } from "@/components";
import { PaymentAccountsTable, SavingAccountsTable, Info } from "@/components";
import { mapState } from "vuex";
export default {
  components: {
    Info,
    PaymentAccountsTable,
    SavingAccountsTable
  },
  data() {
    return {
      zShow: false
    };
  },
  created() {
    (async ()=>{
      let [Result1, Result2] = await Promise.all([this.$store.dispatch(
        "getTaiKhoanThanhToanChiTiet",
        this.$store.state.userPaymentNumber
      ), this.$store.dispatch(
        "getTaiKhoanTietKiemChiTiet",
        this.$store.state.userSavingNumbers
      )]);
      this.zShow = true;
    })();
  },
  computed: {
    ...mapState(["DanhSachTaiKhoanThanhToanChiTiet"]),
    ...mapState(["DanhSachTaiKhoanTietKiemChiTiet"])
  },
  destroyed(){
    this.$store.dispatch('resetTaiKhoanThanhToanChiTiet');
    this.$store.dispatch('resetTaiKhoanTietKiemChiTiet');
  }
};
</script>
<style>
.my-background-color-1 {
  background: linear-gradient(60deg, #707dc1, #5c6bc6);
}
.my-background-color-2 {
  background: linear-gradient(60deg, #f05350, #e43935);
}
.my-background-color-3 {
  background: linear-gradient(60deg, #66ba6a, #43a147);
}
.icon-lg {
  font-size: 4.68em;
}
.pe-7f-1:before {
  content: "\e698";
}
.pe-7f-2:before {
  content: "\e6e5";
}
.pe-7f-3:before {
  content: "\e63b";
}
</style>
