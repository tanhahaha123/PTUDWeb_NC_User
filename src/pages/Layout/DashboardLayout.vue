<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar
      :sidebar-item-color="sidebarBackground"
      :sidebar-background-image="sidebarBackgroundImage"
    >
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/dashboard">
        <md-icon>dashboard</md-icon>
        <p>Trang chủ</p>
      </sidebar-link>
      <sidebar-link to="/user">
        <md-icon>person</md-icon>
        <p>Thông tin cá nhân</p>
      </sidebar-link>
      <sidebar-link to="/accounts">
        <md-icon>content_paste</md-icon>
        <p>Danh sách tài khoản</p>
      </sidebar-link>
      <sidebar-link to="/tranferList">
        <md-icon>multiple_stop</md-icon>
        <p>Danh sách người hưởng</p>
      </sidebar-link>
      <sidebar-link to="/moneyTranfer">
        <md-icon>attach_money</md-icon>
        <p>Chuyển tiền</p>
      </sidebar-link>
      <sidebar-link to="/debtReminder">
        <md-icon>more_time</md-icon>
        <p>Nhắc nợ</p>
      </sidebar-link>
      <sidebar-link to="/notifications">
        <md-icon>notifications</md-icon>
        <p>Thông báo</p>
      </sidebar-link>
      <sidebar-link to="/transactions">
        <md-icon>receipt_long</md-icon>
        <p>Lịch sử giao dịch</p>
      </sidebar-link>
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <fixed-plugin
        :color.sync="sidebarBackground"
        :image.sync="sidebarBackgroundImage"
      >
      </fixed-plugin>
      <dashboard-content> </dashboard-content>
    </div>
  </div>
</template>

<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "@/pages/Layout/MobileMenu.vue";
import FixedPlugin from "./Extra/FixedPlugin.vue";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    MobileMenu,
    FixedPlugin
  },
  data() {
    return {
      sidebarBackground: "green",
      sidebarBackgroundImage: require("@/assets/img/sidebar-2.jpg")
    };
  }
};
</script>
