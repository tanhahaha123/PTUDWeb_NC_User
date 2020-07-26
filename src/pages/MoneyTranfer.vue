<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <nav-tabs-card>
          <template slot="content">
            <span class="md-nav-tabs-title" style="font-weight: bold;">chọn</span>
            <md-tabs class="md-success" md-alignment="left">
              <md-tab id="tab-home" md-label="Chuyển khoản cùng ngân hàng" md-icon="compare_arrows">
                <chuyen-khoan-cung-ngan-hang></chuyen-khoan-cung-ngan-hang>
              </md-tab>

              <md-tab id="tab-pages" md-label="Chuyển khoản khác ngân hàng" md-icon="swap_horiz">
                <chuyen-khoan-khac-ngan-hang></chuyen-khoan-khac-ngan-hang>
              </md-tab>

            </md-tabs>
          </template>
        </nav-tabs-card>
      </div>
    </div>
  </div>
</template>

<script>
  import {
  NavTabsCard,
  ChuyenKhoanCungNganHang,
  ChuyenKhoanKhacNganHang
} from "@/components";
export default {
  components: {
    NavTabsCard
  }
};
</script>