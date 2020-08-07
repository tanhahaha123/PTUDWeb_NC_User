<template>
  <md-table v-model="NhacNoDaTaoComputed" :table-header-color="tableHeaderColor" md-fixed-header>
    <md-table-row slot="md-table-row" slot-scope="{ item }">
      <md-table-cell md-label="STT">{{ item.STT }}</md-table-cell>
      <md-table-cell md-label="Mã nhắc nợ">{{ item.MaGiaoDichNhacNo }}</md-table-cell>
      <md-table-cell md-label="STK nhận">{{ item.SoTaiKhoanNguoiNhan }}</md-table-cell>
      <md-table-cell md-label="Số tiền">{{ item.SoTienFormat }}</md-table-cell>
      <md-table-cell md-label="Nội dung">{{ item.NoiDung }}</md-table-cell>
      <md-table-cell md-label="hủy">
        <md-button style="height: 20px;" class="md-just-icon md-simple md-danger nofocus" @click="HuyNhacNo">
          <md-icon>close</md-icon>
          <md-tooltip md-direction="top">Hủy nhắc nợ</md-tooltip>
        </md-button>
      </md-table-cell>
    </md-table-row>
  </md-table>
</template>
<script>
  import { mapState } from 'vuex';

  export default {
    name: "nhac-no-da-tao",
    props: {
      tableHeaderColor: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
      };
    },
    computed: {
      ...mapState(['NhacNoDaTao']),
      NhacNoDaTaoComputed(){
        let arr = JSON.parse(JSON.stringify(this.NhacNoDaTao));
        for (let i in arr){
          arr[i].STT= parseInt(i)+1;
          var n = arr[i].SoTien.toString().split('').reverse().join("");
          var n2 = n.replace(/\d\d\d(?!$)/g, "$&.");    
          arr[i].SoTienFormat = n2.split('').reverse().join('')+' VNĐ';
        }
        return arr;
      }
    },
    methods: {
      HuyNhacNo(event){
        let element = event.target.closest('tr').getElementsByTagName('td');
        let payload = {
          "DebtsID": element[1].textContent,
          "DestinationAccountNumber": element[2].textContent,
          "Amount": element[3].textContent
        }
        this.$emit('HuyNhacNoDaTao',payload);
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
  /deep/ table thead {
    display: table-header-group!important;
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