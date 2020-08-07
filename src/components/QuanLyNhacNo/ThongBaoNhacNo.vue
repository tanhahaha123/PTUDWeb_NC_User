<template>
  <md-table id="tableLichSuNhacNo" v-model="LichSuNhacNoComputed" :table-header-color="tableHeaderColor" md-fixed-header>
    <md-table-row slot="md-table-row" slot-scope="{ item }">
      <md-table-cell>
        <div class="alert alert-secondary">
          <span v-if="item.PhanLoai==1" data-notify="message" style="text-align: left;"><span style="color:#f00; display: inline;">Bạn đã tạo thành công nhắc nợ</span> #{{item.MaGiaoDichNhacNo}}<span style="color:#f00; display: inline;"> tới</span><span style="display: inline; font-weight: bold;"> {{item.SoTaiKhoanNguoiNhan}}.</span> Số tiền <span style="display: inline; font-weight: bold;">{{item.SoTienFormat}}</span> với nội dung "{{item.NoiDung}}"<br><span style="color: #00f;">{{item.NgayGiaoDichFormat}}</span></span>
          <span v-if="item.PhanLoai==2" data-notify="message" style="text-align: left;"><span style="color:#f00; display: inline;">Một giao dịch nhắc nợ</span> #{{item.MaGiaoDichNhacNo}} <span style="color:#f00; display: inline;">được gửi đến bạn từ</span> <span style="display: inline; font-weight: bold;">{{item.SoTaiKhoanNguoiGui}}.</span> Số tiền <span style="display: inline; font-weight: bold;">{{item.SoTienFormat}}</span> với nội dung "{{item.NoiDung}}"<br><span style="color: #00f;">{{item.NgayGiaoDichFormat}}</span></span>
          <span v-if="item.PhanLoai==3" data-notify="message" style="text-align: left;"><span style="color:#f00; display: inline;">Bạn đã hủy nhắc nợ</span> #{{item.MaGiaoDichNhacNo}} với <span style="display: inline; font-weight: bold;">{{item.SoTaiKhoanNguoiNhan}}.</span> Số tiền <span style="display: inline; font-weight: bold;">{{item.SoTienFormat}}</span> với nội dung "{{item.NoiDung}}"<br><span style="color: #00f;">{{item.NgayGiaoDichFormat}}</span></span>
          <span v-if="item.PhanLoai==4" data-notify="message" style="text-align: left;"><span style="color:#f00; display: inline;">Số tài khoản</span> <span style="display: inline; font-weight: bold;">{{item.SoTaiKhoanNguoiGui}}</span> <span style="color:#f00; display: inline;">vừa hủy nhắc nợ</span> #{{item.MaGiaoDichNhacNo}}. Số tiền <span style="display: inline; font-weight: bold;">{{item.SoTienFormat}}</span> với nội dung "{{item.NoiDung}}"<br><span style="color: #00f;">{{item.NgayGiaoDichFormat}}</span></span>
          <span v-if="item.PhanLoai==5" data-notify="message" style="text-align: left;"><span style="color:#f00; display: inline;">Bạn đã thanh toán thành công nhắc nợ</span> #{{item.MaGiaoDichNhacNo}} <span style="color:#f00; display: inline;">với tài khoản</span> <span style="display: inline; font-weight: bold;">{{item.SoTaiKhoanNguoiNhan}}.</span> Số tiền <span style="display: inline; font-weight: bold;">{{item.SoTienFormat}}</span> với nội dung "{{item.NoiDung}}"<br><span style="color: #00f;">{{item.NgayGiaoDichFormat}}</span></span>
          <span v-if="item.PhanLoai==6" data-notify="message" style="text-align: left;"><span style="color:#f00; display: inline;">Tài khoản</span> <span style="display: inline; font-weight: bold;">{{item.SoTaiKhoanNguoiGui}}</span> <span style="color:#f00; display: inline;">vừa thanh toán nhắc nợ</span> #{{item.MaGiaoDichNhacNo}}. Số tiền <span style="display: inline; font-weight: bold;">{{item.SoTienFormat}}</span> với nội dung "{{item.NoiDung}}"<br><span style="color: #00f;">{{item.NgayGiaoDichFormat}}</span></span>
        </div>
      </md-table-cell>
    </md-table-row>
  </md-table>
</template>
<script>
  import { mapState } from 'vuex';
  import moment from 'moment';

  export default {
    name: "thong-bao-nhac-no",
    props: {
      tableHeaderColor: {
        type: String,
        default: ""
      },
      STK: {
        default: ""
      }
    },
    data() {
      return {
      };
    },
    computed: {
      ...mapState(['LichSuNhacNo']),
      LichSuNhacNoComputed(){
        let arr = JSON.parse(JSON.stringify(this.LichSuNhacNo));
        for (let i in arr){ //1: nhắc nợ do bản thân tạo, 2: nhắc nợ do người khác tạo, 3: nhắc nợ do mình hủy, 4: nhắc nợ do người khác hủy, 5: nhắc nợ do mình thanh toán, 6: nhắc nợ do người khác thanh toán
          if ((arr[i].SoTaiKhoanNguoiGui==this.STK)&&(arr[i].LoaiGiaoDich=="đã tạo")) {
            arr[i].PhanLoai = "1";
            arr[i].ColorClass = "alert-secondary";
          }
          if ((arr[i].SoTaiKhoanNguoiNhan==this.STK)&&(arr[i].LoaiGiaoDich=="đã tạo")) {
            arr[i].PhanLoai = "2";
            arr[i].ColorClass = "alert-info";
          }
          if ((arr[i].SoTaiKhoanNguoiGui==this.STK)&&(arr[i].LoaiGiaoDich=="đã hủy")) {
            arr[i].PhanLoai = "3";
            arr[i].ColorClass = "alert-warning";
          }
          if ((arr[i].SoTaiKhoanNguoiNhan==this.STK)&&(arr[i].LoaiGiaoDich=="đã hủy")) {
            arr[i].PhanLoai = "4";
            arr[i].ColorClass = "alert-danger";
          }
          if ((arr[i].SoTaiKhoanNguoiGui==this.STK)&&(arr[i].LoaiGiaoDich=="đã thanh toán")) {
            arr[i].PhanLoai = "5";
            arr[i].ColorClass = "alert-success";
          }
          if ((arr[i].SoTaiKhoanNguoiNhan==this.STK)&&(arr[i].LoaiGiaoDich=="đã thanh toán")) {
            arr[i].PhanLoai = "6";
            arr[i].ColorClass = "alert-success";
          }
          arr[i].NgayGiaoDichFormat = moment(arr[i].NgayGiaoDich).format('HH:mm DD/MM/YYYY');
          var n = arr[i].SoTien.toString().split('').reverse().join("");
          var n2 = n.replace(/\d\d\d(?!$)/g, "$&.");    
          arr[i].SoTienFormat = n2.split('').reverse().join('')+' VNĐ';
        }
        return arr.reverse();
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
  tbody .md-table-row td {
    border-top: none;
  }
  .md-table-cell {
    padding: 0;
  }
  .alert.alert-primary, .alert.alert-secondary, .alert.alert-danger, .alert.alert-success, .alert-info .alert-warning, .alert.alert-light, .alert.alert-dark{
    box-shadow: none;
  }
  .alert {
    box-shadow: none;
  }
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