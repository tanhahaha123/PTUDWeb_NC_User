<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="blue">
            <h4 class="title">Giao dịch chuyển khoản</h4>
          </md-card-header>
          <md-card-content>
            <tranfer-history-table :tranferFilter="tranferFilter"></tranfer-history-table>
          </md-card-content>
        </md-card>
      </div>
      <div class="md-layout-item md-small-size-100 md-size-100">
        <md-field class="md-layout-item md-small-size-100 md-size-33">
          <md-icon>search</md-icon>
          <md-input type="text" placeholder="Nhập thông tin người cần tìm" v-model="tranferQuery" @input="tranferTableSearch"></md-input>
        </md-field>
      </div>
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Giao dịch nhận tiền</h4>
          </md-card-header>
          <md-card-content>
            <receive-history-table :receiveFilter="receiveFilter"></receive-history-table>
          </md-card-content>
        </md-card>
      </div>
      <div class="md-layout-item md-small-size-100 md-size-100">
        <md-field class="md-layout-item md-small-size-100 md-size-33">
          <md-icon>search</md-icon>
          <md-input type="text" placeholder="Nhập thông tin người cần tìm" v-model="receiveQuery" @input="receiveTableSearch"></md-input>
        </md-field>
      </div>
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="red">
            <h4 class="title">Giao dịch nhắn nợ</h4>
          </md-card-header>
          <md-card-content>
            <loan-history-table :loanFilter="loanFilter"></loan-history-table>
          </md-card-content>
        </md-card>
      </div>
      <div class="md-layout-item md-small-size-100 md-size-100">
        <md-field class="md-layout-item md-small-size-100 md-size-33">
          <md-icon>search</md-icon>
          <md-input type="text" placeholder="Nhập số tài khoản cần tìm" v-model="loanQuery" @input="loanTableSearch"></md-input>
        </md-field>
      </div>
    </div>
  </div>
</template>

<script>
//import { SimpleTable } from "@/components";
//this=this;
import {
  TranferHistoryTable,
  LoanHistoryTable,
  ReceiveHistoryTable
} from "@/components";
import { mapGetters, mapState } from "vuex";
export default {
  components: {
    TranferHistoryTable,
    LoanHistoryTable,
    ReceiveHistoryTable
  },
  data() {
    return {
      tranferQuery:'',
      receiveQuery:'',
      loanQuery:'',
    };
  },
  mounted() {
    this.$store.dispatch('getTranferHis');
    this.$store.dispatch('getReceiveHis');
    this.$store.dispatch('getLoanHis');
  },
  computed: {
    ...mapGetters(["loanFilter"]),
    ...mapGetters(["receiveFilter"]),
    ...mapGetters(["tranferFilter"]),
  },
  methods: {
    tranferTableSearch () {
      this.$store.dispatch('updateTranferQuery',this.tranferQuery);
    },
    receiveTableSearch () {
      this.$store.dispatch('updateReceiveQuery',this.receiveQuery);
    },
    loanTableSearch () {
      this.$store.dispatch('updateLoanQuery',this.loanQuery);
    }
  },
};
</script>