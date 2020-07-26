<template>
  <div class="content">
    <md-card>
      <md-card-header data-background-color="purple">
        <h3 class="title">Danh sách người thụ hưởng</h3>
      </md-card-header>
      <md-card-content>
        <danh-sach-thu-huong-table table-header-color="purple"></danh-sach-thu-huong-table>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import { DanhSachThuHuongTable} from "@/components";
import { mapState } from 'vuex';

export default {
  components: {

  },
  mounted(){
  // this.$store.dispatch('getAccountsList');
  //  this.$store.dispatch('getUserPaymentDetail',this.$store.state.userPaymentNumber);
  // this.$store.dispatch('getUserSavingDetail',this.$store.state.userSavingNumbers);
  // console.log(this.$store.state.accountsList);
  // console.log(this.$store.state.userSavingNumbers);
  // console.log(this.userSavingDetail);
  },
  computed:{
  },
};
</script>
<style>
  .my-background-color-1 {
    background: linear-gradient(60deg, #707dc1, #5c6bc6)
  }

  .my-background-color-2 {
  background: linear-gradient(60deg, #f05350, #e43935) }

  .my-background-color-3 {
  background: linear-gradient(60deg, #66ba6a, #43a147); }

  .icon-lg {font-size: 4.68em;}

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