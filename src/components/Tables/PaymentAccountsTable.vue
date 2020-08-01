<template>
  <div>
    <md-table table-header-color="green" v-model="userPaymentDetail">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="STT">{{ item.stt }}</md-table-cell>
        <md-table-cell md-label="Số TK">{{
          item.SoTaiKhoanThanhToan
        }}</md-table-cell>
        <md-table-cell md-label="Số dư">{{ item.SoDu }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "payment-accounts-table",
  props: ["userPaymentDetail"]
};
</script>
