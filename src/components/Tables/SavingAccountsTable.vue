<template>
  <div>
    <md-table table-header-color="green" v-model="userSavingDetail" >
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="STT">{{ item.stt}}</md-table-cell>
        <md-table-cell md-label="Số TK">{{ item.SoTaiKhoanTietKiem }}</md-table-cell>
        <md-table-cell md-label="Số dư">{{ item.SoDu }}</md-table-cell>
        <md-table-cell md-label="Ngày gửi">{{ item.NgayGui }}</md-table-cell>
        <md-table-cell md-label="Kỳ hạn gửi">{{ item.KyHanGui }}</md-table-cell>
        <md-table-cell md-label="Lãi suất">{{ item.LaiSuat }}</md-table-cell>
      </md-table-row>
    </md-table> 
  </div>
</template>

<script>
export default {
  name: "saving-accounts-table",
  props: ['userSavingDetail'],
};

</script>
