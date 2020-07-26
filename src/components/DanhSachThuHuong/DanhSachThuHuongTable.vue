<template>
  <div>
    <transition name="bounce">
      <md-table v-if="displayDanhSachThuHuong==true" v-model="listDanhSachThuHuong" :table-header-color="tableHeaderColor">
        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="STT" style="font-size: 1.1rem">{{ item.STT }}</md-table-cell>
          <md-table-cell md-label="Số tài khoản" style="font-size: 1.1rem">{{ item.SoTaiKhoan }}</md-table-cell>
          <md-table-cell md-label="Tên gợi nhớ" style="font-size: 1.1rem">{{ item.SoDu }}</md-table-cell>
          <md-table-cell md-label="Ngân hàng" style="font-size: 1.1rem">{{ item.NgayGui }}</md-table-cell>
          <md-table-cell md-label="Sửa / Xóa">
            <md-button style="height: 20px;" class="md-just-icon md-simple md-primary" @click="handlebtnEdit">
              <md-icon>edit</md-icon>
              <md-tooltip md-direction="top">Edit</md-tooltip>
            </md-button>
            <md-button style="height: 20px;" class="md-just-icon md-simple md-danger" @click="handlebtnDelete">
              <md-icon>close</md-icon>
              <md-tooltip md-direction="top">Close</md-tooltip>
            </md-button>
          </md-table-cell>
        </md-table-row>
      </md-table>
    </transition>
    
    <transition name="slfade">
      <div v-if="displayDanhSachThuHuong==false" class="md-layout">
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
              <b-form-input placeholder="Nhập tên gợi nhớ cần chỉnh sửa"></b-form-input>
            </div>
            <div class="col-3"></div>
          </div>
          <div class="row" style="margin-bottom: 1rem">
            <div class="col-2"></div>
            <label class="col-2 col-form-label lb-fontsize">Số tài khoản</label>
            <div class="col-5">
              <b-form-input type="number" placeholder="Nhập số tài khoản cần chỉnh sửa"></b-form-input>
            </div>
            <div class="col-3"></div>
          </div>
          <div class="row" style="margin-bottom: 1rem">
            <div class="col-2"></div>
            <label class="col-2 col-form-label lb-fontsize">Ngân hàng</label>
            <div class="col-5">
              <b-form-input disabled></b-form-input>
            </div>
            <div class="col-3"></div>
          </div>
          <div class="row" style="margin-bottom: 1rem">
            <div class="col-4"></div>
            <div class="col-4">
              <b-button variant="success">Thực hiện chỉnh sửa</b-button>
              &nbsp;
              <b-button variant="secondary" @click="displayDanhSachThuHuong = true">Quay trở lại</b-button>
            </div>
            <div class="col-4"></div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
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
      listDanhSachThuHuong: [
      {"STT":1, "SoTaiKhoan": 789789789, "SoDu": "Nguyen Van Thanh", "NgayGui":"AGRIBANK"},
      {"STT":2, "SoTaiKhoan": 789789789, "SoDu": "Nguyen Van Thanh", "NgayGui":"AGRIBANK"},
      {"STT":3, "SoTaiKhoan": 789789789, "SoDu": "Nguyen Van Thanh", "NgayGui":"AGRIBANK"},
      {"STT":4, "SoTaiKhoan": 789789789, "SoDu": "Nguyen Van Thanh", "NgayGui":"AGRIBANK"},
      {"STT":5, "SoTaiKhoan": 789789789, "SoDu": "Nguyen Van Thanh", "NgayGui":"AGRIBANK"},
      {"STT":6, "SoTaiKhoan": 789789789, "SoDu": "Nguyen Van Thanh", "NgayGui":"AGRIBANK"},
      {"STT":1, "SoTaiKhoan": 789789789, "SoDu": "Nguyen Van Thanh", "NgayGui":"AGRIBANK"},
      {"STT":2, "SoTaiKhoan": 789789789, "SoDu": "Nguyen Van Thanh", "NgayGui":"AGRIBANK"},
      {"STT":3, "SoTaiKhoan": 789789789, "SoDu": "Nguyen Van Thanh", "NgayGui":"AGRIBANK"},
      {"STT":4, "SoTaiKhoan": 789789789, "SoDu": "Nguyen Van Thanh", "NgayGui":"AGRIBANK"},
      {"STT":5, "SoTaiKhoan": 789789789, "SoDu": "Nguyen Van Thanh", "NgayGui":"AGRIBANK"},
      {"STT":6, "SoTaiKhoan": 789789789, "SoDu": "Nguyen Van Thanh", "NgayGui":"AGRIBANK"}
    ]
    };
  },
  methods: {
    handlebtnEdit(e){
      this.displayDanhSachThuHuong = false;
      // console.log(e.target.closest('tr'));
    },
    handlebtnDelete(e){
      console.log(e.target.closest('tr'));
    }
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