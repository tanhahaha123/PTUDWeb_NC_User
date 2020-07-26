<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Thông tin cá nhân</h4>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Tên khách hàng</label>
              <md-input v-model="TenKhachHang" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Giới tính</label>
              <md-input v-model="GioiTinh" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Ngày sinh</label>
              <md-input v-model="NgaySinh" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Số CMND</label>
              <md-input v-model="SoCMND" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Địa chỉ</label>
              <md-input v-model="DiaChi" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Số điện thoại liên hệ</label>
              <md-input v-model="SoDienThoai" :disabled="txtSoDienThoaiDisable"></md-input>
              <md-button v-if="txtSoDienThoaiDisable" style="height: 20px;" class="md-just-icon md-simple md-primary" @click="EnableEditSoDienThoai">
                <md-icon>edit</md-icon>
                <md-tooltip md-direction="top">Edit</md-tooltip>
              </md-button>
              <md-button v-if="!txtSoDienThoaiDisable" style="height: 20px;" class="md-just-icon md-simple md-danger" @click="DisableEditSoDienThoai">
                <md-icon>close</md-icon>
                <md-tooltip md-direction="top">Cancel</md-tooltip>
              </md-button>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Email</label>
              <md-input v-model="Email" :disabled="txtEmailDisable"></md-input>
              <md-button v-if="txtEmailDisable" style="height: 20px;" class="md-just-icon md-simple md-primary" @click="EnableEditEmail">
                <md-icon>edit</md-icon>
                <md-tooltip md-direction="top">Edit</md-tooltip>
              </md-button>
              <md-button v-if="!txtEmailDisable" style="height: 20px;" class="md-just-icon md-simple md-danger" @click="DisableEditEmail">
                <md-icon>close</md-icon>
                <md-tooltip md-direction="top">Cancel</md-tooltip>
              </md-button>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Nghề nghiệp</label>
              <md-input v-model="NgheNghiep" :disabled="txtNgheNghiepDisable"></md-input>
              <md-button v-if="txtNgheNghiepDisable" style="height: 20px;" class="md-just-icon md-simple md-primary" @click="EnableEditNgheNghiep">
                <md-icon>edit</md-icon>
                <md-tooltip md-direction="top">Edit</md-tooltip>
              </md-button>
              <md-button v-if="!txtNgheNghiepDisable" style="height: 20px;" class="md-just-icon md-simple md-danger" @click="DisableEditNgheNghiep">
                <md-icon>close</md-icon>
                <md-tooltip md-direction="top">Cancel</md-tooltip>
              </md-button>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-raised md-success" :disabled="btnDataDisable">Cập nhật hồ sơ</md-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
export default {
  name: "edit-profile-form",
  props: {
    dataBackgroundColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      btnDataDisable: true,
      txtSoDienThoaiDisable: true,
      txtEmailDisable: true,
      txtNgheNghiepDisable: true,
      TenKhachHang: "Nguyễn Công Phượng",
      GioiTinh: "Nam",
      NgaySinh: "30/04/1989",
      SoCMND: "763***937",
      DiaChi: "606/37 Đường Ba Tháng Hai, Phường Từ Liêm, Tp. Hà Nội",
      SoDienThoai: "0978954758",
      oldSoDienThoai: "0978954758",
      Email: "myaccount1@gmail.com",
      oldEmail: "myaccount1@gmail.com",
      NgheNghiep: "Sinh Viên",
      oldNgheNghiep: "Sinh Viên",
      username: null,
      disabled: null,
      emailadress: null,
      lastname: null,
      firstname: null,
      address: null,
      city: null,
      country: null,
      code: null,
      aboutme:
        "Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
    };
  },
  methods: {
    EnableEditSoDienThoai() {
      this.txtSoDienThoaiDisable = false;
      this.btnDataDisable = this.txtSoDienThoaiDisable && this.txtEmailDisable && this.txtNgheNghiepDisable;
    },
    DisableEditSoDienThoai() {
      this.txtSoDienThoaiDisable = true;
      this.SoDienThoai = this.oldSoDienThoai;
      this.btnDataDisable = this.txtSoDienThoaiDisable && this.txtEmailDisable && this.txtNgheNghiepDisable;
    },
    EnableEditEmail() {
      this.txtEmailDisable = false;
      this.btnDataDisable = this.txtSoDienThoaiDisable && this.txtEmailDisable && this.txtNgheNghiepDisable;
    },
    DisableEditEmail() {
      this.txtEmailDisable = true;
      this.Email = this.oldEmail;
      this.btnDataDisable = this.txtSoDienThoaiDisable && this.txtEmailDisable && this.txtNgheNghiepDisable;
    },
    EnableEditNgheNghiep() {
      this.txtNgheNghiepDisable = false;
      this.btnDataDisable = this.txtSoDienThoaiDisable && this.txtEmailDisable && this.txtNgheNghiepDisable;
    },
    DisableEditNgheNghiep() {
      this.txtNgheNghiepDisable = true;
      this.NgheNghiep = this.oldNgheNghiep;
      this.btnDataDisable = this.txtSoDienThoaiDisable && this.txtEmailDisable && this.txtNgheNghiepDisable;
    }
  }
};
</script>
<style></style>
