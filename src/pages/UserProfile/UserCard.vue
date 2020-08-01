<template>
  <div>
    <md-card class="md-card-profile">
      <div class="md-card-avatar">
        <img class="img" :src="cardUserImage" />
      </div>
      <md-card-content>
        <h6 class="category text-gray">khách hàng</h6>
        <h4 class="card-title"><strong>{{ThongTinKhachHang.TenKhachHang}}</strong></h4>
        <md-button class="md-round md-primary" @click="handleDoiMatKhau">Đổi mật khẩu</md-button>
      </md-card-content>
    </md-card>
    <transition name="myfade">
      <div v-if="displayDoiMatKhau">
        <md-card style="margin-top: 5px;">
        <md-card-content>
          <div class="md-layout">
            <form>
              <div class="md-layout-item md-small-size-100 md-size-100">
                <md-field style="margin-bottom: 5px;">
                  <label>Mật khẩu cũ</label>
                  <md-input id="MatKhauCu" v-model="MatKhauCu" required></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-100">
                <md-field style="margin-bottom: 5px;">
                  <label>Mật khẩu mới</label>
                  <md-input id="MatKhauMoi" v-model="MatKhauMoi" required></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-100">
                <md-field style="margin-bottom: 5px;">
                  <label>Nhập lại mật khẩu</label>
                  <md-input id="NhapLaiMatKhau" v-model="NhapLaiMatKhau" required></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-100 text-center">
                <md-button type="submit" class="md-raised md-danger" @click="handleConfirmDoiMatKhau">Xác nhận</md-button>
              </div>
            </form>
          </div>
        </md-card-content>
      </md-card>
      </div>
    </transition>
    <transition name="slidefa">
      <div v-if="displayDoiMatKhauThanhCong">
        <md-card style="margin-top: 5px;">
        <md-card-content>
          <div class="md-layout">
            <div class="md-layout-item md-small-size-100 md-size-100">
              <br>
              <div class="text-center">
                <md-icon style="color: #28a745;" class="md-size-3x text-right">check_box
                </md-icon>
                <h4 style="margin-bottom: 0; font-size: 1.1rem; font-weight: bold;">Thay đổi mật khẩu thành công.</h4>
              </div>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-100 text-center">
              <md-button class="md-raised md-Secondary" @click="handleDong">Đóng</md-button>
            </div>
          </div>
        </md-card-content>
      </md-card>
      </div>
    </transition>
    <transition name="slidefa">
      <div v-if="displayDoiMatKhauThatBai">
        <md-card style="margin-top: 5px;">
        <md-card-content>
          <div class="md-layout">
            <div class="md-layout-item md-small-size-100 md-size-100">
              <br>
              <div class="text-center">
                <md-icon style="color: rgba(255, 0, 0, 0.7);" class="md-size-3x text-right">sentiment_very_dissatisfied
                </md-icon>
                <h4 style="margin-bottom: 0; font-size: 1.2rem; font-weight: bold;">Thay đổi mật khẩu thất bại!</h4>
                <div style="color: #dc3545; font-size: 0.9rem">{{errDoiMatKhau}}</div>
              </div>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-100 text-center">
              <md-button class="md-raised md-Secondary" @click="handleThuLai">Thử lại</md-button>
            </div>
          </div>
        </md-card-content>
      </md-card>
      </div>
    </transition>
  </div>
</template>
<script>
  import { mapState,mapActions } from 'vuex';
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
        NhapLaiMatKhau: "",
        showDismissibleAlert: true
      };
    },
    computed: {
      ...mapState(['ThongTinKhachHang','displayDoiMatKhauThanhCong','displayDoiMatKhauThatBai','errDoiMatKhau'])
    },
    methods: {
      handleDoiMatKhau(){
        this.MatKhauCu="";
        this.MatKhauMoi="";
        this.NhapLaiMatKhau="";
        this.$store.dispatch('setDoiMatKhauThanhCong',false);
        this.$store.dispatch('setDoiMatKhauThatBai',false);
        this.displayDoiMatKhau = !this.displayDoiMatKhau; 
      },
      handleConfirmDoiMatKhau(event){
        if (
        !document.getElementById('MatKhauCu').checkValidity() ||
        !document.getElementById('MatKhauMoi').checkValidity() ||
        !document.getElementById('NhapLaiMatKhau').checkValidity()) return false;//Nếu chưa validate 
        // if ((this.MatKhauCu=="")||(this.MatKhauMoi=="")||(this.NhapLaiMatKhau=="")) return;
        event.preventDefault();//ngăn chặn sự kiện mặc định của nút submit gửi request
        this.$store.dispatch('changeMatKhau',{"MatKhauCu":this.MatKhauCu,"MatKhauMoi":this.MatKhauMoi,"XacNhanMatKhau":this.NhapLaiMatKhau});
        this.displayDoiMatKhau = false;
        this.MatKhauCu="";
        this.MatKhauMoi="";
        this.NhapLaiMatKhau="";
      },
      handleDong(){
        this.MatKhauCu="";
        this.MatKhauMoi="";
        this.NhapLaiMatKhau="";
        this.$store.dispatch('setDoiMatKhauThanhCong',false);
      },
      handleThuLai(){
        this.MatKhauCu="";
        this.MatKhauMoi="";
        this.NhapLaiMatKhau="";
        this.$store.dispatch('setDoiMatKhauThatBai',false);
        this.displayDoiMatKhau=true;
      }
    },
    destroyed(){
      this.$store.dispatch('resetThongTinKhachHang');
    }
  };
</script>
<style>
  .myfade-enter-active {
    transition: opacity .5s;
  }
  .myfade-enter, .myfade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .slidefa-enter-active {
    transition: all .3s ease;
  }
  .slidefa-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
