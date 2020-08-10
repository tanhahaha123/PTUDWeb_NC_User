<template>
  <div class="content">
    <transition name="slfade">
      <div class="md-layout" v-if="!displayTaoNhacNo">
        <div v-if="!displayHuyNhacNo && !displayThanhToanNhacNo" class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-66">
          <md-card class="md-card-nav-tabs" style="border: solid 2px #5cb860;">
            <md-card-content style="position: relative;">
              <span class="md-nav-tabs-title" style="font-weight: bold;">chọn</span>
              <b-button style="position: absolute; margin: 0; right: 40px; top: 15px;transform: translateY(-45%); z-index: 1;" variant="dark" @click="handleTaoNhacNo"><md-icon style="color: #fff;">add</md-icon>Tạo</b-button>
              <md-tabs class="md-success" md-alignment="left">
                <md-tab id="tab-home" md-label="Nhắc nợ chưa thanh toán" md-icon="compare_arrows">
                  <nhac-no-chua-thanh-toan table-header-color="purple" @HuyNhacNoChuaThanhToan="HuyNhacNoChuaThanhToan" @ThanhToanNhacNo="ThanhToanNhacNo"></nhac-no-chua-thanh-toan>
                </md-tab>

                <md-tab id="tab-pages" md-label="Nhắc nợ đã tạo" md-icon="swap_horiz">
                  <nhac-no-da-tao table-header-color="purple" @HuyNhacNoDaTao="HuyNhacNoDaTao"></nhac-no-da-tao>
                </md-tab>
              </md-tabs>
            </md-card-content>
          </md-card>
        </div>
        <div v-if="displayHuyNhacNo" class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-66">
          <md-card style="border: solid 2px #5cb860;">
            <md-card-header data-background-color="green">
              <span class="title">Hủy nhắc nợ</span>
            </md-card-header>
            <md-card-content>
              <form>
                <br>
                <div>Nhắc nợ <span style="color: #f00">{{payloadDebtsID}}</span> giao dịch với STK: <span style="color: #f00">{{payloadDestinationAccountNumber}}</span>. Số tiền nhắc nợ: <span style="color: #f00">{{payloadAmount}}</span></div>
                <br>
                <b-form-textarea id="NoiDungHuyNhacNo" v-model="NoiDungHuyNhacNo" placeholder="Nhập nội dung hủy nhắc nợ..." rows="3" max-rows="6" required></b-form-textarea>
                <br>
                <b-button type="submit" variant="success" @click="handleThucHienHuyNhacNo">Thực hiện hủy nhắc nợ</b-button>
                <b-button style="margin-left: 10px;" variant="secondary" @click="handleQuayLaiHuyNhacNo">Quay lại</b-button>
                <b-spinner style="margin-left: 0.5rem;" v-if="LoadingHuyNhacNo" variant="primary" small label="Small Spinner" type="grow"></b-spinner>
              </form>
            </md-card-content>
          </md-card>
        </div>
        <div v-if="displayThanhToanNhacNo" class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-66">
          <md-card style="border: solid 2px #5cb860;">
            <md-card-header data-background-color="green">
              <span class="title">Thanh toán nhắc nợ</span>
            </md-card-header>
            <md-card-content>
              <form>
                <br>
                <table style="font-size: 1.1rem; margin: auto;">
                  <tr>
                    <td style="font-weight: bold;">Mã nhắc nợ</td>
                    <td>{{payloadDebtsID}}</td>
                  </tr>
                  <tr>
                    <td style="font-weight: bold;">STK giao dịch</td>
                    <td>{{payloadDestinationAccountNumber}}</td>
                  </tr>
                  <tr>
                    <td style="font-weight: bold;">Số tiền</td>
                    <td>{{payloadAmount}}</td>
                  </tr>
                  <tr v-if="!displayOTP">
                    <td style="font-weight: bold;">Nội dung thanh toán</td>
                    <td><b-form-textarea id="NoiDungThanhToanNhacNo" v-model="payloadMessage" placeholder="Nhập nội dung thanh toán nhắc nợ..." rows="3" max-rows="6" required></b-form-textarea></td>
                  </tr>
                  <tr v-if="displayOTP">
                    <td style="font-weight: bold;">Nội dung thanh toán</td>
                    <td style="color: #f00;">{{payloadMessage}}</td>
                  </tr>
                  <tr v-if="displayOTP">
                    <td style="font-weight: bold;">Phí thanh toán</td>
                    <td>1.000 VNĐ</td>
                  </tr>
                  <tr v-if="displayOTP">
                    <td style="font-weight: bold;">Mã OTP</td>
                    <td><input id="OTPCodeNhacNo" v-model="OTPCode" required></td>
                  </tr>
                  <br>
                  <tr v-if="displayOTP">
                    <td colspan="2">
                      <div style="text-align: center; color: #28a745">Mã OTP đã được chuyển đến email của quý khách!</div>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2"><hr></td>
                  </tr>
                  <tr>
                    <td style="font-weight: bold;">
                      <b-button v-if="!displayOTP" style="width: 100%" type="submit" variant="success" @click="handleXacNhanNhacNo">Xác nhận</b-button>
                      <b-button v-if="displayOTP" type="submit" variant="success" @click="handleThanhToanNhacNo">Thanh toán nhắc nợ</b-button>
                    </td>
                    <td>
                      <b-button variant="secondary" @click="handleQuayLaiThanhToanNhacNo">Quay lại</b-button>
                      <b-spinner style="margin-left: 0.5rem;" v-if="LoadingThanhToanNhacNo" variant="primary" small label="Small Spinner" type="grow"></b-spinner>
                    </td>
                  </tr>
                </table>
                <br><br><br><br><br><br>
              </form>
            </md-card-content>
          </md-card>
        </div>
        <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33">
          <md-card style="border: solid 2px #9c27b0;">
            <md-card-header data-background-color="purple">
              <span class="title">Thông báo</span>
              <p class="category">lịch sử thông báo nhắc nợ</p>
            </md-card-header>
            <md-card-content>
              <thong-bao-nhac-no :STK="MyAccountNumber" table-header-color="purple"></thong-bao-nhac-no>
            </md-card-content>
          </md-card>
        </div>
      </div>
    </transition>
    <transition name="slfade">
      <div class="md-layout" v-if="displayTaoNhacNo">
        <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
          <md-card>
            <md-card-header data-background-color="green">
              <h5 class="title">Tạo nhắc nợ mới</h5>
            </md-card-header>
            <md-card-content>
              <div class="md-layout">
                <form>
                  <div class="md-layout-item md-small-size-100 md-size-100">
                    <br>
                  </div>
                  <fieldset class="md-layout-item md-small-size-100 md-size-100" style="border: 2px solid #007bff!important;padding: .5rem!important">
                    <legend style="width: auto!important; color: #007bff!important">Thông tin người nợ </legend>
                    <div class="md-layout">
                      <div class="md-layout-item md-small-size-100 md-size-100" style="margin-bottom: 1rem">
                        <div class="row">
                          <label class="col-sm-2 col-form-label lb-fontsize">Tìm kiếm</label>
                          <div class="col-sm-10">
                            <b-form-select :value="TimKiem" @change="handleTimKiem">
                              <template v-for="(item, index) in DanhSachNguoiThuHuongNhacNo2">
                                <b-form-select-option :key="index" :value="item.SoTaiKhoanNguoiNhan" style="font-size: 1.25rem; color: #28a745">{{item.TenGoiNho}}</b-form-select-option>
                                <b-form-select-option :key="item.SoTaiKhoanNguoiNhan" value="" disabled style="font-size: 0.75rem;">• Số tài khoản: {{item.SoTaiKhoanNguoiNhan}}</b-form-select-option>
                                <b-form-select-option :key="item.TenNganHang+index" value="" disabled style="font-size: 0.75rem;">• Ngân hàng: {{item.TenNganHang}}</b-form-select-option>
                              </template>
                            </b-form-select>
                          </div>
                        </div>
                      </div>
                      <div class="md-layout-item md-small-size-100 md-size-100" style="margin-bottom: 1rem">
                        <div class="row">
                          <label class="col-sm-2 col-form-label lb-fontsize">Số tài khoản</label>
                          <div class="col-sm-10">
                            <b-form-input id="SoTaiKhoanNguoiNo" type="number" :value="SoTaiKhoanNguoiNo" @change="handleChangeSTKNguoiHuong" placeholder="Nhập số tài khoản người hưởng" required></b-form-input>
                          </div>
                        </div>
                      </div>
                      <div class="md-layout-item md-small-size-100 md-size-100" style="margin-bottom: 1rem">
                        <div class="row">
                          <label class="col-sm-2 col-form-label lb-fontsize">Người thụ hưởng</label>
                          <div class="col-sm-10">
                            <b-form-input :value="TenTaiKhoanNguoiHuong" placeholder="Tên người thụ hưởng sẽ được hiển thị ở đây" disabled></b-form-input>
                            <b-spinner v-if="LoadingTenTaiKhoanNguoiHuong" variant="primary" small label="Small Spinner" type="grow"></b-spinner>
                          </div>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  <div class="md-layout-item md-small-size-100 md-size-100">
                    <br>
                  </div>
                  <fieldset class="md-layout-item md-small-size-100 md-size-100" style="border: 2px solid #007bff!important;padding: .5rem!important">
                    <legend style="width: auto!important; color: #007bff!important">Thông tin giao dịch </legend>
                    <div class="md-layout">
                      <div class="md-layout-item md-small-size-100 md-size-100" style="margin-bottom: 1rem">
                        <div class="row">
                          <label class="col-sm-2 col-form-label lb-fontsize">Số tiền nợ</label>
                          <div class="col-sm-10" style="position: relative;">
                            <b-form-input id="SoTienChuyenNhacNo" :value="SoTienChuyen2" @input="handleSoTienChuyen" required></b-form-input>
                            <div id="vn_pseudo" style="position: absolute; left: 15px; pointer-events: none; top:52%; transform: translateY(-50%); font-size: 1rem; padding-left: 0.75rem; color: transparent; font-weight: 400; font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif; padding-left: 0.75rem">{{ SoTienChuyen2 }}.</div>
                          </div>
                        </div>
                      </div>
                      <div class="md-layout-item md-small-size-100 md-size-100" style="margin-bottom: 1rem">
                        <div class="row">
                          <label class="col-sm-2 col-form-label lb-fontsize">Nội dung nhắc nợ</label>
                          <div class="col-sm-10">
                            <b-form-textarea id="NoiDungNhacNo" v-model="NoiDungNhacNo" placeholder="Nhập nội dung nhắc nợ..." rows="3" max-rows="6" required></b-form-textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  <div class="md-layout-item md-small-size-100 md-size-100">
                    <br>
                  </div>
                  <div class="md-layout-item md-size-100 text-left"  style="margin-bottom: 1rem">
                    <b-button type="submit" variant="success" @click="handleThucHienGuiNhacNo">Thực hiện gửi nhắc nợ</b-button>
                    <b-button style="margin-left: 10px;" variant="secondary" @click="handleQuayLai">Quay lại</b-button>
                    <b-spinner style="margin-left: 0.5rem;" v-if="LoadingTaoNhacNo" variant="primary" small label="Small Spinner" type="grow"></b-spinner>
                  </div>
                  <div class="md-layout-item md-small-size-100 md-size-100">
                    <br>
                  </div>
                </form>
              </div>
            </md-card-content>
          </md-card>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    components: {
    },
    created(){
      this.$store.dispatch('getLichSuNhacNo').then(res=>{
        this.MyAccountNumber=res;
      });
      this.$store.dispatch('getNhacNoChuaThanhToan');
      this.$store.dispatch('getNhacNoDaTao');
      this.$store.dispatch('getDanhSachThuHuongNhacNo');
    },
    destroyed(){
      this.$store.dispatch('resetLichSuNhacNo');
      this.$store.dispatch('resetNhacNoChuaThanhToan');
      this.$store.dispatch('resetNhacNoDaTao');
      this.$store.dispatch('resetDanhSachThuHuongNhacNo');
    },
    data() {
      return {
        MyAccountNumber: null,
        displayTaoNhacNo: false,
        TimKiem: null,
        SoTaiKhoanNguoiNo: null,
        SoTienChuyen: null,
        NoiDungNhacNo: null,
        TenTaiKhoanNguoiHuong: null,
        LoadingTenTaiKhoanNguoiHuong: false,
        NoiDungHuyNhacNo: null,
        displayHuyNhacNo: false,
        displayThanhToanNhacNo: false,
        payloadDebtsID: null,
        payloadMyAccountNumber: null,
        payloadDestinationAccountNumber: null,
        payloadAmount: null,
        payloadMessage: null,
        LoadingTaoNhacNo: false,
        LoadingHuyNhacNo: false,
        LoadingThanhToanNhacNo: false,
        displayOTP: false,
        OTPCode: null
      };
    },
    computed: {
      ...mapState(['DanhSachNguoiThuHuongNhacNo']),
      DanhSachNguoiThuHuongNhacNo2: function(){
        return this.DanhSachNguoiThuHuongNhacNo.filter(function(el) { return el.TenNganHang == "25Bank"; });
      },
      SoTienChuyen2(){
        if (!this.SoTienChuyen) return null;
        var n = this.SoTienChuyen.toString().split('').reverse().join("");
        var n2 = n.replace(/\d\d\d(?!$)/g, "$&.");    
        return  n2.split('').reverse().join('');
      },
    },
    methods: {
      handleTaoNhacNo(){
        this.displayTaoNhacNo = true;
      },
      handleQuayLai(){
        this.$store.dispatch('getLichSuNhacNo').then(res=>{
          this.MyAccountNumber=res;
        });
        this.$store.dispatch('getNhacNoChuaThanhToan');
        this.$store.dispatch('getNhacNoDaTao');
        this.displayTaoNhacNo = false;

        this.TimKiem = null;
        this.SoTaiKhoanNguoiNo = null;
        this.TenTaiKhoanNguoiHuong = null;
        this.SoTienChuyen = null;
        this.NoiDungNhacNo = null;

      },
      handleTimKiem(value){
        this.TimKiem = value;
        this.SoTaiKhoanNguoiNo = value;
        this.TenTaiKhoanNguoiHuong = "Chờ trong giây lát...đang tải tên người sở hữu";
        this.LoadingTenTaiKhoanNguoiHuong = true;
        this.$store.dispatch('getTenTaiKhoanNguoiHuongNhacNo',this.SoTaiKhoanNguoiNo).then(res => {
          this.LoadingTenTaiKhoanNguoiHuong = false;
          this.TenTaiKhoanNguoiHuong = res;
        });;
      },
      handleChangeSTKNguoiHuong(value){
        this.TimKiem = null;
        if (value==""){
          this.TenTaiKhoanNguoiHuong = null;
          return;
        }
        this.SoTaiKhoanNguoiNo = value;
        this.TenTaiKhoanNguoiHuong = "Chờ trong giây lát...đang tải tên người sở hữu";
        this.LoadingTenTaiKhoanNguoiHuong = true;
        this.$store.dispatch('getTenTaiKhoanNguoiHuongNhacNo',this.SoTaiKhoanNguoiNo).then(res => {
          this.LoadingTenTaiKhoanNguoiHuong = false;
          this.TenTaiKhoanNguoiHuong = res;
        });;
      },
      handleSoTienChuyen(value){
        let temp = value.replace(/[.]/g,'');
        this.SoTienChuyen = temp;
      },
      handleThucHienGuiNhacNo(){
        if (
        !document.getElementById('SoTaiKhoanNguoiNo').checkValidity() ||
        !document.getElementById('SoTienChuyenNhacNo').checkValidity() ||
        !document.getElementById('NoiDungNhacNo').checkValidity()) return false;//Nếu chưa validate sẽ hiện thông báo của thuộc tính "required trong form"
        event.preventDefault();//ngăn chặn sự kiện mặc định của nút submit gửi request
        if (!this.TenTaiKhoanNguoiHuong) return;

        this.LoadingTaoNhacNo = true;
        let payload = {
          "MyAccountNumber": this.MyAccountNumber,
          "DestinationAccountNumber": this.SoTaiKhoanNguoiNo,
          "Amount": this.SoTienChuyen,
          "Message": this.NoiDungNhacNo
        }
        this.$store.dispatch('taoNhacNo',payload).then(res => {
          this.LoadingTaoNhacNo = false;
          this.$store.dispatch('getLichSuNhacNo').then(res=>{
            this.MyAccountNumber=res;
          });
          this.$store.dispatch('getNhacNoChuaThanhToan');
          this.$store.dispatch('getNhacNoDaTao');

          this.displayTaoNhacNo = false;
          this.$notify({
            message: "Tạo nhắc nợ thành công",
            icon: "add_alert",
            horizontalAlign: 'left',
            verticalAlign: 'bottom',
            type: "info"
          });

          this.TimKiem = null;
          this.SoTaiKhoanNguoiNo = null;
          this.TenTaiKhoanNguoiHuong = null;
          this.SoTienChuyen = null;
          this.NoiDungNhacNo = null;
        }).catch(res => {
          this.LoadingTaoNhacNo = false;
          this.displayTaoNhacNo = false;
          this.$notify({
            message: "Tạo nhắc nợ thất bại",
            icon: "add_alert",
            horizontalAlign: 'left',
            verticalAlign: 'bottom',
            type: "danger"
          });
        });
      },
      handleThucHienHuyNhacNo(){
        if (!document.getElementById('NoiDungHuyNhacNo').checkValidity()) return false;//Nếu chưa validate sẽ hiện thông báo của thuộc tính "required trong form"
        event.preventDefault();//ngăn chặn sự kiện mặc định của nút submit gửi request

        this.LoadingHuyNhacNo = true;
        let payload = {
            "DebtsID":this.payloadDebtsID,
            "MyAccountNumber":this.payloadMyAccountNumber,
            "DestinationAccountNumber":this.payloadDestinationAccountNumber,
            "Message":this.NoiDungHuyNhacNo
        }
        this.$store.dispatch('huyNhacNo',payload).then(res=>{
          this.LoadingHuyNhacNo = false;
          this.$store.dispatch('getLichSuNhacNo').then(res=>{
            this.MyAccountNumber=res;
          });
          this.$store.dispatch('getNhacNoChuaThanhToan');
          this.$store.dispatch('getNhacNoDaTao');

          this.payloadDebtsID = null;
          this.payloadMyAccountNumber = null;
          this.payloadDestinationAccountNumber = null;  
          this.payloadAmount = null;
          this.displayHuyNhacNo = false;
          this.$notify({
            message: "Hủy nhắc nợ thành công",
            icon: "add_alert",
            horizontalAlign: 'left',
            verticalAlign: 'bottom',
            type: "info"
          });
        }).catch(res=>{
          this.LoadingHuyNhacNo = false;
          this.payloadDebtsID = null;
          this.payloadMyAccountNumber = null;
          this.payloadDestinationAccountNumber = null;  
          this.payloadAmount = null;
          this.displayHuyNhacNo = false;
          this.$notify({
            message: "Hủy nhắc nợ thất bại",
            icon: "add_alert",
            horizontalAlign: 'left',
            verticalAlign: 'bottom',
            type: "danger"
          });
        });
      },
      handleQuayLaiHuyNhacNo(){
        this.payloadDebtsID = null;
        this.payloadMyAccountNumber = null;
        this.payloadDestinationAccountNumber = null;  
        this.payloadAmount = null;
        this.displayHuyNhacNo = false;
      },
      HuyNhacNoChuaThanhToan(payload){
        this.payloadDebtsID = payload.DebtsID;
        this.payloadMyAccountNumber = this.MyAccountNumber;
        this.payloadDestinationAccountNumber = payload.DestinationAccountNumber;  
        this.payloadAmount = payload.Amount;
        this.NoiDungHuyNhacNo = null;
        this.displayHuyNhacNo = true;
      },
      HuyNhacNoDaTao(payload){
        this.payloadDebtsID = payload.DebtsID;
        this.payloadMyAccountNumber = this.MyAccountNumber;
        this.payloadDestinationAccountNumber = payload.DestinationAccountNumber;  
        this.payloadAmount = payload.Amount;
        this.NoiDungHuyNhacNo = null;
        this.displayHuyNhacNo = true;
      },
      ThanhToanNhacNo(payload){
        this.payloadDebtsID = payload.DebtsID;
        this.payloadMyAccountNumber = this.MyAccountNumber;
        this.payloadDestinationAccountNumber = payload.DestinationAccountNumber;  
        this.payloadAmount = payload.Amount;
        this.displayThanhToanNhacNo = true;
      },
      handleThanhToanNhacNo(){
        if (!document.getElementById('OTPCodeNhacNo').checkValidity()) return false;//Nếu chưa validate sẽ hiện thông báo của thuộc tính "required trong form"
        event.preventDefault();//ngăn chặn sự kiện mặc định của nút submit gửi request
        this.LoadingThanhToanNhacNo = true;
        let SoTien = this.payloadAmount.split(' ')[0].replace(/[.]/g,'');
        this.$store.dispatch('ThanhToanNhacNo',{
          "DebtsID": this.payloadDebtsID,
          "MyAccountNumber":this.MyAccountNumber,
          "DestinationAccountNumber": this.payloadDestinationAccountNumber,
          "Amount": SoTien,
          "Message": this.payloadMessage,
          "OTPCode": this.OTPCode
        }).then(res=>{
          this.LoadingThanhToanNhacNo = false;
          this.$store.dispatch('getLichSuNhacNo').then(res=>{
            this.MyAccountNumber=res;
          });
          this.$store.dispatch('getNhacNoChuaThanhToan');
          this.$store.dispatch('getNhacNoDaTao');

          this.payloadDebtsID = null;
          this.payloadMyAccountNumber = null;
          this.payloadDestinationAccountNumber = null;  
          this.payloadAmount = null;
          this.payloadMessage = null;
          this.displayThanhToanNhacNo = false;
          this.$notify({
            message: "Thanh toán nhắc nợ thành công",
            icon: "add_alert",
            horizontalAlign: 'left',
            verticalAlign: 'bottom',
            type: "info"
          });
        }).catch(res=>{
          this.LoadingThanhToanNhacNo = false;
          this.$notify({
            message: "Thanh toán nhắc nợ thất bại\n"+res,
            icon: "add_alert",
            horizontalAlign: 'left',
            verticalAlign: 'bottom',
            type: "danger"
          });
        });
      },
      handleQuayLaiThanhToanNhacNo(){
        this.payloadDebtsID = null;
        this.payloadMyAccountNumber = null;
        this.payloadDestinationAccountNumber = null;  
        this.payloadAmount = null;
        this.payloadMessage = null;
        this.OTPCode = null;
        this.displayThanhToanNhacNo = false;
        this.displayOTP = false;
      },
      handleXacNhanNhacNo(){
        if (!document.getElementById('NoiDungThanhToanNhacNo').checkValidity()) return false;//Nếu chưa validate sẽ hiện thông báo của thuộc tính "required trong form"
        event.preventDefault();//ngăn chặn sự kiện mặc định của nút submit gửi request
        this.OTPCode = null;
        this.displayOTP = true;

        let SoTien = this.payloadAmount.split(' ')[0].replace(/[.]/g,'');
        this.$store.dispatch('getOTPThanhToanNhacNo',{
          "DebtsID": this.payloadDebtsID,
          "MyAccountNumber":this.MyAccountNumber,
          "DestinationAccountNumber": this.payloadDestinationAccountNumber,
          "Amount":SoTien,
          "Message":this.payloadMessage
        });
      }
    }
  };
</script>

<style scoped>
  table, th, td {
    border-collapse: collapse;
    padding: 5px 15px;
  }
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

    display: block;
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  .form-control:focus {
    color: #495057;
    background-color: #fff;
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }

  .fadee-enter-active {
    transition: opacity .5s;
  }
  .fadee-enter, .fadee-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  #receipt1 table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  #receipt1 td, #receipt1 th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }

  .slfade-enter-active {
    transition: all 0.7s ease;
  }
  .slfade-enter, .slfade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  #vn_pseudo::after {
    content: "VNĐ";
    color: #495057;
  }
</style>
