<template>
  <div class="content">
    <md-card>
      <md-card-header data-background-color="purple" style="display: flex;
    justify-content: space-between;">
        <h3 style="display: inline-block;" class="title">Danh sách người thụ hưởng</h3>
        <b-form-select style="width: 25%;display: inline-block;" :value="selectedTaiKhoanThanhToan" @change="handleChangeTaiKhoanThanhToan" required>
          <b-form-select-option v-for="(item,index) in DanhSachTaiKhoanThanhToan" :key="index" :value="item.SoTaiKhoan" style="font-size: 1.25rem;">{{item.SoTaiKhoan}}</b-form-select-option>
        </b-form-select>
      </md-card-header>
      <md-card-content>
        <danh-sach-thu-huong-table table-header-color="purple"></danh-sach-thu-huong-table>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  components: {

  },
  created(){
    this.$store.dispatch('getFirstDanhSachNguoiThuHuong');
  },
  data(){
    return {
    }
  },
  computed: {
    ...mapState(['selectedTaiKhoanThanhToan','DanhSachTaiKhoanThanhToan'])
  },
  methods: {
    handleChangeTaiKhoanThanhToan(value){
      this.$store.dispatch('setSelectedTaiKhoanThanhToan',value);
      this.$store.dispatch('getDanhSachNguoiThuHuong',value);
    }
  }
};
</script>
