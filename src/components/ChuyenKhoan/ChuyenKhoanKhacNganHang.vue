<template>
  <div>
    <div class="md-layout">
      <transition name="slfade">
        <form v-if="displayOTP2==false">
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
                    <b-form-select id="TaiKhoanNguonExternal" v-model="TaiKhoanNguon" @change="handleChangeTaiKhoanNguon" required>
                      <b-form-select-option v-for="(item,index) in DanhSachTaiKhoanThanhToanExternal" :key="index" :value="item.SoTaiKhoan" style="font-size: 1.25rem;">{{item.SoTaiKhoan}}</b-form-select-option>
                    </b-form-select>
                  </div>
                </div>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-50">
                <div class="row">
                  <label class="col-sm-2 col-form-label lb-fontsize">Số dư</label>
                  <div class="col-sm-10">
                    <b-form-input :value="SoDu" placeholder="Số dư sẽ được hiển thị ở đây" disabled></b-form-input>
          <b-spinner v-if="LoadingSoDuExternal" variant="primary" small label="Small Spinner" type="grow"></b-spinner>                                                      
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
                    <b-form-select :value="TimKiem" @change="handleTimKiem">
                      <template v-for="(item, index) in DanhSachNguoiThuHuongKhacNganHang">
                        <b-form-select-option :key="index" :value="item.SoTaiKhoanNguoiNhan+' '+item.TenNganHang" style="font-size: 1.25rem; color: #28a745">{{item.TenGoiNho}}</b-form-select-option>
                        <b-form-select-option :key="item.SoTaiKhoanNguoiNhan" value="" disabled style="font-size: 0.75rem;">• Số tài khoản: {{item.SoTaiKhoanNguoiNhan}}</b-form-select-option>
                        <b-form-select-option :key="item.TenNganHang+index" value="" disabled style="font-size: 0.75rem;">• Ngân hàng: {{item.TenNganHang}}</b-form-select-option>
                      </template>
                    </b-form-select>
                    <b-spinner v-if="LoadingTimKiemExternal" variant="primary" small label="Small Spinner" type="grow"></b-spinner>
                  </div>
                </div>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-100" style="margin-bottom: 1rem">
                <div class="row">
                  <label class="col-sm-2 col-form-label lb-fontsize">Số tài khoản</label>
                  <div class="col-sm-10">
                    <b-form-input id="SoTaiKhoanNguoiHuongExternal" type="number" :value="SoTaiKhoanNguoiHuong" @change="handleChangeSTKNguoiHuong" placeholder="Nhập số tài khoản người hưởng" required></b-form-input>
                  </div>
                </div>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-100" style="margin-bottom: 1rem">
                <div class="row">
                  <label class="col-sm-2 col-form-label lb-fontsize">Tên ngân hàng</label>
                  <div class="col-sm-10">
                    <b-form-select id="TenNganHangExternal" :value="TenNganHang" @change="handleChangeTenNganHang" required>
                      <b-form-select-option v-for="(item,index) in DanhSachTenNganHangExternal" :key="index" :value="item.TenNganHang" style="font-size: 1.25rem;">{{item.TenNganHang}}</b-form-select-option>
                    </b-form-select>
                  </div>
                </div>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-100" style="margin-bottom: 1rem">
                <div class="row">
                  <label class="col-sm-2 col-form-label lb-fontsize">Người thụ hưởng</label>
                  <div class="col-sm-10">
                    <b-form-input :value="TenTaiKhoanNguoiHuongExternal" placeholder="Tên người thụ hưởng sẽ được hiển thị ở đây" disabled></b-form-input>
          <b-spinner v-if="LoadingTenTaiKhoanNguoiHuongExternal" variant="primary" small label="Small Spinner" type="grow"></b-spinner>                                                              
                  </div>
                </div>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-100" style="margin-bottom: 1rem">
                <div class="row">
                  <label class="col-sm-2 lb-fontsize">Lưu người hưởng</label>
                  <div class="col-sm-10">
                    <b-form-checkbox v-model="LuuThongTinNguoiHuong" switch></b-form-checkbox>
                  </div>
                </div>
              </div>
              <transition name="fadee">
                <div v-if="LuuThongTinNguoiHuong==true" class="md-layout-item md-small-size-100 md-size-100" style="margin-bottom: 1rem">
                  <div class="row">
                    <label class="col-sm-2 col-form-label lb-fontsize">Tên gợi nhớ</label>
                    <div class="col-sm-10">
                      <b-form-input v-model="LuuTenNguoiHuong"></b-form-input>
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
                  <div class="col-sm-10" style="position: relative;">
                    <b-form-input id="SoTienChuyenExternal" :value="SoTienChuyen2" @input="handleSoTienChuyen" required></b-form-input>
          <div id="vn_pseudo" style="position: absolute; left: 15px; pointer-events: none; top:52%;
  transform: translateY(-50%); font-size: 1rem; padding-left: 0.75rem; color: transparent; font-weight: 400; font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif; padding-left: 0.75rem">{{ SoTienChuyen2 }}.</div>                                            
                  </div>
                </div>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-100" style="margin-bottom: 1rem">
                <div class="row">
                  <label class="col-sm-2 col-form-label lb-fontsize">Nội dung chuyển tiền</label>
                  <div class="col-sm-10">
                    <b-form-textarea id="NoiDungChuyenTienExternal" v-model="NoiDungChuyenTien" placeholder="Nhập nội dung chuyển tiền..." rows="3" max-rows="6" required></b-form-textarea>
                  </div>
                </div>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-100" style="margin-bottom: 1rem">
                <div class="row">
                  <label class="col-sm-2 col-form-label lb-fontsize">Phí (<strong>3000 VNĐ*</strong>)</label>
                  <div class="col-sm-10">
                    <b-form-select id="PhiChuyenTienExternal" v-model="PhiChuyenTien" required>
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
            <b-button type="submit" variant="success" @click="handleThucHienChuyenKhoan">Thực hiện chuyển khoản</b-button>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <br>
          </div>
        </form>
      </transition>
    
      <transition name="slfade">
        <div v-if="displayOTP2==true" id="receipt2" class="md-layout-item md-small-size-100 md-size-100">
          <form>
            <table>
              <tr style="background-color: #008C4F">
                <th colspan="2" style="color: #fff;">Chuyển khoản khác ngân hàng</th>
              </tr>
              <tr>
                <td style="width: 33%; background-color: #F2F9F6; font-weight: bold;">Tài khoản người gửi</td>
                <td>{{TaiKhoanNguon}}</td>
              </tr>
              <tr v-if="!ifDone">
                <td style="background-color: #F2F9F6; font-weight: bold;">Số dư hiện tại</td>
                <td>{{SoDu}}</td>
              </tr>
              <tr v-if="ifDone">
                <td style="background-color: #F2F9F6; font-weight: bold;">Số dư trước giao dịch</td>
                <td>{{SoDu}}</td>
              </tr>
              <tr v-if="ifDone">
                <td style="background-color: #F2F9F6; font-weight: bold;">Số dư sau giao dịch</td>
                <td style="color: #dc3545">{{SoDuSauGiaoDich}}</td>
              </tr>
              <tr>
                <td style="background-color: #F2F9F6; font-weight: bold;">Số tiền chuyển khoản (bằng số)</td>
                <td style="color: #dc3545">{{SoTienChuyen2}} VNĐ</td>
              </tr>
              <tr>
                <td style="background-color: #F2F9F6; font-weight: bold;">Số tiền chuyển khoản (bằng chữ)</td>
                <td style="color: #dc3545">{{SoTienChuyenBangChu}} đồng</td>
              </tr>
              <tr>
                <td style="background-color: #F2F9F6; font-weight: bold;">Tài khoản người nhận</td>
                <td>{{SoTaiKhoanNguoiHuong}}</td>
              </tr>
              <tr>
                <td style="background-color: #F2F9F6; font-weight: bold;">Tên người nhận</td>
                <td style="color: #dc3545">{{TenTaiKhoanNguoiHuongExternal}}</td>
              </tr>
              <tr>
                <td style="background-color: #F2F9F6; font-weight: bold;">Ngân hàng bên nhận</td>
                <td>{{TenNganHang}}</td>
              </tr>
              <tr>
                <td style="background-color: #F2F9F6; font-weight: bold;">Nội dung chuyển tiền</td>
                <td>{{NoiDungChuyenTien}}</td>
              </tr>
              <tr>
                <td style="background-color: #F2F9F6; font-weight: bold;">Thanh toán phí</td>
                <td>{{PhiChuyenTien}}</td>
              </tr>
              <tr>
                <td style="background-color: #F2F9F6; font-weight: bold;">Phí chuyển tiền</td>
                <td>3.000 VNĐ</td>
              </tr>
              <tr v-if="!ifDone">
                <td colspan="2" style="text-align: center; color: #28a745"><h5>Mã giao dịch (OTP) đã được chuyển đến email của quý khách!</h5></td>
              </tr>
              <tr v-if="!ifDone">
                <td style="background-color: #F2F9F6; font-weight: bold;">Mã OTP</td>
                <td><input id="OTPCodeExternal" v-model="OTPCode" required></td>
              </tr>
              <tr v-if="ifDone">
                <td colspan="2" style="text-align: center; color: #28a745"><h5>Giao dịch chuyển khoản thành công. Cảm ơn quý khách đã sử dụng dịch vụ của chúng tôi!</h5></td>
              </tr>
            </table>
            <div v-if="!ifDone" class="md-layout-item md-size-100 text-left"  style="margin-bottom: 0.5rem; margin-top: 1rem">
              <b-button type="submit" variant="primary" style="margin-right: 0.25rem; border-radius: unset!important;" @click="handleXacNhanGiaoDich">Xác nhận</b-button>
              <b-button variant="secondary" style="margin-left: 0.25rem; border-radius: unset!important;" @click="handleQuayLai">Quay lại</b-button>
              <b-spinner style="margin-left: 0.5rem;" v-if="LoadingGiaoDichExternal" variant="primary" small label="Small Spinner" type="grow"></b-spinner>
            </div>
          </form>
        </div>
      </transition>
    </div>
  <b-modal ref="mymodal" hide-footer title="Thông báo" @hide="handleHideModal">
      <div class="d-block text-center" style="border-top: 1px solid #e9ecef; padding: 1rem;">
        <div v-if="displayChuyenKhoanExternalThanhCong">
          <div class="text-center">
            <md-icon style="color: #28a745;" class="md-size-3x text-right">check_circle_outline
            </md-icon>
            <h4 style="margin-bottom: 0; font-size: 1.2rem; font-weight: bold;">Giao dịch thành công!</h4>
          </div>
        </div>
        <div v-if="!displayChuyenKhoanExternalThanhCong">
          <div class="text-center">
            <md-icon style="color: rgba(255, 0, 0, 0.7);" class="md-size-3x text-right">error
            </md-icon>
            <h4 style="margin-bottom: 0; font-size: 1.2rem; font-weight: bold;">Giao dịch thất bại!</h4>
            <div style="color: #dc3545; font-size: 0.9rem">{{errChuyenKhoanExternal}}</div>
          </div>
        </div>
      </div>
      <div style="display: flex; justify-content: center; border-top: 1px solid #e9ecef">
        <b-button style="width: 30%" class="mt-3" variant="primary" @click="handleOK">OK</b-button>
      </div>
    </b-modal>                                         
  </div>
</template>
<script>
  import { mapState } from 'vuex';

  export default {
    name: "chuyen-khoan-khac-ngan-hang",
    props: {
      dataBackgroundColor: {
        type: String,
        default: ""
      }
    },
    created(){
      this.$store.dispatch('getDanhSachTaiKhoanThanhToanExternal');
      this.$store.dispatch('getDanhSachTenNganHangExternal');
    },
    data() {
      return {
        TaiKhoanNguon: null,
        TimKiem: null,
        TenNganHang: null,
        PhiChuyenTien: "Người chuyển trả",
        LuuThongTinNguoiHuong: false,
        SoTaiKhoanNguoiHuong: null,
        LuuTenNguoiHuong: null,
        SoTienChuyen: null,
        NoiDungChuyenTien: null,
        displayOTP2: false,
        OTPCode: null,
        ifDone: false
      };
    },
    computed: {
      ...mapState(['DanhSachTaiKhoanThanhToanExternal','DanhSachNguoiThuHuongChuyenKhoanExternal']),
      DanhSachNguoiThuHuongKhacNganHang: function(){
        if (!this.DanhSachNguoiThuHuongChuyenKhoanExternal) return null;
        return this.DanhSachNguoiThuHuongChuyenKhoanExternal.filter(function(el) { return el.TenNganHang != "25Bank"; });
      },
      ...mapState(['LoadingSoDuExternal','LoadingTimKiemExternal','LoadingGiaoDichExternal','LoadingTenTaiKhoanNguoiHuongExternal','SoDuTaiKhoanThanhToanExternal','SoDuTaiKhoanThanhToanExternalSauGiaoDich','TenTaiKhoanNguoiHuongExternal','displayChuyenKhoanExternalThanhCong','errChuyenKhoanExternal','DanhSachTenNganHangExternal']),
      SoDu(){
        if (!this.SoDuTaiKhoanThanhToanExternal) return null;
        var n = this.SoDuTaiKhoanThanhToanExternal.toString().split('').reverse().join("");
        var n2 = n.replace(/\d\d\d(?!$)/g, "$&.");    
        return  n2.split('').reverse().join('')+' VNĐ';
      },
      SoDuSauGiaoDich(){
        if (!this.SoDuTaiKhoanThanhToanExternalSauGiaoDich) return null;
        var n = this.SoDuTaiKhoanThanhToanExternalSauGiaoDich.toString().split('').reverse().join("");
        var n2 = n.replace(/\d\d\d(?!$)/g, "$&.");    
        return  n2.split('').reverse().join('')+' VNĐ';
      },
      SoTienChuyen2(){
        if (!this.SoTienChuyen) return null;
        var n = this.SoTienChuyen.toString().split('').reverse().join("");
        var n2 = n.replace(/\d\d\d(?!$)/g, "$&.");    
        return  n2.split('').reverse().join('');
      },
      SoTienChuyenBangChu(){
        return DocTienBangChu(this.SoTienChuyen);
      },
    },
    methods: {
      handleChangeTaiKhoanNguon(value){
        this.TimKiem = null;
        this.SoTaiKhoanNguoiHuong = null;
        this.TenNganHang = null;
        this.$store.dispatch('resetTenTaiKhoanNguoiHuongExternal');
        this.LuuTenNguoiHuong = null;
        this.$store.dispatch('setLoadingTimKiemExternal',true);
        this.$store.dispatch('getDanhSachNguoiThuHuongChuyenKhoanExternal',value);
        this.$store.dispatch('setLoadingSoDuExternal',true);
        this.$store.dispatch('getSoDuTaiKhoanThanhToanExternal',value);
      },
      handleChangeSTKNguoiHuong(value){
        this.SoTaiKhoanNguoiHuong = value;
        this.TimKiem = null;
        this.LuuTenNguoiHuong = null;
        if (value==""){
          this.$store.dispatch('resetTenTaiKhoanNguoiHuongExternal');
          return;
        }
        if (!this.TenNganHang) return;
        this.$store.dispatch('setLoadingTenTaiKhoanNguoiHuongExternal',true);
        this.$store.dispatch('getTenTaiKhoanNguoiHuongExternal',{"DestinationBankName":this.TenNganHang,"DestinationAccountNumber":this.SoTaiKhoanNguoiHuong}).then(res => {
          this.LuuTenNguoiHuong = this.TenTaiKhoanNguoiHuongExternal;
        });
      },
      handleChangeTenNganHang(value){
        this.TenNganHang = value;
        this.TimKiem = null;
        this.LuuTenNguoiHuong = null;
        this.$store.dispatch('resetTenTaiKhoanNguoiHuongExternal');
        if (!this.SoTaiKhoanNguoiHuong) return;
        this.$store.dispatch('setLoadingTenTaiKhoanNguoiHuongExternal',true);
        let payload = {"DestinationBankName":this.TenNganHang,"DestinationAccountNumber":this.SoTaiKhoanNguoiHuong};
        this.$store.dispatch('getTenTaiKhoanNguoiHuongExternal',payload).then(res => {
          this.LuuTenNguoiHuong = this.TenTaiKhoanNguoiHuongExternal;
        });
      },
      handleTimKiem(value){
        this.TimKiem = value;
        this.$store.dispatch('setLoadingTenTaiKhoanNguoiHuongExternal',true);
        this.SoTaiKhoanNguoiHuong = value.split(' ')[0];
        this.TenNganHang = value.split(' ')[1];
        let payload = {
          "DestinationBankName": this.TenNganHang,
          "DestinationAccountNumber": this.SoTaiKhoanNguoiHuong
        }
        this.$store.dispatch('getTenTaiKhoanNguoiHuongExternal',payload).then(res => {
          this.LuuTenNguoiHuong = this.TenTaiKhoanNguoiHuongExternal;
        });
      },
      handleSoTienChuyen(value){
        let temp = value.replace(/[.]/g,'');
        this.SoTienChuyen = temp;
      },
      handleThucHienChuyenKhoan(event){
        if (
        !document.getElementById('TaiKhoanNguonExternal').checkValidity() ||
        !document.getElementById('SoTaiKhoanNguoiHuongExternal').checkValidity() ||
        !document.getElementById('TenNganHangExternal').checkValidity() ||
        !document.getElementById('SoTienChuyenExternal').checkValidity() ||
        !document.getElementById('NoiDungChuyenTienExternal').checkValidity() ||
        !document.getElementById('PhiChuyenTienExternal').checkValidity()) return false;//Nếu chưa validate sẽ hiện thông báo của thuộc tính "required trong form"
        event.preventDefault();//ngăn chặn sự kiện mặc định của nút submit gửi request
        if (!this.TenTaiKhoanNguoiHuongExternal) return;
 
        this.displayOTP2=true;
        let payload = {
          "MyAccountNumber":this.TaiKhoanNguon,
          "DestinationAccountNumber":this.SoTaiKhoanNguoiHuong,
          "Amount":this.SoTienChuyen,
          "Message":this.NoiDungChuyenTien,
          "SenderPayFee":this.PhiChuyenTien=="Người chuyển trả"?true:false,
          "BankName": this.TenNganHang
        }
        this.$store.dispatch('getOTPExternal',payload);

        if (this.LuuThongTinNguoiHuong) {
          let payload2 = {
            "MyAccountNumber":payload.MyAccountNumber,
            "TenGoiNho":this.LuuTenNguoiHuong||this.TenTaiKhoanNguoiHuongExternal,
            "SoTaiKhoanNguoiNhan":payload.DestinationAccountNumber,
            "TenNganHang":this.TenNganHang
          }
          this.$store.dispatch('saveThongTinNguoiHuongExternal',payload2);
        }
      },
      handleQuayLai(){
        this.displayOTP2=false;
      },
      handleXacNhanGiaoDich(event){
        if (!document.getElementById('OTPCodeExternal').checkValidity()) return false; //Nếu chưa validate sẽ hiện thông báo của thuộc tính "required trong form"
        event.preventDefault(); //ngăn chặn sự kiện mặc định của nút submit gửi request

        this.$store.dispatch('setLoadingGiaoDichExternal',true);
        if (!this.OTPCode) return;
        let payload = {
          "MyAccountNumber":this.TaiKhoanNguon,
          "DestinationAccountNumber":this.SoTaiKhoanNguoiHuong,
          "Amount":this.SoTienChuyen,
          "Message":this.NoiDungChuyenTien,
          "SenderPayFee":this.PhiChuyenTien=="Người chuyển trả"?true:false,
          "BankName": this.TenNganHang,
          "OTPCode": this.OTPCode
        }
        this.$store.dispatch('thuchienGiaoDichExternal',payload).then(response=>{
          this.$refs['mymodal'].show();
        });
      },
      handleOK(){
        this.$refs['mymodal'].hide();
      },
      handleHideModal(){
        if (this.displayChuyenKhoanExternalThanhCong) this.ifDone = true;
        else this.OTPCode = null;
      }
    }
  };

  var ChuSo=new Array(" không "," một "," hai "," ba "," bốn "," năm "," sáu "," bảy "," tám "," chín ");
  var Tien=new Array( "", " nghìn", " triệu", " tỷ", " nghìn tỷ", " triệu tỷ");

  function DocSo3ChuSo(baso)
  {
      var tram;
      var chuc;
      var donvi;
      var KetQua="";
      tram=parseInt(baso/100);
      chuc=parseInt((baso%100)/10);
      donvi=baso%10;
      if(tram==0 && chuc==0 && donvi==0) return "";
      if(tram!=0) {
        KetQua += ChuSo[tram] + " trăm ";
        if ((chuc == 0) && (donvi != 0)) KetQua += " linh ";
      }
      if ((chuc != 0) && (chuc != 1)) {
        KetQua += ChuSo[chuc] + " mươi";
        if ((chuc == 0) && (donvi != 0)) KetQua = KetQua + " linh ";
      }
      if (chuc == 1) KetQua += " mười ";
      switch (donvi) {
        case 1:
          if ((chuc != 0) && (chuc != 1)) KetQua += " mốt ";
          else KetQua += ChuSo[donvi];
          break;
        case 5:
          if (chuc == 0) KetQua += ChuSo[donvi];
          else KetQua += " lăm ";
          break;
        default:
          if (donvi != 0) KetQua += ChuSo[donvi];
          break;
        }
      return KetQua;
  }

  function DocTienBangChu(SoTien)
  {
      var lan=0;
      var i=0;
      var so=0;
      var KetQua="";
      var tmp="";
      var ViTri = new Array();
      if(SoTien<0) return "Số tiền âm !";
      if(SoTien==0) return "Không đồng !";
      if(SoTien>0) so=SoTien;
      else so = -SoTien;
      if (SoTien > 8999999999999999) return "Số quá lớn!";
      ViTri[5] = Math.floor(so / 1000000000000000);
      if(isNaN(ViTri[5]))
          ViTri[5] = "0";
      so = so - parseFloat(ViTri[5].toString()) * 1000000000000000;
      ViTri[4] = Math.floor(so / 1000000000000);
       if(isNaN(ViTri[4]))
          ViTri[4] = "0";
      so = so - parseFloat(ViTri[4].toString()) * 1000000000000;
      ViTri[3] = Math.floor(so / 1000000000);
       if(isNaN(ViTri[3]))
          ViTri[3] = "0";
      so = so - parseFloat(ViTri[3].toString()) * 1000000000;
      ViTri[2] = parseInt(so / 1000000);
       if(isNaN(ViTri[2]))
          ViTri[2] = "0";
      ViTri[1] = parseInt((so % 1000000) / 1000);
       if(isNaN(ViTri[1]))
          ViTri[1] = "0";
      ViTri[0] = parseInt(so % 1000);
    if(isNaN(ViTri[0]))
          ViTri[0] = "0";
      if (ViTri[5] > 0) lan = 5;
      else if (ViTri[4] > 0) lan = 4;
      else if (ViTri[3] > 0) lan = 3;
      else if (ViTri[2] > 0) lan = 2;
      else if (ViTri[1] > 0) lan = 1;
      else lan = 0;
      for (i = lan; i >= 0; i--) {
         tmp = DocSo3ChuSo(ViTri[i]);
         KetQua += tmp;
         if (ViTri[i] > 0) KetQua += Tien[i];
         if ((i > 0) && (tmp.length > 0)) KetQua += ',';//&& (!string.IsNullOrEmpty(tmp))
      }
     if (KetQua.substring(KetQua.length - 1) == ',') {
          KetQua = KetQua.substring(0, KetQua.length - 1);
     }
     KetQua = KetQua.substring(1,2).toUpperCase()+ KetQua.substring(2);
     return KetQua;//.substring(0, 1);//.toUpperCase();// + KetQua.substring(1);
  }
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

  #receipt2 table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  #receipt2 td, #receipt2 th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }

  .slfade-enter-active {
    transition: all 0.7s ease;
  }
  .slfade-enter, .slfade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(20px);
    opacity: 0;
  }

  #vn_pseudo::after {
    content: "VNĐ";
    color: #495057;
  }
</style>
