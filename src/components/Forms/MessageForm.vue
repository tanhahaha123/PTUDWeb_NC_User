<template>
  <form @submit.prevent="addDebtReminderSubmit">
    <!-- Lỗi khi kết nối backend -->

    <md-card>
      <md-card-header
        :data-background-color="dataBackgroundColor"
        class="text-center"
      >
        <h4 class="title">Tin nhắn</h4>
        <!-- <p class="category">Thêm mới</p> -->
      </md-card-header>
      <!-- <md-card>
        <md-card-header data-background-color="blue">
          <md-card-header-text>
            <div class="md-caption">Tài khoản nguồn</div>
            <div class="md-title">123123123123</div>
            <div class="md-caption">
              Số dư khả dụng:
              <div class="md-title">500.500.100 VND</div>
            </div>
            <div class="md-caption">Mở tại: CN 25Bank, Nguyễn Trọng Tuyển</div>
          </md-card-header-text>
        </md-card-header>
      </md-card> -->
      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>ID giao dịch</label>
              <md-input
                v-model="$route.params.item.MaGiaoDichNhacNo"
                disabled
              ></md-input>
            </md-field>
            <md-field>
              <label>Số tài khoản người gửi</label>
              <md-input
                v-model="$route.params.item.SoTaiKhoanNguoiGui"
                disabled
              ></md-input>
            </md-field>
            <md-field>
              <label>Họ tên</label>
              <md-input
                v-model="$route.params.item.SoTaiKhoanNguoiGui"
                disabled
              ></md-input>
            </md-field>
            <md-field>
              <label>Thời gian</label>
              <md-input
                v-model="$route.params.item.NgayGiaoDich"
                disabled
              ></md-input>
            </md-field>
            <md-field>
              <label>Nội dung</label>
              <md-input
                v-model="$route.params.item.NoiDung"
                disabled
              ></md-input>
            </md-field>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  name: "message-form",
  props: {
    dataBackgroundColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      payload: {},
      //hiển thị Dialog chọn tài khoản
      showDialog: false
    };
  },
  methods: {
    ...mapActions(["getAccountInfo", "addDebtReminder"]),
    addDebtReminderSubmit(e) {
      //console.log("addDebtReminderSubmit");
      this.$validator.validateAll().then(result => {
        if (result) {
          return;
        }
      });
      const payload = this.payload;
      if (
        payload.Amount &&
        payload.Message &&
        payload.DestinationAccountNumber
      ) {
        this.addDebtReminder(this.payload);
      }
    },
    searchOnDB() {
      if (this.payload.DestinationAccountNumber.length === 9) {
        this.getAccountInfo(this.payload.DestinationAccountNumber);
      }
    }
  },
  computed: {
    ...mapState(["accountTable", "status"]),
    ...mapState("alert", ["type", "message"])
  }
};
</script>
<style scoped>
.md-title {
  color: green;
  font-size: 14px;
}
.md-caption {
  font-size: 14px;
}
</style>
