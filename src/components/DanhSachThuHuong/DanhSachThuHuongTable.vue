<template>
  <div>
    <transition name="bounce" mode="out-in">
      <md-table v-if="displayDanhSachThuHuong==true" v-model="themsttDanhSachNguoiThuHuong" :table-header-color="tableHeaderColor" md-fixed-header md-height="100%">
        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="STT" style="font-size: 1.1rem">{{ item.STT }}</md-table-cell>
          <md-table-cell md-label="Tên gợi nhớ" style="font-size: 1.1rem">{{ item.TenGoiNho }}</md-table-cell>
          <md-table-cell md-label="STK thụ hưởng" style="font-size: 1.1rem">{{ item.SoTaiKhoanNguoiNhan }}</md-table-cell>
          <md-table-cell md-label="Ngân hàng" style="font-size: 1.1rem">{{ item.TenNganHang }}</md-table-cell>
          <md-table-cell md-label="Sửa / Xóa">
            <md-button style="height: 20px;" class="md-just-icon md-simple md-primary nofocus" @click="handlebtnEdit">
              <md-icon>edit</md-icon>
              <md-tooltip md-direction="top">Edit</md-tooltip>
            </md-button>
            <md-button style="height: 20px;" class="md-just-icon md-simple md-danger nofocus" @click="handlebtnDelete">
              <md-icon>close</md-icon>
              <md-tooltip md-direction="top">Delete</md-tooltip>
            </md-button>
          </md-table-cell>
        </md-table-row>
      </md-table>
    </transition>
    
    <transition name="slfade">
      <form v-if="displayDanhSachThuHuong==false" class="md-layout">
        <div class="md-layout-item md-small-size-100 md-size-100">
          <br><br>
          <div class="row" style="margin-bottom: 1rem">
            <div class="col-2"></div>
            <div class="col-10">
              <h4 style="font-weight: bold">CHỈNH SỬA THÔNG TIN NGƯỜI HƯỞNG</h4>
            </div>
          </div>
          <br>
          <div class="row" style="margin-bottom: 1rem">
            <div class="col-2"></div>
            <label class="col-2 col-form-label lb-fontsize">Tên gợi nhớ</label>
            <div class="col-5">
              <b-form-input id="edtTenGoiNho" v-model="editRowSelected.TenGoiNho" placeholder="Nhập tên gợi nhớ cần chỉnh sửa" :disabled="disableTenGoiNho" required></b-form-input>
            </div>
            <div class="col-3"></div>
          </div>
          <div class="row" style="margin-bottom: 1rem">
            <div class="col-2"></div>
            <label class="col-2 col-form-label lb-fontsize">Số tài khoản</label>
            <div class="col-5">
              <b-form-input id="edtSoTaiKhoan" v-model="editRowSelected.SoTaiKhoanNguoiNhan" type="number" placeholder="Nhập số tài khoản cần chỉnh sửa" :disabled="disableSoTaiKhoanNguoiNhan" required></b-form-input>
            </div>
            <div class="col-3"></div>
          </div>
          <div class="row" style="margin-bottom: 1rem">
            <div class="col-2"></div>
            <label class="col-2 col-form-label lb-fontsize">Ngân hàng</label>
            <div class="col-5">
              <b-form-input :value="editRowSelected.TenNganHang" disabled></b-form-input>
            </div>
            <div class="col-3"></div>
          </div>
          <div class="row" style="margin-bottom: 1rem">
            <div class="col-4"></div>
            <div class="col-4">
              <b-button type="submit" variant="success" @click="handleThucHienChinhSua">Thực hiện chỉnh sửa</b-button>
              &nbsp;
              <b-button variant="secondary" @click="displayDanhSachThuHuong = true">Quay trở lại</b-button>
            </div>
            <div class="col-4"></div>
          </div>
        </div>
      </form>
    </transition>

    <b-modal ref="my-modal" hide-footer title="Thông báo">
      <div class="d-block text-center" style="border-top: 1px solid #e9ecef; padding: 1rem;">
        <h3>Bạn có chắc chắn muốn xóa:</h3>
        <br>
        <strong style="color: #0069d9;font-size: 1rem">{{deleteRowSelected.TenGoiNho}} (<span style="color: #c82333">{{deleteRowSelected.SoTaiKhoanNguoiNhan}}</span>) - Ngân hàng: <span style="color: #c82333">{{deleteRowSelected.TenNganHang}}</span></strong>
      </div>
      <div style="display: flex; justify-content: flex-end; border-top: 1px solid #e9ecef">
        <b-button style="margin-right:0.25rem" class="mt-3" variant="secondary" @click="handleHuyBo">Hủy bỏ</b-button>
        <b-button style="margin-left:0.25rem" class="mt-3" variant="primary" @click="handleXacNhan">Xác nhận</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import { mapState,mapGetters } from 'vuex';

  export default {
    name: "tk-tiet-kiem-table",
    props: {
      tableHeaderColor: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        displayDanhSachThuHuong: true,
        selected: [],
        editRowSelected: {},
        deleteRowSelected: {},
        originalTenGoiNho: null,
        originalSoTaiKhoanNguoiNhan: null,
        disableSoTaiKhoanNguoiNhan: false,
        disableTenGoiNho: false
      };
    },
    computed: {
      ...mapState(['selectedTaiKhoanThanhToan','DanhSachNguoiThuHuong']),
      ...mapGetters(['themsttDanhSachNguoiThuHuong'])
    },
    methods: {
      handlebtnEdit(e){
        let element = e.target.closest('tr').getElementsByTagName('td');
        let rowSelected = {};
        rowSelected.SoTaiKhoan = this.selectedTaiKhoanThanhToan;
        rowSelected.STT = element[0].textContent;
        rowSelected.TenGoiNho = element[1].textContent;
        rowSelected.SoTaiKhoanNguoiNhan = element[2].textContent;
        rowSelected.TenNganHang = element[3].textContent;
        this.editRowSelected = rowSelected;
        this.originalTenGoiNho = rowSelected.TenGoiNho;
        this.originalSoTaiKhoanNguoiNhan = rowSelected.SoTaiKhoanNguoiNhan;
        this.displayDanhSachThuHuong = false;
      },
      handlebtnDelete(e){
        this.$refs['my-modal'].show();
        let element = e.target.closest('tr').getElementsByTagName('td');
        let rowSelected = {};
        rowSelected.SoTaiKhoan = this.selectedTaiKhoanThanhToan;
        rowSelected.TenGoiNho = element[1].textContent;
        rowSelected.SoTaiKhoanNguoiNhan = element[2].textContent;
        rowSelected.TenNganHang = element[3].textContent;
        this.deleteRowSelected = rowSelected;
      },
      handleHuyBo() {
        this.deleteRowSelected = {};
        this.$refs['my-modal'].hide();
      },
      handleXacNhan(){
        this.$store.dispatch('deleteDanhSachNguoiThuHuong',this.deleteRowSelected.SoTaiKhoanNguoiNhan);
        this.$refs['my-modal'].hide();
      },
      handleThucHienChinhSua(event){
        if (
        !document.getElementById('edtTenGoiNho').checkValidity() ||
        !document.getElementById('edtSoTaiKhoan').checkValidity()) return false;//Nếu chưa validate sẽ hiện thông báo của thuộc tính "required trong form"
        event.preventDefault();//ngăn chặn sự kiện mặc định của nút submit gửi request

        this.$store.dispatch('updateDanhSachNguoiThuHuong',this.editRowSelected);
        this.displayDanhSachThuHuong = true;
        this.disableTenGoiNho = false;
        this.disableSoTaiKhoanNguoiNhan = false;
      }
    },
    watch: {
      'editRowSelected.TenGoiNho': function(newValue,oldValue){
        if (newValue!=this.originalTenGoiNho) this.disableSoTaiKhoanNguoiNhan = true;
        else this.disableSoTaiKhoanNguoiNhan = false;
      },
      'editRowSelected.SoTaiKhoanNguoiNhan': function(newValue,oldValue){
        if (newValue!=this.originalSoTaiKhoanNguoiNhan) this.disableTenGoiNho = true;
        else this.disableTenGoiNho = false;
      }
    }
  };
  // console.log("old: "+JSON.stringify(oldValue)+"_new: "+JSON.stringify(newValue));
</script>

<style lang="scss" scoped>
 ::v-deep {
   @import 'bootstrap/scss/bootstrap.scss';
 }
</style>

<style scoped>
  .lb-fontsize {
    font-size: 1.1rem;
  }
  .form-control {
    background-image: unset;
    background-size: unset;
    background-repeat: unset;
    background-position: unset;
    float: unset;
    box-shadow: unset;
  }
  .nofocus {
    outline: none!important;
  }




  .bounce-enter-active {
    animation: bounce-in .5s;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }

  .slfade-enter-active {
    transition: all .3s ease;
  }
  .slfade-enter, .slfade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
</style>