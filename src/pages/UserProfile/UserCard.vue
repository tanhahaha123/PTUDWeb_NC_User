<template>
  <div>
    <md-card class="md-card-profile" style="margin-bottom: 5px;">
      <div class="md-card-avatar">
        <img class="img" :src="cardUserImage" />
      </div>

      <md-card-content>
        <h6 class="category text-gray">khách hàng</h6>
        <h4 class="card-title">Nguyễn Công Phượng</h4>
        <md-button class="md-round md-primary" @click="displayDoiMatKhau = !displayDoiMatKhau">Đổi mật khẩu</md-button>
      </md-card-content>
    </md-card>
    <transition name="myfade">
      <div v-if="displayDoiMatKhau">
        <md-card style="margin-top: 5px;">
        <md-card-content>
          <div class="md-layout">
            <div class="md-layout-item md-small-size-100 md-size-100">
              <md-field style="margin-bottom: 5px;">
                <label>Mật khẩu cũ</label>
                <md-input v-model="MatKhauCu"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-100">
              <md-field style="margin-bottom: 5px;">
                <label>Mật khẩu mới</label>
                <md-input v-model="MatKhauMoi"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-100">
              <md-field style="margin-bottom: 5px;">
                <label>Nhập lại mật khẩu</label>
                <md-input v-model="NhapLaiMatKhau"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-100 text-center">
              <md-button class="md-raised md-danger">Xác nhận</md-button>
            </div>
          </div>
        </md-card-content>
      </md-card>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: "user-card",
  props: {
    cardUserImage: {
      type: String,
      default: require("@/assets/img/avatar.png")
    }
  },
  data() {
    return {
      displayDoiMatKhau: false,
      MatKhauCu: "",
      MatKhauMoi: "",
      NhapLaiMatKhau: ""
    };
  }
};
</script>
<style>
  .myfade-enter-active, .myfade-leave-active {
    transition: opacity .5s;
  }
  .myfade-enter, .myfade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
