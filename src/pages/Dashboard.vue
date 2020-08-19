<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50"
      >
        <stats-card data-background-color="green">
          <template slot="header">
            <a href="#/user">
            <md-icon>forward</md-icon>
            </a>
          </template>

          <template slot="content">
            <md-icon>person</md-icon>
            <h3 class="title">Thông tin cá nhân</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              Xem thông tin cá nhân
            </div>
          </template>
        </stats-card>
      </div>
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50"
      >
        <stats-card data-background-color="green">
          <template slot="header">
            <a href="#/accounts">
            <md-icon>forward</md-icon>
            </a>
          </template>

          <template slot="content">
            <md-icon>content_paste</md-icon>
            <h3 class="title">Danh sách tài khoản</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              Xem thông tin tài khoản thanh toán và tài khoản tiết kiệm
            </div>
          </template>
        </stats-card>
      </div>
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50"
      >
        <stats-card data-background-color="green">
          <template slot="header">
            <a href="#/tranferList">
            <md-icon>forward</md-icon>
            </a>
          </template>

          <template slot="content">
            <md-icon>multiple_stop</md-icon>
            <h3 class="title">Danh sách người hưởng</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              Danh sách những người thụ hưởng
            </div>
          </template>
        </stats-card>
      </div>
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50"
      >
        <stats-card data-background-color="green">
          <template slot="header">
            <a href="#/moneyTranfer">
            <md-icon>forward</md-icon>
            </a>
          </template>

          <template slot="content">
            <md-icon>attach_money</md-icon>
            <h3 class="title">Chuyển tiền</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              Chuyển tiền cho tài khoản khác
            </div>
          </template>
        </stats-card>
      </div>
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50"
      >
        <stats-card data-background-color="green">
          <template slot="header">
            <a href="#/debtReminder">
            <md-icon>forward</md-icon>
            </a>
          </template>

          <template slot="content">
            <md-icon>more_time</md-icon>
            <h3 class="title">Quản lý nhắc nợ</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              Quản lý các yêu cầu nhắc nợ từ tài khoản khác
            </div>
          </template>
        </stats-card>
      </div>
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50"
      >
        <stats-card data-background-color="green">
          <template slot="header">
            <a href="#/transactions">
            <md-icon>forward</md-icon>
            </a>
          </template>

          <template slot="content">
            <md-icon>receipt_long</md-icon>
            <h3 class="title">Lịch sử giao dịch</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              Xem các lịch sử giao dịch của tài khoản
            </div>
          </template>
        </stats-card>
      </div>
      <!-- <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50"></div> -->
    </div>
  </div>
</template>

<script>
import {
  StatsCard,
} from "@/components";

export default {
  components: {
    StatsCard,
  },
};
</script>
