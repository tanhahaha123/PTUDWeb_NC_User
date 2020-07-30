<template>
  <div class="content">
    <div class="md-layout md-alignment-center-center">
      <div class="md-layout-item md-medium-size-100 md-size-50">
        <message-form data-background-color="green"> </message-form>
        <!-- <p>{{ this.$router.params.idGiaoDichNhacNo }}</p> -->
      </div>
    </div>
  </div>
</template>

<script>
import { MessageForm } from "../components/Forms";

export default {
  components: {
    MessageForm
  }
};
</script>
