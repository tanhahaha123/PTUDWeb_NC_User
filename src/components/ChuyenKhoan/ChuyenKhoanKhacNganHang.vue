<template>
  <div class="md-layout">
    <div class="md-layout-item md-small-size-100 md-size-100">
      <br>
    </div>
    <fieldset class="md-layout-item md-small-size-100 md-size-100" style="border: 2px solid #dc3545!important;padding: .5rem!important">
      <legend style="width: auto!important; color: #dc3545!important">Thông tin người chuyển</legend>
      <div class="md-layout" style="margin-bottom: 1rem">
        <div class="md-layout-item md-small-size-100 md-size-50">
          <div class="row">
            <label class="col-sm-4 col-form-label lb-fontsize">Tài khoản nguồn</label>
            <div class="col-sm-8">
              <b-form-select v-model="External_TaiKhoanNguon">
                <b-form-select-option value="258258258" style="font-size: 1.25rem;">258258258</b-form-select-option>
              </b-form-select>
            </div>
          </div>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-50">
          <div class="row">
            <label class="col-sm-2 col-form-label lb-fontsize">Số dư</label>
            <div class="col-sm-10">
              <b-form-input v-model="External_SoDu" placeholder="Số dư sẽ được hiển thị ở đây" disabled></b-form-input>
            </div>
          </div>
        </div>
      </div>
    </fieldset>
    <div class="md-layout-item md-small-size-100 md-size-100">
      <br>
    </div>
    <fieldset class="md-layout-item md-small-size-100 md-size-100" style="border: 2px solid #dc3545!important;padding: .5rem!important">
      <legend style="width: auto!important; color: #dc3545!important">Thông tin người hưởng </legend>
      <div class="md-layout">
        <div class="md-layout-item md-small-size-100 md-size-100" style="margin-bottom: 1rem">
          <div class="row">
            <label class="col-sm-2 col-form-label lb-fontsize">Tìm kiếm</label>
            <div class="col-sm-10">
              <b-form-select v-model="External_TimKiem">
                <b-form-select-option value="khach Phuong thue phong" style="font-size: 1.25rem;">khach Phuong thue phong</b-form-select-option>
                <b-form-select-option value="" disabled style="font-size: 0.75rem">• Người thụ hưởng: Nguyễn Công Phượng</b-form-select-option>
                <b-form-select-option value="" disabled style="font-size: 0.75rem;">• Số tài khoản: 147147147</b-form-select-option>

                <b-form-select-option value="bên cung cấp thực phẩm" style="font-size: 1.25rem;">bên cung cấp thực phẩm</b-form-select-option>
                <b-form-select-option value="" disabled style="font-size: 0.75rem;">• Người thụ hưởng: Nguyễn Thị Hà</b-form-select-option>
                <b-form-select-option value="" disabled style="font-size: 0.75rem;">• Số tài khoản: 156156156</b-form-select-option>

                <b-form-select-option value="a Doanh" style="font-size: 1.25rem;">a Doanh</b-form-select-option>
                <b-form-select-option value="" disabled style="font-size: 0.75rem;">• Người thụ hưởng: Nguyễn Công Doanh</b-form-select-option>
                <b-form-select-option value="" disabled style="font-size: 0.75rem;">• Số tài khoản: 148148148</b-form-select-option>
              </b-form-select>
            </div>
          </div>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-100" style="margin-bottom: 1rem">
          <div class="row">
            <label class="col-sm-2 col-form-label lb-fontsize">Số tài khoản</label>
            <div class="col-sm-10">
              <b-form-input type="number" placeholder="Nhập số tài khoản người hưởng"></b-form-input>
            </div>
          </div>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-100" style="margin-bottom: 1rem">
          <div class="row">
            <label class="col-sm-2 col-form-label lb-fontsize">Tên ngân hàng</label>
            <div class="col-sm-10">
              <b-form-select v-model="External_TenNganHang">
                <b-form-select-option value="AGRIBANK">AGRIBANK</b-form-select-option>
                <b-form-select-option value="GO">GO</b-form-select-option>
                <b-form-select-option value="37Bank">37Bank</b-form-select-option>
              </b-form-select>
            </div>
          </div>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-100" style="margin-bottom: 1rem">
          <div class="row">
            <label class="col-sm-2 col-form-label lb-fontsize">Người thụ hưởng</label>
            <div class="col-sm-10">
              <b-form-input placeholder="Tên người thụ hưởng sẽ được hiển thị ở đây" disabled></b-form-input>
            </div>
          </div>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-100" style="margin-bottom: 1rem">
          <div class="row">
            <label class="col-sm-2 lb-fontsize">Lưu người hưởng</label>
            <div class="col-sm-10">
              <b-form-checkbox v-model="External_LuuThongTinNguoiHuong" switch></b-form-checkbox>
            </div>
          </div>
        </div>
        <transition name="fadee">
          <div v-if="External_LuuThongTinNguoiHuong==true" class="md-layout-item md-small-size-100 md-size-100" style="margin-bottom: 1rem">
            <div class="row">
              <label class="col-sm-2 col-form-label lb-fontsize">Tên gợi nhớ</label>
              <div class="col-sm-10">
                <b-form-input placeholder="Nhập tên gợi nhớ"></b-form-input>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </fieldset>
    <div class="md-layout-item md-small-size-100 md-size-100">
      <br>
    </div>
    <fieldset class="md-layout-item md-small-size-100 md-size-100" style="border: 2px solid #dc3545!important;padding: .5rem!important">
      <legend style="width: auto!important; color: #dc3545!important">Thông tin giao dịch </legend>
      <div class="md-layout">
        <div class="md-layout-item md-small-size-100 md-size-100" style="margin-bottom: 1rem">
          <div class="row">
            <label class="col-sm-2 col-form-label lb-fontsize">Số tiền chuyển</label>
            <div class="col-sm-10">
              <b-form-input placeholder="Nhập số tiền cần chuyển"></b-form-input>
            </div>
          </div>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-100" style="margin-bottom: 1rem">
          <div class="row">
            <label class="col-sm-2 col-form-label lb-fontsize">Nội dung chuyển tiền</label>
            <div class="col-sm-10">
              <b-form-textarea id="textarea" v-model="External_NoiDungChuyenTien" placeholder="Nhập nội dung chuyển tiền..." rows="3" max-rows="6"></b-form-textarea>
            </div>
          </div>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-100" style="margin-bottom: 1rem">
          <div class="row">
            <label class="col-sm-2 col-form-label lb-fontsize">Phí chuyển tiền</label>
            <div class="col-sm-10">
              <b-form-select v-model="External_PhiChuyenTien">
                <b-form-select-option value="Người chuyển trả" style="font-size: 1.25rem;">Người chuyển trả</b-form-select-option>
                <b-form-select-option value="Người nhận trả" style="font-size: 1.25rem;">Người nhận trả</b-form-select-option>
              </b-form-select>
            </div>
          </div>
        </div>
      </div>
    </fieldset>
    <div class="md-layout-item md-small-size-100 md-size-100">
      <br>
    </div>
    <div class="md-layout-item md-size-100 text-right"  style="margin-bottom: 1rem">
      <b-button variant="danger">Thực hiện chuyển khoản</b-button>
    </div>
    <div class="md-layout-item md-small-size-100 md-size-100">
      <br>
    </div>
  </div>
</template>
<script>
export default {
  name: "chuyen-khoan-cung-ngan-hang",
  props: {
    dataBackgroundColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      External_SoDu: "",
      External_TaiKhoanNguon: null,
      External_TenNganHang: "",
      External_TimKiem: null,
      External_PhiChuyenTien: "Người chuyển trả",
      External_NoiDungChuyenTien: "",
      External_LuuThongTinNguoiHuong: false,
      // country: null,
      // btnDataDisable: true,
      // txtSoDienThoaiDisable: true,
      // txtEmailDisable: true,
      // txtNgheNghiepDisable: true,
      // GioiTinh: "Nam",
      // NgaySinh: "30/04/1989",
      // SoCMND: "763***937",
      // DiaChi: "606/37 Đường Ba Tháng Hai, Phường Từ Liêm, Tp. Hà Nội",
      // SoDienThoai: "0978954758",
      // oldSoDienThoai: "0978954758",
      // Email: "myaccount1@gmail.com",
      // oldEmail: "myaccount1@gmail.com",
      // NgheNghiep: "Sinh Viên",
      // oldNgheNghiep: "Sinh Viên"
    };
  },
  methods: {
    // EnableEditSoDienThoai() {
    //   this.txtSoDienThoaiDisable = false;
    //   this.btnDataDisable = this.txtSoDienThoaiDisable && this.txtEmailDisable && this.txtNgheNghiepDisable;
    // },
    // DisableEditSoDienThoai() {
    //   this.txtSoDienThoaiDisable = true;
    //   this.SoDienThoai = this.oldSoDienThoai;
    //   this.btnDataDisable = this.txtSoDienThoaiDisable && this.txtEmailDisable && this.txtNgheNghiepDisable;
    // },
    // EnableEditEmail() {
    //   this.txtEmailDisable = false;
    //   this.btnDataDisable = this.txtSoDienThoaiDisable && this.txtEmailDisable && this.txtNgheNghiepDisable;
    // },
    // DisableEditEmail() {
    //   this.txtEmailDisable = true;
    //   this.Email = this.oldEmail;
    //   this.btnDataDisable = this.txtSoDienThoaiDisable && this.txtEmailDisable && this.txtNgheNghiepDisable;
    // },
    // EnableEditNgheNghiep() {
    //   this.txtNgheNghiepDisable = false;
    //   this.btnDataDisable = this.txtSoDienThoaiDisable && this.txtEmailDisable && this.txtNgheNghiepDisable;
    // },
    // DisableEditNgheNghiep() {
    //   this.txtNgheNghiepDisable = true;
    //   this.NgheNghiep = this.oldNgheNghiep;
    //   this.btnDataDisable = this.txtSoDienThoaiDisable && this.txtEmailDisable && this.txtNgheNghiepDisable;
    // }
  }
};
</script>

<style lang="scss" scoped>
 ::v-deep {
   @import 'bootstrap/scss/bootstrap.scss';
 }
</style>

<style scoped>
  .lb-fontsize {
    font-size: 1rem;
  }
  .form-control {
    background-image: unset;
    background-size: unset;
    background-repeat: unset;
    background-position: unset;
    float: unset;
    box-shadow: unset;
  }

  .fadee-enter-active {
    transition: opacity .5s;
  }
  .fadee-enter, .fadee-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
