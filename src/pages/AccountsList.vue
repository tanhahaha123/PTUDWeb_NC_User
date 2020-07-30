<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
        <info
          icon="icon-lg pe-7f-1"
          bgclass="my-background-color-1"
          symbol="▩"
          :counter="accountsList.length"
          title="Tổng số tài khoản"
        >
        </info>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
        <info
          icon="icon-lg pe-7f-2"
          bgclass="my-background-color-2"
          symbol="▨"
          :counter="userPaymentDetail.length"
          title="Tài khoản thanh toán"
        >
        </info>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
        <info
          icon="icon-lg pe-7f-3"
          bgclass="my-background-color-3"
          symbol="▧"
          :counter="userSavingDetail.length"
          title="Tài khoản tiết kiệm"
        >
        </info>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
        <md-card style="margin: 50px 0;">
          <md-card-header data-background-color="red">
            <h4 class="title">Danh sách TK thanh toán</h4>
            <p class="category">sử dụng thanh toán các chi tiêu của bạn</p>
          </md-card-header>
          <md-card-content>
            <payment-accounts-table
              :userPaymentDetail="userPaymentDetail"
            ></payment-accounts-table>
          </md-card-content>
        </md-card>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-66"
      >
        <md-card style="margin: 50px 0;">
          <md-card-header data-background-color="green">
            <h4 class="title">Danh sách tài khoản tiết kiệm</h4>
            <p class="category">
              tài khoản tiết kiệm dùng để sinh lãi từ ngân hàng chúng tôi
            </p>
          </md-card-header>
          <md-card-content>
            <saving-accounts-table
              :userSavingDetail="userSavingDetail"
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
    return {};
  },
  mounted() {
    this.$store.dispatch("getAccountsList");
    this.$store.dispatch(
      "getUserPaymentDetail",
      this.$store.state.userPaymentNumber
    );
    this.$store.dispatch(
      "getUserSavingDetail",
      this.$store.state.userSavingNumbers
    );
    // console.log(this.$store.state.accountsList);
    // console.log(this.$store.state.userSavingNumbers);
    console.log(this.userSavingDetail.length);
    console.log(this.userPaymentDetail.SoDu);
  },
  computed: {
    ...mapState(["userSavingDetail"]),
    ...mapState(["userPaymentDetail"]),
    ...mapState(["accountsList"])
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
